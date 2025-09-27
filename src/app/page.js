import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image 
                src="/CW-LOGO.jpg" 
                alt="Computer World Logo" 
                width={48}
                height={48}
                className="rounded-lg"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">COMPUTER WORLD</h1>
              <p className="text-sm text-yellow-600">YOUR IT PARTNER</p>
            </div>
          </div>
          <nav className="space-x-4">
            <Link href="/login" className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
              Book Appointment
            </Link>
          </nav>
        </div>
      </header>

      {/* Rest of your homepage content */}
      <section className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Professional Computer Repair Services</h2>
          <p className="text-xl mb-8">Doorstep service across Surat • Same-day repair • 30-day warranty</p>
          <Link href="/login" className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  )
}
