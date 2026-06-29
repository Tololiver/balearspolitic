// src/components/sections/Noticies.jsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { SectionTitleBar, ContentWrap, LoadingSpinner, SearchInput } from '@/components/ui'
import { ExternalLink, Bot, Newspaper } from 'lucide-react'
import SEOMeta from '@/components/SEOMeta'

const CATEGORIES = ['totes','govern','parlament','partits','institucions','economia','social','general']
const CAT_COLORS = {
  govern:'#0e2a6e', parlament:'#e30022', partits:'#1a5c30',
  institucions:'#005151', economia:'#4a6600', social:'#6b0f9e', general:'#888'
}

function useNoticies({ categoria, search }) {
  return useQuery({
    queryKey: ['noticies', categoria, search],
    queryFn: async () => {
      let q = supabase
        .from('clipping')
        .select('*')
        .eq('estat', 'publicat')
        .order('data_publicacio', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(60)

      if (categoria && categoria !== 'totes') q = q.eq('categoria', categoria)
      if (search) q = q.ilike('titol', `%${search}%`)

      const { data, error } = await q
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}

// Agrupa per data
function agrupaPerData(items) {
  const grups = {}
  items.forEach(item => {
    const data = item.data_publicacio || item.created_at?.split('T')[0]
    if (!grups[data]) grups[data] = []
    grups[data].push(item)
  })
  return Object.entries(grups).sort(([a], [b]) => b.localeCompare(a))
}

function formatData(dataStr) {
  const d = new Date(dataStr + 'T12:00:00')
  const avui = new Date()
  const ahir = new Date(); ahir.setDate(ahir.getDate() - 1)
  if (d.toDateString() === avui.toDateString()) return 'Avui'
  if (d.toDateString() === ahir.toDateString()) return 'Ahir'
  return d.toLocaleDateString('ca-ES', { weekday:'long', day:'numeric', month:'long' })
}

export default function Noticies() {
  const [categoria, setCategoria] = useState('totes')
  const [search, setSearch] = useState('')
  const { data: noticies, isLoading } = useNoticies({ categoria, search })

  const grups = noticies ? agrupaPerData(noticies) : []

  return (
    <>
      <SEOMeta
        title="Clipping de Premsa"
        description="Notícies polítiques de les Illes Balears. Seguiment diari de l'actualitat política balear."
      />
      <SectionTitleBar
        eyebrow="Actualitat política · Illes Balears"
        title="Clipping de Premsa"
        sub="Seguiment diari de l'actualitat política balear. Notícies seleccionades de les principals fonts."
        gradient="from-ink to-[#1a0a2e]"
      />
      <ContentWrap>
        <div className="space-y-3 mb-6">
          <SearchInput value={search} onChange={setSearch} placeholder="Cerca una notícia..."/>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategoria(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all capitalize
                  ${categoria === c
                    ? 'text-white border-transparent'
                    : 'bg-white border-border text-mid hover:border-mid'}`}
                style={categoria === c ? { background: CAT_COLORS[c] || '#888' } : {}}>
                {c === 'totes' ? 'Totes' : c}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? <LoadingSpinner /> : !noticies?.length ? (
          <div className="text-center py-16">
            <Newspaper size={32} strokeWidth={1} className="text-mid/30 mx-auto mb-3"/>
            <div className="font-display text-lg font-bold text-ink mb-1">Sense notícies</div>
            <p className="text-sm text-mid">El clipping s'actualitza cada dia a les 7:00.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {grups.map(([data, items]) => (
              <div key={data}>
                {/* Capçalera de data */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="font-display text-lg font-black text-ink capitalize">
                    {formatData(data)}
                  </div>
                  <div className="flex-1 h-px bg-border"/>
                  <span className="font-mono text-[10px] text-mid">{items.length} notícies</span>
                </div>

                {/* Cards del dia */}
                <div className="space-y-2">
                  {items.map(item => (
                    <NoticiaCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ContentWrap>
    </>
  )
}

function NoticiaCard({ item }) {
  const [expanded, setExpanded] = useState(false)
  const color = CAT_COLORS[item.categoria] || '#888'
  const resum = item.resum_manual || item.resum_ia

  return (
    <div className="bg-white rounded-card border border-border overflow-hidden hover:shadow-card transition-shadow"
      style={{ borderLeftWidth: 3, borderLeftColor: color }}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="font-mono text-[9px] font-bold text-white px-1.5 py-0.5 rounded capitalize"
                style={{ background: color }}>
                {item.categoria}
              </span>
              <span className="font-mono text-[10px] text-mid font-semibold">{item.font}</span>
              {item.auto && (
                <span className="flex items-center gap-0.5 font-mono text-[9px] text-mid/50">
                  <Bot size={9}/> Auto
                </span>
              )}
            </div>

            <button onClick={() => setExpanded(!expanded)} className="text-left w-full">
              <div className="font-semibold text-sm text-ink leading-snug hover:text-accent transition-colors">
                {item.titol}
              </div>
            </button>

            {resum && expanded && (
              <p className="text-xs text-mid leading-relaxed mt-2">{resum}</p>
            )}
          </div>

          {item.url_original && (
            <a href={item.url_original} target="_blank" rel="noreferrer"
              className="flex-shrink-0 text-mid hover:text-accent transition-colors mt-0.5"
              title="Llegir notícia original">
              <ExternalLink size={14} strokeWidth={1.5}/>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
