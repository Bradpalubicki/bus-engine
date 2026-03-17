'use client'

import { useState } from 'react'
import {
  TrendingUp, Calendar, User, DollarSign, Plus, X,
  ChevronRight, Edit2, Trash2, CheckCircle, Trophy,
} from 'lucide-react'

type PipelineStage = 'prospect' | 'proposal' | 'oral_interview' | 'awarded' | 'lost'

type Opportunity = {
  id: string
  agency_name: string
  rfp_title: string | null
  est_value: number | null
  deadline: string | null
  win_probability: number
  bd_owner: string | null
  status: PipelineStage
  notes: string | null
}

const STAGES: PipelineStage[] = ['prospect', 'proposal', 'oral_interview', 'awarded', 'lost']

const STAGE_LABELS: Record<PipelineStage, string> = {
  prospect: 'Prospect',
  proposal: 'Proposal Submitted',
  oral_interview: 'Oral Interview',
  awarded: 'Awarded',
  lost: 'Lost',
}

const STAGE_COLORS: Record<PipelineStage, string> = {
  prospect: 'bg-gray-100 text-gray-700 border-gray-200',
  proposal: 'bg-blue-100 text-blue-800 border-blue-200',
  oral_interview: 'bg-amber-100 text-amber-800 border-amber-200',
  awarded: 'bg-green-100 text-green-800 border-green-200',
  lost: 'bg-red-100 text-red-800 border-red-200',
}

const STAGE_DOT: Record<PipelineStage, string> = {
  prospect: 'bg-gray-400',
  proposal: 'bg-blue-500',
  oral_interview: 'bg-amber-500',
  awarded: 'bg-green-500',
  lost: 'bg-red-500',
}

