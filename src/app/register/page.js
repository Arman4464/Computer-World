'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    areaInSurat: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Supabase registration will be added later
    alert('Registration functionality will be added with Supabase')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <Image 
            src="/CW-LOGO.jpg" 
            alt="Computer World" 
            width={60} 
            height={60}
            className="mx-auto rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Computer World for fast appointments</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="+91 XXXXX XXXXX"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Area in Surat *
            </label>
            <input
              type="text"
              name="areaInSurat"
              value={formData.areaInSurat}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="e.g. Adajan, Vesu, Althan"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              placeholder="Create a strong password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-600 hover:text-yellow-500 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-400 flex items-center justify-center space-x-2">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
