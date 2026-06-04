// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-ink py-6 px-6 mt-auto border-t border-white/8">
      <div className="max-w-5xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="font-display text-lg font-black">
          <span className="text-white">Balears</span>
          <span style={{ color: '#43F8CC' }}>Politic</span>
        </div>
        <div className="font-mono text-xs text-white/35">
          Un projecte de Tolo Oliver · 2026
        </div>
        <div className="font-mono text-xs text-white/25">
          Les posicions reflecteixen declaracions i actuacions públiques contrastades
        </div>
      </div>
    </footer>
  )
}
