// src/components/sections/Partits.jsx
import { useState } from 'react'
import { usePartits } from '@/hooks/useData'
import { SectionTitleBar, ContentWrap, SeatsBar, LoadingSpinner, EmptyState } from '@/components/ui'
import { clsx } from 'clsx'

const TOPICS = [
  { id: 'turisme',     label: 'Turisme' },
  { id: 'habitatge',   label: 'Habitatge' },
  { id: 'llengua',     label: 'Llengua' },
  { id: 'mediAmbient', label: 'Medi Ambient' },
  { id: 'immigracio',  label: 'Immigracio' },
  { id: 'serveis',     label: 'Serveis Publics' },
  { id: 'fiscalitat',  label: 'Fiscalitat' },
]

export default function Partits() {
  const { data: partits, isLoading, error } = usePartits()
  const [openId, setOpenId] = useState(null)

  if (isLoading) return (
    <>
      <SectionTitleBar eyebrow="Arc Parlamentari 2023" title="Fitxes de Partits" />
      <ContentWrap><LoadingSpinner /></ContentWrap>
    </>
  )

  if (error) return (
    <>
      <SectionTitleBar title="Fitxes de Partits" />
      <ContentWrap><EmptyState icon="⚠️" title="Error carregant els partits" sub={error.message} /></ContentWrap>
    </>
  )

  return (
    <>
      <SectionTitleBar
        eyebrow="Arc Parlamentari · XI Legislatura 2023"
        title="Fitxes de Partits"
        sub="Clica sobre qualsevol fitxa per veure les posicions del partit en els 7 grans temes."
      />
      <ContentWrap>
        {/* Parliament bar */}
        <div className="bg-ink rounded-card p-5 mb-6">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-white/30 mb-3">
            59 escons · Majoria absoluta: 30
          </div>
          <SeatsBar
            height="h-5"
            regidors={partits
              ?.filter(p => p.escons_2023 > 0)
              .map(p => ({ n: p.escons_2023, color: p.color, p: p.nom }))}
            total={59}
          />
          <div className="flex flex-wrap gap-3 mt-3">
            {partits?.filter(p => p.escons_2023 > 0).map(p => (
              <span key={p.id} className="flex items-center gap-1.5 font-mono text-[10px] text-white/45">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                {p.nom}: {p.escons_2023}
              </span>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {partits?.map(p => (
            <PartyCard
              key={p.id}
              partit={p}
              isOpen={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
            />
          ))}
        </div>
      </ContentWrap>
    </>
  )
}

function PartyCard({ partit: p, isOpen, onToggle }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-card shadow-card border-2 overflow-hidden transition-all duration-150 cursor-pointer',
        isOpen ? 'border-opacity-100' : 'border-transparent hover:border-border'
      )}
      style={{ borderColor: isOpen ? p.color : undefined }}
      onClick={onToggle}
    >
      {/* Head */}
      <div className="p-4" style={{ background: p.color }}>
        <div className="flex justify-between items-start">
          <div>
            <div className="font-display text-xl font-black text-white tracking-tight">{p.nom}</div>
            <div className="text-[10px] text-white/55 mt-0.5">{p.ideologia}</div>
          </div>
          <div className="text-right">
            {p.escons_2023 > 0
              ? <div className="bg-white/20 text-white text-sm font-mono font-medium rounded-full px-2.5 py-0.5">{p.escons_2023} esc.</div>
              : <div className="bg-white/15 text-white/50 text-[10px] font-mono rounded-full px-2 py-0.5">Fora Parl.</div>
            }
            <div className="font-mono text-[9px] uppercase tracking-wide text-white/40 mt-1">{p.status}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="text-xs text-mid mb-2">
          <span className="font-semibold text-ink">Líder:</span> {p.lider}
          <span className="text-border mx-1.5">·</span>
          <span className="font-semibold text-ink">Fundat:</span> {p.fundat}
        </div>
        <p className="text-xs text-mid leading-relaxed line-clamp-3">{p.desc}</p>
        <div className="mt-3 text-[10px] font-semibold" style={{ color: p.color }}>
          {isOpen ? '▲ Tancar posicions' : '▼ Veure posicions per tema'}
        </div>
      </div>

      {/* Expanded positions */}
      {isOpen && (
        <div className="border-t border-border p-4 space-y-3" style={{ background: p.bg_color }}>
          {TOPICS.map(t => {
            const text = p.posicions?.[t.id]
            if (!text) return null
            return (
              <div key={t.id}>
                <div className="font-mono text-[9px] font-bold tracking-[1.5px] uppercase mb-1" style={{ color: p.color }}>
                  {t.label}
                </div>
                <p className="text-xs text-ink/70 leading-relaxed">{text}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
