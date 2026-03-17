'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, X, Search, LayoutGrid, List, MapPin, Calendar, Edit2, Trash2, Clock, ChevronDown, CheckCircle, AlertTriangle, Timer } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type WOStatus = 'intake' | 'queued' | 'in_progress' | 'qa_hold' | 'complete' | 'delivered' | 'invoiced'
type Priority = 'low' | 'normal' | 'high' | 'urgent'

type WorkOrder = {
  id: string
  wo_number: string | null
  vehicle_id: string | null
  contract_id: string | null
  location_id: string | null
  service_type: string | null
  status: string | null
  priority: string | null
  notes: string | null
  opened_at: string | null
  target_date: string | null
  completed_at: string | null
  closed_at: string | null
  created_at: string | null
}

type Vehicle = {
  id: string
  vin: string | null
  agency_id: string | null
  contract_id: string | null
  location_id: string | null
  make: string | null
  model: string | null
  year: number | null
  length_ft: number | null
  fuel_type: string | null
  status: string | null
  intake_date: string | null
  target_completion: string | null
  delivered_at: string | null
  notes: string | null
  warranty_expiry: string | null
  created_at: string | null
}

type Location = {
  id: string
  name: string | null
  city: string | null
  state: string | null
  address: string | null
  phone: string | null
  type: string | null
  active: boolean | null
  created_at: string | null
}

type Agency = {
  id: string
  name: string | null
  state: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  clerk_org_id: string | null
  created_at: string | null
}

// Extended WO with client-side fields
type ExtendedWO = WorkOrder & {
  _priority: Priority
  _techAssigned: string
  _agencyName: string
  _vin: string
  _locationName: string
  _hoursLogged: number
  _comments: string[]
  _timerRunning: boolean
  _timerStart: number | null
}

// ── Constants ──────────────────────────────────────────────────────────────
const SERVICE_TYPES = [
  'Midlife Overhaul', 'CNG Repower', 'ZEPS Conversion',
  'Body & Paint', 'Interior Rehab', 'CNG Retanking',
  'Electrical Systems', 'Hybrid Systems', 'Structural Repair',
  'ADA Compliance', 'HVAC Service', 'Drivetrain Overhaul', 'Other',
]

const STATUS_ORDER: WOStatus[] = ['intake', 'queued', 'in_progress', 'qa_hold', 'complete', 'delivered', 'invoiced']

const STATUS_CONFIG: Record<string, { label: string; color: string; badge: string }> = {
  intake:      { label: 'Intake',       color: 'bg-gray-100 border-gray-300',    badge: 'bg-gray-100 text-gray-700' },
  queued:      { label: 'Queued',       color: 'bg-blue-50 border-blue-300',     badge: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'In Progress',  color: 'bg-amber-50 border-amber-300',   badge: 'bg-amber-100 text-amber-700' },
  qa_hold:     { label: 'QA Hold',      color: 'bg-red-50 border-red-300',       badge: 'bg-red-100 text-red-700' },
  complete:    { label: 'Complete',     color: 'bg-green-50 border-green-300',   badge: 'bg-green-100 text-green-700' },
  delivered:   { label: 'Delivered',    color: 'bg-purple-50 border-purple-300', badge: 'bg-purple-100 text-purple-700' },
  invoiced:    { label: 'Invoiced',     color: 'bg-teal-50 border-teal-300',     badge: 'bg-teal-100 text-teal-700' },
}

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  low:    { label: 'Low',    color: 'bg-gray-100 text-gray-600' },
  normal: { label: 'Normal', color: 'bg-blue-100 text-blue-700' },
  high:   { label: 'High',   color: 'bg-amber-100 text-amber-700' },
  urgent: { label: 'URGENT', color: 'bg-red-100 text-red-700 font-bold' },
}

// ── Helpers ────────────────────────────────────────────────────────────────
function daysOpen(openedAt: string | null): number {
  if (!openedAt) return 0
  return Math.floor((Date.now() - new Date(openedAt).getTime()) / 86400000)
}

function nextWONumber(wos: ExtendedWO[]): string {
  const year = new Date().getFullYear()
  const nums = wos.map(w => parseInt(w.wo_number?.split('-').pop() ?? '0')).filter(Boolean)
  const next = nums.length ? Math.max(...nums) + 1 : wos.length + 1
  return `WO-${year}-${String(next).padStart(3, '0')}`
}

// ── Toast ─────────────────────────────────────────────────────────────────
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-[#003087] text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in">
      {message}
    </div>
  )
}

