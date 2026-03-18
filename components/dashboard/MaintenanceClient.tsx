'use client'

import { useState } from 'react'
import { Wrench, AlertTriangle, CheckCircle2, Clock, Plus, X } from 'lucide-react'

type PMStatus = 'ok' | 'due_soon' | 'overdue'

type PMTrigger = {
  id: string
  vin: string
  make: string
  model: string
  fuelType: string
  task: string
  dueDate?: string
  dueMiles?: number
  currentMiles?: number
  status: PMStatus
  daysOverdue?: number
  daysUntilDue?: number
  milesUntilDue?: number
}

type PMSchedule = {
  id: string
  vehicleClass: string
  fuelType: string | null
  taskName: string
  intervalMiles: number | null
  intervalDays: number | null
  estimatedHours: number
  notes: string
}

const DEMO_PM_TRIGGERS: PMTrigger[] = [
  {
    id: 'pm-1',
    vin: 'CCW-001',
    make: 'New Flyer',
    model: 'D40LF',
    fuelType: 'hybrid',
    task: 'Brake System Inspection',
    dueDate: '2026-03-05',
    status: 'overdue',
    daysOverdue: 12,
  },
  {
    id: 'pm-2',
    vin: 'CCW-002',
    make: 'Gillig',
    model: 'Phantom',
    fuelType: 'diesel',
    task: 'Engine Oil & Filter Change',
    dueMiles: 145000,
    currentMiles: 142800,
    milesUntilDue: 2200,
    status: 'due_soon',
  },
  {
    id: 'pm-3',
    vin: 'CCW-005',
    make: 'New Flyer',
    model: 'Xcelsior XD40',
    fuelType: 'cng',
    task: 'Brake System Inspection',
    dueDate: '2026-04-03',
    status: 'due_soon',
    daysUntilDue: 17,
  },
  {
    id: 'pm-4',
    vin: 'CCW-005',
    make: 'New Flyer',
    model: 'Xcelsior XD40',
    fuelType: 'cng',
    task: 'CNG Tank Visual Inspection',
    dueDate: '2026-04-01',
    status: 'due_soon',
    daysUntilDue: 15,
  },
  {
    id: 'pm-5',
    vin: 'CCW-003',
    make: 'New Flyer',
    model: 'D40LFR',
    fuelType: 'cng',
    task: 'Engine Oil & Filter Change',
    dueMiles: 180000,
    currentMiles: 151000,
    milesUntilDue: 29000,
    status: 'ok',
  },
  {
    id: 'pm-6',
    vin: 'CCW-004',
    make: 'Gillig',
    model: 'Low Floor',
    fuelType: 'electric',
    task: 'ADA Lift Functional Check',
    dueDate: '2026-04-15',
    status: 'ok',
    daysUntilDue: 29,
  },
  {
    id: 'pm-7',
    vin: 'CCW-007',
    make: 'MCI',
    model: 'D4500',
    fuelType: 'diesel',
    task: 'Brake System Inspection',
    dueDate: '2026-06-01',
    status: 'ok',
    daysUntilDue: 76,
  },
]

const DEMO_PM_SCHEDULES: PMSchedule[] = [
  { id: 's-1', vehicleClass: 'transit_40ft', fuelType: 'diesel', taskName: 'Engine Oil & Filter Change', intervalMiles: 25000, intervalDays: null, estimatedHours: 2, notes: 'Cummins ISL standard interval' },
  { id: 's-2', vehicleClass: 'transit_40ft', fuelType: 'diesel', taskName: 'Transmission Fluid Service', intervalMiles: 100000, intervalDays: null, estimatedHours: 3, notes: 'Allison B400R' },
  { id: 's-3', vehicleClass: 'transit_40ft', fuelType: null, taskName: 'Brake System Inspection', intervalMiles: null, intervalDays: 90, estimatedHours: 4, notes: 'FMCSA quarterly requirement' },
  { id: 's-4', vehicleClass: 'transit_40ft', fuelType: 'cng', taskName: 'CNG Tank Visual Inspection', intervalMiles: null, intervalDays: 30, estimatedHours: 1.5, notes: 'NFPA 52 — monthly visual' },
  { id: 's-5', vehicleClass: 'transit_40ft', fuelType: 'cng', taskName: 'CNG System Pressure Test', intervalMiles: null, intervalDays: 365, estimatedHours: 4, notes: 'Annual hydrostatic or hydro-proof' },
  { id: 's-6', vehicleClass: 'transit_40ft', fuelType: 'hybrid', taskName: 'HV Battery System Check', intervalMiles: null, intervalDays: 90, estimatedHours: 2, notes: 'Allison EP systems' },
  { id: 's-7', vehicleClass: 'transit_40ft', fuelType: null, taskName: 'ADA Lift Functional Check', intervalMiles: null, intervalDays: 30, estimatedHours: 1, notes: 'FTA ADA — monthly operational test' },
  { id: 's-8', vehicleClass: 'transit_60ft', fuelType: 'diesel', taskName: 'Engine Oil & Filter Change', intervalMiles: 25000, intervalDays: null, estimatedHours: 2.5, notes: 'Cummins ISL9 — articulated' },
  { id: 's-9', vehicleClass: 'transit_40ft', fuelType: null, taskName: 'Full Pre-Delivery Inspection', intervalMiles: null, intervalDays: null, estimatedHours: 8, notes: 'FTA pre-revenue service' },
]

