// src/components/sections/Fonts.jsx
import { SectionTitleBar, ContentWrap } from '@/components/ui'

const FONTS = [
  { cat: 'Premsa Balear', items: ['El Diario Illes Balears · eldiario.es/illes-balears', 'Ultima Hora · ultimahora.es', 'Menorca Info · menorca.info', 'Ara Balears · arabalears.cat', 'Diario de Mallorca · diariodemallorca.es', 'IB3 Notícies · ib3.org'] },
  { cat: 'Premsa Nacional', items: ['El Español · elespanol.com', 'Infobae España · infobae.com/espana', 'Públic · publico.es', 'Mundiario · mundiario.com', 'The Objective · theobjective.com', 'El Plural · elplural.com'] },
  { cat: 'Fonts Institucionals', items: ['Govern de les Illes Balears · caib.es', 'BOIB — Butlletí Oficial de les Illes Balears', 'Parlament de les Illes Balears · parlamentib.cat', 'Enciclopèdia Catalana · enciclopedia.cat'] },
  { cat: 'Verificació i Referència', items: ['Newtral.es — verificació de dades polítiques', 'Wikipedia EN/CA — Governs Armengol I, II i Prohens', 'Vilaweb · vilaweb.cat', 'Geopolitique.eu — anàlisi electoral 2023'] },
  { cat: 'Partits Polítics (directe)', items: ['Més per Mallorca — Programa 2023 · mespermallorca.cat', 'Vox Baleares · voxespana.es/baleares', 'PSIB–PSOE · psib.eu', 'El Pi · elpi.cat'] },
  { cat: 'Temes Específics', items: ['Idealista/News — habitatge balear (maig 2023)', 'Hosteltur — turisme i ecotasa (2024)', 'Preferente.com — model turístic (2023–24)', 'GOB Mallorca — posicions mediambientals'] },
]

export default function Fonts() {
  return (
    <>
      <SectionTitleBar
        eyebrow="Documentació"
        title="Fonts Consultades"
        sub="Fonts primàries, premsa, institucions i materials de verificació. Totes les dades provenen de fonts públiques verificades."
        gradient="from-ink to-[#1a1a0a]"
      />
      <ContentWrap>
        <div className="bg-white border border-border rounded-card p-5 mb-6 border-l-4 border-l-gold">
          <p className="text-sm text-mid leading-relaxed">
            <strong className="text-ink">Nota metodològica:</strong> Les posicions dels partits reflecteixen declaracions i actuacions públiques contrastades en fonts de diferent tendència editorial. Les posicions d'Armengol post-2023 corresponen al seu rol com a oposició i secretaria general del PSIB. Document actualitzat fins al <strong className="text-ink">juny de 2026</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FONTS.map(f => (
            <div key={f.cat} className="bg-white rounded-card border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <div className="font-mono text-[9px] tracking-[2px] uppercase text-mid font-bold">{f.cat}</div>
              </div>
              <ul className="space-y-0">
                {f.items.map(item => (
                  <li key={item} className="text-xs text-mid py-1.5 border-b border-border last:border-0 flex gap-2">
                    <span className="text-accent flex-shrink-0">›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ContentWrap>
    </>
  )
}
