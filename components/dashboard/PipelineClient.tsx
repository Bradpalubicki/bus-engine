'use client'

import { useState, useTransition } from 'react'
import { TrendingUp, Calendar, User, DollarSign, Plus, X, ChevronRight } from 'lucide-react'
import { movePipelineStage, addOpportunity } from '@/app/dashboard/pipeline/actions'
import { formatMoney } from '@/lib/status-colors'

type Opportunity = {
  id: string
  agency_name: string
  rfp_title: string | null
  est_value: number | null
  deadline: string | null
  win_probability: number | null
  bd_owner: string | null
  status: string | null
  notes: string | null
}

const stages = ['opportunity', 'bid_no_bid', 'capture', 'proposal_dev', 'submitted', 'bafo', 'awarded', 'lost']
const stageLabels: Record<string, string> = {
  opportunity: 'Opportunity', bid_no_bid: 'Bid/No-Bid', capture: 'Capture',
  proposal_dev: 'Proposal Dev', submitted: 'Submitted', bafo: 'BAFO',
  awarded: 'Awarded', lost: 'Lost',
}
const stageColors: Record<string, string> = {
  opportunity: 'bg-gray-100 text-gray-700',
  bid_no_bid: 'bg-purple-100 text-purple-800',
  capture: 'bg-indigo-100 text-indigo-800',
  proposal_dev: 'bg-blue-100 text-blue-800',
  submitted: 'bg-amber-100 text-amber-800',
  bafo: 'bg-orange-100 text-orange-800',
  awarded: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
}

const nextStage: Record<string, string> = {
  opportunity: 'bid_no_bid', bid_no_bid: 'capture', capture: 'proposal_dev',
  proposal_dev: 'submitted', submitted: 'bafo', bafo: 'awarded',
}

export function PipelineClient({ opportunities }: { opportunities: Opportunity[] }) {
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [agency, setAgency] = useState('')
  const [title, setTitle] = useState('')
  const [estValue, setEstValue] = useState('')
  const [deadline, setDeadline] = useState('')
  const [prob, setProb] = useState('50')
  const [owner, setOwner] = useState('')

  const totalPipeline = opportunities.filter(o => o.status !== 'lost').reduce((s, o) => s + (o.est_value ?? 0), 0)
  const weightedPipeline = opportunities.filter(o => o.status !== 'lost').reduce((s, o) => s + (o.est_value ?? 0) * (o.win_probability ?? 50) / 100, 0)
  const awardedCount = opportunities.filter(o => o.status === 'awarded').length
  const lostCount = opportunities.filter(o => o.status === 'lost').length
  const winRate = (awardedCount + lostCount) > 0 ? Math.round(awardedCount / (awardedCount + lostCount) * 100) : 0

  const run = (fn: () => Promise<void>) => {
    setError(null)
    startTransition(async () => {
      try { await fn() } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Pipeline / CRM</h1>
          <p className="text-gray-500 text-sm">
            {opportunities.length} opportunities · Win Rate: {winRate}% ·
            Weighted: {formatMoney(weightedPipeline)}
          </p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004db3] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Opportunity
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pipeline', value: formatMoney(totalPipeline), color: 'text-[#003087]' },
          { label: 'Weighted Pipeline', value: formatMoney(weightedPipeline), color: 'text-blue-600' },
          { label: 'Win Rate', value: `${winRate}%`, color: 'text-green-600' },
          { label: 'Active Bids', value: opportunities.filter(o => !['awarded', 'lost'].includes(o.status ?? '')).length.toString(), color: 'text-amber-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{k.label}</div>
            <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}

      {/* Kanban */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {stages.map(stage => {
            const opps = opportunities.filter(o => o.status === stage)
            return (
              <div key={stage} className="w-60 flex-shrink-0">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-t-lg border-b-2 mb-3 ${stageColors[stage]}`}>
                  <span className="text-xs font-bold uppercase tracking-wide">{stageLabels[stage]}</span>
                  <span className="text-xs bg-white/40 px-1.5 py-0.5 rounded-full font-bold">{opps.length}</span>
                </div>
                <div className="space-y-3">
                  {opps.length === 0 ? (
                    <div className="text-center py-6 text-gray-300 text-xs border-2 border-dashed rounded-xl">Empty</div>
                  ) : opps.map(opp => (
                    <div key={opp.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                      <div className="font-semibold text-sm text-gray-800 mb-1 leading-tight">{opp.agency_name}</div>
                      <div className="text-xs text-gray-500 mb-3 leading-tight">{opp.rfp_title ?? '—'}</div>

                      {opp.est_value && (
                        <div className="flex items-center gap-1 text-xs text-[#003087] font-bold mb-2">
                          <DollarSign className="w-3 h-3" />{formatMoney(opp.est_value)}
                        </div>
                      )}

                      {opp.win_probability !== null && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-0.5">
                            <span>Win prob</span>
                            <span>{opp.win_probability}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-[#E8A020] h-1.5 rounded-full" style={{ width: `${opp.win_probability}%` }} />
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        {opp.deadline && (
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />Due: {new Date(opp.deadline).toLocaleDateString()}
                          </div>
                        )}
                        {opp.bd_owner && (
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <User className="w-3 h-3" />{opp.bd_owner}
                          </div>
                        )}
                      </div>

                      {nextStage[stage] && (
                        <button
                          disabled={isPending}
                          onClick={() => run(() => movePipelineStage(opp.id, nextStage[stage]))}
                          className="mt-3 w-full flex items-center justify-center gap-1 text-xs bg-[#F8F9FB] border border-gray-200 text-[#003087] px-2 py-1.5 rounded-lg hover:bg-[#003087] hover:text-white transition-colors disabled:opacity-50"
                        >
                          Move to {stageLabels[nextStage[stage]]} <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-[#003087]">Add Opportunity</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Agency Name *</label>
                <input value={agency} onChange={e => setAgency(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">RFP Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Est. Value ($)</label>
                  <input value={estValue} onChange={e => setEstValue(e.target.value)} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Deadline</label>
                  <input value={deadline} onChange={e => setDeadline(e.target.value)} type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Win Probability %</label>
                  <input value={prob} onChange={e => setProb(e.target.value)} type="number" min="0" max="100" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">BD Owner</label>
                  <input value={owner} onChange={e => setOwner(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">Cancel</button>
                <button
                  disabled={!agency || isPending}
                  onClick={() => run(async () => {
                    await addOpportunity({ agency_name: agency, rfp_title: title, est_value: estValue ? parseFloat(estValue) : undefined, deadline: deadline || undefined, win_probability: prob ? parseInt(prob) : undefined, bd_owner: owner || undefined })
                    setShowModal(false); setAgency(''); setTitle(''); setEstValue(''); setDeadline(''); setProb('50'); setOwner('')
                  })}
                  className="flex-1 bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isPending ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
