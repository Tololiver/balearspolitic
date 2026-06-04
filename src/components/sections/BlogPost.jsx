// src/components/sections/BlogPost.jsx
import { useParams, Link } from 'react-router-dom'
import { usePost } from '@/hooks/useBlog'
import { ContentWrap, LoadingSpinner } from '@/components/ui'
import './BlogPost.css'

export default function BlogPost() {
  const { slug } = useParams()
  const { data: post, isLoading } = usePost(slug)

  if (isLoading) return <ContentWrap><LoadingSpinner /></ContentWrap>
  if (!post) return (
    <ContentWrap>
      <div className="text-center py-20">
        <div className="text-4xl mb-4">📭</div>
        <div className="font-display text-2xl font-black mb-2">Article no trobat</div>
        <Link to="/blog" className="text-accent text-sm underline">Tornar al blog</Link>
      </div>
    </ContentWrap>
  )

  const cat = post.categories
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('ca-ES', { day:'numeric', month:'long', year:'numeric' })
    : ''

  return (
    <>
      {/* Hero */}
      <div className="bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ background: cat?.color ? `radial-gradient(circle at 70% 50%, ${cat.color} 0%, transparent 60%)` : undefined }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 mb-6">
            <Link to="/" className="hover:text-white/70">Inici</Link>
            <span>›</span>
            <Link to="/blog" className="hover:text-white/70">Blog</Link>
            {cat && <><span>›</span><span style={{ color: cat.color }}>{cat.nom}</span></>}
          </div>
          {cat && (
            <span className="inline-block font-mono text-[9px] font-bold tracking-[1.5px] uppercase text-white px-2.5 py-1 rounded mb-4"
              style={{ background: cat.color }}>{cat.nom}</span>
          )}
          <h1 className="font-display text-3xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            {post.titol}
          </h1>
          {post.resum && (
            <p className="text-white/65 text-base font-light leading-relaxed max-w-2xl mb-6">{post.resum}</p>
          )}
          <div className="flex items-center gap-4 font-mono text-[11px] text-white/40">
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {post.autor}
            </span>
            {date && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {date}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Imatge destacada + peu de foto */}
      {post.imatge_url && (
        <div className="max-w-3xl mx-auto px-6 pt-6">
          <figure>
            <img src={post.imatge_url} alt={post.imatge_alt || post.titol}
              className="w-full rounded-card shadow-lg object-cover max-h-96" />
            {/* Peu de foto — només si té contingut */}
            {post.imatge_peu && (
              <figcaption className="mt-2 font-mono text-[10px] text-mid text-right leading-relaxed">
                {post.imatge_peu}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      {/* Contingut */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.contingut || '' }} />

        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
          <div className="font-mono text-xs text-mid">
            Publicat per <strong className="text-ink">{post.autor}</strong>
            {date && <> · {date}</>}
          </div>
          <Link to="/blog" className="flex items-center gap-2 text-xs font-semibold text-accent hover:underline">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
            Tornar al blog
          </Link>
        </div>
      </div>
    </>
  )
}
