'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      try {
        console.log('Dashboard: Checking session...')
        const { data: { session } } = await supabase.auth.getSession()
        
        console.log('Dashboard: Session data:', session)
        
        if (session?.user) {
          console.log('Dashboard: User found:', session.user.email)
          setUser(session.user)
          setLoading(false)
        } else {
          console.log('Dashboard: No user, redirecting to login')
          // Clear any cached state
          setUser(null)
          setLoading(false)
          // Force redirect
          window.location.href = '/login'
          return
        }
      } catch (error) {
        console.error('Dashboard: Error checking session:', error)
        setUser(null)
        setLoading(false)
        window.location.href = '/login'
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Dashboard: Auth state changed:', event, session)
      
      if (event === 'SIGNED_OUT' || !session) {
        console.log('Dashboard: User signed out, redirecting to login')
        setUser(null)
        window.location.href = '/login'
      } else if (event === 'SIGNED_IN' && session) {
        console.log('Dashboard: User signed in:', session.user.email)
        setUser(session.user)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      console.log('Dashboard: Signing out...')
      await supabase.auth.signOut()
      setUser(null)
      // Force redirect to home
      window.location.href = '/'
    } catch (error) {
      console.error('Dashboard: Sign out error:', error)
      // Force redirect even if error
      window.location.href = '/'
    }
  }

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show nothing while redirecting
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CW</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Hello, {user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome Back!</h2>
            <p className="text-gray-600 mb-4">You're successfully logged in to Computer World.</p>
            <Link
              href="/book-appointment"
              className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Book Service
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Member since: {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/book-appointment" className="block text-yellow-600 hover:text-yellow-800">📅 Book Appointment</Link>
              <a href="tel:+919876543210" className="block text-gray-600 hover:text-gray-800">📞 Call Support</a>
              <a href="https://wa.me/919876543210" className="block text-green-600 hover:text-green-800">💬 WhatsApp</a>
            </div>
          </div>

          {/* Success indicator */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 md:col-span-2 lg:col-span-3">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Authentication Working!</h3>
                <p className="text-green-700">Login/logout flow is working correctly.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
