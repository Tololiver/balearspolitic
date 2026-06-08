// src/components/sections/Pobles.jsx
import { useState, useCallback } from 'react'
import { usePobles } from '@/hooks/useData'
import { SectionTitleBar, ContentWrap, SeatsBar, LoadingSpinner, EmptyState, SearchInput } from '@/components/ui'
import PartyBadge from '@/components/ui/PartyBadge'
import { clsx } from 'clsx'

const ILLES = ['totes', 'Mallorca', 'Menorca', 'Eivissa', 'Formentera']

const PARTITS_GOVERN = [
  { val:'pp',     label:'PP',          color:'#0e2a6e' },
  { val:'psib',   label:'PSIB',        color:'#e30022' },
  { val:'mes',    label:'Més',         color:'#1a5c30' },
  { val:'elpi',   label:'El Pi',       color:'#00d5af' },
  { val:'saunio', label:'Sa Unió',     color:'#009d99' },
  { val:'mxme',   label:'MxMe',        color:'#005151' },
  { val:'podem',  label:'Podemos',     color:'#6b0f9e' },
  { val:'vox',    label:'Vox',         color:'#4a6600' },
  { val:'ind',    label:'Independents',color:'#888888' },
]

export default function Pobles() {
  const [search,    setSearch]    = useState('')
  const [illa,      setIlla]      = useState('totes')
  const [governFil, setGovernFil] = useState('totes')
  const [openId,    setOpenId]    = useState(null)

  const { data: poblesRaw, isLoading } = usePobles({ illa, governParti: governFil, search })

  // Ordre alfabètic sempre
  const pobles = poblesRaw ? [...poblesRaw].sort((a, b) => a.nom.localeCompare(b.nom, 'ca')) : []

  const toggle = useCallback((id) => {
    setOpenId(prev => prev === id ? null : id)
  }, [])

  const setIllaFilter = (val) => { setIlla(val); setGovernFil('totes'); setOpenId(null) }
  const setGovernFilter = (val) => { setGovernFil(val === governFil ? 'totes' : val); setIlla('totes'); setOpenId(null) }

  return (
    <>
      <SectionTitleBar
        eyebrow="Eleccions Municipals 28M 2023"
        title="Ajuntaments"
        sub="Alcalde/essa, composició del consistori i distribució de regidors per partit. Ordre alfabètic."
        gradient="from-ink to-[#0a1a2a]"
      />
      <ContentWrap>
        <div className="space-y-3 mb-5">
          <SearchInput value={search} onChange={setSearch} placeholder="Cerca un ajuntament..." />

          {/* Filtres per illa */}
          <div className="flex flex-wrap gap-2">
            {ILLES.map(i => (
              <button key={i} onClick={() => setIllaFilter(i)}
                className={clsx('filter-pill capitalize', illa === i && governFil === 'totes' ? 'active' : '')}>
                {i === 'totes' ? 'Totes les Illes' : i}
              </button>
            ))}
          </div>

          {/* Filtres per qui governa */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mid">Governa:</span>
            <button onClick={() => setGovernFilter('totes')}
              className={clsx('filter-pill', governFil === 'totes' ? 'active' : '')}>
              Tots
            </button>
            {PARTITS_GOVERN.map(gf => (
              <button key={gf.val} onClick={() => setGovernFilter(gf.val)}
                className={clsx('filter-pill flex items-center gap-1.5', governFil === gf.val ? 'active' : '')}>
                <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: gf.color }}/>
                {gf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nota */}
        <div className="text-xs text-mid/70 bg-white rounded-lg px-4 py-3 border-l-2 border-border mb-5">
          Dades del 28M 2023. Alguns municipis han pogut tenir canvis posteriors (mocions de censura, etc.).
          Fonts: Wikipedia EN, Ultima Hora, Diario de Mallorca.
        </div>

        {/* Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : !pobles?.length ? (
          <EmptyState title="Cap municipi trobat" sub="Prova un altre terme de cerca o filtre." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pobles.map(p => (
              <PoblaCard
                key={p.id}
                poble={p}
                isOpen={openId === p.id}
                onToggle={() => toggle(p.id)}
              />
            ))}
          </div>
        )}
      </ContentWrap>
    </>
  )
}

function PoblaCard({ poble: p, isOpen, onToggle }) {
  const regidors = p.regidors || []
  const total    = p.total_regidors || regidors.reduce((s, r) => s + (r.n || 0), 0)

  return (
    <div
      className="bg-white rounded-card shadow-card overflow-hidden cursor-pointer transition-all duration-150"
      style={{
        border: `2px solid ${isOpen ? p.color_govern : 'transparent'}`,
        boxShadow: isOpen ? `0 4px 20px ${p.color_govern}22` : undefined
      }}
      onClick={onToggle}
    >
      {/* Head */}
      <div className="flex justify-between items-start px-4 py-3" style={{ background: p.color_govern }}>
        <div>
          <div className="font-display text-lg font-black text-white leading-none">{p.nom}</div>
          <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-white/55 mt-1">{p.illa}</div>
        </div>
        <div className="font-mono text-[10px] text-white/60 bg-white/15 rounded-full px-2 py-0.5 whitespace-nowrap ml-2">
          {p.poblacio?.toLocaleString('ca')} hab.
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="text-xs text-mid mb-2">
          <span className="font-semibold text-ink">Alcalde/essa:</span> {p.alcalde}
        </div>
        <SeatsBar regidors={regidors} total={total} height="h-1.5" className="mb-2" />
        <div className="flex justify-between items-center">
          <PartyBadge codi={p.govern_parti} size="xs" />
          <span className="text-[10px] text-mid flex items-center gap-1">
            {isOpen ? (
              <><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg> tancar</>
            ) : (
              <><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg> {total} regidors</>
            )}
          </span>
        </div>
      </div>

      {/* Expanded */}
      {isOpen && (
        <div className="border-t border-border px-4 pb-4 pt-3 bg-cream" onClick={e => e.stopPropagation()}>
          <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-mid mb-2">
            Composició del consistori ({total} regidors)
          </div>
          {/* Visual bar with labels */}
          <SeatsBar regidors={regidors} total={total} height="h-3" className="mb-3 rounded" />
          <div className="space-y-0">
            {regidors.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: r.color || r.c }} />
                  <span className="text-mid">{r.p || r.parti}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 rounded-sm" style={{ width: `${Math.round((r.n/total)*60)}px`, background: r.color || r.c }} />
                  <span className="font-mono font-semibold text-ink w-4 text-right">{r.n}</span>
                </div>
              </div>
            ))}
          </div>
          {p.context && (
            <p className="text-[11px] text-mid/70 italic mt-3 leading-relaxed">{p.context}</p>
          )}
        </div>
      )}
    </div>
  )
}
