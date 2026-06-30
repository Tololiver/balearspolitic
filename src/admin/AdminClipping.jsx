// src/admin/AdminClipping.jsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Plus, ExternalLink, Check, X, Clock, RefreshCw, Bot, Pencil } from 'lucide-react'

const ESTATS = [
  { val: 'esborrany', label: 'Esborranys', color: 'text-amber-600 bg-amber-50' },
  { val: 'publicat',  label: 'Publicats',  color: 'text-green-700 bg-green-50' },
  { val: 'descartat', label: 'Descartats', color: 'text-mid bg-paper' },
]

const CATEGORIES = ['general','govern','parlament','partits','institucions','economia','social']

function useClipping(estat) {
  return useQuery({
    queryKey: ['admin-clipping', estat],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clipping')
        .select('*')
        .eq('estat', estat)
        .order('data_publicacio', { ascending: false })
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export default function AdminClipping() {
  const qc = useQueryClient()
  const [tab, setTab] = useState('esborrany')
  const [editing, setEditing] = useState(null)
  const [running, setRunning] = useState(false)
  const { data: items, isLoading } = useClipping(tab)

  const canviaEstat = useMutation({
    mutationFn: async ({ id, estat }) => {
      const { error } = await supabase.from('clipping').update({ estat }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-clipping'] }),
  })

  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('clipping').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-clipping'] }); toast.success('Esborrat') },
  })

  const executaCrawler = async () => {
    setRunning(true)
    try {
      const res = await fetch('/.netlify/functions/clipping-crawler')
      const data = await res.json()
      toast.success(`Crawler executat: ${data.inserits} notícies noves de ${data.fonts} fonts`)
      qc.invalidateQueries({ queryKey: ['admin-clipping'] })
    } catch (e) {
      toast.error('Error al crawler: ' + e.message)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Clipping de premsa</h1>
          <p className="text-mid text-sm">Notícies polítiques captades automàticament i manuals</p>
        </div>
        <div className="flex gap-2">
          <button onClick={executaCrawler} disabled={running}
            className="flex items-center gap-2 border border-border text-ink px-4 py-2 rounded-lg text-sm font-semibold hover:bg-paper disabled:opacity-50">
            <RefreshCw size={14} strokeWidth={1.5} className={running ? 'animate-spin' : ''}/>
            {running ? 'Executant...' : 'Executar ara'}
          </button>
          <button onClick={() => setEditing('new')}
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold">
            <Plus size={14} strokeWidth={1.5}/> Afegir manual
          </button>
        </div>
      </div>

      {/* Tabs estat */}
      <div className="flex gap-1 bg-paper rounded-lg p-1 border border-border mb-6 w-fit">
        {ESTATS.map(e => (
          <button key={e.val} onClick={() => setTab(e.val)}
            className={`px-4 py-2 rounded text-xs font-semibold transition-all ${tab === e.val ? 'bg-ink text-white' : 'text-mid hover:text-ink'}`}>
            {e.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-mid text-center py-10">Carregant...</div>
      ) : !items?.length ? (
        <div className="text-mid text-center py-16 text-sm">
          {tab === 'esborrany' ? 'Cap esborrany. Executa el crawler o afegeix una notícia manual.' : `Cap element ${tab}.`}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <ClippingCard
              key={item.id}
              item={item}
              onPublicar={() => canviaEstat.mutate({ id: item.id, estat: 'publicat' })}
              onDescartar={() => canviaEstat.mutate({ id: item.id, estat: 'descartat' })}
              onEsborrany={() => canviaEstat.mutate({ id: item.id, estat: 'esborrany' })}
              onEditar={() => setEditing(item.id)}
              onEsborrar={() => window.confirm('Esborrar?') && del.mutate(item.id)}
              estat={tab}
            />
          ))}
        </div>
      )}

      {editing && (
        <ClippingModal
          item={editing !== 'new' ? items?.find(i => i.id === editing) : null}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

function ClippingCard({ item, onPublicar, onDescartar, onEsborrany, onEditar, onEsborrar, estat }) {
  const data = item.data_publicacio
    ? new Date(item.data_publicacio + 'T12:00:00').toLocaleDateString('ca-ES', {day:'numeric',month:'short'})
    : ''

  return (
    <div className="bg-white rounded-card border border-border overflow-hidden shadow-card hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {item.auto && (
                <span className="flex items-center gap-1 font-mono text-[9px] bg-pp/10 text-pp px-1.5 py-0.5 rounded">
                  <Bot size={9}/> Auto
                </span>
              )}
              <span className="font-mono text-[9px] bg-paper border border-border px-1.5 py-0.5 rounded text-mid capitalize">
                {item.categoria}
              </span>
              <span className="font-mono text-[9px] text-mid">{item.font}</span>
              {data && <span className="font-mono text-[9px] text-mid">{data}</span>}
            </div>
            <div className="font-semibold text-sm text-ink leading-snug mb-1">{item.titol}</div>
            {(item.resum_manual || item.resum_ia) && (
              <p className="text-xs text-mid leading-relaxed line-clamp-2">
                {item.resum_manual || item.resum_ia}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border flex-wrap">
          {item.url_original && (
            <a href={item.url_original} target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs text-mid hover:text-ink">
              <ExternalLink size={11} strokeWidth={1.5}/> Font original
            </a>
          )}
          <div className="flex gap-1.5 ml-auto">
            <button onClick={onEditar}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border border-border hover:bg-paper">
              <Pencil size={11} strokeWidth={1.5}/> Editar
            </button>
            {estat === 'esborrany' && <>
              <button onClick={onPublicar}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-green-600 text-white hover:bg-green-700">
                <Check size={11} strokeWidth={1.5}/> Publicar
              </button>
              <button onClick={onDescartar}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-paper border border-border text-mid hover:text-ink">
                <X size={11} strokeWidth={1.5}/> Descartar
              </button>
            </>}
            {estat === 'publicat' && (
              <button onClick={onEsborrany}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border border-border text-mid hover:text-ink">
                <Clock size={11} strokeWidth={1.5}/> A esborrany
              </button>
            )}
            {estat === 'descartat' && (
              <button onClick={onEsborrany}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border border-border text-mid hover:text-ink">
                Recuperar
              </button>
            )}
            <button onClick={onEsborrar}
              className="text-xs px-2 py-1.5 rounded border border-border text-mid hover:text-psib">
              <X size={11} strokeWidth={1.5}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClippingModal({ item, onClose }) {
  const qc = useQueryClient()
  const [form, setForm] = useState({
    titol:           item?.titol || '',
    resum_manual:    item?.resum_manual || item?.resum_ia || '',
    font:            item?.font || '',
    url_original:    item?.url_original || '',
    data_publicacio: item?.data_publicacio || new Date().toISOString().split('T')[0],
    categoria:       item?.categoria || 'general',
    estat:           item?.estat || 'esborrany',
  })
  const [generant, setGenerant] = useState(false)

  const generaResum = async () => {
    if (!form.titol) { toast.error('Posa un titular primer'); return }
    setGenerant(true)
    try {
      const response = await fetch('/.netlify/functions/blog-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'summarize',
          content: `Titular: ${form.titol}\nFont: ${form.font || ''}`,
        })
      })
      const data = await response.json()
      const resum = data.result?.trim()
      if (resum) {
        setForm(p => ({ ...p, resum_manual: resum }))
        toast.success('Resum generat!')
      } else {
        toast.error('No s\'ha pogut generar el resum')
      }
    } catch (e) {
      toast.error('Error generant resum: ' + e.message)
    } finally {
      setGenerant(false)
    }
  }

  const save = useMutation({
    mutationFn: async () => {
      if (item?.id) {
        const { error } = await supabase.from('clipping').update({ ...form, auto: false }).eq('id', item.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('clipping').insert({ ...form, auto: false })
        if (error) throw error
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-clipping'] }); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-xl mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="font-display text-xl font-black">{item ? 'Editar notícia' : 'Afegir notícia manual'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Titular *</label>
            <input value={form.titol} onChange={e => setForm(p=>({...p,titol:e.target.value}))}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-mid">Resum</label>
              <button onClick={generaResum} disabled={generant}
                className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline disabled:opacity-50">
                <Bot size={11} strokeWidth={1.5}/>
                {generant ? 'Generant...' : 'Generar amb IA'}
              </button>
            </div>
            <textarea value={form.resum_manual} onChange={e => setForm(p=>({...p,resum_manual:e.target.value}))}
              rows={4} className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Font</label>
              <input value={form.font} onChange={e => setForm(p=>({...p,font:e.target.value}))}
                placeholder="Ultima Hora, IB3..."
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Data</label>
              <input type="date" value={form.data_publicacio}
                onChange={e => setForm(p=>({...p,data_publicacio:e.target.value}))}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">URL original</label>
            <input value={form.url_original} onChange={e => setForm(p=>({...p,url_original:e.target.value}))}
              placeholder="https://..."
              className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Categoria</label>
              <select value={form.categoria} onChange={e => setForm(p=>({...p,categoria:e.target.value}))}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white capitalize">
                {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Estat</label>
              <select value={form.estat} onChange={e => setForm(p=>({...p,estat:e.target.value}))}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white">
                <option value="esborrany">Esborrany</option>
                <option value="publicat">Publicat</option>
                <option value="descartat">Descartat</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => save.mutate()} disabled={save.isPending}
              className="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
              {save.isPending ? 'Desant...' : 'Desar'}
            </button>
            <button onClick={onClose} className="px-4 py-2.5 rounded-lg border border-border text-sm text-mid">
              Cancel·lar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
