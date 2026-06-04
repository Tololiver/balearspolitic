// src/components/layout/NavTabs.jsx
import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/',               label: 'PP vs PSOE',      icon: <IcoBalance /> },
  { to: '/partits',        label: 'Fitxes',           icon: <IcoUsers /> },
  { to: '/comparador',     label: 'Comparador',       icon: <IcoCompare /> },
  { to: '/programes',      label: 'Programes',        icon: <IcoDoc /> },
  { to: '/pobles',         label: 'Pobles',           icon: <IcoHouse /> },
  { to: '/eleccions-2027', label: 'Eleccions 2027',   icon: <IcoCalendar /> },
  { to: '/governs',        label: 'Governs',          icon: <IcoLayers /> },
  { to: '/fonts',          label: 'Fonts',            icon: <IcoBook /> },
]

export default function NavTabs() {
  return (
    <nav className="bg-ink sticky top-0 z-50 border-b border-white/8">
      <div className="max-w-5xl mx-auto px-4 flex overflow-x-auto scrollbar-none">
        {TABS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              [
                'flex items-center gap-1.5 px-3.5 py-3.5 text-[11px] font-semibold',
                'whitespace-nowrap border-b-2 transition-all duration-150',
                isActive
                  ? 'text-white border-accent'
                  : 'text-white/55 border-transparent hover:text-white/90 hover:border-white/25',
              ].join(' ')
            }
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(' ')[0]}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

// ── Thin SVG icons (strokeWidth 1.5) ──
function IcoBalance() {
  return <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M5 7l7-4 7 4M5 17l7 4 7-4M3 12h18"/></svg>
}
function IcoUsers() {
  return <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function IcoCompare() {
  return <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
}
function IcoDoc() {
  return <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
}
function IcoHouse() {
  return <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function IcoCalendar() {
  return <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>
}
function IcoLayers() {
  return <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
}
function IcoBook() {
  return <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
}
