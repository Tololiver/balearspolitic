// src/components/sections/Comparativa.jsx
import { useState } from 'react'
import { SectionTitleBar, ContentWrap } from '@/components/ui'

const BLOCKS = [
  {
    icon: "beach",
    num: "01",
    title: "Turisme i Model Econòmic",
    context: "Context: Baleares rep anualment prop de 20 milions de turistes per a una població d'1,2 milions d'habitants. El debat no és si el turisme és necessari —tots l'accepten— sinó quin model: de masses i creixement, o de contenció i qualitat. L'Impost de Turisme Sostenible (ITS o ecotasa), creat el 2016 per Armengol, és el gran cavall de batalla entre ambdós partits.",
    pp: ["Defensa el turisme reglat com a motor econòmic imprescindible. \"El turisme reparteix i genera riquesa\".", "Prohibició de noves places en pisos plurifamiliars (Decret de Contenció Turística 2025, pactat amb Vox).", "Subida de la ecotasa solo en temporada alta (juny-agost) amb bonificació per a residents.", "Oposició a incrementar l'ecotasa fora de temporada alta; pressió de Vox per no crear nous impostos al sector.", "Aposta per desestacionalització i turisme de qualitat, sense limitar el volum total d'entrada.", "Recupera el caràcter \"finalista\" de l'ecotasa: retorna diners al sector turístic i medi ambient."],
    psib: ["Va crear l'ecotasa el 2016: primer impost turístic de l'Estat, orientat a medi ambient i sostenibilitat.", "Defensora d'una moratòria de places turístiques i limitació de creuers.", "Vol incrementar l'ITS durant tot l'any (no sols temporada alta) per finançar habitatge públic.", "Critica que Armengol va recaptar 700 M€ i va executar projectes per menys del 15% durant el seu mandat.", "Defensa que \"qui més ha protegit el territori\" és el PSIB: parcs naturals, plans territorials, ley del clima.", "A l'oposició, exigeix subir la ecotasa i crear un impost als vehicles de lloguer no matriculats a les Illes."],
    same: "Ambdós partits reconeixen la saturació turística i defensen certa contenció. Tots dos han aprovat o defensat l'ecotasa com a instrument. El PP de Prohens, fins i tot, ha pujat la taxa en temporada alta (algo que la dreta havia rebutjat historicament). Hi ha consens en prohibir noves places en plurifamiliars.",
    diff: "El PSOE vol ecotasa tot l'any i molt més alta per finançar habitatge públic. El PP l'accepta només en temporada alta i sota pressió de Vox descarta nous impostos al sector. El PP defensa el lloguer vacacional reglat com a font d'ingressos per a famílies; el PSOE el veu com un problema estructural d'accés a l'habitatge.",
  },
  {
    icon: "home",
    num: "02",
    title: "Habitatge i Accés a la Vivenda",
    context: "Context: Baleares és la comunitat autònoma amb els preus d'habitatge més alts de l'Estat en relació als salaris. La combinació de pressió turística, creixement demogràfic i escassetat de sòl crea una crisi estructural que cap dels dos governs ha aconseguit resoldre de forma definitiva.",
    pp: ["Programa \"Lloguer Segur\": incentiva propietaris privats a llogar per sota del mercat a canvi de garanties jurídiques i de cobrament.", "\"Construir per Llogar\": convenis amb ajuntaments per posar sòl disponible i augmentar l'oferta.", "Defensa que la solució passa per augmentar l'oferta, no per limitar preus.", "Nova Llei de Vivenda pactada amb Vox (pressuposts 2025) amb menys restriccions al lloguer turístic reglat.", "Posa sòl públic disponible per a construcció d'habitatge assequible en règim de lloguer."],
    psib: ["Durant el govern (2015-2023): va aprovar mesures de rehabilitació i accés, però no va triplicar el parc d'habitatge públic com prometia.", "Proposa destinar l'ecotasa (ITS) directament a construir habitatge públic en lloguer assequible.", "\"No em resignaré que cap ciutadà visqui en una caravana\": postura de xoc per demanar acció urgent.", "Critica que el PP facilita el lloguer vacacional i especulació, agreujant la crisi d'accés.", "Defensa regulació dels preus del lloguer i major intervenció pública al mercat immobiliari."],
    same: "Ambdós reconeixen que la crisi d'habitatge és el problema social número u de Baleares. Els dos partits defensen alguna forma de lloguer assequible i l'ús de sòl públic. Cap dels dos governs ha aconseguit resoldre el problema estructuralment.",
    diff: "El PP confia en el mercat i en incentivar propietaris privats. El PSOE defensa habitatge públic directe i regulació de preus. El PP veu el lloguer turístic reglat com a positiu; el PSOE el veu com a causa del problema. Diferent visió sobre el paper de l'Estat al mercat immobiliari.",
  },
  {
    icon: "chat",
    num: "03",
    title: "Política Lingüística · Català i Castellà",
    context: "Context: Baleares té dues llenges cooficials: el català (en la seva varietat balear) i el castellà. El model educatiu d'immersió lingüística en català, implementat i defensat pels governs progressistes, és un dels eixos de ruptura més intensa entre PP i PSOE. El pacte PP-Vox del 2025 ha intensificat el debat.",
    pp: ["Defensa la \"llibertat de tria lingüística\" en educació: les famílies podran triar la llengua vehicular de l'ensenyament.", "Pla pilot voluntari d'elecció de llengua en Primària, amb extensió prevista a Secundària (pactat amb Vox).", "Modificació de la llei balear d'Educació per incloure el castellà com a llengua vehicular al costat del català.", "Promoure les \"modalitats lingüístiques pròpies de cada illa\" (reconeixement de dialectes insulars).", "Relajació dels requisits de català per a docents i empleats públics en categories deficitàries."],
    psib: ["Defensora del model d'immersió lingüística en català com a eina de cohesió social i identitat.", "\"Conflicte lingüístic no tenim. La dreta l'usa com a element de crispació i divisió\".", "Manté que les dues llenges cooficials han de conviure, però amb el català com a llengua pròpia del territori.", "Critica que el PP cedeix als requisits de Vox per desmuntar el model lingüístic balear a canvi de suport pressupostari.", "Durant el seu govern: mantenia requisit de català per a docents i funcionaris (amb terminis d'acreditació)."],
    same: "Ambdós partits afirmen que defensen totes dues llenges cooficials i que volen que els ciutadans les coneguin. Cap dels dos proposa eliminar el català de l'ensenyament ni eliminar el castellà.",
    diff: "És el tema de màxima divergència. El PSOE defensa la immersió en català com a política pública activa. El PP vol que les famílies triïn i equipara el castellà com a llengua vehicular igual al català. El pacte PP-Vox ha accelerat canvis que el PSOE considera \"una retallada de drets lingüístics\". La tensió és estructural i afecta el model educatiu, la funció pública i el finançament cultural.",
  },
  {
    icon: "globe",
    num: "04",
    title: "Immigració i Menors No Acompanyats",
    context: "Context: Baleares és territori receptor de migrants, especialment a Eivissa i Mallorca. El debat s'ha aguditzat arran de la proposta del Govern central de distribuir menors migrants no acompanyats (MENA) entre comunitats autònomes. Prohens s'hi ha oposat, en línia amb Vox.",
    pp: ["Oposició al repartiment obligatori de menors migrants no acompanyats des del Govern central.", "Mesures contra la immigració irregular als pressuposts 2025 (pactat amb Vox).", "Defensa que la gestió migratòria és competència estatal i critica la \"inacció\" del Govern Sánchez.", "Rebutja el \"Pacte Verd Europeu\" per l'impacte en agricultura i model econòmic local (inclòs en pacte Vox)."],
    psib: ["Defensa de la solidaritat territorial en l'acollida de migrants i menors no acompanyats.", "\"Palma és una societat acollidora. Tenim gent de 177 països\". Discurs integrador.", "Critica que el PP instrumentalitzi la immigració per a un discurs de por, cedint a la narrativa de Vox.", "Durant el seu govern: model d'integració i serveis socials als migrants com a eix de política social."],
    same: "Ambdós reconeixen que la immigració és una realitat estructural a Baleares i que requereix gestió. Cap dels dos proposa tancament de fronteres. Tots dos accepten la necessitat de serveis d'integració.",
    diff: "La diferència és radical en enfoc i to. El PP, sota influència de Vox, adopta un discurs de control i restricció, oposant-se al repartiment de MENA. El PSOE defensa la solidaritat i la integració com a valors no negociables. És un dels temes de màxima polarització a escala balear i estatal.",
  },
  {
    icon: "leaf",
    num: "05",
    title: "Medi Ambient i Canvi Climàtic",
    context: "Context: Les Illes Balears són especialment vulnerables al canvi climàtic (pujada del nivell del mar, sequeres, pressió sobre recursos hídrics). La llei de canvi climàtic aprovada per Armengol és un dels marcs normatius que el nou govern ha heretat amb una actitud més ambivalent.",
    pp: ["Accepta la llei de canvi climàtic aprovada per Armengol, sense derogar-la.", "Prioritza la \"sostenibilitat econòmica\" per sobre de la \"sostenibilitat ambiental\" estricta.", "Oposició al Pacte Verd Europeu per l'impacte en l'agricultura i el sector turístic local (pactat amb Vox).", "La Mesa per la Sostenibilitat (2024) inclou empreses, sector econòmic i polítics: enfoc pragmàtic.", "Ecotasa amb caràcter \"finalista\" per a medi ambient i cicle de l'aigua (inversió efectiva)."],
    psib: ["Va aprovar la primera llei de canvi climàtic balear; llei contra els plàstics; reserva de la biosfera.", "Va crear parcs naturals, protegir parcs marins, desclassificar sòl urbanitzable.", "Defensora del Pacte Verd Europeu com a marc necessari per als reptes de les Illes.", "Moratòria de places turístiques i limitació de creuers com a mesures ambientals estructurals.", "Critica que el PP cedeix davant Vox en matèria ambiental a canvi de suport polític."],
    same: "Tots dos reconeixen la necessitat de protegir el territori i el medi ambient. El PP no ha derogar les lleis ambientals d'Armengol. Hi ha consens en la necessitat de gestió sostenible dels recursos hídrics i en la protecció d'espais naturals.",
    diff: "El PSOE té una tradició de legislació ambiental activa (parcs, moratòries, ecotasa) i defensa el Pacte Verd Europeu. El PP, empès per Vox, s'oposa al Pacte Verd i prioritza la competitivitat econòmica. L'enfoc del PSOE és regulatori; el del PP, més pragmàtic i orientat al consens amb el sector privat.",
  },
  {
    icon: "health",
    num: "06",
    title: "Serveis Públics: Sanitat i Educació",
    context: "Context: Baleares té un dels sistemes sanitaris i educatius amb més pressió de l'Estat per l'estacionalitat turística i el creixement demogràfic. La qüestió del català a les oposicions de metges i mestres ha sigut un dels debats més virals dels últims anys.",
    pp: ["Defensa que \"és millor tenir un metge que no parli català que no tenir metge\". Relajació del requisit lingüístic en sanitat.", "Aposta per atraure professionals de fora de les Illes eliminant barreres d'accés lingüístiques.", "Concertació educativa: defensa l'escola concertada i la llibertat d'elecció de centre i llengua.", "Reducció fiscal (tram autonòmic IRPF) com a mesura per a millorar el poder adquisitiu."],
    psib: ["\"Ningú ha deixat de tenir plaça a la sanitat pública per un tema lingüístic\": defensa que el requisit del català no perjudica l'accés.", "Aposta per la sanitat pública universal i la inversió en personal i infraestructures.", "Model d'escola pública com a eix vertebrador, amb el català com a llengua vehicular principal.", "Critica les retallades i la \"deriva privatitzadora\" de la dreta en serveis públics."],
    same: "Tots dos defensen el sistema sanitari públic i la necessitat d'inversió. Ambdós reconeixen la dificultat de contractar professionals per les condicions de vida a les Illes. Cap proposa eliminar l'escola pública.",
    diff: "La disputa lingüística és el nucli del conflicte: el PP relajarà requisits de català per a funcionaris i docents; el PSOE ho considera un retrocés i una amenaça a la qualitat i cohesió. En educació, el PP promou la concertada i la lliure elecció; el PSOE prioritza la pública. En fiscalitat, el PP baixa impostos; el PSOE els manté o amplia per finançar serveis.",
  },
  {
    icon: "scale",
    num: "07",
    title: "Igualtat, Violència de Gènere i Política Social",
    context: "Context: La violència de gènere és un problema crític a Baleares, amb casos d'alt impacte mediàtic. El debat sobre si existeix \"violència masclista\" com a categoria específica és un dels principals eixos de fractura entre la dreta (especialment Vox) i l'esquerra. Prohens navega entre el discurs del PP i la pressió del seu soci Vox.",
    pp: ["El PP nacional reconeix la violència de gènere, però Prohens governa amb Vox, que la nega com a categoria.", "Manté les polítiques d'igualtat autonòmiques sense grans canvis, però amb menor èmfasi que el govern anterior.", "Renda Social Garantitzada (RESOGA): el govern Prohens ha reduït el nombre de beneficiaris en tres anys.", "Postura ambivalent: ni deroga les lleis d'igualtat ni en promou de noves amb Vox al govern."],
    psib: ["\"El negacionisme de la violència masclista mata, i no permetrem que es banalitzi\".", "La lluita contra la violència de gènere és un eix central del discurs i la política del PSIB.", "Durant el govern: va ampliar serveis d'atenció a víctimes, recursos d'emergència i polítiques d'igualtat.", "Defensa la RESOGA com a dret social fonamental i critica la reducció de beneficiaris per part del govern Prohens."],
    same: "Formalment, tant el PP com el PSOE reconeixen la violència domèstica i condemnen els feminicidis. Tots dos diuen defensar els drets de la dona i no proposen eliminar els serveis d'atenció a víctimes.",
    diff: "El PSOE fa de la igualtat i la lluita contra la violència masclista un eix polític prioritari i actiu. El PP, condicionat per Vox, redueix l'impuls en polítiques d'igualtat. Hi ha diferències clares en la RESOGA (el PSOE vol ampliar-la; el PP la retalla) i en el discurs sobre violència de gènere com a categoria específica.",
  },
]