const NEXT_STAGE: Partial<Record<PipelineStage, PipelineStage>> = {
  prospect: 'proposal',
  proposal: 'oral_interview',
  oral_interview: 'awarded',
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toLocaleString()}`
}

const DEMO_OPPS: Opportunity[] = [
  { id: 'op-1', agency_name: 'SFMTA', rfp_title: 'Zero-Emission Bus Remanufacture 2024', est_value: 8_200_000, deadline: '2024-06-15', win_probability: 70, bd_owner: 'Dale Carson', status: 'oral_interview', notes: null },
  { id: 'op-2', agency_name: 'IndyGo', rfp_title: 'Fleet Remanufacture — 25 units', est_value: 4_500_000, deadline: '2024-07-30', win_probability: 55, bd_owner: 'Dale Carson', status: 'proposal', notes: null },
  { id: 'op-3', agency_name: 'Denver RTD', rfp_title: 'Hybrid Bus Conversion 2024', est_value: 6_100_000, deadline: '2024-08-01', win_probability: 40, bd_owner: 'Dale Carson', status: 'prospect', notes: null },
  { id: 'op-4', agency_name: 'Long Beach Transit', rfp_title: 'ADA Retrofit Program', est_value: 1_900_000, deadline: '2024-04-01', win_probability: 90, bd_owner: 'Dale Carson', status: 'awarded', notes: null },
  { id: 'op-5', agency_name: 'Houston METRO', rfp_title: 'Diesel Fleet Overhaul 2023', est_value: 3_200_000, deadline: '2023-12-01', win_probability: 20, bd_owner: 'Dale Carson', status: 'lost', notes: null },
]

type OppFormData = Omit<Opportunity, 'id'>

function OppModal({
  opp,
  onClose,
  onSave,
}: {
  opp?: Opportunity
  onClose: () => void
  onSave: (data: OppFormData) => void
}) {
  const [form, setForm] = useState<OppFormData>(opp ?? {
    agency_name: '', rfp_title: '', est_value: null,
    deadline: '', win_probability: 50, bd_owner: '',
    status: 'prospect', notes: '',
  })
  const [saved, setSaved] = useState(false)

  function set<K extends keyof OppFormData>(k: K, v: OppFormData[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{opp ? 'Edit Opportunity' : 'Add Opportunity'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <p className="text-lg font-bold text-green-700">Opportunity Saved</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Agency Name *</label>
              <input type="text" placeholder="SFMTA" value={form.agency_name} onChange={e => set('agency_name', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">RFP Title</label>
              <input type="text" placeholder="Zero-Emission Bus Remanufacture 2024" value={form.rfp_title ?? ''} onChange={e => set('rfp_title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Est. Value ($)</label>
                <input type="number" placeholder="5000000" value={form.est_value ?? ''} onChange={e => set('est_value', e.target.value ? Number(e.target.value) : null)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Deadline</label>
                <input type="date" value={form.deadline ?? ''} onChange={e => set('deadline', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">BD Owner</label>
                <input type="text" placeholder="Dale Carson" value={form.bd_owner ?? ''} onChange={e => set('bd_owner', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Stage</label>
                <select value={form.status} onChange={e => set('status', e.target.value as PipelineStage)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {STAGES.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Win Probability: <span className="text-[#003087]">{form.win_probability}%</span>
              </label>
              <input type="range" min={0} max={100} value={form.win_probability}
                onChange={e => set('win_probability', Number(e.target.value))}
                className="w-full accent-[#003087]" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Notes</label>
              <textarea rows={2} value={form.notes ?? ''} onChange={e => set('notes', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (form.agency_name) { onSave(form); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Opportunity
              </button>
              <button onClick={onClose} className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function PipelineClient({ opportunities: initial }: { opportunities: Omit<Opportunity, 'win_probability'>[] }) {
  const [opps, setOpps] = useState<Opportunity[]>([
    ...DEMO_OPPS,
    ...initial.map(o => ({
      ...o,
      win_probability: 50,
      status: (o.status ?? 'prospect') as PipelineStage,
    })),
  ])
  const [showModal, setShowModal] = useState(false)
  const [editOpp, setEditOpp] = useState<Opportunity | undefined>()
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2200) }

  function saveOpp(data: OppFormData) {
    if (editOpp) {
      setOpps(os => os.map(o => o.id === editOpp.id ? { ...o, ...data } : o))
      showToast('Opportunity updated')
    } else {
      setOpps(os => [...os, { ...data, id: `op-${Date.now()}` }])
      showToast('Opportunity added')
    }
    setShowModal(false)
    setEditOpp(undefined)
  }

  function moveStage(id: string, stage: PipelineStage) {
    setOpps(os => os.map(o => o.id === id ? { ...o, status: stage } : o))
    showToast(`Moved to ${STAGE_LABELS[stage]}`)
  }

  function markAwarded(id: string) { moveStage(id, 'awarded'); showToast('Opportunity awarded! 🎉') }
  function markLost(id: string) { moveStage(id, 'lost') }
  function deleteOpp(id: string) { setOpps(os => os.filter(o => o.id !== id)); showToast('Opportunity removed') }

  const active = opps.filter(o => o.status !== 'lost')
  const totalPipeline = active.reduce((s, o) => s + (o.est_value ?? 0), 0)
  const weightedPipeline = active.reduce((s, o) => s + (o.est_value ?? 0) * o.win_probability / 100, 0)
  const awardedCount = opps.filter(o => o.status === 'awarded').length
  const lostCount = opps.filter(o => o.status === 'lost').length
  const winRate = (awardedCount + lostCount) > 0 ? Math.round(awardedCount / (awardedCount + lostCount) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Pipeline / BD</h1>
          <p className="text-gray-500 text-sm">
            {opps.length} opportunities · Win Rate: {winRate}% · Weighted: {fmt(weightedPipeline)}
          </p>
        </div>
        <button
          onClick={() => { setEditOpp(undefined); setShowModal(true) }}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Opportunity
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pipeline', value: fmt(totalPipeline), color: 'text-[#003087]', icon: TrendingUp },
          { label: 'Weighted Pipeline', value: fmt(weightedPipeline), color: 'text-blue-600', icon: DollarSign },
          { label: 'Win Rate', value: `${winRate}%`, color: 'text-green-600', icon: Trophy },
          { label: 'Active Bids', value: String(active.filter(o => o.status !== 'awarded').length), color: 'text-amber-600', icon: Calendar },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Stage value totals */}
      <div className="flex gap-2 flex-wrap">
        {STAGES.filter(s => s !== 'lost').map(s => {
          const stageOpps = opps.filter(o => o.status === s)
          const total = stageOpps.reduce((sum, o) => sum + (o.est_value ?? 0), 0)
          return (
            <div key={s} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${STAGE_COLORS[s]}`}>
              <div className={`w-2 h-2 rounded-full ${STAGE_DOT[s]}`} />
              {STAGE_LABELS[s]}: {fmt(total)} ({stageOpps.length})
            </div>
          )
        })}
      </div>

      {/* Kanban */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {STAGES.map(stage => {
            const stageOpps = opps.filter(o => o.status === stage)
            return (
              <div key={stage} className="w-64 flex-shrink-0">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-t-xl border mb-3 ${STAGE_COLORS[stage]}`}>
                  <div className={`w-2 h-2 rounded-full ${STAGE_DOT[stage]}`} />
                  <span className="text-xs font-bold uppercase tracking-wide">{STAGE_LABELS[stage]}</span>
                  <span className="ml-auto text-xs font-bold opacity-70">{stageOpps.length}</span>
                </div>
                <div className="space-y-3">
                  {stageOpps.length === 0 ? (
                    <div className="text-center py-8 text-gray-300 text-xs border-2 border-dashed border-gray-200 rounded-xl">Drop here</div>
                  ) : stageOpps.map(opp => (
                    <div key={opp.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                      <div className="font-semibold text-sm text-gray-800 mb-0.5 leading-tight">{opp.agency_name}</div>
                      <div className="text-xs text-gray-400 mb-3 leading-tight">{opp.rfp_title ?? '—'}</div>

                      {opp.est_value != null && (
                        <div className="flex items-center gap-1 text-xs text-[#003087] font-bold mb-2">
                          <DollarSign className="w-3 h-3" />{fmt(opp.est_value)}
                        </div>
                      )}

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>Win prob</span>
                          <span className="font-medium">{opp.win_probability}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${opp.win_probability >= 70 ? 'bg-green-500' : opp.win_probability >= 40 ? 'bg-[#E8A020]' : 'bg-red-400'}`}
                            style={{ width: `${opp.win_probability}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1 mb-3">
                        {opp.deadline && (
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            Due: {new Date(opp.deadline).toLocaleDateString()}
                          </div>
                        )}
                        {opp.bd_owner && (
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <User className="w-3 h-3" />{opp.bd_owner}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-1.5">
                        {NEXT_STAGE[stage] && (
                          <button
                            onClick={() => moveStage(opp.id, NEXT_STAGE[stage]!)}
                            className="w-full flex items-center justify-center gap-1 text-xs bg-[#003087] text-white px-2 py-1.5 rounded-lg hover:bg-[#002070] transition-colors"
                          >
                            → {STAGE_LABELS[NEXT_STAGE[stage]!]}
                          </button>
                        )}
                        {stage !== 'awarded' && stage !== 'lost' && (
                          <div className="flex gap-1">
                            <button onClick={() => markAwarded(opp.id)}
                              className="flex-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg hover:bg-green-100 font-medium">
                              Award
                            </button>
                            <button onClick={() => markLost(opp.id)}
                              className="flex-1 text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg hover:bg-red-100 font-medium">
                              Lost
                            </button>
                          </div>
                        )}
                        <div className="flex gap-1">
                          <button onClick={() => { setEditOpp(opp); setShowModal(true) }}
                            className="flex-1 flex items-center justify-center gap-1 text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-100">
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => deleteOpp(opp.id)}
                            className="p-1.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-100">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showModal && (
        <OppModal
          opp={editOpp}
          onClose={() => { setShowModal(false); setEditOpp(undefined) }}
          onSave={saveOpp}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
