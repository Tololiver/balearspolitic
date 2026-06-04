// src/components/sections/Pobles.jsx
import { useState } from 'react'
import { usePobles } from '@/hooks/useData'
import {
  SectionTitleBar, ContentWrap, SeatsBar, LoadingSpinner, EmptyState, SearchInput
} from '@/components/ui'
import { clsx } from 'clsx'

const ILLES = ['totes', 'Mallorca', 'Menorca', 'Eivissa', 'Formentera']
const GOVERN_FILTERS = [
  { val: 'totes', label: 'Tots' },
  { val: 'PP',    label: 'PP governa',    color: '#0e2a6e' },
  { val: 'PSIB',  label: 'PSIB governa',  color: '#b82012' },
  { val: 'Mes',   label: 'Mes/Prog',      color: '#1a5c30' },
]

export default function Pobles() {
  const [search,     setSearch]     = useState('')
  const [illa,       setIlla]       = useState('totes')
  const [governFil,  setGovernFil]  = useState('totes')
  const [openPoble,  setOpenPoble]  = useState(null)

  const { data: pobles, isLoading } = usePobles({ illa, governParti: governFil, search })

  return (
    <>
      <SectionTitleBar
        eyebrow="Eleccions Municipals 28M 2023"
        title="Composicio dels Ajuntaments"
        sub="Alcalde/essa, composicio del consistori i distribucio de regidors per partit."
        gradient="from-ink to-[#0a1a2a]"
      />

      <ContentWrap>
        {/* Search + filters */}
        <div className="space-y-3 mb-5">
          <SearchInput value={search} onChange={setSearch} placeholder="Cerca un municipi..." />

          {/* Illa filters */}
          <div className="flex flex-wrap gap-2">
            {ILLES.map(i => (
              <button
                key={i}
                onClick={() => { setIlla(i); setGovernFil('totes') }}
                className={clsx('filter-pill capitalize', illa === i && governFil === 'totes' ? 'active' : '')}
              >
                {i === 'totes' ? 'Totes les Illes' : i}
              </button>
            ))}
            <div className="w-px h-5 bg-border self-center mx-1" />
            {GOVERN_FILTERS.slice(1).map(gf => (
              <button
                key={gf.val}
                onClick={() => { setGovernFil(gf.val); setIlla('totes') }}
                className={clsx('filter-pill', governFil === gf.val ? 'active' : '')}
              >
                {gf.color && <span className="inline-block w-2 h-2 rounded-sm mr-1.5 align-middle" style={{ background: gf.color }} />}
                {gf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pobles.map(p => (
              <PobleCar
                key={p.id}
                poble={p}
                isOpen={openPoble === p.id}
                onToggle={() => setOpenPoble(openPoble === p.id ? null : p.id)}
              />
            ))}
          </div>
        )}
      </ContentWrap>
    </>
  )
}

function PobleCar({ poble: p, isOpen, onToggle }) {
  const regidors = p.regidors || []
  const total    = p.total_regidors || regidors.reduce((s, r) => s + r.n, 0)

  return (
    <div
      className={clsx(
        'bg-white rounded-card shadow-card border-2 overflow-hidden cursor-pointer transition-all',
        isOpen ? 'shadow-lg' : 'hover:shadow-md'
      )}
      style={{ borderColor: isOpen ? p.color_govern : 'transparent' }}
      onClick={onToggle}
    >
      {/* Head */}
      <div className="flex justify-between items-start px-4 py-3" style={{ background: p.color_govern }}>
        <div>
          <div className="font-display text-lg font-black text-white leading-none">{p.nom}</div>
          <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-white/55 mt-1">{p.illa}</div>
        </div>
        <div className="font-mono text-[10px] text-white/60 bg-white/15 rounded-full px-2 py-0.5 whitespace-nowrap">
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
          <span
            className="font-mono text-[10px] font-bold text-white rounded px-2 py-0.5"
            style={{ background: p.color_govern }}
          >
            {p.govern_parti} governa
          </span>
          <span className="text-[10px] text-mid">
            {isOpen ? '▲ tancar' : `${total} regidors ↓`}
          </span>
        </div>
      </div>

      {/* Expanded */}
      {isOpen && (
        <div className="border-t border-border px-4 pb-4 pt-3 bg-cream">
          <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-mid mb-2">
            Regidors ({total} total)
          </div>
          <div className="space-y-1">
            {regidors.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: r.color || r.c }} />
                  <span className="text-mid">{r.p || r.parti}</span>
                </div>
                <span className="font-mono font-semibold text-ink">{r.n}</span>
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
