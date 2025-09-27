import { createClient } from '@/utils/supabase/server'

export default async function TestPage() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .limit(5)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Test</h1>
      {error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <p className="text-green-500">✅ Database connected successfully!</p>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
