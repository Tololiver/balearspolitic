// src/components/SEOMeta.jsx
// Afegeix meta tags dinàmics per a cada secció
// Ús: <SEOMeta title="Governs" description="..." />
import { useEffect } from 'react'

export default function SEOMeta({ title, description, image }) {
  useEffect(() => {
    const siteName = 'BalearsPolitic'
    const fullTitle = title ? `${title} — ${siteName}` : siteName
    const desc = description || 'Eina d\'anàlisi política de les Illes Balears. Governs, partits, municipis, programes electorals i eleccions 2027.'
    const img = image || 'https://balearspolitic.netlify.app/og-image.png'

    document.title = fullTitle

    const setMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        property ? el.setAttribute('property', name) : el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', desc)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', desc, true)
    setMeta('og:image', img, true)
    setMeta('og:type', 'website', true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)

    return () => {
      document.title = siteName
    }
  }, [title, description, image])

  return null
}
