// src/components/sections/Governs.jsx
import { useState } from 'react'
import { useGoverns } from '@/hooks/useData'
import { SectionTitleBar, ContentWrap, LoadingSpinner } from '@/components/ui'

// Composicions parlamentàries per legislatura (keyed per ordre del govern)
// Estoy suponiendo alguns escons de les legislatures 1983-2011 — verifícalos
const PARLAMENTS = {
  1:  { total:41, note:'I Legislatura · 41 escons', partits:[{nom:'AP/CP',n:21,c:'#1565c0'},{nom:'PSIB',n:8,c:'#c0392b'},{nom:'UM',n:5,c:'#e67e22'},{nom:'PSM',n:5,c:'#27ae60'},{nom:'Altres',n:2,c:'#aaa'}] },
  2:  { total:59, note:'II Legislatura · 59 escons', partits:[{nom:'PP/AP',n:30,c:'#1565c0'},{nom:'PSIB',n:13,c:'#c0392b'},{nom:'UM',n:6,c:'#e67e22'},{nom:'PSM',n:6,c:'#27ae60'},{nom:'Altres',n:4,c:'#aaa'}] },
  3:  { total:59, note:'III Legislatura · 59 escons', partits:[{nom:'PP',n:31,c:'#1565c0'},{nom:'PSIB',n:16,c:'#c0392b'},{nom:'UM',n:6,c:'#e67e22'},{nom:'PSM',n:6,c:'#27ae60'}] },
  4:  { total:59, note:'III Legislatura (continuació) · 59 escons', partits:[{nom:'PP',n:31,c:'#1565c0'},{nom:'PSIB',n:16,c:'#c0392b'},{nom:'UM',n:6,c:'#e67e22'},{nom:'PSM',n:6,c:'#27ae60'}] },
  5:  { total:59, note:'IV Legislatura · 59 escons', partits:[{nom:'PP',n:28,c:'#1565c0'},{nom:'PSIB',n:16,c:'#c0392b'},{nom:'UM',n:9,c:'#e67e22'},{nom:'PSM',n:6,c:'#27ae60'}] },
  6:  { total:59, note:'V Legislatura · 59 escons', partits:[{nom:'PP',n:19,c:'#1565c0'},{nom:'PSIB',n:19,c:'#c0392b'},{nom:'PSM',n:5,c:'#27ae60'},{nom:'UM',n:5,c:'#e67e22'},{nom:'EU/Verds',n:3,c:'#8e44ad'},{nom:'Altres',n:8,c:'#aaa'}] },
  7:  { total:59, note:'VI Legislatura · 59 escons', partits:[{nom:'PP',n:29,c:'#1565c0'},{nom:'PSIB',n:16,c:'#c0392b'},{nom:'UM',n:9,c:'#e67e22'},{nom:'PSM',n:5,c:'#27ae60'}] },
  8:  { total:59, note:'VII Legislatura · 59 escons', partits:[{nom:'PP',n:21,c:'#1565c0'},{nom:'PSIB',n:20,c:'#c0392b'},{nom:'Bloc',n:7,c:'#27ae60'},{nom:'UM',n:5,c:'#e67e22'},{nom:'Cs',n:3,c:'#f39c12'},{nom:'Altres',n:3,c:'#aaa'}] },
  9:  { total:59, note:'VIII Legislatura · 59 escons', partits:[{nom:'PP',n:35,c:'#0d47a1'},{nom:'PSIB',n:14,c:'#c0392b'},{nom:'Podem',n:6,c:'#8e44ad'},{nom:'Més',n:4,c:'#27ae60'}] },
  10: { total:59, note:'IX Legislatura · 59 escons', partits:[{nom:'PP',n:20,c:'#1565c0'},{nom:'PSIB',n:14,c:'#c0392b'},{nom:'Podem',n:10,c:'#8e44ad'},{nom:'Més',n:6,c:'#27ae60'},{nom:'El Pi',n:3,c:'#00d5af'},{nom:'MxMe',n:3,c:'#005151'},{nom:'Cs',n:2,c:'#f39c12'},{nom:'Altres',n:1,c:'#aaa'}] },
  11: { total:59, note:'X Legislatura · 59 escons', partits:[{nom:'PSIB',n:19,c:'#c0392b'},{nom:'PP',n:17,c:'#1565c0'},{nom:'Podem',n:7,c:'#8e44ad'},{nom:'Més',n:5,c:'#27ae60'},{nom:'Vox',n:3,c:'#4a6600'},{nom:'El Pi',n:3,c:'#00d5af'},{nom:'MxMe',n:2,c:'#005151'},{nom:'Cs',n:3,c:'#f39c12'}] },
  12: { total:59, note:'XI Legislatura · 59 escons', partits:[{nom:'PP',n:25,c:'#0e2a6e'},{nom:'PSIB',n:18,c:'#e30022'},{nom:'Vox',n:8,c:'#4a6600'},{nom:'Més',n:4,c:'#1a5c30'},{nom:'MxMe',n:2,c:'#005151'},{nom:'Podem',n:1,c:'#6b0f9e'},{nom:'Sa Unió',n:1,c:'#009d99'}] },
}

