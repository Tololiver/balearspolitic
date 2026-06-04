// src/admin/AdminCandidatures.jsx — CMS candidatures 2027
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

function useCandidatures() {
  return useQuery({
    queryKey: ['admin-candidatures'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidatures_2027')
        .select('*, partits(nom, color)')
        .order('ambit').order('ambit_nom').order('parti_codi')
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

function usePobles() {
  return useQuery({
    queryKey: ['municipis'],
    queryFn: async () => {
      const { data, error } = await supabase.from('municipis').select('id, nom, illa').order('nom')
      if (error) throw error
      return data
    },
  })
}

function useConsells() {
  return useQuery({
    queryKey: ['consells'],
    queryFn: async () => {
      const { data, error } = await supabase.from('consells_insulars').select('id, nom, illa').order('illa')
      if (error) throw error
      return data
    },
  })
}

const AMBIT_LABELS = { govern: 'Govern IB', consell: 'Consell Insular', ajuntament: 'Ajuntament' }
const AMBIT_COLORS = { govern: '#0e2a6e', consell: '#1a5c30', ajuntament: '#b82012' }

export default function AdminCandidatures() {
  const { data: candidatures, isLoading } = useCandidatures()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)
  const [ambitFilter, setAmbitFilter] = useState(null)

  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('candidatures_2027').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-candidatures'] }); toast.success('Esborrat') },
    onError: (e) => toast.error(e.message),
  })

  const filtered = ambitFilter ? candidatures?.filter(c => c.ambit === ambitFilter) : candidatures

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Candidatures 2027</h1>
          <p className="text-mid text-sm">{candidatures?.length || 0} candidatures · Govern, Consells i Ajuntaments</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90">
          + Nova candidatura
        </button>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setAmbitFilter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${!ambitFilter ? 'bg-ink text-white border-ink' : 'bg-white text-mid border-border'}`}>
          Totes
        </button>
        {Object.entries(AMBIT_LABELS).map(([val, label]) => (
          <button key={val} onClick={() => setAmbitFilter(val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${ambitFilter === val ? 'bg-ink text-white border-ink' : 'bg-white text-mid border-border'}`}>
            {label}
          </button>
        ))}
      </div>

      {isLoading ? <div className="text-mid py-10 text-center">Carregant...</div> : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[90px_140px_1fr_80px_60px_60px_90px] text-[10px] font-mono uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-2">
            <div>Àmbit</div><div>Entitat</div><div>Partit · Cap llista</div><div>PDF</div><div>IA</div><div>Pub.</div><div>Accions</div>
          </div>
          {filtered?.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-mid">Cap candidatura. Afegeix-ne una amb el botó +</div>
          )}
          {filtered?.map(c => (
            <div key={c.id} className="grid grid-cols-[90px_140px_1fr_80px_60px_60px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-2 hover:bg-paper/50 text-sm">
              <div>
                <span className="font-mono text-[9px] font-bold text-white px-1.5 py-0.5 rounded"
                  style={{ background: AMBIT_COLORS[c.ambit] }}>
                  {AMBIT_LABELS[c.ambit]}
                </span>
              </div>
              <div className="text-xs text-mid truncate">{c.ambit_nom}</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: c.partits?.color || '#888' }} />
                <div>
                  <div className="font-semibold text-xs">{c.partits?.nom || c.parti_codi}</div>
                  {c.cap_llista && <div className="text-[10px] text-mid">{c.cap_llista}</div>}
                </div>
              </div>
              <div>
                {c.programa_pdf_url
                  ? <a href={c.programa_pdf_url} target="_blank" rel="noreferrer"
                      className="text-accent text-xs hover:underline flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>PDF
                    </a>
                  : <span className="text-[10px] text-mid">—</span>
                }
              </div>
              <div>
                {c.resum_ia
                  ? <span className="text-[10px] text-mes font-mono font-bold">✓ IA</span>
                  : <span className="text-[10px] text-mid">—</span>
                }
              </div>
              <div>
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${c.publicat ? 'bg-mes-bg text-mes' : 'bg-border text-mid'}`}>
                  {c.publicat ? 'Sí' : 'No'}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(c.id)} className="text-xs text-pp hover:underline">Editar</button>
                <button onClick={() => window.confirm('Esborrar?') && del.mutate(c.id)} className="text-xs text-psib hover:underline">Esborrar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <CandidaturaModal
          candidatura={editing !== 'new' ? candidatures?.find(c => c.id === editing) : null}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

function CandidaturaModal({ candidatura: c, onClose }) {
  const qc = useQueryClient()
  const { data: partits } = usePartits()
  const { data: pobles } = usePobles()
  const { data: consells } = useConsells()
  const [pdfUploading, setPdfUploading] = useState(false)
  const [fotoUploading, setFotoUploading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      id:               c?.id,
      ambit:            c?.ambit || 'govern',
      ambit_id:         c?.ambit_id || '',
      ambit_nom:        c?.ambit_nom || 'Illes Balears',
      parti_codi:       c?.parti_codi || '',
      cap_llista:       c?.cap_llista || '',
      cap_foto:         c?.cap_foto || '',
      bio:              c?.bio || '',
      programa_pdf_url: c?.programa_pdf_url || '',
      resum_ia:         c?.resum_ia || '',
      valoracio:        c?.valoracio || '',
      publicat:         c?.publicat || false,
      propostes:        c ? (c.propostes || []).join('\n') : '',
    }
  })

  const ambit    = watch('ambit')
  const pdfUrl   = watch('programa_pdf_url')
  const partiCodi = watch('parti_codi')
  const ambitNom  = watch('ambit_nom')

  // Quan canvia l'àmbit, actualitza ambit_nom per defecte
  const handleAmbitChange = (val) => {
    setValue('ambit', val)
    if (val === 'govern') setValue('ambit_nom', 'Illes Balears')
    else { setValue('ambit_nom', ''); setValue('ambit_id', '') }
  }

  // Upload PDF
  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPdfUploading(true)
    try {
      const path = `2027_${Date.now()}_${file.name.replace(/\s/g, '_')}`
      const { error } = await supabase.storage.from('programes-pdf').upload(path, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('programes-pdf').getPublicUrl(path)
      setValue('programa_pdf_url', publicUrl)
      toast.success('PDF pujat!')
    } catch (err) { toast.error('Error: ' + err.message) }
    finally { setPdfUploading(false) }
  }

  // Upload foto candidat
  const handleFotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFotoUploading(true)
    try {
      const path = `${Date.now()}_${file.name.replace(/\s/g, '_')}`
      const { error } = await supabase.storage.from('candidats-foto').upload(path, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('candidats-foto').getPublicUrl(path)
      setValue('cap_foto', publicUrl)
      toast.success('Foto pujada!')
    } catch (err) { toast.error('Error: ' + err.message) }
    finally { setFotoUploading(false) }
  }

  // IA del PDF
  const handleGenerateAI = async () => {
    if (!pdfUrl) { toast.error('Puja primer el PDF'); return }
    setAiLoading(true)
    try {
      const ambitLabel = ambit === 'govern' ? 'Govern de les Illes Balears'
        : ambit === 'consell' ? `Consell Insular de ${ambitNom}`
        : `Ajuntament de ${ambitNom}`

      const res = await fetch('/.netlify/functions/programa-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdf_url: pdfUrl,
          parti: partits?.find(pt => pt.codi === partiCodi)?.nom || partiCodi,
          ambit: ambitLabel,
          any_eleccions: 2027,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setValue('resum_ia', data.resum || '')
      setValue('propostes', (data.propostes || []).join('\n'))
      setValue('valoracio', data.valoracio || '')
      toast.success('Resum generat per IA!')
    } catch (err) { toast.error('Error IA: ' + err.message) }
    finally { setAiLoading(false) }
  }

  const save = useMutation({
    mutationFn: async (data) => {
      const payload = {
        ...data,
        propostes: data.propostes.split('\n').map(s => s.trim()).filter(Boolean),
        ambit_id: data.ambit_id || null,
      }
      const { error } = await supabase.from('candidatures_2027').upsert(payload)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-candidatures'] }); toast.success('Desat!'); onClose() },
    onError: (e) => toast.error(e.message),
  })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-lg">
        <div className="flex justify-between items-center p-5 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl font-black">{c ? 'Editar Candidatura' : 'Nova Candidatura 2027'}</h2>
          <button onClick={onClose} className="text-mid text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit(d => save.mutate(d))} className="p-5 space-y-5">
          {c?.id && <input type="hidden" {...register('id')} />}

          {/* Àmbit */}
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(AMBIT_LABELS).map(([val, label]) => (
              <button key={val} type="button"
                onClick={() => handleAmbitChange(val)}
                className={`py-2.5 rounded-lg text-xs font-bold border-2 transition-all ${ambit === val ? 'text-white border-transparent' : 'text-mid border-border bg-white'}`}
                style={{ background: ambit === val ? AMBIT_COLORS[val] : undefined }}>
                {label}
              </button>
            ))}
          </div>
          <input type="hidden" {...register('ambit')} />

          {/* Entitat */}
          {ambit === 'govern' && (
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Entitat</label>
              <input value="Illes Balears" disabled className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-paper text-mid" />
              <input type="hidden" {...register('ambit_nom')} />
            </div>
          )}
          {ambit === 'consell' && (
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Consell Insular</label>
              <select {...register('ambit_id')}
                onChange={e => {
                  setValue('ambit_id', e.target.value)
                  const consell = consells?.find(c => c.id === e.target.value)
                  if (consell) setValue('ambit_nom', consell.nom.replace('Consell Insular de ', '').replace('Consell Insular d\'', ''))
                }}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none">
                <option value="">Selecciona consell...</option>
                {consells?.map(con => <option key={con.id} value={con.id}>{con.nom}</option>)}
              </select>
              <input type="hidden" {...register('ambit_nom')} />
            </div>
          )}
          {ambit === 'ajuntament' && (
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Municipi</label>
              <select {...register('ambit_id')}
                onChange={e => {
                  setValue('ambit_id', e.target.value)
                  const poble = pobles?.find(p => p.id === e.target.value)
                  if (poble) setValue('ambit_nom', poble.nom)
                }}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none">
                <option value="">Selecciona municipi...</option>
                {pobles?.map(p => <option key={p.id} value={p.id}>{p.nom} ({p.illa})</option>)}
              </select>
              <input type="hidden" {...register('ambit_nom')} />
            </div>
          )}

          {/* Partit */}
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Partit *</label>
            <select {...register('parti_codi')} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none">
              <option value="">Selecciona...</option>
              {partits?.map(pt => <option key={pt.id} value={pt.codi}>{pt.nom}</option>)}
            </select>
          </div>

          {/* Cap de llista + foto */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Cap de llista</label>
              <input {...register('cap_llista')} className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Foto del candidat/a</label>
              <div className="flex gap-2 items-center">
                {watch('cap_foto') && (
                  <img src={watch('cap_foto')} alt="" className="w-10 h-10 rounded-full object-cover border border-border flex-shrink-0" />
                )}
                <label className={`flex-1 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border cursor-pointer hover:bg-paper ${fotoUploading ? 'opacity-50' : ''}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  {fotoUploading ? 'Pujant...' : 'Pujar foto'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleFotoUpload} disabled={fotoUploading} />
                </label>
                <input type="hidden" {...register('cap_foto')} />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Bio curta del candidat/a</label>
            <textarea {...register('bio')} rows={2}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none"
              placeholder="Càrrec actual, trajectòria política..." />
          </div>

          {/* PDF + IA */}
          <div className="bg-paper rounded-lg border border-border p-4 space-y-3">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold">Programa Electoral PDF + IA</div>

            {pdfUrl && (
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-border">
                <svg className="w-4 h-4 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline flex-1 truncate">{pdfUrl.split('/').pop()}</a>
                <button type="button" onClick={() => setValue('programa_pdf_url', '')} className="text-mid hover:text-psib text-xs">✕</button>
              </div>
            )}
            <input type="hidden" {...register('programa_pdf_url')} />

            <div className="flex gap-3 flex-wrap">
              <label className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border border-border cursor-pointer hover:bg-white ${pdfUploading ? 'opacity-50' : ''}`}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                {pdfUploading ? 'Pujant...' : 'Pujar PDF'}
                <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} disabled={pdfUploading} />
              </label>

              <button type="button" onClick={handleGenerateAI}
                disabled={!pdfUrl || aiLoading}
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 disabled:opacity-40">
                {aiLoading
                  ? <><div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />Analitzant...</>
                  : <><span>✨</span>Generar resum IA</>
                }
              </button>
            </div>
          </div>

          {/* Resum IA + propostes */}
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Resum IA (editable)</label>
            <textarea {...register('resum_ia')} rows={4}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-none focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Propostes clau (una per línia)</label>
            <textarea {...register('propostes')} rows={6}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 resize-y focus:outline-none" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register('publicat')} className="rounded" id="pub-cand" />
            <label htmlFor="pub-cand" className="text-sm font-semibold cursor-pointer">Publicat (visible al públic)</label>
          </div>

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
