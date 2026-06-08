// src/admin/AdminPartits.jsx — CRUD partits + logo upload
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { Upload } from 'lucide-react'

function usePartitsAdmin() {
  return useQuery({
    queryKey: ['admin-partits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partits')
        .select('*')
        .order('nom')
      if (error) throw error
      return data
    },
  })
}

export default function AdminPartits() {
  const { data: partits, isLoading } = usePartitsAdmin()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)

  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('partits').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-partits'] }); toast.success('Partit esborrat') },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Partits</h1>
          <p className="text-mid text-sm">{partits?.length || 0} partits</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90">
          + Nou partit
        </button>
      </div>

      {isLoading ? <div className="text-mid py-10 text-center">Carregant...</div> : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[40px_1fr_100px_80px_90px] text-[10px] font-mono uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-3">
            <div>Logo</div><div>Nom</div><div>Sigles</div><div>Color</div><div>Accions</div>
          </div>
          {partits?.map(p => (
            <div key={p.id} className="grid grid-cols-[40px_1fr_100px_80px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-3 hover:bg-paper/50 text-sm">
              <div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ background: p.color || '#888' }}>
                  {p.logo_url
                    ? <img src={p.logo_url} alt={p.sigles} className="w-6 h-6 object-contain"/>
                    : <span className="text-white font-black text-[10px]">{p.sigles?.slice(0,2)}</span>
                  }
                </div>
              </div>
              <div className="font-semibold">{p.nom}</div>
              <div className="font-mono text-xs text-mid">{p.sigles}</div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm" style={{ background: p.color || '#888' }}/>
                <span className="font-mono text-[10px] text-mid">{p.color}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(p.id)} className="text-xs text-pp hover:underline">Editar</button>
                <button onClick={() => window.confirm(`Esborrar ${p.nom}?`) && del.mutate(p.id)} className="text-xs text-psib hover:underline">Esborrar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <PartitModal
          partit={editing !== 'new' ? partits?.find(p => p.id === editing) : null}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

function PartitModal({ partit, onClose }) {
  const qc = useQueryClient()
  const [logoUploading, setLogoUploading] = useState(false)

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      id:           partit?.id,
      nom:          partit?.nom || '',
      sigles:       partit?.sigles || '',
      color:        partit?.color || '#888888',
      bg_color:     partit?.bg_color || '#f5f5f5',
      ideologia:    partit?.ideologia || '',
      descripcio:   partit?.descripcio || '',
      web:          partit?.web || '',
      logo_url:     partit?.logo_url || '',
      escons_2023:  partit?.escons_2023 || '',
      escons_2019:  partit?.escons_2019 || '',
      escons_2015:  partit?.escons_2015 || '',
      pct_2023:     partit?.pct_2023 || '',
      pct_2019:     partit?.pct_2019 || '',
      pct_2015:     partit?.pct_2015 || '',
      posicions:    partit ? JSON.stringify(partit.posicions || {}, null, 2) : JSON.stringify({
        habitatge: '',
        turisme: '',
        llengua: '',
        economia: '',
        medi_ambient: '',
        immigracio: '',
      }, null, 2),
    }
  })

  const color    = watch('color')
  const logoUrl  = watch('logo_url')

  // Upload logo
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}_${file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const { error } = await supabase.storage.from('partits-logos').upload(path, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('partits-logos').getPublicUrl(path)
      setValue('logo_url', publicUrl)
      toast.success('Logo pujat!')
    } catch (err) {
      toast.error('Error: ' + err.message)
    } finally {
      setLogoUploading(false)
    }
  }

  const save = useMutation({
    mutationFn: async (data) => {
      let posicions = {}
      try { posicions = JSON.parse(data.posicions) }
      catch { toast.error('JSON de posicions invàlid'); throw new Error('JSON invàlid') }
      const payload = {
        ...data,
        posicions,
        escons_2023: data.escons_2023 ? parseInt(data.escons_2023) : null,
        escons_2019: data.escons_2019 ? parseInt(data.escons_2019) : null,
        escons_2015: data.escons_2015 ? parseInt(data.escons_2015) : null,
      }
      const { error } = await supabase.from('partits').upsert(payload)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-partits'] }); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl font-black">{partit ? `Editar: ${partit.nom}` : 'Nou Partit'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit(d => save.mutate(d))} className="p-5 space-y-5">
          {partit?.id && <input type="hidden" {...register('id')} />}

          {/* Nom + Sigles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Nom complet *</label>
              <input {...register('nom', { required: true })}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Sigles</label>
              <input {...register('sigles')}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Color principal</label>
              <div className="flex gap-2 items-center">
                <input type="color" {...register('color')}
                  className="w-10 h-9 rounded border border-border cursor-pointer" />
                <input {...register('color')}
                  className="flex-1 text-sm border border-border rounded-lg px-3 py-2 font-mono focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Color de fons (bg)</label>
              <div className="flex gap-2 items-center">
                <input type="color" {...register('bg_color')}
                  className="w-10 h-9 rounded border border-border cursor-pointer" />
                <input {...register('bg_color')}
                  className="flex-1 text-sm border border-border rounded-lg px-3 py-2 font-mono focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="bg-paper rounded-lg border border-border p-4">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold mb-3">Logo del partit</div>
            <div className="flex gap-4 items-center">
              {/* Preview */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: color || '#888' }}>
                {logoUrl
                  ? <img src={logoUrl} alt="logo" className="w-10 h-10 object-contain" />
                  : <span className="text-white font-black text-lg">{watch('sigles')?.slice(0, 2)}</span>
                }
              </div>
              <div className="flex-1 space-y-2">
                <input {...register('logo_url')} placeholder="URL del logo..."
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white" />
                <label className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border border-border cursor-pointer hover:bg-white transition-colors ${logoUploading ? 'opacity-50' : ''}`}>
                  <Upload size={13} strokeWidth={1.5} />
                  {logoUploading ? 'Pujant...' : 'Pujar logo (PNG/SVG blanc)'}
                  <input type="file" accept="image/*,.svg" className="hidden"
                    onChange={handleLogoUpload} disabled={logoUploading} />
                </label>
                <div className="text-[10px] text-mid">Millor: SVG o PNG amb fons transparent, versió blanca. Es mostrarà sobre el color del partit.</div>
              </div>
            </div>
          </div>

          {/* Ideologia + Web */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Ideologia</label>
              <input {...register('ideologia')} placeholder="Conservador, Socialdemòcrata..."
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Web oficial</label>
              <input {...register('web')} placeholder="https://..."
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
          </div>

          {/* Descripció */}
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Descripció</label>
            <textarea {...register('descripcio')} rows={3}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none" />
          </div>

          {/* Resultats electorals */}
          <div className="bg-paper rounded-lg border border-border p-4">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold mb-3">Resultats electorals</div>
            <div className="grid grid-cols-3 gap-3">
              {[2023, 2019, 2015].map(any => (
                <div key={any} className="space-y-2">
                  <div className="font-mono text-[10px] font-bold text-mid text-center">{any}</div>
                  <input type="number" {...register(`escons_${any}`)} placeholder="Escons"
                    className="w-full text-sm text-center border border-border rounded-lg px-2 py-1.5 focus:outline-none bg-white" />
                  <input {...register(`pct_${any}`)} placeholder="% vots"
                    className="w-full text-sm text-center border border-border rounded-lg px-2 py-1.5 focus:outline-none bg-white font-mono" />
                </div>
              ))}
            </div>
          </div>

          {/* Posicions */}
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">
              Posicions polítiques (JSON)
            </label>
            <textarea {...register('posicions')} rows={10}
              className="w-full text-xs font-mono border border-border rounded-lg px-3 py-2 resize-y focus:outline-none"
              placeholder='{"habitatge":"...","turisme":"...","llengua":"..."}' />
            <div className="text-[10px] text-mid mt-1">Claus: habitatge, turisme, llengua, economia, medi_ambient, immigracio</div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={save.isPending}
              className="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
              {save.isPending ? 'Desant...' : 'Desar'}
            </button>
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-border text-sm text-mid">
              Cancel·lar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
