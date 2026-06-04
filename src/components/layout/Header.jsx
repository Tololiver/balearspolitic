// src/components/layout/Header.jsx
export default function Header() {
  return (
    <header className="relative overflow-hidden">

      {/* ── Mesh gradient background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 0% 50%, #008EFF 0%, transparent 55%),
            radial-gradient(ellipse at 40% 60%, #43F8CC 0%, transparent 45%),
            radial-gradient(ellipse at 100% 0%,  #F8436F 0%, transparent 50%),
            radial-gradient(ellipse at 100% 80%, #FF5051 0%, transparent 45%),
            radial-gradient(ellipse at 60% 100%,  #F2CC0F 0%, transparent 40%),
            #008EFF
          `
        }}
      />

      {/* ── Dark scrim for text readability ── */}
      <div className="absolute inset-0 bg-black/35" />

      {/* ── Grid texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-14">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-px bg-white/60" />
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-white/70">
            Eina d'Anàlisi Política · Illes Balears · 2015–2026
          </span>
        </div>

        {/* Title + Stats */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            {/* Logo placeholder — substituir per <img> quan arribi el logotip */}
            <h1 className="font-display text-5xl md:text-7xl font-black leading-none tracking-[-3px] mb-3 drop-shadow-sm">
              <span className="text-white">Balears</span>
              <span
                className="italic"
                style={{ color: '#43F8CC' }}
              >
                Politic
              </span>
            </h1>
            <p className="text-sm text-white/80 font-light max-w-md leading-relaxed drop-shadow-sm">
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
              <div key={l} className="border-l border-white/25 pl-4">
                <div className="font-display text-3xl font-extrabold leading-none text-white drop-shadow-sm">{n}</div>
                <div className="font-mono text-[9px] tracking-widest uppercase text-white/60 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Parliament bar */}
        <div className="mt-8">
          <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/50 mb-2">
            XI Legislatura 2023 · 59 escons
          </div>
          <div className="flex h-2 rounded overflow-hidden shadow-sm">
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
              <span key={label} className="flex items-center gap-1.5 font-mono text-[10px] text-white/55">
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
