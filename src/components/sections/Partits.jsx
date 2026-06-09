// src/components/sections/Partits.jsx
import { useState } from 'react'
import { usePartits } from '@/hooks/useData'
import { SectionTitleBar, ContentWrap, LoadingSpinner, EmptyState } from '@/components/ui'
import { ChevronDown, ExternalLink, Users } from 'lucide-react'

const TEMES = [
  { key:'habitatge',   label:'Habitatge' },
  { key:'turisme',     label:'Turisme' },
  { key:'llengua',     label:'Llengua' },
  { key:'economia',    label:'Economia' },
  { key:'medi_ambient',label:'Medi Ambient' },
  { key:'immigracio',  label:'Immigració' },
]

export default function Partits() {
  const { data: partits, isLoading } = usePartits()
  const [open, setOpen] = useState(null)

  return (
    <>
      <SectionTitleBar
        eyebrow="Eleccions 2015–2023"
        title="Fitxes de Partits"
        sub="Posicions, resultats i característiques dels principals partits polítics de les Illes Balears."
        gradient="from-ink to-[#0a0a1a]"
      />
      <ContentWrap>
        {isLoading ? <LoadingSpinner /> : !partits?.length ? (
          <EmptyState title="Sense dades" sub="Aviat s'afegiran les fitxes dels partits." />
        ) : (
          <div className="space-y-2">
            {partits.map(p => (
              <PartitCard
                key={p.id}
                partit={p}
                isOpen={open === p.id}
                onToggle={() => setOpen(open === p.id ? null : p.id)}
              />
            ))}
          </div>
        )}
      </ContentWrap>
    </>
  )
}

function PartitCard({ partit: p, isOpen, onToggle }) {
  const color  = p.color    || '#888'
  const bgColor = p.bg_color || '#f5f5f5'

  return (
    <div className="bg-white rounded-card border-2 overflow-hidden transition-all duration-200"
      style={{borderColor: isOpen ? color : 'transparent', borderLeftColor: color, borderLeftWidth: 4}}>

      {/* Capçalera */}
      <button onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-paper/60 transition-colors">

        {/* Logo o color block */}
        <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{background: color}}>
          {p.logo_url ? (
            <img src={p.logo_url} alt={p.nom} className="w-10 h-10 object-contain"/>
          ) : (
            <span className="font-display font-black text-white text-lg leading-none">
              {p.sigles?.slice(0,2) || p.nom?.slice(0,2)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display text-lg font-black text-ink leading-none">{p.nom}</span>
            {p.sigles && p.sigles !== p.nom && (
              <span className="font-mono text-[10px] font-bold text-white px-2 py-0.5 rounded"
                style={{background: color}}>{p.sigles}</span>
            )}
          </div>
          {p.ideologia && (
            <div className="text-xs text-mid mt-0.5">{p.ideologia}</div>
          )}
          {/* Escons actuals */}
          {p.escons_actuals != null && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <Users size={11} strokeWidth={1.5} className="text-mid"/>
              <span className="font-mono text-[10px] text-mid">
                {p.escons_actuals} escons · XI Legislatura 2023
              </span>
            </div>
          )}
        </div>

        <ChevronDown
          size={16} strokeWidth={1.5}
          className={`text-mid flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Contingut expandit */}
      {isOpen && (
        <div className="border-t border-border" style={{background: bgColor}}>

          {/* Descripció */}
          {p.descripcio && (
            <div className="px-5 py-4 border-b border-black/8">
              <p className="text-sm text-mid leading-relaxed">{p.descripcio}</p>
              {p.web && (
                <a href={p.web} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold hover:underline"
                  style={{color}}>
                  <ExternalLink size={11} strokeWidth={1.5}/> Web oficial
                </a>
              )}
            </div>
          )}

          {/* Resultats electorals Balears + per illes */}
          {(p.escons_2023 != null || p.escons_2019 != null || p.escons_2015 != null) && (
            <div className="px-5 py-4 border-b border-black/8">
              <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-3" style={{color}}>
                Resultats electorals
              </div>
              <div className="flex gap-6 flex-wrap">
                {/* Balears — destacat */}
                {[
                  {any:2023, n:p.escons_2023, pct:p.pct_2023},
                  {any:2019, n:p.escons_2019, pct:p.pct_2019},
                  {any:2015, n:p.escons_2015, pct:p.pct_2015},
                ].filter(r => r.n != null).map(r => (
                  <div key={r.any} className="text-center">
                    <div className="font-display text-2xl font-black" style={{color}}>{r.n}</div>
                    <div className="font-mono text-[9px] text-mid">escons IB</div>
                    {r.pct && <div className="font-mono text-[9px] text-mid">{r.pct}</div>}
                    <div className="font-mono text-[9px] font-bold text-mid mt-0.5">{r.any}</div>
                  </div>
                ))}
              </div>

              {/* Per illes 2023 — sempre visible */}
              <div className="mt-4 pt-3 border-t border-black/6">
                <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold text-mid mb-2">
                  Resultats per illa · 2023
                </div>
                {p.resultats_illes && Object.keys(p.resultats_illes).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      {key:'mallorca',   label:'Mallorca'},
                      {key:'menorca',    label:'Menorca'},
                      {key:'eivissa',    label:'Eivissa'},
                      {key:'formentera', label:'Formentera'},
                    ].map(({key, label}) => {
                      const r = p.resultats_illes[key]
                      return (
                        <div key={key} className="bg-white/60 rounded-lg p-2.5 text-center border border-black/6">
                          <div className="font-mono text-[9px] uppercase tracking-wide text-mid mb-1">{label}</div>
                          {r ? (
                            <>
                              <div className="font-display text-lg font-black" style={{color}}>{r.escons}</div>
                              <div className="font-mono text-[9px] text-mid">escons</div>
                              {r.pct && <div className="font-mono text-[9px] text-mid">{r.pct}</div>}
                            </>
                          ) : (
                            <div className="font-mono text-[10px] text-mid/40 py-1">—</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-[11px] text-mid/50 italic">
                    Dades per illa pendents d'actualització al CMS.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Posicions temàtiques */}
          {p.posicions && Object.keys(p.posicions).length > 0 && (
            <div className="px-5 py-4">
              <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-3"
                style={{color}}>Posicions polítiques</div>
              <div className="space-y-0">
                {TEMES.filter(t => p.posicions[t.key]).map(t => (
                  <div key={t.key} className="py-2.5 border-b border-black/6 last:border-0">
                    <div className="flex items-start gap-2.5">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{background: color}}/>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wide" style={{color}}>
                          {t.label}
                        </span>
                        <p className="text-xs text-mid leading-relaxed mt-0.5">{p.posicions[t.key]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
