'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace('/dashboard')
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setCheckingAuth(false)
      }
    }
    checkUser()
  }, [router])

  const validateForm = () => {
    const newErrors = {}

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation (Indian mobile number)
    const phoneRegex = /^[6-9]\d{9}$/
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Phone number validation - only allow digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '')
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }))
      }
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setSuccessMessage('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone
          }
        }
      })

      if (error) throw error

      // Show success message
      setSuccessMessage(
        `Registration successful! A confirmation email has been sent to ${formData.email}. Please check your inbox and click the confirmation link to activate your account.`
      )
      
      // Clear form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      })

    } catch (error) {
      setErrors({ general: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (successMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{successMessage}</p>
            <div className="space-y-3">
              <Link 
                href="/login"
                className="block w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors text-center font-semibold"
              >
                Go to Login
              </Link>
              <Link 
                href="/"
                className="block text-gray-500 hover:text-gray-700 transition-colors text-center"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">CW</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Computer World today</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter 10-digit mobile number"
                disabled={isLoading}
                maxLength="10"
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Create a strong password"
              disabled={isLoading}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all ${
                errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-600 hover:text-yellow-500 font-semibold">
              Sign In
            </Link>
          </p>
          <Link 
            href="/"
            className="block mt-4 text-gray-500 hover:text-gray-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
