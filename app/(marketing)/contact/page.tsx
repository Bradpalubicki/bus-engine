'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  agency: z.string().min(2, 'Agency name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Select a service'),
  message: z.string().min(10, 'Please provide more detail'),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setSubmitted(true)
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003087] mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Ready to discuss your fleet rehabilitation program? Our engineering team is ready to help.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-[#003087] mb-6">Get a Program Assessment</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-800">Request Received!</h3>
                <p className="text-green-600 mt-2">Our team will contact you within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input {...register('name')} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transit Agency</label>
                    <input {...register('agency')} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]" />
                    {errors.agency && <p className="text-red-500 text-xs mt-1">{errors.agency.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input {...register('email')} type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                    <input {...register('phone')} type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                  <select {...register('service')} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]">
                    <option value="">Select a service...</option>
                    <option value="midlife-overhaul">Midlife Overhaul / Remanufacturing</option>
                    <option value="cng-repower">CNG / LNG Repower</option>
                    <option value="zeps-electric">ZEPS Electric Conversion</option>
                    <option value="body-paint">Body, Paint & Structural</option>
                    <option value="interior-rehab">Interior Rehabilitation</option>
                    <option value="cng-retanking">CNG Re-tanking</option>
                    <option value="other">Other / General Inquiry</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your fleet and project</label>
                  <textarea {...register('message')} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]" placeholder="Number of buses, make/model/year, service type needed..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#003087] text-white py-3 rounded-lg font-semibold hover:bg-[#004db3] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Request Assessment'}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-6">
            <div className="bg-[#F8F9FB] rounded-xl p-6">
              <h3 className="font-bold text-[#003087] mb-4">Headquarters</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#003087] mt-0.5" />
                  <span>1863 Service Court<br />Riverside, CA 92507</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#003087]" />
                  <span>(951) 684-9585</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#003087]" />
                  <span>info@completecoach.com</span>
                </div>
              </div>
            </div>
            <div className="bg-[#003087] text-white rounded-xl p-6">
              <h3 className="font-bold mb-3">Business Hours</h3>
              <div className="text-blue-100 text-sm space-y-1">
                <div className="flex justify-between"><span>Monday – Friday</span><span>7:00 AM – 5:00 PM PT</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>By appointment</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
            <div className="bg-[#E8A020] text-white rounded-xl p-6">
              <h3 className="font-bold mb-2">Emergency Service</h3>
              <p className="text-amber-100 text-sm">For urgent fleet issues, call our 24-hour dispatch line: <strong>(951) 684-9585 ext. 911</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
