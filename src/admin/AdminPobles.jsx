// src/admin/AdminPobles.jsx — amb opció de pacte
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
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
const PARTITS_COLORS = {pp:'#0e2a6e',psib:'#b82012',mes:'#1a5c30',vox:'#4a6600',podem:'#6b0f9e',mxme:'#005448',elpi:'#bf5c00',saunio:'#4527a0'}

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
    onSuccess: () => { qc.invalidateQueries({queryKey:['admin-pobles']}); toast.success('Municipi esborrat') },
    onError: (e) => toast.error(e.message),
  })

  const filtered = pobles?.filter(p =>
    !filter || p.nom.toLowerCase().includes(filter.toLowerCase()) || p.illa?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Ajuntaments</h1>
          <p className="text-mid text-sm">{pobles?.length||0} municipis</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90">
          + Nou ajuntament
        </button>
      </div>

      <input value={filter} onChange={e => setFilter(e.target.value)}
        placeholder="Cerca per nom o illa..."
        className="w-full max-w-sm px-3 py-2 text-sm border border-border rounded-lg mb-4 focus:outline-none"/>

      {isLoading ? <div className="text-mid py-10 text-center">Carregant...</div> : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[1fr_90px_150px_80px_80px_90px] text-[10px] font-mono uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-3">
            <div>Nom</div><div>Illa</div><div>Alcalde/essa</div><div>Governa</div><div>Pacte</div><div>Accions</div>
          </div>
          {filtered?.map(p => (
            <div key={p.id} className="grid grid-cols-[1fr_90px_150px_80px_80px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-3 hover:bg-paper/50 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{background:p.color_govern||'#888'}}/>
                <span className="font-semibold">{p.nom}</span>
              </div>
              <div className="text-mid text-xs">{p.illa}</div>
              <div className="text-mid text-xs truncate">{p.alcalde}</div>
              <div>
                <span className="font-mono text-[9px] font-bold text-white px-1.5 py-0.5 rounded"
                  style={{background:PARTITS_COLORS[p.govern_parti]||'#888'}}>
                  {p.govern_parti?.toUpperCase()}
                </span>
              </div>
              <div>
                {p.es_pacte
                  ? <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Pacte</span>
                  : <span className="text-[10px] text-mid">—</span>
                }
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(p.id)} className="text-xs text-pp hover:underline">Editar</button>
                <button onClick={() => window.confirm('Esborrar?')&&del.mutate(p.id)} className="text-xs text-psib hover:underline">Esborrar</button>
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

// ── Editor de batlles (per a pactes) ─────────────────────────
function BatllesEditor({ batlles, onChange }) {
  const add = () => onChange([...batlles, {nom:'',parti:'',data_possessio:'',anys:''}])
  const remove = (i) => onChange(batlles.filter((_,idx) => idx !== i))
  const update = (i, field, val) => onChange(batlles.map((b,idx) => idx===i ? {...b,[field]:val} : b))

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-mid">Batlles del pacte (fins a 3)</label>
        {batlles.length < 3 && (
          <button type="button" onClick={add}
            className="text-xs font-semibold text-accent hover:underline">+ Afegir batle/essa</button>
        )}
      </div>
      <div className="space-y-2">
        {batlles.map((b, i) => (
          <div key={i} className="bg-white rounded-lg border border-border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-mid font-bold">Batle/essa {i+1}</span>
              <button type="button" onClick={() => remove(i)} className="text-mid hover:text-psib text-xs">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input value={b.nom} onChange={e => update(i,'nom',e.target.value)}
                placeholder="Nom i cognoms"
                className="text-xs border border-border rounded px-2 py-1.5 focus:outline-none col-span-2"/>
              <input value={b.parti} onChange={e => update(i,'parti',e.target.value)}
                placeholder="Partit (pp, psib...)"
                className="text-xs border border-border rounded px-2 py-1.5 focus:outline-none"/>
              <input value={b.anys} onChange={e => update(i,'anys',e.target.value)}
                placeholder="Anys (ex: 2023–2025)"
                className="text-xs border border-border rounded px-2 py-1.5 focus:outline-none"/>
              <div className="col-span-2">
                <label className="text-[10px] text-mid block mb-1">Data de presa de possessió</label>
                <input type="date" value={b.data_possessio} onChange={e => update(i,'data_possessio',e.target.value)}
                  className="w-full text-xs border border-border rounded px-2 py-1.5 focus:outline-none"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PoblaModal({ poble, onClose }) {
  const qc = useQueryClient()
  const [batlles, setBatlles] = useState(poble?.batlles || [])

  const { register, handleSubmit, watch, control } = useForm({
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
      es_pacte:       poble?.es_pacte || false,
      regidors: poble ? JSON.stringify(poble.regidors||[], null, 2) : '[\n  {"p":"PP","n":8,"color":"#0e2a6e"},\n  {"p":"PSIB","n":6,"color":"#b82012"}\n]',
    }
  })

  const esPacte = watch('es_pacte')

  const save = useMutation({
    mutationFn: async (data) => {
      let regidors = []
      try { regidors = JSON.parse(data.regidors) }
      catch { toast.error('JSON de regidors invàlid'); throw new Error('JSON invàlid') }
      const payload = {
        ...data,
        regidors,
        batlles: data.es_pacte ? batlles : [],
        poblacio: parseInt(data.poblacio)||null,
        total_regidors: parseInt(data.total_regidors)||null,
      }
      const { error } = await supabase.from('municipis').upsert(payload)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({queryKey:['admin-pobles']}); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl font-black">{poble ? `Editar: ${poble.nom}` : 'Nou Ajuntament'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit(d => save.mutate(d))} className="p-5 space-y-4">
          {poble?.id && <input type="hidden" {...register('id')}/>}

          <div className="grid grid-cols-2 gap-4">
            <F label="Nom *" name="nom" register={register} required/>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Illa</label>
              <select {...register('illa')} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none">
                {ILLES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <F label="Població (habitants)" name="poblacio" register={register} type="number"/>
            <F label="Total regidors" name="total_regidors" register={register} type="number"/>
            <F label="Alcalde/essa" name="alcalde" register={register} className="col-span-2"/>
            <F label="Codi alcalde parti" name="alcalde_parti" register={register} placeholder="pp, psib, mes..."/>
            <F label="Codi govern parti" name="govern_parti" register={register} placeholder="pp, psib, mes..."/>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Color govern</label>
              <div className="flex gap-2 items-center">
                <input type="color" {...register('color_govern')} className="w-10 h-9 rounded border border-border cursor-pointer"/>
                <input {...register('color_govern')} className="flex-1 text-sm border border-border rounded-lg px-3 py-2 font-mono focus:outline-none"/>
              </div>
            </div>
          </div>

          {/* Opció pacte */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer mb-1">
              <input type="checkbox" {...register('es_pacte')} className="rounded"/>
              <span className="font-semibold text-amber-800">Govern de pacte</span>
              <span className="text-xs text-amber-700">(rotació de batlia entre partits)</span>
            </label>
            {esPacte && (
              <BatllesEditor batlles={batlles} onChange={setBatlles} />
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Context / Notes</label>
            <textarea {...register('context')} rows={2} className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none"/>
          </div>

          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Regidors (JSON)</label>
            <textarea {...register('regidors')} rows={6}
              className="w-full text-xs font-mono border border-border rounded-lg px-3 py-2 resize-y focus:outline-none"
              placeholder='[{"p":"PP","n":8,"color":"#0e2a6e"}]'/>
            <div className="text-[10px] text-mid mt-1">Format: [{'"p"'}: nom, {'"n"'}: escons, {'"color"'}: hex]</div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={save.isPending}
              className="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
              {save.isPending?'Desant...':'Desar'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg border border-border text-sm text-mid">Cancel·lar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function F({ label, name, register, type='text', required, className='', placeholder='' }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-mid block mb-1">{label}</label>
      <input type={type} {...register(name,{required})} placeholder={placeholder}
        className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
    </div>
  )
}
