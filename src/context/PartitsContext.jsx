// src/context/PartitsContext.jsx
// Carrega tots els partits una vegada i els fa disponibles globalment
import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

const PartitsContext = createContext({})

export function PartitsProvider({ children }) {
  const { data: partits = [] } = useQuery({
    queryKey: ['partits-global'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partits')
        .select('codi, nom, sigles, color, bg_color, logo_url')
        .order('nom')
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 30, // 30 min cache
  })

  // Index per codi per a lookup ràpid
  const byCode = Object.fromEntries(partits.map(p => [p.codi, p]))

  return (
    <PartitsContext.Provider value={{ partits, byCode }}>
      {children}
    </PartitsContext.Provider>
  )
}

export function usePartitsGlobal() {
  return useContext(PartitsContext)
}
