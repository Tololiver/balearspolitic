// netlify/functions/blog-ai.js
// Proxy segur per a la Claude API — per a IA del CMS del blog
// Col·loca a: netlify/functions/blog-ai.js

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const CLAUDE_KEY = process.env.ANTHROPIC_API_KEY
  if (!CLAUDE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'ANTHROPIC_API_KEY no configurada a Netlify' }) }
  }

  let body
  try { body = JSON.parse(event.body) }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'JSON invàlid' }) } }

  const { action, text, titol } = body

  const PROMPTS = {
    resum: `Ets un editor de continguts polítiques de les Illes Balears. Genera un resum breu (màx. 2 frases, 150 caràcters) en català per a aquest article.
Títol: ${titol}
Contingut: ${text}
Respon NOMÉS amb el resum, sense cometes ni explicacions.`,

    millorar: `Ets un editor de continguts polítics de les Illes Balears. Millora el següent text HTML mantenint l'estructura HTML, millorant la redacció en català, afegint claredat i fent-lo més llegible. No canviïs el contingut, sols la forma.
Text: ${text}
Respon NOMÉS amb el HTML millorat, sense explicacions.`,

    meta: `Ets un especialista en SEO per a continguts polítics en català. Genera:
1. Un meta title (màx. 60 caràcters) per a Google
2. Una meta description (màx. 160 caràcters) per a Google
Per a aquest article: "${titol}"
Resum: ${text}
Respon ÚNICAMENT en JSON: {"meta_title": "...", "meta_desc": "..."}`
  }

  const prompt = PROMPTS[action]
  if (!prompt) return { statusCode: 400, body: JSON.stringify({ error: 'Acció no vàlida' }) }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await res.json()
    const resultText = data.content?.[0]?.text || ''

    if (action === 'meta') {
      try {
        const parsed = JSON.parse(resultText.replace(/```json|```/g, '').trim())
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed),
        }
      } catch {
        return { statusCode: 200, headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ meta_title: titol?.slice(0,60), meta_desc: text?.slice(0,160) }) }
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: resultText }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