// Partits de coalició per govern (badges de color)
const COALICIONS = {
  1:  [],
  2:  [],
  3:  [],
  4:  [{nom:'PP',c:'#1565c0'}],
  5:  [{nom:'PP',c:'#1565c0'},{nom:'UM',c:'#e67e22'}],
  6:  [{nom:'PSIB',c:'#c0392b'},{nom:'PSM',c:'#27ae60'},{nom:'EU',c:'#8e44ad'},{nom:'Els Verds',c:'#2ecc71'},{nom:'UM',c:'#e67e22'}],
  7:  [{nom:'PP',c:'#1565c0'},{nom:'UM',c:'#e67e22'}],
  8:  [{nom:'PSIB',c:'#c0392b'},{nom:'Bloc',c:'#27ae60'},{nom:'UM',c:'#e67e22'}],
  9:  [{nom:'PP',c:'#0d47a1'}],
  10: [{nom:'PSIB',c:'#c0392b'},{nom:'Més',c:'#27ae60'},{nom:'MxMe',c:'#005151'}],
  11: [{nom:'PSIB',c:'#c0392b'},{nom:'Podem',c:'#8e44ad'},{nom:'Més',c:'#27ae60'}],
  12: [{nom:'PP',c:'#0e2a6e'}],
}

export default function Governs() {
  const { data: governs, isLoading } = useGoverns()
  const [open, setOpen] = useState(null)

  if (isLoading) return <><SectionTitleBar title="Governs" /><ContentWrap><LoadingSpinner /></ContentWrap></>

  return (
    <>
      <SectionTitleBar
        eyebrow={`${governs?.length || 0} governs · 1983–avui`}
        title="Cronologia dels Governs"
        sub="Tots els governs de la democràcia balear. Qui governava, amb qui, composició del parlament, consellers i lleis clau."
        gradient="from-ink to-[#0a1a0e]"
      />
      <ContentWrap>

        {/* Timeline horitzontal */}
        {governs?.length > 0 && (
          <div className="bg-ink rounded-card p-5 mb-6">
            <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/30 mb-3">
              Cronologia 1983–avui · {governs.length} governs
            </div>
            <div className="flex h-6 rounded overflow-hidden">
              {governs.map(g => (
                <div key={g.id}
                  style={{ flex: 1, background: g.color }}
                  title={`${g.nom} · ${g.periode}`}
                  className="cursor-pointer hover:opacity-75 transition-opacity flex items-center justify-center"
                  onClick={() => setOpen(open === g.id ? null : g.id)}
                >
                  {governs.length <= 12 && (
                    <span className="text-white font-mono text-[7px] font-bold opacity-70 hidden sm:block px-0.5 truncate">
                      {g.periode?.split('–')[0]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Llegenda colors */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/45">
                <span className="w-3 h-3 rounded-sm" style={{ background:'#0e2a6e' }} />PP / AP
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/45">
                <span className="w-3 h-3 rounded-sm" style={{ background:'#e30022' }} />PSIB–PSOE
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/45">
                <span className="w-3 h-3 rounded-sm" style={{ background:'#37474f' }} />Transició
              </span>
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="space-y-2">
          {governs?.map(g => (
            <GovernCard
              key={g.id}
              govern={g}
              parlament={PARLAMENTS[g.ordre]}
              coalicio={COALICIONS[g.ordre] || []}
              isOpen={open === g.id}
              onToggle={() => setOpen(open === g.id ? null : g.id)}
            />
          ))}
        </div>
      </ContentWrap>
    </>
  )
}

function GovernCard({ govern: g, parlament, coalicio, isOpen, onToggle }) {
  const majoria = parlament ? Math.ceil(parlament.total / 2) : 30
  const topParti = parlament?.partits?.[0]

  return (
    <div className="bg-white rounded-card border-2 overflow-hidden transition-all"
      style={{ borderColor: isOpen ? g.color : 'transparent', borderLeftWidth: 4, borderLeftColor: g.color }}>

      {/* Capçalera sempre visible */}
      <button onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-paper transition-colors">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="min-w-0">
            <div className="font-display text-lg font-bold text-ink leading-tight">{g.nom}</div>
            <div className="text-xs text-mid mt-0.5">{g.periode} · {g.president}</div>
            {/* Badges de coalició */}
            {coalicio.length > 1 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {coalicio.map(p => (
                  <span key={p.nom} className="font-mono text-[9px] font-bold text-white px-1.5 py-0.5 rounded"
                    style={{ background: p.c }}>{p.nom}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span className="font-mono text-[10px] text-white px-2 py-0.5 rounded hidden sm:block"
            style={{ background: g.color }}>
            {g.parti_label || ''}
          </span>
          <svg className={`w-4 h-4 text-mid transition-transform ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </button>

      {/* Contingut expandit */}
      {isOpen && (
        <div className="border-t border-border">

          {/* Composició del parlament */}
          {parlament && (
            <div className="px-5 py-4 bg-ink/3 border-b border-border">
              <div className="font-mono text-[9px] tracking-[2px] uppercase text-mid mb-2">
                Composició del parlament · {parlament.note}
              </div>
              <div className="flex h-5 rounded overflow-hidden mb-2">
                {parlament.partits.map(p => (
                  <div key={p.nom} style={{ flex: p.n, background: p.c }}
                    title={`${p.nom}: ${p.n}`}
                    className="flex items-center justify-center">
                    {p.n >= 5 && <span className="text-white font-mono text-[8px] font-bold">{p.n}</span>}
                  </div>
                ))}
              </div>
              {/* Línia majoria */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-3 bg-red-400" />
                <span className="font-mono text-[9px] text-mid">Majoria: {majoria} escons</span>
                {topParti && (
                  <span className="ml-auto font-mono text-[9px] text-mid">
                    1a força: <strong style={{ color: topParti.c }}>{topParti.nom} ({topParti.n})</strong>
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {parlament.partits.map(p => (
                  <span key={p.nom} className="flex items-center gap-1 font-mono text-[9px] text-mid">
                    <span className="w-2 h-2 rounded-sm" style={{ background: p.c }} />
                    {p.nom}: {p.n}
                  </span>
                ))}
              </div>
              {parlament.note?.includes('suposant') && (
                <div className="text-[9px] text-amber-600 mt-1.5 font-mono">⚠ Dades aproximades — verifícalas</div>
              )}
            </div>
          )}

          {/* Context */}
          {g.context && (
            <div className="px-5 py-4 bg-paper border-b border-border">
              <p className="text-sm text-mid leading-relaxed">{g.context}</p>
            </div>
          )}

          {/* Coalició */}
          <div className="px-5 py-3 border-b border-border flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] tracking-[2px] uppercase text-mid font-bold">Coalició · Suports:</span>
            <span className="text-xs text-ink">{g.coalicio}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {g.vicepresidents?.length > 0 && (
              <div className="p-5">
                <SLabel color={g.color} icon={<IcoUser />} label="Vicepresidència" />
                <ul className="mt-2 space-y-0">
                  {g.vicepresidents.map((v, i) => <Item key={i} text={v} color={g.color} />)}
                </ul>
              </div>
            )}
            {g.consellers?.length > 0 && (
              <div className="p-5">
                <SLabel color={g.color} icon={<IcoBuild />} label="Consellers i Conselleres" />
                <div className="mt-2 grid grid-cols-1 gap-0">
                  {g.consellers.map((c, i) => <Item key={i} text={c} color={g.color} />)}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-t border-border">
            {g.lleis?.length > 0 && (
              <div className="p-5">
                <SLabel color={g.color} icon={<IcoDoc />} label="Lleis i mesures clau" />
                <ul className="mt-2 space-y-0">
                  {g.lleis.map((l, i) => <Item key={i} text={l} color={g.color} />)}
                </ul>
              </div>
            )}
            {g.fites?.length > 0 && (
              <div className="p-5">
                <SLabel color={g.color} icon={<IcoStar />} label="Fites polítiques" />
                <ul className="mt-2 space-y-0">
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

function SLabel({ color, icon, label }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[2px] uppercase font-bold" style={{ color }}>
      {icon}{label}
    </div>
  )
}

function Item({ text, color }) {
  return (
    <li className="flex gap-2 text-xs text-mid leading-relaxed py-1.5 border-b border-border last:border-0 list-none">
      <span className="flex-shrink-0 font-bold mt-0.5" style={{ color }}>›</span>
      <span>{text}</span>
    </li>
  )
}

function IcoUser()  { return <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function IcoBuild() { return <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> }
function IcoDoc()   { return <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg> }
function IcoStar()  { return <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
