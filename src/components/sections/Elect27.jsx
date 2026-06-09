// src/components/sections/Elect27.jsx
// src/components/sections/Elect27.jsx
import { useState } from 'react'
import { SectionTitleBar, ContentWrap, LoadingSpinner } from '@/components/ui'
import { useCandidatures, useSondejos } from '@/hooks/useCandidatures'
import PartyBadge from '@/components/ui/PartyBadge'

// ── Dades parlament Govern IB ──────────────────────────────────
const PARLAMENTS_GOVERN = [
  { any:2023, total:59, partits:[{nom:'PP',n:25,c:'#0e2a6e'},{nom:'PSIB',n:18,c:'#e30022'},{nom:'Vox',n:8,c:'#4a6600'},{nom:'Més',n:4,c:'#1a5c30'},{nom:'MxMe',n:2,c:'#005151'},{nom:'Podem',n:1,c:'#6b0f9e'},{nom:'Sa Unió',n:1,c:'#009d99'}]},
  { any:2019, total:59, partits:[{nom:'PSIB',n:19,c:'#e30022'},{nom:'PP',n:17,c:'#0e2a6e'},{nom:'Podem',n:7,c:'#6b0f9e'},{nom:'Més',n:5,c:'#1a5c30'},{nom:'Vox',n:3,c:'#4a6600'},{nom:'El Pi',n:3,c:'#00d5af'},{nom:'MxMe',n:2,c:'#005151'},{nom:'Cs',n:3,c:'#e8a000'}]},
  { any:2015, total:59, partits:[{nom:'PP',n:20,c:'#0e2a6e'},{nom:'PSIB',n:14,c:'#e30022'},{nom:'Podem',n:10,c:'#6b0f9e'},{nom:'Més',n:6,c:'#1a5c30'},{nom:'El Pi',n:3,c:'#00d5af'},{nom:'MxMe',n:3,c:'#005151'},{nom:'Cs',n:2,c:'#e8a000'},{nom:'Altres',n:1,c:'#aaa'}]},
]

