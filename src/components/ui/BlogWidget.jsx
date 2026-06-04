// src/components/ui/BlogWidget.jsx
// Widget per a la home: mostra els darrers posts destacats
import { Link } from 'react-router-dom'
import { usePostsDestacats } from '@/hooks/useBlog'

export default function BlogWidget() {
  const { data: posts, isLoading } = usePostsDestacats(3)

  if (isLoading || !posts?.length) return null

  return (
    <div className="bg-white border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-1">Blog</div>
            <h2 className="font-display text-2xl font-black text-ink tracking-tight">Darrers Articles</h2>
          </div>
          <Link to="/blog" className="text-xs font-semibold text-accent hover:underline flex items-center gap-1">
            Veure tots
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map(p => {
            const cat = p.categories
            const date = p.published_at
              ? new Date(p.published_at).toLocaleDateString('ca-ES', { day:'numeric', month:'short' })
              : ''
            return (
              <Link key={p.id} to={`/blog/${p.slug}`}
                className="group flex gap-4 p-4 rounded-card border border-border hover:border-mid hover:shadow-card transition-all bg-paper">
                {p.imatge_url ? (
                  <img src={p.imatge_url} alt={p.titol}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: cat?.color ? `${cat.color}18` : '#f0ede8' }}>
                    <svg className="w-6 h-6 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {cat && (
                    <span className="font-mono text-[8px] font-bold tracking-[1px] uppercase"
                      style={{ color: cat.color }}>{cat.nom}</span>
                  )}
                  <h3 className="font-display font-bold text-sm text-ink leading-tight mt-0.5 group-hover:text-accent transition-colors line-clamp-2">
                    {p.titol}
                  </h3>
                  {date && <div className="font-mono text-[9px] text-mid mt-1">{date}</div>}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
