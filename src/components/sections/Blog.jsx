// src/components/sections/Blog.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePosts, useCategories } from '@/hooks/useBlog'
import { SectionTitleBar, ContentWrap, LoadingSpinner, EmptyState } from '@/components/ui'

export default function Blog() {
  const [catSlug, setCatSlug] = useState(null)
  const { data: posts, isLoading } = usePosts({ categoriaSlug: catSlug })
  const { data: categories } = useCategories()

  return (
    <>
      <SectionTitleBar
        eyebrow="Anàlisi i actualitat política"
        title="Notícies i Anàlisi"
        sub="Articles, anàlisi i cobertura de l'actualitat política de les Illes Balears."
        gradient="from-ink to-[#1a0a1a]"
      />
      <ContentWrap>
        {/* Filtres per categoria */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCatSlug(null)}
            className={`filter-pill ${!catSlug ? 'active' : ''}`}
          >Tots</button>
          {categories?.map(c => (
            <button key={c.id}
              onClick={() => setCatSlug(c.slug === catSlug ? null : c.slug)}
              className={`filter-pill flex items-center gap-1.5 ${catSlug === c.slug ? 'active' : ''}`}
            >
              <span className="w-2 h-2 rounded-sm" style={{ background: c.color }} />
              {c.nom}
            </button>
          ))}
        </div>

        {/* Grid de posts */}
        {isLoading ? (
          <LoadingSpinner />
        ) : !posts?.length ? (
          <EmptyState icon="📰" title="Encara no hi ha articles" sub="Aviat publicarem el primer contingut." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </ContentWrap>
    </>
  )
}

export function PostCard({ post: p, featured = false }) {
  const cat = p.categories
  const date = p.published_at
    ? new Date(p.published_at).toLocaleDateString('ca-ES', { day:'numeric', month:'long', year:'numeric' })
    : ''

  return (
    <Link to={`/blog/${p.slug}`}
      className={`group bg-white rounded-card border border-border overflow-hidden hover:shadow-lg transition-all block ${featured ? 'md:col-span-2' : ''}`}>
      {/* Imatge */}
      {p.imatge_url ? (
        <div className="aspect-video overflow-hidden bg-paper">
          <img src={p.imatge_url} alt={p.imatge_alt || p.titol}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-ink to-ink/80 flex items-center justify-center"
          style={{ background: cat?.color ? `${cat.color}22` : undefined }}>
          <svg className="w-10 h-10 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
      )}

      {/* Contingut */}
      <div className="p-5">
        {cat && (
          <span className="inline-block font-mono text-[9px] font-bold tracking-[1.5px] uppercase text-white px-2 py-0.5 rounded mb-2"
            style={{ background: cat.color }}>
            {cat.nom}
          </span>
        )}
        <h3 className="font-display text-lg font-bold text-ink leading-tight mb-2 group-hover:text-accent transition-colors">
          {p.titol}
        </h3>
        {p.resum && (
          <p className="text-xs text-mid leading-relaxed line-clamp-3 mb-3">{p.resum}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-mid">{p.autor}</span>
          {date && <span className="font-mono text-[10px] text-mid">{date}</span>}
        </div>
      </div>
    </Link>
  )
}
