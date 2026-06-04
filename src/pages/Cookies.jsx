// src/pages/Cookies.jsx
export default function Cookies() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-2">BalearsPolitic</div>
      <h1 className="font-display text-4xl font-black text-ink mb-8">Política de Cookies</h1>

      <div className="space-y-8">
        <Section title="Quines cookies utilitza BalearsPolitic?">
          <div className="bg-mes-bg border border-mes/20 rounded-lg p-4">
            <div className="font-semibold text-mes text-sm mb-1">✓ Sense cookies de seguiment ni publicitat</div>
            <p className="text-sm text-mes/80">BalearsPolitic no utilitza Google Analytics, Facebook Pixel, ni cap eina de seguiment. La teva navegació és completament privada.</p>
          </div>
        </Section>

        <Section title="Cookies tècniques (estrictament necessàries)">
          <p>Únicament utilitzem cookies tècniques necessàries per al funcionament del web:</p>
          <div className="bg-white border border-border rounded-lg overflow-hidden mt-3">
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
          <p className="mt-3 text-xs text-mid">Aquestes cookies <strong>només s'activen</strong> quan un administrador accedeix a l'àrea privada (/admin). Els usuaris generals no reben cap cookie.</p>
        </Section>

        <Section title="Com gestionar les cookies">
          <p>Pots eliminar les cookies des de la configuració del teu navegador. Aquí tens els enllaços de cada navegador principal:</p>
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
        </Section>

        <Section title="Canvis en aquesta política">
          <p>Qualsevol canvi en l'ús de cookies es comunicarà actualitzant aquesta pàgina. Donat que BalearsPolitic no utilitza cookies de seguiment, és poc probable que hi hagi canvis significatius.</p>
        </Section>

        <Section title="Contacte">
          <p>Per a qualsevol dubte sobre cookies o privacitat: <a href="mailto:hola@balearspolitic.cat" className="text-accent hover:underline">hola@balearspolitic.cat</a></p>
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
