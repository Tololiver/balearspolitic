// src/components/sections/Elect27.jsx
import { useState } from 'react'
import { SectionTitleBar, ContentWrap } from '@/components/ui'

// ── Composicions parlamentàries ──
const PARLAMENTS = [
  { any: 2023, total: 59, partits: [
    { nom:'PP', escons:25, color:'#0e2a6e', pct:'34.7%' },
    { nom:'PSIB', escons:18, color:'#b82012', pct:'26.0%' },
    { nom:'Vox', escons:8, color:'#4a6600', pct:'13.4%' },
    { nom:'Més', escons:4, color:'#1a5c30', pct:'8.3%' },
    { nom:'MxMe', escons:2, color:'#005448', pct:'3.8%' },
    { nom:'Podem', escons:1, color:'#6b0f9e', pct:'2.9%' },
    { nom:'Sa Unió', escons:1, color:'#4527a0', pct:'0.8%' },
  ]},
  { any: 2019, total: 59, partits: [
    { nom:'PSIB', escons:19, color:'#b82012', pct:'27.0%' },
    { nom:'PP', escons:17, color:'#0e2a6e', pct:'25.0%' },
    { nom:'Podem', escons:7, color:'#6b0f9e', pct:'9.8%' },
    { nom:'Més', escons:5, color:'#1a5c30', pct:'9.2%' },
    { nom:'Vox', escons:3, color:'#4a6600', pct:'5.7%' },
    { nom:'El Pi', escons:3, color:'#bf5c00', pct:'5.6%' },
    { nom:'MxMe', escons:2, color:'#005448', pct:'3.3%' },
    { nom:'Cs', escons:3, color:'#e8a000', pct:'7.9%' },
  ]},
  { any: 2015, total: 59, partits: [
    { nom:'PP', escons:20, color:'#0e2a6e', pct:'28.5%' },
    { nom:'PSIB', escons:14, color:'#b82012', pct:'20.8%' },
    { nom:'Podem', escons:10, color:'#6b0f9e', pct:'14.9%' },
    { nom:'Més', escons:6, color:'#1a5c30', pct:'9.4%' },
    { nom:'El Pi', escons:3, color:'#bf5c00', pct:'6.3%' },
    { nom:'MxMe', escons:3, color:'#005448', pct:'4.8%' },
    { nom:'Cs', escons:2, color:'#e8a000', pct:'4.1%' },
    { nom:'Altres', escons:1, color:'#aaa', pct:'1.2%' },
  ]},
]

const SCENARIOS = [
  { id:'pp', title:'Escenari A — Prohens repeteix', color:'#0e2a6e', bg:'#dce8ff',
    desc:'Si el PP manté les posicions actuals i Vox no creix molt, el PP podria repetir amb pacte formal amb Vox.',
    bars:[{label:'PP',pct:34,color:'#0e2a6e'},{label:'PSIB',pct:26,color:'#b82012'},{label:'Vox',pct:12,color:'#4a6600'},{label:'Més',pct:10,color:'#1a5c30'},{label:'Altres',pct:18,color:'#aaa'}]},
  { id:'psib', title:'Escenari B — Retorn de l\'esquerra', color:'#b82012', bg:'#fde8e6',
    desc:'Si la crisi d\'habitatge s\'agreuja i el desgast PP-Vox augmenta, PSIB+Més+Podem podrien recuperar el govern.',
    bars:[{label:'PSIB',pct:29,color:'#b82012'},{label:'PP',pct:30,color:'#0e2a6e'},{label:'Més',pct:11,color:'#1a5c30'},{label:'Vox',pct:10,color:'#4a6600'},{label:'Altres',pct:20,color:'#aaa'}]},
]

