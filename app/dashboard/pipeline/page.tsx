import { demoPipeline } from '@/lib/demo-data'
import { TrendingUp, Calendar, User, DollarSign } from 'lucide-react'

const stageColors: Record<string, string> = {
  opportunity: 'bg-gray-100 text-gray-700',
  bid_no_bid: 'bg-purple-100 text-purple-800',
  proposal_dev: 'bg-blue-100 text-blue-800',
  submitted: 'bg-amber-100 text-amber-800',
  awarded: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
}

const stageLabel: Record<string, string> = {
  opportunity: 'Opportunity',
  bid_no_bid: 'Bid/No-Bid',
  proposal_dev: 'Proposal Dev',
  submitted: 'Submitted',
  awarded: 'Awarded',
  lost: 'Lost',
}

function fmt(v: number) {
  return `$${(v / 1000000).toFixed(1)}M`
}

export default function PipelinePage() {
  const totalPipeline = demoPipeline.reduce((s, r) => s + r.estValue, 0)
  const weightedPipeline = demoPipeline.reduce((s, r) => s + r.estValue * r.winProbability / 100, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Pipeline / CRM</h1>
        <p className="text-gray-500 text-sm">Government RFP tracking and business development pipeline</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Pipeline', value: fmt(totalPipeline), sub: `${demoPipeline.length} opportunities` },
          { label: 'Weighted Pipeline', value: fmt(weightedPipeline), sub: 'Probability-adjusted' },
          { label: 'Win Rate (Trailing 12mo)', value: '68%', sub: '$22.4M awarded' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{k.label}</div>
            <div className="text-2xl font-bold text-[#003087]">{k.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {demoPipeline.map(rfp => (
          <div key={rfp.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-[#003087]">{rfp.rfpTitle}</h3>
                <div className="text-gray-500 text-sm mt-0.5">{rfp.agencyName}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${stageColors[rfp.status]}`}>
                  {stageLabel[rfp.status]}
                </span>
                <span className="text-lg font-bold text-[#003087]">{fmt(rfp.estValue)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-[#003087]" />
                <span>Deadline: {rfp.deadline}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <User className="w-3.5 h-3.5 text-[#003087]" />
                <span>{rfp.bdOwner}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <DollarSign className="w-3.5 h-3.5 text-[#003087]" />
                <span>Weighted: {fmt(rfp.estValue * rfp.winProbability / 100)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-[#E8A020] h-2 rounded-full" style={{ width: `${rfp.winProbability}%` }} />
                </div>
                <span className="text-xs font-semibold text-gray-700">{rfp.winProbability}%</span>
              </div>
            </div>
            {rfp.daysUntilDeadline <= 30 && (
              <div className="mt-3 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200">
                Deadline in {rfp.daysUntilDeadline} days — action required
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
