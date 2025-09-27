'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import Header from '@/components/Header'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const services = [
    {
      name: "Screen Replacement",
      price: "₹3000-8000",
      icon: "🖥️",
      description: "LCD/LED screen repairs for laptops and desktops with original quality parts",
      features: ["Original parts", "Same-day service", "6-month warranty"]
    },
    {
      name: "Virus Removal",
      price: "₹500-1000",
      icon: "🛡️",
      description: "Complete malware removal and system optimization for peak performance",
      features: ["Deep cleaning", "Performance boost", "Prevention setup"]
    },
    {
      name: "Hardware Repair",
      price: "₹800-5000",
      icon: "🔧",
      description: "Motherboard, RAM, storage, and component repairs by certified technicians",
      features: ["Component-level repair", "Quality parts", "Professional tools"]
    },
    {
      name: "Data Recovery",
      price: "₹1500-4000",
      icon: "💾",
      description: "Recover lost files from damaged hard drives, SSDs, and storage devices",
      features: ["90% success rate", "Secure process", "No data, no charge"]
    },
    {
      name: "Software Installation",
      price: "₹300-800",
      icon: "💿",
      description: "OS installation, software setup, and system configuration services",
      features: ["Licensed software", "Driver installation", "System optimization"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Patel",
      location: "Adajan",
      rating: 5,
      comment: "Excellent service! My laptop screen was replaced within 2 hours. Professional work and fair pricing.",
      service: "Screen Replacement"
    },
    {
      name: "Priya Shah",
      location: "Vesu", 
      rating: 5,
      comment: "Computer World saved my important files from a crashed hard drive. Highly recommend their data recovery service!",
      service: "Data Recovery"
    },
    {
      name: "Amit Kumar",
      location: "Rander",
      rating: 5,
      comment: "Fast virus removal and system cleanup. My computer runs like new now. Great doorstep service!",
      service: "Virus Removal"
    }
  ];

  const whyChooseUs = [
    {
      icon: "🚗",
      title: "Doorstep Service",
      description: "We come to your location anywhere in Surat",
      details: "No need to carry heavy computers. Our technicians reach your doorstep with all necessary tools."
    },
    {
      icon: "⚡",
      title: "Same Day Service",
      description: "Most repairs completed within hours",
      details: "Emergency repairs available with priority booking for urgent business needs."
    },
    {
      icon: "🛡️",
      title: "30-Day Warranty",
      description: "All repairs backed by comprehensive warranty",
      details: "Free service calls if the same issue occurs within 30 days of repair."
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description: "No hidden charges, upfront cost estimates",
      details: "Get instant quotes with detailed breakdown. Pay only after successful repair."
    },
    {
      icon: "⭐",
      title: "Expert Technicians",
      description: "5+ years experience with 500+ satisfied customers",
      details: "Certified professionals trained in latest repair techniques and technologies."
    },
    {
      icon: "🔒",
      title: "Data Security",
      description: "Your privacy and data safety is our priority",
      details: "Strict confidentiality protocols and secure data handling procedures."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Add pt-16 to account for fixed header */}
      <div className="pt-16">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Professional Computer Repair
                  <span className="block text-yellow-200">Services in Surat</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
                  Doorstep service • Same-day repair • 30-day warranty • 500+ happy customers
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    href={user ? "/book-appointment" : "/login"}
                    className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg text-center"
                  >
                    📅 Book Instant Appointment
                  </Link>
                  <a 
                    href="tel:+919876543210"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-yellow-600 transition-all duration-300 shadow-lg text-center"
                  >
                    📞 Call: +91-9876543210
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-yellow-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">⚡</span>
                    <span>15-min response</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🛡️</span>
                    <span>30-day warranty</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">⭐</span>
                    <span>500+ customers</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">🚀 Get Instant Quote</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-4">
                      <span>💻 Device Type</span>
                      <span className="text-sm opacity-80">Laptop/Desktop/Printer</span>
                    </div>
                    <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-4">
                      <span>🔧 Problem</span>
                      <span className="text-sm opacity-80">Describe your issue</span>
                    </div>
                    <div className="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-4">
                      <span>📍 Location</span>
                      <span className="text-sm opacity-80">Your area in Surat</span>
                    </div>
                    <Link 
                      href={user ? "/book-appointment" : "/login"}
                      className="block w-full bg-white text-yellow-600 py-3 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
                    >
                      Get My Quote Now →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional computer repair with transparent pricing, genuine parts, and guaranteed quality
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-yellow-200"
                >
                  <div className="text-5xl mb-6 text-center">{service.icon}</div>
                  <h3 className="font-bold text-2xl mb-3 text-gray-900 text-center">{service.name}</h3>
                  <p className="text-yellow-600 font-bold text-3xl text-center mb-4">{service.price}</p>
                  <p className="text-gray-600 text-center leading-relaxed mb-6">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Link 
                      href={user ? "/book-appointment" : "/login"}
                      className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold group-hover:shadow-lg"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Trusted Computer Repair Experts in Surat
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  For over 5 years, Computer World has been providing reliable, 
                  professional computer repair services across Surat. We specialize 
                  in doorstep service, bringing expert technicians directly to your 
                  location with all the tools needed for most repairs.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">500+</div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">5+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">30</div>
                    <div className="text-gray-600">Day Warranty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
                    <div className="text-gray-600">Support Available</div>
                  </div>
                </div>
                <Link 
                  href={user ? "/book-appointment" : "/register"}
                  className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Get Started Today
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-yellow-200 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Certified technicians with 5+ years experience</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-yellow-200 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Genuine parts and transparent pricing</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-yellow-200 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Same-day service across all Surat areas</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-yellow-200 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>30-day warranty on all repairs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Computer World?</h2>
              <p className="text-xl text-gray-600">Trusted by 500+ customers across Surat for reliable computer solutions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl mb-4 text-center">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">{item.title}</h3>
                  <p className="text-gray-700 mb-4 text-center text-lg">{item.description}</p>
                  <p className="text-gray-600 text-sm text-center">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-xl text-gray-600">Real feedback from satisfied customers across Surat</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">Ready to Fix Your Computer?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join 500+ satisfied customers who trust Computer World for reliable repair services
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href={user ? "/book-appointment" : "/login"}
                className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                📅 Book Appointment Now
              </Link>
              <a 
                href="tel:+919876543210"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-yellow-600 transition-colors shadow-lg"
              >
                📞 Call: +91-9876543210
              </a>
            </div>
            
            <p className="text-yellow-100">
              🕐 Available 7 days a week • ⚡ 15-minute response time • 🛡️ 30-day warranty
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">CW</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">COMPUTER WORLD</h3>
                    <p className="text-yellow-400 text-sm">YOUR IT PARTNER</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Professional computer repair services in Surat with 5+ years of experience. 
                  We provide doorstep service, same-day repairs, and 30-day warranty on all services.
                </p>
                <div className="flex space-x-4">
                  <a href="tel:+919876543210" className="bg-green-600 p-3 rounded-lg hover:bg-green-700 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </a>
                  <a href="https://wa.me/919876543210" className="bg-green-600 p-3 rounded-lg hover:bg-green-700 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#services" className="hover:text-yellow-400 transition-colors">Services</Link></li>
                  <li><Link href="#about" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
                  <li><Link href="#testimonials" className="hover:text-yellow-400 transition-colors">Reviews</Link></li>
                  <li><Link href={user ? "/book-appointment" : "/login"} className="hover:text-yellow-400 transition-colors">Book Appointment</Link></li>
                  {user && (
                    <li><Link href="/dashboard" className="hover:text-yellow-400 transition-colors">Dashboard</Link></li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>+91-9876543210</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>Surat, Gujarat</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>🕐</span>
                    <span>Mon-Sun: 9AM-8PM</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>⚡</span>
                    <span>15-min response</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Computer World. Professional IT services in Surat. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919876543210" 
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 z-50 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