const ISSUES = [
  {icon:'home',title:'Habitatge',color:'#b82012',text:'El tema número 1. Baleares és la CCAA amb els preus de lloguer més alts.'},
  {icon:'beach',title:'Turisme',color:'#1a5c30',text:'El debat contenció vs. creixement. L\'ecotasa i el lloguer vacacional seran eixos de batalla.'},
  {icon:'chat',title:'Llengua',color:'#0e2a6e',text:'El pacte PP-Vox ha radicalitzat el debat. El català a les escoles tornarà a ser central.'},
  {icon:'globe',title:'Immigració',color:'#4a6600',text:'Vox intentarà convertir-lo en el tema central. El PP haurà de gestionar la tensió.'},
  {icon:'money',title:'Cost de Vida',color:'#6b0f9e',text:'Poder adquisitiu i salaris de temporada. Mobilitzadora per a l\'electorat jove.'},
  {icon:'leaf',title:'Medi Ambient',color:'#005448',text:'Canvi climàtic, sequeres i pressions sobre recursos hídrics. Eix de Més i PSIB.'},
]

const PROGRAMS27 = [
  {parti:'PP',color:'#0e2a6e',bg:'#dce8ff',lema:'Consolidar la gestió, reduir impostos, turisme sostenible',propostes:['Mantenir la limitació de noves places en pisos plurifamiliars','Pla d\'habitatge de mercat: Lloguer Segur ampliat','Consolidar la lliure elecció lingüística','Nova reducció de l\'IRPF autonòmic','ITS en temporada alta, promoció fora de temporada']},
  {parti:'PSIB–PSOE',color:'#b82012',bg:'#fde8e6',lema:'Habitatge públic, ITS alta, català i serveis públics',propostes:['Fons específic d\'habitatge públic finançat per l\'ITS','Moratòria de places turístiques i limitació creuers','ITS alta tot l\'any','Protecció activa del català en tots els àmbits','Regulació dels preus del lloguer']},
  {parti:'Més per Mallorca',color:'#1a5c30',bg:'#e8f5e9',lema:'Decreixement turístic, habitatge per a residents, sobirania',propostes:['Decreixement turístic actiu: eliminar places','ITS proporcional al preu d\'estada','Limitar compra d\'habitatge a no residents (via UE)','Concert econòmic amb l\'Estat','Català com a única llengua vehicular pública']},
  {parti:'Vox',color:'#4a6600',bg:'#f0f4e0',lema:'Castellà vehicular, contra la immigració, zero impostos nous',propostes:['Castellà llengua vehicular a l\'educació','Derogar l\'ITS','Restriccions dures a la immigració i als MENA','Derogar lleis de memòria democràtica','Reducció radical d\'impostos']},
]

const PARTIES27 = [
  {nom:'PP',status:'Govern actual (2023–)',candidat:'Marga Prohens (presumpta)',prob:'Alta · primera força',color:'#0e2a6e'},
  {nom:'PSIB–PSOE',status:'Principal oposició',candidat:'Armengol o candidat renovat',prob:'Alta · segona força',color:'#b82012'},
  {nom:'Més per Mallorca',status:'Oposició',candidat:'Lluís Apesteguia o renovació',prob:'Alta',color:'#1a5c30'},
  {nom:'Vox',status:'Suport extern PP',candidat:'Manuela Cañadas o renovació',prob:'Alta',color:'#4a6600'},
  {nom:'Podemos',status:'Oposició (1 escó 2023)',candidat:'Possible aliança amb Més',prob:'Moderada · risc desaparició',color:'#6b0f9e'},
  {nom:'Més per Menorca',status:'Oposició',candidat:'Josep Castells o successió',prob:'Alta',color:'#005448'},
  {nom:'El Pi',status:'Fora del Parlament',candidat:'Reforma o refundació total',prob:'Moderada',color:'#bf5c00'},
  {nom:'Sa Unió',status:'Suport extern PP',candidat:'Neus Roig o renovació',prob:'Alta (Formentera)',color:'#4527a0'},
]

const ICONS = {
  home:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  beach:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17.5 8c0 4.142-5.5 13-5.5 13S6.5 12.142 6.5 8a5.5 5.5 0 0 1 11 0z"/><circle cx="12" cy="8" r="2"/></svg>,
  chat:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  globe:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  money:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  leaf:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
}

// ── Calculadora d'escons ──
const PARTITS_CALC = [
  {nom:'PP',color:'#0e2a6e'},
  {nom:'PSIB',color:'#b82012'},
  {nom:'Vox',color:'#4a6600'},
  {nom:'Més',color:'#1a5c30'},
  {nom:'MxMe',color:'#005448'},
  {nom:'Podem',color:'#6b0f9e'},
  {nom:'Sa Unió',color:'#4527a0'},
  {nom:'El Pi',color:'#bf5c00'},
  {nom:'Altres',color:'#999'},
]

