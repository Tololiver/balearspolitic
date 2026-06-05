// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { usePostsDestacats } from '@/hooks/useBlog'
import { LoadingSpinner } from '@/components/ui'
import {
  Users, ArrowLeftRight, Building2, Layers,
  FileText, Vote, Scale, BookOpen, PenLine, TrendingUp
} from 'lucide-react'

function useConfig() {
  return useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      const { data, error } = await supabase.from('config').select('*')
      if (error) throw error
      return Object.fromEntries(data.map(r => [r.clau, r.valor]))
    },
    staleTime: 1000 * 60 * 10,
  })
}

const SECCIONS = [
  { to:'/partits',        icon:Users,         label:'Fitxes de Partits',    desc:'PP, PSIB, Més, Vox...' },
  { to:'/comparador',     icon:ArrowLeftRight, label:'Comparador',           desc:'Compara qualsevol parell' },
  { to:'/ajuntaments',    icon:Building2,      label:'Ajuntaments',          desc:'67 ajuntaments' },
  { to:'/governs',        icon:Layers,         label:'Governs 1983–avui',    desc:'12 governs de la democràcia' },
  { to:'/programes',      icon:FileText,       label:'Programes Electorals', desc:'2015, 2019, 2023' },
  { to:'/eleccions-2027', icon:Vote,           label:'Eleccions 2027',       desc:'Escenaris i simulador' },
  { to:'/pp-vs-psoe',     icon:Scale,          label:'PP vs PSOE',           desc:'Comparativa temàtica' },
  { to:'/fonts',          icon:BookOpen,       label:'Fonts',                desc:'Metodologia i fonts' },
]

export default function Home() {
  const { data: cfg } = useConfig()
  const { data: posts, isLoading: postsLoading } = usePostsDestacats(3)
  const bannerActiu = cfg?.banner_actiu === 'true'

  return (
    <div>
      {/* Bloc d'introducció */}
      <div className="bg-paper border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px" style={{background:'#43F8CC'}}/>
              <span className="font-mono text-[10px] tracking-[2.5px] uppercase text-mid">
                Eina d'Anàlisi Política · Illes Balears · 2015–2026
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-ink leading-tight tracking-tight mb-4">
              {cfg?.home_titol || 'L\'anàlisi política de les Illes Balears'}
            </h2>
            <p className="text-base text-mid font-light leading-relaxed">
              {cfg?.home_intro || 'BalearsPolitic és la plataforma de referència per a entendre la política de les Illes Balears.'}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-border">
            {[
              {n:'12',l:'Governs des de 1983',to:'/governs',icon:Layers},
              {n:'8', l:'Fitxes de partits',  to:'/partits',icon:Users},
              {n:'67',l:'Ajuntaments coberts',to:'/ajuntaments',icon:Building2},
              {n:'3', l:'Cicles electorals',  to:'/programes',icon:TrendingUp},
            ].map(({n,l,to,icon:Icon})=>(
              <Link key={l} to={to} className="group flex items-start gap-3">
                <div className="mt-1 text-mid/40 group-hover:text-accent transition-colors">
                  <Icon size={16} strokeWidth={1.5}/>
                </div>
                <div>
                  <div className="font-display text-4xl font-black text-ink group-hover:text-accent transition-colors">{n}</div>
                  <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-mid mt-0.5">{l}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Banner */}
      {bannerActiu && cfg?.banner_text && cfg?.banner_link && (
        <Link to={cfg.banner_link} className="block group" style={{background:cfg.banner_color||'#0e2a6e'}}>
          <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-5 bg-white/30 rounded-full flex-shrink-0"/>
              <span className="text-white font-semibold text-sm leading-snug">{cfg.banner_text}</span>
            </div>
            <span className="text-white/60 text-xs font-mono whitespace-nowrap flex-shrink-0 group-hover:text-white transition-colors">
              Veure →
            </span>
          </div>
        </Link>
      )}

      {/* Blog */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[2px] uppercase text-mid mb-1">
                <PenLine size={11} strokeWidth={1.5}/> Blog
              </div>
              <h2 className="font-display text-2xl font-black text-ink tracking-tight">Darrers Articles</h2>
            </div>
            <Link to="/blog" className="text-xs font-semibold text-accent hover:underline flex items-center gap-1">
              Veure tots <span>→</span>
            </Link>
          </div>
          {postsLoading ? <LoadingSpinner /> : !posts?.length ? (
            <div className="text-sm text-mid text-center py-8">Aviat publicarem el primer article.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {posts.map(p => <PostMiniCard key={p.id} post={p}/>)}
            </div>
          )}
        </div>
      </div>

      {/* Seccions */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-mid mb-4">Explora la plataforma</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SECCIONS.map(({to, icon: Icon, label, desc}) => (
            <Link key={to+label} to={to}
              className="group bg-white rounded-card border border-border p-4 hover:border-mid hover:shadow-card transition-all">
              <div className="text-mid group-hover:text-accent transition-colors mb-2">
                <Icon size={20} strokeWidth={1.5}/>
              </div>
              <div className="font-semibold text-sm text-ink group-hover:text-accent transition-colors">{label}</div>
              <div className="text-xs text-mid mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function PostMiniCard({ post: p }) {
  const cat = p.categories
  const date = p.published_at
    ? new Date(p.published_at).toLocaleDateString('ca-ES',{day:'numeric',month:'short'}) : ''
  return (
    <Link to={`/blog/${p.slug}`}
      className="group flex flex-col bg-paper rounded-card border border-border hover:border-mid hover:shadow-card transition-all overflow-hidden">
      {p.imatge_url ? (
        <div className="aspect-video overflow-hidden">
          <img src={p.imatge_url} alt={p.titol} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
        </div>
      ) : (
        <div className="aspect-video flex items-center justify-center" style={{background:cat?.color?`${cat.color}15`:'#f0ede8'}}>
          <PenLine size={24} strokeWidth={1} className="opacity-20"/>
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        {cat && <span className="font-mono text-[9px] font-bold tracking-[1px] uppercase mb-1.5" style={{color:cat.color}}>{cat.nom}</span>}
        <h3 className="font-display font-bold text-sm text-ink leading-tight group-hover:text-accent transition-colors flex-1 line-clamp-3">{p.titol}</h3>
        {date && <div className="font-mono text-[9px] text-mid mt-2">{date}</div>}
      </div>
    </Link>
  )
}
