'use client'
import { useState, useEffect } from 'react'
import { useSupabase } from '@/hooks/useSupabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { supabase, loading: supabaseLoading } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!supabase || supabaseLoading) return

    const getUser = async () => {
      try {
        console.log('Dashboard: Checking user session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Dashboard: Session error:', error)
          router.replace('/login')
          return
        }

        if (!session?.user) {
          console.log('Dashboard: No user found, redirecting to login')
          router.replace('/login')
          return
        }

        console.log('Dashboard: User found:', session.user.email)
        setUser(session.user)

        // Get profile
        try {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          setProfile(profileData)
        } catch (profileError) {
          console.error('Dashboard: Profile fetch error:', profileError)
          // Don't block dashboard for profile errors
        }

      } catch (error) {
        console.error('Dashboard: Error:', error)
        router.replace('/login')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase, supabaseLoading, router])

  const handleSignOut = async () => {
    if (!supabase) return
    
    try {
      console.log('Signing out...')
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (supabaseLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                className="text-red-600 hover:text-red-800 transition-colors px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Welcome Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome Back!</h2>
            <p className="text-gray-600 mb-4">
              Welcome to your Computer World dashboard. Here you can manage your bookings and profile.
            </p>
            <Link
              href="/book-appointment"
              className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              Book New Service
            </Link>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">
                Name: {profile?.full_name || 'Not provided'}
              </p>
              <p className="text-sm text-gray-600">
                Member since: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/book-appointment"
                className="block text-yellow-600 hover:text-yellow-800 transition-colors"
              >
                📅 Book Appointment
              </Link>
              <a
                href="tel:+919876543210"
                className="block text-gray-600 hover:text-gray-800 transition-colors"
              >
                📞 Call Support
              </a>
              <a
                href="https://wa.me/919876543210"
                className="block text-green-600 hover:text-green-800 transition-colors"
              >
                💬 WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 md:col-span-2 lg:col-span-3">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Login Successful!</h3>
                <p className="text-green-700">You are now logged in to your Computer World account.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
