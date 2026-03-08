'use client'

import { useState, useTransition } from 'react'
import { Plus, CheckCircle, XCircle, Clock } from 'lucide-react'
import { addLineItem, logTime, updateQACheckpoint, updateWONotes, assignTechnician, updateWOStatus } from '@/app/dashboard/work-orders/actions'
import type { Database } from '@/lib/database.types'

type LineItem = Database['public']['Tables']['bus_wo_line_items']['Row']
type TimeLog = Database['public']['Tables']['bus_wo_time_logs']['Row']
type QACheckpoint = Database['public']['Tables']['bus_qa_checkpoints']['Row']
type Assignment = { id: string; technician_id: string | null; name: string | null }
type Tech = { id: string; name: string }

const tabs = ['Line Items', 'Time Log', 'QA', 'Notes', 'Techs', 'Status']
const statusLabels: Record<string, string> = {
  queued: 'Queued', in_progress: 'In Progress', qa_hold: 'QA Hold', complete: 'Complete', delivered: 'Delivered'
}

export function WODetailClient({
  woId,
  woStatus,
  woNotes,
  lineItems,
  timeLogs,
  qaCheckpoints,
  assignments,
  allTechs,
}: {
  woId: string
  woStatus: string | null
  woNotes: string | null
  lineItems: LineItem[]
  timeLogs: TimeLog[]
  qaCheckpoints: QACheckpoint[]
  assignments: Assignment[]
  allTechs: Tech[]
}) {
  const [activeTab, setActiveTab] = useState('Line Items')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Line Items
  const [showLIForm, setShowLIForm] = useState(false)
  const [liDesc, setLiDesc] = useState('')
  const [liSvcType, setLiSvcType] = useState('')
  const [liEstHours, setLiEstHours] = useState('')

  // Time Log
  const [showTLForm, setShowTLForm] = useState(false)
  const [tlDate, setTlDate] = useState(new Date().toISOString().split('T')[0])
  const [tlHours, setTlHours] = useState('')
  const [tlTech, setTlTech] = useState('')
  const [tlNotes, setTlNotes] = useState('')

  // Notes
  const [notes, setNotes] = useState(woNotes ?? '')
  const [notesSaved, setNotesSaved] = useState(false)

  // Techs
  const [selectedTech, setSelectedTech] = useState('')

  const totalHours = timeLogs.reduce((s, l) => s + l.hours, 0)

  const run = (fn: () => Promise<void>) => {
    setError(null)
    startTransition(async () => {
      try { await fn() } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-gray-100 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
              activeTab === tab ? 'border-[#003087] text-[#003087]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && <div className="mx-5 mt-4 bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}

      <div className="p-5">
        {/* LINE ITEMS */}
        {activeTab === 'Line Items' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">Line Items ({lineItems.length})</h3>
              <button onClick={() => setShowLIForm(!showLIForm)} className="flex items-center gap-1 text-xs text-[#003087] font-medium hover:underline">
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>

            {showLIForm && (
              <div className="bg-[#F8F9FB] rounded-lg p-4 space-y-3">
                <input value={liDesc} onChange={e => setLiDesc(e.target.value)} placeholder="Description *"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={liSvcType} onChange={e => setLiSvcType(e.target.value)} placeholder="Service type"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  <input value={liEstHours} onChange={e => setLiEstHours(e.target.value)} type="number" placeholder="Est. hours"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowLIForm(false)} className="text-xs text-gray-500 px-3 py-1.5 border border-gray-200 rounded-lg">Cancel</button>
                  <button
                    disabled={!liDesc || isPending}
                    onClick={() => run(async () => {
                      await addLineItem(woId, { description: liDesc, service_type: liSvcType || undefined, est_hours: liEstHours ? parseFloat(liEstHours) : undefined })
                      setLiDesc(''); setLiSvcType(''); setLiEstHours(''); setShowLIForm(false)
                    })}
                    className="text-xs bg-[#003087] text-white px-3 py-1.5 rounded-lg disabled:opacity-50"
                  >
                    {isPending ? 'Adding...' : 'Add'}
                  </button>
                </div>
              </div>
            )}

            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="text-left pb-2 font-medium">Description</th>
                  <th className="text-left pb-2 font-medium">Service</th>
                  <th className="text-right pb-2 font-medium">Est Hrs</th>
                  <th className="text-right pb-2 font-medium">Actual Hrs</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lineItems.length === 0 ? (
                  <tr><td colSpan={5} className="py-4 text-center text-gray-400 text-xs">No line items yet</td></tr>
                ) : lineItems.map(li => (
                  <tr key={li.id}>
                    <td className="py-2 text-gray-800">{li.description}</td>
                    <td className="py-2 text-gray-500 text-xs">{li.service_type ?? '—'}</td>
                    <td className="py-2 text-right text-gray-600">{li.est_hours ?? '—'}</td>
                    <td className="py-2 text-right text-gray-600">{li.actual_hours ?? '—'}</td>
                    <td className="py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${li.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {li.status ?? 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TIME LOG */}
        {activeTab === 'Time Log' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">Time Logs — Total: {totalHours.toFixed(1)} hrs</h3>
              <button onClick={() => setShowTLForm(!showTLForm)} className="flex items-center gap-1 text-xs text-[#003087] font-medium hover:underline">
                <Plus className="w-3 h-3" /> Log Time
              </button>
            </div>

            {showTLForm && (
              <div className="bg-[#F8F9FB] rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Date</label>
                    <input value={tlDate} onChange={e => setTlDate(e.target.value)} type="date"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Hours *</label>
                    <input value={tlHours} onChange={e => setTlHours(e.target.value)} type="number" step="0.5"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  </div>
                </div>
                <input value={tlTech} onChange={e => setTlTech(e.target.value)} placeholder="Technician name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input value={tlNotes} onChange={e => setTlNotes(e.target.value)} placeholder="Notes"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <div className="flex gap-2">
                  <button onClick={() => setShowTLForm(false)} className="text-xs text-gray-500 px-3 py-1.5 border border-gray-200 rounded-lg">Cancel</button>
                  <button
                    disabled={!tlHours || isPending}
                    onClick={() => run(async () => {
                      await logTime(woId, { log_date: tlDate, hours: parseFloat(tlHours), technician_name: tlTech || undefined, notes: tlNotes || undefined })
                      setTlHours(''); setTlTech(''); setTlNotes(''); setShowTLForm(false)
                    })}
                    className="text-xs bg-[#003087] text-white px-3 py-1.5 rounded-lg disabled:opacity-50"
                  >
                    {isPending ? 'Logging...' : 'Log Time'}
                  </button>
                </div>
              </div>
            )}

            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="text-left pb-2 font-medium">Date</th>
                  <th className="text-left pb-2 font-medium">Technician</th>
                  <th className="text-right pb-2 font-medium">Hours</th>
                  <th className="text-left pb-2 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {timeLogs.length === 0 ? (
                  <tr><td colSpan={4} className="py-4 text-center text-gray-400 text-xs">No time logged yet</td></tr>
                ) : timeLogs.map(log => (
                  <tr key={log.id}>
                    <td className="py-2 text-gray-800">{new Date(log.log_date).toLocaleDateString()}</td>
                    <td className="py-2 text-gray-600">{log.technician_name ?? '—'}</td>
                    <td className="py-2 text-right font-semibold text-[#003087]">{log.hours}</td>
                    <td className="py-2 text-gray-500 text-xs">{log.notes ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* QA */}
        {activeTab === 'QA' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">QA Checkpoints ({qaCheckpoints.length})</h3>
            {qaCheckpoints.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No QA checkpoints defined</p>
            ) : (
              <div className="space-y-3">
                {qaCheckpoints.map(qa => (
                  <div key={qa.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                    qa.status === 'pass' ? 'bg-green-50 border-green-200'
                    : qa.status === 'fail' ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      {qa.status === 'pass' ? <CheckCircle className="w-5 h-5 text-green-500" />
                        : qa.status === 'fail' ? <XCircle className="w-5 h-5 text-red-500" />
                        : <Clock className="w-5 h-5 text-gray-400" />}
                      <div>
                        <div className="text-sm font-medium text-gray-800">{qa.checkpoint_name}</div>
                        {qa.notes && <div className="text-xs text-gray-500 mt-0.5">{qa.notes}</div>}
                        {qa.signed_at && <div className="text-xs text-green-600 mt-0.5">Signed: {new Date(qa.signed_at).toLocaleDateString()}</div>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => run(() => updateQACheckpoint(qa.id, 'pass'))}
                        disabled={qa.status === 'pass' || isPending}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 disabled:opacity-50"
                      >Pass</button>
                      <button
                        onClick={() => run(() => updateQACheckpoint(qa.id, 'fail'))}
                        disabled={qa.status === 'fail' || isPending}
                        className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200 disabled:opacity-50"
                      >Fail</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NOTES */}
        {activeTab === 'Notes' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Work Order Notes</h3>
            <textarea
              value={notes}
              onChange={e => { setNotes(e.target.value); setNotesSaved(false) }}
              rows={8}
              placeholder="Enter notes about this work order..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
            />
            <div className="flex items-center gap-3">
              <button
                disabled={isPending}
                onClick={() => run(async () => { await updateWONotes(woId, notes); setNotesSaved(true) })}
                className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
              >
                {isPending ? 'Saving...' : 'Save Notes'}
              </button>
              {notesSaved && <span className="text-green-600 text-sm">Saved!</span>}
            </div>
          </div>
        )}

        {/* TECHS */}
        {activeTab === 'Techs' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Assigned Technicians</h3>
            <div className="space-y-2">
              {assignments.length === 0 ? (
                <p className="text-gray-400 text-sm">No technicians assigned</p>
              ) : assignments.map(a => (
                <div key={a.id} className="flex items-center gap-2 p-3 bg-[#F8F9FB] rounded-lg">
                  <div className="w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {a.name?.charAt(0) ?? '?'}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{a.name ?? '—'}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <select
                value={selectedTech}
                onChange={e => setSelectedTech(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select technician to assign...</option>
                {allTechs
                  .filter(t => !assignments.some(a => a.technician_id === t.id))
                  .map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <button
                disabled={!selectedTech || isPending}
                onClick={() => run(async () => { await assignTechnician(woId, selectedTech); setSelectedTech('') })}
                className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
              >
                Assign
              </button>
            </div>
          </div>
        )}

        {/* STATUS */}
        {activeTab === 'Status' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Update Status</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(statusLabels).map(([s, label]) => (
                <button
                  key={s}
                  disabled={s === woStatus || isPending}
                  onClick={() => run(() => updateWOStatus(woId, s))}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all disabled:opacity-50 ${
                    s === woStatus ? 'bg-[#003087] text-white border-[#003087] cursor-default'
                    : 'border-gray-200 text-gray-600 hover:border-[#003087] hover:text-[#003087]'
                  }`}
                >
                  {s === woStatus ? '✓ ' : ''}{label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
