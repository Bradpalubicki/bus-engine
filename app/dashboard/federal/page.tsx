import { Globe, AlertTriangle, TrendingUp, Target } from 'lucide-react'
import { demoSAMOpportunities } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

const bidColors: Record<string, string> = {
  pursuing:  'bg-green-100 text-green-700',
  no_bid:    'bg-gray-100 text-gray-500',
  pending:   'bg-amber-100 text-amber-700',
  submitted: 'bg-blue-100 text-blue-700',
  awarded:   'bg-purple-100 text-purple-700',
}

const setAsideColors: Record<string, string> = {
  'Total Small Business': 'bg-blue-50 text-blue-700',
  'SDVOSB': 'bg-purple-50 text-purple-700',
  '8(a)': 'bg-orange-50 text-orange-700',
}

function fmt(n: number | null) {
  if (!n) return 'TBD'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  return `$${(n / 1_000).toFixed(0)}K`
}

function daysUntil(dateStr: string) {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000)
}

export default async function FederalPage() {
  const pursuing = demoSAMOpportunities.filter(o => o.bid_decision === 'pursuing')
  const pipelineValue = pursuing.reduce((sum, o) => sum + (o.estimated_value ?? 0), 0)
  const dueSoon = demoSAMOpportunities.filter(o => {
    if (!o.response_deadline || o.bid_decision === 'no_bid') return false
    const d = daysUntil(o.response_deadline)
    return d >= 0 && d <= 21
  })

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Federal Opportunity Tracker</h1>
          <p className="text-gray-500 text-sm">
            SAM.gov · UEI: QN7UN15K9NP2 · {demoSAMOpportunities.length} opportunities tracked
          </p>
        </div>
        <a
          href="https://sam.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#003087] font-semibold hover:underline"
        >
          <Globe className="w-4 h-4" />
          Open SAM.gov →
        </a>
      </div>

      {/* SAM Registration Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-4">
        <div className="text-2xl">🏛️</div>
        <div className="flex-1">
          <div className="font-bold text-blue-900">SAM.gov Registration Active</div>
          <div className="text-sm text-blue-700 mt-0.5">
            UEI: QN7UN15K9NP2 · CAGE: 1QA89 · NAICS: 336999, 811310, 336212, 336211
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-blue-600 font-medium">Expires: August 25, 2026</span>
            <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {daysUntil('2026-08-25')} days remaining
            </span>
          </div>
        </div>
      </div>

      {/* Deadline alert */}
      {dueSoon.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-bold text-red-900">Response Deadlines Within 21 Days</div>
            {dueSoon.map(o => {
              const d = daysUntil(o.response_deadline!)
              return (
                <div key={o.id} className="text-sm text-red-700">
                  {o.title} — due in <strong>{d}</strong> days ({o.response_deadline})
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Opportunities Tracked', value: demoSAMOpportunities.length, icon: Globe, color: 'text-[#003087]' },
          { label: 'Actively Pursuing', value: pursuing.length, icon: Target, color: 'text-green-600' },
          { label: 'Pursuit Pipeline', value: fmt(pipelineValue), icon: TrendingUp, color: 'text-green-600' },
          { label: 'Deadlines ≤ 21 Days', value: dueSoon.length, icon: AlertTriangle, color: dueSoon.length > 0 ? 'text-red-600' : 'text-gray-500' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Opportunity Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#003087]" />
          <h2 className="font-bold text-gray-900">Federal Opportunities</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Opportunity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">NAICS</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Est. Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Deadline</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Set-Aside</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {demoSAMOpportunities.map(opp => {
              const bc = bidColors[opp.bid_decision] ?? 'bg-gray-100 text-gray-600'
              const deadline = opp.response_deadline ? daysUntil(opp.response_deadline) : null
              const deadlineUrgent = deadline !== null && deadline >= 0 && deadline <= 14
              return (
                <tr key={opp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{opp.title}</div>
                    <div className="text-xs text-gray-400">{opp.department}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{opp.naics_code}</td>
                  <td className="px-4 py-3 font-bold text-gray-800">{fmt(opp.estimated_value)}</td>
                  <td className={`px-4 py-3 ${deadlineUrgent ? 'text-red-700 font-bold' : 'text-gray-500'}`}>
                    {opp.response_deadline
                      ? new Date(opp.response_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : '—'}
                    {deadline !== null && deadline >= 0 && (
                      <span className={`ml-1 text-xs ${deadlineUrgent ? 'text-red-600' : 'text-gray-400'}`}>
                        ({deadline}d)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {opp.set_aside ? (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${setAsideColors[opp.set_aside] ?? 'bg-gray-100 text-gray-600'}`}>
                        {opp.set_aside}
                      </span>
                    ) : <span className="text-gray-400">None</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold capitalize ${bc}`}>
                      {opp.bid_decision.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
          DEMO — Connect SAM_GOV_API_KEY to sync live opportunities matching NAICS codes 336999, 811310, 336212, 336211.
        </div>
      </div>
    </div>
  )
}