function Calculator() {
  const TOTAL = 59
  const majoria = Math.ceil(TOTAL / 2)
  const [seats, setSeats] = useState(() => {
    const s = {}
    PARTITS_CALC.forEach(p => s[p.nom] = 0)
    s['PP'] = 25; s['PSIB'] = 18; s['Vox'] = 8; s['Més'] = 4; s['MxMe'] = 2; s['Podem'] = 1; s['Sa Unió'] = 1
    return s
  })

  const total = Object.values(seats).reduce((a, b) => a + b, 0)
  const overflow = total > TOTAL

  const update = (nom, val) => {
    const n = Math.max(0, Math.min(TOTAL, parseInt(val) || 0))
    setSeats(prev => ({ ...prev, [nom]: n }))
  }

  // Governs possibles
  const govPP   = (seats['PP'] || 0) + (seats['Vox'] || 0) + (seats['Sa Unió'] || 0)
  const govESQ  = (seats['PSIB'] || 0) + (seats['Més'] || 0) + (seats['Podem'] || 0) + (seats['MxMe'] || 0)
  const govPPsol = seats['PP'] || 0

  return (
    <div className="bg-white rounded-card border border-border overflow-hidden">
      <div className="bg-ink px-5 py-4">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-white/40 mb-1">Eina interactiva</div>
        <div className="font-display text-xl font-black text-white">Simulador de Resultats 2027</div>
        <div className="text-xs text-white/50 mt-1">Introdueix escons per a cada partit · Total: {TOTAL} · Majoria: {majoria}</div>
      </div>

      <div className="p-5">
        {overflow && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 text-xs text-amber-700">
            ⚠️ El total ({total}) supera els {TOTAL} escons disponibles.
          </div>
        )}

        {/* Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {PARTITS_CALC.map(p => (
            <div key={p.nom} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-paper">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: p.color }} />
              <span className="text-xs font-semibold text-ink flex-1">{p.nom}</span>
              <input
                type="number" min="0" max={TOTAL}
                value={seats[p.nom]}
                onChange={e => update(p.nom, e.target.value)}
                className="w-12 text-center text-sm font-mono font-bold border border-border rounded px-1 py-0.5 focus:outline-none focus:border-mid bg-white"
                style={{ color: p.color }}
              />
            </div>
          ))}
        </div>

        {/* Barra visual */}
        <div className="mb-2">
          <div className="relative">
            <div className="flex h-8 rounded-lg overflow-hidden border border-border">
              {PARTITS_CALC.filter(p => seats[p.nom] > 0).map(p => (
                <div key={p.nom}
                  style={{ flex: seats[p.nom], background: p.color, transition:'flex 0.3s' }}
                  title={`${p.nom}: ${seats[p.nom]}`}
                  className="flex items-center justify-center">
                  {seats[p.nom] >= 3 && (
                    <span className="text-white font-mono text-[9px] font-bold">{seats[p.nom]}</span>
                  )}
                </div>
              ))}
              {total < TOTAL && (
                <div style={{ flex: TOTAL - total, background:'#eee' }} className="flex items-center justify-center">
                  <span className="text-mid font-mono text-[9px]">{TOTAL - total}</span>
                </div>
              )}
            </div>
            {/* Línia de majoria */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
              style={{ left: `${(majoria / TOTAL) * 100}%` }}
              title={`Majoria: ${majoria}`}
            >
              <div className="absolute -top-5 -translate-x-1/2 font-mono text-[9px] text-red-500 whitespace-nowrap font-bold">
                majoria ({majoria})
              </div>
            </div>
          </div>
        </div>

        {/* Llegenda */}
        <div className="flex flex-wrap gap-2 mb-5">
          {PARTITS_CALC.filter(p => seats[p.nom] > 0).map(p => (
            <span key={p.nom} className="flex items-center gap-1 text-[10px] font-mono text-mid">
              <span className="w-2 h-2 rounded-sm" style={{ background: p.color }} />
              {p.nom}: {seats[p.nom]}
            </span>
          ))}
          <span className="font-mono text-[10px] text-mid ml-auto">Total: {total}/{TOTAL}</span>
        </div>

        {/* Resultat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`rounded-lg p-3 border-2 ${govPPsol >= majoria ? 'border-pp bg-pp-bg' : 'border-border bg-paper'}`}>
            <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-mid mb-1">PP en solitari</div>
            <div className="font-display text-2xl font-black" style={{ color:'#0e2a6e' }}>{govPPsol}</div>
            <div className="text-[10px] text-mid mt-1">{govPPsol >= majoria ? '✅ Majoria absoluta' : `Falta ${majoria - govPPsol} per majoria`}</div>
          </div>
          <div className={`rounded-lg p-3 border-2 ${govPP >= majoria ? 'border-pp bg-pp-bg' : 'border-border bg-paper'}`}>
            <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-mid mb-1">PP + Vox + Sa Unió</div>
            <div className="font-display text-2xl font-black" style={{ color:'#0e2a6e' }}>{govPP}</div>
            <div className="text-[10px] text-mid mt-1">{govPP >= majoria ? '✅ Poden governar' : `Falta ${majoria - govPP} per majoria`}</div>
          </div>
          <div className={`rounded-lg p-3 border-2 ${govESQ >= majoria ? 'border-psib bg-psib-bg' : 'border-border bg-paper'}`}>
            <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-mid mb-1">PSIB + Més + Podem + MxMe</div>
            <div className="font-display text-2xl font-black" style={{ color:'#b82012' }}>{govESQ}</div>
            <div className="text-[10px] text-mid mt-1">{govESQ >= majoria ? '✅ Poden governar' : `Falta ${majoria - govESQ} per majoria`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Elect27() {
  const [openProg, setOpenProg] = useState(null)
  const [parlAny, setParlAny] = useState(2023)
  const parl = PARLAMENTS.find(p => p.any === parlAny)

  return (
    <>
      <SectionTitleBar
        eyebrow="Pròximes eleccions autonòmiques previstes"
        title="Eleccions 2027"
        sub="Escenaris, composicions parlamentàries, temes de campanya i simulador de resultats. Data prevista: maig 2027."
        gradient="from-ink to-[#0a1a4e]"
      />
      <ContentWrap>

        {/* Avís */}
        <div className="bg-amber-50 border border-amber-200 rounded-card p-4 mb-8 flex gap-3">
          <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Nota:</strong> Projecció anticipada basada en tendències actuals i declaracions fins a juny 2026. No són programes electorals oficials.
          </p>
        </div>

        {/* ── COMPOSICIONS PARLAMENTÀRIES ── */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Composicions parlamentàries · Eleccions 2015, 2019, 2023</div>
        <div className="bg-white rounded-card border border-border overflow-hidden mb-8">
          {/* Selector d'any */}
          <div className="flex border-b border-border">
            {PARLAMENTS.map(p => (
              <button key={p.any} onClick={() => setParlAny(p.any)}
                className={`flex-1 py-3 text-sm font-bold font-mono transition-colors ${parlAny === p.any ? 'bg-ink text-white' : 'text-mid hover:bg-paper'}`}>
                {p.any}
              </button>
            ))}
          </div>
          <div className="p-5">
            {/* Barra gran */}
            <div className="flex h-10 rounded-lg overflow-hidden mb-3">
              {parl?.partits.map(p => (
                <div key={p.nom} style={{ flex: p.escons, background: p.color }}
                  title={`${p.nom}: ${p.escons} (${p.pct})`}
                  className="flex items-center justify-center">
                  {p.escons >= 3 && <span className="text-white font-mono text-[10px] font-bold">{p.escons}</span>}
                </div>
              ))}
            </div>
            {/* Majoria */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-0.5 h-4 bg-red-400" />
              <span className="text-xs text-mid font-mono">Majoria absoluta: {Math.ceil((parl?.total||59)/2)} escons</span>
            </div>
            {/* Taula */}
            <div className="space-y-0">
              {parl?.partits.map(p => (
                <div key={p.nom} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-sm font-semibold text-ink w-32">{p.nom}</span>
                  <div className="flex-1 bg-paper rounded-sm h-2 overflow-hidden">
                    <div className="h-full rounded-sm" style={{ width:`${(p.escons/59)*100}%`, background:p.color }} />
                  </div>
                  <span className="font-mono text-sm font-bold w-6 text-right" style={{ color:p.color }}>{p.escons}</span>
                  <span className="font-mono text-xs text-mid w-12 text-right">{p.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SIMULADOR ── */}
        <div className="mb-8"><Calculator /></div>

        {/* ── ESCENARIS ── */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Escenaris electorals — Tendències 2026</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SCENARIOS.map(s => (
            <div key={s.id} className="bg-white rounded-card border border-border border-l-4 overflow-hidden" style={{ borderLeftColor:s.color }}>
              <div className="p-5">
                <div className="font-display text-base font-bold text-ink mb-2">{s.title}</div>
                <p className="text-xs text-mid leading-relaxed mb-4">{s.desc}</p>
                <div className="flex h-6 rounded overflow-hidden mb-2">
                  {s.bars.map(b => (
                    <div key={b.label} style={{ flex:b.pct, background:b.color }} title={`${b.label} ~${b.pct}%`}
                      className="flex items-center justify-center">
                      {b.pct >= 10 && <span className="text-white font-mono text-[9px] font-bold">{b.label}</span>}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.bars.map(b => (
                    <span key={b.label} className="flex items-center gap-1 font-mono text-[9px] text-mid">
                      <span className="w-2 h-2 rounded-sm" style={{ background:b.color }} />{b.label} ~{b.pct}%
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-mid/50 mt-2 font-mono">Projecció orientativa · juny 2026</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── TEMES ── */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Els temes que decidiran les eleccions</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {ISSUES.map(issue => (
            <div key={issue.title} className="bg-white rounded-card border border-border p-4 border-t-2" style={{ borderTopColor:issue.color }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color:issue.color }}>{ICONS[issue.icon]}</span>
                <span className="font-display font-bold text-sm text-ink">{issue.title}</span>
              </div>
              <p className="text-xs text-mid leading-relaxed">{issue.text}</p>
            </div>
          ))}
        </div>

        {/* ── PROGRAMES ANTICIPATS ── */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Que diuen els partits de cara al 2027</div>
        <div className="space-y-2 mb-8">
          {PROGRAMS27.map((p, i) => (
            <div key={p.parti} className="bg-white rounded-card border border-border overflow-hidden"
              style={{ borderLeftWidth: openProg === i ? 4 : 2, borderLeftColor: openProg === i ? p.color : 'transparent' }}>
              <button onClick={() => setOpenProg(openProg === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-paper transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] font-bold text-white px-2.5 py-1 rounded" style={{ background:p.color }}>{p.parti}</span>
                  <span className="text-xs text-mid hidden sm:inline">{p.lema}</span>
                </div>
                <svg className={`w-4 h-4 text-mid flex-shrink-0 transition-transform ${openProg === i ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {openProg === i && (
                <div className="border-t border-border p-5" style={{ background:p.bg }}>
                  <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-3" style={{ color:p.color }}>{p.lema}</div>
                  <ul className="space-y-1.5">
                    {p.propostes.map((pr, j) => (
                      <li key={j} className="flex gap-2 text-xs text-mid leading-relaxed py-1.5 border-b border-black/5 last:border-0">
                        <span style={{ color:p.color }} className="flex-shrink-0 font-bold">→</span><span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── PARTITS ── */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Formacions previstes</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PARTIES27.map(p => (
            <div key={p.nom} className="bg-white rounded-card border border-border p-4 border-t-2" style={{ borderTopColor:p.color }}>
              <div className="font-display font-bold text-sm mb-1" style={{ color:p.color }}>{p.nom}</div>
              <div className="font-mono text-[9px] text-mid mb-2">{p.status}</div>
              <div className="text-xs text-mid mb-2"><strong className="text-ink">Candidat/a: </strong>{p.candidat}</div>
              <div className="font-mono text-[9px] bg-paper rounded px-2 py-1 text-mid">{p.prob}</div>
            </div>
          ))}
        </div>

      </ContentWrap>
    </>
  )
}
