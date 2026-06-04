export default function Footer() {
  return (
    <footer className="bg-ink text-white/30 py-6 px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="font-display text-lg font-black">
          Balears<em className="not-italic text-accent">Politic</em>
        </div>
        <div className="font-mono text-xs">
          Un projecte de Tolo Oliver · 2026
        </div>
        <div className="font-mono text-xs">
          Les posicions reflecteixen declaracions i actuacions públiques contrastades
        </div>
      </div>
    </footer>
  )
}
