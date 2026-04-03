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
        <label htmlFor="agency" className="block text-xs font-semibold text-gray-600 mb-1.5">Agency / Organization *</label>
        <input
          id="agency"
          name="agency"
          required
          aria-required="true"
          placeholder="City of Riverside Transit"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
        />
      </div>
      <div>
        <label htmlFor="fleetSize" className="block text-xs font-semibold text-gray-600 mb-1.5">Fleet Size *</label>
        <select id="fleetSize" name="fleetSize" required aria-required="true" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
          <option value="">Select fleet size</option>
          <option value="1-25">1–25 buses</option>
          <option value="26-100">26–100 buses</option>
          <option value="101-500">101–500 buses</option>
          <option value="500+">500+ buses</option>
        </select>
      </div>
      <div>
        <label htmlFor="serviceType" className="block text-xs font-semibold text-gray-600 mb-1.5">
          {tsiFields ? 'Bus Type / Fuel Preference' : sblFields ? 'Lease Type' : 'Service Needed'} *
        </label>
        {tsiFields ? (
          <select id="serviceType" name="serviceType" required aria-required="true" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
            <option value="">Select preference</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG / LNG</option>
            <option value="electric">Electric / BEV</option>
            <option value="hybrid">Hybrid</option>
            <option value="any">Any / No Preference</option>
          </select>
        ) : sblFields ? (
          <select id="serviceType" name="serviceType" required aria-required="true" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
            <option value="">Select lease type</option>
            <option value="short-term">Short-Term / Gap (1–12 months)</option>
            <option value="contract">Contract Lease (1–5 years)</option>
            <option value="lease-to-own">Lease-to-Own</option>
            <option value="employee-shuttle">Employee Shuttle</option>
          </select>
        ) : (
          <select id="serviceType" name="serviceType" required aria-required="true" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
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
          <label htmlFor="neededBy" className="block text-xs font-semibold text-gray-600 mb-1.5">Needed By</label>
          <input
            id="neededBy"
            name="neededBy"
            type="date"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
          />
        </div>
      )}
      <div className={sblFields ? 'md:col-span-1' : 'md:col-span-2'}>
        <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1.5">Contact Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-required="true"
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
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
            Secured by SSL
          </span>
          <span className="text-gray-300">·</span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Privacy Protected
          </span>
          <span className="text-gray-300">·</span>
          <span>Your data is never shared</span>
        </div>
      </div>
    </form>
  )
}
