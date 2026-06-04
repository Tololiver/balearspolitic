// src/components/sections/Comparativa.jsx
// Contingut migrat directament del HTML v3 — PP vs PSOE comparativa completa
import { SectionTitleBar } from '@/components/ui'
import './Comparativa.css'

export default function Comparativa() {
  return (
    <>
      <SectionTitleBar
        eyebrow="Analisi comparativa · 2015–2026"
        title="PP vs PSOE"
        sub="Comparativa de posicions polítiques en els grans temes de l'arxipèlag. Prohens i Armengol, dues visions sobre el futur de les Illes."
      />
      <div className="comparativa-wrap">
        <div dangerouslySetInnerHTML={{ __html: INTRO_HTML }} />
        <div dangerouslySetInnerHTML={{ __html: CONTENT_HTML }} />
      </div>
    </>
  )
}

const INTRO_HTML = `<div class="intro-wrap">
    <div class="intro-box">
      <h2>Com llegir aquesta secció</h2>
      <p>Cada bloc temàtic recull la posició de cadascun dels dos partits, una explicació del context a Baleares, i una anàlisi de <strong>punts de convergència</strong> (on coincideixen) i <strong>punts de divergència</strong> (on s'oposen). Les posicions de Prohens corresponen al seu Govern actual (2023–avui). Les d'Armengol reflecteixen la seva acció de govern (2015–2023) i el discurs actual del PSIB com a oposició, incloent les declaracions de cara al 2027.</p>
    </div>
  </div>`

