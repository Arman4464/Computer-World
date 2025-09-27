'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    deviceType: '',
    brandModel: '',
    problemDescription: '',
    areaInSurat: '',
    urgencyLevel: 1,
    preferredTime: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    alert('Appointment booking functionality will be added with Supabase')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <Image 
              src="/CW-LOGO.jpg" 
              alt="Computer World" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <h1 className="text-xl font-bold">Book Appointment</h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Book Your Repair Service</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Device Type *
              </label>
              <select
                name="deviceType"
                value={formData.deviceType}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select Device Type</option>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="printer">Printer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Brand and Model
              </label>
              <input
                type="text"
                name="brandModel"
                placeholder="e.g. HP Pavilion, Dell Inspiron"
                value={formData.brandModel}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Problem Description *
              </label>
              <textarea
                name="problemDescription"
                placeholder="Describe the issue with your device"
                value={formData.problemDescription}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Area in Surat *
              </label>
              <input
                type="text"
                name="areaInSurat"
                placeholder="e.g. Adajan, Vesu, Althan"
                value={formData.areaInSurat}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Urgency Level (1-10)
              </label>
              <input
                type="range"
                name="urgencyLevel"
                min="1"
                max="10"
                value={formData.urgencyLevel}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Normal</span>
                <span>Current: {formData.urgencyLevel}</span>
                <span>Emergency</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
