// src/pages/Legal.jsx
export default function Legal() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-2">BalearsPolitic</div>
      <h1 className="font-display text-4xl font-black text-ink mb-8">Avís Legal</h1>

      <div className="prose-custom space-y-8">
        <Section title="1. Titular del web">
          <p>BalearsPolitic és un projecte de <strong>Tolo Oliver</strong>, amb domicili a les Illes Balears, Espanya. Contacte: <a href="mailto:boocman@gmail.com" className="text-accent hover:underline">hola@balearspolitic.cat</a></p>
        </Section>

        <Section title="2. Objecte i finalitat">
          <p>BalearsPolitic és una plataforma d'anàlisi política independent sense ànim de lucre, destinada a facilitar el coneixement de la política balear. Recull, ordena i presenta informació pública sobre governs, partits, municipis i processos electorals de les Illes Balears.</p>
        </Section>

        <Section title="3. Propietat intel·lectual">
          <p>Els continguts d'aquest web (textos, anàlisis, estructures de dades i codi) són propietat de BalearsPolitic. Els dades electorals i institucionals provenen de fonts públiques (Govern de les Illes Balears, Parlament, ajuntaments, fonts periodístiques).</p>
          <p>Podeu citar i compartir el contingut d'aquest web amb atribució a BalearsPolitic i indicant la URL de la font original.</p>
        </Section>

        <Section title="4. Exactitud de la informació">
          <p>BalearsPolitic fa tots els esforços raonables per garantir la precisió de la informació publicada. No obstant, les dades electorals, composicions de governs i posicions de partits poden contenir errors o estar desactualitzades. Les posicions dels partits reflecteixen declaracions i actuacions públiques contrastades en fonts de diferent tendència editorial.</p>
          <p>BalearsPolitic no es responsabilitza de les decisions preses a partir de la informació d'aquest web.</p>
        </Section>

        <Section title="5. Neutralitat editorial">
          <p>BalearsPolitic és una eina d'anàlisi independent i no té cap afiliació política. L'objectiu és presentar la informació de forma equilibrada i verificada. Si detectes un error o consideres que algun contingut és parcial, posa't en contacte amb nosaltres.</p>
        </Section>

        <Section title="6. Llei aplicable">
          <p>Aquest avís legal es regeix per la legislació espanyola. Per a qualsevol controvèrsia, les parts se sotmeten als jutjats i tribunals de Palma de Mallorca.</p>
        </Section>
      </div>

      <div className="mt-12 pt-6 border-t border-border font-mono text-[10px] text-mid">
        Última actualització: juny 2026
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-ink mb-3">{title}</h2>
      <div className="space-y-2 text-sm text-mid leading-relaxed">{children}</div>
    </div>
  )
}
