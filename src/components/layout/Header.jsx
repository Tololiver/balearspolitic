// src/components/layout/Header.jsx
export default function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Mesh gradient */}
      <div className="absolute inset-0" style={{
        background:`
          radial-gradient(ellipse at 0% 50%,   #008EFF 0%, transparent 50%),
          radial-gradient(ellipse at 38% 55%,  #43F8CC 0%, transparent 40%),
          radial-gradient(ellipse at 100% 0%,  #F8436F 0%, transparent 48%),
          radial-gradient(ellipse at 100% 85%, #FF5051 0%, transparent 42%),
          radial-gradient(ellipse at 65% 100%, #F2CC0F 0%, transparent 38%),
          #1a6fd4`
      }}/>
      <div className="absolute inset-0 bg-black/22"/>
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
        backgroundSize:'48px 48px'
      }}/>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Logo + subtítol */}
          <div>
            <h1 className="font-display text-4xl md:text-6xl font-black leading-none tracking-[-3px] drop-shadow-md">
              <span className="text-white">Balears</span>
              <span style={{color:'#43F8CC'}}>Politic</span>
            </h1>
          </div>

          {/* Stats parlament */}
          <div className="flex gap-5 flex-wrap">
            {[
              {n:'12',l:'Governs'},{n:'67',l:'Ajuntaments'},{n:'8',l:'Partits'},{n:'3',l:'Eleccions'},
            ].map(({n,l})=>(
              <div key={l} className="border-l border-white/25 pl-4">
                <div className="font-display text-2xl font-extrabold leading-none text-white drop-shadow">{n}</div>
                <div className="font-mono text-[9px] tracking-widest uppercase text-white/55 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Barra parlament */}
        <div className="mt-5">
          <div className="font-mono text-[9px] tracking-[2px] uppercase text-white/50 mb-1.5">XI Legislatura 2023 · 59 escons</div>
          <div className="flex h-1.5 rounded overflow-hidden">
            {[
              {color:'#0e2a6e',flex:25,label:'PP 25'},{color:'#b82012',flex:18,label:'PSIB 18'},
              {color:'#4a6600',flex:8,label:'Vox 8'},{color:'#1a5c30',flex:4,label:'Més 4'},
              {color:'#005448',flex:2,label:'MxMe 2'},{color:'#6b0f9e',flex:1,label:'Podem 1'},
              {color:'#4527a0',flex:1,label:'Sa Unió 1'},
            ].map(({color,flex,label})=>(
              <div key={label} title={label} style={{flex,background:color}}/>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-1.5">
            {[
              {color:'#0e2a6e',label:'PP: 25'},{color:'#b82012',label:'PSIB: 18'},
              {color:'#4a6600',label:'Vox: 8'},{color:'#1a5c30',label:'Més: 4'},
              {color:'#005448',label:'MxMe: 2'},{color:'#6b0f9e',label:'Podem: 1'},
              {color:'#4527a0',label:'Sa Unió: 1'},
            ].map(({color,label})=>(
              <span key={label} className="flex items-center gap-1.5 font-mono text-[9px] text-white/50">
                <span className="w-2 h-2 rounded-sm" style={{background:color}}/>{label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
