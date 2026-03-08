import { demoContracts } from '@/lib/demo-data'
import { FileText, CheckCircle, Clock } from 'lucide-react'

function formatM(v: number) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(2)}M`
  return `$${v.toLocaleString()}`
}

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Contracts</h1>
        <p className="text-gray-500 text-sm">{demoContracts.length} active government transit contracts</p>
      </div>

      <div className="space-y-4">
        {demoContracts.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-mono text-xs text-gray-400 mb-1">{c.contractNumber}</div>
                <h2 className="text-lg font-bold text-[#003087]">{c.title}</h2>
                <div className="text-gray-500 text-sm mt-1">{c.agencyName} · {c.busCount} buses</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#003087]">{formatM(c.value)}</div>
                <div className="text-xs text-gray-400">contract value</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-500">Overall Completion</span>
                <span className="text-sm font-bold text-[#003087]">{c.percentComplete}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-[#003087] h-3 rounded-full"
                  style={{ width: `${c.percentComplete}%` }}
                />
              </div>
            </div>

            {/* Financial grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { label: 'Revenue Earned', value: formatM(c.revenueEarned), color: 'text-green-700' },
                { label: 'Invoiced', value: formatM(c.invoiced), color: 'text-blue-700' },
                { label: 'Collected', value: formatM(c.collected), color: 'text-[#003087]' },
                { label: 'Costs Incurred', value: formatM(c.costsIncurred), color: 'text-gray-700' },
              ].map(f => (
                <div key={f.label} className="bg-[#F8F9FB] rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">{f.label}</div>
                  <div className={`text-lg font-bold ${f.color}`}>{f.value}</div>
                </div>
              ))}
            </div>

            {/* Milestones */}
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Milestones</div>
              <div className="space-y-2">
                {c.milestones.map(m => (
                  <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#F8F9FB]">
                    {m.completedAt ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <span className="text-xs font-medium text-gray-700">{m.title}</span>
                    </div>
                    <div className="text-xs text-gray-500">Due: {m.dueDate}</div>
                    <div className="text-xs font-semibold text-[#003087]">{formatM(m.billingAmount)}</div>
                    {m.completedAt && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Billed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
