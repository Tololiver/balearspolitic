// src/components/sections/Elect27.jsx
import { useState } from 'react'
import { SectionTitleBar, ContentWrap } from '@/components/ui'

const SCENARIOS = [
  {
    id: 'pp',
    title: 'Escenari A — Prohens repeteix',
    color: '#0e2a6e',
    bg: '#dce8ff',
    desc: 'Si el PP manté les posicions actuals i Vox no creix molt, el PP podria repetir. Necessitaria un pacte formal amb Vox o atreure El Pi. Probabilitat moderada-alta si habitatge i economia es gestionen bé.',
    bars: [
      { label: 'PP', pct: 34, color: '#0e2a6e' },
      { label: 'PSIB', pct: 26, color: '#b82012' },
      { label: 'Vox', pct: 12, color: '#4a6600' },
      { label: 'Més', pct: 10, color: '#1a5c30' },
      { label: 'Altres', pct: 18, color: '#aaa' },
    ]
  },
  {
    id: 'psib',
    title: 'Escenari B — Retorn de l\'esquerra',
    color: '#b82012',
    bg: '#fde8e6',
    desc: 'Si la crisi d\'habitatge s\'agreuja i el desgast PP-Vox augmenta, PSIB+Més+Podem podrien recuperar el govern. La clau és la unitat de l\'esquerra i la capacitat de Més de créixer.',
    bars: [
      { label: 'PSIB', pct: 29, color: '#b82012' },
      { label: 'PP', pct: 30, color: '#0e2a6e' },
      { label: 'Més', pct: 11, color: '#1a5c30' },
      { label: 'Vox', pct: 10, color: '#4a6600' },
      { label: 'Altres', pct: 20, color: '#aaa' },
    ]
  }
]

const ISSUES = [
  { icon: 'home',    title: 'Habitatge',       color: '#b82012', text: 'El tema número 1. Baleares és la CCAA amb els preus de lloguer més alts. La crisi estructural no s\'ha resolt amb cap govern. Qui tingui la millor proposta guanyarà votants decisius.' },
  { icon: 'beach',   title: 'Turisme',          color: '#1a5c30', text: 'El debat contenció vs. creixement serà central. L\'ecotasa i la regulació del lloguer vacacional seran eixos de batalla.' },
  { icon: 'chat',    title: 'Llengua',          color: '#0e2a6e', text: 'El pacte PP-Vox ha radicalitzat el debat. El català a les escoles serà de nou un eix de mobilització electoral.' },
  { icon: 'globe',   title: 'Immigració',       color: '#4a6600', text: 'El debat sobre MENA i immigració irregular. Vox intentarà convertir-lo en el tema central.' },
  { icon: 'money',   title: 'Cost de Vida',     color: '#6b0f9e', text: 'Poder adquisitiu, salaris de temporada i bretxa salarial respecte al continent. Mobilitzadora per a l\'electorat jove.' },
  { icon: 'leaf',    title: 'Medi Ambient',     color: '#005448', text: 'Canvi climàtic, sequeres i pressions sobre recursos hídrics. Eix de Més i PSIB sobretot.' },
]

const PROGRAMS27 = [
  { parti: 'PP',            color: '#0e2a6e', bg: '#dce8ff', lema: 'Consolidar la gestió, reduir impostos, turisme sostenible', propostes: ['Mantenir la limitació de noves places en pisos plurifamiliars', 'Pla d\'habitatge de mercat: Lloguer Segur ampliat', 'Consolidar la lliure elecció lingüística a totes les etapes', 'Nova reducció de l\'IRPF autonòmic', 'Simplificació administrativa per a empreses', 'ITS en temporada alta, promoció fora de temporada'] },
  { parti: 'PSIB–PSOE',     color: '#b82012', bg: '#fde8e6', lema: 'Habitatge públic, ITS alta, català i serveis públics',      propostes: ['Fons específic d\'habitatge públic finançat per l\'ITS', 'Moratòria de places turístiques i limitació creuers', 'ITS alta tot l\'any: proposta de doblar la recaptació', 'Protecció activa del català en tots els àmbits', 'Recuperar la RESOGA i ampliar serveis socials', 'Regulació dels preus del lloguer'] },
  { parti: 'Més per Mallorca', color: '#1a5c30', bg: '#e8f5e9', lema: 'Decreixement turístic, habitatge per a residents, sobirania', propostes: ['Decreixement turístic actiu: eliminació de places', 'ITS proporcional al preu d\'estada', 'Pressió a l\'Estat per limitar compra d\'habitatge a no residents', 'Concert econòmic de les Illes amb l\'Estat', 'Català com a única llengua vehicular pública', 'Eliminació de la promoció turística pública'] },
  { parti: 'Vox',           color: '#4a6600', bg: '#f0f4e0', lema: 'Català fora, contra la immigració, zero impostos nous',    propostes: ['Castellà llengua vehicular a tota l\'educació', 'Derogar l\'ITS i qualsevol nou impost turístic', 'Restriccions dures a la immigració i als MENA', 'Derogar totes les lleis de memòria democràtica', 'Reducció radical d\'impostos: bonificació total successions directes'] },
]

