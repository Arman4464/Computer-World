import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const services = [
    {
      name: "Screen Replacement",
      price: "₹3000-8000",
      icon: "🖥️",
      description: "LCD/LED screen repairs for laptops and desktops"
    },
    {
      name: "Virus Removal",
      price: "₹500-1000",
      icon: "🛡️",
      description: "Complete malware removal and system cleanup"
    },
    {
      name: "Hardware Repair",
      price: "₹800-5000",
      icon: "🔧",
      description: "Motherboard, RAM, HDD repairs and upgrades"
    },
    {
      name: "Data Recovery",
      price: "₹1500-4000",
      icon: "💾",
      description: "Recover lost files from damaged storage devices"
    },
    {
      name: "Software Installation",
      price: "₹300-800",
      icon: "💿",
      description: "OS installation, software setup and configuration"
    }
  ];

  const features = [
    {
      icon: "🚗",
      title: "Doorstep Service",
      description: "We come to your location anywhere in Surat",
      details: "Travel charges: ₹100-250 based on location"
    },
    {
      icon: "⚡",
      title: "Same Day Service",
      description: "Most repairs completed within hours",
      details: "Emergency service available with priority booking"
    },
    {
      icon: "🛡️",
      title: "30-Day Warranty",
      description: "All repairs backed by our guarantee",
      details: "No-fix, no-charge policy with original parts"
    },
    {
      icon: "⭐",
      title: "5+ Years Experience",
      description: "500+ satisfied customers in Surat",
      details: "Certified technicians with proven expertise"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image 
                src="/CW-LOGO.jpg" 
                alt="Computer World Logo" 
                width={60} 
                height={60}
                className="rounded-lg shadow-md"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">COMPUTER WORLD</h1>
              <p className="text-sm text-yellow-600 font-medium">YOUR IT PARTNER</p>
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <Link 
              href="#services" 
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
            >
              Services
            </Link>
            <Link 
              href="#contact" 
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/login" 
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-md font-semibold"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Professional Computer Repair
            <span className="block text-yellow-200">Services in Surat</span>
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Doorstep service • Same-day repair • 30-day warranty • 500+ happy customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/login" 
              className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Book Instant Appointment
            </Link>
            <a 
              href="tel:+919876543210" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-yellow-600 transition-all duration-300 shadow-lg"
            >
              📞 Call Now: +91-9876543210
            </a>
          </div>
          <div className="mt-8 text-yellow-200">
            <p className="text-lg">⚡ Instant Quote • 🕐 15-minute response time</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Services</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional computer repair with transparent pricing and guaranteed quality
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-yellow-500"
              >
                <div className="text-4xl mb-4 text-center">{service.icon}</div>
                <h4 className="font-bold text-xl mb-3 text-gray-900 text-center">{service.name}</h4>
                <p className="text-yellow-600 font-bold text-2xl text-center mb-4">{service.price}</p>
                <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
                <div className="mt-6 text-center">
                  <Link 
                    href="/login" 
                    className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Computer World?</h3>
            <p className="text-xl text-gray-600">Trusted by 500+ customers across Surat</p>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h4>
                    <p className="text-gray-700 mb-3 text-lg">{feature.description}</p>
                    <p className="text-yellow-600 font-medium">{feature.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Quote Section */}
      <section className="py-20 bg-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Get Instant Quote</h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Share your device details and get accurate pricing within 15 minutes
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 text-gray-900">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-bold mb-3 text-lg">📱 Device Information:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Device type (Laptop/Desktop/Printer)</li>
                  <li>• Brand and model</li>
                  <li>• Problem description</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-lg">📍 Location Details:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Your area in Surat</li>
                  <li>• Preferred time slot</li>
                  <li>• Urgency level (1-10)</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <Link 
                href="/login" 
                className="bg-yellow-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors shadow-lg"
              >
                Start Booking Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Fix Your Device?</h3>
          <p className="text-xl mb-8 text-gray-300">
            Professional technicians ready to help • Available 7 days a week
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a 
              href="tel:+919876543210" 
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center space-x-2"
            >
              <span>📞</span>
              <span>Call: +91-9876543210</span>
            </a>
            <a 
              href="https://wa.me/919876543210" 
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center space-x-2"
            >
              <span>💬</span>
              <span>WhatsApp Chat</span>
            </a>
          </div>
          <div className="text-gray-300">
            <p className="text-lg">🕐 Response Time: Within 15 minutes</p>
            <p className="text-lg">📍 Service Area: All Surat locations</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image 
                  src="/CW-LOGO.jpg" 
                  alt="Computer World" 
                  width={40} 
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-bold">COMPUTER WORLD</h4>
                  <p className="text-yellow-500 text-sm">YOUR IT PARTNER</p>
                </div>
              </div>
              <p className="text-gray-400">
                Professional computer repair services in Surat with 5+ years of experience and 500+ satisfied customers.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#services" className="hover:text-yellow-500">Services</Link></li>
                <li><Link href="/login" className="hover:text-yellow-500">Book Appointment</Link></li>
                <li><Link href="#contact" className="hover:text-yellow-500">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contact Info</h5>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +91-9876543210</li>
                <li>📍 Surat, Gujarat</li>
                <li>🕐 Mon-Sun: 9AM-8PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Computer World. Professional IT services in Surat.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>
    </div>
  )
}
