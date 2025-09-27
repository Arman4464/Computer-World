import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // Only create client in browser environment
  if (typeof window === 'undefined') {
    return null
  }
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        storage: typeof window !== 'undefined' ? window.localStorage : null,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    }
  )
}
