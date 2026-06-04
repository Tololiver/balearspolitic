// netlify/functions/programa-ia.js
// Genera resum d'un programa electoral en PDF via Claude API

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const CLAUDE_KEY = process.env.ANTHROPIC_API_KEY
  if (!CLAUDE_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'ANTHROPIC_API_KEY no configurada' }) }
  }

  let body
  try { body = JSON.parse(event.body) }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'JSON invàlid' }) } }

  const { pdf_url, parti, ambit, any_eleccions } = body
  if (!pdf_url) return { statusCode: 400, body: JSON.stringify({ error: 'pdf_url és obligatori' }) }

  try {
    // Descarrega el PDF
    const pdfRes = await fetch(pdf_url)
    if (!pdfRes.ok) throw new Error(`No s'ha pogut descarregar el PDF: ${pdfRes.status}`)
    const pdfBuffer = await pdfRes.arrayBuffer()
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')

    const prompt = `Ets un analista polític especialitzat en política balear. Analitza aquest programa electoral i retorna un JSON estructurat.

Context:
- Partit: ${parti || 'desconegut'}
- Àmbit: ${ambit || 'desconegut'} (govern, consell insular o ajuntament)
- Any: ${any_eleccions || 'desconegut'}

Retorna ÚNICAMENT un JSON vàlid amb aquesta estructura exacta:
{
  "resum": "Resum executiu del programa en 3-4 paràgrafs en català. Explica les línies principals, el to ideològic i les prioritats.",
  "propostes": [
    "Proposta clau 1 (concreta i breu)",
    "Proposta clau 2",
    "Proposta clau 3",
    "Proposta clau 4",
    "Proposta clau 5",
    "Proposta clau 6",
    "Proposta clau 7",
    "Proposta clau 8"
  ],
  "valoracio": "Breu valoració ideològica: on se situa en l'espectre polític, quin perfil d'elector té com a target, quins temes prioritza.",
  "temes_principals": ["tema1", "tema2", "tema3", "tema4", "tema5"]
}`

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'document',
              source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 }
            },
            { type: 'text', text: prompt }
          ]
        }]
      }),
    })

    const data = await res.json()
    if (data.error) throw new Error(data.error.message || JSON.stringify(data.error))

    const text = data.content?.[0]?.text || ''
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    }
  } catch (err) {
    console.error('programa-ia error:', err)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
