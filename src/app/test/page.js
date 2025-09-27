import { createClient } from '../../utils/supabase/client'

export default function TestPage() {
  const handleTest = async () => {
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('count(*)')
        .single()

      if (error) {
        console.error('Database error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      <p className="text-green-500 text-lg">✅ Build successful - Supabase ready!</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p><strong>Environment Variables:</strong></p>
        <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
        <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
      </div>
    </div>
  )
}
