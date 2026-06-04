// src/admin/AdminGoverns.jsx — CRUD governs
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

function useGoverns() {
  return useQuery({
    queryKey: ['admin-governs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('governs').select('*').order('ordre')
      if (error) throw error
      return data
    },
  })
}

export default function AdminGoverns() {
  const { data: governs, isLoading } = useGoverns()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)

  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('governs').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-governs'] }); toast.success('Govern esborrat') },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Governs</h1>
          <p className="text-mid text-sm">{governs?.length || 0} governs de la democràcia balear</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90">
          + Nou govern
        </button>
      </div>

      {isLoading ? <div className="text-mid py-10 text-center">Carregant...</div> : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[30px_1fr_120px_100px_90px] text-[10px] font-mono uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-3">
            <div>#</div><div>Govern</div><div>Període</div><div>Partit</div><div>Accions</div>
          </div>
          {governs?.map(g => (
            <div key={g.id} className="grid grid-cols-[30px_1fr_120px_100px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-3 hover:bg-paper/50 text-sm">
              <div className="font-mono text-xs text-mid">{g.ordre}</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: g.color }} />
                <div>
                  <div className="font-semibold">{g.nom}</div>
                  <div className="text-xs text-mid">{g.president}</div>
                </div>
              </div>
              <div className="text-mid text-xs">{g.periode}</div>
              <div>
                <span className="font-mono text-[9px] font-bold text-white px-1.5 py-0.5 rounded"
                  style={{ background: g.color }}>
                  {g.parti_label?.split(' ')[0]}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(g.id)} className="text-xs text-pp hover:underline">Editar</button>
                <button onClick={() => window.confirm('Esborrar?') && del.mutate(g.id)} className="text-xs text-psib hover:underline">Esborrar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <GovernModal
          govern={editing !== 'new' ? governs?.find(g => g.id === editing) : null}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

function GovernModal({ govern: g, onClose }) {
  const qc = useQueryClient()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id:             g?.id,
      nom:            g?.nom || '',
      periode:        g?.periode || '',
      president:      g?.president || '',
      parti_codi:     g?.parti_codi || '',
      parti_label:    g?.parti_label || '',
      color:          g?.color || '#888888',
      coalicio:       g?.coalicio || '',
      context:        g?.context || '',
      ordre:          g?.ordre || '',
      vicepresidents: g ? (g.vicepresidents || []).join('\n') : '',
      consellers:     g ? (g.consellers || []).join('\n') : '',
      lleis:          g ? (g.lleis || []).join('\n') : '',
      fites:          g ? (g.fites || []).join('\n') : '',
    }
  })

  const save = useMutation({
    mutationFn: async (data) => {
      const toArr = (str) => str.split('\n').map(s => s.trim()).filter(Boolean)
      const payload = {
        ...data,
        ordre: parseInt(data.ordre) || null,
        vicepresidents: toArr(data.vicepresidents),
        consellers:     toArr(data.consellers),
        lleis:          toArr(data.lleis),
        fites:          toArr(data.fites),
      }
      const { error } = await supabase.from('governs').upsert(payload)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-governs'] }); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl font-black">{g ? `Editar: ${g.nom}` : 'Nou Govern'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit(d => save.mutate(d))} className="p-5 space-y-4">
          {g?.id && <input type="hidden" {...register('id')} />}

          <div className="grid grid-cols-2 gap-4">
            <F label="Nom del govern *" name="nom" register={register} required className="col-span-2" />
            <F label="Periode (ex: 2015–2019)" name="periode" register={register} required />
            <F label="Ordre cronològic" name="ordre" register={register} type="number" />
            <F label="President/a *" name="president" register={register} required />
            <F label="Codi partit (pp, psib...)" name="parti_codi" register={register} />
            <F label="Etiqueta partit (ex: PSIB–PSOE)" name="parti_label" register={register} />
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Color</label>
              <div className="flex gap-2 items-center">
                <input type="color" {...register('color')} className="w-10 h-9 rounded border border-border cursor-pointer" />
                <input {...register('color')} className="flex-1 text-sm border border-border rounded-lg px-3 py-2 font-mono focus:outline-none" />
              </div>
            </div>
          </div>

          <F label="Coalició / Suports" name="coalicio" register={register} className="" />

          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Context (text descriptiu)</label>
            <textarea {...register('context')} rows={3} className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none" />
          </div>

          {[
            { name:'vicepresidents', label:'Vicepresidents (un per línia)' },
            { name:'consellers',     label:'Consellers (un per línia, format: Nom · Conselleria)' },
            { name:'lleis',          label:'Lleis i mesures clau (una per línia)' },
            { name:'fites',          label:'Fites polítiques (una per línia)' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="text-xs font-semibold text-mid block mb-1">{label}</label>
              <textarea {...register(name)} rows={4}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-y focus:outline-none font-mono text-xs" />
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={save.isPending}
              className="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
              {save.isPending ? 'Desant...' : 'Desar'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg border border-border text-sm text-mid">Cancel·lar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function F({ label, name, register, type='text', required, className='' }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-mid block mb-1">{label}</label>
      <input type={type} {...register(name, { required })}
        className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
    </div>
  )
}
