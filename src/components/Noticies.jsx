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
  const data = item.data_publicacio
    ? new Date(item.data_publicacio + 'T12:00:00').toLocaleDateString('ca-ES', {day:'numeric', month:'long', year:'numeric'})
    : ''

  return (
    <div className="bg-white rounded-card border border-border overflow-hidden transition-all duration-200"
      style={{ borderLeftWidth: 3, borderLeftColor: color }}>

      {/* Capçalera — sempre visible */}
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start justify-between gap-3 p-4 text-left hover:bg-paper/50 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="font-mono text-[9px] font-bold text-white px-1.5 py-0.5 rounded capitalize"
              style={{ background: color }}>
              {item.categoria}
            </span>
            <span className="font-mono text-[10px] text-mid font-semibold">{item.font}</span>
            {data && <span className="font-mono text-[10px] text-mid">{data}</span>}
            {item.auto && (
              <span className="flex items-center gap-0.5 font-mono text-[9px] text-mid/50">
                <Bot size={9}/> Auto
              </span>
            )}
          </div>
          <div className="font-semibold text-sm text-ink leading-snug">
            {item.titol}
          </div>
        </div>
        <svg className={`w-4 h-4 text-mid flex-shrink-0 mt-0.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Detall expandit */}
      {expanded && (
        <div className="border-t border-border px-4 py-4" style={{background:`${color}08`}}>

          {/* Resum */}
          {resum && (
            <div className="mb-4">
              <div className="font-mono text-[9px] tracking-[2px] uppercase font-bold mb-1.5" style={{color}}>
                Resum
              </div>
              <p className="text-sm text-mid leading-relaxed">{resum}</p>
            </div>
          )}

          {/* Metadades */}
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-4">
            {data && (
              <div>
                <div className="font-mono text-[9px] uppercase text-mid/60 mb-0.5">Data</div>
                <div className="font-mono text-xs text-ink font-semibold">{data}</div>
              </div>
            )}
            {item.font && (
              <div>
                <div className="font-mono text-[9px] uppercase text-mid/60 mb-0.5">Font</div>
                <div className="font-mono text-xs text-ink font-semibold">{item.font}</div>
              </div>
            )}
            <div>
              <div className="font-mono text-[9px] uppercase text-mid/60 mb-0.5">Categoria</div>
              <div className="font-mono text-xs font-semibold capitalize" style={{color}}>{item.categoria}</div>
            </div>
          </div>

          {/* Botó font original */}
          {item.url_original && (
            <a href={item.url_original} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white px-3 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{background: color}}>
              <ExternalLink size={12} strokeWidth={1.5}/>
              Llegir notícia original
            </a>
          )}
        </div>
      )}
    </div>
  )
}
