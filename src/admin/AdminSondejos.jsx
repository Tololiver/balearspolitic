// src/admin/AdminSondejos.jsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

function useSondejosAdmin() {
  return useQuery({
    queryKey: ['admin-sondejos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sondejos_2027')
        .select('*')
        .order('data_publicacio', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

const PARTITS_DEFAULT = [
  { parti: 'PP',   color: '#0e2a6e', pct: 0 },
  { parti: 'PSIB', color: '#b82012', pct: 0 },
  { parti: 'Vox',  color: '#4a6600', pct: 0 },
  { parti: 'Més',  color: '#1a5c30', pct: 0 },
  { parti: 'Podem',color: '#6b0f9e', pct: 0 },
  { parti: 'MxMe', color: '#005448', pct: 0 },
  { parti: 'Altres',color:'#999',    pct: 0 },
]

export default function AdminSondejos() {
  const { data: sondejos, isLoading } = useSondejosAdmin()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)

  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('sondejos_2027').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-sondejos'] }); toast.success('Esborrat') },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Sondejos 2027</h1>
          <p className="text-mid text-sm">{sondejos?.length || 0} enquestes publicades</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90">
          + Nou sondeig
        </button>
      </div>

      {isLoading ? <div className="text-mid py-10 text-center">Carregant...</div> : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[100px_1fr_120px_80px_90px] text-[10px] font-mono uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-3">
            <div>Data</div><div>Font</div><div>Àmbit</div><div>Publicat</div><div>Accions</div>
          </div>
          {sondejos?.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-mid">Cap sondeig. Afegeix-ne un.</div>
          )}
          {sondejos?.map(s => (
            <div key={s.id} className="grid grid-cols-[100px_1fr_120px_80px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-3 text-sm hover:bg-paper/50">
              <div className="font-mono text-xs text-mid">{new Date(s.data_publicacio).toLocaleDateString('ca-ES', {day:'numeric',month:'short',year:'numeric'})}</div>
              <div className="font-semibold">{s.font}</div>
              <div>
                <span className="font-mono text-[9px] text-mid bg-paper border border-border rounded px-2 py-0.5">{s.ambit_nom}</span>
              </div>
              <div>
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${s.publicat ? 'bg-mes-bg text-mes' : 'bg-border text-mid'}`}>
                  {s.publicat ? 'Sí' : 'No'}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(s.id)} className="text-xs text-pp hover:underline">Editar</button>
                <button onClick={() => window.confirm('Esborrar?') && del.mutate(s.id)} className="text-xs text-psib hover:underline">Esborrar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <SondeigModal
          sondeig={editing !== 'new' ? sondejos?.find(s => s.id === editing) : null}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

function SondeigModal({ sondeig: s, onClose }) {
  const qc = useQueryClient()
  const [resultats, setResultats] = useState(
    s?.resultats || PARTITS_DEFAULT
  )

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id:              s?.id,
      ambit:           s?.ambit || 'govern',
      ambit_nom:       s?.ambit_nom || 'Illes Balears',
      font:            s?.font || '',
      data_publicacio: s?.data_publicacio || new Date().toISOString().split('T')[0],
      publicat:        s?.publicat !== false,
    }
  })

  const updatePct = (i, val) => {
    setResultats(prev => prev.map((r, idx) => idx === i ? { ...r, pct: parseFloat(val) || 0 } : r))
  }

  const total = resultats.reduce((s, r) => s + (r.pct || 0), 0)

  const save = useMutation({
    mutationFn: async (data) => {
      const payload = { ...data, resultats }
      const { error } = await supabase.from('sondejos_2027').upsert(payload)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-sondejos'] }); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-lg mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="font-display text-xl font-black">{s ? 'Editar Sondeig' : 'Nou Sondeig'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit(d => save.mutate(d))} className="p-5 space-y-4">
          {s?.id && <input type="hidden" {...register('id')} />}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Font *</label>
              <input {...register('font', { required: true })}
                placeholder="El Mundo, Cadena Ser..."
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Data de publicació</label>
              <input type="date" {...register('data_publicacio')}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Àmbit</label>
              <select {...register('ambit')} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none">
                <option value="govern">Govern IB</option>
                <option value="consell">Consell Insular</option>
                <option value="ajuntament">Ajuntament</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Nom àmbit</label>
              <input {...register('ambit_nom')}
                placeholder="Illes Balears, Mallorca..."
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
          </div>

          {/* Resultats */}
          <div className="bg-paper rounded-lg border border-border p-4">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold mb-3">
              Resultats (%) · Total: <span className={total > 100 ? 'text-psib' : total === 100 ? 'text-mes' : 'text-mid'}>{total.toFixed(1)}%</span>
            </div>

            {/* Barra visual */}
            <div className="flex h-4 rounded overflow-hidden mb-3">
              {resultats.filter(r => r.pct > 0).map((r, i) => (
                <div key={i} style={{ flex: r.pct, background: r.color }} title={`${r.parti}: ${r.pct}%`} />
              ))}
            </div>

            <div className="space-y-2">
              {resultats.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: r.color }} />
                  <span className="text-xs font-semibold text-ink w-16">{r.parti}</span>
                  <input
                    type="number" min="0" max="100" step="0.1"
                    value={r.pct}
                    onChange={e => updatePct(i, e.target.value)}
                    className="w-20 text-sm font-mono text-center border border-border rounded px-2 py-1 focus:outline-none"
                    style={{ color: r.color }}
                  />
                  <span className="text-xs text-mid">%</span>
                  <div className="flex-1 bg-white rounded-sm h-2 overflow-hidden border border-border">
                    <div className="h-full" style={{ width: `${Math.min(r.pct, 100)}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('publicat')} className="rounded" />
            <span className="font-semibold">Publicat</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={save.isPending}
              className="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
              {save.isPending ? 'Desant...' : 'Desar'}
            </button>
            <button type="button" onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-border text-sm text-mid">Cancel·lar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