const CONTENT_HTML = `<div class="content-wrap">


  <!-- BLOC 1: TURISME -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🏖️</div>
      <div>
        <div class="block-num">Bloc 01</div>
        <div class="block-title">Turisme i Model Econòmic</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares rep anualment prop de <strong>20 milions de turistes</strong> per a una població d'1,2 milions d'habitants. El debat no és si el turisme és necessari —tots l'accepten— sinó <em>quin model</em>: de masses i creixement, o de contenció i qualitat. L'Impost de Turisme Sostenible (ITS o ecotasa), creat el 2016 per Armengol, és el gran cavall de batalla entre ambdós partits.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Defensa el turisme reglat com a motor econòmic imprescindible. "El turisme reparteix i genera riquesa".</li>
          <li>Prohibició de noves places en pisos plurifamiliars (Decret de Contenció Turística 2025, pactat amb Vox).</li>
          <li>Subida de la ecotasa solo en temporada alta (juny-agost) amb bonificació per a residents.</li>
          <li>Oposició a incrementar l'ecotasa fora de temporada alta; pressió de Vox per no crear nous impostos al sector.</li>
          <li>Aposta per desestacionalització i turisme de qualitat, sense limitar el volum total d'entrada.</li>
          <li>Recupera el caràcter "finalista" de l'ecotasa: retorna diners al sector turístic i medi ambient.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB–PSOE · Armengol</div>
        </div>
        <ul>
          <li>Va crear l'ecotasa el 2016: primer impost turístic de l'Estat, orientat a medi ambient i sostenibilitat.</li>
          <li>Defensora d'una moratòria de places turístiques i limitació de creuers.</li>
          <li>Vol incrementar l'ITS durant tot l'any (no sols temporada alta) per finançar habitatge públic.</li>
          <li>Critica que Armengol va recaptar 700 M€ i va executar projectes per menys del 15% durant el seu mandat.</li>
          <li>Defensa que "qui més ha protegit el territori" és el PSIB: parcs naturals, plans territorials, ley del clima.</li>
          <li>A l'oposició, exigeix subir la ecotasa i crear un impost als vehicles de lloguer no matriculats a les Illes.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Ambdós partits reconeixen la saturació turística i defensen certa contenció. Tots dos han aprovat o defensat l'ecotasa com a instrument. El PP de Prohens, fins i tot, ha pujat la taxa en temporada alta (algo que la dreta havia rebutjat historicament). Hi ha consens en prohibir noves places en plurifamiliars.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        El PSOE vol ecotasa tot l'any i molt més alta per finançar habitatge públic. El PP l'accepta només en temporada alta i sota pressió de Vox descarta nous impostos al sector. El PP defensa el lloguer vacacional reglat com a font d'ingressos per a famílies; el PSOE el veu com un problema estructural d'accés a l'habitatge.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 2: HABITATGE -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🏠</div>
      <div>
        <div class="block-num">Bloc 02</div>
        <div class="block-title">Habitatge i Accés a la Vivenda</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares és la comunitat autònoma amb els preus d'habitatge més alts de l'Estat en relació als salaris. La combinació de pressió turística, creixement demogràfic i escassetat de sòl crea una crisi estructural que cap dels dos governs ha aconseguit resoldre de forma definitiva.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Programa "Lloguer Segur": incentiva propietaris privats a llogar per sota del mercat a canvi de garanties jurídiques i de cobrament.</li>
          <li>"Construir per Llogar": convenis amb ajuntaments per posar sòl disponible i augmentar l'oferta.</li>
          <li>Defensa que la solució passa per augmentar l'oferta, no per limitar preus.</li>
          <li>Nova Llei de Vivenda pactada amb Vox (pressuposts 2025) amb menys restriccions al lloguer turístic reglat.</li>
          <li>Posa sòl públic disponible per a construcció d'habitatge assequible en règim de lloguer.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB–PSOE · Armengol</div>
        </div>
        <ul>
          <li>Durant el govern (2015-2023): va aprovar mesures de rehabilitació i accés, però no va triplicar el parc d'habitatge públic com prometia.</li>
          <li>Proposa destinar l'ecotasa (ITS) directament a construir habitatge públic en lloguer assequible.</li>
          <li>"No em resignaré que cap ciutadà visqui en una caravana": postura de xoc per demanar acció urgent.</li>
          <li>Critica que el PP facilita el lloguer vacacional i especulació, agreujant la crisi d'accés.</li>
          <li>Defensa regulació dels preus del lloguer i major intervenció pública al mercat immobiliari.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Ambdós reconeixen que la crisi d'habitatge és el problema social número u de Baleares. Els dos partits defensen alguna forma de lloguer assequible i l'ús de sòl públic. Cap dels dos governs ha aconseguit resoldre el problema estructuralment.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        El PP confia en el mercat i en incentivar propietaris privats. El PSOE defensa habitatge públic directe i regulació de preus. El PP veu el lloguer turístic reglat com a positiu; el PSOE el veu com a causa del problema. Diferent visió sobre el paper de l'Estat al mercat immobiliari.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 3: LLENGUA -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🗣️</div>
      <div>
        <div class="block-num">Bloc 03</div>
        <div class="block-title">Política Lingüística · Català i Castellà</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares té dues llenges cooficials: el català (en la seva varietat balear) i el castellà. El model educatiu d'immersió lingüística en català, implementat i defensat pels governs progressistes, és un dels eixos de ruptura més intensa entre PP i PSOE. El pacte PP-Vox del 2025 ha intensificat el debat.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Defensa la "llibertat de tria lingüística" en educació: les famílies podran triar la llengua vehicular de l'ensenyament.</li>
          <li>Pla pilot voluntari d'elecció de llengua en Primària, amb extensió prevista a Secundària (pactat amb Vox).</li>
          <li>Modificació de la llei balear d'Educació per incloure el castellà com a llengua vehicular al costat del català.</li>
          <li>Promoure les "modalitats lingüístiques pròpies de cada illa" (reconeixement de dialectes insulars).</li>
          <li>Relajació dels requisits de català per a docents i empleats públics en categories deficitàries.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB–PSOE · Armengol</div>
        </div>
        <ul>
          <li>Defensora del model d'immersió lingüística en català com a eina de cohesió social i identitat.</li>
          <li>"Conflicte lingüístic no tenim. La dreta l'usa com a element de crispació i divisió".</li>
          <li>Manté que les dues llenges cooficials han de conviure, però amb el català com a llengua pròpia del territori.</li>
          <li>Critica que el PP cedeix als requisits de Vox per desmuntar el model lingüístic balear a canvi de suport pressupostari.</li>
          <li>Durant el seu govern: mantenia requisit de català per a docents i funcionaris (amb terminis d'acreditació).</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Ambdós partits afirmen que defensen totes dues llenges cooficials i que volen que els ciutadans les coneguin. Cap dels dos proposa eliminar el català de l'ensenyament ni eliminar el castellà.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        És el tema de màxima divergència. El PSOE defensa la immersió en català com a política pública activa. El PP vol que les famílies triïn i equipara el castellà com a llengua vehicular igual al català. El pacte PP-Vox ha accelerat canvis que el PSOE considera "una retallada de drets lingüístics". La tensió és estructural i afecta el model educatiu, la funció pública i el finançament cultural.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 4: IMMIGRACIÓ -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🌍</div>
      <div>
        <div class="block-num">Bloc 04</div>
        <div class="block-title">Immigració i Menors No Acompanyats</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares és territori receptor de migrants, especialment a Eivissa i Mallorca. El debat s'ha aguditzat arran de la proposta del Govern central de distribuir menors migrants no acompanyats (MENA) entre comunitats autònomes. Prohens s'hi ha oposat, en línia amb Vox.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Oposició al repartiment obligatori de menors migrants no acompanyats des del Govern central.</li>
          <li>Mesures contra la immigració irregular als pressuposts 2025 (pactat amb Vox).</li>
          <li>Defensa que la gestió migratòria és competència estatal i critica la "inacció" del Govern Sánchez.</li>
          <li>Rebutja el "Pacte Verd Europeu" per l'impacte en agricultura i model econòmic local (inclòs en pacte Vox).</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB–PSOE · Armengol</div>
        </div>
        <ul>
          <li>Defensa de la solidaritat territorial en l'acollida de migrants i menors no acompanyats.</li>
          <li>"Palma és una societat acollidora. Tenim gent de 177 països". Discurs integrador.</li>
          <li>Critica que el PP instrumentalitzi la immigració per a un discurs de por, cedint a la narrativa de Vox.</li>
          <li>Durant el seu govern: model d'integració i serveis socials als migrants com a eix de política social.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Ambdós reconeixen que la immigració és una realitat estructural a Baleares i que requereix gestió. Cap dels dos proposa tancament de fronteres. Tots dos accepten la necessitat de serveis d'integració.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        La diferència és radical en enfoc i to. El PP, sota influència de Vox, adopta un discurs de control i restricció, oposant-se al repartiment de MENA. El PSOE defensa la solidaritat i la integració com a valors no negociables. És un dels temes de màxima polarització a escala balear i estatal.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 5: MEDI AMBIENT -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🌿</div>
      <div>
        <div class="block-num">Bloc 05</div>
        <div class="block-title">Medi Ambient i Canvi Climàtic</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Les Illes Balears són especialment vulnerables al canvi climàtic (pujada del nivell del mar, sequeres, pressió sobre recursos hídrics). La llei de canvi climàtic aprovada per Armengol és un dels marcs normatius que el nou govern ha heretat amb una actitud més ambivalent.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Accepta la llei de canvi climàtic aprovada per Armengol, sense derogar-la.</li>
          <li>Prioritza la "sostenibilitat econòmica" per sobre de la "sostenibilitat ambiental" estricta.</li>
          <li>Oposició al Pacte Verd Europeu per l'impacte en l'agricultura i el sector turístic local (pactat amb Vox).</li>
          <li>La Mesa per la Sostenibilitat (2024) inclou empreses, sector econòmic i polítics: enfoc pragmàtic.</li>
          <li>Ecotasa amb caràcter "finalista" per a medi ambient i cicle de l'aigua (inversió efectiva).</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB–PSOE · Armengol</div>
        </div>
        <ul>
          <li>Va aprovar la primera llei de canvi climàtic balear; llei contra els plàstics; reserva de la biosfera.</li>
          <li>Va crear parcs naturals, protegir parcs marins, desclassificar sòl urbanitzable.</li>
          <li>Defensora del Pacte Verd Europeu com a marc necessari per als reptes de les Illes.</li>
          <li>Moratòria de places turístiques i limitació de creuers com a mesures ambientals estructurals.</li>
          <li>Critica que el PP cedeix davant Vox en matèria ambiental a canvi de suport polític.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Tots dos reconeixen la necessitat de protegir el territori i el medi ambient. El PP no ha derogar les lleis ambientals d'Armengol. Hi ha consens en la necessitat de gestió sostenible dels recursos hídrics i en la protecció d'espais naturals.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        El PSOE té una tradició de legislació ambiental activa (parcs, moratòries, ecotasa) i defensa el Pacte Verd Europeu. El PP, empès per Vox, s'oposa al Pacte Verd i prioritza la competitivitat econòmica. L'enfoc del PSOE és regulatori; el del PP, més pragmàtic i orientat al consens amb el sector privat.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 6: SERVEIS PÚBLICS -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🏥</div>
      <div>
        <div class="block-num">Bloc 06</div>
        <div class="block-title">Serveis Públics: Sanitat i Educació</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares té un dels sistemes sanitaris i educatius amb més pressió de l'Estat per l'estacionalitat turística i el creixement demogràfic. La qüestió del català a les oposicions de metges i mestres ha sigut un dels debats més virals dels últims anys.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Defensa que "és millor tenir un metge que no parli català que no tenir metge". Relajació del requisit lingüístic en sanitat.</li>
          <li>Aposta per atraure professionals de fora de les Illes eliminant barreres d'accés lingüístiques.</li>
          <li>Concertació educativa: defensa l'escola concertada i la llibertat d'elecció de centre i llengua.</li>
          <li>Reducció fiscal (tram autonòmic IRPF) com a mesura per a millorar el poder adquisitiu.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB–PSOE · Armengol</div>
        </div>
        <ul>
          <li>"Ningú ha deixat de tenir plaça a la sanitat pública per un tema lingüístic": defensa que el requisit del català no perjudica l'accés.</li>
          <li>Aposta per la sanitat pública universal i la inversió en personal i infraestructures.</li>
          <li>Model d'escola pública com a eix vertebrador, amb el català com a llengua vehicular principal.</li>
          <li>Critica les retallades i la "deriva privatitzadora" de la dreta en serveis públics.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Tots dos defensen el sistema sanitari públic i la necessitat d'inversió. Ambdós reconeixen la dificultat de contractar professionals per les condicions de vida a les Illes. Cap proposa eliminar l'escola pública.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        La disputa lingüística és el nucli del conflicte: el PP relajarà requisits de català per a funcionaris i docents; el PSOE ho considera un retrocés i una amenaça a la qualitat i cohesió. En educació, el PP promou la concertada i la lliure elecció; el PSOE prioritza la pública. En fiscalitat, el PP baixa impostos; el PSOE els manté o amplia per finançar serveis.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 7: VIOLÈNCIA GÈNERE / IGUALTAT -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">⚖️</div>
      <div>
        <div class="block-num">Bloc 07</div>
        <div class="block-title">Igualtat, Violència de Gènere i Política Social</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> La violència de gènere és un problema crític a Baleares, amb casos d'alt impacte mediàtic. El debat sobre si existeix "violència masclista" com a categoria específica és un dels principals eixos de fractura entre la dreta (especialment Vox) i l'esquerra. Prohens navega entre el discurs del PP i la pressió del seu soci Vox.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>El PP nacional reconeix la violència de gènere, però Prohens governa amb Vox, que la nega com a categoria.</li>
          <li>Manté les polítiques d'igualtat autonòmiques sense grans canvis, però amb menor èmfasi que el govern anterior.</li>
          <li>Renda Social Garantitzada (RESOGA): el govern Prohens ha reduït el nombre de beneficiaris en tres anys.</li>
          <li>Postura ambivalent: ni deroga les lleis d'igualtat ni en promou de noves amb Vox al govern.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB–PSOE · Armengol</div>
        </div>
        <ul>
          <li>"El negacionisme de la violència masclista mata, i no permetrem que es banalitzi".</li>
          <li>La lluita contra la violència de gènere és un eix central del discurs i la política del PSIB.</li>
          <li>Durant el govern: va ampliar serveis d'atenció a víctimes, recursos d'emergència i polítiques d'igualtat.</li>
          <li>Defensa la RESOGA com a dret social fonamental i critica la reducció de beneficiaris per part del govern Prohens.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Formalment, tant el PP com el PSOE reconeixen la violència domèstica i condemnen els feminicidis. Tots dos diuen defensar els drets de la dona i no proposen eliminar els serveis d'atenció a víctimes.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        El PSOE fa de la igualtat i la lluita contra la violència masclista un eix polític prioritari i actiu. El PP, condicionat per Vox, redueix l'impuls en polítiques d'igualtat. Hi ha diferències clares en la RESOGA (el PSOE vol ampliar-la; el PP la retalla) i en el discurs sobre violència de gènere com a categoria específica.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- RESUM FINAL -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">📊</div>
      <div>
        <div class="block-num">Resum</div>
        <div class="block-title">La Foto Gran: Dues Visions d'Illes Balears</div>
      </div>
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Visió Global</div>
        </div>
        <ul>
          <li><strong>Economia:</strong> mercat, incentius al sector privat, reducció fiscal.</li>
          <li><strong>Turisme:</strong> contenció selectiva, però sense limitar el model econòmic dominant.</li>
          <li><strong>Llengua:</strong> lliure tria, equiparació castellà-català a l'escola.</li>
          <li><strong>Immigració:</strong> control i restricció, contra el repartiment de MENA.</li>
          <li><strong>Medi ambient:</strong> pragmatisme econòmic sobre ideologia ambiental.</li>
          <li><strong>Aliat clau:</strong> Vox (abstenció a la investidura; pacte pressupostari 2025).</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB–PSOE · Visió Global</div>
        </div>
        <ul>
          <li><strong>Economia:</strong> intervenció pública, impostos per finançar serveis i habitatge.</li>
          <li><strong>Turisme:</strong> moratòries, ecotasa alta, limitació activa del creixement turístic.</li>
          <li><strong>Llengua:</strong> protecció i foment del català com a llengua pròpia del territori.</li>
          <li><strong>Immigració:</strong> integració i solidaritat territorial.</li>
          <li><strong>Medi ambient:</strong> legislació activa, Pacte Verd, protecció del territori.</li>
          <li><strong>Objectiu:</strong> recuperar el Govern el 2027 des de la unitat de l'esquerra.</li>
        </ul>
      </div>
    </div>

    <div class="context-box" style="margin-top: 16px; border-left-color: var(--same);">
      <strong>Nota editorial:</strong> La política balear viu un moment de polarització creixent. El pacte PP-Vox ha radicalitzat alguns eixos (llengua, immigració) però ha generat tensions internes al PP. El PSIB mira al 2027 amb Armengol com a referent i aposta per la unitat de l'esquerra (amb Més i Podemos). El terreny de joc real és turisme, habitatge i llengua: els tres temes que decidiran les pròximes eleccions autonòmiques.
    </div>
  </div>


  </div>
</div>


<div class="tab-nav">
  <div class="tab-nav-inner">
    <button class="tab-btn active" onclick="showTab('comparativa',this)">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>PP vs PSOE</button>
    <button class="tab-btn" onclick="showTab('partits',this)">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Fitxes</button>
    <button class="tab-btn" onclick="showTab('comparador',this)">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>Comparador</button>
    <button class="tab-btn" onclick="showTab('programes',this)">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>Programes</button>
    <button class="tab-btn" onclick="showTab('pobles',this)">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Pobles</button>
    <button class="tab-btn" onclick="showTab('elect27',this)">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Eleccions 2027</button>
    <button class="tab-btn" onclick="showTab('governs',this)">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>Governs</button>
    <button class="tab-btn" onclick="showTab('fonts',this)">
      <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>Fonts</button>
  </div>
</div>

<div id="tab-comparativa" class="tab-section active">

  <div class="intro-wrap">
    <div class="intro-box">
      <h2>Com llegir aquesta secció</h2>
      <p>Cada bloc temàtic recull la posició de cadascun dels dos partits, una explicació del context a Baleares, i una anàlisi de <strong>punts de convergència</strong> (on coincideixen) i <strong>punts de divergència</strong> (on s'oposen). Les posicions de Prohens corresponen al seu Govern actual (2023-avui). Les d'Armengol reflecteixen la seva acció de govern (2015-2023) i el discurs actual del PSIB com a oposició, incloent les declaracions de cara al 2027.</p>
    </div>
  </div>

  <div class="content-wrap">


  <!-- BLOC 1: TURISME -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🏖️</div>
      <div>
        <div class="block-num">Bloc 01</div>
        <div class="block-title">Turisme i Model Econòmic</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares rep anualment prop de <strong>20 milions de turistes</strong> per a una població d'1,2 milions d'habitants. El debat no és si el turisme és necessari —tots l'accepten— sinó <em>quin model</em>: de masses i creixement, o de contenció i qualitat. L'Impost de Turisme Sostenible (ITS o ecotasa), creat el 2016 per Armengol, és el gran cavall de batalla entre ambdós partits.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Defensa el turisme reglat com a motor econòmic imprescindible. "El turisme reparteix i genera riquesa".</li>
          <li>Prohibició de noves places en pisos plurifamiliars (Decret de Contenció Turística 2025, pactat amb Vox).</li>
          <li>Subida de la ecotasa solo en temporada alta (juny-agost) amb bonificació per a residents.</li>
          <li>Oposició a incrementar l'ecotasa fora de temporada alta; pressió de Vox per no crear nous impostos al sector.</li>
          <li>Aposta per desestacionalització i turisme de qualitat, sense limitar el volum total d'entrada.</li>
          <li>Recupera el caràcter "finalista" de l'ecotasa: retorna diners al sector turístic i medi ambient.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB-PSOE · Armengol</div>
        </div>
        <ul>
          <li>Va crear l'ecotasa el 2016: primer impost turístic de l'Estat, orientat a medi ambient i sostenibilitat.</li>
          <li>Defensora d'una moratòria de places turístiques i limitació de creuers.</li>
          <li>Vol incrementar l'ITS durant tot l'any (no sols temporada alta) per finançar habitatge públic.</li>
          <li>Critica que Armengol va recaptar 700 M€ i va executar projectes per menys del 15% durant el seu mandat.</li>
          <li>Defensa que "qui més ha protegit el territori" és el PSIB: parcs naturals, plans territorials, ley del clima.</li>
          <li>A l'oposició, exigeix subir la ecotasa i crear un impost als vehicles de lloguer no matriculats a les Illes.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Ambdós partits reconeixen la saturació turística i defensen certa contenció. Tots dos han aprovat o defensat l'ecotasa com a instrument. El PP de Prohens, fins i tot, ha pujat la taxa en temporada alta (algo que la dreta havia rebutjat historicament). Hi ha consens en prohibir noves places en plurifamiliars.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        El PSOE vol ecotasa tot l'any i molt més alta per finançar habitatge públic. El PP l'accepta només en temporada alta i sota pressió de Vox descarta nous impostos al sector. El PP defensa el lloguer vacacional reglat com a font d'ingressos per a famílies; el PSOE el veu com un problema estructural d'accés a l'habitatge.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 2: HABITATGE -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🏠</div>
      <div>
        <div class="block-num">Bloc 02</div>
        <div class="block-title">Habitatge i Accés a la Vivenda</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares és la comunitat autònoma amb els preus d'habitatge més alts de l'Estat en relació als salaris. La combinació de pressió turística, creixement demogràfic i escassetat de sòl crea una crisi estructural que cap dels dos governs ha aconseguit resoldre de forma definitiva.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Programa "Lloguer Segur": incentiva propietaris privats a llogar per sota del mercat a canvi de garanties jurídiques i de cobrament.</li>
          <li>"Construir per Llogar": convenis amb ajuntaments per posar sòl disponible i augmentar l'oferta.</li>
          <li>Defensa que la solució passa per augmentar l'oferta, no per limitar preus.</li>
          <li>Nova Llei de Vivenda pactada amb Vox (pressuposts 2025) amb menys restriccions al lloguer turístic reglat.</li>
          <li>Posa sòl públic disponible per a construcció d'habitatge assequible en règim de lloguer.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB-PSOE · Armengol</div>
        </div>
        <ul>
          <li>Durant el govern (2015-2023): va aprovar mesures de rehabilitació i accés, però no va triplicar el parc d'habitatge públic com prometia.</li>
          <li>Proposa destinar l'ecotasa (ITS) directament a construir habitatge públic en lloguer assequible.</li>
          <li>"No em resignaré que cap ciutadà visqui en una caravana": postura de xoc per demanar acció urgent.</li>
          <li>Critica que el PP facilita el lloguer vacacional i especulació, agreujant la crisi d'accés.</li>
          <li>Defensa regulació dels preus del lloguer i major intervenció pública al mercat immobiliari.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Ambdós reconeixen que la crisi d'habitatge és el problema social número u de Baleares. Els dos partits defensen alguna forma de lloguer assequible i l'ús de sòl públic. Cap dels dos governs ha aconseguit resoldre el problema estructuralment.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        El PP confia en el mercat i en incentivar propietaris privats. El PSOE defensa habitatge públic directe i regulació de preus. El PP veu el lloguer turístic reglat com a positiu; el PSOE el veu com a causa del problema. Diferent visió sobre el paper de l'Estat al mercat immobiliari.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 3: LLENGUA -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🗣️</div>
      <div>
        <div class="block-num">Bloc 03</div>
        <div class="block-title">Política Lingüística · Català i Castellà</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares té dues llenges cooficials: el català (en la seva varietat balear) i el castellà. El model educatiu d'immersió lingüística en català, implementat i defensat pels governs progressistes, és un dels eixos de ruptura més intensa entre PP i PSOE. El pacte PP-Vox del 2025 ha intensificat el debat.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Defensa la "llibertat de tria lingüística" en educació: les famílies podran triar la llengua vehicular de l'ensenyament.</li>
          <li>Pla pilot voluntari d'elecció de llengua en Primària, amb extensió prevista a Secundària (pactat amb Vox).</li>
          <li>Modificació de la llei balear d'Educació per incloure el castellà com a llengua vehicular al costat del català.</li>
          <li>Promoure les "modalitats lingüístiques pròpies de cada illa" (reconeixement de dialectes insulars).</li>
          <li>Relajació dels requisits de català per a docents i empleats públics en categories deficitàries.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB-PSOE · Armengol</div>
        </div>
        <ul>
          <li>Defensora del model d'immersió lingüística en català com a eina de cohesió social i identitat.</li>
          <li>"Conflicte lingüístic no tenim. La dreta l'usa com a element de crispació i divisió".</li>
          <li>Manté que les dues llenges cooficials han de conviure, però amb el català com a llengua pròpia del territori.</li>
          <li>Critica que el PP cedeix als requisits de Vox per desmuntar el model lingüístic balear a canvi de suport pressupostari.</li>
          <li>Durant el seu govern: mantenia requisit de català per a docents i funcionaris (amb terminis d'acreditació).</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Ambdós partits afirmen que defensen totes dues llenges cooficials i que volen que els ciutadans les coneguin. Cap dels dos proposa eliminar el català de l'ensenyament ni eliminar el castellà.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        És el tema de màxima divergència. El PSOE defensa la immersió en català com a política pública activa. El PP vol que les famílies triïn i equipara el castellà com a llengua vehicular igual al català. El pacte PP-Vox ha accelerat canvis que el PSOE considera "una retallada de drets lingüístics". La tensió és estructural i afecta el model educatiu, la funció pública i el finançament cultural.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 4: IMMIGRACIÓ -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🌍</div>
      <div>
        <div class="block-num">Bloc 04</div>
        <div class="block-title">Immigració i Menors No Acompanyats</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares és territori receptor de migrants, especialment a Eivissa i Mallorca. El debat s'ha aguditzat arran de la proposta del Govern central de distribuir menors migrants no acompanyats (MENA) entre comunitats autònomes. Prohens s'hi ha oposat, en línia amb Vox.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Oposició al repartiment obligatori de menors migrants no acompanyats des del Govern central.</li>
          <li>Mesures contra la immigració irregular als pressuposts 2025 (pactat amb Vox).</li>
          <li>Defensa que la gestió migratòria és competència estatal i critica la "inacció" del Govern Sánchez.</li>
          <li>Rebutja el "Pacte Verd Europeu" per l'impacte en agricultura i model econòmic local (inclòs en pacte Vox).</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB-PSOE · Armengol</div>
        </div>
        <ul>
          <li>Defensa de la solidaritat territorial en l'acollida de migrants i menors no acompanyats.</li>
          <li>"Palma és una societat acollidora. Tenim gent de 177 països". Discurs integrador.</li>
          <li>Critica que el PP instrumentalitzi la immigració per a un discurs de por, cedint a la narrativa de Vox.</li>
          <li>Durant el seu govern: model d'integració i serveis socials als migrants com a eix de política social.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Ambdós reconeixen que la immigració és una realitat estructural a Baleares i que requereix gestió. Cap dels dos proposa tancament de fronteres. Tots dos accepten la necessitat de serveis d'integració.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        La diferència és radical en enfoc i to. El PP, sota influència de Vox, adopta un discurs de control i restricció, oposant-se al repartiment de MENA. El PSOE defensa la solidaritat i la integració com a valors no negociables. És un dels temes de màxima polarització a escala balear i estatal.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 5: MEDI AMBIENT -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🌿</div>
      <div>
        <div class="block-num">Bloc 05</div>
        <div class="block-title">Medi Ambient i Canvi Climàtic</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Les Illes Balears són especialment vulnerables al canvi climàtic (pujada del nivell del mar, sequeres, pressió sobre recursos hídrics). La llei de canvi climàtic aprovada per Armengol és un dels marcs normatius que el nou govern ha heretat amb una actitud més ambivalent.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Accepta la llei de canvi climàtic aprovada per Armengol, sense derogar-la.</li>
          <li>Prioritza la "sostenibilitat econòmica" per sobre de la "sostenibilitat ambiental" estricta.</li>
          <li>Oposició al Pacte Verd Europeu per l'impacte en l'agricultura i el sector turístic local (pactat amb Vox).</li>
          <li>La Mesa per la Sostenibilitat (2024) inclou empreses, sector econòmic i polítics: enfoc pragmàtic.</li>
          <li>Ecotasa amb caràcter "finalista" per a medi ambient i cicle de l'aigua (inversió efectiva).</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB-PSOE · Armengol</div>
        </div>
        <ul>
          <li>Va aprovar la primera llei de canvi climàtic balear; llei contra els plàstics; reserva de la biosfera.</li>
          <li>Va crear parcs naturals, protegir parcs marins, desclassificar sòl urbanitzable.</li>
          <li>Defensora del Pacte Verd Europeu com a marc necessari per als reptes de les Illes.</li>
          <li>Moratòria de places turístiques i limitació de creuers com a mesures ambientals estructurals.</li>
          <li>Critica que el PP cedeix davant Vox en matèria ambiental a canvi de suport polític.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Tots dos reconeixen la necessitat de protegir el territori i el medi ambient. El PP no ha derogar les lleis ambientals d'Armengol. Hi ha consens en la necessitat de gestió sostenible dels recursos hídrics i en la protecció d'espais naturals.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        El PSOE té una tradició de legislació ambiental activa (parcs, moratòries, ecotasa) i defensa el Pacte Verd Europeu. El PP, empès per Vox, s'oposa al Pacte Verd i prioritza la competitivitat econòmica. L'enfoc del PSOE és regulatori; el del PP, més pragmàtic i orientat al consens amb el sector privat.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 6: SERVEIS PÚBLICS -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">🏥</div>
      <div>
        <div class="block-num">Bloc 06</div>
        <div class="block-title">Serveis Públics: Sanitat i Educació</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> Baleares té un dels sistemes sanitaris i educatius amb més pressió de l'Estat per l'estacionalitat turística i el creixement demogràfic. La qüestió del català a les oposicions de metges i mestres ha sigut un dels debats més virals dels últims anys.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>Defensa que "és millor tenir un metge que no parli català que no tenir metge". Relajació del requisit lingüístic en sanitat.</li>
          <li>Aposta per atraure professionals de fora de les Illes eliminant barreres d'accés lingüístiques.</li>
          <li>Concertació educativa: defensa l'escola concertada i la llibertat d'elecció de centre i llengua.</li>
          <li>Reducció fiscal (tram autonòmic IRPF) com a mesura per a millorar el poder adquisitiu.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB-PSOE · Armengol</div>
        </div>
        <ul>
          <li>"Ningú ha deixat de tenir plaça a la sanitat pública per un tema lingüístic": defensa que el requisit del català no perjudica l'accés.</li>
          <li>Aposta per la sanitat pública universal i la inversió en personal i infraestructures.</li>
          <li>Model d'escola pública com a eix vertebrador, amb el català com a llengua vehicular principal.</li>
          <li>Critica les retallades i la "deriva privatitzadora" de la dreta en serveis públics.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Tots dos defensen el sistema sanitari públic i la necessitat d'inversió. Ambdós reconeixen la dificultat de contractar professionals per les condicions de vida a les Illes. Cap proposa eliminar l'escola pública.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        La disputa lingüística és el nucli del conflicte: el PP relajarà requisits de català per a funcionaris i docents; el PSOE ho considera un retrocés i una amenaça a la qualitat i cohesió. En educació, el PP promou la concertada i la lliure elecció; el PSOE prioritza la pública. En fiscalitat, el PP baixa impostos; el PSOE els manté o amplia per finançar serveis.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- BLOC 7: VIOLÈNCIA GÈNERE / IGUALTAT -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">⚖️</div>
      <div>
        <div class="block-num">Bloc 07</div>
        <div class="block-title">Igualtat, Violència de Gènere i Política Social</div>
      </div>
    </div>

    <div class="context-box">
      <strong>Context:</strong> La violència de gènere és un problema crític a Baleares, amb casos d'alt impacte mediàtic. El debat sobre si existeix "violència masclista" com a categoria específica és un dels principals eixos de fractura entre la dreta (especialment Vox) i l'esquerra. Prohens navega entre el discurs del PP i la pressió del seu soci Vox.
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Marga Prohens</div>
        </div>
        <ul>
          <li>El PP nacional reconeix la violència de gènere, però Prohens governa amb Vox, que la nega com a categoria.</li>
          <li>Manté les polítiques d'igualtat autonòmiques sense grans canvis, però amb menor èmfasi que el govern anterior.</li>
          <li>Renda Social Garantitzada (RESOGA): el govern Prohens ha reduït el nombre de beneficiaris en tres anys.</li>
          <li>Postura ambivalent: ni deroga les lleis d'igualtat ni en promou de noves amb Vox al govern.</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB-PSOE · Armengol</div>
        </div>
        <ul>
          <li>"El negacionisme de la violència masclista mata, i no permetrem que es banalitzi".</li>
          <li>La lluita contra la violència de gènere és un eix central del discurs i la política del PSIB.</li>
          <li>Durant el govern: va ampliar serveis d'atenció a víctimes, recursos d'emergència i polítiques d'igualtat.</li>
          <li>Defensa la RESOGA com a dret social fonamental i critica la reducció de beneficiaris per part del govern Prohens.</li>
        </ul>
      </div>
    </div>

    <div class="comparison-row">
      <div class="comp-box same">
        <div class="comp-label"><div class="dot"></div>COINCIDEIXEN</div>
        Formalment, tant el PP com el PSOE reconeixen la violència domèstica i condemnen els feminicidis. Tots dos diuen defensar els drets de la dona i no proposen eliminar els serveis d'atenció a víctimes.
      </div>
      <div class="comp-box diff">
        <div class="comp-label"><div class="dot"></div>ES DIFERENCIEN</div>
        El PSOE fa de la igualtat i la lluita contra la violència masclista un eix polític prioritari i actiu. El PP, condicionat per Vox, redueix l'impuls en polítiques d'igualtat. Hi ha diferències clares en la RESOGA (el PSOE vol ampliar-la; el PP la retalla) i en el discurs sobre violència de gènere com a categoria específica.
      </div>
    </div>
  </div>

  <hr class="section-divider">

  <!-- RESUM FINAL -->
  <div class="block">
    <div class="block-header">
      <div class="block-icon">📊</div>
      <div>
        <div class="block-num">Resum</div>
        <div class="block-title">La Foto Gran: Dues Visions d'Illes Balears</div>
      </div>
    </div>

    <div class="positions-grid">
      <div class="position-card pp">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PP · Visió Global</div>
        </div>
        <ul>
          <li><strong>Economia:</strong> mercat, incentius al sector privat, reducció fiscal.</li>
          <li><strong>Turisme:</strong> contenció selectiva, però sense limitar el model econòmic dominant.</li>
          <li><strong>Llengua:</strong> lliure tria, equiparació castellà-català a l'escola.</li>
          <li><strong>Immigració:</strong> control i restricció, contra el repartiment de MENA.</li>
          <li><strong>Medi ambient:</strong> pragmatisme econòmic sobre ideologia ambiental.</li>
          <li><strong>Aliat clau:</strong> Vox (abstenció a la investidura; pacte pressupostari 2025).</li>
        </ul>
      </div>
      <div class="position-card psoe">
        <div class="position-party">
          <div class="party-dot"></div>
          <div class="party-name-label">PSIB-PSOE · Visió Global</div>
        </div>
        <ul>
          <li><strong>Economia:</strong> intervenció pública, impostos per finançar serveis i habitatge.</li>
          <li><strong>Turisme:</strong> moratòries, ecotasa alta, limitació activa del creixement turístic.</li>
          <li><strong>Llengua:</strong> protecció i foment del català com a llengua pròpia del territori.</li>
          <li><strong>Immigració:</strong> integració i solidaritat territorial.</li>
          <li><strong>Medi ambient:</strong> legislació activa, Pacte Verd, protecció del territori.</li>
          <li><strong>Objectiu:</strong> recuperar el Govern el 2027 des de la unitat de l'esquerra.</li>
        </ul>
      </div>
    </div>

    <div class="context-box" style="margin-top: 16px; border-left-color: var(--same);">
      <strong>Nota editorial:</strong> La política balear viu un moment de polarització creixent. El pacte PP-Vox ha radicalitzat alguns eixos (llengua, immigració) però ha generat tensions internes al PP. El PSIB mira al 2027 amb Armengol com a referent i aposta per la unitat de l'esquerra (amb Més i Podemos). El terreny de joc real és turisme, habitatge i llengua: els tres temes que decidiran les pròximes eleccions autonòmiques.
    </div>
  </div>


  </div>
</div>
<div id="tab-partits" class="tab-section">
  <div class="sec-title-bar" style="background:linear-gradient(135deg,#1a1a2e 0%,#2a2a4e 100%);">
    <div class="sec-label">Arc Parlamentari · XI Legislatura 2023</div>
    <div class="sec-main-title">🏛️ Fitxes de Partits</div>
    <div class="sec-sub">Clica sobre qualsevol fitxa per veure les posicions del partit en els 7 grans temes</div>
  </div>

  <div class="content-wrap">
    <!-- Parliament bar -->
    <div style="background:#fff;border-radius:12px;padding:20px 24px;margin-bottom:24px;box-shadow:var(--shadow);">
      <div style="font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#aaa;margin-bottom:10px;">59 ESCONS · MAJORIA ABSOLUTA: 30</div>
      <div style="display:flex;height:20px;border-radius:10px;overflow:hidden;margin-bottom:10px;">
        <div style="flex:25;background:#003087;" title="PP: 25"></div>
        <div style="flex:18;background:#c0392b;" title="PSIB: 18"></div>
        <div style="flex:8;background:#5a7a00;" title="Vox: 8"></div>
        <div style="flex:4;background:#2e7d32;" title="Més: 4"></div>
        <div style="flex:2;background:#00695c;" title="MxMe: 2"></div>
        <div style="flex:1;background:#7b1fa2;" title="Podem: 1"></div>
        <div style="flex:1;background:#4527a0;" title="Sa Unió: 1"></div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        <span style="font-size:11.5px;color:#555;display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#003087;display:inline-block;"></span>PP: 25</span>
        <span style="font-size:11.5px;color:#555;display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#c0392b;display:inline-block;"></span>PSIB-PSOE: 18</span>
        <span style="font-size:11.5px;color:#555;display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#5a7a00;display:inline-block;"></span>Vox: 8</span>
        <span style="font-size:11.5px;color:#555;display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#2e7d32;display:inline-block;"></span>Més per Mallorca: 4</span>
        <span style="font-size:11.5px;color:#555;display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#00695c;display:inline-block;"></span>Més per Menorca: 2</span>
        <span style="font-size:11.5px;color:#555;display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#7b1fa2;display:inline-block;"></span>Podem: 1</span>
        <span style="font-size:11.5px;color:#555;display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#4527a0;display:inline-block;"></span>Sa Unió: 1</span>
      </div>
    </div>

    <div class="party-grid" id="party-grid"></div>
  </div>
</div>
<div id="tab-comparador" class="tab-section">
  <div class="sec-title-bar" style="background:linear-gradient(135deg,#1a1a2e 0%,#2a3a5e 100%);">
    <div class="sec-label">Eina interactiva</div>
    <div class="sec-main-title">🔄 Comparador de Partits</div>
    <div class="sec-sub">Selecciona qualsevol parell de partits i compara les seves posicions tema per tema</div>
  </div>
  <div class="content-wrap">
    <div class="compare-selectors">
      <div class="compare-sel-label">Partit 1</div>
      <div class="compare-sel-label">Partit 2</div>
      <div class="compare-sel">
        <select id="sel1" onchange="renderCompare()" style="border:2px solid #003087;color:#003087;border-radius:8px;padding:10px 14px;width:100%;font-size:13px;font-weight:600;font-family:inherit;"></select>
      </div>
      <div class="compare-sel">
        <select id="sel2" onchange="renderCompare()" style="border:2px solid #c0392b;color:#c0392b;border-radius:8px;padding:10px 14px;width:100%;font-size:13px;font-weight:600;font-family:inherit;"></select>
      </div>
    </div>
    <div class="compare-headers" id="compare-headers"></div>
    <div class="topic-pills" id="topic-pills"></div>
    <div id="compare-blocks"></div>
  </div>
</div>
<div id="tab-programes" class="tab-section">
  <div class="sec-title-bar" style="background:linear-gradient(135deg,#1a1a2e 0%,#3a2a1e 100%);">
    <div class="sec-label">2015 · 2019 · 2023</div>
    <div class="sec-main-title">📋 Programes Electorals</div>
    <div class="sec-sub">Resultats de cada elecció, resum dels programes electorals i anàlisi del compliment per als partits que van governar</div>
  </div>
  <div class="content-wrap">
    <div class="year-tabs">
      <button class="year-tab active" onclick="showYear(2015,this)">2015</button>
      <button class="year-tab" onclick="showYear(2019,this)">2019</button>
      <button class="year-tab" onclick="showYear(2023,this)">2023</button>
    </div>
    <div id="election-blocks"></div>
  </div>
</div>

<div id="tab-pobles" class="tab-section">
  <div class="sec-title-bar" style="background:linear-gradient(135deg,#1a1a2e 0%,#1a2a3a 100%);">
    <div class="sec-label">Eleccions Municipals 28M 2023</div>
    <div class="sec-main-title">Composicio dels Ajuntaments</div>
    <div class="sec-sub">Alcalde/essa, composicio del consistori i distribucio de regidors. Principals municipis de les Illes Balears.</div>
  </div>
  <div class="content-wrap">
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
      <input type="text" class="search-bar" id="poble-search" placeholder="Cerca un municipi..." oninput="filterPobles()" style="max-width:400px;">
    </div>
    <div class="filter-pills">
      <button class="filter-pill active" onclick="filterByIlla(event,'totes')">Totes les Illes</button>
      <button class="filter-pill" onclick="filterByIlla(event,'Mallorca')">Mallorca</button>
      <button class="filter-pill" onclick="filterByIlla(event,'Menorca')">Menorca</button>
      <button class="filter-pill" onclick="filterByIlla(event,'Eivissa')">Eivissa</button>
      <button class="filter-pill" onclick="filterByIlla(event,'Formentera')">Formentera</button>
      <span style="width:1px;height:20px;background:var(--border);display:inline-block;margin:0 4px;"></span>
      <button class="filter-pill" onclick="filterByGovern(event,'PP')"><span style="width:8px;height:8px;border-radius:2px;background:#003087;display:inline-block;margin-right:4px;vertical-align:middle;"></span>PP</button>
      <button class="filter-pill" onclick="filterByGovern(event,'PSIB')"><span style="width:8px;height:8px;border-radius:2px;background:#c0392b;display:inline-block;margin-right:4px;vertical-align:middle;"></span>PSIB</button>
      <button class="filter-pill" onclick="filterByGovern(event,'Mes')"><span style="width:8px;height:8px;border-radius:2px;background:#2e7d32;display:inline-block;margin-right:4px;vertical-align:middle;"></span>Mes/Prog</button>
    </div>
    <div style="font-size:12px;color:#aaa;margin-bottom:16px;padding:10px 14px;background:#fff;border-radius:8px;border-left:3px solid var(--border);">
      Nota: Dades del 28M 2023. Alguns municipis han pogut tenir canvis posteriors (mocions de censura, etc.). Fonts: Wikipedia EN, Ultima Hora, Diario de Mallorca.
    </div>
    <div class="pobles-grid" id="pobles-grid"></div>
    <div class="no-results" id="no-results" style="display:none;">Cap municipi trobat.</div>
  </div>
</div>


<div id="tab-elect27" class="tab-section">
  <div class="sec-title-bar" style="background:linear-gradient(135deg,#1a1a2e 0%,#0a1a4e 100%);">
    <div class="sec-label">Proximes eleccions autonomiques previstes</div>
    <div class="sec-main-title">Eleccions Autonomiques 2027</div>
    <div class="sec-sub">Escenaris, temes de campanya i comparativa anticipada de propostes. Data prevista: maig 2027.</div>
  </div>
  <div class="content-wrap">
    <div style="background:#fff3cd;border-radius:10px;padding:14px 18px;margin-bottom:20px;border-left:3px solid #d4a017;font-size:13px;color:#7a5c00;">
      <strong>Nota:</strong> Proieccio anticipada basada en tendencies actuals i declaracions fins a juny 2026. No son programes oficials.
    </div>
    <div class="block-header" style="margin-bottom:16px;">
      <div class="block-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:22px;height:22px;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
      <div><div class="block-num">Tendencies 2026</div><div class="block-title">Escenaris Electorals</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px;">
      <div class="elect27-scenario" style="border-left-color:#003087;">
        <div class="elect27-title">Escenari A: Prohens repeteix</div>
        <div class="elect27-sub">Si el PP manté posicions i Vox no creix molt, el PP podria repetir. Necessitaria pacte formal amb Vox. Probabilitat moderada-alta si habitatge i economia es gestionen be.</div>
        <div class="poll-bar" style="margin-top:12px;">
          <div class="poll-seg" style="flex:34;background:#003087;" title="PP ~34%">PP 34</div>
          <div class="poll-seg" style="flex:26;background:#c0392b;" title="PSIB ~26%">PSIB 26</div>
          <div class="poll-seg" style="flex:12;background:#5a7a00;" title="Vox ~12%">Vox 12</div>
          <div class="poll-seg" style="flex:10;background:#2e7d32;" title="Mes ~10%">Mes 10</div>
          <div class="poll-seg" style="flex:18;background:#888;" title="Altres ~18%">Altres</div>
        </div>
        <div style="font-size:11px;color:#aaa;margin-top:4px;">Proieccio orientativa basada en tendencies 2025-26</div>
      </div>
      <div class="elect27-scenario" style="border-left-color:#c0392b;">
        <div class="elect27-title">Escenari B: Retorn de l'esquerra</div>
        <div class="elect27-sub">Si la crisi d'habitatge s'agreuja i el desgast PP-Vox augmenta, el PSIB+Mes+Podem podrien recuperar el govern. La clau es la unitat de l'esquerra.</div>
        <div class="poll-bar" style="margin-top:12px;">
          <div class="poll-seg" style="flex:29;background:#c0392b;" title="PSIB ~29%">PSIB 29</div>
          <div class="poll-seg" style="flex:30;background:#003087;" title="PP ~30%">PP 30</div>
          <div class="poll-seg" style="flex:11;background:#2e7d32;" title="Mes ~11%">Mes 11</div>
          <div class="poll-seg" style="flex:10;background:#5a7a00;" title="Vox ~10%">Vox 10</div>
          <div class="poll-seg" style="flex:20;background:#888;" title="Altres ~20%">Altres</div>
        </div>
        <div style="font-size:11px;color:#aaa;margin-top:4px;">Proieccio orientativa basada en tendencies 2025-26</div>
      </div>
    </div>
    <div class="block-header" style="margin-bottom:16px;">
      <div class="block-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:22px;height:22px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
      <div><div class="block-num">Agenda 2027</div><div class="block-title">Temes que Decidiran les Eleccions</div></div>
    </div>
    <div class="issues-grid" style="margin-bottom:24px;">
      <div class="issue-card" style="border-top:3px solid #c0392b;"><div style="font-size:24px;margin-bottom:6px;">&#127968;</div><div class="issue-title">Habitatge</div><div class="issue-text">El tema numero 1. Baleares, CCAA amb els preus de lloguer mes alts. La crisi no s'ha resolt amb cap govern.</div></div>
      <div class="issue-card" style="border-top:3px solid #2e7d32;"><div style="font-size:24px;margin-bottom:6px;">&#127958;</div><div class="issue-title">Turisme</div><div class="issue-text">Contenció vs. creixement. L'ecotasa i el lloguer vacacional seran eixos de batalla.</div></div>
      <div class="issue-card" style="border-top:3px solid #003087;"><div style="font-size:24px;margin-bottom:6px;">&#128172;</div><div class="issue-title">Llengua</div><div class="issue-text">El pacte PP-Vox ha radicalitzat el debat. El catala a les escoles sera de nou un eix de mobilitzacio.</div></div>
      <div class="issue-card" style="border-top:3px solid #5a7a00;"><div style="font-size:24px;margin-bottom:6px;">&#127758;</div><div class="issue-title">Immigracio</div><div class="issue-text">El debat sobre MENA i immigracio irregular. Vox intentara convertir-lo en el tema central.</div></div>
      <div class="issue-card" style="border-top:3px solid #7b1fa2;"><div style="font-size:24px;margin-bottom:6px;">&#128176;</div><div class="issue-title">Costo de Vida</div><div class="issue-text">Poder adquisitiu, salaris de temporada i bretxa salarial respecte al continent. Mobilitzadora per a joves.</div></div>
      <div class="issue-card" style="border-top:3px solid #00695c;"><div style="font-size:24px;margin-bottom:6px;">&#127807;</div><div class="issue-title">Medi Ambient</div><div class="issue-text">Canvi climatic, sequeres i pressions sobre recursos hidrics. Eix de Mes i PSIB sobretot.</div></div>
    </div>
    <div class="block-header" style="margin-bottom:14px;">
      <div class="block-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:22px;height:22px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
      <div><div class="block-num">Anticipacio</div><div class="block-title">Que Diuen els Partits de Cara al 2027</div></div>
    </div>
    <div class="prog27-grid" id="prog27-grid"></div>
    <div class="block-header" style="margin:24px 0 14px;">
      <div class="block-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:22px;height:22px;"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
      <div><div class="block-num">Formacions</div><div class="block-title">Partits que Preveu Presentar-se</div></div>
    </div>
    <div id="parties27-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;"></div>
  </div>
</div>

<div id="tab-governs" class="tab-section">
  <div class="sec-title-bar" style="background:linear-gradient(135deg,#1a1a2e 0%,#1a2a1e 100%);">
    <div class="sec-label">2015 · 2019 · 2023</div>
    <div class="sec-main-title">📅 Cronologia dels Governs</div>
    <div class="sec-sub">Qui governava, amb qui governava, i quines lleis i fites van marcar cada mandat</div>
  </div>
  <div class="content-wrap" id="governs-content"></div>
</div>
<div id="tab-fonts" class="tab-section">
  <div class="sec-title-bar" style="background:linear-gradient(135deg,#1a1a2e 0%,#2e2a1a 100%);">
    <div class="sec-label">Documentació</div>
    <div class="sec-main-title">📚 Fonts Consultades</div>
    <div class="sec-sub">Fonts primàries, premsa, institucionals i materials de verificació</div>
  </div>
  <div class="content-wrap">
    <div class="methodology-box">
      <strong>Nota metodològica:</strong> Tota la informació prové de fonts públiques verificades. Les posicions d'Armengol post-2023 reflecteixen el seu rol d'oposició i secretaria general del PSIB. S'han consultat fonts de diferent tendència editorial per garantir l'equilibri. Document actualitzat fins al <strong>juny de 2026</strong>.
    </div>
    <div class="fonts-grid" id="fonts-grid"></div>
  </div>
</div>
<footer>
  BalearsPolitic · Eina d'anàlisi política de les Illes Balears <span>·</span> Elaborat per Deacorde <span>·</span> Juny 2026 <span>·</span> Les posicions reflecteixen declaracions i actuacions públiques contrastades
</footer>
<script>


/* ─── DATA ─── */
const TOPICS=[
  {id:"turisme",    label:"Turisme",         icon:"🏖️"},
  {id:"habitatge",  label:"Habitatge",        icon:"🏠"},
  {id:"llengua",    label:"Llengua",          icon:"🗣️"},
  {id:"mediAmbient",label:"Medi Ambient",     icon:"🌿"},
  {id:"immigracio", label:"Immigració",       icon:"🌍"},
  {id:"serveis",    label:"Serveis Públics",  icon:"🏥"},
  {id:"fiscalitat", label:"Fiscalitat",       icon:"💶"},
];

const PARTIES={
  pp:{id:"pp",name:"PP",fullName:"Partido Popular Baleares",color:"#003087",bg:"#dce8ff",ideology:"Centre-dreta · Liberal conservador",leader:"Marga Prohens",founded:1989,seats:25,status:"GOVERN 2023–",
    desc:"Partit de govern actual. Defensa la llibertat lingüística, el mercat com a solució a l'habitatge i un model turístic sostenible amb menor pressió fiscal. Govern en minoria amb suport extern de Vox.",
    positions:{turisme:"Contenció selectiva: prohibició de noves places en pisos plurifamiliars però sense limitar el volum global d'entrada. Ecotasa únicament en temporada alta (juny–agost). Defensa el lloguer vacacional reglat com a font d'ingressos per a famílies.",habitatge:"Solucions de mercat: programa 'Lloguer Segur' (incentius a propietaris privats), 'Construir per Llogar' amb ajuntaments. Posa sòl públic disponible. Contra la regulació de preus per intervencionisme estatal.",llengua:"Llibertat de tria lingüística familiar. Pla pilot d'elecció de llengua vehicular a les escoles. Castellà vehicular equiparat al català. Relajació requisits de català en funció pública en categories de 'difícil cobertura'.",mediAmbient:"Accepta la Llei del Clima d'Armengol però prioritza la competitivitat econòmica. Oposició al Pacte Verd Europeu (inclòs al pacte amb Vox). Mesa per la Sostenibilitat amb sector privat com a marc de diàleg.",immigracio:"Control de la immigració irregular. Oposició al repartiment obligatori de MENA entre CCAA. Mesures restrictives als pressuposts 2025 pactades amb Vox.",serveis:"Relajació requisits de català per atraure sanitaris i docents. Aposta per la concertada i la lliure elecció de centre educatiu. Reducció burocràtica en llicències.",fiscalitat:"Baixada de l'IRPF autonòmic. Bonificació de l'ecotasa per a residents. Reducció de càrregues administratives i fiscals al sector turístic."}},
  psib:{id:"psib",name:"PSIB–PSOE",fullName:"Partido Socialista de les Illes Balears",color:"#c0392b",bg:"#fde8e6",ideology:"Centre-esquerra · Socialdemocràcia",leader:"Francina Armengol",founded:1976,seats:18,status:"OPOSICIÓ 2023–",
    desc:"Principal força d'oposició. Va governar de 2015 a 2023 (dos mandats). Creadora de l'ecotasa (2016) i la Llei del Clima (2019). Armengol ara presidenta del Congrés. Mira a recuperar el Govern al 2027.",
    positions:{turisme:"Moratòria de places, ecotasa alta durant tot l'any per finançar habitatge públic, limitació de creuers. Creadora de l'ITS el 2016. A l'oposició, exigeix incrementar la taxa i crear un impost als cotxes de lloguer no matriculats a les Illes.",habitatge:"Habitatge públic directe finançat per l'ITS. Regulació dels preus del lloguer. El lloguer vacacional és part del problema, no de la solució. 'No em resignaré que cap ciutadà visqui en una caravana'.",llengua:"Immersió en català com a política pública activa i necessària. Protecció del català com a llengua pròpia del territori. Critica la 'castellanització' imposada pel pacte PP–Vox.",mediAmbient:"Pionera: Llei del Clima (2019), parcs naturals, moratòria turística, Llei de Residus i Plàstics. Defensora del Pacte Verd Europeu. Reivindica ser el partit que 'més ha protegit el territori'.",immigracio:"Integració i solidaritat territorial. Defensa del repartiment de MENA entre CCAA. Baleares com a 'societat acollidora amb gent de 177 països'.",serveis:"Sanitat i educació públiques com a eixos. Manteniment del requisit de català per a funcionaris. Contra la privatització de serveis. Defensa de la RESOGA.",fiscalitat:"Impostos per finançar serveis públics i habitatge. ITS alta durant tot l'any. Progressivitat fiscal. Nou impost als vehicles de lloguer no matriculats a les Illes."}},
  mes:{id:"mes",name:"Més per Mallorca",fullName:"Més per Mallorca",color:"#2e7d32",bg:"#e8f5e9",ideology:"Esquerra · Ecosobiranisme · Nacionalisme balear",leader:"Lluís Apesteguia",founded:2015,seats:4,status:"OPOSICIÓ 2023–",
    desc:"Força ecosobiranista que va participar als dos governs Armengol. 954 propostes al programa 2023. Defensa el decreixement turístic, la sobirania balear, la protecció màxima del català i la limitació de compra d'habitatge a no residents.",
    positions:{turisme:"Decreixement turístic actiu: eliminar places de la borsa turística existent. ITS proporcional al preu de l'estada (no fix). Eliminar la promoció turística pública. Model econòmic alternatiu al turisme de masses.",habitatge:"Pressió a l'Estat i la UE per limitar la compra d'habitatge a no residents. Topall de preus del lloguer. Impostos progressius en compravenda. 'No volem cases sense gent, ni gent sense casa.'",llengua:"Màxima protecció del català com a llengua nacional de Mallorca. Nou marc de relacions Illes–Estat. Eix cultural dels Països Catalans. Foment del català a l'espai digital i als negocis.",mediAmbient:"Zero creixement en sòl rústic. Eliminació de la promoció turística. Parcs naturals ampliats. Màxima alineació amb el Pacte Verd Europeu.",immigracio:"Integració plena i defensa de la solidaritat. Posicions favorables a l'acollida. Critica l'instrumentalització política de la immigració.",serveis:"Serveis públics forts. Ensenyament en català com a model únic. Reducció de la concertada. Salaris dignes als sectors turístics.",fiscalitat:"ITS molt alta proporcional al preu d'estada. Impostos progressius en compravenda d'habitatge. Concert econòmic amb l'Estat."}},
  vox:{id:"vox",name:"Vox",fullName:"Vox Baleares",color:"#5a7a00",bg:"#f0f4e0",ideology:"Extrema dreta · Nacionalisme espanyol · Populisme",leader:"Manuela Cañadas",founded:2013,seats:8,status:"SUPORT EXTERN PP",
    desc:"Tercera força al Parlament. Suport extern al govern Prohens a la investidura i soci al pacte pressupostari 2025. Ha condicionat profundament les polítiques del PP en llengua, immigració i medi ambient.",
    positions:{turisme:"Contra noves restriccions turístiques o fiscals al sector. Oposició a increments de l'ITS i nous impostos. Defensa del model econòmic turístic sense limitacions addicionals.",habitatge:"Llibertat absoluta de mercat. Nova Llei de Vivenda amb menys restriccions regulatòries. Contra qualsevol regulació de preus o intervenció pública.",llengua:"Castellà com a llengua vehicular principal a l'educació. Derogació total del Decret de Mínims de català. 'Llibertat lingüística' que en la pràctica suposa primacia del castellà. Ha eliminat subvencions a entitats de foment del català.",mediAmbient:"Oposició al Pacte Verd Europeu. Contra nous impostos ambientals. Prioritat absoluta a la competitivitat econòmica.",immigracio:"Control estricte. Contra el repartiment de MENA. Restriccions a les ajudes socials ('efecte crida'). Principal impulsor de mesures restrictives al pacte PP–Vox 2025.",serveis:"Eliminació de requisits de català en la funció pública. Places de policia obertes a militars (Llei Òmnibus). Concertada prioritaria.",fiscalitat:"Baixada generalitzada d'impostos. Contra l'ecotasa i qualsevol nou gravamen al turisme o als cotxes de lloguer."}},
  podem:{id:"podem",name:"Podemos",fullName:"Unides Podem – EUIB",color:"#7b1fa2",bg:"#f3e5f5",ideology:"Esquerra · Democràcia participativa",leader:"Antònia Jover",founded:2014,seats:1,status:"OPOSICIÓ 2023–",
    desc:"Força d'esquerra en fort declivi electoral: de 10 escons el 2015, 7 el 2019, a 1 el 2023. Va tenir la Vicepresidència i la Conselleria de Transició Energètica al segon govern Armengol (2019–2023).",
    positions:{turisme:"Contenció forta del turisme de masses. Finançament d'habitatge via ecotasa. Crítics amb el model turístic com a causa principal de la crisi d'habitatge.",habitatge:"Habitatge públic directe. Regulació de preus. Mesures antispeculatives. Expropiació temporal d'habitatge buit per a ús social.",llengua:"Protecció del català. Defensa del model d'immersió lingüística. Critica les polítiques lingüístiques del PP–Vox.",mediAmbient:"Posicions verdes fortes. Transició energètica urgent. Contra el model econòmic basat exclusivament en el turisme massiu.",immigracio:"Defensa plena dels drets dels migrants. Integració com a política prioritaria. Contra qualsevol discurs d'estigmatització.",serveis:"Màxima inversió en sanitat i educació públiques. Contra qualsevol privatització.",fiscalitat:"Impostos a la riquesa i al capital. Fiscalitat progressiva. ITS alta i per tot l'any."}},
  mxme:{id:"mxme",name:"Més per Menorca",fullName:"Més per Menorca (MxMe)",color:"#00695c",bg:"#e0f2f1",ideology:"Centre-esquerra · Regionalisme menorquí · Ecosobiranisme",leader:"Josep Castells",founded:2017,seats:2,status:"OPOSICIÓ 2023–",
    desc:"Força menorquina centrada en les especificitats de l'illa. Defensa el model de turisme sostenible adaptat a la Reserva de la Biosfera de Menorca, la llengua catalana i l'autogovern de l'illa.",
    positions:{turisme:"Model turístic sostenible adaptat a la capacitat de càrrega de la Reserva de la Biosfera. Límits durs. Ecotasa alta específica per a Menorca.",habitatge:"Habitatge públic per a residents. Limitació de compra d'habitatge per no residents. Protecció de la població autòctona.",llengua:"Protecció del català en la seva varietat menorquina. Model d'immersió lingüística.",mediAmbient:"Màxima protecció del medi ambient menorquí. Límits al creixement urbanístic. Defensa de la Reserva de la Biosfera.",immigracio:"Integració. Solidaritat. Posicions progressistes.",serveis:"Serveis públics insulars adequats a la insularitat de Menorca.",fiscalitat:"Finançament just per a Menorca. IVA reduït per a illes. Compensació per insularitat."}},
  elpi:{id:"elpi",name:"El Pi",fullName:"El Pi – Proposta per les Illes",color:"#bf5c00",bg:"#fff3e0",ideology:"Centrisme · Balearisme · Regionalisme moderat",leader:"Josep Melià",founded:2012,seats:0,status:"FORA DEL PARLAMENT DES DEL 2023",
    desc:"Força regionalista balearista sense representació al Parlament des del 2023. Centrista, defensa el català com a 'signe d'identitat ineludible' però sense imposicions. Rellevant als governs 2015–2023 com a suport extern.",
    positions:{turisme:"Model turístic sostenible de qualitat basat en els interessos del territori. Posicions pragmàtiques entre la contenció i la competitivitat.",habitatge:"Solucions equilibrades. Defensa els interessos dels propietaris locals. Moderació en les eines regulatòries.",llengua:"Català com a 'signe d'identitat ineludible' però sense imposicions. Posicions de centre entre immersió i castellanització.",mediAmbient:"Protecció del territori balear. Posicions moderades. Crítiques als nous impostos ambientals.",immigracio:"Posicions moderades. Integració amb control. Pragmatisme.",serveis:"Serveis públics eficients. Pragmatisme sobre requisits lingüístics. Descentralització cap als consells insulars.",fiscalitat:"Fiscalitat justa per a les Illes. Crític amb nous impostos. Compensació per insularitat."}},
  saunio:{id:"saunio",name:"Sa Unió",fullName:"Sa Unió de Formentera",color:"#4527a0",bg:"#ede7f6",ideology:"Particularisme · Regionalisme de Formentera",leader:"Neus Roig",founded:2011,seats:1,status:"SUPORT EXTERN PP",
    desc:"Única representant de Formentera al Parlament. Dóna suport extern al govern Prohens. Centrada en els interessos específics de l'illa i la seva gestió turística i mediambiental extrema.",
    positions:{turisme:"Gestió turística adaptada a la fragilitat extrema de Formentera. Límits de capacitat molt estrictes.",habitatge:"Protecció absoluta dels residents de Formentera. Habitatge assequible per a la població local.",llengua:"Català com a llengua pròpia. Posicions moderades centrades en els interessos de l'illa.",mediAmbient:"Màxima protecció de l'ecosistema de Formentera (platges, posidònia). Límit de vehicles motoritzats.",immigracio:"Posicions pragmàtiques i moderades.",serveis:"Serveis públics adequats a la insularitat extrema de Formentera.",fiscalitat:"Compensació per insularitat. IVA reduït per a illes petites."}}
};

const ELECTIONS={
  2015:{date:"24 de maig de 2015",winner:"PSIB–PSOE — I Govern Armengol",coalition:"PSIB + Més per Mallorca + Més per Menorca. Suport parlamentari: Podemos + Gent per Formentera + El Pi (34/59)",
    results:[{id:"pp",name:"PP",pct:"28.5%",seats:20,color:"#003087"},{id:"psib",name:"PSIB",pct:"20.8%",seats:14,color:"#c0392b"},{id:"podem",name:"Podemos",pct:"14.9%",seats:10,color:"#7b1fa2"},{id:"mes",name:"Més",pct:"9.4%",seats:6,color:"#2e7d32"},{id:"elpi",name:"El Pi",pct:"6.3%",seats:3,color:"#bf5c00"},{id:"mxme",name:"MxMe",pct:"4.8%",seats:3,color:"#00695c"}],
    programs:{
      psib:{governed:true,compliance:73,color:"#c0392b",bg:"#fde8e6",summary:"Recuperació de drets socials retallats pel PP Bauzà. Creació de l'ecotasa (ITS). Protecció del català. Habitatge públic. Parcs naturals i plans territorials. Moratòria de places turístiques.",promises:["Creació de l'Impost de Turisme Sostenible (ITS/ecotasa)","Reversió de les retallades sanitàries i educatives del govern Bauzà","Nova Llei de Turisme amb foment del turisme responsable","Plans Territorials Insulars: desclassificació de sòl urbanitzable","Moratòria de places turístiques","Protecció i foment del català en tots els àmbits","Habitatge públic: triplicar el parc d'habitatge social"],link:null,compliance:"✅ Va crear l'ITS el 2016 — primer impost turístic de l'Estat.\n✅ Va revertir retallades sanitàries i educatives.\n✅ Va aprovar plans territorials insulars amb desclassificació de sòl.\n✅ Va implantar la moratòria de places turístiques (2017).\n✅ Va mantenir el model d'immersió lingüística en català.\n❌ No va triplicar el parc d'habitatge públic com prometia.\n⚠️ L'ITS va recaptar 480 M€ però va executar menys del 15% dels projectes."},
      pp:{governed:false,compliance:null,color:"#003087",bg:"#dce8ff",summary:"Gestió econòmica responsable, competitivitat turística, reducció d'impostos, revisió del model de llengua a les escoles. Continuació de les polítiques del govern Bauzà en matèria lingüística.",promises:["Reducció d'impostos, especialment l'IRPF autonòmic","Competitivitat del sector turístic sense noves càrregues fiscals","Revisió del model d'immersió lingüística (lliure elecció)","Menys burocràcia i simplificació administrativa"],link:null,compliance:null},
      podem:{governed:false,compliance:null,color:"#7b1fa2",bg:"#f3e5f5",summary:"Drets socials, habitatge com a dret fonamental, reducció de desigualtats, serveis públics universals, democràcia participativa, referèndum per a les Illes.",promises:["Habitatge com a dret: expropiació d'habitatge buit","Reducció de les desigualtats socials","Serveis públics universals i gratuïts","Democràcia participativa: consultes populars","Referèndum sobre l'estatus de les Illes Balears"],link:null,compliance:null},
      mes:{governed:false,compliance:null,color:"#2e7d32",bg:"#e8f5e9",summary:"Sobirania de Mallorca i dels Països Catalans. Decreixement turístic actiu. Màxima protecció del català. Habitatge per a residents. Concert econòmic amb l'Estat.",promises:["Decreixement turístic: moratòria i reducció de places","Sobirania de Mallorca i marc dels Països Catalans","Màxima protecció del català en tots els àmbits","Limitació de la compra d'habitatge a no residents","Concert econòmic amb l'Estat"],link:"https://www.mespermallorca.cat/programa/",compliance:null},
      elpi:{governed:false,compliance:null,color:"#bf5c00",bg:"#fff3e0",summary:"Balearisme centrista. Autonomia real per a les Illes. Català com a identitat sense imposicions. Gestió responsable. Descentralització cap als consells insulars.",promises:["Descentralització real cap als consells insulars","Català com a llengua d'identitat (no d'imposició)","Fiscalitat justa per a les Illes: compensació per insularitat","Gestió turística sostenible sense noves càrregues fiscals"],link:null,compliance:null}
    }
  },
  2019:{date:"26 de maig de 2019",winner:"PSIB–PSOE — II Govern Armengol",coalition:"PSIB + Unidas Podemos + Més per Mallorca. Pacte signat al Castell de Bellver.",
    results:[{id:"psib",name:"PSIB",pct:"27.0%",seats:19,color:"#c0392b"},{id:"pp",name:"PP",pct:"25.0%",seats:17,color:"#003087"},{id:"podem",name:"Podemos",pct:"9.8%",seats:7,color:"#7b1fa2"},{id:"mes",name:"Més",pct:"9.2%",seats:5,color:"#2e7d32"},{id:"vox",name:"Vox",pct:"5.7%",seats:3,color:"#5a7a00"},{id:"elpi",name:"El Pi",pct:"5.6%",seats:3,color:"#bf5c00"},{id:"mxme",name:"MxMe",pct:"3.3%",seats:2,color:"#00695c"}],
    programs:{
      psib:{governed:true,compliance:62,color:"#c0392b",bg:"#fde8e6",summary:"Llei del Canvi Climàtic. Habitatge assequible. Qualitat educativa. Aprofundiment en l'ecotasa. Serveis socials reforçats. Resposta a la pandèmia COVID-19.",promises:["Llei del Canvi Climàtic i Transició Energètica: zero fòssils el 2050","Habitatge assequible: noves promocions públiques","Qualitat de l'ensenyament i reducció del fracàs escolar","Ampliar la recaptació i la inversió de l'ITS","Reforç dels serveis socials i la RESOGA","Contenció del model turístic amb nous instruments"],link:null,compliance:"✅ Va aprovar la Llei del Canvi Climàtic i Transició Energètica (2019): la més avançada de l'Estat.\n✅ Va aprovar la Llei de Residus i Plàstics (2021).\n✅ Va gestionar la pandèmia COVID-19 (2020–21), incloent el tancament de fronteres.\n✅ Va aprovar la Llei de Benestar Generacional (2023).\n❌ La pandèmia va impedir complir moltes promeses d'habitatge.\n❌ Va recaptar 700 M€ amb l'ITS però va executar menys del 15% dels projectes.\n⚠️ No va assolir la reducció de preus de l'habitatge prometida."},
      pp:{governed:false,compliance:null,color:"#003087",bg:"#dce8ff",summary:"Reducció d'impostos, competitivitat econòmica, revisió de polítiques lingüístiques, menys burocràcia. Oposició a la gestió de la pandèmia.",promises:["Reducció d'impostos (IRPF, successions)","Revisió del model lingüístic: lliure elecció","Eliminació de l'ecotasa o reducció significativa","Menys burocràcia i simplificació de llicències"],link:null,compliance:null},
      podem:{governed:true,compliance:58,color:"#7b1fa2",bg:"#f3e5f5",summary:"Transició ecosocial. Habitatge com a dret. Salaris dignes. Serveis públics universals. Vicepresidència per a Juan Pedro Yllanes. Conselleria de Transició Energètica.",promises:["Vicepresidència del Govern","Conselleria de Transició Energètica","Habitatge com a dret: nous parcs públics","Salaris mínims dignes als sectors turístics","Transició energètica: cap a les renovables"],link:null,compliance:"✅ Va tenir la Vicepresidència (Juan Pedro Yllanes).\n✅ Va co-impulsar la Llei del Canvi Climàtic.\n✅ Va impulsar les polítiques de residus i plàstics.\n⚠️ Declivi electoral progressiu fins a un sol escó el 2023.\n❌ No va assolir la reducció de desigualtats prometida.\n❌ Les polítiques d'habitatge van tenir impacte limitat."},
      mes:{governed:true,compliance:52,color:"#2e7d32",bg:"#e8f5e9",summary:"Decreixement turístic. Concert econòmic. Sobirania lingüística. Habitatge per a residents. Turisme de qualitat. Va tenir la Conselleria de Turisme.",promises:["Conselleria de Turisme: impulsar el decreixement","Moratòria de places i limitació de creuers","Concert econòmic amb l'Estat","Habitatge per a residents: limitació a no residents","Sobirania cultural: foment del català"],link:"https://www.mespermallorca.cat/programa/",compliance:"✅ Va tenir la Conselleria de Turisme (Bel Busquets → Iago Negueruela).\n✅ Va impulsar la moratòria de places i la limitació de creuers.\n✅ Va mantenir l'ITS i va impulsar la seva ampliació.\n❌ El decreixement turístic real no es va produir: rècords el 2022–23.\n⚠️ Les mesures d'habitatge per a residents van tenir impacte molt limitat."},
      vox:{governed:false,compliance:null,color:"#5a7a00",bg:"#f0f4e0",summary:"Primera entrada significativa de Vox a les Illes. Castellà llengua vehicular. Anti-immigració. Reducció d'impostos. Derogar normativa LGTBI. Centralisme.",promises:["Castellà llengua vehicular a l'educació","Control estricte de la immigració","Reducció d'impostos","Derogació de la normativa LGTBI","Centralisme: reducció de l'autogovern"],link:null,compliance:null},
      elpi:{governed:false,compliance:null,color:"#bf5c00",bg:"#fff3e0",summary:"Balearisme, descentralització cap als consells insulars, fiscalitat justa per a les Illes, pragmatisme centrista. Va perdre força electoral respecte al 2015.",promises:["Descentralització cap als consells insulars","Fiscalitat justa i compensació per insularitat","Model turístic sostenible però sense noves càrregues fiscals","Català com a identitat sense imposicions"],link:null,compliance:null}
    }
  },
  2023:{date:"28 de maig de 2023",winner:"PP — Govern Prohens",coalition:"PP en minoria (25/59). Investidura: abstenció de Vox (8) i Sa Unió (1). Pressupostos 2025: pacte estructural PP–Vox.",
    results:[{id:"pp",name:"PP",pct:"34.7%",seats:25,color:"#003087"},{id:"psib",name:"PSIB",pct:"26.0%",seats:18,color:"#c0392b"},{id:"vox",name:"Vox",pct:"13.4%",seats:8,color:"#5a7a00"},{id:"mes",name:"Més",pct:"8.3%",seats:4,color:"#2e7d32"},{id:"mxme",name:"MxMe",pct:"3.8%",seats:2,color:"#00695c"},{id:"podem",name:"Podem",pct:"2.9%",seats:1,color:"#7b1fa2"},{id:"saunio",name:"Sa Unió",pct:"0.8%",seats:1,color:"#4527a0"}],
    programs:{
      pp:{governed:true,compliance:58,color:"#003087",bg:"#dce8ff",summary:"Llibertat lingüística (elecció familiar), habitatge via mercat, turisme sostenible sense noves restriccions dures, reducció fiscal, simplificació administrativa.",promises:["Pla pilot de lliure elecció lingüística a les escoles","Programa 'Lloguer Segur': incentius a propietaris privats","Contenció turística selectiva sense limitar el volum global","Reducció de l'IRPF autonòmic","Simplificació administrativa i de llicències","Ecotasa amb caràcter 'finalista' per al sector"],link:null,compliance:"✅ Ha implementat el pla pilot de lliure elecció lingüística (curs 2024–25).\n✅ Ha creat el programa 'Lloguer Segur' amb 100+ contractes inicials.\n✅ Decret de Contenció Turística (2025): prohibició noves places en plurifamiliars.\n✅ L'ITS ha pujat en temporada alta.\n✅ Llei de Simplificació Administrativa aprovada (Llei 7/2024).\n⚠️ El pacte PP–Vox ha anat més lluny del programa en llengua i immigració.\n❌ Vox va bloquejar la subpujada general de l'ecotasa prevista.\n❌ L'habitatge segueix sense millorar estructuralment."},
      psib:{governed:false,compliance:null,color:"#c0392b",bg:"#fde8e6",summary:"Continuar l'ITS per finançar habitatge públic, protecció del català, sostenibilitat ambiental, serveis públics, unitat de l'esquerra balear de cara al 2027.",promises:["ITS destinada a finançar habitatge públic directe","Protecció activa del català en tots els àmbits","Nova moratòria de places turístiques","Reforç dels serveis públics: sanitat i educació","Regulació dels preus del lloguer","Unitat de l'esquerra: PSIB + Més + Podemos al 2027"],link:null,compliance:null},
      vox:{governed:false,compliance:null,color:"#5a7a00",bg:"#f0f4e0",summary:"Castellà vehicular obligatori, oposició a l'ITS, control immigració, derogació llei memòria democràtica, reducció fiscal radical, eliminació de requisit de català en funció pública.",promises:["Castellà com a llengua vehicular en tota l'educació","Derogació de la Llei de Memòria Democràtica balear","Control estricte de la immigració: contra el repartiment de MENA","Eliminació del requisit de català en la funció pública","Reducció radical d'impostos"],link:null,compliance:null},
      mes:{governed:false,compliance:null,color:"#2e7d32",bg:"#e8f5e9",summary:"Decreixement turístic actiu, ecotasa proporcional al preu, habitatge exclusiu per a residents, sobirania balear i de la llengua, concert econòmic. 954 propostes.",promises:["Decreixement turístic: eliminar places de la borsa existent","ITS proporcional al preu de l'estada","Limitar la compra d'habitatge a no residents (via UE)","Concert econòmic amb l'Estat","Sobirania lingüística: català com a única llengua vehicular pública"],link:"https://www.mespermallorca.cat/programa/",compliance:null},
      podem:{governed:false,compliance:null,color:"#7b1fa2",bg:"#f3e5f5",summary:"Habitatge públic directe, serveis públics universals, transició ecològica urgent, drets socials, anti-especulació. Resultats molt baixos (1 escó).",promises:["Habitatge públic directe finançat per l'ITS","Expropiació d'habitatge buit per a ús social","Serveis públics 100% públics","Transició energètica urgent","Drets socials: ampliació de la RESOGA"],link:null,compliance:null},
      mxme:{governed:false,compliance:null,color:"#00695c",bg:"#e0f2f1",summary:"Model Reserva de la Biosfera de Menorca com a guia, límits turístics estrictes, habitatge per a residents, llengua catalana, finançament just per a Menorca.",promises:["Model turístic adaptat a la Reserva de la Biosfera","Límits estrictes als visitants a Menorca","Habitatge públic per a residents menorquins","Protecció del català en la seva varietat menorquina","Finançament just: compensació per insularitat de Menorca"],link:null,compliance:null},
      saunio:{governed:true,compliance:48,color:"#4527a0",bg:"#ede7f6",summary:"Interessos de Formentera, límits de vehicles, habitatge per a residents, sostenibilitat extrema de l'illa. Suport extern al govern Prohens (1 escó).",promises:["Límits estrictes de vehicles motoritzats a Formentera","Habitatge assequible per als residents formenterers","Protecció màxima de l'ecosistema (posidònia, platges)","Finançament específic per a la gestió mediambiental"],link:null,compliance:"✅ Ha donat suport al govern Prohens garantint la governabilitat.\n✅ Ha defensat les especificitats de Formentera al Parlament.\n⚠️ Capacitat d'influència limitada per ser 1 diputat d'un total de 59.\n❌ Les promeses específiques de Formentera han tingut poc recorregut legislatiu."}
    }
  }
};

const GOVERNS=[
  {period:"1983-1987",name:"I Govern Cañellas",color:"#1565c0",president:"Gabriel Cañellas Fons",partyLabel:"AP / Coalició Popular",
    coalition:"Alianza Popular en majoria  -  Primera legislatura autonòmica de les Illes Balears",
    context:"El primer govern autònom balear. Cañellas fou investit el 10 de juny de 1983. Va establir les bases de l'autonomia: institucions, transferències de competències i primeres polítiques turístiques. Va governar sota les sigles d'Alianza Popular.",
    vicepresidents:["Joan Huguet Rotger (AP)  -  Vicepresident i Conseller de Presidència"],
    consellers:["Jaume Cladera Cladera  -  Economia i Hisenda","Bartomeu Sitjar Vallespir  -  Interior","Maria Antònia Munar (UM)  -  Educació i Cultura","Gori Mir Mayol  -  Ordenació del Territori","Jaume Llompart Salvà  -  Agricultura i Pesca","Gabriel Godino  -  Treball i Benestar Social","Saïd Talhaoui  -  Sanitat"],
    laws:["Desplegament de l'Estatut d'Autonomia de les Illes Balears (1983)","Primeres transferències de competències de l'Estat a la CAIB","Creació de les conselleries i de l'estructura administrativa autonòmica","Llei de Normalització Lingüística (1986): primer marc legal del català a les Illes","Pla d'Ordenació de l'Oferta Turística (POOT, primers esbossos)"],
    milestones:["Primer president del Govern de les Illes Balears (10 de juny de 1983)","Construcció de tota l'arquitectura institucional de l'autonomia balear de zero","Inici del gran boom turístic de Mallorca: superació dels 8 milions de turistes/any","AP guanya amb 21/54 escons i va ampliant suports en cada elecció"]},

  {period:"1987-1991",name:"II Govern Cañellas",color:"#1565c0",president:"Gabriel Cañellas Fons",partyLabel:"AP → Partido Popular (1989)",
    coalition:"AP / PP en majoria  -  Refundació nacional com a PP al congrés d'Aznar de 1989",
    context:"Segon mandat de Cañellas marcat per la refundació d'AP com a PP el 1989. El boom turístic transforma l'arxipèlag: construcció massiva, pressió sobre el territori i primeres tensions ambientals. Baleares supera els 10 milions de turistes.",
    vicepresidents:["Joan Huguet Rotger (PP)  -  Vicepresident i Conseller de Presidència"],
    consellers:["Jaume Cladera Cladera  -  Economia i Hisenda","Bartomeu Sitjar Vallespir  -  Interior","Damià Ferrà-Ponç  -  Educació i Cultura","Jeroni Saiz Gomila  -  Obres Públiques i Urbanisme","Pere J. Morey Servera  -  Agricultura i Pesca","Gabriel Oliver Capó  -  Sanitat","Jaume Llompart Salvà  -  Comerç i Indústria","Catalina Cirer Adrover  -  Benestar Social"],
    laws:["Pla d'Ordenació de l'Oferta Turística (POOT 1987): primers límits de capacitat turística per zones","Llei de Caça de les Illes Balears (1990)","Inici d'infraestructures majors: autopista de Llevant, ampliació aeroport Son Sant Joan"],
    milestones:["Baleares supera els 10 milions de turistes per primera vegada (1989)","Refundació d'AP com a PP sota Aznar: Cañellas segueix liderant el partit a les Illes","Inici de tensions internes PP: facció cañellista vs. sector pro-normalització lingüística (Soler)","El boom de la construcció transforma irreversiblement el litoral mallorquí"]},

  {period:"1991-1995",name:"III Govern Cañellas",color:"#1565c0",president:"Gabriel Cañellas Fons",partyLabel:"Partido Popular",
    coalition:"PP en majoria absoluta  -  Quarta victòria consecutiva de la dreta a Baleares",
    context:"Tercer mandat de Cañellas, el darrer. Governa amb majoria però les tensions internes del PP pugen. El 1991 aprova la pionera Llei d'Espais Naturals (LEN), que protegeix el 40% del territori. El 1995 el 'cas Túnel de Sóller' per presumpta prevaricació obliga Cañellas a dimitir.",
    vicepresidents:["Rosa Estaràs Ferragut (PP)  -  Vicepresidenta i Consellera de Presidència (1991-1995)"],
    consellers:["Rosa Estaràs Ferragut  -  Presidència i Funció Pública","Cristòfol Triay Llopis  -  Economia i Hisenda","Joan Flaquer Riutort  -  Interior","Bartomeu Rotger Amengual  -  Educació i Cultura","Jeroni Saiz Gomila  -  Obres Públiques","Pere J. Morey Servera  -  Agricultura i Pesca","Gabriel Oliver Capó  -  Sanitat","Caterina Ensenyat Ensenyat  -  Benestar Social"],
    laws:["1991 - Llei d'Espais Naturals (LEN): protecció del 40% del territori balear  -  Pionera a Espanya","Pla Director de Sanejament d'Aigües Residuals","Llei de Reserves Naturals Marines de les Illes Balears","Ampliació de l'aeroport de Menorca i noves infraestructures"],
    milestones:["La LEN (1991) és la gran fita ambiental de l'etapa Cañellas  -  Protecció pionera a Espanya","Cas Túnel de Sóller (1995): Cañellas imputat per prevaricació en l'adjudicació de les obres","Dimissió de Cañellas el 30 de juny de 1995 (12 anys, 1 mes i 22 dies en el càrrec: el president de més durada)","El succeeix Cristòfol Soler, el primer president catalanista del PP balear"]},

  {period:"1995-1996",name:"Govern Soler",color:"#37474f",president:"Cristòfol Soler i Cladera",partyLabel:"Partido Popular",
    coalition:"PP  -  Govern de transició  -  Soler succeeix Cañellas per dimissió d'aquest",
    context:"Soler, advocat d'Inca i defensor de la normalització lingüística del català, succeeix Cañellas. El seu govern és el més breu de la democràcia balear: tan sols 10 mesos i 17 dies. La facció cañellista, que controlava l'estructura del PP, el va forçar a dimitir al maig de 1996 per les seves posicions pro-catalanes i autonomistes. Anys després s'implicaria en el moviment independentista balear.",
    vicepresidents:["Rosa Estaràs Ferragut (PP)  -  Vicepresidenta"],
    consellers:["Rosa Estaràs Ferragut  -  Presidència i Funció Pública","Carles Manera Erbina  -  Economia i Hisenda","Joan Flaquer Riutort  -  Interior","Bartomeu Rotger Amengual  -  Educació i Cultura","Jeroni Saiz Gomila  -  Obres Públiques","Pere J. Morey  -  Agricultura","Gabriel Oliver Capó  -  Sanitat"],
    laws:["Govern de transició de curta durada: no aprova grans reformes","Intents de normalització lingüística avortats per la pressió interna del PP cañellista"],
    milestones:["Govern més breu de la democràcia balear: 10 mesos i 17 dies (juliol 1995 - juny 1996)","'Cop de Cañellas': la facció ex-president forçà Soler a dimitir per posicions pro-catalanes","Soler va abandonar el PP el 2014 i es convertiria en activista independentista","El seu cas és considerat el primer 'conflicte lingüístic' intern del PP balear"]},

  {period:"1996-1999",name:"I Govern Matas",color:"#1565c0",president:"Jaume Matas i Palou",partyLabel:"Partido Popular",
    coalition:"PP amb suport d'Unió Mallorquina (UM) de Maria Antònia Munar",
    context:"Matas governa amb suport d'UM. Representa la consolidació del model turístic de masses sense restriccions. El 1999 perd les eleccions davant el Pacte de Progrés d'Antich, la primera alternança política de la democràcia balear. Matas passaria a ser ministre d'Aznar (Medi Ambient, 1999-2003).",
    vicepresidents:["Pere Palau Montanyà (PP)  -  Vicepresident i Conseller de Presidència"],
    consellers:["Pere Palau Montanyà  -  Presidència","Josep Oliver Araujo  -  Economia i Hisenda","Joan Flaquer Riutort  -  Interior","Damià Pons → Bartomeu Rotger  -  Educació i Cultura","Jeroni Saiz Gomila  -  Foment","Pere J. Morey  -  Medi Ambient","Gabriel Oliver Capó  -  Sanitat","Aina Aguiló Bonnín (UM)  -  Turisme","Joana Barceló Martí  -  Benestar Social"],
    laws:["Llei 2/1999 d'Ordenació Turística: base de la regulació de l'oferta turística","POOT revisat: noves restriccions zonals d'oferta turística","Via de Cintura de Palma: noves infraestructures viàries","Primer pla de gestió d'aigües residuals"],
    milestones:["Primera vegada que el PP governa Baleares sense majoria absoluta (amb suport d'UM)","Creixement turístic sense aturall: Baleares supera els 14 milions de turistes/any","El 1999 Matas perd davant Antich i el Pacte de Progrés: primera alternança de la democràcia balear","Matas seria nomenat ministre de Medi Ambient del govern Aznar (1999-2003)"]},

  {period:"1999-2003",name:"I Govern Antich - I Pacte de Progrés",color:"#b71c1c",president:"Francesc Antich Oliver",partyLabel:"PSIB-PSOE",
    coalition:"PSIB-PSOE + PSM + Esquerra Unida + Els Verds + Unió Mallorquina (UM)  -  I Pacte de Progrés",
    context:"Primera alternança de la democràcia balear: primer govern d'esquerres de les Illes. Antich, alcalde d'Algaida, lidera una coalició de cinc partits. La seva gran fita és la primera ecotaxa turística de l'Estat (2002). Crea IB3 (televisió pública balear) i impulsa polítiques de normalització lingüística. El PP de Matas guanya el 2003 i deroga immediatament l'ecotaxa.",
    vicepresidents:["Pere Sampol Mas (PSM)  -  Vicepresident i Conseller d'Innovació i Energia"],
    consellers:["Pere Sampol Mas (PSM)  -  Vicepresidència, Innovació i Energia","Eugènia Carandell Muns (PSIB)  -  Presidència","Valentí Valenciano Oró (PSIB)  -  Economia i Hisenda","Martí Mora Xamena (PSM)  -  Medi Ambient","Damià Pons Pons (PSM)  -  Educació i Cultura","Jaume Obrador Soler (EU)  -  Salut i Consum","Patricia Guijarro (Els Verds)  -  Agricultura","Celestino Alomar Garau (PSIB)  -  Interior","Joana Maria Barceló Martí (PSIB)  -  Foment i Obres Públiques","Joan Manera Rovira (PSIB)  -  Turisme"],
    laws:["2002 - Ecotaxa turística (1€/nit): primer impost turístic de l'Estat Espanyol  -  Derogada per Matas el 2003","2000 - Llei dels Consells Insulars: descentralització cap a les institucions insulars","2001 - Pla Territorial de Mallorca: límits a l'urbanisme i protecció del territori","Creació d'IB3 (televisió i ràdio pública balear)","Creació de Som Ràdio  -  Integració a l'Institut Ramon Llull","Llei de Normalització Lingüística: noves mesures de foment del català"],
    milestones:["Primera presidència d'esquerres de Baleares: ruptura de 16 anys ininterromputs de PP","Primera ecotaxa turística de l'Estat (2002): precursora directa de l'actual ITS d'Armengol","Creació d'IB3: primera televisió pública de les Illes Balears","Antich perd el 2003 davant Matas, que deroga immediatament l'ecotaxa com a primera mesura de govern"]},

  {period:"2003-2007",name:"II Govern Matas",color:"#1565c0",president:"Jaume Matas i Palou",partyLabel:"Partido Popular",
    coalition:"PP + Unió Mallorquina (UM) de Maria Antònia Munar",
    context:"Matas torna al Govern balear després d'haver estat ministre d'Aznar. Primera mesura: derogació de l'ecotaxa d'Antich. Governa amb UM. El seu govern acabarà empantanat per múltiples casos de corrupció (Cas Palma Arena, Operació Voltor) que el portaran a la presó anys després.",
    vicepresidents:["Maria Salom Fiol (PP)  -  Vicepresidenta i Consellera de Presidència"],
    consellers:["Maria Salom Fiol (PP)  -  Presidència i Esports","Biel Vicens Siquier (PP)  -  Economia i Hisenda","Joan Flaquer Riutort (PP)  -  Interior","Francesca Riera Jaume (UM)  -  Educació i Cultura","Mabel Cabrer Barbón (PP)  -  Medi Ambient","Miquel Àngel Grimalt Font (PP)  -  Agricultura i Pesca","Aina Castillo Morales (PP)  -  Salut i Consum","Jaume Carbonero Gamundí (UM)  -  Turisme","Catalina Cirer Adrover (PP)  -  Foment i Obres Públiques"],
    laws:["2003 - Derogació de l'ecotaxa d'Antich: primera mesura del nou govern","Palma Arena (velòdrom): gran obra pública que derivaria en un escàndal de corrupció milionari","Pla d'Infraestructures de Transports (2006)","Llei 8/2005 de Protecció Civil i Emergències"],
    milestones:["Primera mesura: derogació immediata de l'ecotaxa d'Antich","Cas Palma Arena: sobrecoste milionari en les obres del velòdrom (escàndol de corrupció)","Operació Voltor: investigació per corrupció que implicaria Matas i altres alts càrrecs","Matas abandonaria el seu escó el 2011 i seria condemnat a presó  -  Cas Palma Arena: 9 mesos de presó","UM de Munar col - lapsaria posteriorment pel Cas Maquillatge"]},

  {period:"2007-2011",name:"II Govern Antich - II Pacte de Progrés",color:"#b71c1c",president:"Francesc Antich Oliver",partyLabel:"PSIB-PSOE",
    coalition:"PSIB-PSOE + Bloc per Mallorca + UM (Munar, que abandona el PP) + Eivissa pel Canvi + PSM-Verds",
    context:"Antich torna al poder gràcies a l'erosió del govern Matas pels escàndols de corrupció. Incorpora UM de Munar (que deixa el PP). Governarà en plena crisi econòmica de 2008-2011: atur disparant-se, retallades forçades. El 2011 el PP de Bauzá guanya amb majoria absoluta.",
    vicepresidents:["Pere Sampol Mas (Bloc)  -  Vicepresident i Conseller d'Economia (2007-2008)","Biel Camps (UM)  -  Vicepresident i Conseller de Turisme (2008-2011)"],
    consellers:["Francesca Lluís Gamundí (PSIB)  -  Presidència","Pere Sampol Mas (Bloc)  -  Economia i Hisenda","Joana Maria Barceló Martí (PSIB)  -  Foment i Obres Públiques","Biel Camps (UM)  -  Turisme i Treball","Francesc Fiol Amengual (Bloc)  -  Educació i Cultura","Miquel Àngel March Cerdà (PSIB)  -  Medi Ambient","Vicenç Thomas Mulet (PSIB)  -  Interior","Miquel Reynés Bujosa (PSIB)  -  Agricultura","Juana Lorente García (PSM)  -  Benestar Social","Antoni Almeida Moll (PSIB)  -  Salut"],
    laws:["Llei de Mobilitat (2008): foment del transport públic i reducció del vehicle privat","Pla Territorial de Mallorca: nova regulació (2007-08)","Llei de Règim Jurídic de les Illes Balears revisada","Consolidació del model d'immersió lingüística en català a les escoles","Mesures de contenció turística i medi ambiental en context de crisi"],
    milestones:["UM de Munar canvia de bàndol i s'incorpora al govern progressista: trencament definitiu amb el PP","Crisi econòmica 2008: caiguda del turisme i de la construcció  -  Atur disparant-se a les Illes","El Cas Maquillatge destrossa UM: Munar condemnada per corrupció el 2010-11","El PP de Bauzá guanya el 2011 amb majoria absoluta (35/59): victòria aclaparadora de la dreta"]},

  {period:"2011-2015",name:"Govern Bauzá",color:"#0d47a1",president:"José Ramón Bauzá Díaz",partyLabel:"Partido Popular",
    coalition:"PP en majoria absoluta (35/59 escons)  -  La majoria més àmplia del PP a Baleares des de Cañellas",
    context:"Bauzá governa amb majoria absoluta aplicant les retallades més dures en ple auge de l'austeritat europea. La gran polèmica és el Decret de Trilingüisme (TIL, 2012): vol reduir el català a l'educació. Les protestes (camisetes verdes) serien les més grans de la historia balear. El TIL és suspès cautelarment pel TSJIB. El PP perd el 2015 davant Armengol.",
    vicepresidents:["María José Isern Riera (PP)  -  Vicepresidenta i Consellera de Presidència"],
    consellers:["María José Isern Riera (PP)  -  Vicepresidència, Presidència i Esports","Gaspar Oliver Mut (PP)  -  Economia i Hisenda","Miquel Nadal Buades (PP)  -  Educació, Cultura i Universitats","Biel Company Bauzà (PP)  -  Agricultura, Medi Ambient i Territori","Martí Sansaloni Vicens (PP)  -  Salut i Consum","Joana Barceló Martí (PP)  -  Serveis Socials","Jaume Font Barceló (PP)  -  Foment i Obres Públiques","Joana Camps Bosch (PP)  -  Turisme","Antoni Camps Portells (PP)  -  Interior","Javier De Juan Rodríguez (PP)  -  Treball, Comerç i Indústria"],
    laws:["2012 - Decret de Trilingüisme (TIL): redueix el català i introdueix anglès vehicular  -  Suspès cautelarment pel TSJIB el 2013","2012 - Decrets d'austeritat: reducció de sous de funcionaris (-5%), tancament de serveis","2013 - Llei de Turisme: primera regulació dels pisos turístics (ETV)","2014 - Pressupostos amb les majors retallades de la historia autonòmica"],
    milestones:["PP guanya amb 35/59 escons: la majoria absoluta més àmplia des de Cañellas","Decret TIL (2012): les protestes de les camisetes verdes porten 100.000 persones al carrer a Palma  -  La protesta educativa i lingüística més gran de la historia balear","El TSJIB suspèn cautelarment el TIL el 2013 per inconstitucionalitat  -  Gran victòria per als defensors del català","Bauzá no es presenta a la reelecció el 2015  -  El PP perd davant Armengol i el Pacte de Progrés"]},

  {period:"2015-2019",name:"I Govern Armengol",color:"#c0392b",president:"Francina Armengol",partyLabel:"PSIB-PSOE",
    coalition:"PSIB + Més per Mallorca + Més per Menorca  -  Suport parlamentari: Podemos, Gent per Formentera, El Pi",
    context:"Primera presidenta dona del Govern de les Illes Balears. Armengol trenca 8 anys de govern Bauzá-PP. La seva gran fita és la creació de l'Impost de Turisme Sostenible (ITS/ecotasa) el 2016, la primera ecotaxa turística de l'Estat des de la derogada d'Antich (2003).",
    vicepresidents:["Biel Barceló (Més per Mallorca)  -  Vicepresident, Conseller de Turisme i Esports (2015-2017)","Bel Busquets (Més per Mallorca)  -  Vicepresidenta, Conselleria de Territori (2017-2019)"],
    consellers:["Catalina Cladera Crespí (PSIB)  -  Hisenda i Administracions Públiques","Martí March Cerdà (PSIB, ind.)  -  Educació i Universitats","Fina Santiago Rodríguez (Més)  -  Serveis Socials i Cooperació","Patricia Gómez Picard (PSIB)  -  Salut","Iago Negueruela Vázquez (PSIB)  -  Treball, Comerç i Indústria","Vicenç Vidal Matas (Més)  -  Medi Ambient, Agricultura i Pesca","Marc Pons Pons (PSIB)  -  Territori, Energia i Mobilitat","Pilar Costa Serra (PSIB)  -  Presidència"],
    laws:["2016 - Impost de Turisme Sostenible (ITS/Ecotasa): primer impost turístic de l'Estat Espanyol, €1-4 per pernoctació","2016 - Nova Llei de Turisme: foment del turisme responsable, limitació del tot inclòs","2017 - Moratòria de places turístiques: congelació de noves places hoteleres i apartaments","2018 - Plans Territorials Insulars: desclassificació de sòl urbanitzable, protecció del territori","Reversió retallades sanitàries i educatives del govern Bauzà","Limitació dels creuers als ports de Palma: primers límits de sostenibilitat"],
    milestones:["Primera presidenta dona de les Illes Balears (i de qualsevol govern autonòmic del Mediterrani)","Primera vegada que el PP passa a ser segona força a Baleares des de la transició","Primera coalició progressista a les Illes (PSIB + Més + MpM)","Rècords turístics: Baleares supera els 16 milions de turistes per primera vegada"]},

  {period:"2019-2023",name:"II Govern Armengol",color:"#c0392b",president:"Francina Armengol",partyLabel:"PSIB-PSOE",
    coalition:"PSIB + Unidas Podemos (Podem) + Més per Mallorca  -  Pacte de 200 compromisos signat al Castell de Bellver",
    context:"Armengol repeteix davant la primera entrada de Vox al Parlament. El govern inclou Unidas Podemos amb la vicepresidència per a J.P. Yllanes. El mandat és marcat per la pandèmia COVID-19 (2020-21). La gran fita legislativa és la Llei del Canvi Climàtic, la primera d'una CCAA espanyola.",
    vicepresidents:["Juan Pedro Yllanes Suárez (Unidas Podem, ind.)  -  Vicepresident, Conseller de Transició Energètica (2019-2023)"],
    consellers:["Juan Pedro Yllanes Suárez (Podem, ind.)  -  Transició Energètica i Sectors Productius","Pilar Costa Serra (PSIB)  -  Presidència, Cultura i Igualtat","Rosario Sánchez Grau (PSIB)  -  Hisenda i Relacions Exteriors","Iago Negueruela Vázquez (PSIB)  -  Model Econòmic, Turisme i Treball","Fina Santiago Rodríguez (Més)  -  Afers Socials i Esports","Patricia Gómez Picard (PSIB)  -  Salut i Consum","Martí March Cerdà (PSIB, ind.)  -  Educació i Formació Professional","Mae de la Concha Torres (Podem)  -  Medi Ambient i Territori (2021-)","Catalina Cladera Crespí (PSIB)  -  Fons Europeus, Universitat i Cultura (2021-)","Marc Pons Pons (PSIB)  -  Mobilitat i Habitatge"],
    laws:["2019 - Llei de Canvi Climàtic i Transició Energètica: zero fòssils 2050, prohibició combustió 2035 (primera d'una CCAA a Espanya)","2021 - Llei de Residus i Plàstics: restriccions al plàstic d'un sol ús","2022 - Llei d'Habitatge Balear: rehabilitació, accés al lloguer, ajudes a joves","2023 - Llei de Benestar Generacional (Llei 10/2023): marc de drets socials","Gestió COVID-19 (2020-21): tancament de fronteres, ús de l'ITS per cobrir despeses"],
    milestones:["Primera vegada que l'esquerra governava dues legislatures consecutives a Baleares","Pandèmia COVID-19 (2020): Baleares, una de les CCAA més afectades (−75% turistes)","Rècords turístics post-COVID 2022-2023: pic de 1,4 milions de persones simultànies (agost 2022)","Armengol es converteix en presidenta del Congrés dels Diputats (agost 2023)","El PP de Prohens guanya el 28 de maig de 2023 i torna al govern després de 8 anys"]},

  {period:"2023-Avui",name:"Govern Prohens",color:"#003087",president:"Marga Prohens",partyLabel:"Partido Popular",
    coalition:"PP (govern en minoria, 25/59). Investidura: abstenció Vox (8) + Sa Unió (1). Pressupostos 2025: pacte estructural PP-Vox",
    context:"Primera presidenta del PP a les Illes Balears. Prohens governa en minoria i necessita el suport o l'abstenció de Vox. El pacte PP-Vox del 2025 (pressuposts) marca un gir a la dreta en polítiques de llengua, immigració i serveis socials. La contenció turística selectiva és la seva gran aposta econòmica.",
    vicepresidents:["Antoni Costa Costa (PP)  -  Vicepresident, Conseller d'Economia, Hisenda i Innovació, i Portaveu del Govern"],
    consellers:["Antoni Costa Costa (PP)  -  Vicepresidència, Economia, Hisenda i Innovació (Portaveu)","Antònia Maria Estarellas Torrens (PP)  -  Presidència i Administracions Públiques","Antoni Vera Alemany (PP)  -  Educació i Universitats","Manuela García Romero (PP)  -  Salut","Alejandro Sáenz de San Pedro García (PP)  -  Empresa, Ocupació i Energia","Jaume Bauzà Mayol (PP)  -  Turisme, Cultura i Esports","Jose Luis Mateo Llabrés (PP)  -  Mobilitat i Habitatge","Catalina Cirer Adrover (PP)  -  Afers Socials i Famílies","Joan Simonet Pons (PP)  -  Agricultura, Pesca i Medi Natural","Adolfo González Rodríguez (PP)  -  Mar i Cicle de l'Aigua"],
    laws:["2023 - DL mesures urgents educatives i sanitàries: relajació del requisit de català en categories 'de difícil cobertura'","2024 - Decret de Turisme Responsable (DL 2/2024): prohibició consum alcohol en zones, fons als ajuntaments","2024 - Llei de Simplificació Administrativa (Llei 7/2024): agilització llicències, eliminació cèdula d'habitabilitat 1a ocupació","2025 - Decret de Contenció Turística (PP-Vox): prohibició noves places plurifamiliars, ITS en temporada alta","2025 - Pressupostos 7.469 M€ (PP-Vox): mesures llengua, immigració, derogació Llei Memòria Democràtica","2025 - Llei Òmnibus Balear (PP-Vox): restriccions RESOGA, modificació model lingüístic, places policia a militars"],
    milestones:["Primera presidenta del PP a les Illes Balears (10 de juliol de 2023)","Investida amb abstenció de Vox: primer cop que el PP governa Baleares amb suport de l'extrema dreta","Baleares, segon territori PP amb pacte estructural PP-Vox (après Comunitat Valenciana)","Mesa per la Sostenibilitat (2024): taula de diàleg amb sector econòmic i social per al model turístic","Programa 'Lloguer Segur': primers 100+ contractes per sota del preu de mercat (2025)"]}
];

const FONTS=[
  {cat:"Premsa Balear",items:["El Diario Illes Balears · eldiario.es/illes-balears","Ultima Hora · ultimahora.es","Menorca Info · menorca.info","Ara Balears · arabalears.cat","Diario de Mallorca · diariodemallorca.es","IB3 Notícies · ib3.org"]},
  {cat:"Premsa Nacional",items:["El Español · elespanol.com","Infobae España · infobae.com/espana","Públic · publico.es","Mundiario · mundiario.com","The Objective · theobjective.com","El Plural · elplural.com","El Punt Avui · elpuntavui.cat"]},
  {cat:"Fonts Institucionals",items:["Govern de les Illes Balears · caib.es","BOIB — Butlletí Oficial de les Illes Balears","Parlament de les Illes Balears · parlamentib.cat","Llei 10/2019 — Llei de Canvi Climàtic · caib.es","Enciclopèdia Catalana · enciclopedia.cat"]},
  {cat:"Verificació i Referència",items:["Newtral.es — verificació de dades polítiques","Wikipedia EN/CA — Governs Armengol I, II i Prohens","Vilaweb · vilaweb.cat","Geopolitique.eu — anàlisi electoral 2023","3Cat (324) — cobertura PP-Vox acords"]},
  {cat:"Partits Polítics (directe)",items:["Més per Mallorca — Programa 2023 · mespermallorca.cat","Vox Baleares · voxespana.es/baleares","PSIB-PSOE · psib.eu","El Pi · elpi.cat","Govern de les Illes Balears · caib.es"]},
  {cat:"Temes Específics",items:["Idealista/News — política d'habitatge balear (maig 2023)","Hosteltur — turisme i ecotasa (2024)","Preferente.com — model turístic (2023-24)","GOB Mallorca — posicions mediambientals","OKBaleares — ecotasa i pressupostos"]}
];


const POBLES = [
  // MALLORCA
  {nom:"Palma", illa:"Mallorca", pop:415940, alcalde:"Jaime Martinez Llabres", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa en minoria. Jaime Martinez elegit alcalde el 17 de juny de 2023 sense suport de Vox.",
   regidors:[{p:"PP",n:11,c:"#003087"},{p:"PSIB-PSOE",n:12,c:"#c0392b"},{p:"Vox",n:4,c:"#5a7a00"},{p:"Mes per Mallorca",n:3,c:"#2e7d32"},{p:"Podem",n:2,c:"#7b1fa2"},{p:"Cs",n:1,c:"#f59b00"}],total:33},
  {nom:"Calvià", illa:"Mallorca", pop:52458, alcalde:"Alfonso Molina (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP+Vox (8+5=13) superen la PSIB (12) en la investidura. Calvià tenia una llarga tradicio socialista.",
   regidors:[{p:"PSIB-PSOE",n:12,c:"#c0392b"},{p:"PP",n:8,c:"#003087"},{p:"Vox",n:5,c:"#5a7a00"}],total:25},
  {nom:"Manacor", illa:"Mallorca", pop:45352, alcalde:"M. Antonia Sureda (Mes)", alcaldeParti:"Mes", colorGovern:"#2e7d32", govParti:"Mes",
   context:"Mes primera força. Govern progressista amb Mes, PSIB i AIPC (Porto Cristo). PP queda fora del govern.",
   regidors:[{p:"Mes per Mallorca",n:7,c:"#2e7d32"},{p:"PP",n:6,c:"#003087"},{p:"PSIB-PSOE",n:4,c:"#c0392b"},{p:"AIPC (Porto Cristo)",n:2,c:"#888"},{p:"Vox",n:2,c:"#5a7a00"}],total:21},
  {nom:"Santa Eularia des Riu", illa:"Eivissa", pop:40548, alcalde:"Carmen Ferrer (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP manté l'alcaldia de Santa Eularia amb majoria clara.",
   regidors:[{p:"PP",n:13,c:"#003087"},{p:"PSIB-PSOE",n:5,c:"#c0392b"},{p:"Vox",n:3,c:"#5a7a00"},{p:"Podem",n:2,c:"#7b1fa2"}],total:23},
  {nom:"Llucmajor", illa:"Mallorca", pop:38722, alcalde:"Eric Jareño (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Llucmajor amb majoria. Segon municipi mes gran de Mallorca per extensio.",
   regidors:[{p:"PP",n:10,c:"#003087"},{p:"PSIB-PSOE",n:7,c:"#c0392b"},{p:"Vox",n:3,c:"#5a7a00"},{p:"Mes",n:2,c:"#2e7d32"},{p:"El Pi",n:1,c:"#bf5c00"}],total:23},
  {nom:"Marratxi", illa:"Mallorca", pop:38902, alcalde:"Miquel Rossello (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP guanya Marratxi als socialistes. Municipio de gran creixement demografic als voltants de Palma.",
   regidors:[{p:"PP",n:9,c:"#003087"},{p:"PSIB-PSOE",n:8,c:"#c0392b"},{p:"Vox",n:3,c:"#5a7a00"},{p:"Mes",n:2,c:"#2e7d32"},{p:"El Pi",n:1,c:"#bf5c00"}],total:23},
  {nom:"Inca", illa:"Mallorca", pop:34093, alcalde:"Virginia Magraner (PSIB)", alcaldeParti:"PSIB", colorGovern:"#c0392b", govParti:"PSIB",
   context:"PSIB manté l'alcaldia d'Inca amb 10 regidors. Capital del Raiguer i de la industria del calcer mallorqui.",
   regidors:[{p:"PSIB-PSOE",n:10,c:"#c0392b"},{p:"PP",n:6,c:"#003087"},{p:"Vox",n:3,c:"#5a7a00"},{p:"Mes",n:2,c:"#2e7d32"}],total:21},
  {nom:"Sant Josep de sa Talaia", illa:"Eivissa", pop:28831, alcalde:"Xico Tarrés (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP guanya Sant Josep als socialistes. Municipio amb les platges emblematiques d'Eivissa (Cala Bassa, Cala Conta).",
   regidors:[{p:"PP",n:9,c:"#003087"},{p:"PSIB-PSOE",n:7,c:"#c0392b"},{p:"Vox",n:3,c:"#5a7a00"},{p:"Podem",n:2,c:"#7b1fa2"}],total:21},
  {nom:"Sant Antoni de Portmany", illa:"Eivissa", pop:27431, alcalde:"Marcos Serra (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP manté l'alcaldia de Sant Antoni. Segon nucli turistic mes important d'Eivissa.",
   regidors:[{p:"PP",n:10,c:"#003087"},{p:"PSIB-PSOE",n:5,c:"#c0392b"},{p:"Vox",n:4,c:"#5a7a00"},{p:"Podem",n:2,c:"#7b1fa2"}],total:21},
  {nom:"Maó-Mahon", illa:"Menorca", pop:29445, alcalde:"Olga Barbosa (PSIB)", alcaldeParti:"PSIB", colorGovern:"#c0392b", govParti:"PSIB",
   context:"PSIB i PP empataren a 8 regidors. Olga Barbosa (PSIB) va ser elegida alcaldessa com a primera de la llista mes votada.",
   regidors:[{p:"PSIB-PSOE",n:8,c:"#c0392b"},{p:"PP",n:8,c:"#003087"},{p:"aramaó",n:4,c:"#888"},{p:"Vox",n:1,c:"#5a7a00"}],total:21},
  {nom:"Eivissa (Ibiza)", illa:"Eivissa", pop:50715, alcalde:"Rafael Triguero (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP guanya Eivissa als socialistes. Capital de la pitüsa major, quinta ciutat en poblacio de les Illes.",
   regidors:[{p:"PP",n:10,c:"#003087"},{p:"PSIB-PSOE",n:7,c:"#c0392b"},{p:"Vox",n:3,c:"#5a7a00"},{p:"Podem",n:2,c:"#7b1fa2"}],total:22},
  {nom:"Alcudia", illa:"Mallorca", pop:21000, alcalde:"Antoni Bennassar (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Alcudia. Municipi turistic del nord de Mallorca, amb el port ben actiu i ruines romanes.",
   regidors:[{p:"PP",n:8,c:"#003087"},{p:"PSIB-PSOE",n:6,c:"#c0392b"},{p:"Vox",n:3,c:"#5a7a00"},{p:"Mes",n:2,c:"#2e7d32"}],total:21},
  {nom:"Felanitx", illa:"Mallorca", pop:18000, alcalde:"Jordi Prohens (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Felanitx. Municipi interior del Migjorn de Mallorca, conegut pel vi i la seva cultura.",
   regidors:[{p:"PP",n:8,c:"#003087"},{p:"PSIB-PSOE",n:5,c:"#c0392b"},{p:"Mes-Esquerra",n:4,c:"#2e7d32"},{p:"El Pi",n:2,c:"#bf5c00"}],total:21},
  {nom:"Sa Pobla", illa:"Mallorca", pop:13500, alcalde:"Biel Serra (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Sa Pobla. Municipi agricola del Pla de Mallorca, conegut per les patates i les Beneides.",
   regidors:[{p:"PP",n:9,c:"#003087"},{p:"PSIB-PSOE",n:5,c:"#c0392b"},{p:"Mes",n:3,c:"#2e7d32"},{p:"El Pi",n:2,c:"#bf5c00"}],total:21},
  {nom:"Soller", illa:"Mallorca", pop:14000, alcalde:"Joan-Ramon Rullan (PSIB)", alcaldeParti:"PSIB", colorGovern:"#c0392b", govParti:"PSIB",
   context:"PSIB governa Soller. Municipi de la Serra de Tramuntana, emblematic per la taronja i el tren historic.",
   regidors:[{p:"PSIB-PSOE",n:7,c:"#c0392b"},{p:"PP",n:6,c:"#003087"},{p:"Mes",n:3,c:"#2e7d32"},{p:"Vox",n:2,c:"#5a7a00"},{p:"El Pi",n:1,c:"#bf5c00"}],total:21},
  {nom:"Pollença", illa:"Mallorca", pop:17000, alcalde:"Martí March (Esquerra-Mes)", alcaldeParti:"Mes", colorGovern:"#2e7d32", govParti:"Mes",
   context:"Pollença manté govern progressista d'esquerres i ecologistes. Vila cultural del nord de Mallorca.",
   regidors:[{p:"Esquerra-Mes",n:6,c:"#2e7d32"},{p:"PP",n:6,c:"#003087"},{p:"PSIB-PSOE",n:5,c:"#c0392b"},{p:"El Pi",n:2,c:"#bf5c00"}],total:21},
  {nom:"Santanyi", illa:"Mallorca", pop:12000, alcalde:"Llorenç Galmés (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Santanyi. Municipi del Migjorn amb cales emblematiques com Cala Mondragó.",
   regidors:[{p:"PP",n:9,c:"#003087"},{p:"PSIB-PSOE",n:5,c:"#c0392b"},{p:"Mes",n:3,c:"#2e7d32"},{p:"El Pi",n:2,c:"#bf5c00"}],total:21},
  {nom:"Arta", illa:"Mallorca", pop:8500, alcalde:"Maria Esperança Ferrer (Mes)", alcaldeParti:"Mes", colorGovern:"#2e7d32", govParti:"Mes",
   context:"Mes governa Arta amb suport progressista. Vila historica del Llevant de Mallorca.",
   regidors:[{p:"Mes-Artanencs",n:6,c:"#2e7d32"},{p:"PP",n:4,c:"#003087"},{p:"PSIB-PSOE",n:3,c:"#c0392b"},{p:"El Pi",n:2,c:"#bf5c00"}],total:17},
  {nom:"Binissalem", illa:"Mallorca", pop:8000, alcalde:"Sebastià Salom (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Binissalem. Capital vinícola de Mallorca, seu de la DO Binissalem.",
   regidors:[{p:"PP",n:7,c:"#003087"},{p:"PSIB-PSOE",n:4,c:"#c0392b"},{p:"Mes",n:3,c:"#2e7d32"},{p:"El Pi",n:3,c:"#bf5c00"}],total:17},
  {nom:"Capdepera", illa:"Mallorca", pop:12000, alcalde:"Toni Ferrer (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Capdepera. Municipi turistic del Llevant amb el Castell de Capdepera i Cala Rajada.",
   regidors:[{p:"PP",n:7,c:"#003087"},{p:"PSIB-PSOE",n:5,c:"#c0392b"},{p:"Mes",n:3,c:"#2e7d32"},{p:"Vox",n:2,c:"#5a7a00"}],total:17},
  {nom:"Andratx", illa:"Mallorca", pop:11000, alcalde:"Joan Mir (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Andratx. Municipi de la Serra de Tramuntana occidental, molt popular entre residents nordeuropeus.",
   regidors:[{p:"PP",n:7,c:"#003087"},{p:"PSIB-PSOE",n:4,c:"#c0392b"},{p:"Mes-Andratx",n:3,c:"#2e7d32"},{p:"Vox",n:2,c:"#5a7a00"},{p:"El Pi",n:1,c:"#bf5c00"}],total:17},
  // MENORCA
  {nom:"Ciutadella de Menorca", illa:"Menorca", pop:30811, alcalde:"Joana Gomila (PSIB-2024)", alcaldeParti:"PSIB", colorGovern:"#c0392b", govParti:"PSIB",
   context:"PP va guanyar el 28M 2023 pero el 2024 una mocio de censura va portar el PSIB al govern. Mostra la fragilitat dels governs en minoria.",
   regidors:[{p:"PP",n:8,c:"#003087"},{p:"PSIB-PSOE",n:7,c:"#c0392b"},{p:"MxMe-PSM",n:4,c:"#00695c"},{p:"Vox",n:2,c:"#5a7a00"}],total:21},
  {nom:"Maó-Mahon", illa:"Menorca", pop:29445, alcalde:"Olga Barbosa (PSIB)", alcaldeParti:"PSIB", colorGovern:"#c0392b", govParti:"PSIB",
   context:"Empat PSIB-PP a 8 regidors. Olga Barbosa (PSIB) elegida alcaldessa al tenir la llista mes votada.",
   regidors:[{p:"PSIB-PSOE",n:8,c:"#c0392b"},{p:"PP",n:8,c:"#003087"},{p:"aramaó",n:4,c:"#888"},{p:"Vox",n:1,c:"#5a7a00"}],total:21},
  {nom:"Es Mercadal", illa:"Menorca", pop:5800, alcalde:"Josep Pasqual (PSIB-MxMe)", alcaldeParti:"PSIB", colorGovern:"#c0392b", govParti:"PSIB",
   context:"Govern progressista PSIB-MxMe a Es Mercadal. Municipi central de Menorca.",
   regidors:[{p:"PSIB-MxMe",n:7,c:"#c0392b"},{p:"PP",n:5,c:"#003087"},{p:"Vox",n:1,c:"#5a7a00"}],total:13},
  {nom:"Alaior", illa:"Menorca", pop:9700, alcalde:"Rafael Sintes (PSIB)", alcaldeParti:"PSIB", colorGovern:"#c0392b", govParti:"PSIB",
   context:"PSIB governa Alaior. Segon nucli urba de Menorca, conegut per la industria dels formatges.",
   regidors:[{p:"PSIB-PSOE",n:7,c:"#c0392b"},{p:"PP",n:5,c:"#003087"},{p:"MxMe",n:3,c:"#00695c"}],total:17},
  {nom:"Es Castell", illa:"Menorca", pop:7500, alcalde:"Duran (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Es Castell. Municipi de tradicio britanica, amb el port de Maó al costat.",
   regidors:[{p:"PP",n:7,c:"#003087"},{p:"PSIB-PSOE",n:5,c:"#c0392b"},{p:"MxMe",n:3,c:"#00695c"}],total:17},
  // EIVISSA
  {nom:"Sant Joan de Labritja", illa:"Eivissa", pop:5500, alcalde:"Tarek Ifach (PP)", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Sant Joan. Municipi del nord d'Eivissa, amb el mercat hippy de Punta Arabí.",
   regidors:[{p:"PP",n:6,c:"#003087"},{p:"PSIB-PSOE",n:4,c:"#c0392b"},{p:"Podem",n:3,c:"#7b1fa2"}],total:13},
  {nom:"Sant Llorenç de ses Basses", illa:"Eivissa", pop:25000, alcalde:"PP alcalde", alcaldeParti:"PP", colorGovern:"#003087", govParti:"PP",
   context:"PP governa Sant Llorenç, municipi que inclou Jesús i Santa Gertrudis.",
   regidors:[{p:"PP",n:9,c:"#003087"},{p:"PSIB-PSOE",n:6,c:"#c0392b"},{p:"Vox",n:3,c:"#5a7a00"},{p:"Podem",n:2,c:"#7b1fa2"}],total:21},
  // FORMENTERA
  {nom:"Formentera", illa:"Formentera", pop:12300, alcalde:"Ana Juan Cardona (Sa Unio-Prog)", alcaldeParti:"SaUnio", colorGovern:"#4527a0", govParti:"SaUnio",
   context:"Sa Unió-Progressistes governa Formentera. Unic municipi de l'illa. Politica marcada per la sostenibilitat extrema i els limits de capacitat.",
   regidors:[{p:"Sa Unio-Progressistes",n:7,c:"#4527a0"},{p:"PP",n:4,c:"#003087"},{p:"PSIB-PSOE",n:3,c:"#c0392b"},{p:"Mes-Formentera",n:2,c:"#2e7d32"}],total:17},
];

const PROG27 = [
  {parti:"PP", color:"#003087", bg:"#dce8ff",
   lema:"Consolidar la gestio, reduir impostos, turisme sostenible",
   propostes:["Mantenir la limitació de noves places en pisos plurifamiliars","Pla d'habitatge de mercat: 'Lloguer Segur' ampliat","Consolidar la lliure elecció lingüística a totes les etapes","Nova reducció de l'IRPF autonòmic","Simplificació administrativa per a empreses","Pacte turístic: ITS en temporada alta, promoció fora de temporada"]},
  {parti:"PSIB-PSOE", color:"#c0392b", bg:"#fde8e6",
   lema:"Habitatge public, ITS alta, catala i serveis publics",
   propostes:["Fons específic d'habitatge public finançat per l'ITS","Moratoria de places turístiques i limitació creuers","ITS alta tot l'any: proposta de doblar la recaptació","Protecció activa del català en tots els àmbits","Recuperar la RESOGA i ampliar serveis socials","Regulació dels preus del lloguer: topall de mercat"]},
  {parti:"Mes per Mallorca", color:"#2e7d32", bg:"#e8f5e9",
   lema:"Decreixement turístic, habitatge per a residents, sobirania",
   propostes:["Decreixement turístic actiu: eliminació de places","ITS proporcional al preu d'estada","Pressió a l'Estat per limitar compra d'habitatge a no residents","Concert econòmic de les Illes amb l'Estat","Catala com a única llengua vehicular publica","Eliminació de la promoció turística publica"]},
  {parti:"Vox", color:"#5a7a00", bg:"#f0f4e0",
   lema:"Catala fora, contre la immigracio, zero impostos nous",
   propostes:["Castellà llengua vehicular a tota l'educació","Derogar l'ITS i qualsevol nou impost turístic","Restriccions dures a la immigracio i als MENA","Derogar totes les lleis de memoria democratica","Eliminació de les polítiques d'igualtat de genere","Reducció radical d'impostos: bonificació total successió directa"]},
  {parti:"Podem", color:"#7b1fa2", bg:"#f3e5f5",
   lema:"Habitatge public, serveis basics, transicio ecologica",
   propostes:["Habitatge public directe: expropiació d'habitatge buit","100% finançament public de la sanitat i l'educació","Transició energètica urgent: renovables al 100% el 2040","Impostos a la riquesa: tram autonòmic de grans fortunes","Catala: defensa del model d'immersió"]},
  {parti:"Mes per Menorca", color:"#00695c", bg:"#e0f2f1",
   lema:"Menorca, Reserva de la Biosfera, autogovern",
   propostes:["Model turístic de Reserva de la Biosfera a tot Menorca","Habitatge per a residents: restriccions a no residents","Finançament just: concert específic per a les illes petites","Catala menorquí com a tret d'identitat prioritari","Menor nombre de visitants, major qualitat de l'experiencia"]},
];

const PARTIES27 = [
  {nom:"PP", full:"Partido Popular Baleares", color:"#003087", status:"Govern actual (2023-)", candidat:"Marga Prohens (presumpta)", probabilitat:"Alta (primera forca)"},
  {nom:"PSIB-PSOE", full:"Partido Socialista de les Illes Balears", color:"#c0392b", status:"Principal oposicio", candidat:"Francina Armengol (possiblement) o nou candidat", probabilitat:"Alta (segona forca)"},
  {nom:"Mes per Mallorca", full:"Mes per Mallorca", color:"#2e7d32", status:"Oposicio", candidat:"Lluis Apesteguia o candidat renovat", probabilitat:"Alta"},
  {nom:"Vox", full:"Vox Baleares", color:"#5a7a00", status:"Suport extern PP", candidat:"Manuela Cañadas o renovació", probabilitat:"Alta"},
  {nom:"Podem", full:"Unides Podem - EUIB", color:"#7b1fa2", status:"Oposicio (1 esco 2023)", candidat:"Per determinar. Possible aliança amb Mes o PSIB", probabilitat:"Moderada (risc de desaparicio)"},
  {nom:"Mes per Menorca", full:"Mes per Menorca (MxMe)", color:"#00695c", status:"Oposicio", candidat:"Josep Castells o successió", probabilitat:"Alta"},
  {nom:"El Pi", full:"El Pi - Proposta per les Illes", color:"#bf5c00", status:"Fora del Parlament", candidat:"Reforma o renovació total del projecte", probabilitat:"Moderada (necessita refundació)"},
  {nom:"Sa Unio", full:"Sa Unió de Formentera", color:"#4527a0", status:"Suport extern PP", candidat:"Neus Roig o renovació", probabilitat:"Alta (Formentera)"},
  {nom:"Nova formació?", full:"Possible nova força de centre o dreta moderada", color:"#888", status:"Per confirmar", candidat:"Sense nom ni líder definit (2026)", probabilitat:"Baixa-Moderada"},
];



/* ─── POBLES ─── */
var currentIlla = 'totes';
var currentGovern = 'totes';

function filterPobles(){
  var search = document.getElementById('poble-search').value.toLowerCase();
  renderPobles(search, currentIlla, currentGovern);
}

function filterByIlla(illa, btn){
  currentIlla = illa;
  document.querySelectorAll('.filter-pill').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  currentGovern = 'totes';
  filterPobles();
}

function filterByGovern(governi, btn){
  currentGovern = governi;
  document.querySelectorAll('.filter-pill').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  currentIlla = 'totes';
  filterPobles();
}

function renderPobles(search, illa, govern){
  search = search || '';
  illa = illa || 'totes';
  govern = govern || 'totes';
  var filtered = POBLES.filter(function(p){
    var matchSearch = search === '' || p.nom.toLowerCase().includes(search) || p.illa.toLowerCase().includes(search);
    var matchIlla = illa === 'totes' || p.illa === illa;
    var matchGovern = govern === 'totes' || 
      (govern === 'PP' && p.govParti === 'PP') ||
      (govern === 'PSIB' && p.govParti === 'PSIB') ||
      (govern === 'Mes' && (p.govParti === 'Mes' || p.govParti === 'SaUnio'));
    return matchSearch && matchIlla && matchGovern;
  });
  
  // Remove duplicates by nom
  var seen = {};
  filtered = filtered.filter(function(p){
    if(seen[p.nom]) return false;
    seen[p.nom] = true;
    return true;
  });
  
  var grid = document.getElementById('pobles-grid');
  var noRes = document.getElementById('no-results');
  if(!grid) return;
  
  if(filtered.length === 0){
    grid.innerHTML = '';
    if(noRes) noRes.style.display = 'block';
    return;
  }
  if(noRes) noRes.style.display = 'none';
  
  grid.innerHTML = filtered.map(function(p){
    var totalSeats = p.total || p.regidors.reduce(function(s,r){ return s+r.n; }, 0);
    var barSegs = p.regidors.map(function(r){
      return '<div style="flex:'+r.n+';background:'+r.c+';" title="'+r.p+': '+r.n+'"></div>';
    }).join('');
    var regRows = p.regidors.map(function(r){
      return '<div class="regidor-row"><div><span class="regidor-dot" style="background:'+r.c+'"></span>'+r.p+'</div><span class="regidor-count">'+r.n+'</span></div>';
    }).join('');
    return '<div class="poble-card" id="poble-'+p.nom.replace(/ /g,'-')+'" onclick="togglePobre(this)" style="--pcolor:'+p.colorGovern+'">'
      + '<div class="poble-head" style="background:'+p.colorGovern+'">'
      + '<div><div class="poble-nom">'+p.nom+'</div><div class="poble-illa">'+p.illa+'</div></div>'
      + '<div class="poble-pop">'+p.pop.toLocaleString('ca-ES')+' hab.</div>'
      + '</div>'
      + '<div class="poble-body">'
      + '<div class="poble-alcalde"><strong>Alcalde/essa:</strong> '+p.alcalde+'</div>'
      + '<div class="poble-regidors-bar">'+barSegs+'</div>'
      + '<div class="poble-info">'
      + '<span class="poble-govern-badge" style="background:'+p.colorGovern+'">'+p.govParti+' governa</span>'
      + '<span class="poble-toggle">+ veure regidors</span>'
      + '</div>'
      + '</div>'
      + '<div class="poble-detail">'
      + '<div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#aaa;margin-bottom:8px;">Regidors ('+totalSeats+' total)</div>'
      + regRows
      + '<div style="margin-top:10px;font-size:12px;color:#777;font-style:italic;">'+p.context+'</div>'
      + '</div>'
      + '</div>';
  }).join('');
}

function togglePobre(el){
  el.classList.toggle('open');
}

/* ─── ELECT27 ─── */
function renderElect27(){
  var pg = document.getElementById('prog27-grid');
  if(pg){
    pg.innerHTML = PROG27.map(function(p){
      return '<div class="prog27-card">'
        + '<div class="prog27-head" style="background:'+p.color+'">'
        + '<div class="prog27-party">'+p.parti+'</div>'
        + '<div class="prog27-name">'+p.lema+'</div>'
        + '</div>'
        + '<div class="prog27-body">'
        + p.propostes.map(function(pr){
          return '<div class="prog27-item"><span class="prog27-arrow" style="color:'+p.color+'">›</span>'+pr+'</div>';
        }).join('')
        + '</div></div>';
    }).join('');
  }
  
  var pg2 = document.getElementById('parties27-grid');
  if(pg2){
    pg2.innerHTML = PARTIES27.map(function(p){
      return '<div style="background:#fff;border-radius:10px;padding:14px 16px;box-shadow:0 1px 8px rgba(0,0,0,.06);border-top:3px solid '+p.color+'">'
        + '<div style="font-size:13px;font-weight:700;color:'+p.color+';margin-bottom:4px;">'+p.nom+'</div>'
        + '<div style="font-size:11px;color:#aaa;margin-bottom:6px;">'+p.full+'</div>'
        + '<div style="font-size:12px;color:#555;margin-bottom:4px;"><strong>Candidat/a:</strong> '+p.candidat+'</div>'
        + '<div style="font-size:11px;background:#f5f5f0;border-radius:4px;padding:3px 7px;display:inline-block;color:#555;">'+p.probabilitat+'</div>'
        + '</div>';
    }).join('');
  }
}



/* ─── RENDER FUNCTIONS ─── */

function showTab(id, btn){
  document.querySelectorAll('.tab-section').forEach(function(s){ s.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  var el = document.getElementById('tab-'+id);
  if(el) el.classList.add('active');
  if(btn) btn.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}


/* Fitxes */
function renderParties(){
  const g=document.getElementById('party-grid');
  if(!g)return;
  g.innerHTML=Object.values(PARTIES).map(p=>\`
    <div class="pcard" id="pcard-\${p.id}" onclick="toggleParty('\${p.id}')" style="--pcolor:\${p.color}">
      <div class="pcard-head" style="background:\${p.color}">
        <div>
          <div class="pcard-name">\${p.name}</div>
          <div class="pcard-ideology">\${p.ideology}</div>
        </div>
        <div>
          \${p.seats>0?\`<div class="pcard-seats">\${p.seats} esc.</div>\`:'<div class="pcard-seats" style="font-size:10px">Fora Parl.</div>'}
          <div class="pcard-status">\${p.status}</div>
        </div>
      </div>
      <div class="pcard-body">
        <div class="pcard-meta"><strong>Líder:</strong> \${p.leader} · <strong>Fundat:</strong> \${p.founded}</div>
        <div class="pcard-desc">\${p.desc}</div>
        <div class="pcard-toggle" style="color:\${p.color}">▼ Veure posicions per tema</div>
      </div>
      <div class="pcard-positions" style="background:\${p.bg}">
        \${TOPICS.map(t=>\`
          <div class="pos-topic">
            <div class="pos-topic-label" style="color:\${p.color}">\${t.icon} \${t.label}</div>
            <div class="pos-topic-text">\${p.positions[t.id]}</div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`).join('');
}

