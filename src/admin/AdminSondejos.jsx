// src/admin/AdminSondejos.jsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Plus, Trash2, ChevronDown } from 'lucide-react'

const PARTITS_DEFAULT = [
  {parti:'PP',    pct:'', escons:'', color:'#0e2a6e'},
  {parti:'PSIB',  pct:'', escons:'', color:'#e30022'},
  {parti:'Vox',   pct:'', escons:'', color:'#4a6600'},
  {parti:'Més',   pct:'', escons:'', color:'#1a5c30'},
  {parti:'EUIB-Podem', pct:'', escons:'', color:'#6b0f9e'},
  {parti:'MxMe',  pct:'', escons:'', color:'#005151'},
  {parti:'Sa Unió',pct:'', escons:'', color:'#009d99'},
  {parti:'El Pi', pct:'', escons:'', color:'#00d5af'},
]

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

export default function AdminSondejos() {
  const { data: sondejos, isLoading } = useSondejosAdmin()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(null)

  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('sondejos_2027').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-sondejos'] }); toast.success('Esborrat') },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Sondejos 2027</h1>
          <p className="text-mid text-sm">{sondejos?.length || 0} sondejos publicats</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold">
          <Plus size={14} strokeWidth={1.5}/> Nou sondeig
        </button>
      </div>

      {isLoading ? <div className="text-mid py-10 text-center">Carregant...</div> : (
        <div className="space-y-2">
          {sondejos?.map(s => (
            <div key={s.id} className="bg-white rounded-card border border-border overflow-hidden shadow-card">
              <button onClick={() => setOpen(open === s.id ? null : s.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-paper transition-colors">
                <div>
                  <div className="font-semibold text-sm">{s.font}</div>
                  <div className="font-mono text-[10px] text-mid">
                    {new Date(s.data_publicacio).toLocaleDateString('ca-ES', {day:'numeric',month:'short',year:'numeric'})}
                    {' · '}{s.ambit_nom}
                    {!s.publicat && <span className="ml-2 text-amber-600">· No publicat</span>}
                  </div>
                </div>
                <ChevronDown size={16} strokeWidth={1.5}
                  className={`text-mid transition-transform ${open === s.id ? 'rotate-180' : ''}`}/>
              </button>

              {open === s.id && (
                <div className="border-t border-border p-4">
                  {/* Barra visual */}
                  <div className="flex h-5 rounded overflow-hidden mb-3">
                    {(s.resultats||[]).filter(r=>r.pct>0).map((r,i)=>(
                      <div key={i} style={{flex:parseFloat(r.pct),background:r.color}}
                        title={`${r.parti}: ${r.pct}%`} className="flex items-center justify-center">
                        {parseFloat(r.pct)>=8&&<span className="text-white font-mono text-[8px] font-bold">{r.parti}</span>}
                      </div>
                    ))}
                  </div>
                  {/* Llegenda amb escons */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {(s.resultats||[]).map((r,i)=>(
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{background:r.color}}/>
                        <span className="font-mono text-[10px] text-mid font-bold">{r.parti}</span>
                        <span className="font-mono text-[10px] text-mid">{r.pct}%</span>
                        {r.escons && <span className="font-mono text-[10px] text-ink font-bold">({r.escons})</span>}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(s.id)}
                      className="text-xs font-semibold text-pp hover:underline">Editar</button>
                    <button onClick={() => window.confirm('Esborrar?') && del.mutate(s.id)}
                      className="text-xs font-semibold text-psib hover:underline">Esborrar</button>
                  </div>
                </div>
              )}
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

function SondeigModal({ sondeig, onClose }) {
  const qc = useQueryClient()
  const [form, setForm] = useState({
    ambit:           sondeig?.ambit || 'govern',
    ambit_nom:       sondeig?.ambit_nom || 'Illes Balears',
    font:            sondeig?.font || '',
    data_publicacio: sondeig?.data_publicacio?.split('T')[0] || new Date().toISOString().split('T')[0],
    publicat:        sondeig?.publicat ?? true,
  })
  const [resultats, setResultats] = useState(
    sondeig?.resultats?.length
      ? sondeig.resultats.map(r => ({...r, escons: r.escons || ''}))
      : PARTITS_DEFAULT
  )

  const updateResultat = (i, field, val) => {
    setResultats(prev => prev.map((r, idx) => idx === i ? {...r, [field]: val} : r))
  }

  const addPartit = () => setResultats(prev => [...prev, {parti:'', pct:'', escons:'', color:'#888888'}])
  const removePartit = (i) => setResultats(prev => prev.filter((_,idx) => idx !== i))

  const totalPct = resultats.reduce((s, r) => s + (parseFloat(r.pct) || 0), 0)

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        resultats: resultats
          .filter(r => r.parti && parseFloat(r.pct) > 0)
          .map(r => ({
            parti:  r.parti,
            pct:    parseFloat(r.pct),
            escons: r.escons ? parseInt(r.escons) : null,
            color:  r.color,
          })),
      }
      if (sondeig?.id) {
        const { error } = await supabase.from('sondejos_2027').update(payload).eq('id', sondeig.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('sondejos_2027').insert(payload)
        if (error) throw error
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-sondejos'] }); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl font-black">{sondeig ? 'Editar sondeig' : 'Nou sondeig'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Metadades */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Font / Institut *</label>
              <input value={form.font} onChange={e => setForm(p=>({...p,font:e.target.value}))}
                placeholder="SigmaDos / El Mundo"
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Data publicació</label>
              <input type="date" value={form.data_publicacio}
                onChange={e => setForm(p=>({...p,data_publicacio:e.target.value}))}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Àmbit</label>
              <select value={form.ambit} onChange={e => setForm(p=>({...p,ambit:e.target.value}))}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white">
                <option value="govern">Govern IB</option>
                <option value="consell">Consell Insular</option>
                <option value="ajuntament">Ajuntament</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Nom àmbit</label>
              <input value={form.ambit_nom} onChange={e => setForm(p=>({...p,ambit_nom:e.target.value}))}
                placeholder="Illes Balears"
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.publicat}
              onChange={e => setForm(p=>({...p,publicat:e.target.checked}))}
              className="rounded"/>
            Publicat al web
          </label>

          {/* Resultats per partit */}
          <div className="bg-paper rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold">
                Resultats per partit
              </div>
              <div className={`font-mono text-[10px] font-bold ${Math.abs(totalPct-100)<1?'text-green-600':'text-amber-600'}`}>
                Total: {totalPct.toFixed(1)}%
              </div>
            </div>

            {/* Barra preview */}
            {totalPct > 0 && (
              <div className="flex h-4 rounded overflow-hidden mb-3">
                {resultats.filter(r=>parseFloat(r.pct)>0).map((r,i)=>(
                  <div key={i} style={{flex:parseFloat(r.pct)||0, background:r.color}}
                    title={`${r.parti}: ${r.pct}%`}/>
                ))}
              </div>
            )}

            {/* Capçalera columnes */}
            <div className="grid grid-cols-[1fr_70px_70px_32px_28px] gap-2 mb-2">
              <div className="font-mono text-[9px] uppercase text-mid">Partit</div>
              <div className="font-mono text-[9px] uppercase text-mid text-center">% vots</div>
              <div className="font-mono text-[9px] uppercase text-mid text-center">Escons</div>
              <div className="font-mono text-[9px] uppercase text-mid text-center">Color</div>
              <div/>
            </div>

            <div className="space-y-1.5">
              {resultats.map((r, i) => (
                <div key={i} className="grid grid-cols-[1fr_70px_70px_32px_28px] gap-2 items-center">
                  <input value={r.parti} onChange={e => updateResultat(i,'parti',e.target.value)}
                    className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none bg-white"/>
                  <input value={r.pct} onChange={e => updateResultat(i,'pct',e.target.value)}
                    placeholder="0.0" type="number" step="0.1" min="0" max="100"
                    className="text-sm text-center border border-border rounded px-2 py-1.5 focus:outline-none bg-white font-mono"/>
                  <input value={r.escons} onChange={e => updateResultat(i,'escons',e.target.value)}
                    placeholder="—" type="number" min="0"
                    className="text-sm text-center border border-border rounded px-2 py-1.5 focus:outline-none bg-white font-mono"/>
                  <input type="color" value={r.color} onChange={e => updateResultat(i,'color',e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer p-0.5"/>
                  <button onClick={() => removePartit(i)} className="text-mid hover:text-psib">
                    <Trash2 size={13} strokeWidth={1.5}/>
                  </button>
                </div>
              ))}
            </div>

            <button onClick={addPartit}
              className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-mid hover:text-ink">
              <Plus size={12} strokeWidth={1.5}/> Afegir partit
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => save.mutate()} disabled={save.isPending}
              className="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
              {save.isPending ? 'Desant...' : 'Desar'}
            </button>
            <button onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-border text-sm text-mid">
              Cancel·lar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
