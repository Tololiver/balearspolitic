// src/components/sections/Programes.jsx
import { useState } from 'react'
import { useProgrames, useEleccionsResultats } from '@/hooks/useData'
import { SectionTitleBar, ContentWrap, LoadingSpinner, SeatsBar, ComplianceBadge } from '@/components/ui'

const ANYS = [2023, 2019, 2015]

const META = {
  2023: { winner: 'PP — Govern Prohens',      coalition: 'PP en minoria · Abstenció Vox + Sa Unió · Pacte PP–Vox 2025' },
  2019: { winner: 'PSIB–PSOE — II Govern Armengol', coalition: 'PSIB + Unidas Podemos + Més per Mallorca' },
  2015: { winner: 'PSIB–PSOE — I Govern Armengol',  coalition: 'PSIB + Més + MpM · Suport Podemos, GxF, El Pi' },
}

export default function Programes() {
  const [any, setAny] = useState(2023)
  const [open, setOpen] = useState(null)

  const { data: programes, isLoading: pLoad } = useProgrames(any)
  const { data: resultats, isLoading: rLoad } = useEleccionsResultats(any)

  const isLoading = pLoad || rLoad
  const meta = META[any]
  const totalSeats = resultats?.reduce((s, r) => s + (r.escons || 0), 0) || 59

  return (
    <>
      <SectionTitleBar
        eyebrow="2015 · 2019 · 2023"
        title="Programes Electorals"
        sub="Resultats de cada elecció, resum dels programes i anàlisi del compliment per als partits que van governar."
        gradient="from-ink to-[#1a1a0a]"
      />
      <ContentWrap>
        {/* Year selector */}
        <div className="flex gap-3 mb-6">
          {ANYS.map(a => (
            <button
              key={a}
              onClick={() => { setAny(a); setOpen(null) }}
              className={`flex-1 py-3 rounded-card font-display font-black text-lg transition-all border-2 ${
                any === a
                  ? 'bg-ink text-white border-ink'
                  : 'bg-white text-mid border-border hover:border-mid'
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Election header */}
        <div className="bg-ink rounded-card p-5 mb-5">
          <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/35 mb-1">Eleccions {any}</div>
          <div className="font-display text-xl font-black text-white mb-1">
            Guanya: <span className="text-white/50 font-normal text-base">{meta?.winner}</span>
          </div>
          <div className="text-xs text-white/45 mb-4">{meta?.coalition}</div>

          {/* Results bar */}
          {resultats?.length > 0 && (
            <>
              <div className="flex h-3.5 rounded overflow-hidden mb-2">
                {resultats.map(r => (
                  <div key={r.id} style={{ flex: (r.escons/totalSeats)*100, background: r.color || r.partits?.color }}
                       title={`${r.partits?.nom || r.parti_codi}: ${r.escons}`} />
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {resultats.map(r => (
                  <span key={r.id} className="flex items-center gap-1.5 font-mono text-[10px] text-white/50">
                    <span className="w-2 h-2 rounded-sm" style={{ background: r.color || r.partits?.color }} />
                    {r.partits?.nom || r.parti_codi}: {r.escons} ({r.pct_vots})
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Program cards */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-2">
            {programes?.map(p => (
              <ProgramCard
                key={p.id}
                programa={p}
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

function ProgramCard({ programa: p, isOpen, onToggle }) {
  const color  = p.partits?.color  || '#888'
  const bgColor = p.partits?.bg_color || '#f5f5f5'
  const nom    = p.partits?.nom    || p.parti_codi

  return (
    <div
      className="bg-white rounded-card border border-border overflow-hidden"
      style={{ borderLeftWidth: isOpen ? 4 : 2, borderLeftColor: isOpen ? color : 'transparent' }}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 text-left hover:bg-paper transition-colors">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] font-bold text-white px-2.5 py-1 rounded" style={{ background: color }}>
            {nom}
          </span>
          {p.va_governar && (
            <span className="font-mono text-[10px] font-bold bg-mes-bg text-mes px-2 py-0.5 rounded">
              Va governar
            </span>
          )}
          {p.compliment_pct && <ComplianceBadge score={p.compliment_pct} />}
        </div>
        <svg className={`w-4 h-4 text-mid flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      {isOpen && (
        <div className="border-t border-border" style={{ background: bgColor }}>
          <div className="p-5">
            <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-2" style={{ color }}>
              Resum del Programa
            </div>
            <p className="text-sm text-mid leading-relaxed mb-4">{p.resum}</p>

            {p.promeses?.length > 0 && (
              <>
                <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-2" style={{ color }}>
                  Promeses Principals
                </div>
                <ul className="space-y-1 mb-4">
                  {p.promeses.map((pr, i) => (
                    <li key={i} className="flex gap-2 text-xs text-mid leading-relaxed py-1.5 border-b border-black/5 last:border-0">
                      <span style={{ color }} className="flex-shrink-0 font-bold">→</span>
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {p.pdf_url && (
                <a href={p.pdf_url} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-2 text-xs font-semibold text-white px-3 py-1.5 rounded-lg"
                   style={{ background: color }}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Descarregar PDF
                </a>
              )}
              {p.link_programa && (
                <a href={p.link_programa} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border"
                   style={{ color, borderColor: color }}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Programa complet (web)
                </a>
              )}
            </div>

            {p.analisi && (
              <div className="border-t border-black/8 pt-4">
                <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold text-mid mb-2">
                  Anàlisi del Compliment
                </div>
                <div className="space-y-1">
                  {p.analisi.split('\n').map((line, i) => (
                    <p key={i} className="text-xs text-mid leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