// ── Dades Consells Insulars (estoy suponiendo alguns escons 2015/2019) ──
const CONSELLS = {
  Mallorca: {
    total: 51,
    note: 'Consell Insular de Mallorca · 51 consellers',
    anys: [
      { any:2023, partits:[{nom:'PP',n:21,c:'#0e2a6e'},{nom:'PSIB',n:13,c:'#e30022'},{nom:'Vox',n:7,c:'#4a6600'},{nom:'Més',n:5,c:'#1a5c30'},{nom:'El Pi',n:3,c:'#00d5af'},{nom:'MxMe',n:2,c:'#005151'}] },
      { any:2019, partits:[{nom:'PSIB',n:16,c:'#e30022'},{nom:'PP',n:14,c:'#0e2a6e'},{nom:'Podem',n:6,c:'#6b0f9e'},{nom:'Més',n:6,c:'#1a5c30'},{nom:'El Pi',n:5,c:'#00d5af'},{nom:'Vox',n:2,c:'#4a6600'},{nom:'MxMe',n:2,c:'#005151'}] },
      { any:2015, partits:[{nom:'PP',n:16,c:'#0e2a6e'},{nom:'PSIB',n:12,c:'#e30022'},{nom:'Podem',n:8,c:'#6b0f9e'},{nom:'Més',n:7,c:'#1a5c30'},{nom:'El Pi',n:5,c:'#00d5af'},{nom:'MxMe',n:3,c:'#005151'}] },
    ]
  },
  Menorca: {
    total: 21,
    note: 'Consell Insular de Menorca · 21 consellers',
    anys: [
      { any:2023, partits:[{nom:'PP',n:8,c:'#0e2a6e'},{nom:'PSIB',n:7,c:'#e30022'},{nom:'MxMe',n:4,c:'#005151'},{nom:'Vox',n:2,c:'#4a6600'}] },
      { any:2019, partits:[{nom:'PSIB',n:8,c:'#e30022'},{nom:'PP',n:6,c:'#0e2a6e'},{nom:'MxMe',n:5,c:'#005151'},{nom:'Podem',n:2,c:'#6b0f9e'}] },
      { any:2015, partits:[{nom:'PP',n:8,c:'#0e2a6e'},{nom:'PSIB',n:7,c:'#e30022'},{nom:'MxMe',n:4,c:'#005151'},{nom:'Podem',n:2,c:'#6b0f9e'}] },
    ]
  },
  Eivissa: {
    total: 30,
    note: 'Consell Insular d\'Eivissa · 30 consellers',
    anys: [
      { any:2023, partits:[{nom:'PP',n:13,c:'#0e2a6e'},{nom:'PSIB',n:9,c:'#e30022'},{nom:'Vox',n:5,c:'#4a6600'},{nom:'Podem',n:3,c:'#6b0f9e'}] },
      { any:2019, partits:[{nom:'PSIB',n:11,c:'#e30022'},{nom:'PP',n:10,c:'#0e2a6e'},{nom:'Podem',n:5,c:'#6b0f9e'},{nom:'Vox',n:2,c:'#4a6600'},{nom:'Cs',n:2,c:'#e8a000'}] },
      { any:2015, partits:[{nom:'PP',n:12,c:'#0e2a6e'},{nom:'PSIB',n:9,c:'#e30022'},{nom:'Podem',n:6,c:'#6b0f9e'},{nom:'Cs',n:2,c:'#e8a000'},{nom:'Altres',n:1,c:'#aaa'}] },
    ]
  },
  Formentera: {
    total: 13,
    note: 'Consell Insular de Formentera · 13 consellers',
    anys: [
      { any:2023, partits:[{nom:'Sa Unió',n:6,c:'#009d99'},{nom:'PP',n:4,c:'#0e2a6e'},{nom:'PSIB',n:3,c:'#e30022'}] },
      { any:2019, partits:[{nom:'PSIB-GxF',n:6,c:'#e30022'},{nom:'PP',n:4,c:'#0e2a6e'},{nom:'Podem',n:2,c:'#6b0f9e'},{nom:'Sa Unió',n:1,c:'#009d99'}] },
      { any:2015, partits:[{nom:'PSIB-GxF',n:7,c:'#e30022'},{nom:'PP',n:4,c:'#0e2a6e'},{nom:'Podem',n:2,c:'#6b0f9e'}] },
    ]
  },
}

const ILLES_CONSELLS = ['totes','Mallorca','Menorca','Eivissa','Formentera']

const ISSUES = [
  {icon:'home',title:'Habitatge',color:'#e30022',text:'El tema número 1. Baleares és la CCAA amb els preus de lloguer més alts.'},
  {icon:'beach',title:'Turisme',color:'#1a5c30',text:'Contenció vs. creixement. L\'ecotasa i el lloguer vacacional seran eixos centrals.'},
  {icon:'chat',title:'Llengua',color:'#0e2a6e',text:'El pacte PP-Vox ha radicalitzat el debat lingüístic.'},
  {icon:'globe',title:'Immigració',color:'#4a6600',text:'Vox intentarà convertir-lo en el tema central de la campanya.'},
  {icon:'money',title:'Cost de Vida',color:'#6b0f9e',text:'Poder adquisitiu i salaris de temporada. Mobilitzadora per a l\'electorat jove.'},
  {icon:'leaf',title:'Medi Ambient',color:'#005151',text:'Canvi climàtic, sequeres i pressions sobre recursos hídrics.'},
]

const ICONS = {
  home:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  beach:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17.5 8c0 4.142-5.5 13-5.5 13S6.5 12.142 6.5 8a5.5 5.5 0 0 1 11 0z"/><circle cx="12" cy="8" r="2"/></svg>,
  chat:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  globe:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  money:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  leaf:<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
}

