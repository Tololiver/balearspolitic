// src/admin/AdminPobles.jsx — CRUD municipis
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

function usePobles() {
  return useQuery({
    queryKey: ['admin-pobles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('municipis').select('*').order('nom')
      if (error) throw error
      return data
    },
  })
}

const ILLES = ['Mallorca','Menorca','Eivissa','Formentera']
const PARTITS_COLORS = { pp:'#0e2a6e', psib:'#b82012', mes:'#1a5c30', vox:'#4a6600', podem:'#6b0f9e', mxme:'#005448', elpi:'#bf5c00', saunio:'#4527a0' }

export default function AdminPobles() {
  const { data: pobles, isLoading } = usePobles()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState('')

  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('municipis').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-pobles'] }); toast.success('Municipi esborrat') },
    onError: (e) => toast.error(e.message),
  })

  const filtered = pobles?.filter(p =>
    !filter || p.nom.toLowerCase().includes(filter.toLowerCase()) || p.illa?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Municipis</h1>
          <p className="text-mid text-sm">{pobles?.length || 0} municipis</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90">
          + Nou municipi
        </button>
      </div>

      <input value={filter} onChange={e => setFilter(e.target.value)}
        placeholder="Cerca per nom o illa..."
        className="w-full max-w-sm px-3 py-2 text-sm border border-border rounded-lg mb-4 focus:outline-none" />

      {isLoading ? <div className="text-mid py-10 text-center">Carregant...</div> : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[1fr_90px_140px_80px_90px] text-[10px] font-mono uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-3">
            <div>Nom</div><div>Illa</div><div>Alcalde</div><div>Governa</div><div>Accions</div>
          </div>
          {filtered?.map(p => (
            <div key={p.id} className="grid grid-cols-[1fr_90px_140px_80px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-3 hover:bg-paper/50 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: p.color_govern || '#888' }} />
                <span className="font-semibold">{p.nom}</span>
              </div>
              <div className="text-mid text-xs">{p.illa}</div>
              <div className="text-mid text-xs truncate">{p.alcalde}</div>
              <div>
                <span className="font-mono text-[9px] font-bold text-white px-1.5 py-0.5 rounded"
                  style={{ background: PARTITS_COLORS[p.govern_parti] || '#888' }}>
                  {p.govern_parti?.toUpperCase()}
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
        <PoblaModal
          poble={editing !== 'new' ? pobles?.find(p => p.id === editing) : null}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

function PoblaModal({ poble, onClose }) {
  const qc = useQueryClient()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id:             poble?.id,
      nom:            poble?.nom || '',
      illa:           poble?.illa || 'Mallorca',
      poblacio:       poble?.poblacio || '',
      alcalde:        poble?.alcalde || '',
      alcalde_parti:  poble?.alcalde_parti || '',
      govern_parti:   poble?.govern_parti || '',
      color_govern:   poble?.color_govern || '#0e2a6e',
      total_regidors: poble?.total_regidors || '',
      context:        poble?.context || '',
      notes:          poble?.notes || '',
      regidors:       poble ? JSON.stringify(poble.regidors || [], null, 2) : '[\n  {"p":"PP","n":8,"color":"#0e2a6e"},\n  {"p":"PSIB","n":6,"color":"#b82012"}\n]',
    }
  })

  const save = useMutation({
    mutationFn: async (data) => {
      let regidors = []
      try { regidors = JSON.parse(data.regidors) } catch { toast.error('JSON de regidors invàlid'); throw new Error('JSON invàlid') }
      const payload = { ...data, regidors, poblacio: parseInt(data.poblacio) || null, total_regidors: parseInt(data.total_regidors) || null }
      const { error } = await supabase.from('municipis').upsert(payload)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-pobles'] }); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="font-display text-xl font-black">{poble ? `Editar: ${poble.nom}` : 'Nou Municipi'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit(d => save.mutate(d))} className="p-5 space-y-4">
          {poble?.id && <input type="hidden" {...register('id')} />}
          <div className="grid grid-cols-2 gap-4">
            <F label="Nom *" name="nom" register={register} required />
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Illa</label>
              <select {...register('illa')} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none">
                {ILLES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <F label="Població (habitants)" name="poblacio" register={register} type="number" />
            <F label="Total regidors" name="total_regidors" register={register} type="number" />
            <F label="Alcalde/essa" name="alcalde" register={register} className="col-span-2" />
            <F label="Codi alcalde parti (pp, psib...)" name="alcalde_parti" register={register} />
            <F label="Codi govern parti (pp, psib...)" name="govern_parti" register={register} />
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Color govern (hex)</label>
              <div className="flex gap-2 items-center">
                <input type="color" {...register('color_govern')} className="w-10 h-9 rounded border border-border cursor-pointer" />
                <input {...register('color_govern')} className="flex-1 text-sm border border-border rounded-lg px-3 py-2 font-mono focus:outline-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Context / Notes</label>
            <textarea {...register('context')} rows={2} className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Regidors (JSON)</label>
            <textarea {...register('regidors')} rows={6}
              className="w-full text-xs font-mono border border-border rounded-lg px-3 py-2 resize-y focus:outline-none"
              placeholder='[{"p":"PP","n":8,"color":"#0e2a6e"},{"p":"PSIB","n":6,"color":"#b82012"}]' />
            <div className="text-[10px] text-mid mt-1">Format: array JSON amb camps p (nom), n (escons), color (hex)</div>
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