// ── Create / Edit Modal ────────────────────────────────────────────────────
type WOFormData = {
  vehicle_id: string
  service_type: string
  location_id: string
  priority: Priority
  techAssigned: string
  target_date: string
  notes: string
}

function WOModal({
  wo,
  vehicles,
  locations,
  agencies,
  onSave,
  onClose,
}: {
  wo?: ExtendedWO
  vehicles: Vehicle[]
  locations: Location[]
  agencies: Agency[]
  onSave: (data: WOFormData) => void
  onClose: () => void
}) {
  const techNames = ['Mike Reyes', 'Sarah Kim', 'Carlos Mendez', 'James Wilson', 'Tom Bradley', 'Lisa Park', 'David Chen', 'Maria Santos']
  const [form, setForm] = useState<WOFormData>({
    vehicle_id: wo?.vehicle_id ?? '',
    service_type: wo?.service_type ?? '',
    location_id: wo?.location_id ?? '',
    priority: (wo?._priority ?? 'normal') as Priority,
    techAssigned: wo?._techAssigned ?? '',
    target_date: wo?.target_date ?? '',
    notes: wo?.notes ?? '',
  })
  const [err, setErr] = useState('')

  function set(field: keyof WOFormData, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function submit() {
    if (!form.vehicle_id) { setErr('Vehicle required'); return }
    if (!form.service_type) { setErr('Service type required'); return }
    if (!form.location_id) { setErr('Location required'); return }
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#003087]">{wo ? `Edit ${wo.wo_number}` : 'New Work Order'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
        </div>
        <div className="p-6 space-y-4">
          {err && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{err}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Vehicle (VIN) *</label>
              <select value={form.vehicle_id} onChange={e => set('vehicle_id', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                <option value="">Select vehicle...</option>
                {vehicles.map(v => {
                  const agency = agencies.find(a => a.id === v.agency_id)
                  return <option key={v.id} value={v.id}>{v.vin} — {v.year} {v.make} {v.model} ({agency?.name ?? '—'})</option>
                })}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Service Type *</label>
              <select value={form.service_type} onChange={e => set('service_type', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                <option value="">Select service...</option>
                {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location *</label>
              <select value={form.location_id} onChange={e => set('location_id', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                <option value="">Select location...</option>
                {locations.map(l => <option key={l.id} value={l.id}>{l.name} — {l.city}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Priority</label>
              <select value={form.priority} onChange={e => set('priority', e.target.value as Priority)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                {(['low', 'normal', 'high', 'urgent'] as Priority[]).map(p => (
                  <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Assigned Technician</label>
              <select value={form.techAssigned} onChange={e => set('techAssigned', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                <option value="">Unassigned</option>
                {techNames.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Target Date</label>
              <input type="date" value={form.target_date} onChange={e => set('target_date', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Notes</label>
              <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)}
                placeholder="Work scope, special instructions, client notes..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
            <button onClick={submit}
              className="flex-1 bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070]">
              {wo ? 'Save Changes' : 'Create Work Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── WO Detail Drawer ───────────────────────────────────────────────────────
function WODetailDrawer({
  wo,
  onClose,
  onStatusChange,
  onAddComment,
  onToggleTimer,
}: {
  wo: ExtendedWO
  onClose: () => void
  onStatusChange: (id: string, status: WOStatus) => void
  onAddComment: (id: string, comment: string) => void
  onToggleTimer: (id: string) => void
}) {
  const [comment, setComment] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (wo._timerRunning && wo._timerStart) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - wo._timerStart!) / 1000))
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [wo._timerRunning, wo._timerStart])

  const totalSeconds = wo._hoursLogged * 3600 + elapsed
  const hrs = Math.floor(totalSeconds / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60)

  const sc = STATUS_CONFIG[wo.status ?? 'queued']
  const pc = PRIORITY_CONFIG[wo._priority]

  function submitComment() {
    if (!comment.trim()) return
    onAddComment(wo.id, comment.trim())
    setComment('')
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#F8F9FB]">
          <div>
            <div className="font-mono text-sm font-bold text-[#003087]">{wo.wo_number}</div>
            <div className="text-xs text-gray-500 mt-0.5">{wo.service_type}</div>
          </div>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-700" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Status</label>
              <select value={wo.status ?? 'queued'}
                onChange={e => onStatusChange(wo.id, e.target.value as WOStatus)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                {STATUS_ORDER.map(s => (
                  <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Priority</label>
              <span className={`inline-block text-xs px-3 py-1.5 rounded-lg ${pc.color}`}>{pc.label}</span>
            </div>
          </div>

          {/* Key info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            {[
              { label: 'VIN', value: wo._vin },
              { label: 'Agency', value: wo._agencyName },
              { label: 'Location', value: wo._locationName },
              { label: 'Technician', value: wo._techAssigned || 'Unassigned' },
              { label: 'Days Open', value: `${daysOpen(wo.opened_at)} days` },
              { label: 'Target Date', value: wo.target_date ? new Date(wo.target_date).toLocaleDateString() : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500 text-xs font-medium uppercase">{label}</span>
                <span className="font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          {/* Time tracking */}
          <div className="bg-[#003087]/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-[#003087]" />
                <span className="text-sm font-bold text-[#003087]">Time Tracking</span>
              </div>
              <button onClick={() => onToggleTimer(wo.id)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${wo._timerRunning ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-[#003087] text-white hover:bg-[#002070]'}`}>
                <Clock className="w-3 h-3" />
                {wo._timerRunning ? 'Stop Timer' : 'Start Timer'}
              </button>
            </div>
            <div className="text-3xl font-mono font-bold text-[#003087] text-center py-2">
              {String(hrs).padStart(2, '0')}:{String(mins).padStart(2, '0')}
            </div>
            <div className="text-center text-xs text-gray-500 mt-1">
              {wo._timerRunning ? '● Recording...' : 'Total time logged'}
            </div>
          </div>

          {/* Notes */}
          {wo.notes && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</div>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{wo.notes}</p>
            </div>
          )}

          {/* Comments */}
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-3">Comments / Log</div>
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
              {wo._comments.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No comments yet</p>
              ) : wo._comments.map((c, i) => (
                <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700">{c}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={comment} onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitComment()}
                placeholder="Add a comment..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
              <button onClick={submitComment}
                className="bg-[#003087] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#002070]">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function WorkOrdersClient({
  workOrders,
  vehicles,
  locations,
  agencies,
}: {
  workOrders: WorkOrder[]
  vehicles: Vehicle[]
  locations: Location[]
  agencies: Agency[]
}) {
  const vehicleMap = new Map(vehicles.map(v => [v.id, v]))
  const locationMap = new Map(locations.map(l => [l.id, l]))
  const agencyMap = new Map(agencies.map(a => [a.id, a.name ?? '']))

  // Hydrate demo data with extended fields
  const DEMO_TECH_MAP: Record<string, string> = {
    'v-1': 'Mike Reyes', 'v-2': 'Sarah Kim', 'v-3': 'James Wilson',
    'v-4': 'Carlos Mendez', 'v-5': 'Mike Reyes', 'v-6': 'Tom Bradley',
    'v-7': 'Lisa Park', 'v-8': 'James Wilson', 'v-9': 'Sarah Kim',
  }

  function hydrateWO(wo: WorkOrder): ExtendedWO {
    const vehicle = wo.vehicle_id ? vehicleMap.get(wo.vehicle_id) : null
    const loc = wo.location_id ? locationMap.get(wo.location_id) : null
    const agencyName = vehicle?.agency_id ? agencyMap.get(vehicle.agency_id) ?? '—' : '—'
    return {
      ...wo,
      _priority: (wo.priority as Priority) ?? 'normal',
      _techAssigned: DEMO_TECH_MAP[wo.vehicle_id ?? ''] ?? '',
      _agencyName: agencyName,
      _vin: vehicle?.vin ?? '—',
      _locationName: loc?.name ?? '—',
      _hoursLogged: 0,
      _comments: [],
      _timerRunning: false,
      _timerStart: null,
    }
  }

  const [wos, setWOs] = useState<ExtendedWO[]>(() => workOrders.map(hydrateWO))
  const [view, setView] = useState<'kanban' | 'table'>('kanban')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterTech, setFilterTech] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [editWO, setEditWO] = useState<ExtendedWO | undefined>()
  const [detailWO, setDetailWO] = useState<ExtendedWO | undefined>()
  const [toast, setToast] = useState('')

  const allTechs = Array.from(new Set(wos.map(w => w._techAssigned).filter(Boolean)))

  function showToast(msg: string) {
    setToast(msg)
  }

  const filtered = wos.filter(wo => {
    const q = search.toLowerCase()
    const matchSearch = !q
      || (wo.wo_number ?? '').toLowerCase().includes(q)
      || wo._vin.toLowerCase().includes(q)
      || wo._agencyName.toLowerCase().includes(q)
      || (wo.service_type ?? '').toLowerCase().includes(q)
    const matchStatus = !filterStatus || wo.status === filterStatus
    const matchTech = !filterTech || wo._techAssigned === filterTech
    return matchSearch && matchStatus && matchTech
  })

  function createWO(data: WOFormData) {
    const vehicle = vehicleMap.get(data.vehicle_id)
    const loc = locationMap.get(data.location_id)
    const agency = agencies.find(a => a.id === vehicle?.agency_id)
    const newWO: ExtendedWO = {
      id: `wo-new-${Date.now()}`,
      wo_number: nextWONumber(wos),
      vehicle_id: data.vehicle_id,
      contract_id: vehicle?.contract_id ?? null,
      location_id: data.location_id,
      service_type: data.service_type,
      status: 'queued',
      priority: data.priority,
      notes: data.notes || null,
      opened_at: new Date().toISOString().split('T')[0],
      target_date: data.target_date || null,
      completed_at: null,
      closed_at: null,
      created_at: new Date().toISOString(),
      _priority: data.priority,
      _techAssigned: data.techAssigned,
      _agencyName: agency?.name ?? '—',
      _vin: vehicle?.vin ?? '—',
      _locationName: loc?.name ?? '—',
      _hoursLogged: 0,
      _comments: [],
      _timerRunning: false,
      _timerStart: null,
    }
    setWOs(prev => [newWO, ...prev])
    setShowCreate(false)
    showToast(`${newWO.wo_number} created`)
  }

  function saveEdit(data: WOFormData) {
    if (!editWO) return
    const vehicle = vehicleMap.get(data.vehicle_id)
    const loc = locationMap.get(data.location_id)
    const agency = agencies.find(a => a.id === vehicle?.agency_id)
    setWOs(prev => prev.map(w => w.id === editWO.id ? {
      ...w,
      vehicle_id: data.vehicle_id,
      location_id: data.location_id,
      service_type: data.service_type,
      priority: data.priority,
      notes: data.notes || null,
      target_date: data.target_date || null,
      _priority: data.priority,
      _techAssigned: data.techAssigned,
      _agencyName: agency?.name ?? w._agencyName,
      _vin: vehicle?.vin ?? w._vin,
      _locationName: loc?.name ?? w._locationName,
    } : w))
    setEditWO(undefined)
    showToast('Work order updated')
  }

  function deleteWO(id: string) {
    const wo = wos.find(w => w.id === id)
    setWOs(prev => prev.filter(w => w.id !== id))
    setDetailWO(undefined)
    showToast(`${wo?.wo_number} deleted`)
  }

  function changeStatus(id: string, status: WOStatus) {
    setWOs(prev => prev.map(w => w.id === id ? {
      ...w, status,
      completed_at: status === 'complete' ? new Date().toISOString() : w.completed_at,
    } : w))
    setDetailWO(prev => prev?.id === id ? { ...prev, status } : prev)
    showToast(`Status updated → ${STATUS_CONFIG[status].label}`)
  }

  function addComment(id: string, comment: string) {
    setWOs(prev => prev.map(w => w.id === id ? { ...w, _comments: [...w._comments, comment] } : w))
    setDetailWO(prev => prev?.id === id ? { ...prev, _comments: [...(prev._comments), comment] } : prev)
  }

  function toggleTimer(id: string) {
    setWOs(prev => prev.map(w => {
      if (w.id !== id) return w
      if (w._timerRunning) {
        const elapsed = w._timerStart ? Math.floor((Date.now() - w._timerStart) / 3600000 * 100) / 100 : 0
        return { ...w, _timerRunning: false, _timerStart: null, _hoursLogged: w._hoursLogged + elapsed }
      }
      return { ...w, _timerRunning: true, _timerStart: Date.now() }
    }))
    setDetailWO(prev => {
      if (!prev || prev.id !== id) return prev
      if (prev._timerRunning) {
        const elapsed = prev._timerStart ? Math.floor((Date.now() - prev._timerStart) / 3600000 * 100) / 100 : 0
        return { ...prev, _timerRunning: false, _timerStart: null, _hoursLogged: prev._hoursLogged + elapsed }
      }
      return { ...prev, _timerRunning: true, _timerStart: Date.now() }
    })
  }

  const kanbanCols: WOStatus[] = ['intake', 'queued', 'in_progress', 'qa_hold', 'complete', 'delivered']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Work Orders</h1>
          <p className="text-gray-500 text-sm">{wos.length} work orders · {wos.filter(w => w.status === 'in_progress').length} in progress</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setView('kanban')}
              className={`px-3 py-1.5 ${view === 'kanban' ? 'bg-[#003087] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setView('table')}
              className={`px-3 py-1.5 ${view === 'table' ? 'bg-[#003087] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] flex items-center gap-2">
            <Plus className="w-4 h-4" /> New WO
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Open', value: wos.filter(w => !['delivered','invoiced'].includes(w.status ?? '')).length, color: 'text-[#003087]' },
          { label: 'In Progress', value: wos.filter(w => w.status === 'in_progress').length, color: 'text-amber-600' },
          { label: 'QA Hold', value: wos.filter(w => w.status === 'qa_hold').length, color: 'text-red-600' },
          { label: 'Complete', value: wos.filter(w => w.status === 'complete').length, color: 'text-green-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search WO#, VIN, agency, service..."
            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="">All Statuses</option>
          {STATUS_ORDER.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
        </select>
        <select value={filterTech} onChange={e => setFilterTech(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="">All Technicians</option>
          {allTechs.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Kanban View */}
      {view === 'kanban' ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {kanbanCols.map(col => {
              const colWOs = filtered.filter(w => w.status === col)
              const cfg = STATUS_CONFIG[col]
              return (
                <div key={col} className="w-60 flex-shrink-0">
                  <div className={`flex items-center justify-between px-3 py-2 rounded-t-xl border ${cfg.color} mb-2`}>
                    <span className="text-xs font-bold uppercase tracking-wide">{cfg.label}</span>
                    <span className="text-xs font-bold bg-white/60 px-1.5 py-0.5 rounded-full">{colWOs.length}</span>
                  </div>
                  <div className="space-y-2 min-h-20">
                    {colWOs.length === 0 ? (
                      <div className="text-center py-6 text-gray-300 text-xs border-2 border-dashed rounded-xl">Empty</div>
                    ) : colWOs.map(wo => {
                      const pc = PRIORITY_CONFIG[wo._priority]
                      return (
                        <div key={wo.id}
                          onClick={() => setDetailWO(wo)}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-mono font-bold text-[#003087]">{wo.wo_number}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${pc.color}`}>{pc.label}</span>
                          </div>
                          <div className="font-semibold text-xs text-gray-800 mb-1">{wo._vin}</div>
                          <div className="text-xs text-gray-500 mb-1">{wo.service_type}</div>
                          <div className="text-xs text-gray-400">{wo._agencyName}</div>
                          {wo._techAssigned && (
                            <div className="text-xs text-gray-400 mt-1">👤 {wo._techAssigned}</div>
                          )}
                          {wo.target_date && (
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(wo.target_date).toLocaleDateString()}
                            </div>
                          )}
                          {wo._timerRunning && (
                            <div className="flex items-center gap-1 text-xs text-red-500 mt-1 font-medium">
                              <Clock className="w-3 h-3" /> Recording...
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F9FB] border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">WO #</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">VIN / Agency</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Service</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Technician</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Priority</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Days</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">No work orders match your filters</td></tr>
              ) : filtered.map(wo => {
                const sc = STATUS_CONFIG[wo.status ?? 'queued']
                const pc = PRIORITY_CONFIG[wo._priority]
                return (
                  <tr key={wo.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setDetailWO(wo)}>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-[#003087]">{wo.wo_number}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono text-xs font-medium">{wo._vin}</div>
                      <div className="text-xs text-gray-400">{wo._agencyName}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{wo.service_type}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{wo._techAssigned || '—'}</td>
                    <td className="px-4 py-3">
                      <select value={wo.status ?? 'queued'}
                        onChange={e => { e.stopPropagation(); changeStatus(wo.id, e.target.value as WOStatus) }}
                        onClick={e => e.stopPropagation()}
                        className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${sc.badge}`}>
                        {STATUS_ORDER.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${pc.color}`}>{pc.label}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-gray-500">{daysOpen(wo.opened_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setEditWO(wo)}
                          className="p-1 text-gray-400 hover:text-[#003087] transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteWO(wo.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-400">
            {filtered.length} of {wos.length} work orders · Click any row to open details
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreate && (
        <WOModal vehicles={vehicles} locations={locations} agencies={agencies} onSave={createWO} onClose={() => setShowCreate(false)} />
      )}
      {editWO && (
        <WOModal wo={editWO} vehicles={vehicles} locations={locations} agencies={agencies} onSave={saveEdit} onClose={() => setEditWO(undefined)} />
      )}
      {detailWO && (
        <WODetailDrawer
          wo={wos.find(w => w.id === detailWO.id) ?? detailWO}
          onClose={() => setDetailWO(undefined)}
          onStatusChange={changeStatus}
          onAddComment={addComment}
          onToggleTimer={toggleTimer}
        />
      )}
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}
