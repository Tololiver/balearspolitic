// src/hooks/useCandidatures.js
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useCandidatures({ ambit, ambit_id } = {}) {
  return useQuery({
    queryKey: ['candidatures', ambit, ambit_id],
    queryFn: async () => {
      let q = supabase
        .from('candidatures_2027')
        .select('*, partits(nom, color, bg_color, codi)')
        .eq('publicat', true)
        .order('ambit_nom')
      if (ambit)    q = q.eq('ambit', ambit)
      if (ambit_id) q = q.eq('ambit_id', ambit_id)
      const { data, error } = await q
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useSondejos({ ambit } = {}) {
  return useQuery({
    queryKey: ['sondejos', ambit],
    queryFn: async () => {
      let q = supabase
        .from('sondejos_2027')
        .select('*')
        .eq('publicat', true)
        .order('data_publicacio', { ascending: false })
      if (ambit) q = q.eq('ambit', ambit)
      const { data, error } = await q
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}
