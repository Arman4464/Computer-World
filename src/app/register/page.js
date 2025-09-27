'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    areaInSurat: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const { user, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    // Insert additional user profile data
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: user.id,
        full_name: formData.fullName,
        phone: formData.phone,
        area_in_surat: formData.areaInSurat
      }
    ])

    if (profileError) {
      alert(profileError.message)
    } else {
      alert('Registration successful! Please check your email to verify your account.')
      router.push('/login')
    }
    setLoading(false)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Computer World Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            name="areaInSurat"
            placeholder="Area in Surat"
            value={formData.areaInSurat}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-yellow-600 hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
