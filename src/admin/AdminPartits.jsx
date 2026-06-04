// src/admin/AdminPartits.jsx — CRUD complet per a partits
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

const TOPIC_IDS = ['turisme','habitatge','llengua','mediAmbient','immigracio','serveis','fiscalitat']

export default function AdminPartits() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null) // null = new, id = edit

  const { data: partits, isLoading } = useQuery({
    queryKey: ['admin-partits'],
    queryFn: async () => {
      const { data, error } = await supabase.from('partits').select('*').order('nom')
      if (error) throw error
      return data
    },
  })

  const upsert = useMutation({
    mutationFn: async (data) => {
      // Separate posicions from main fields
      const { turisme, habitatge, llengua, mediAmbient, immigracio, serveis, fiscalitat, ...main } = data
      const posicions = { turisme, habitatge, llengua, mediAmbient, immigracio, serveis, fiscalitat }
      const payload = { ...main, posicions }
      const { error } = await supabase.from('partits').upsert(payload)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-partits'] })
      qc.invalidateQueries({ queryKey: ['partits'] })
      toast.success('Partit desat correctament')
      setEditing(null)
    },
    onError: (e) => toast.error(e.message),
  })

  const deletePartit = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('partits').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-partits'] })
      toast.success('Partit eliminat')
    },
    onError: (e) => toast.error(e.message),
  })

  const editItem = editing ? partits?.find(p => p.id === editing) : null

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Partits</h1>
          <p className="text-mid text-sm">{partits?.length || 0} partits al sistema</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90"
        >
          + Nou Partit
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-10 text-mid">Carregant...</div>
      ) : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[40px_1fr_140px_100px_80px_80px] text-[10px] font-mono tracking-wider uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-3">
            <div>Color</div><div>Nom</div><div>Lider</div><div>Escons</div><div>Publicat</div><div>Accions</div>
          </div>
          {partits?.map(p => (
            <div key={p.id} className="grid grid-cols-[40px_1fr_140px_100px_80px_80px] items-center px-4 py-3 border-b border-border last:border-0 text-sm gap-3 hover:bg-paper/50">
              <div className="w-6 h-6 rounded" style={{ background: p.color }} />
              <div>
                <div className="font-semibold">{p.nom}</div>
                <div className="text-xs text-mid">{p.codi}</div>
              </div>
              <div className="text-mid">{p.lider}</div>
              <div className="font-mono">{p.escons_2023 ?? '—'}</div>
              <div>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${p.publicat ? 'bg-mes-bg text-mes' : 'bg-border text-mid'}`}>
                  {p.publicat ? 'Sí' : 'No'}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(p.id)} className="text-xs text-pp hover:underline">Editar</button>
                <button onClick={() => { if(window.confirm('Segur que vols eliminar aquest partit?')) deletePartit.mutate(p.id) }} className="text-xs text-psib hover:underline">Esborrar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/New Modal */}
      {editing && (
        <PartitModal
          partit={editItem}
          onSave={(d) => upsert.mutate(d)}
          onClose={() => setEditing(null)}
          loading={upsert.isPending}
        />
      )}
    </div>
  )
}

function PartitModal({ partit, onSave, onClose, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ...partit,
      ...partit?.posicions,
    }
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-lg">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-xl font-black">{partit ? `Editar: ${partit.nom}` : 'Nou Partit'}</h2>
          <button onClick={onClose} className="text-mid hover:text-ink">✕</button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-5 space-y-4">
          {/* Hidden id */}
          {partit?.id && <input type="hidden" {...register('id')} />}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nom curt" name="nom" register={register} required />
            <Field label="Codi (slug)" name="codi" register={register} required />
            <Field label="Nom complet" name="nom_complet" register={register} className="col-span-2" />
            <Field label="Color hex" name="color" register={register} type="color" />
            <Field label="Color fons hex" name="bg_color" register={register} type="color" />
            <Field label="Lider actual" name="lider" register={register} />
            <Field label="Any de fundacio" name="fundat" register={register} type="number" />
            <Field label="Escons 2023" name="escons_2023" register={register} type="number" />
            <Field label="Ideologia" name="ideologia" register={register} className="col-span-2" />
          </div>

          <textarea {...register('desc')} placeholder="Descripció del partit" rows={3}
            className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid" />

          <div className="space-y-1">
            <label className="font-mono text-[10px] tracking-wider uppercase text-mid block mb-2">Publicat</label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" {...register('publicat')} className="rounded" />
              Visible al public
            </label>
          </div>

          {/* Posicions */}
          <div>
            <div className="font-mono text-[10px] tracking-wider uppercase text-mid mb-3">Posicions per tema</div>
            <div className="space-y-3">
              {TOPIC_IDS.map(tid => (
                <div key={tid}>
                  <label className="text-xs font-semibold text-mid capitalize block mb-1">{tid}</label>
                  <textarea {...register(tid)} rows={2} placeholder={`Posicio sobre ${tid}...`}
                    className="w-full text-xs border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-accent/90 disabled:opacity-50">
              {loading ? 'Desant...' : 'Desar'}
            </button>
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-border text-sm text-mid hover:bg-paper">
              Cancel·lar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, register, type = 'text', required, className = '' }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-mid block mb-1">{label}</label>
      <input type={type} {...register(name, { required: required && `${label} es obligatori` })}
        className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid" />
    </div>
  )
}
