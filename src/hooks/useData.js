// hooks/useData.js
// Tots els hooks de dades de BalearsPolitic usant React Query + Supabase

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// ─── PARTITS ──────────────────────────────────────────────────
export function usePartits() {
  return useQuery({
    queryKey: ['partits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partits')
        .select('*')
        .eq('publicat', true)
        .order('escons_2023', { ascending: false })
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  })
}

export function usePartit(codi) {
  return useQuery({
    queryKey: ['partits', codi],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partits')
        .select('*')
        .eq('codi', codi)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!codi,
  })
}

// ─── MUNICIPIS ────────────────────────────────────────────────
export function usePobles({ illa, governParti, search } = {}) {
  return useQuery({
    queryKey: ['municipis', illa, governParti, search],
    queryFn: async () => {
      let query = supabase
        .from('municipis')
        .select('*')
        .order('poblacio', { ascending: false })

      if (illa && illa !== 'totes')    query = query.eq('illa', illa)
      if (governParti && governParti !== 'totes') query = query.eq('govern_parti', governParti)
      if (search) query = query.ilike('nom', `%${search}%`)

      const { data, error } = await query
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 10,
  })
}

export function usePoble(nom) {
  return useQuery({
    queryKey: ['municipis', nom],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('municipis')
        .select('*')
        .eq('nom', nom)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!nom,
  })
}

// ─── GOVERNS ──────────────────────────────────────────────────
export function useGoverns() {
  return useQuery({
    queryKey: ['governs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('governs')
        .select('*, partits(nom, color)')
        .order('ordre', { ascending: true })
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 30,
  })
}

// ─── PROGRAMES ELECTORALS ────────────────────────────────────
export function useProgrames(anyEleccions) {
  return useQuery({
    queryKey: ['programes', anyEleccions],
    queryFn: async () => {
      let query = supabase
        .from('programes_electorals')
        .select('*, partits(nom, color, bg_color, codi)')
        .eq('publicat', true)
        .order('any_eleccions', { ascending: false })

      if (anyEleccions) query = query.eq('any_eleccions', anyEleccions)

      const { data, error } = await query
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 10,
  })
}

export function useEleccionsResultats(any) {
  return useQuery({
    queryKey: ['eleccions', any],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('eleccions_resultats')
        .select('*, partits(nom, color, codi)')
        .eq('any_eleccions', any)
        .order('escons', { ascending: false })
      if (error) throw error
      return data
    },
    enabled: !!any,
  })
}

// ─── CONSELLS INSULARS ────────────────────────────────────────
export function useConsells() {
  return useQuery({
    queryKey: ['consells'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('consells_insulars')
        .select('*')
        .order('illa')
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 10,
  })
}

// ─── FONTS ────────────────────────────────────────────────────
export function useFonts() {
  return useQuery({
    queryKey: ['fonts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fonts')
        .select('*')
        .order('categoria')
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 60, // 1 hora
  })
}

// ─── ADMIN MUTATIONS ──────────────────────────────────────────
export function useUpsertPartit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (partit) => {
      const { data, error } = await supabase
        .from('partits')
        .upsert(partit)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['partits'] }),
  })
}

export function useUpsertPoble() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (poble) => {
      const { data, error } = await supabase
        .from('municipis')
        .upsert(poble)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['municipis'] }),
  })
}

export function useUpsertGovern() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (govern) => {
      const { data, error } = await supabase
        .from('governs')
        .upsert(govern)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['governs'] }),
  })
}
