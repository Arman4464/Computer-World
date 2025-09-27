'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
          // Fetch user appointments
          await fetchAppointments(session.user.id)
        } else {
          window.location.href = '/login'
          return
        }
      } catch (error) {
        console.error('Error:', error)
        window.location.href = '/login'
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [router])

  const fetchAppointments = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAppointments(data || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
      window.location.href = '/'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CW</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">COMPUTER WORLD</h1>
                  <p className="text-xs text-yellow-600">Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-600 hover:text-yellow-600 transition-colors font-medium"
              >
                Home
              </Link>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Manage your appointments and services</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Book New Service</h3>
            <p className="text-gray-600 mb-4">Choose from our professional repair services</p>
            <Link
              href="/book-appointment"
              className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
            >
              Book Appointment
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Info</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">
                Name: {user.user_metadata?.full_name || 'Not provided'}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {user.user_metadata?.phone || 'Not provided'}
              </p>
              <p className="text-sm text-gray-600">
                Member since: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h3>
            <div className="space-y-3">
              <a 
                href="tel:+919876543210" 
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="mr-2">📞</span>
                Call Support
              </a>
              <a 
                href="https://wa.me/919876543210" 
                className="flex items-center text-green-600 hover:text-green-800 transition-colors"
              >
                <span className="mr-2">💬</span>
                WhatsApp Chat
              </a>
              <Link 
                href="/#contact"
                className="flex items-center text-yellow-600 hover:text-yellow-800 transition-colors"
              >
                <span className="mr-2">📧</span>
                Contact Form
              </Link>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Your Appointments</h3>
              <span className="text-sm text-gray-500">{appointments.length} appointments</span>
            </div>
          </div>
          
          <div className="p-6">
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.service_type}</h4>
                        <p className="text-gray-600">{appointment.description}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.address}
                        </p>
                        <p className="text-sm text-gray-500">
                          Booked on: {new Date(appointment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No appointments yet</h4>
                <p className="text-gray-600 mb-6">Book your first service with Computer World</p>
                <Link
                  href="/book-appointment"
                  className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                >
                  Book Your First Service
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
