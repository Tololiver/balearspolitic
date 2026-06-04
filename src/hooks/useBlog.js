// src/hooks/useBlog.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function usePosts({ categoriaSlug, limit = 20, soloPublicats = true } = {}) {
  return useQuery({
    queryKey: ['posts', categoriaSlug, limit, soloPublicats],
    queryFn: async () => {
      let q = supabase
        .from('posts')
        .select('*, categories(nom, slug, color)')
        .order('published_at', { ascending: false })
        .limit(limit)
      if (soloPublicats) q = q.eq('publicat', true)
      if (categoriaSlug) q = q.eq('categories.slug', categoriaSlug)
      const { data, error } = await q
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function usePost(slug) {
  return useQuery({
    queryKey: ['posts', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, categories(nom, slug, color)')
        .eq('slug', slug)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!slug,
  })
}

export function usePostsDestacats(limit = 3) {
  return useQuery({
    queryKey: ['posts-destacats', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, categories(nom, slug, color)')
        .eq('publicat', true)
        .eq('destacat', true)
        .order('published_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('ordre')
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 30,
  })
}

export function useAllPostsAdmin() {
  return useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, categories(nom, color)')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useUpsertPost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (post) => {
      // Auto published_at
      if (post.publicat && !post.published_at) post.published_at = new Date().toISOString()
      const { data, error } = await supabase.from('posts').upsert(post).select().single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] })
      qc.invalidateQueries({ queryKey: ['admin-posts'] })
      qc.invalidateQueries({ queryKey: ['posts-destacats'] })
    },
  })
}

export function useDeletePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-posts'] }),
  })
}
