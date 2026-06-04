// src/components/layout/Header.jsx
export default function Header() {
  return (
    <header className="bg-ink text-white relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(circle at 80% 20%, rgba(200,48,10,0.12) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(circle at 15% 80%, rgba(14,42,110,0.15) 0%, transparent 50%)' }} />
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(rgba(246,243,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(246,243,238,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-14">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-px bg-accent" />
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-white/30">
            Eina d'Anàlisi Política · Illes Balears · 2015–2026
          </span>
        </div>

        {/* Title + Stats */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-none tracking-[-3px] mb-3">
              Balears<em className="not-italic text-accent">Politic</em>
            </h1>
            <p className="text-sm text-white/45 font-light max-w-md leading-relaxed">
              Governs, partits, municipis i programes electorals de les Illes Balears
              des del 1983 fins avui.
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 flex-wrap">
            {[
              { n: '12', l: 'Governs' },
              { n: '67', l: 'Municipis' },
              { n: '8',  l: 'Partits' },
              { n: '3',  l: 'Eleccions' },
            ].map(({ n, l }) => (
              <div key={l} className="border-l border-white/10 pl-4">
                <div className="font-display text-3xl font-extrabold leading-none">{n}</div>
                <div className="font-mono text-[9px] tracking-widest uppercase text-white/30 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Parliament bar */}
        <div className="mt-8">
          <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/25 mb-2">
            XI Legislatura 2023 · 59 escons
          </div>
          <div className="flex h-2 rounded overflow-hidden">
            {[
              { color: '#0e2a6e', flex: 25, label: 'PP 25' },
              { color: '#b82012', flex: 18, label: 'PSIB 18' },
              { color: '#4a6600', flex: 8,  label: 'Vox 8' },
              { color: '#1a5c30', flex: 4,  label: 'Més 4' },
              { color: '#005448', flex: 2,  label: 'MxMe 2' },
              { color: '#6b0f9e', flex: 1,  label: 'Podem 1' },
              { color: '#4527a0', flex: 1,  label: 'Sa Unió 1' },
            ].map(({ color, flex, label }) => (
              <div key={label} title={label} style={{ flex, background: color }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {[
              { color: '#0e2a6e', label: 'PP: 25' },
              { color: '#b82012', label: 'PSIB: 18' },
              { color: '#4a6600', label: 'Vox: 8' },
              { color: '#1a5c30', label: 'Més: 4' },
              { color: '#005448', label: 'MxMe: 2' },
              { color: '#6b0f9e', label: 'Podem: 1' },
              { color: '#4527a0', label: 'Sa Unió: 1' },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
