// src/pages/Cookies.jsx
export default function Cookies() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-2">BalearsPolitic</div>
      <h1 className="font-display text-4xl font-black text-ink mb-8">Política de Cookies</h1>
      <div className="space-y-8">
        <Section title="Quines cookies utilitza BalearsPolitic?">
          <p>BalearsPolitic utilitza dos tipus de cookies: tècniques (necessàries) i analítiques (Google Analytics).</p>
        </Section>
        <Section title="Cookies tècniques (estrictament necessàries)">
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-ink/5">
                <tr>
                  <th className="text-left px-4 py-2.5 font-mono uppercase tracking-wider text-mid text-[10px]">Cookie</th>
                  <th className="text-left px-4 py-2.5 font-mono uppercase tracking-wider text-mid text-[10px]">Finalitat</th>
                  <th className="text-left px-4 py-2.5 font-mono uppercase tracking-wider text-mid text-[10px]">Durada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-mono text-ink">sb-auth-token</td>
                  <td className="px-4 py-3 text-mid">Sessió d'autenticació de l'administrador (Supabase)</td>
                  <td className="px-4 py-3 text-mid">Sessió</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-ink">sb-refresh-token</td>
                  <td className="px-4 py-3 text-mid">Renovació automàtica de la sessió admin</td>
                  <td className="px-4 py-3 text-mid">7 dies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-mid">Aquestes cookies <strong>només s'activen</strong> quan un administrador accedeix a /admin.</p>
        </Section>
        <Section title="Cookies analítiques (Google Analytics)">
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-ink/5">
                <tr>
                  <th className="text-left px-4 py-2.5 font-mono uppercase tracking-wider text-mid text-[10px]">Cookie</th>
                  <th className="text-left px-4 py-2.5 font-mono uppercase tracking-wider text-mid text-[10px]">Finalitat</th>
                  <th className="text-left px-4 py-2.5 font-mono uppercase tracking-wider text-mid text-[10px]">Durada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 font-mono text-ink">_ga</td>
                  <td className="px-4 py-3 text-mid">Identifica sessions úniques (anònim)</td>
                  <td className="px-4 py-3 text-mid">2 anys</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-ink">_ga_HB6Y2XJ98P</td>
                  <td className="px-4 py-3 text-mid">Mesura el trànsit de la propietat GA4</td>
                  <td className="px-4 py-3 text-mid">2 anys</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-mid">Google Analytics recull dades <strong>anònimes</strong> sobre l'ús del web (pàgines visitades, temps, dispositiu). No permet identificar cap persona. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-accent hover:underline">Política de privacitat de Google</a>.</p>
        </Section>
        <Section title="Com gestionar les cookies">
          <p>Pots eliminar o bloquejar les cookies des del teu navegador:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              {nom:'Chrome', url:'https://support.google.com/chrome/answer/95647'},
              {nom:'Firefox', url:'https://support.mozilla.org/ca/kb/eliminar-les-galetes'},
              {nom:'Safari', url:'https://support.apple.com/ca-es/guide/safari/sfri11471/mac'},
              {nom:'Edge', url:'https://support.microsoft.com/ca-es/microsoft-edge/eliminar-cookies'},
            ].map(b => (
              <a key={b.nom} href={b.url} target="_blank" rel="noreferrer"
                className="text-xs font-semibold text-accent border border-accent/30 rounded px-3 py-1.5 hover:bg-accent/5 transition-colors">
                {b.nom}
              </a>
            ))}
          </div>
          <p className="text-xs text-mid mt-2">També pots optar per no ser seguit per Google Analytics instal·lant el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className="text-accent hover:underline">complement de inhabilitació de GA</a>.</p>
        </Section>
        <Section title="Contacte">
          <p>Per a qualsevol dubte: <a href="mailto:boocman@gmail.com" className="text-accent hover:underline">boocman@gmail.com</a></p>
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