const PARTITS_CALC = [
  {nom:'PP',color:'#0e2a6e'},{nom:'PSIB',color:'#e30022'},{nom:'Vox',color:'#4a6600'},
  {nom:'Més',color:'#1a5c30'},{nom:'MxMe',color:'#005151'},{nom:'Podem',color:'#6b0f9e'},
  {nom:'Sa Unió',color:'#009d99'},{nom:'El Pi',color:'#00d5af'},{nom:'Altres',color:'#999'},
]

// ── Barra de parlament ─────────────────────────────────────────
function ParlamentBar({ data, total, note, approx }) {
  const majoria = Math.ceil(total / 2)
  return (
    <div>
      <div className="flex h-6 rounded-lg overflow-hidden mb-2">
        {data.partits.map(p => (
          <div key={p.nom} style={{flex:p.n, background:p.c}} title={`${p.nom}: ${p.n}`}
            className="flex items-center justify-center">
            {p.n >= 3 && <span className="text-white font-mono text-[9px] font-bold">{p.n}</span>}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-0.5 h-3 bg-red-400"/>
        <span className="font-mono text-[9px] text-mid">Majoria: {majoria}</span>
        {approx && <span className="font-mono text-[9px] text-amber-600 ml-auto">⚠ Dades aproximades</span>}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {data.partits.map(p => (
          <span key={p.nom} className="flex items-center gap-1 font-mono text-[9px] text-mid">
            <span className="w-2 h-2 rounded-sm" style={{background:p.c}}/>{p.nom}: {p.n}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Resultats per Consell ──────────────────────────────────────
function ConsellResultats({ illa }) {
  const [any, setAny] = useState(2023)
  const consell = CONSELLS[illa]
  if (!consell) return null
  const data = consell.anys.find(a => a.any === any)

  return (
    <div className="bg-white rounded-card border border-border overflow-hidden mt-4">
      <div className="flex border-b border-border">
        {[2023, 2019, 2015].map(a => (
          <button key={a} onClick={() => setAny(a)}
            className={`flex-1 py-2.5 text-xs font-bold font-mono transition-colors ${any === a ? 'bg-ink text-white' : 'text-mid hover:bg-paper'}`}>
            {a}
          </button>
        ))}
      </div>
      <div className="p-4">
        <div className="font-mono text-[9px] tracking-[2px] uppercase text-mid mb-3">{consell.note}</div>
        {data && <ParlamentBar data={data} total={consell.total} approx={any < 2023} />}
      </div>
    </div>
  )
}

// ── Simulador ─────────────────────────────────────────────────
function Calculator() {
  const TOTAL=59, majoria=Math.ceil(TOTAL/2)
  const [seats,setSeats] = useState(()=>{
    const s={}; PARTITS_CALC.forEach(p=>s[p.nom]=0)
    s.PP=25;s.PSIB=18;s.Vox=8;s.Més=4;s.MxMe=2;s.Podem=1;s['Sa Unió']=1
    return s
  })
  const total=Object.values(seats).reduce((a,b)=>a+b,0)
  const govPP=(seats.PP||0)+(seats.Vox||0)+(seats['Sa Unió']||0)
  const govESQ=(seats.PSIB||0)+(seats.Més||0)+(seats.Podem||0)+(seats.MxMe||0)
  return (
    <div className="bg-white rounded-card border border-border overflow-hidden">
      <div className="bg-ink px-5 py-4">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-white/40 mb-1">Simulador interactiu</div>
        <div className="font-display text-xl font-black text-white">Calculadora de Resultats 2027</div>
        <div className="text-xs text-white/50 mt-1">{TOTAL} escons · Majoria: {majoria}</div>
      </div>
      <div className="p-5">
        {total>TOTAL&&<div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 text-xs text-amber-700">⚠️ Total ({total}) supera els {TOTAL} escons.</div>}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {PARTITS_CALC.map(p=>(
            <div key={p.nom} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-paper">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{background:p.color}}/>
              <span className="text-xs font-semibold flex-1">{p.nom}</span>
              <input type="number" min="0" max={TOTAL} value={seats[p.nom]}
                onChange={e=>setSeats(prev=>({...prev,[p.nom]:Math.max(0,Math.min(TOTAL,parseInt(e.target.value)||0))}))}
                className="w-12 text-center text-sm font-mono font-bold border border-border rounded px-1 py-0.5 bg-white focus:outline-none"
                style={{color:p.color}}/>
            </div>
          ))}
        </div>
        <div className="relative pt-6 mb-3">
          <div className="absolute top-0 left-0 right-0 h-0" style={{paddingLeft:`${(majoria/TOTAL)*100}%`}}>
            <div className="absolute top-0 font-mono text-[9px] text-red-500 whitespace-nowrap font-bold -translate-x-1/2 bg-paper px-1 rounded">
              majoria ({majoria})
            </div>
          </div>
          <div className="flex h-7 rounded-lg overflow-hidden border border-border relative">
            {PARTITS_CALC.filter(p=>seats[p.nom]>0).map(p=>(
              <div key={p.nom} style={{flex:seats[p.nom],background:p.color,transition:'flex 0.3s'}}
                title={`${p.nom}: ${seats[p.nom]}`} className="flex items-center justify-center">
                {seats[p.nom]>=3&&<span className="text-white font-mono text-[9px] font-bold">{seats[p.nom]}</span>}
              </div>
            ))}
            {total<TOTAL&&<div style={{flex:TOTAL-total,background:'#eee'}} className="flex items-center justify-center"><span className="text-mid font-mono text-[9px]">{TOTAL-total}</span></div>}
            <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10" style={{left:`${(majoria/TOTAL)*100}%`}}/>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {PARTITS_CALC.filter(p=>seats[p.nom]>0).map(p=>(
            <span key={p.nom} className="flex items-center gap-1 text-[10px] font-mono text-mid">
              <span className="w-2 h-2 rounded-sm" style={{background:p.color}}/>{p.nom}:{seats[p.nom]}
            </span>
          ))}
          <span className="font-mono text-[10px] text-mid ml-auto">Total:{total}/{TOTAL}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            {label:'PP sol',n:seats.PP||0,color:'#0e2a6e'},
            {label:'PP+Vox+Sa Unió',n:govPP,color:'#0e2a6e'},
            {label:'PSIB+Més+Podem+MxMe',n:govESQ,color:'#e30022'},
          ].map(({label,n,color})=>(
            <div key={label} className="rounded-lg p-3 border-2"
              style={{borderColor:n>=majoria?color:'#e5e0d8',background:n>=majoria?`${color}10`:'#fafaf8'}}>
              <div className="font-mono text-[9px] uppercase tracking-[1.5px] text-mid mb-1">{label}</div>
              <div className="font-display text-2xl font-black" style={{color}}>{n}</div>
              <div className="text-[10px] text-mid mt-1">{n>=majoria?'✅ Majoria':`Falta ${majoria-n}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── D'Hondt ────────────────────────────────────────────────────
function dhondt(resultats, totalEscons = 59) {
  if (!resultats?.length) return {}
  const quotes = []
  resultats.forEach(r => {
    for (let d = 1; d <= totalEscons; d++) {
      quotes.push({ parti: r.parti, val: r.pct / d, color: r.color })
    }
  })
  quotes.sort((a, b) => b.val - a.val)
  const escons = {}
  quotes.slice(0, totalEscons).forEach(q => {
    escons[q.parti] = (escons[q.parti] || 0) + 1
  })
  return escons
}

// ── Sondejos ───────────────────────────────────────────────────
function SondejosWidget() {
  const { data: sondejos, isLoading } = useSondejos({ ambit:'govern' })
  if (isLoading||!sondejos?.length) return (
    <div className="text-xs text-mid text-center py-4 border border-border rounded-card">Sense sondejos publicats encara.</div>
  )
  return (
    <div className="bg-white rounded-card border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-1">Enquestes publicades</div>
        <div className="font-display text-lg font-black text-ink">Sondejos — Govern IB</div>
      </div>
      <div className="p-5 space-y-5">
        {sondejos.slice(0,5).map(s=>{
          const res  = s.resultats || []
          const date = new Date(s.data_publicacio).toLocaleDateString('ca-ES',{day:'numeric',month:'short',year:'numeric'})
          const calc = dhondt(res, 59)
          return (
            <div key={s.id} className="pb-5 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-ink">{s.font}</span>
                <span className="font-mono text-[10px] text-mid">{date}</span>
              </div>

              {/* Barra */}
              <div className="flex h-5 rounded overflow-hidden mb-3">
                {res.filter(r=>r.pct>0).map((r,i)=>(
                  <div key={i} style={{flex:r.pct,background:r.color}}
                    title={`${r.parti}: ${r.pct}%`}
                    className="flex items-center justify-center">
                    {r.pct>=8&&<span className="text-white font-mono text-[8px] font-bold">{r.parti}</span>}
                  </div>
                ))}
              </div>

              {/* Resultats amb escons calculats */}
              <div className="flex flex-wrap gap-2">
                {res.map((r,i)=>{
                  // Usa escons del CMS si els té, sinó calcula amb D'Hondt
                  const escons = r.escons ?? calc[r.parti] ?? 0
                  return (
                    <div key={i} className="flex items-center gap-1.5 bg-paper rounded-lg px-2.5 py-1.5 border border-border">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{background:r.color}}/>
                      <span className="font-mono text-[10px] font-bold text-ink">{r.parti}</span>
                      <span className="font-mono text-[10px] text-mid">{r.pct}%</span>
                      <span className="font-mono text-[10px] font-black"
                        style={{color:r.color}}>
                        · {escons} esc.
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Nota D'Hondt */}
              {!res.some(r=>r.escons) && (
                <div className="font-mono text-[9px] text-mid/50 mt-2">
                  * Escons calculats amb D'Hondt (59 total). Estimació aproximada.
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Candidatures públiques ────────────────────────────────────
function CandidaturesSection({ ambit, illaFilter }) {
  const { data: candidatures, isLoading } = useCandidatures({ ambit })
  const [open, setOpen] = useState(null)

  if (isLoading) return <LoadingSpinner />

  let filtered = candidatures || []
  if (illaFilter && illaFilter !== 'totes') {
    filtered = filtered.filter(c => c.ambit_nom === illaFilter)
  }

  if (!filtered.length) return (
    <div className="text-xs text-mid text-center py-6 border border-border rounded-card">
      Candidatures per confirmar. S'actualitzarà quan es facin públiques.
    </div>
  )

  const grups = {}
  filtered.forEach(c => {
    if (!grups[c.ambit_nom]) grups[c.ambit_nom] = []
    grups[c.ambit_nom].push(c)
  })

  return (
    <div className="space-y-4">
      {Object.entries(grups).map(([nom, cands]) => (
        <div key={nom} className="bg-white rounded-card border border-border overflow-hidden">
          {ambit !== 'govern' && (
            <div className="px-4 py-3 bg-paper border-b border-border">
              <div className="font-display font-bold text-sm text-ink">{nom}</div>
            </div>
          )}
          <div className="divide-y divide-border">
            {cands.map(c => {
              const isOpen = open === c.id
              const color = c.partits?.color || '#888'
              const llistaCompleta = [
                ...(c.cap_llista ? [{nom:c.cap_llista, carrec:'Cap de llista', esCap:true}] : []),
                ...(c.candidats||[]).map((cd,i)=>({...cd, carrec:cd.carrec||`Número ${i+2}`, esCap:false}))
              ]
              return (
                <div key={c.id}>
                  <button onClick={() => setOpen(isOpen ? null : c.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-paper transition-colors">
                    {c.cap_foto ? (
                      <img src={c.cap_foto} alt={c.cap_llista} className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2" style={{borderColor:color}}/>
                    ) : (
                      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{background:`${color}20`}}>
                        <svg className="w-5 h-5 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <PartyBadge codi={c.parti_codi} size="xs" />
                        {c.cap_llista && <span className="font-semibold text-sm text-ink">{c.cap_llista}</span>}
                      </div>
                      {c.bio && <div className="text-xs text-mid mt-0.5 truncate">{c.bio}</div>}
                      {llistaCompleta.length > 1 && <div className="text-[9px] font-mono text-mid/60 mt-0.5">{llistaCompleta.length} candidats a la llista</div>}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {c.programa_pdf_url && (
                        <a href={c.programa_pdf_url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
                          className="flex items-center gap-1 text-[10px] font-mono text-accent hover:underline border border-accent/30 rounded px-2 py-0.5">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>PDF
                        </a>
                      )}
                      <svg className={`w-4 h-4 text-mid transition-transform ${isOpen?'rotate-180':''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-border" style={{background:c.partits?.bg_color||'#fafafa'}}>
                      {llistaCompleta.length > 0 && (
                        <div className="px-4 pt-4 pb-2">
                          <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-2" style={{color}}>Candidats/es a la llista</div>
                          <div className="space-y-0">
                            {llistaCompleta.map((cd,i)=>(
                              <div key={i} className="flex items-center gap-2.5 py-1.5 border-b border-black/5 last:border-0">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-mono text-[9px] font-bold flex-shrink-0"
                                  style={{background:cd.esCap?color:`${color}55`}}>{i+1}</div>
                                <span className={`text-xs ${cd.esCap?'font-bold text-ink':'text-mid'}`}>{cd.nom}</span>
                                <span className="font-mono text-[9px] text-mid/60 ml-auto">{cd.carrec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {(c.resum_ia||c.propostes?.length>0) && (
                        <div className="px-4 py-3 border-t border-black/5">
                          {c.resum_ia && <div className="mb-3"><div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-1.5" style={{color}}>✨ Resum del programa</div><p className="text-sm text-mid leading-relaxed">{c.resum_ia}</p></div>}
                          {c.propostes?.length>0 && <div><div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-1.5" style={{color}}>Propostes clau</div><ul className="space-y-1">{c.propostes.map((pr,i)=><li key={i} className="flex gap-2 text-xs text-mid py-1 border-b border-black/5 last:border-0"><span style={{color}} className="font-bold flex-shrink-0">→</span><span>{pr}</span></li>)}</ul></div>}
                        </div>
                      )}
                      {!c.resum_ia&&!c.propostes?.length&&llistaCompleta.length===0&&<div className="px-4 py-3"><p className="text-xs text-mid italic">Programa pendent de publicació.</p></div>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Component principal ───────────────────────────────────────
const TABS = [
  {id:'govern',   label:'Govern IB'},
  {id:'consells', label:'Consells Insulars'},
  {id:'municipis',label:'Ajuntaments'},
  {id:'simulador',label:'Simulador'},
  {id:'temes',    label:'Temes'},
]

export default function Elect27() {
  const [tab, setTab] = useState('govern')
  const [parlAny, setParlAny] = useState(2023)
  const [illaConsell, setIllaConsell] = useState('Mallorca')
  const parl = PARLAMENTS_GOVERN.find(p => p.any === parlAny)

  return (
    <>
      <SectionTitleBar
        eyebrow="Eleccions autonòmiques previstes · Maig 2027"
        title="Eleccions 2027"
        sub="Candidatures, sondejos, composicions parlamentàries i simulador de resultats."
        gradient="from-ink to-[#0a1a4e]"
      />
      <ContentWrap>
        <div className="bg-amber-50 border border-amber-200 rounded-card p-3 mb-6 flex gap-2 text-xs text-amber-800">
          <svg className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span><strong>Nota:</strong> Candidatures i sondejos s'actualitzen a mesura que es fan públics. Dades de consells 2015/2019 aproximades — verifícalas.</span>
        </div>

        <div className="flex gap-1 flex-wrap mb-6 bg-paper rounded-lg p-1 border border-border">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-3 rounded text-xs font-semibold transition-all whitespace-nowrap ${tab===t.id?'bg-ink text-white':'text-mid hover:text-ink'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Govern IB ── */}
        {tab === 'govern' && (
          <div className="space-y-6">
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Composicions parlamentàries</div>
              <div className="bg-white rounded-card border border-border overflow-hidden">
                <div className="flex border-b border-border">
                  {PARLAMENTS_GOVERN.map(p=>(
                    <button key={p.any} onClick={()=>setParlAny(p.any)}
                      className={`flex-1 py-3 text-sm font-bold font-mono transition-colors ${parlAny===p.any?'bg-ink text-white':'text-mid hover:bg-paper'}`}>
                      {p.any}
                    </button>
                  ))}
                </div>
                <div className="p-5">
                  <ParlamentBar data={parl} total={59} />
                </div>
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Sondejos electorals</div>
              <SondejosWidget />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Candidatures al Govern de les Illes Balears</div>
              <CandidaturesSection ambit="govern" />
            </div>
          </div>
        )}

        {/* ── Consells Insulars ── */}
        {tab === 'consells' && (
          <div className="space-y-4">
            {/* Selector d'illa */}
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-2">Selecciona illa</div>
              <div className="flex gap-2 flex-wrap">
                {['Mallorca','Menorca','Eivissa','Formentera'].map(illa => (
                  <button key={illa} onClick={() => setIllaConsell(illa)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${illaConsell===illa?'bg-ink text-white border-ink':'bg-white text-mid border-border hover:border-mid'}`}>
                    {illa}
                  </button>
                ))}
              </div>
            </div>

            {/* Resultats electorals del consell seleccionat */}
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-2">
                Resultats electorals · Consell Insular de {illaConsell}
              </div>
              <ConsellResultats illa={illaConsell} />
            </div>

            {/* Candidatures */}
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-2">
                Candidatures 2027 · Consell Insular de {illaConsell}
              </div>
              <CandidaturesSection ambit="consell" illaFilter={illaConsell} />
            </div>
          </div>
        )}

        {/* ── Ajuntaments ── */}
        {tab === 'municipis' && (
          <div className="space-y-4">
            <div className="bg-white rounded-card border border-border p-4">
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-1">Composicions actuals 2023</div>
              <p className="text-xs text-mid leading-relaxed">
                Les dades de composició dels 67 ajuntaments (regidors per partit, alcalde/essa) les trobes a la secció{' '}
                <a href="/ajuntaments" className="text-accent hover:underline font-semibold">Ajuntaments</a>.
                Aquí es mostraran les candidatures 2027 a mesura que es confirmin.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Candidatures 2027 als Ajuntaments</div>
              <CandidaturesSection ambit="ajuntament" />
            </div>
          </div>
        )}

        {/* ── Simulador ── */}
        {tab === 'simulador' && <Calculator />}

        {/* ── Temes ── */}
        {tab === 'temes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ISSUES.map(issue => (
              <div key={issue.title} className="bg-white rounded-card border border-border p-4 border-t-2" style={{borderTopColor:issue.color}}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{color:issue.color}}>{ICONS[issue.icon]}</span>
                  <span className="font-display font-bold text-sm text-ink">{issue.title}</span>
                </div>
                <p className="text-xs text-mid leading-relaxed">{issue.text}</p>
              </div>
            ))}
          </div>
        )}
      </ContentWrap>
    </>
  )
}
