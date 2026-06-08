// src/components/ui/index.jsx
import { Loader2, SearchX, FileQuestion } from 'lucide-react'

// ── SeatsBar ──────────────────────────────────────────────────
export function SeatsBar({ regidors = [], total = 0, height = 'h-2', className = '' }) {
  if (!regidors.length || !total) return null
  return (
    <div className={`flex rounded overflow-hidden ${height} ${className}`}>
      {regidors.map((r, i) => (
        <div
          key={i}
          style={{ flex: (r.n / total) * 100, background: r.color || r.c || '#aaa' }}
          title={`${r.p || r.parti}: ${r.n}`}
        />
      ))}
    </div>
  )
}

// ── PartyBadge ────────────────────────────────────────────────
export function PartyBadge({ nom, color, small = false }) {
  return (
    <span
      className={`inline-block font-mono font-bold text-white rounded ${small ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'}`}
      style={{ background: color || '#888' }}
    >
      {nom}
    </span>
  )
}

// ── SectionTitleBar ───────────────────────────────────────────
export function SectionTitleBar({ eyebrow, title, sub, gradient = 'from-ink to-[#1a1a1a]' }) {
  return (
    <div className={`bg-gradient-to-r ${gradient} text-white`}>
      <div className="max-w-5xl mx-auto px-6 py-8 md:py-10">
        {eyebrow && (
          <div className="font-mono text-[10px] tracking-[2.5px] uppercase text-white/40 mb-2">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-3xl md:text-4xl font-black leading-tight tracking-tight mb-2">
          {title}
        </h2>
        {sub && (
          <p className="text-sm text-white/55 font-light leading-relaxed max-w-2xl">{sub}</p>
        )}
      </div>
    </div>
  )
}

// ── ContentWrap ───────────────────────────────────────────────
export function ContentWrap({ children, className = '' }) {
  return (
    <div className={`max-w-5xl mx-auto px-4 md:px-6 py-8 ${className}`}>
      {children}
    </div>
  )
}

// ── LoadingSpinner ────────────────────────────────────────────
export function LoadingSpinner({ text = 'Carregant...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 size={24} strokeWidth={1.5} className="text-mid animate-spin"/>
      <span className="font-mono text-xs text-mid">{text}</span>
    </div>
  )
}

// ── EmptyState ────────────────────────────────────────────────
export function EmptyState({ title, sub, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <FileQuestion size={32} strokeWidth={1} className="text-mid/40"/>
      <div className="font-display text-lg font-bold text-ink">{title}</div>
      {sub && <p className="text-sm text-mid max-w-xs">{sub}</p>}
    </div>
  )
}

// ── SearchInput ───────────────────────────────────────────────
export function SearchInput({ value, onChange, placeholder = 'Cerca...' }) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-card focus:outline-none focus:border-mid bg-white transition-colors"
      />
      {value && (
        <button onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-mid hover:text-ink">
          <SearchX size={14} strokeWidth={1.5}/>
        </button>
      )}
    </div>
  )
}

// ── ComplianceBadge ───────────────────────────────────────────
export function ComplianceBadge({ score }) {
  const color = score >= 70 ? '#1a5c30' : score >= 40 ? '#b8860b' : '#b82012'
  const bg    = score >= 70 ? '#e8f5e9' : score >= 40 ? '#fff8e1' : '#fde8e6'
  return (
    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
      style={{ color, background: bg }}>
      {score}% compliment
    </span>
  )
}
