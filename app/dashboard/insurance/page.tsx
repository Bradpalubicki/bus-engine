import { AlertTriangle, Shield } from 'lucide-react'
import { daysFromNow, formatMoney } from '@/lib/status-colors'
import { demoInsurance } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

// Extended insurance policies including self-insured coverage
const allPolicies = [
  ...demoInsurance,
  { id: 'ins-7', policyType: 'Professional / E&O Liability', carrier: 'Self-Insured', policyNumber: 'SI-CCW-EO', coverageLimit: 5000000, effectiveDate: '2026-01-01', expiryDate: '2026-11-30', status: 'active', daysUntilExpiry: 258 },
  { id: 'ins-8', policyType: 'Property / Equipment', carrier: 'Self-Insured Fund', policyNumber: 'SI-CCW-PROP', coverageLimit: 15000000, effectiveDate: '2026-01-01', expiryDate: '2026-12-31', status: 'active', daysUntilExpiry: 289 },
]

export default async function InsurancePage() {
  const today = new Date().toISOString().split('T')[0]
  const policies = allPolicies

  const expiringPolicies = policies.filter(p => {
    if (!p.expiryDate) return false
    const days = daysFromNow(p.expiryDate)
    return days >= 0 && days <= 90
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Insurance & Risk</h1>
          <p className="text-gray-500 text-sm">{policies.length} coverage types · {expiringPolicies.length > 0 ? `${expiringPolicies.length} expiring within 90 days` : 'All current'}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border">
          <Shield className="w-4 h-4" />
          Self-Insurance Program Active
        </div>
      </div>

      {expiringPolicies.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-bold text-amber-900">Renewal Alert</div>
            {expiringPolicies.map(p => {
              const days = daysFromNow(p.expiryDate!)
              return (
                <div key={p.id} className="text-sm text-amber-700">
                  {p.policyType} expires in <strong>{days}</strong> days — {p.expiryDate}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Self-Insurance Reserve Fund Widget */}
      <div className="bg-[#003087] text-white rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-1">Self-Insurance Reserve Fund</div>
            <div className="text-4xl font-bold">$4,200,000</div>
          </div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl px-4 py-2">
            <div className="text-green-300 text-sm font-bold">Funded</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-blue-300 text-xs mb-1">Active Claims</div>
            <div className="text-2xl font-bold">2</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-blue-300 text-xs mb-1">Reserved Amount</div>
            <div className="text-2xl font-bold">$86K</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-blue-300 text-xs mb-1">YTD Losses</div>
            <div className="text-2xl font-bold">$124K</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-blue-300">
          DEMO — Connect to CCW&apos;s risk management system for live reserve fund data.
        </div>
      </div>

      {/* Policy cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map(policy => {
          const daysLeft = policy.expiryDate ? daysFromNow(policy.expiryDate) : null
          const isExpiring = daysLeft !== null && daysLeft >= 0 && daysLeft <= 90
          const isOverdue = daysLeft !== null && daysLeft < 0

          return (
            <div
              key={policy.id}
              className={`bg-white rounded-xl border shadow-sm p-5 ${isOverdue ? 'border-red-300' : isExpiring ? 'border-amber-300' : 'border-gray-100'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-900">{policy.policyType}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{policy.carrier}</div>
                  {policy.policyNumber && <div className="text-xs font-mono text-gray-400 mt-0.5">{policy.policyNumber}</div>}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    isOverdue ? 'bg-red-100 text-red-700' :
                    isExpiring ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {isOverdue ? 'Expired' : isExpiring ? `${daysLeft}d left` : 'Active'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-400">Coverage Limit</div>
                  <div className="font-bold text-gray-800">
                    {policy.coverageLimit ? formatMoney(policy.coverageLimit) : 'Statutory'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Expiry Date</div>
                  <div className={`font-bold ${isExpiring ? 'text-amber-700' : isOverdue ? 'text-red-700' : 'text-gray-800'}`}>
                    {policy.expiryDate ? new Date(policy.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active claims */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Active Claims</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Claim Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Opened</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Reserved</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-800">Workers Comp — Riverside</td>
              <td className="px-4 py-3 text-gray-500">Feb 14, 2026</td>
              <td className="px-4 py-3 font-bold text-gray-800">$42,000</td>
              <td className="px-4 py-3"><span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-bold">In Review</span></td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-800">Garage Keepers — Vehicle Damage</td>
              <td className="px-4 py-3 text-gray-500">Mar 02, 2026</td>
              <td className="px-4 py-3 font-bold text-gray-800">$44,000</td>
              <td className="px-4 py-3"><span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold">Open</span></td>
            </tr>
          </tbody>
        </table>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
          DEMO — Connect to CCW&apos;s risk management system for live claims data.
        </div>
      </div>
    </div>
  )
}
