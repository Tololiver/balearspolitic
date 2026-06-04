// src/admin/AdminHome.jsx — CMS per a la pàgina d'inici
import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

function useConfig() {
  return useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      const { data, error } = await supabase.from('config').select('*')
      if (error) throw error
      return Object.fromEntries(data.map(r => [r.clau, r.valor]))
    },
  })
}

function useSaveConfig() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (values) => {
      const rows = Object.entries(values).map(([clau, valor]) => ({ clau, valor }))
      const { error } = await supabase.from('config').upsert(rows, { onConflict: 'clau' })
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['config'] })
      toast.success('Home desada!')
    },
    onError: (e) => toast.error(e.message),
  })
}

const COLORS = [
  { label:'PP Blau',   val:'#0e2a6e' },
  { label:'PSIB Vermell', val:'#b82012' },
  { label:'Més Verd',  val:'#1a5c30' },
  { label:'Accent',    val:'#c8300a' },
  { label:'Negre',     val:'#0c0c12' },
]

export default function AdminHome() {
  const { data: cfg, isLoading } = useConfig()
  const save = useSaveConfig()
  const { register, handleSubmit, reset, watch } = useForm()

  useEffect(() => {
    if (cfg) reset(cfg)
  }, [cfg, reset])

  if (isLoading) return <div className="p-8 text-mid">Carregant...</div>

  const bannerColor = watch('banner_color') || '#0e2a6e'
  const bannerText  = watch('banner_text') || ''
  const bannerLink  = watch('banner_link') || ''
  const bannerActiu = watch('banner_actiu') === 'true'

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-black">Pàgina d'Inici</h1>
        <p className="text-mid text-sm">Edita el text d'introducció i el banner.</p>
      </div>

      <form onSubmit={handleSubmit(d => save.mutate(d))} className="space-y-6">

        {/* Bloc d'introducció */}
        <div className="bg-white rounded-card border border-border p-5">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold mb-4">Bloc d'Introducció</div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Títol</label>
              <input {...register('home_titol')}
                className="w-full text-sm font-display font-bold border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Text d'introducció</label>
              <textarea {...register('home_intro')} rows={4}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid resize-none" />
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="bg-white rounded-card border border-border p-5">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold mb-4">Banner Intern</div>

          {/* Preview */}
          <div className="rounded-lg overflow-hidden mb-4" style={{ background: bannerColor }}>
            <div className="px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-5 bg-white/30 rounded-full flex-shrink-0" />
                <span className="text-white text-xs font-semibold">{bannerText || 'Text del banner...'}</span>
              </div>
              <span className="text-white/60 text-[10px] font-mono whitespace-nowrap">
                {bannerLink || '/ruta'} →
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Text del banner</label>
              <input {...register('banner_text')}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Enllaç intern (ex: /eleccions-2027)</label>
              <input {...register('banner_link')}
                className="w-full text-sm font-mono border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-2">Color del banner</label>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(c => (
                  <label key={c.val} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" {...register('banner_color')} value={c.val} className="sr-only" />
                    <div className="w-6 h-6 rounded border-2 transition-all"
                      style={{ background: c.val, borderColor: bannerColor === c.val ? '#fff' : 'transparent',
                        boxShadow: bannerColor === c.val ? `0 0 0 2px ${c.val}` : 'none' }} />
                    <span className="text-xs text-mid">{c.label}</span>
                  </label>
                ))}
                <div className="flex items-center gap-1.5">
                  <input type="color" {...register('banner_color')}
                    className="w-6 h-6 rounded cursor-pointer border border-border" />
                  <span className="text-xs text-mid">Altre color</span>
                </div>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox"
                  {...register('banner_actiu')}
                  checked={bannerActiu}
                  onChange={e => {
                    const input = document.querySelector('[name="banner_actiu"]')
                    if (input) input.value = e.target.checked ? 'true' : 'false'
                  }}
                  className="rounded" />
                <span className="font-semibold">Banner actiu</span>
                <span className="text-xs text-mid">(visible a la home)</span>
              </label>
              <input type="hidden" {...register('banner_actiu')} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={save.isPending}
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold text-sm hover:bg-accent/90 disabled:opacity-50">
          {save.isPending ? 'Desant...' : 'Desar canvis de la home'}
        </button>
      </form>
    </div>
  )
}
