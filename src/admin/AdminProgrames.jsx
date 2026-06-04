// src/admin/AdminProgrames.jsx — CRUD programes electorals amb PDF + IA
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
          <div className="grid grid-cols-[80px_1fr_80px_80px_60px_80px_90px] text-[10px] font-mono uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-2">
            <div>Any</div><div>Partit</div><div>Governa</div><div>Compliment</div><div>PDF</div><div>Publicat</div><div>Accions</div>
          </div>
          {filtered?.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-mid">Cap programa trobat.</div>
          )}
          {filtered?.map(p => (
            <div key={p.id} className="grid grid-cols-[80px_1fr_80px_80px_60px_80px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-2 hover:bg-paper/50 text-sm">
              <div className="font-mono font-bold text-ink">{p.any_eleccions}</div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: p.partits?.color || '#888' }} />
                <span className="font-semibold">{p.partits?.nom || p.parti_codi}</span>
              </div>
              <div>
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${p.va_governar ? 'bg-mes-bg text-mes' : 'bg-border text-mid'}`}>
                  {p.va_governar ? 'Sí' : 'No'}
                </span>
              </div>
              <div className="font-mono text-xs">{p.compliment_pct != null ? `${p.compliment_pct}%` : '—'}</div>
              <div>
                {p.pdf_url
                  ? <a href={p.pdf_url} target="_blank" rel="noreferrer" className="text-accent text-xs hover:underline flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>PDF
                    </a>
                  : <span className="text-[10px] text-mid">—</span>
                }
              </div>
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
  const [pdfUploading, setPdfUploading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState(null)

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      id:             p?.id,
      any_eleccions:  p?.any_eleccions || 2023,
      parti_codi:     p?.parti_codi || '',
      va_governar:    p?.va_governar || false,
      publicat:       p?.publicat !== false,
      resum:          p?.resum || '',
      link_programa:  p?.link_programa || '',
      pdf_url:        p?.pdf_url || '',
      compliment_pct: p?.compliment_pct || '',
      promeses:       p ? (p.promeses || []).join('\n') : '',
      analisi:        p?.analisi || '',
    }
  })

  const pdfUrl = watch('pdf_url')
  const partiCodi = watch('parti_codi')

  // Upload PDF
  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.name.endsWith('.pdf')) { toast.error('Selecciona un fitxer PDF'); return }
    setPdfUploading(true)
    try {
      const path = `${Date.now()}_${file.name.replace(/\s/g, '_')}`
      const { error } = await supabase.storage.from('programes-pdf').upload(path, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('programes-pdf').getPublicUrl(path)
      setValue('pdf_url', publicUrl)
      toast.success('PDF pujat! Ara pots generar el resum amb IA.')
    } catch (err) {
      toast.error('Error pujant PDF: ' + err.message)
    } finally {
      setPdfUploading(false)
    }
  }

  // Generar resum IA des del PDF
  const handleGenerateAI = async () => {
    const url = watch('pdf_url')
    if (!url) { toast.error('Puja primer el PDF'); return }
    setAiLoading(true)
    try {
      const res = await fetch('/.netlify/functions/programa-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdf_url: url,
          parti: partits?.find(pt => pt.codi === partiCodi)?.nom || partiCodi,
          ambit: 'Govern de les Illes Balears',
          any_eleccions: watch('any_eleccions'),
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiResult(data)
      setValue('resum', data.resum || '')
      setValue('promeses', (data.propostes || []).join('\n'))
      toast.success('Resum generat! Revisa\'l i desa.')
    } catch (err) {
      toast.error('Error IA: ' + err.message)
    } finally {
      setAiLoading(false)
    }
  }

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

        <form onSubmit={handleSubmit(d => save.mutate(d))} className="p-5 space-y-5">
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
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">% Compliment (0-100)</label>
              <input type="number" {...register('compliment_pct')}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Link web del programa</label>
              <input {...register('link_programa')} placeholder="https://..."
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
          </div>

          {/* PDF + IA */}
          <div className="bg-paper rounded-lg border border-border p-4 space-y-3">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold">
              Programa Electoral en PDF
            </div>

            {/* URL actual */}
            {pdfUrl && (
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-border">
                <svg className="w-4 h-4 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline flex-1 truncate">
                  {pdfUrl.split('/').pop()}
                </a>
                <button type="button" onClick={() => setValue('pdf_url', '')} className="text-mid hover:text-psib text-xs">✕</button>
              </div>
            )}

            {/* Upload */}
            <div className="flex gap-3 flex-wrap">
              <label className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border border-border cursor-pointer hover:bg-white transition-colors ${pdfUploading ? 'opacity-50' : ''}`}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                {pdfUploading ? 'Pujant PDF...' : 'Pujar PDF'}
                <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} disabled={pdfUploading} />
              </label>
              <input type="hidden" {...register('pdf_url')} />

              {/* Botó IA */}
              <button type="button" onClick={handleGenerateAI}
                disabled={!pdfUrl || aiLoading}
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 disabled:opacity-40 transition-colors">
                {aiLoading ? (
                  <><div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />Analitzant PDF...</>
                ) : (
                  <><span>✨</span>Generar resum amb IA</>
                )}
              </button>
            </div>

            {/* Preview resultat IA */}
            {aiResult && (
              <div className="bg-white rounded-lg border border-accent/30 p-3">
                <div className="font-mono text-[9px] tracking-[2px] uppercase text-accent font-bold mb-2">
                  ✨ Resultat de la IA — revisa i edita si cal
                </div>
                {aiResult.valoracio && (
                  <p className="text-xs text-mid italic mb-2">{aiResult.valoracio}</p>
                )}
                {aiResult.temes_principals?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {aiResult.temes_principals.map((t, i) => (
                      <span key={i} className="text-[9px] bg-paper border border-border rounded px-2 py-0.5 text-mid font-mono">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Resum */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-mid">Resum del programa</label>
              <span className="text-[10px] text-mid font-mono">(editable)</span>
            </div>
            <textarea {...register('resum')} rows={4}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none" />
          </div>

          {/* Promeses */}
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Propostes clau (una per línia)</label>
            <textarea {...register('promeses')} rows={7}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-y focus:outline-none"
              placeholder="Primera promesa&#10;Segona promesa" />
          </div>

          {/* Anàlisi */}
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
