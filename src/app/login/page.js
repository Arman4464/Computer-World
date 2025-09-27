'use client'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        window.location.href = '/dashboard'
      } else {
        setLoading(false)
      }
    }
    checkSession()
  }, [supabase])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      window.location.href = '/dashboard'
    } catch (error) {
      setError(error.message)
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-600 border-gray-200 mx-auto"></div>
          <p className="mt-4 text-yellow-700 text-lg">Checking session...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-600 border-gray-200 mx-auto"></div>
          <p className="mt-4 text-yellow-700 text-lg">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In to Computer World</h2>

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-300 disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-yellow-600 hover:underline font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
