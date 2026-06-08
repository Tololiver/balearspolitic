// src/components/sections/Comparador.jsx
import { useState } from 'react'
import { usePartits } from '@/hooks/useData'
import { SectionTitleBar, ContentWrap, LoadingSpinner, SeatsBar } from '@/components/ui'

const TOPICS = [
  { id: 'turisme',     label: 'Turisme',         icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17.5 8c0 4.142-5.5 13-5.5 13S6.5 12.142 6.5 8a5.5 5.5 0 0 1 11 0z"/><circle cx="12" cy="8" r="2"/></svg> },
  { id: 'habitatge',   label: 'Habitatge',        icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: 'llengua',     label: 'Llengua',          icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id: 'mediAmbient', label: 'Medi Ambient',     icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg> },
  { id: 'immigracio',  label: 'Immigració',       icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { id: 'serveis',     label: 'Serveis Públics',  icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  { id: 'fiscalitat',  label: 'Fiscalitat',       icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
]

export default function Comparador() {
  const { data: partits, isLoading } = usePartits()
  const [p1Id, setP1Id] = useState('pp')
  const [p2Id, setP2Id] = useState('psib')
  const [activeTopic, setActiveTopic] = useState(null)

  if (isLoading) return <><SectionTitleBar title="Comparador" /><ContentWrap><LoadingSpinner /></ContentWrap></>

  const p1 = partits?.find(p => p.codi === p1Id)
  const p2 = partits?.find(p => p.codi === p2Id)
  const topics = activeTopic ? TOPICS.filter(t => t.id === activeTopic) : TOPICS

  return (
    <>
      <SectionTitleBar
        eyebrow="Eina interactiva"
        title="Comparador de Partits"
        sub="Selecciona qualsevol parell de partits i compara les seves posicions tema per tema."
        gradient="from-ink to-[#0a1a2e]"
      />
      <ContentWrap>
        {/* Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-white rounded-card border border-border p-5">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-1 col-span-2 -mb-2">Selecciona dos partits per comparar</div>
          {[[p1Id, setP1Id], [p2Id, setP2Id]].map(([val, setVal], i) => (
            <div key={i}>
              <label className="text-xs font-semibold text-mid block mb-1.5">Partit {i + 1}</label>
              <select
                value={val}
                onChange={e => setVal(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-2 text-sm font-semibold font-body focus:outline-none"
                style={{ borderColor: partits?.find(p => p.codi === val)?.color, color: partits?.find(p => p.codi === val)?.color }}
              >
                {partits?.map(p => <option key={p.codi} value={p.codi}>{p.nom} — {p.nom_complet}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Party headers */}
        {p1 && p2 && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[p1, p2].map(p => (
                <div key={p.codi} className="rounded-card p-4 text-white" style={{ background: p.color }}>
                  {p.logo_url && (
                    <div className="inline-flex bg-white rounded-lg p-1.5 mb-2">
                      <img src={p.logo_url} alt={p.nom}
                        className="h-7 object-contain"/>
                    </div>
                  )}
                  <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/50 mb-1">{p.ideologia}</div>
                  <div className="font-display text-xl font-black">{p.nom}</div>
                  <div className="text-xs text-white/60 mt-1">{p.escons_2023} escons · {p.status}</div>
                </div>
              ))}
            </div>

            {/* Topic pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              <button onClick={() => setActiveTopic(null)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${!activeTopic ? 'bg-ink text-white border-ink' : 'bg-white text-mid border-border hover:border-mid'}`}>Tots els temes</button>
              {TOPICS.map(t => (
                <button key={t.id} onClick={() => setActiveTopic(activeTopic === t.id ? null : t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${activeTopic === t.id ? 'bg-ink text-white border-ink' : 'bg-white text-mid border-border hover:border-mid'}`}>
                  {t.icon}{t.label}
                </button>
              ))}
            </div>

            {/* Comparison blocks */}
            <div className="space-y-3">
              {topics.map(t => (
                <div key={t.id} className="bg-white rounded-card border border-border overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-paper border-b border-border">
                    <span className="text-mid">{t.icon}</span>
                    <span className="font-display font-bold text-sm text-ink">{t.label}</span>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    {[p1, p2].map(p => (
                      <div key={p.codi} className="p-4" style={{ background: p.bg_color }}>
                        <div className="font-mono text-[9px] tracking-[1.5px] uppercase font-bold mb-2" style={{ color: p.color }}>{p.nom}</div>
                        <p className="text-xs text-ink/75 leading-relaxed">{p.posicions?.[t.id] || '—'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </ContentWrap>
    </>
  )
}
