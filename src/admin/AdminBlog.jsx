// src/admin/AdminBlog.jsx
import { useState, useEffect } from 'react'
import { useAllPostsAdmin, useUpsertPost, useDeletePost, useCategories } from '@/hooks/useBlog'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

export default function AdminBlog() {
  const { data: posts, isLoading } = useAllPostsAdmin()
  const { data: categories } = useCategories()
  const deletePost = useDeletePost()
  const [editing, setEditing] = useState(null)

  const handleDelete = async (id, titol) => {
    if (!window.confirm(`Segur que vols esborrar "${titol}"?`)) return
    deletePost.mutate(id, {
      onSuccess: () => toast.success('Post esborrat'),
      onError: (e) => toast.error(e.message),
    })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-black">Blog · Notícies</h1>
          <p className="text-mid text-sm">{posts?.length || 0} articles</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90">
          + Nou article
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mid">Carregant...</div>
      ) : (
        <div className="bg-white rounded-card border border-border overflow-hidden shadow-card">
          <div className="grid grid-cols-[1fr_120px_80px_80px_90px] text-[10px] font-mono tracking-wider uppercase text-mid bg-ink/5 px-4 py-2.5 border-b border-border gap-3">
            <div>Títol</div><div>Categoria</div><div>Publicat</div><div>Destacat</div><div>Accions</div>
          </div>
          {posts?.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-mid">Encara no hi ha articles.</div>
          )}
          {posts?.map(p => (
            <div key={p.id} className="grid grid-cols-[1fr_120px_80px_80px_90px] items-center px-4 py-3 border-b border-border last:border-0 gap-3 hover:bg-paper/50">
              <div>
                <div className="font-semibold text-sm text-ink">{p.titol}</div>
                <div className="text-xs text-mid font-mono">/blog/{p.slug}</div>
              </div>
              <div>
                {p.categories && (
                  <span className="text-[10px] font-mono font-bold text-white px-2 py-0.5 rounded"
                    style={{ background: p.categories.color }}>{p.categories.nom}</span>
                )}
              </div>
              <div>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${p.publicat ? 'bg-mes-bg text-mes' : 'bg-border text-mid'}`}>
                  {p.publicat ? 'Sí' : 'Esborrany'}
                </span>
              </div>
              <div>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${p.destacat ? 'bg-amber-100 text-amber-700' : 'bg-border text-mid'}`}>
                  {p.destacat ? '★ Sí' : '—'}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(p.id)} className="text-xs text-pp hover:underline">Editar</button>
                <button onClick={() => handleDelete(p.id, p.titol)} className="text-xs text-psib hover:underline">Esborrar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <PostEditor
          postId={editing === 'new' ? null : editing}
          post={editing !== 'new' ? posts?.find(p => p.id === editing) : null}
          categories={categories || []}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

function PostEditor({ postId, post, categories, onClose }) {
  const upsert = useUpsertPost()
  const [aiLoading, setAiLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      id:          post?.id || undefined,
      titol:       post?.titol || '',
      slug:        post?.slug || '',
      resum:       post?.resum || '',
      contingut:   post?.contingut || '',
      categoria_id:post?.categoria_id || '',
      autor:       post?.autor || 'Tolo Oliver',
      publicat:    post?.publicat || false,
      destacat:    post?.destacat || false,
      meta_title:  post?.meta_title || '',
      meta_desc:   post?.meta_desc || '',
      imatge_url:  post?.imatge_url || '',
      imatge_alt:  post?.imatge_alt || '',
      imatge_peu:  post?.imatge_peu || '',
    }
  })

  const titol = watch('titol')

  useEffect(() => {
    if (!post && titol) {
      const slug = titol.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 60)
      setValue('slug', slug)
    }
  }, [titol, post, setValue])

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}_${file.name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9._-]/g,"_")}`
      const { error } = await supabase.storage.from('blog-images').upload(path, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(path)
      setValue('imatge_url', publicUrl)
      toast.success('Imatge pujada!')
    } catch (err) {
      toast.error('Error: ' + err.message)
    } finally {
      setImageUploading(false)
    }
  }

  const handleAI = async (action) => {
    const text = action === 'resum' ? getValues('resum') : getValues('contingut')
    if (!text) { toast.error('Escriu primer el contingut'); return }
    setAiLoading(true)
    try {
      const res = await fetch('/.netlify/functions/blog-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, text, titol: getValues('titol') }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      if (action === 'resum') setValue('resum', data.result)
      if (action === 'millorar') setValue('contingut', data.result)
      if (action === 'meta') { setValue('meta_title', data.meta_title); setValue('meta_desc', data.meta_desc) }
      toast.success('IA completada!')
    } catch (err) {
      toast.error('Error IA: ' + err.message)
    } finally {
      setAiLoading(false)
    }
  }

  const onSubmit = (data) => {
    upsert.mutate(data, {
      onSuccess: () => { toast.success('Article desat!'); onClose() },
      onError: (e) => toast.error(e.message),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-card w-full max-w-3xl mx-4 shadow-lg">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl font-black">{post ? `Editar: ${post.titol}` : 'Nou Article'}</h2>
          <button onClick={onClose} className="text-mid hover:text-ink text-xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
          {post?.id && <input type="hidden" {...register('id')} />}

          {/* Títol */}
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Títol *</label>
            <input {...register('titol', { required: true })}
              placeholder="Títol de l'article..."
              className="w-full text-base font-display font-bold border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid" />
          </div>

          {/* Slug */}
          <div>
            <label className="text-xs font-semibold text-mid block mb-1">Slug (URL)</label>
            <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-paper">
              <span className="text-xs text-mid font-mono">/blog/</span>
              <input {...register('slug')} className="flex-1 text-sm font-mono bg-transparent focus:outline-none" />
            </div>
          </div>

          {/* Categoria + Autor */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Categoria</label>
              <select {...register('categoria_id')}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white">
                <option value="">Sense categoria</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">Autor</label>
              <input {...register('autor')} className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none" />
            </div>
          </div>

          {/* Resum */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-mid">Resum</label>
              <button type="button" onClick={() => handleAI('resum')} disabled={aiLoading}
                className="text-[10px] font-mono font-bold text-accent hover:underline disabled:opacity-50">
                {aiLoading ? '...' : '✨ Generar amb IA'}
              </button>
            </div>
            <textarea {...register('resum')} rows={3}
              placeholder="Resum breu de l'article..."
              className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none resize-none" />
          </div>

          {/* Contingut */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-mid">Contingut (HTML)</label>
              <button type="button" onClick={() => handleAI('millorar')} disabled={aiLoading}
                className="text-[10px] font-mono font-bold text-accent hover:underline disabled:opacity-50">
                {aiLoading ? '...' : '✨ Millorar amb IA'}
              </button>
            </div>
            <textarea {...register('contingut')} rows={12}
              placeholder="<h2>Títol</h2><p>Contingut en HTML...</p>"
              className="w-full text-xs font-mono border border-border rounded-lg px-3 py-2 focus:outline-none resize-y" />
            <div className="text-[10px] text-mid mt-1">Suporta: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;blockquote&gt;...</div>
          </div>

          {/* Imatge */}
          <div className="space-y-3 bg-paper rounded-lg p-4 border border-border">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold">Imatge destacada</div>

            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <input {...register('imatge_url')} placeholder="URL de la imatge..."
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white mb-2" />
                <label className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border cursor-pointer hover:bg-white ${imageUploading ? 'opacity-50' : ''}`}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {imageUploading ? 'Pujant...' : 'Pujar imatge'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={imageUploading} />
                </label>
              </div>
              {watch('imatge_url') && (
                <img src={watch('imatge_url')} alt="" className="w-20 h-20 object-cover rounded-lg border border-border flex-shrink-0" />
              )}
            </div>

            {/* ── Peu de foto ── */}
            <div>
              <label className="text-xs font-semibold text-mid block mb-1">
                Peu de foto / Autor de la imatge
                <span className="font-normal text-mid/60 ml-1.5">(opcional)</span>
              </label>
              <input
                {...register('imatge_peu')}
                placeholder="Ex: Fotografia de Joan Miró · Europa Press"
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-mid bg-white"
              />
              <div className="text-[10px] text-mid mt-1">Apareix en tipografia petita sota la imatge, únicament si té contingut.</div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-paper rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid font-bold">SEO</div>
              <button type="button" onClick={() => handleAI('meta')} disabled={aiLoading}
                className="text-[10px] font-mono font-bold text-accent hover:underline disabled:opacity-50">
                {aiLoading ? '...' : '✨ Generar meta amb IA'}
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-mid block mb-1">Meta title</label>
                <input {...register('meta_title')} placeholder="Títol per a Google (60 caràcters màx.)"
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white" />
              </div>
              <div>
                <label className="text-xs font-semibold text-mid block mb-1">Meta description</label>
                <textarea {...register('meta_desc')} rows={2} placeholder="Descripció per a Google (160 caràcters màx.)"
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none resize-none bg-white" />
              </div>
            </div>
          </div>

          {/* Opcions */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" {...register('publicat')} className="rounded" />
              <span className="font-semibold">Publicat</span>
              <span className="text-xs text-mid">(visible al públic)</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" {...register('destacat')} className="rounded" />
              <span className="font-semibold">Destacat</span>
              <span className="text-xs text-mid">(apareix a la home)</span>
            </label>
          </div>

          {/* Botons */}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={upsert.isPending}
              className="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-accent/90 disabled:opacity-50">
              {upsert.isPending ? 'Desant...' : 'Desar article'}
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