const PARTIES27 = [
  { nom: 'PP',             status: 'Govern actual (2023–)',  candidat: 'Marga Prohens (presumpta)',   prob: 'Alta · primera força', color: '#0e2a6e' },
  { nom: 'PSIB–PSOE',      status: 'Principal oposició',    candidat: 'Armengol o candidat renovat', prob: 'Alta · segona força',  color: '#b82012' },
  { nom: 'Més per Mallorca',status: 'Oposició',             candidat: 'Lluís Apesteguia o renovació',prob: 'Alta',                color: '#1a5c30' },
  { nom: 'Vox',            status: 'Suport extern PP',       candidat: 'Manuela Cañadas o renovació', prob: 'Alta',                color: '#4a6600' },
  { nom: 'Podemos',        status: 'Oposició (1 escó 2023)',candidat: 'Possible aliança amb Més',    prob: 'Moderada · risc desaparició', color: '#6b0f9e' },
  { nom: 'Més per Menorca',status: 'Oposició',             candidat: 'Josep Castells o successió',  prob: 'Alta',                color: '#005448' },
  { nom: 'El Pi',          status: 'Fora del Parlament',    candidat: 'Reforma o refundació total',  prob: 'Moderada',            color: '#bf5c00' },
  { nom: 'Sa Unió',        status: 'Suport extern PP',      candidat: 'Neus Roig o renovació',      prob: 'Alta (Formentera)',   color: '#4527a0' },
]

const ICONS = {
  home:  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  beach: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17.5 8c0 4.142-5.5 13-5.5 13S6.5 12.142 6.5 8a5.5 5.5 0 0 1 11 0z"/><circle cx="12" cy="8" r="2"/></svg>,
  chat:  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  globe: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  money: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  leaf:  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
}

export default function Elect27() {
  const [openProg, setOpenProg] = useState(null)

  return (
    <>
      <SectionTitleBar
        eyebrow="Pròximes eleccions autonòmiques previstes"
        title="Eleccions 2027"
        sub="Escenaris, temes de campanya i comparativa anticipada de propostes. Data prevista: maig 2027."
        gradient="from-ink to-[#0a1a4e]"
      />
      <ContentWrap>

        {/* Avís */}
        <div className="bg-amber-50 border border-amber-200 rounded-card p-4 mb-8 flex gap-3">
          <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Nota:</strong> Projecció anticipada basada en tendències actuals i declaracions fins a juny 2026. No són programes electorals oficials, que es presentaran a partir de 2026–27.
          </p>
        </div>

        {/* Escenaris */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Escenaris electorals — Tendències 2026</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {SCENARIOS.map(s => (
            <div key={s.id} className="bg-white rounded-card border border-border overflow-hidden border-l-4" style={{ borderLeftColor: s.color }}>
              <div className="p-5">
                <div className="font-display text-base font-bold text-ink mb-2">{s.title}</div>
                <p className="text-xs text-mid leading-relaxed mb-4">{s.desc}</p>
                {/* Poll bar */}
                <div className="flex h-6 rounded overflow-hidden mb-2">
                  {s.bars.map(b => (
                    <div key={b.label} style={{ flex: b.pct, background: b.color }} title={`${b.label} ~${b.pct}%`}
                         className="flex items-center justify-center">
                      {b.pct >= 10 && <span className="text-white font-mono text-[9px] font-bold">{b.label}</span>}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.bars.map(b => (
                    <span key={b.label} className="flex items-center gap-1 font-mono text-[9px] text-mid">
                      <span className="w-2 h-2 rounded-sm" style={{ background: b.color }} />
                      {b.label} ~{b.pct}%
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-mid/50 mt-2 font-mono">Projecció orientativa · juny 2026</div>
              </div>
            </div>
          ))}
        </div>

        {/* Temes clau */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Els temes que decidiran les eleccions</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {ISSUES.map(issue => (
            <div key={issue.title} className="bg-white rounded-card border border-border p-4 border-t-2" style={{ borderTopColor: issue.color }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: issue.color }}>{ICONS[issue.icon]}</span>
                <span className="font-display font-bold text-sm text-ink">{issue.title}</span>
              </div>
              <p className="text-xs text-mid leading-relaxed">{issue.text}</p>
            </div>
          ))}
        </div>

        {/* Programes anticipats */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Que diuen els partits de cara al 2027</div>
        <div className="space-y-2 mb-10">
          {PROGRAMS27.map((p, i) => (
            <div key={p.parti} className="bg-white rounded-card border border-border overflow-hidden" style={{ borderLeftWidth: openProg === i ? 4 : 2, borderLeftColor: openProg === i ? p.color : 'transparent' }}>
              <button onClick={() => setOpenProg(openProg === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-paper transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] font-bold text-white px-2.5 py-1 rounded" style={{ background: p.color }}>{p.parti}</span>
                  <span className="text-xs text-mid hidden sm:inline">{p.lema}</span>
                </div>
                <svg className={`w-4 h-4 text-mid flex-shrink-0 transition-transform ${openProg === i ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {openProg === i && (
                <div className="border-t border-border p-5" style={{ background: p.bg }}>
                  <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-3" style={{ color: p.color }}>{p.lema}</div>
                  <ul className="space-y-1.5">
                    {p.propostes.map((pr, j) => (
                      <li key={j} className="flex gap-2 text-xs text-mid leading-relaxed py-1.5 border-b border-black/5 last:border-0">
                        <span style={{ color: p.color }} className="flex-shrink-0 font-bold">→</span>
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Partits que es presenten */}
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-3">Formacions previstes</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PARTIES27.map(p => (
            <div key={p.nom} className="bg-white rounded-card border border-border p-4 border-t-2" style={{ borderTopColor: p.color }}>
              <div className="font-display font-bold text-sm mb-1" style={{ color: p.color }}>{p.nom}</div>
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
