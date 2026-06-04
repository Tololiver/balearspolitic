// src/components/sections/Governs.jsx
import { useState } from 'react'
import { useGoverns } from '@/hooks/useData'
import { SectionTitleBar, ContentWrap, LoadingSpinner, EmptyState } from '@/components/ui'

export default function Governs() {
  const { data: governs, isLoading } = useGoverns()
  const [open, setOpen] = useState(null)

  if (isLoading) return <><SectionTitleBar title="Governs" /><ContentWrap><LoadingSpinner /></ContentWrap></>

  const total = governs?.length || 0

  return (
    <>
      <SectionTitleBar
        eyebrow={`${total} governs · 1983–avui`}
        title="Cronologia dels Governs"
        sub="Tots els governs de la democràcia balear. Qui governava, amb qui, consellers i lleis clau."
        gradient="from-ink to-[#0a1a0e]"
      />
      <ContentWrap>
        {/* Timeline bar */}
        {governs?.length > 0 && (
          <div className="bg-ink rounded-card p-5 mb-6">
            <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/30 mb-3">
              Cronologia 1983–avui · {total} governs
            </div>
            <div className="flex h-5 rounded overflow-hidden">
              {governs.map(g => (
                <div key={g.id} style={{ flex: 1, background: g.color }} title={g.nom} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setOpen(open === g.id ? null : g.id)} />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {governs.map(g => (
                <span key={g.id} className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: g.color }} />
                  {g.periode}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Govern cards */}
        <div className="space-y-2">
          {governs?.map(g => (
            <GovernCard key={g.id} govern={g} isOpen={open === g.id} onToggle={() => setOpen(open === g.id ? null : g.id)} />
          ))}
        </div>
      </ContentWrap>
    </>
  )
}

function GovernCard({ govern: g, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-card border border-border overflow-hidden" style={{ borderLeftWidth: 4, borderLeftColor: g.color }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left hover:bg-paper transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-1 self-stretch rounded" style={{ background: g.color, minHeight: 40 }} />
          <div>
            <div className="font-display text-lg font-bold text-ink leading-tight">{g.nom}</div>
            <div className="text-xs text-mid mt-0.5">{g.periode} · {g.president}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-[10px] text-white px-2 py-0.5 rounded" style={{ background: g.color }}>
            {g.parti_label || g.partits?.nom || ''}
          </span>
          <svg className={`w-4 h-4 text-mid transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border">
          {/* Context */}
          {g.context && (
            <div className="px-5 py-4 bg-paper border-b border-border">
              <p className="text-sm text-mid leading-relaxed">{g.context}</p>
            </div>
          )}
          {/* Coalition */}
          <div className="px-5 py-3 border-b border-border">
            <span className="font-mono text-[9px] tracking-[2px] uppercase text-mid font-bold">Coalició · </span>
            <span className="text-xs text-ink">{g.coalicio}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Vicepresidents */}
            {g.vicepresidents?.length > 0 && (
              <div className="p-5">
                <SectionLabel icon={<IcoUser />} label="Vicepresidència" color={g.color} />
                <ul className="space-y-1.5 mt-2">
                  {g.vicepresidents.map((v, i) => <Item key={i} text={v} color={g.color} />)}
                </ul>
              </div>
            )}
            {/* Consellers */}
            {g.consellers?.length > 0 && (
              <div className="p-5">
                <SectionLabel icon={<IcoBuild />} label="Consellers i Conselleres" color={g.color} />
                <div className="grid grid-cols-1 gap-0 mt-2">
                  {g.consellers.map((c, i) => <Item key={i} text={c} color={g.color} />)}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border border-t border-border">
            {/* Lleis */}
            {g.lleis?.length > 0 && (
              <div className="p-5">
                <SectionLabel icon={<IcoDoc />} label="Lleis i mesures clau" color={g.color} />
                <ul className="space-y-1.5 mt-2">
                  {g.lleis.map((l, i) => <Item key={i} text={l} color={g.color} />)}
                </ul>
              </div>
            )}
            {/* Fites */}
            {g.fites?.length > 0 && (
              <div className="p-5">
                <SectionLabel icon={<IcoStar />} label="Fites polítiques" color={g.color} />
                <ul className="space-y-1.5 mt-2">
                  {g.fites.map((f, i) => <Item key={i} text={f} color={g.color} />)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SectionLabel({ icon, label, color }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[2px] uppercase font-bold" style={{ color }}>
      {icon}{label}
    </div>
  )
}

function Item({ text, color }) {
  return (
    <li className="flex gap-2 text-xs text-mid leading-relaxed py-1 border-b border-border last:border-0">
      <span className="flex-shrink-0 font-bold" style={{ color }}>›</span>
      <span>{text}</span>
    </li>
  )
}

function IcoUser() { return <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function IcoBuild() { return <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> }
function IcoDoc() { return <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg> }
function IcoStar() { return <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
