'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/Toast'
import Navigation from '@/components/Navigation'
import { useRouter } from 'next/navigation'

export default function BookAppointment() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    deviceType: '',
    brandModel: '',
    problemDescription: '',
    areaInSurat: '',
    urgencyLevel: 1,
    preferredTime: '',
    customerNotes: ''
  })
  const [loading, setLoading] = useState(false)
  const [estimatedCost, setEstimatedCost] = useState('')
  const supabase = createClient()
  const { addToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    calculateEstimatedCost()
  }, [formData.deviceType, formData.problemDescription, formData.urgencyLevel])

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/login')
      return
    }
    setUser(session.user)
  }

  function calculateEstimatedCost() {
    if (!formData.deviceType || !formData.problemDescription) {
      setEstimatedCost('')
      return
    }

    const basePrices = {
      laptop: { screen: '₹3000-5000', virus: '₹500-800', hardware: '₹1000-3000', data: '₹2000-4000', software: '₹300-600' },
      desktop: { screen: '₹4000-8000', virus: '₹500-1000', hardware: '₹800-5000', data: '₹1500-3500', software: '₹300-800' },
      printer: { hardware: '₹800-2500', software: '₹200-500' }
    }

    const problem = formData.problemDescription.toLowerCase()
    const device = formData.deviceType
    
    let cost = '₹500-2000' // default
    
    if (problem.includes('screen') || problem.includes('display')) {
      cost = basePrices[device]?.screen || '₹3000-6000'
    } else if (problem.includes('virus') || problem.includes('malware') || problem.includes('slow')) {
      cost = basePrices[device]?.virus || '₹500-1000'
    } else if (problem.includes('hardware') || problem.includes('motherboard') || problem.includes('ram')) {
      cost = basePrices[device]?.hardware || '₹800-5000'
    } else if (problem.includes('data') || problem.includes('file') || problem.includes('recovery')) {
      cost = basePrices[device]?.data || '₹1500-4000'
    } else if (problem.includes('software') || problem.includes('install') || problem.includes('windows')) {
      cost = basePrices[device]?.software || '₹300-800'
    }

    // Add urgency premium
    if (formData.urgencyLevel >= 8) {
      cost += ' + ₹500 (Emergency)'
    }

    setEstimatedCost(cost)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.from('appointments').insert([
        {
          user_id: user.id,
          device_type: formData.deviceType,
          brand_model: formData.brandModel,
          problem_description: formData.problemDescription,
          area_in_surat: formData.areaInSurat,
          urgency_level: formData.urgencyLevel,
          estimated_cost: estimatedCost,
          preferred_time: formData.preferredTime ? new Date(formData.preferredTime).toISOString() : null,
          admin_notes: formData.customerNotes
        }
      ]).select()

      if (error) throw error

      addToast('Appointment booked successfully! We will contact you within 15 minutes.', 'success')
      
      // Send notification to owner (you can add email/WhatsApp integration here)
      await sendNotificationToOwner(data[0])
      
      router.push('/dashboard')
    } catch (error) {
      addToast(`Error booking appointment: ${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  async function sendNotificationToOwner(appointment) {
    // This would integrate with your WhatsApp Business API or email service
    console.log('New appointment notification:', appointment)
    // Future: Send WhatsApp message to owner
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Computer Repair Service</h1>
          <p className="text-lg text-gray-600">Get professional repair service at your doorstep in Surat</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Device Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Device Type *
                  </label>
                  <select
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select your device</option>
                    <option value="laptop">💻 Laptop</option>
                    <option value="desktop">🖥️ Desktop Computer</option>
                    <option value="printer">🖨️ Printer</option>
                  </select>
                </div>

                {/* Brand and Model */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand & Model
                  </label>
                  <input
                    type="text"
                    name="brandModel"
                    placeholder="e.g., HP Pavilion 15, Dell Inspiron, Canon PIXMA"
                    value={formData.brandModel}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Help us prepare the right tools and parts</p>
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Problem Description *
                  </label>
                  <textarea
                    name="problemDescription"
                    placeholder="Describe the issue: screen broken, virus infection, won't start, slow performance, etc."
                    value={formData.problemDescription}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Area in Surat */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Location in Surat *
                  </label>
                  <input
                    type="text"
                    name="areaInSurat"
                    placeholder="e.g., Adajan, Vesu, Althan, Rander, City Light"
                    value={formData.areaInSurat}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Travel charge: ₹100-250 based on distance</p>
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Urgency Level: {formData.urgencyLevel}/10
                  </label>
                  <input
                    type="range"
                    name="urgencyLevel"
                    min="1"
                    max="10"
                    value={formData.urgencyLevel}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Can Wait</span>
                    <span className={`font-medium ${formData.urgencyLevel >= 8 ? 'text-red-600' : formData.urgencyLevel >= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {formData.urgencyLevel >= 8 ? 'Emergency' : formData.urgencyLevel >= 5 ? 'Urgent' : 'Normal'}
                    </span>
                    <span>Emergency</span>
                  </div>
                  {formData.urgencyLevel >= 8 && (
                    <p className="text-sm text-red-600 mt-1">⚡ Emergency service: +₹500 extra charge</p>
                  )}
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Service hours: 9:00 AM - 8:00 PM (Mon-Sun)</p>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="customerNotes"
                    placeholder="Any special instructions, landmark near your location, etc."
                    value={formData.customerNotes}
                    onChange={handleChange}
                    rows="2"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.deviceType || !formData.problemDescription || !formData.areaInSurat}
                  className="w-full bg-yellow-500 text-white p-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Booking Appointment...</span>
                    </div>
                  ) : (
                    '📅 Book My Appointment'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Service Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Estimated Cost */}
              {estimatedCost && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">💰 Estimated Cost</h3>
                  <p className="text-2xl font-bold text-yellow-600 mb-2">{estimatedCost}</p>
                  <p className="text-sm text-gray-600">+ Travel charge based on location</p>
                  <div className="mt-4 text-xs text-gray-500">
                    <p>✅ 30-day warranty included</p>
                    <p>✅ No hidden charges</p>
                    <p>✅ Pay after service completion</p>
                  </div>
                </div>
              )}

              {/* Service Guarantee */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">🛡️ Our Guarantee</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>15-minute response time</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Same-day service available</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>30-day warranty on all repairs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>No-fix, no-charge policy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Certified technicians</span>
                  </li>
                </ul>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">🚨 Emergency Service</h3>
                <p className="text-sm text-gray-600 mb-4">Need immediate help? Call us directly</p>
                <a
                  href="tel:+919876543210"
                  className="block w-full bg-red-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  📞 Call Now: +91-9876543210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
