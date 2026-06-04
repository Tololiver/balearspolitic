import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Falten les variables VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY al .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper: comprova si l'usuari és admin
export async function isAdmin() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  return user.email === import.meta.env.VITE_ADMIN_EMAIL
}
