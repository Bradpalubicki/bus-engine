'use client'

import { useState, useTransition } from 'react'
import { Plus, Award, AlertTriangle } from 'lucide-react'
import { addCertification } from '@/app/dashboard/technicians/actions'
import { daysFromNow } from '@/lib/status-colors'

type Cert = {
  id: string
  cert_type: string
  cert_number: string | null
  issued_date: string | null
  expiry_date: string | null
}

export function TechDetailClient({ techId, certs }: { techId: string; certs: Cert[] }) {
  const [showForm, setShowForm] = useState(false)
  const [certType, setCertType] = useState('')
  const [certNum, setCertNum] = useState('')
  const [issuedDate, setIssuedDate] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const run = (fn: () => Promise<void>) => {
    setError(null)
    startTransition(async () => {
      try { await fn() } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    })
  }

  return (
    <div className="space-y-3">
      {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}

      {certs.length === 0 ? (
        <p className="text-gray-400 text-sm">No certifications on file</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-100">
              <th className="text-left pb-2 font-medium">Type</th>
              <th className="text-left pb-2 font-medium">Number</th>
              <th className="text-left pb-2 font-medium">Issued</th>
              <th className="text-left pb-2 font-medium">Expiry</th>
              <th className="text-left pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {certs.map(cert => {
              const daysLeft = cert.expiry_date ? daysFromNow(cert.expiry_date) : null
              const isExpired = daysLeft !== null && daysLeft < 0
              const isCritical = daysLeft !== null && daysLeft >= 0 && daysLeft < 30
              const isWarning = daysLeft !== null && daysLeft >= 30 && daysLeft < 90

              return (
                <tr key={cert.id} className={isExpired ? 'bg-red-50/30' : isCritical ? 'bg-amber-50/30' : ''}>
                  <td className="py-2 font-medium text-gray-800 flex items-center gap-1">
                    {(isExpired || isCritical) && <AlertTriangle className={`w-3.5 h-3.5 ${isExpired ? 'text-red-500' : 'text-amber-500'}`} />}
                    {cert.cert_type}
                  </td>
                  <td className="py-2 text-gray-500 text-xs">{cert.cert_number ?? '—'}</td>
                  <td className="py-2 text-gray-500 text-xs">{cert.issued_date ? new Date(cert.issued_date).toLocaleDateString() : '—'}</td>
                  <td className="py-2 text-xs">
                    {cert.expiry_date ? (
                      <span className={isExpired ? 'text-red-600 font-medium' : isCritical ? 'text-amber-600 font-medium' : 'text-gray-500'}>
                        {new Date(cert.expiry_date).toLocaleDateString()}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="py-2">
                    {isExpired ? (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Expired</span>
                    ) : isCritical ? (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Exp. soon ({daysLeft}d)</span>
                    ) : isWarning ? (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">({daysLeft}d)</span>
                    ) : (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Valid</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {showForm ? (
        <div className="bg-[#F8F9FB] rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Cert Type *</label>
              <input value={certType} onChange={e => setCertType(e.target.value)} placeholder="e.g., ASE, CDL, OSHA"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Cert Number</label>
              <input value={certNum} onChange={e => setCertNum(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Issued Date</label>
              <input value={issuedDate} onChange={e => setIssuedDate(e.target.value)} type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Expiry Date</label>
              <input value={expiryDate} onChange={e => setExpiryDate(e.target.value)} type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="text-xs text-gray-500 px-3 py-1.5 border border-gray-200 rounded-lg">Cancel</button>
            <button
              disabled={!certType || isPending}
              onClick={() => run(async () => {
                await addCertification(techId, { cert_type: certType, cert_number: certNum || undefined, issued_date: issuedDate || undefined, expiry_date: expiryDate || undefined })
                setCertType(''); setCertNum(''); setIssuedDate(''); setExpiryDate(''); setShowForm(false)
              })}
              className="text-xs bg-[#003087] text-white px-3 py-1.5 rounded-lg disabled:opacity-50"
            >
              {isPending ? 'Adding...' : 'Add Cert'}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-1 text-xs text-[#003087] font-medium hover:underline">
          <Plus className="w-3 h-3" /> Add Certification
        </button>
      )}
    </div>
  )
}
