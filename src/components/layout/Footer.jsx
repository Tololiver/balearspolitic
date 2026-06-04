// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink mt-auto border-t border-white/8">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Logo + desc */}
          <div>
            <div className="font-display text-xl font-black mb-2">
              <span className="text-white">Balears</span>
              <span style={{color:'#43F8CC'}}>Politic</span>
            </div>
            <p className="text-xs text-white/35 max-w-xs leading-relaxed">
              Eina d'anàlisi política de les Illes Balears. Dades públiques i verificades.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div>
              <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/25 mb-2">Seccions</div>
              <div className="space-y-1.5">
                {[
                  {to:'/partits',       l:'Fitxes de Partits'},
                  {to:'/ajuntaments',   l:'Ajuntaments'},
                  {to:'/governs',       l:'Governs'},
                  {to:'/eleccions-2027',l:'Eleccions 2027'},
                  {to:'/blog',          l:'Blog'},
                ].map(({to,l}) => (
                  <div key={to}><Link to={to} className="text-xs text-white/40 hover:text-white/70 transition-colors">{l}</Link></div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/25 mb-2">Legal</div>
              <div className="space-y-1.5">
                {[
                  {to:'/avis-legal',  l:'Avís Legal'},
                  {to:'/privacitat',  l:'Privacitat'},
                  {to:'/cookies',     l:'Cookies'},
                  {to:'/fonts',       l:'Fonts i metodologia'},
                ].map(({to,l}) => (
                  <div key={to}><Link to={to} className="text-xs text-white/40 hover:text-white/70 transition-colors">{l}</Link></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="font-mono text-[10px] text-white/25">
            Un projecte de Tolo Oliver · 2026
          </div>
          <div className="font-mono text-[10px] text-white/20">
            Les posicions reflecteixen declaracions i actuacions públiques contrastades
          </div>
        </div>
      </div>
    </footer>
  )
}
