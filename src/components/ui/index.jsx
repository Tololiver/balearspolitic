// src/components/ui/index.jsx — Components reutilitzables

import { clsx } from 'clsx'

// ── SeatsBar: barra visual de regidors/escons ──
export function SeatsBar({ regidors = [], total, height = 'h-2', className }) {
  const tot = total || regidors.reduce((s, r) => s + r.n, 0)
  return (
    <div className={clsx('flex rounded overflow-hidden', height, className)}>
      {regidors.map((r, i) => (
        <div
          key={i}
          style={{ flex: r.n / tot * 100, background: r.color || r.c }}
          title={`${r.p || r.parti}: ${r.n}`}
        />
      ))}
    </div>
  )
}

// ── PartyBadge: pastilla de color per a un partit ──
export function PartyBadge({ parti, color, size = 'sm', children }) {
  const sizes = { xs: 'text-[9px] px-1.5 py-0.5', sm: 'text-[10px] px-2 py-0.5', md: 'text-xs px-2.5 py-1' }
  return (
    <span
      className={clsx('inline-block text-white font-mono font-medium rounded leading-none tracking-wide', sizes[size])}
      style={{ background: color }}
    >
      {children || parti}
    </span>
  )
}

// ── SectionHeader: capçalera estàndard de secció ──
export function SectionHeader({ eyebrow, title, titleEm, sub, children }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <div className="section-eyebrow">{eyebrow}</div>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight leading-none mb-2">
        {title}{titleEm && <em className="not-italic text-accent"> {titleEm}</em>}
      </h2>
      {sub && <p className="text-sm text-mid font-light leading-relaxed max-w-xl mt-2">{sub}</p>}
      {children}
    </div>
  )
}

// ── ContentWrap: wrapper estàndard del contingut ──
export function ContentWrap({ children, className }) {
  return (
    <div className={clsx('max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12', className)}>
      {children}
    </div>
  )
}

// ── SectionTitleBar: barra fosca de títol de secció ──
export function SectionTitleBar({ eyebrow, title, sub, gradient = 'from-ink to-ink' }) {
  return (
    <div className={clsx('bg-gradient-to-br text-white px-6 md:px-10 py-8 md:py-10', gradient)}>
      <div className="max-w-5xl mx-auto">
        {eyebrow && (
          <div className="font-mono text-[10px] tracking-[3px] uppercase text-white/35 mb-2">{eyebrow}</div>
        )}
        <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight leading-none mb-1">{title}</h2>
        {sub && <p className="text-sm text-white/45 font-light mt-2">{sub}</p>}
      </div>
    </div>
  )
}

// ── LoadingSpinner ──
export function LoadingSpinner({ text = 'Carregant...' }) {
  return (
    <div className="flex items-center justify-center py-20 text-mid">
      <div className="w-5 h-5 rounded-full border-2 border-border border-t-accent animate-spin mr-3" />
      <span className="font-mono text-xs tracking-wider uppercase">{text}</span>
    </div>
  )
}

export default LoadingSpinner

// ── EmptyState ──
export function EmptyState({ icon = '🔍', title = 'Res trobat', sub }) {
  return (
    <div className="text-center py-16 text-mid">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="font-semibold text-lg text-ink mb-1">{title}</div>
      {sub && <div className="text-sm font-light">{sub}</div>}
    </div>
  )
}

// ── ComplianceBadge ──
export function ComplianceBadge({ score }) {
  const color = score >= 70 ? 'bg-mes-bg text-mes' : score >= 50 ? 'bg-elpi-bg text-elpi' : 'bg-psib-bg text-psib'
  const label = score >= 70 ? 'Alt compliment' : score >= 50 ? 'Parcial' : 'Baix compliment'
  return (
    <span className={clsx('font-mono text-[10px] font-semibold px-2 py-0.5 rounded', color)}>
      {score}% · {label}
    </span>
  )
}

// ── Card ──
export function Card({ children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-card shadow-card border border-border overflow-hidden',
        onClick && 'cursor-pointer hover:shadow-lg transition-shadow',
        className
      )}
    >
      {children}
    </div>
  )
}

// ── SearchInput ──
export function SearchInput({ value, onChange, placeholder = 'Cerca...' }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-sm px-4 py-2.5 text-sm rounded-lg border-2 border-border bg-white
                 focus:outline-none focus:border-mid transition-colors placeholder:text-mid/50"
    />
  )
}
