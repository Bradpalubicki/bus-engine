'use client'

import { useState } from 'react'
import { FileText, Plus, X, Edit2, Trash2, Send, ChevronDown, ChevronUp } from 'lucide-react'
import { demoContracts, demoAgencies } from '@/lib/demo-data'

type ContractStatus = 'pending' | 'active' | 'complete' | 'cancelled'

type Milestone = {
  id: string
  name: string
  targetDate: string
  pctValue: number
  status: 'pending' | 'in_progress' | 'complete'
}

type Contract = {
  id: string
  contract_number: string
  agency_id: string
  title: string
  value: number
  bus_count: number
  start_date: string
  end_date: string
  status: ContractStatus
  estimated_total_cost: number
  costs_incurred: number
  revenue_recognized: number
  notes: string
  milestones: Milestone[]
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const STATUS_COLORS: Record<ContractStatus, string> = {
  active: 'bg-green-100 text-green-800',
  complete: 'bg-[#003087] text-white',
  pending: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-red-100 text-red-800',
}

const agencyMap = Object.fromEntries(demoAgencies.map(a => [a.id, a.shortName ?? a.name]))

const INITIAL_CONTRACTS: Contract[] = demoContracts.map(c => ({
  id: c.id,
  contract_number: c.contractNumber,
  agency_id: c.agencyId,
  title: c.title,
  value: c.value,
  bus_count: c.busCount,
  start_date: c.startDate,
  end_date: c.endDate,
  status: c.status as ContractStatus,
  estimated_total_cost: c.estimatedTotalCost,
  costs_incurred: c.costsIncurred,
  revenue_recognized: c.revenueEarned,
  notes: '',
  milestones: [
    { id: `m-${c.id}-1`, name: 'NTP / Kickoff', targetDate: c.startDate, pctValue: 10, status: 'complete' },
    { id: `m-${c.id}-2`, name: 'Production Midpoint', targetDate: c.startDate, pctValue: 40, status: c.status === 'active' ? 'in_progress' : c.status === 'complete' ? 'complete' : 'pending' },
    { id: `m-${c.id}-3`, name: 'QA / Delivery', targetDate: c.endDate, pctValue: 40, status: c.status === 'complete' ? 'complete' : 'pending' },
    { id: `m-${c.id}-4`, name: 'Final Closeout', targetDate: c.endDate, pctValue: 10, status: c.status === 'complete' ? 'complete' : 'pending' },
  ],
}))

type ContractForm = Omit<Contract, 'id' | 'milestones'>

function ContractModal({ contract, onClose, onSave }: { contract?: Contract; onClose: () => void; onSave: (f: ContractForm) => void }) {
  const [form, setForm] = useState<ContractForm>(contract ?? {
    contract_number: '', agency_id: demoAgencies[0]?.id ?? '',
    title: '', value: 0, bus_count: 0,
    start_date: '', end_date: '', status: 'pending',
    estimated_total_cost: 0, costs_incurred: 0, revenue_recognized: 0, notes: '',
  })
  const [saved, setSaved] = useState(false)
  function set<K extends keyof ContractForm>(k: K, v: ContractForm[K]) { setForm(f => ({ ...f, [k]: v })) }

  const nextContractNum = `CCW-${new Date().getFullYear()}-${String(INITIAL_CONTRACTS.length + 1).padStart(3, '0')}`

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{contract ? 'Edit Contract' : 'Add Contract'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-bold text-green-700">Contract Saved</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contract #</label>
                <input type="text" placeholder={nextContractNum} value={form.contract_number} onChange={e => set('contract_number', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Agency</label>
                <select value={form.agency_id} onChange={e => set('agency_id', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {demoAgencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title *</label>
                <input type="text" placeholder="Zero-Emission Bus Remanufacture 2024" value={form.title} onChange={e => set('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contract Value ($)</label>
                <input type="number" value={form.value} onChange={e => set('value', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Bus Count</label>
                <input type="number" value={form.bus_count} onChange={e => set('bus_count', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Start Date</label>
                <input type="date" value={form.start_date} onChange={e => set('start_date', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Est. End Date</label>
                <input type="date" value={form.end_date} onChange={e => set('end_date', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value as ContractStatus)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {(['pending', 'active', 'complete', 'cancelled'] as ContractStatus[]).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Notes</label>
              <textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (form.title) { onSave(form); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Contract
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

type MilestoneForm = Omit<Milestone, 'id'>

function MilestoneModal({ contractId, onClose, onSave }: { contractId: string; onClose: () => void; onSave: (m: MilestoneForm) => void }) {
  const [form, setForm] = useState<MilestoneForm>({ name: '', targetDate: '', pctValue: 25, status: 'pending' })
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-[#003087]">Add Milestone</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Milestone Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Target Date</label>
              <input type="date" value={form.targetDate} onChange={e => setForm(f => ({ ...f, targetDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">% of Contract</label>
              <input type="number" min={1} max={100} value={form.pctValue} onChange={e => setForm(f => ({ ...f, pctValue: Number(e.target.value) }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { if (form.name) onSave(form) }}
              className="flex-1 bg-[#003087] text-white font-bold py-2.5 rounded-lg hover:bg-[#002070] transition-colors text-sm">
              Add Milestone
            </button>
            <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS)
  const [showModal, setShowModal] = useState(false)
  const [editContract, setEditContract] = useState<Contract | undefined>()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [milestoneTarget, setMilestoneTarget] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2200) }

  function saveContract(form: ContractForm) {
    if (editContract) {
      setContracts(cs => cs.map(c => c.id === editContract.id ? { ...c, ...form } : c))
      showToast('Contract updated')
    } else {
      setContracts(cs => [{ ...form, id: `c-${Date.now()}`, milestones: [] }, ...cs])
      showToast('Contract created')
    }
    setShowModal(false); setEditContract(undefined)
  }

  function addMilestone(contractId: string, form: MilestoneForm) {
    setContracts(cs => cs.map(c => c.id === contractId ? {
      ...c,
      milestones: [...c.milestones, { ...form, id: `m-${Date.now()}` }],
    } : c))
    setMilestoneTarget(null)
    showToast('Milestone added')
  }

  function toggleMilestone(contractId: string, milestoneId: string) {
    setContracts(cs => cs.map(c => c.id === contractId ? {
      ...c,
      milestones: c.milestones.map(m => m.id === milestoneId ? {
        ...m,
        status: m.status === 'complete' ? 'pending' : 'complete',
      } : m),
    } : c))
  }

  function sendToClient(c: Contract) {
    showToast(`Contract ${c.contract_number} summary sent to ${agencyMap[c.agency_id] ?? 'agency'}`)
  }

  function deleteContract(id: string) { setContracts(cs => cs.filter(c => c.id !== id)); showToast('Contract removed') }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Contracts</h1>
          <p className="text-gray-500 text-sm">{contracts.length} government transit contracts · {contracts.filter(c => c.status === 'active').length} active</p>
        </div>
        <button onClick={() => { setEditContract(undefined); setShowModal(true) }}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Contract
        </button>
      </div>

      <div className="space-y-4">
        {contracts.map(c => {
          const pct = c.estimated_total_cost > 0 ? Math.round(c.costs_incurred / c.estimated_total_cost * 100) : 0
          const completedMs = c.milestones.filter(m => m.status === 'complete').length
          const agencyName = agencyMap[c.agency_id] ?? '—'
          const isExpanded = expandedId === c.id

          return (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-xs text-gray-400">{c.contract_number}</div>
                    <h2 className="text-lg font-bold text-[#003087]">{c.title}</h2>
                    <div className="text-gray-500 text-sm mt-0.5">
                      {agencyName} · {c.bus_count} buses
                      {c.start_date && c.end_date && ` · ${new Date(c.start_date).toLocaleDateString()} – ${new Date(c.end_date).toLocaleDateString()}`}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#003087]">{fmt(c.value)}</div>
                      <div className="text-xs text-gray-400">contract value</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-500">Completion ({completedMs}/{c.milestones.length} milestones)</span>
                    <span className="text-sm font-bold text-[#003087]">{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="bg-[#003087] h-3 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Revenue Recognized', value: fmt(c.revenue_recognized), color: 'text-green-700' },
                    { label: 'Costs Incurred', value: fmt(c.costs_incurred), color: 'text-red-700' },
                    { label: 'Est. Total Cost', value: fmt(c.estimated_total_cost), color: 'text-blue-700' },
                    { label: 'Remaining', value: fmt(c.value - c.revenue_recognized), color: 'text-amber-700' },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                      <div className={`text-base font-bold ${item.color}`}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button onClick={() => sendToClient(c)}
                    className="flex items-center gap-1.5 text-xs bg-[#003087] text-white px-3 py-1.5 rounded-lg hover:bg-[#002070] font-semibold">
                    <Send className="w-3 h-3" /> Send to Client
                  </button>
                  <button onClick={() => setExpandedId(isExpanded ? null : c.id)}
                    className="flex items-center gap-1 text-xs text-[#003087] font-medium hover:underline">
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {isExpanded ? 'Hide' : 'View'} Milestones
                  </button>
                  <button onClick={() => { setEditContract(c); setShowModal(true) }}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => deleteContract(c.id)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-700">Milestones</h3>
                    <button onClick={() => setMilestoneTarget(c.id)}
                      className="flex items-center gap-1 text-xs text-[#003087] font-semibold hover:underline">
                      <Plus className="w-3 h-3" /> Add Milestone
                    </button>
                  </div>
                  {c.milestones.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No milestones yet — click Add Milestone</p>
                  ) : (
                    <div className="space-y-2">
                      {c.milestones.map(m => (
                        <div key={m.id} className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border border-gray-100">
                          <button onClick={() => toggleMilestone(c.id, m.id)}
                            className={`w-5 h-5 rounded border-2 flex-shrink-0 transition-colors ${m.status === 'complete' ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`}>
                            {m.status === 'complete' && (
                              <svg viewBox="0 0 12 12" className="w-full h-full p-0.5 text-white" stroke="currentColor" strokeWidth={2} fill="none">
                                <path d="M2 6l3 3 5-5" />
                              </svg>
                            )}
                          </button>
                          <span className={`flex-1 text-sm ${m.status === 'complete' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {m.name}
                          </span>
                          <span className="text-xs text-gray-400">{m.targetDate}</span>
                          <span className="text-xs font-semibold text-[#003087]">{m.pctValue}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {contracts.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No contracts yet</p>
          <button onClick={() => { setEditContract(undefined); setShowModal(true) }} className="mt-3 text-sm text-[#003087] font-semibold">
            Add first contract →
          </button>
        </div>
      )}

      {showModal && (
        <ContractModal
          contract={editContract}
          onClose={() => { setShowModal(false); setEditContract(undefined) }}
          onSave={saveContract}
        />
      )}
      {milestoneTarget && (
        <MilestoneModal
          contractId={milestoneTarget}
          onClose={() => setMilestoneTarget(null)}
          onSave={form => addMilestone(milestoneTarget, form)}
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
