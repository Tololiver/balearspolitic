// netlify/functions/clipping-crawler.js
// Scheduled function — executa cada dia a les 07:00 UTC
// netlify.toml: [functions.clipping-crawler] schedule = "0 7 * * *"

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
)

// ── Decodifica HTML entities ──────────────────────────────────
function decodeHTML(str) {
  if (!str) return ''
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8216;/g, '\u2018')  // '
    .replace(/&#8217;/g, '\u2019')  // '
    .replace(/&#8220;/g, '\u201C')  // "
    .replace(/&#8221;/g, '\u201D')  // "
    .replace(/&#8211;/g, '\u2013')  // –
    .replace(/&#8212;/g, '\u2014')  // —
    .replace(/&#8230;/g, '\u2026')  // …
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .replace(/&[a-zA-Z]+;/g, '')
    .trim()
}

// ── Parse RSS simple sense dependències externes ──────────────
function parseRSS(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1]
    const get = (tag) => {
      const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([^<]*)<\\/${tag}>`))
      return m ? (m[1] || m[2] || '').trim() : ''
    }
    const titol = get('title')
    const url   = get('link') || get('guid')
    const desc  = get('description')
    const data  = get('pubDate')
    if (titol && url) items.push({ titol: decodeHTML(titol), url, desc: decodeHTML(desc), data })
  }
  return items
}

// ── Filtra per paraules clau ──────────────────────────────────
function filtraParaulesClau(titol, desc, paraules) {
  const text = (titol + ' ' + desc).toLowerCase()
  return paraules.some(p => text.includes(p.toLowerCase()))
}

// ── Analitza amb IA (opcional) ────────────────────────────────
async function analitzaAmbIA(titol, desc, promptIA) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `${promptIA}\n\nTITULAR: ${titol}\nDESCRIPCIÓ: ${(desc || '').slice(0, 300)}`
        }]
      }),
      signal: AbortSignal.timeout(10000)
    })
    
    if (!response.ok) {
      console.error('Anthropic error:', response.status)
      return { rellevant: true, categoria: 'general', resum: '' }
    }
    
    const text = await response.text()
    if (!text) return { rellevant: true, categoria: 'general', resum: '' }
    
    const data = JSON.parse(text)
    const content = data.content?.[0]?.text || '{}'
    const clean = content.replace(/```json|```/g, '').trim()
    
    try {
      return JSON.parse(clean)
    } catch {
      // Si no és JSON vàlid, retorna rellevant=true amb el text com a resum
      return { rellevant: true, categoria: 'general', resum: content.slice(0, 300) }
    }
  } catch (e) {
    console.error('IA error:', e.message)
    // Si falla la IA, la notícia continua guardant-se si passa el filtre de paraules clau
    return { rellevant: false, categoria: 'general', resum: '' }
  }
}

// ── Comprova si ja existeix a la BD ──────────────────────────
async function jaExisteix(url) {
  const { data } = await supabase
    .from('clipping')
    .select('id')
    .eq('url_original', url)
    .limit(1)
  return data?.length > 0
}

// ── Handler principal ─────────────────────────────────────────
exports.handler = async () => {
  try {
    // Carrega configuració
    const { data: configs } = await supabase
      .from('clipping_config')
      .select('*')
      .limit(1)
      .single()

    if (!configs?.actiu) {
      return { statusCode: 200, body: JSON.stringify({ msg: 'Sistema desactivat' }) }
    }

    const fonts       = configs.fonts || []
    const paraules    = configs.paraules_clau || []
    const promptIA    = configs.prompt_ia || ''
    const fontsActives = fonts.filter(f => f.activa)

    let total = 0, inserits = 0

    for (const font of fontsActives) {
      try {
        const resp = await fetch(font.url, {
          headers: { 'User-Agent': 'BalearsPolitic/1.0' },
          signal: AbortSignal.timeout(8000)
        })
        if (!resp.ok) continue
        const xml = await resp.text()
        const items = parseRSS(xml)
        total += items.length

        for (const item of items.slice(0, 20)) { // max 20 per font
          if (await jaExisteix(item.url)) continue

          // Filtre 1: paraules clau
          const passaParaules = filtraParaulesClau(item.titol, item.desc, paraules)
          
          let analisi = { rellevant: false, categoria: 'general', resum: '' }
          
          // Filtre 2: IA (només si té clau Anthropic)
          if (process.env.ANTHROPIC_API_KEY) {
            analisi = await analitzaAmbIA(item.titol, item.desc, promptIA)
          }

          // Guarda si passa paraules clau O si la IA diu que és rellevant
          if (!passaParaules && !analisi.rellevant) continue

          // Inserir a BD
          await supabase.from('clipping').insert({
            titol:           item.titol,
            resum_ia:        analisi.resum || item.desc?.slice(0, 300),
            font:            font.nom,
            url_original:    item.url,
            data_publicacio: item.data ? new Date(item.data).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            categoria:       analisi.categoria || 'general',
            estat:           'esborrany',
            auto:            true,
            llengua:         font.llengua || 'ca',
          })
          inserits++
        }
      } catch (e) {
        console.error(`Error font ${font.nom}:`, e.message)
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ total, inserits, fonts: fontsActives.length })
    }
  } catch (e) {
    return { statusCode: 500, body: e.message }
  }
}
