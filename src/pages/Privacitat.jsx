// src/pages/Privacitat.jsx
export default function Privacitat() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-2">BalearsPolitic</div>
      <h1 className="font-display text-4xl font-black text-ink mb-8">Política de Privacitat</h1>
      <div className="space-y-8">
        <Section title="1. Responsable del tractament">
          <p>Tolo Oliver · BalearsPolitic · <a href="mailto:boocman@gmail.com" className="text-accent hover:underline">boocman@gmail.com</a></p>
        </Section>
        <Section title="2. Dades que recollim">
          <p><strong>Usuaris generals:</strong> Recollim dades d'ús anònimes mitjançant Google Analytics (G-HB6Y2XJ98P) per entendre com s'utilitza el web (pàgines visitades, temps de sessió, origen del trànsit). Aquestes dades no permeten identificar cap persona concreta.</p>
          <p><strong>Accés admin:</strong> L'accés a l'àrea d'administració requereix autenticació via Google OAuth. En aquest cas, emmagatzemem el correu electrònic de l'administrador a Supabase per controlar l'accés. No es comparteix amb tercers.</p>
        </Section>
        <Section title="3. Finalitat del tractament">
          <p>Les dades d'analítica (Google Analytics) s'utilitzen exclusivament per a millorar el web: entendre quines seccions són més visitades, detectar errors i optimitzar el contingut. No fem màrqueting, no venem dades, no creem perfils individuals d'usuari.</p>
        </Section>
        <Section title="4. Base legal">
          <p>El tractament de dades d'analítica es basa en el consentiment implícit per a cookies analítiques. El tractament de l'accés admin es basa en l'interès legítim (seguretat i control d'accés) d'acord amb l'article 6.1.f del RGPD.</p>
        </Section>
        <Section title="5. Cookies">
          <p>BalearsPolitic utilitza cookies tècniques i cookies analítiques de Google Analytics. Vegeu la nostra <a href="/cookies" className="text-accent hover:underline">Política de Cookies</a> per a més informació.</p>
        </Section>
        <Section title="6. Serveis de tercers">
          <ul className="space-y-1.5">
            <li><strong>Google Analytics:</strong> Analítica web anònima. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-accent hover:underline">Política de privacitat</a></li>
            <li><strong>Supabase:</strong> Base de dades i autenticació (servidors europeus). <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer" className="text-accent hover:underline">Política de privacitat</a></li>
            <li><strong>Netlify:</strong> Allotjament web. <a href="https://www.netlify.com/privacy/" target="_blank" rel="noreferrer" className="text-accent hover:underline">Política de privacitat</a></li>
            <li><strong>Anthropic (Claude):</strong> IA per a resums de programes electorals. <a href="https://www.anthropic.com/privacy" target="_blank" rel="noreferrer" className="text-accent hover:underline">Política de privacitat</a></li>
            <li><strong>Google OAuth:</strong> Autenticació de l'administrador. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-accent hover:underline">Política de privacitat</a></li>
          </ul>
        </Section>
        <Section title="7. Drets de les persones">
          <p>D'acord amb el RGPD, tens dret a accedir, rectificar, suprimir, limitar el tractament i portar les teves dades. Per exercir-los: <a href="mailto:boocman@gmail.com" className="text-accent hover:underline">boocman@gmail.com</a>. Tens dret a presentar una reclamació davant l'Agència Espanyola de Protecció de Dades (aepd.es).</p>
        </Section>
        <Section title="8. Conservació de les dades">
          <p>Les dades d'analítica es conserven durant 26 mesos (configuració per defecte de Google Analytics). Les dades de l'administrador es conserven mentre sigui necessari per al funcionament del sistema.</p>
        </Section>
      </div>
      <div className="mt-12 pt-6 border-t border-border font-mono text-[10px] text-mid">Última actualització: juny 2026</div>
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