const STATUS_CONFIG: Record<PMStatus, { label: string; badge: string; kpiColor: string; icon: typeof CheckCircle2 }> = {
  ok: { label: 'OK', badge: 'bg-green-100 text-green-700', kpiColor: 'text-green-600', icon: CheckCircle2 },
  due_soon: { label: 'Due Soon', badge: 'bg-amber-100 text-amber-700', kpiColor: 'text-amber-600', icon: Clock },
  overdue: { label: 'Overdue', badge: 'bg-red-100 text-red-700', kpiColor: 'text-red-600', icon: AlertTriangle },
}

type CreateWOModalProps = {
  trigger: PMTrigger
  onConfirm: (woNumber: string) => void
  onClose: () => void
}

function CreateWOModal({ trigger, onConfirm, onClose }: CreateWOModalProps) {
  const woNumber = `WO-2026-${String(Math.floor(Math.random() * 900) + 100)}`

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-[#003087]">Create Work Order</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="bg-[#F8F9FB] rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">WO Number</span>
              <span className="font-mono font-bold text-[#003087]">{woNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle</span>
              <span className="font-medium">{trigger.vin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">{trigger.task}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Priority</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${STATUS_CONFIG[trigger.status].badge}`}>
                {trigger.status === 'overdue' ? 'Urgent' : 'High'}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Work order will be created and appear in the Work Orders dashboard.</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium">Cancel</button>
            <button onClick={() => onConfirm(woNumber)}
              className="flex-1 bg-[#003087] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#002070]">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MaintenanceClient() {
  const [triggers, setTriggers] = useState<PMTrigger[]>(DEMO_PM_TRIGGERS)
  const [showSchedules, setShowSchedules] = useState(false)
  const [createWOFor, setCreateWOFor] = useState<PMTrigger | null>(null)
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500) }

  function confirmCreateWO(woNumber: string) {
    if (!createWOFor) return
    setTriggers(prev => prev.map(t => t.id === createWOFor.id ? { ...t, status: 'ok' as PMStatus } : t))
    setCreateWOFor(null)
    showToast(`Work Order ${woNumber} created ✓`)
  }

  const overdue = triggers.filter(t => t.status === 'overdue')
  const dueSoon = triggers.filter(t => t.status === 'due_soon')
  const ok = triggers.filter(t => t.status === 'ok')

  const renderTriggerRow = (trigger: PMTrigger) => {
    const cfg = STATUS_CONFIG[trigger.status]
    const Icon = cfg.icon
    const canCreateWO = trigger.status !== 'ok'

    return (
      <tr key={trigger.id} className={`hover:bg-gray-50 ${trigger.status === 'overdue' ? 'bg-red-50/30' : trigger.status === 'due_soon' ? 'bg-amber-50/20' : ''}`}>
        <td className="px-4 py-3">
          <div className="font-mono text-xs font-bold text-[#003087]">{trigger.vin}</div>
          <div className="text-xs text-gray-400">{trigger.make} {trigger.model}</div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-700">{trigger.task}</td>
        <td className="px-4 py-3 text-xs text-gray-500">
          {trigger.dueDate && <div>Due {new Date(trigger.dueDate).toLocaleDateString()}</div>}
          {trigger.dueMiles && <div>Due at {trigger.dueMiles.toLocaleString()} mi</div>}
        </td>
        <td className="px-4 py-3 text-xs text-gray-500">
          {trigger.currentMiles ? `${trigger.currentMiles.toLocaleString()} mi` : '—'}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1.5">
            <Icon className={`w-3.5 h-3.5 ${cfg.kpiColor}`} />
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${cfg.badge}`}>
              {trigger.status === 'overdue'
                ? `Overdue ${trigger.daysOverdue}d`
                : trigger.status === 'due_soon'
                  ? trigger.daysUntilDue ? `Due in ${trigger.daysUntilDue}d` : `${trigger.milesUntilDue?.toLocaleString()} mi`
                  : 'OK'}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-right">
          {canCreateWO && (
            <button
              onClick={() => setCreateWOFor(trigger)}
              className="text-xs bg-[#003087] text-white px-3 py-1.5 rounded-lg hover:bg-[#002070] font-semibold"
            >
              Create WO
            </button>
          )}
        </td>
      </tr>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Preventive Maintenance</h1>
          <p className="text-gray-500 text-sm">PM intervals, mileage triggers, and scheduled service</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Overdue', count: overdue.length, color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: AlertTriangle },
          { label: 'Due Soon', count: dueSoon.length, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: Clock },
          { label: 'OK', count: ok.length, color: 'text-green-600', bg: 'bg-green-50 border-green-200', icon: CheckCircle2 },
        ].map(k => (
          <div key={k.label} className={`rounded-xl border p-4 ${k.bg}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <div className={`text-3xl font-bold ${k.color}`}>{k.count}</div>
          </div>
        ))}
      </div>

      {/* Attention alerts */}
      {(overdue.length > 0 || dueSoon.length > 0) && (
        <div className={`rounded-xl border p-4 flex items-start gap-3 ${overdue.length > 0 ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
          <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${overdue.length > 0 ? 'text-red-500' : 'text-amber-500'}`} />
          <div>
            <div className={`font-bold mb-1 ${overdue.length > 0 ? 'text-red-900' : 'text-amber-900'}`}>Action Required</div>
            {overdue.map(t => (
              <div key={t.id} className="text-sm text-red-700">{t.vin} — {t.task} overdue {t.daysOverdue} days</div>
            ))}
            {dueSoon.slice(0, 3).map(t => (
              <div key={t.id} className="text-sm text-amber-700">
                {t.vin} — {t.task} {t.daysUntilDue ? `due in ${t.daysUntilDue} days` : `due in ${t.milesUntilDue?.toLocaleString()} mi`}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PM Triggers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#003087]">PM Triggers ({triggers.length} vehicles)</h2>
          <div className="text-xs text-gray-400">Sorted by urgency</div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Task</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Due</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Current Mi</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[...overdue, ...dueSoon, ...ok].map(renderTriggerRow)}
          </tbody>
        </table>
      </div>

      {/* PM Schedules (collapsible) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowSchedules(!showSchedules)}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#003087]" />
            <span className="font-semibold text-[#003087]">PM Schedule Templates ({DEMO_PM_SCHEDULES.length})</span>
          </div>
          <span className="text-xs text-gray-400">{showSchedules ? 'Hide' : 'Show'}</span>
        </button>
        {showSchedules && (
          <div className="border-t border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FB] border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Vehicle Class</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Fuel</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Task</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Interval</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Est. Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DEMO_PM_SCHEDULES.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700 text-xs">{s.vehicleClass.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-2 text-gray-500 text-xs">{s.fuelType?.toUpperCase() ?? 'All'}</td>
                    <td className="px-4 py-2 text-gray-800 font-medium text-xs">{s.taskName}</td>
                    <td className="px-4 py-2 text-right text-gray-600 text-xs">
                      {s.intervalMiles ? `${s.intervalMiles.toLocaleString()} mi` : s.intervalDays ? `${s.intervalDays} days` : 'One-time'}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-600 text-xs">{s.estimatedHours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create WO Modal */}
      {createWOFor && (
        <CreateWOModal
          trigger={createWOFor}
          onConfirm={confirmCreateWO}
          onClose={() => setCreateWOFor(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#003087] text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
