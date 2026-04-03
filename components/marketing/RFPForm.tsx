'use client'
import { useState } from 'react'

interface RFPFormProps {
  brand?: 'CCW' | 'TSI' | 'SBL'
  accentColor?: string
}

export default function RFPForm({ brand = 'CCW', accentColor = '#003087' }: RFPFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tsiFields = brand === 'TSI'
  const sblFields = brand === 'SBL'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: brand }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please call us directly at (951) 372-0082.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Request Received</h3>
        <p className="text-gray-500">Our team will follow up within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Agency / Organization *</label>
        <input
          name="agency"
          required
          placeholder="City of Riverside Transit"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Fleet Size *</label>
        <select name="fleetSize" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
          <option value="">Select fleet size</option>
          <option value="1-25">1–25 buses</option>
          <option value="26-100">26–100 buses</option>
          <option value="101-500">101–500 buses</option>
          <option value="500+">500+ buses</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          {tsiFields ? 'Bus Type / Fuel Preference' : sblFields ? 'Lease Type' : 'Service Needed'} *
        </label>
        {tsiFields ? (
          <select name="serviceType" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
            <option value="">Select preference</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG / LNG</option>
            <option value="electric">Electric / BEV</option>
            <option value="hybrid">Hybrid</option>
            <option value="any">Any / No Preference</option>
          </select>
        ) : sblFields ? (
          <select name="serviceType" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
            <option value="">Select lease type</option>
            <option value="short-term">Short-Term / Gap (1–12 months)</option>
            <option value="contract">Contract Lease (1–5 years)</option>
            <option value="lease-to-own">Lease-to-Own</option>
            <option value="employee-shuttle">Employee Shuttle</option>
          </select>
        ) : (
          <select name="serviceType" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
            <option value="">Select service</option>
            <option value="midlife-refurbishment">Midlife Refurbishment</option>
            <option value="zeps-electric">ZEPS Electric Conversion</option>
            <option value="cng-repower">CNG Repower</option>
            <option value="collision-repair">Collision Repair</option>
            <option value="leasing">Leasing</option>
            <option value="other">Other</option>
          </select>
        )}
      </div>
      {sblFields && (
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Needed By</label>
          <input
            name="neededBy"
            type="date"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
          />
        </div>
      )}
      <div className={sblFields ? 'md:col-span-1' : 'md:col-span-2'}>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Contact Email *</label>
        <input
          name="email"
          type="email"
          required
          placeholder="fleet@transitagency.gov"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
        />
      </div>
      {error && <p className="md:col-span-2 text-red-500 text-sm">{error}</p>}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full font-bold py-4 rounded-xl text-base hover:brightness-110 transition-all disabled:opacity-60"
          style={{ backgroundColor: accentColor, color: brand === 'SBL' ? '#fff' : '#0A1628' }}
        >
          {loading ? 'Sending…' : 'Send Request →'}
        </button>
      </div>
    </form>
  )
}
