'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image 
              src="/CW-LOGO.jpg" 
              alt="Computer World" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <Link href="/" className="text-yellow-600 hover:text-yellow-500">
            Logout
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Welcome to Computer World</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Book New Appointment</h3>
            <p className="text-gray-600 mb-6">Schedule a repair service for your device</p>
            <Link 
              href="/book-appointment" 
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
            >
              Book Appointment
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">My Appointments</h3>
            <p className="text-gray-600 mb-6">View your appointment history and status</p>
            <div className="text-gray-500">
              No appointments yet. Book your first appointment!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