function toggleParty(id){
  const c=document.getElementById('pcard-'+id);
  const isOpen=c.classList.contains('open');
  c.classList.toggle('open');
  const tog=c.querySelector('.pcard-toggle');
  if(tog) tog.textContent=isOpen?'▼ Veure posicions per tema':'▲ Tancar posicions';
}

/* Comparador */
let activeTopic=null;
function initCompare(){
  const s1=document.getElementById('sel1');
  const s2=document.getElementById('sel2');
  if(!s1||!s2)return;
  const opts=Object.values(PARTIES).map(p=>\`<option value="\${p.id}">\${p.name} — \${p.fullName}</option>\`).join('');
  s1.innerHTML=opts; s2.innerHTML=opts;
  s1.value='pp'; s2.value='psib';
  s1.style.borderColor=PARTIES['pp'].color; s1.style.color=PARTIES['pp'].color;
  s2.style.borderColor=PARTIES['psib'].color; s2.style.color=PARTIES['psib'].color;
  s1.onchange=()=>{s1.style.borderColor=PARTIES[s1.value].color;s1.style.color=PARTIES[s1.value].color;renderCompare();};
  s2.onchange=()=>{s2.style.borderColor=PARTIES[s2.value].color;s2.style.color=PARTIES[s2.value].color;renderCompare();};

  const pills=document.getElementById('topic-pills');
  pills.innerHTML='<button class="topic-pill active" onclick="filterTopic(null,this)">Tots els temes</button>'+
    TOPICS.map(t=>\`<button class="topic-pill" onclick="filterTopic('\${t.id}',this)">\${t.icon} \${t.label}</button>\`).join('');
  renderCompare();
}

function filterTopic(id,btn){
  activeTopic=id;
  document.querySelectorAll('.topic-pill').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderCompare();
}

function renderCompare(){
  const p1=PARTIES[document.getElementById('sel1').value];
  const p2=PARTIES[document.getElementById('sel2').value];
  const h=document.getElementById('compare-headers');
  h.innerHTML=[p1,p2].map(p=>\`
    <div class="compare-party-head" style="background:\${p.color}">
      <div class="compare-party-name">\${p.name}</div>
      <div class="compare-party-sub">\${p.ideology}</div>
      <div class="compare-party-info">\${p.seats} escons 2023 · \${p.status}</div>
    </div>
  \`).join('');
  const topics=activeTopic?TOPICS.filter(t=>t.id===activeTopic):TOPICS;
  document.getElementById('compare-blocks').innerHTML=topics.map(t=>\`
    <div class="compare-topic-block">
      <div class="compare-topic-header">
        <span class="compare-topic-icon">\${t.icon}</span>
        <span class="compare-topic-title">\${t.label}</span>
      </div>
      <div class="compare-cols">
        <div class="compare-col" style="border-top:3px solid \${p1.color}">
          <div class="compare-col-label" style="color:\${p1.color}">\${p1.name}</div>
          <div class="compare-col-text">\${p1.positions[t.id]}</div>
        </div>
        <div class="compare-col" style="border-top:3px solid \${p2.color}">
          <div class="compare-col-label" style="color:\${p2.color}">\${p2.name}</div>
          <div class="compare-col-text">\${p2.positions[t.id]}</div>
        </div>
      </div>
    </div>
  \`).join('');
}

/* Programes */
function showYear(yr,btn){
  document.querySelectorAll('.year-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.election-block').forEach(b=>b.classList.remove('active'));
  document.getElementById('elec-'+yr).classList.add('active');
}

function renderPrograms(){
  const c=document.getElementById('election-blocks');
  if(!c)return;
  c.innerHTML=Object.entries(ELECTIONS).map(([yr,el])=>{
    const total=el.results.reduce((s,r)=>s+r.seats,0);
    const bar=el.results.map(r=>\`<div class="seats-bar-seg" style="flex:\${r.seats/total*100};background:\${r.color}" title="\${r.name}: \${r.seats}"></div>\`).join('');
    const legend=el.results.map(r=>\`<span class="seats-legend-item"><span class="seats-legend-dot" style="background:\${r.color}"></span>\${r.name}: \${r.seats} (\${r.pct})</span>\`).join('');
    const cards=Object.entries(el.programs).map(([pid,prog])=>{
      const p=PARTIES[pid]||{name:pid,color:'#555'};
      const compScore=prog.compliance;
      const compColor=compScore>=70?'#2e7d32':compScore>=50?'#bf5c00':'#c0392b';
      const compLabel=compScore>=70?'Alt compliment':compScore>=50?'Compliment parcial':'Baix compliment';
      const promisesHtml=prog.promises?prog.promises.map(pr=>\`<li>\${pr}</li>\`).join(''):'';
      const compLines=prog.compliance?prog.compliance.split('\n').map(l=>\`<li>\${l}</li>\`).join(''):'';
      return \`
        <div class="prog-card" id="pc-\${yr}-\${pid}" style="--pcolor:\${prog.color||p.color}">
          <div class="prog-card-head" onclick="toggleProg('\${yr}-\${pid}')">
            <div class="prog-card-badges">
              <span class="prog-party-badge" style="background:\${prog.color||p.color}">\${p.name}</span>
              \${prog.governed?'<span class="prog-badge-gov">Va governar</span>':''}
              \${compScore?\`<span class="prog-badge-comp" style="background:\${compColor}22;color:\${compColor};border:1px solid \${compColor}44">\${compScore}% · \${compLabel}</span>\`:''}
            </div>
            <span class="prog-chevron" style="color:\${prog.color||p.color}">▼</span>
          </div>
          <div class="prog-card-body" style="background:\${prog.bg||'#f9f9f9'}">
            <div class="prog-section-title" style="color:\${prog.color||p.color}">Resum del Programa</div>
            <div class="prog-summary">\${prog.summary}</div>
            \${promisesHtml?\`<div class="prog-section-title" style="color:\${prog.color||p.color};margin-top:8px;">Promeses Principals</div><ul class="prog-promises">\${promisesHtml}</ul>\`:''}
            \${prog.link?\`<a href="\${prog.link}" target="_blank" class="prog-link" style="background:\${prog.color||p.color}">🔗 Programa complet</a>\`:''}
            \${compLines?\`<div class="compliance-block"><div class="prog-section-title" style="color:\${compColor}">Anàlisi del Compliment</div><ul class="compliance-items">\${compLines}</ul></div>\`:''}
          </div>
        </div>\`;
    }).join('');
    return \`
      <div id="elec-\${yr}" class="election-block \${yr==2023?'active':''}">
        <div class="election-header" style="background:linear-gradient(135deg,#1a1a2e,#2a2a4e)">
          <div class="election-date">\${el.date}</div>
          <div class="election-title">Eleccions \${yr} · <span style="opacity:.5;font-weight:400;font-size:16px">\${el.winner}</span></div>
          <div class="election-coalition">\${el.coalition}</div>
          <div class="seats-bar">\${bar}</div>
          <div class="seats-legend">\${legend}</div>
        </div>
        <div class="prog-cards">\${cards}</div>
      </div>\`;
  }).join('');
}

function toggleProg(id){
  const c=document.getElementById('pc-'+id);
  const isOpen=c.classList.contains('open');
  c.classList.toggle('open');
  const chev=c.querySelector('.prog-chevron');
  if(chev) chev.textContent=isOpen?'▼':'▲';
}

/* Governs */
function renderGoverns(){
  const c=document.getElementById('governs-content');
  if(!c)return;
  
  // Timeline bar
  let tl = '<div style="background:#1a1a2e;border-radius:12px;padding:20px 24px;margin-bottom:24px;">';
  tl += '<div style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:12px;">CRONOLOGIA 1983-AVUI: ' + GOVERNS.length + ' GOVERNS</div>';
  tl += '<div style="display:flex;height:28px;border-radius:8px;overflow:hidden;">';
  GOVERNS.forEach(function(g){ tl += '<div style="flex:1;background:'+g.color+'" title="'+g.name+'"></div>'; });
  tl += '</div>';
  tl += '<div style="display:flex;gap:12px;margin-top:10px;flex-wrap:wrap;">';
  tl += '<span style="font-size:11px;color:rgba(255,255,255,.5);display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#1565c0;display:inline-block;"></span>AP/PP (1983-1999, 2003-2007, 2011-2015, 2023-)</span>';
  tl += '<span style="font-size:11px;color:rgba(255,255,255,.5);display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:2px;background:#b71c1c;display:inline-block;"></span>PSIB-Pacte de Progres / Armengol (1999-2003, 2007-2023)</span>';
  tl += '</div></div>';
  
  let html = tl;
  
  GOVERNS.forEach(function(g, i) {
    let vh = '';
    if(g.vicepresidents && g.vicepresidents.length){
      vh = '<div style="margin-bottom:14px;"><div class="gov-col-title" style="color:'+g.color+'">Vicepresidencia</div><ul class="gov-list">';
      g.vicepresidents.forEach(function(v){ vh += '<li style="--c:'+g.color+'">'+v+'</li>'; });
      vh += '</ul></div>';
    }
    let ch = '';
    if(g.consellers && g.consellers.length){
      ch = '<div style="margin-bottom:14px;"><div class="gov-col-title" style="color:'+g.color+'">Consellers i Conselleres</div>';
      ch += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;">';
      g.consellers.forEach(function(con){
        ch += '<div style="font-size:12px;color:var(--neutral-mid);padding:3px 0 3px 13px;position:relative;border-bottom:1px solid var(--border);line-height:1.45;">';
        ch += '<span style="position:absolute;left:0;color:'+g.color+';font-weight:700;font-size:11px;">&rsaquo;</span>'+con+'</div>';
      });
      ch += '</div></div>';
    }
    let laws = '';
    g.laws.forEach(function(l){ laws += '<li style="--c:'+g.color+'">'+l+'</li>'; });
    let miles = '';
    g.milestones.forEach(function(m){ miles += '<li style="--c:'+g.color+'">'+m+'</li>'; });
    
    html += '<div class="gov-card" style="border-left:4px solid '+g.color+';margin-bottom:16px;">';
    html += '<div class="gov-card-head" style="background:'+g.color+'">';
    html += '<div><div class="gov-card-title">'+g.name+'</div>';
    html += '<div class="gov-card-period">'+g.period+' &middot; '+g.president+'</div></div>';
    html += '<div style="text-align:right"><div class="gov-card-tag">'+(g.partyLabel||g.party)+'</div>';
    html += '<div style="font-size:10px;color:rgba(255,255,255,.5);margin-top:3px;">Govern '+(i+1)+'</div></div>';
    html += '</div>';
    html += '<div class="gov-card-body">';
    html += '<div style="font-size:13px;color:#555;line-height:1.7;margin-bottom:14px;padding:12px 16px;background:#fafafa;border-radius:8px;border-left:3px solid '+g.color+'">'+g.context+'</div>';
    html += '<div style="font-size:12px;color:var(--neutral-mid);margin-bottom:12px;"><strong>Coalicio/Suports:</strong> '+g.coalition+'</div>';
    html += vh + ch;
    html += '<div class="gov-cols">';
    html += '<div><div class="gov-col-title" style="color:'+g.color+'">Lleis i mesures clau</div><ul class="gov-list">'+laws+'</ul></div>';
    html += '<div><div class="gov-col-title" style="color:'+g.color+'">Fites politiques</div><ul class="gov-list">'+miles+'</ul></div>';
    html += '</div></div></div>';
  });
  
  c.innerHTML = html;
}
/* Fonts */
function renderFonts(){
  const g=document.getElementById('fonts-grid');
  if(!g)return;
  g.innerHTML=FONTS.map(f=>\`
    <div class="font-card">
      <div class="font-cat">\${f.cat}</div>
      <ul class="font-list">\${f.items.map(i=>\`<li>\${i}</li>\`).join('')}</ul>
    </div>
  \`).join('');
}

/* gov list bullets need color */
document.addEventListener('DOMContentLoaded', function(){
  renderParties();
  initCompare();
  renderPrograms();
  renderGoverns();
  renderFonts();
  renderPobles('','totes','totes');
  renderElect27();
});

// Fix gov list bullet color
const govStyle=document.createElement('style');
govStyle.textContent='.gov-list li::before{color:var(--c,#333);}';
document.head.appendChild(govStyle);

</script>
</body>
</html`
