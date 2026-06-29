// src/admin/AdminClippingConfig.jsx
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Plus, Trash2, Globe, Key, Settings } from 'lucide-react'

function useConfig() {
  return useQuery({
    queryKey: ['clipping-config'],
    queryFn: async () => {
      const { data, error } = await supabase.from('clipping_config').select('*').limit(1).single()
      if (error) throw error
      return data
    },
  })
}

export default function AdminClippingConfig() {
  const qc = useQueryClient()
  const { data: cfg, isLoading } = useConfig()
  const [fonts, setFonts] = useState([])
  const [paraules, setParaules] = useState([])
  const [prompt, setPrompt] = useState('')
  const [hora, setHora] = useState('07:00')
  const [actiu, setActiu] = useState(true)
  const [novaParaula, setNovaParaula] = useState('')

  useEffect(() => {
    if (cfg) {
      setFonts(cfg.fonts || [])
      setParaules(cfg.paraules_clau || [])
      setPrompt(cfg.prompt_ia || '')
      setHora(cfg.hora_execucio || '07:00')
      setActiu(cfg.actiu ?? true)
    }
  }, [cfg])

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('clipping_config')
        .update({ fonts, paraules_clau: paraules, prompt_ia: prompt, hora_execucio: hora, actiu, updated_at: new Date().toISOString() })
        .eq('id', cfg.id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['clipping-config'] }); toast.success('Configuració desada!') },
    onError: (e) => toast.error(e.message),
  })

  const addFont = () => setFonts(prev => [...prev, { nom: '', url: '', activa: true, llengua: 'ca' }])
  const updateFont = (i, field, val) => setFonts(prev => prev.map((f, idx) => idx === i ? { ...f, [field]: val } : f))
  const removeFont = (i) => setFonts(prev => prev.filter((_, idx) => idx !== i))

  const addParaula = () => {
    if (!novaParaula.trim()) return
    setParaules(prev => [...prev, novaParaula.trim()])
    setNovaParaula('')
  }

  if (isLoading) return <div className="p-8 text-mid">Carregant...</div>

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Configuració Clipping</h1>
          <p className="text-mid text-sm">Fonts RSS, paraules clau i prompt de la IA</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <input type="checkbox" checked={actiu} onChange={e => setActiu(e.target.checked)} className="rounded"/>
            Sistema actiu
          </label>
          <button onClick={() => save.mutate()} disabled={save.isPending}
            className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
            {save.isPending ? 'Desant...' : 'Desar tot'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Fonts RSS */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Globe size={14} strokeWidth={1.5} className="text-mid"/>
            <h2 className="font-display text-lg font-bold">Fonts RSS</h2>
            <button onClick={addFont}
              className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-accent">
              <Plus size={12} strokeWidth={1.5}/> Afegir
            </button>
          </div>
          <div className="p-5 space-y-3">
            {fonts.map((f, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_80px_60px_32px] gap-2 items-center">
                <input value={f.nom} onChange={e => updateFont(i, 'nom', e.target.value)}
                  placeholder="Nom del diari"
                  className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none"/>
                <input value={f.url} onChange={e => updateFont(i, 'url', e.target.value)}
                  placeholder="https://...rss.xml"
                  className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none font-mono text-xs"/>
                <select value={f.llengua} onChange={e => updateFont(i, 'llengua', e.target.value)}
                  className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none bg-white">
                  <option value="ca">Català</option>
                  <option value="es">Castellà</option>
                </select>
                <label className="flex items-center gap-1.5 text-xs cursor-pointer justify-center">
                  <input type="checkbox" checked={f.activa} onChange={e => updateFont(i, 'activa', e.target.checked)}/>
                  Activa
                </label>
                <button onClick={() => removeFont(i)} className="text-mid hover:text-psib justify-center flex">
                  <Trash2 size={13} strokeWidth={1.5}/>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Paraules clau */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Key size={14} strokeWidth={1.5} className="text-mid"/>
            <h2 className="font-display text-lg font-bold">Paraules clau</h2>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-4">
              {paraules.map((p, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-paper border border-border rounded-full px-3 py-1 text-xs font-mono">
                  {p}
                  <button onClick={() => setParaules(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-mid hover:text-psib">
                    <X size={10}/>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={novaParaula} onChange={e => setNovaParaula(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addParaula()}
                placeholder="Nova paraula clau..."
                className="flex-1 text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
              <button onClick={addParaula}
                className="flex items-center gap-1.5 px-3 py-2 bg-ink text-white rounded-lg text-sm font-semibold">
                <Plus size={13} strokeWidth={1.5}/> Afegir
              </button>
            </div>
          </div>
        </div>

        {/* Prompt IA */}
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Settings size={14} strokeWidth={1.5} className="text-mid"/>
            <h2 className="font-display text-lg font-bold">Prompt de la IA</h2>
          </div>
          <div className="p-5">
            <div className="text-xs text-mid mb-2">Instruccions que rep Claude per a cada notícia. Ha de respondre en JSON amb els camps: rellevant, categoria, resum.</div>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
              rows={6} className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-y focus:outline-none font-mono text-xs"/>
          </div>
        </div>

        {/* Hora execució */}
        <div className="bg-white rounded-card border border-border p-5 shadow-card">
          <div className="font-semibold text-sm mb-2">Hora d'execució automàtica (UTC)</div>
          <input type="time" value={hora} onChange={e => setHora(e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
          <div className="text-xs text-mid mt-1">07:00 UTC = 08:00 hora peninsular (hivern) / 09:00 (estiu)</div>
        </div>
      </div>
    </div>
  )
}

// X icon inline
function X({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  )
}