const ICONS = {
  beach: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 8c0 4.142-5.5 13-5.5 13S6.5 12.142 6.5 8a5.5 5.5 0 0 1 11 0z"/><circle cx="12" cy="8" r="2"/></svg>,
  home: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  chat: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  globe: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  leaf: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  health: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  scale: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>,
}

export default function Comparativa() {
  const [open, setOpen] = useState(null)

  return (
    <>
      <SectionTitleBar
        eyebrow="Analisi comparativa 2015–2026"
        title="PP vs PSOE"
        sub="Comparativa de posicions polítiques en els grans temes de les Illes Balears. Prohens i Armengol, dues visions sobre el futur de l'arxipèlag."
        gradient="from-ink to-[#1a0a0a]"
      />

      <ContentWrap>
        {/* Intro */}
        <div className="bg-white rounded-card border border-border p-6 mb-10 border-l-4 border-l-mid">
          <h3 className="font-display text-lg font-bold mb-2">Com llegir aquesta secció</h3>
          <p className="text-sm text-mid leading-relaxed">
            Cada bloc temàtic recull la posició de cadascun dels dos partits, una explicació del context a Baleares,
            i una anàlisi de <strong className="text-ink">punts de convergència</strong> (on coincideixen)
            i <strong className="text-ink">punts de divergència</strong> (on s'oposen).
            Les posicions de Prohens corresponen al Govern actual (2023–avui).
            Les d'Armengol reflecteixen la seva acció de govern (2015–2023) i el discurs del PSIB com a oposició.
          </p>
        </div>

        {/* Protagonist cards */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="rounded-card p-5 border border-pp/20" style={{background:'#0e2a6e'}}>
            <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/40 mb-1">Partido Popular · Govern actual</div>
            <div className="font-display text-xl font-black text-white">Marga Prohens</div>
            <div className="text-xs text-white/55 mt-1">Presidenta del Govern · Des del 7 de juliol de 2023</div>
            <div className="text-xs text-white/35 mt-2 pt-2 border-t border-white/10">Govern PP en minoria · Suport extern Vox</div>
          </div>
          <div className="rounded-card p-5 border border-psib/20" style={{background:'#b82012'}}>
            <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/40 mb-1">PSIB–PSOE · Oposició</div>
            <div className="font-display text-xl font-black text-white">Francina Armengol</div>
            <div className="text-xs text-white/55 mt-1">Secretària General del PSIB · Presidenta del Congrés</div>
            <div className="text-xs text-white/35 mt-2 pt-2 border-t border-white/10">Presidenta del Govern 2015–2023 (dos mandats)</div>
          </div>
        </div>

        {/* Blocks */}
        <div className="space-y-2">
          {BLOCKS.map((b, i) => (
            <Block
              key={i}
              block={b}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </ContentWrap>
    </>
  )
}

function Block({ block: b, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-card border border-border overflow-hidden">
      {/* Header — always visible, clickable */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-paper transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-ink flex items-center justify-center text-white flex-shrink-0">
          {ICONS[b.icon]}
        </div>
        <div className="flex-1">
          <div className="font-mono text-[9px] tracking-[2px] uppercase text-mid mb-0.5">Bloc {b.num}</div>
          <div className="font-display text-lg font-bold text-ink leading-tight">{b.title}</div>
        </div>
        <div className="text-mid text-sm flex-shrink-0">
          {isOpen ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="border-t border-border">
          {/* Context */}
          {b.context && (
            <div className="px-5 py-4 bg-paper border-b border-border">
              <p className="text-sm text-mid leading-relaxed">
                <strong className="text-ink font-semibold">Context: </strong>{b.context}
              </p>
            </div>
          )}

          {/* Positions grid */}
          <div className="grid grid-cols-2 divide-x divide-border">
            <PositionCol color="#0e2a6e" bgColor="#dce8ff" label="PP · Marga Prohens" items={b.pp} />
            <PositionCol color="#b82012" bgColor="#fde8e6" label="PSIB–PSOE · Armengol" items={b.psib} />
          </div>

          {/* Same / Diff */}
          <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
            <CompBox type="same" text={b.same} />
            <CompBox type="diff" text={b.diff} />
          </div>
        </div>
      )}
    </div>
  )
}

function PositionCol({ color, bgColor, label, items }) {
  return (
    <div style={{background: bgColor}} className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background: color}} />
        <span className="font-mono text-[9px] tracking-[1.5px] uppercase font-bold" style={{color}}>{label}</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-xs text-ink/80 leading-relaxed">
            <span className="flex-shrink-0 mt-0.5" style={{color}}>→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CompBox({ type, text }) {
  const isSame = type === 'same'
  return (
    <div className={`p-4 ${isSame ? 'bg-[#d8f3dc]' : 'bg-[#f4e0d9]'}`}>
      <div className={`flex items-center gap-2 mb-2 font-mono text-[9px] tracking-[2px] uppercase font-bold ${isSame ? 'text-[#2d6a4f]' : 'text-[#774936]'}`}>
        <div className={`w-2 h-2 rounded-full ${isSame ? 'bg-[#2d6a4f]' : 'bg-[#774936]'}`} />
        {isSame ? 'COINCIDEIXEN' : 'ES DIFERENCIEN'}
      </div>
      <p className={`text-xs leading-relaxed ${isSame ? 'text-[#2d6a4f]' : 'text-[#774936]'}`}>{text}</p>
    </div>
  )
}
