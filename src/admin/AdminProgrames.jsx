// src/admin/AdminProgrames.jsx — CRUD programes electorals
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

function useProgramesAdmin() {
  return useQuery({
    queryKey: ['admin-programes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programes_electorals')
        .select('*, partits(nom, color)')
        .order('any_eleccions', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

function usePartits() {
  return useQuery({
    queryKey: ['partits'],
    queryFn: async () => {
      const { data, error } = await supabase.from('partits').select('id, codi, nom, color').order('nom')
      if (error) throw error
      return data
    },
  })
}

const ANYS = [2023, 2019, 2015]

export default function AdminProgrames() {
  const { data: programes, isLoading } = useProgramesAdmin()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [anyFilter, setAnyFilter] = useState(null)

  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('programes_electorals').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-programes'] }); toast.success('Esborrat') },
    onError: (e) => toast.error(e.message),
  })

  const filtered = anyFilter ? programes?.filter(p => p.any_eleccions === anyFilter) : programes

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Programes Electorals</h1>
          <p className="text-mid text-sm">{programes?.length || 0} programes</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90">
          + Nou programa
        </button>
      </div>

      {/* Filtre per any */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setAnyFilter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${!anyFilter ? 'bg-ink text-white border-ink' : 'bg-white text-mid border-border'}`}>
          Tots
        </button>
        {ANYS.map(a => (
          <button key={a} onClick={() => setAnyFilter(a)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${anyFilter === a ? 'bg-ink text-white border-ink' : 'bg-white text-mid border-border'}`}>
            {a}
          </button>
        ))}
      </div>

      {isLoading ? <div className="text-mid py-10 text-center">Carregant...</div> : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[80px_1fr_80px_80px_80px_90px] text-[10px] font-mono uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-3">
            <div>Any</div><div>Partit</div><div>Governa</div><div>Compliment</div><div>Publicat</div><div>Accions</div>
          </div>
          {filtered?.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-mid">Cap programa trobat.</div>
          )}
          {filtered?.map(p => (
            <div key={p.id} className="grid grid-cols-[80px_1fr_80px_80px_80px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-3 hover:bg-paper/50 text-sm">
              <div className="font-mono font-bold text-ink">{p.any_eleccions}</div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: p.partits?.color || '#888' }} />
                <span className="font-semibold">{p.partits?.nom || p.parti_codi}</span>
              </div>
              <div>
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${p.va_governar ? 'bg-mes-bg text-mes' : 'bg-border text-mid'}`}>
                  {p.va_governar ? 'Sí' : 'No'}
                </span>
              </div>
              <div className="font-mono text-xs">{p.compliment_pct != null ? `${p.compliment_pct}%` : '—'}</div>
              <div>
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${p.publicat ? 'bg-mes-bg text-mes' : 'bg-border text-mid'}`}>
                  {p.publicat ? 'Sí' : 'No'}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(p.id)} className="text-xs text-pp hover:underline">Editar</button>
                <button onClick={() => window.confirm('Esborrar?') && del.mutate(p.id)} className="text-xs text-psib hover:underline">Esborrar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <ProgramaModal
          programa={editing !== 'new' ? programes?.find(p => p.id === editing) : null}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

function ProgramaModal({ programa: p, onClose }) {
  const qc = useQueryClient()
  const { data: partits } = usePartits()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id:             p?.id,
      any_eleccions:  p?.any_eleccions || 2023,
      parti_codi:     p?.parti_codi || '',
      va_governar:    p?.va_governar || false,
      publicat:       p?.publicat !== false,
      resum:          p?.resum || '',
      link_programa:  p?.link_programa || '',
      compliment_pct: p?.compliment_pct || '',
      promeses:       p ? (p.promeses || []).join('\n') : '',
      analisi:        p?.analisi || '',
    }
  })

  const save = useMutation({
    mutationFn: async (data) => {
      const payload = {
        ...data,
        any_eleccions:  parseInt(data.any_eleccions),
        compliment_pct: data.compliment_pct ? parseInt(data.compliment_pct) : null,
        promeses: data.promeses.split('\n').map(s => s.trim()).filter(Boolean),
      }
      const { error } = await supabase.from('programes_electorals').upsert(payload)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-programes'] }); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl font-black">{p ? 'Editar Programa' : 'Nou Programa'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit(d => save.mutate(d))} className="p-5 space-y-4">
          {p?.id && <input type="hidden" {...register('id')} />}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Any eleccions *</label>
              <select {...register('any_eleccions')} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none">
                {ANYS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Partit *</label>
              <select {...register('parti_codi')} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none">
                <option value="">Selecciona...</option>
                {partits?.map(pt => <option key={pt.id} value={pt.codi}>{pt.nom}</option>)}
              </select>
            </div>
            <F label="% Compliment (0-100)" name="compliment_pct" register={register} type="number" />
            <F label="Link al programa (URL)" name="link_programa" register={register} />
          </div>

          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Resum del programa</label>
            <textarea {...register('resum')} rows={3} className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Promeses principals (una per línia)</label>
            <textarea {...register('promeses')} rows={6}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-y focus:outline-none"
              placeholder="Primera promesa&#10;Segona promesa&#10;Tercera promesa" />
          </div>

          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Anàlisi del compliment</label>
            <textarea {...register('analisi')} rows={5}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-y focus:outline-none font-mono text-xs"
              placeholder="OK Promesa complerta&#10;NO Promesa incomplerta&#10;PENDENT En curs" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" {...register('va_governar')} className="rounded" />
              <span className="font-semibold">Va governar</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" {...register('publicat')} className="rounded" />
              <span className="font-semibold">Publicat</span>
            </label>
          </div>

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
