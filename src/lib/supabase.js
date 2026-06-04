import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// No llançar error — mostrar warning i continuar
if (!supabaseUrl || !supabaseKey) {
  console.warn('BalearsPolitic: Falten VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY al .env.local')
}

export const supabase = createClient(
  supabaseUrl  || 'https://placeholder.supabase.co',
  supabaseKey  || 'placeholder-key'
)

export async function isAdmin() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false
    return user.email === import.meta.env.VITE_ADMIN_EMAIL
  } catch {
    return false
  }
}
