'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, X, Edit2, Trash2, ClipboardCheck, AlertTriangle, Camera, ChevronDown } from 'lucide-react'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────
type VehicleStatus = 'intake' | 'queued' | 'in_progress' | 'qa_hold' | 'complete' | 'delivered'
type FuelType = 'diesel' | 'cng' | 'lng' | 'hybrid' | 'electric'
type Condition = 'excellent' | 'good' | 'fair' | 'poor'
type DamageSeverity = 'minor' | 'moderate' | 'major'

type DamageRecord = {
  id: string
  photoUrl: string
  description: string
  severity: DamageSeverity
  dateNoted: string
  area: string
}

type ExtendedVehicle = {
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
  // Extended
  _condition: Condition
  _damageRecords: DamageRecord[]
  _agencyName: string
  _locationName: string
}

type Agency = { id: string; name: string | null; state: string | null; contact_name: string | null; contact_email: string | null; contact_phone: string | null; clerk_org_id: string | null; created_at: string | null }
type Contract = { id: string; contract_number: string | null; title: string | null; [key: string]: unknown }
type Location = { id: string; name: string | null; city: string | null; state: string | null; address: string | null; phone: string | null; type: string | null; active: boolean | null; created_at: string | null }

const STATUS_CONFIG: Record<string, { label: string; badge: string }> = {
  intake:      { label: 'Intake',      badge: 'bg-gray-100 text-gray-700' },
  queued:      { label: 'Queued',      badge: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'In Progress', badge: 'bg-amber-100 text-amber-700' },
  qa_hold:     { label: 'QA Hold',     badge: 'bg-red-100 text-red-700' },
  complete:    { label: 'Complete',    badge: 'bg-green-100 text-green-700' },
  delivered:   { label: 'Delivered',   badge: 'bg-purple-100 text-purple-700' },
}

const FUEL_COLORS: Record<string, string> = {
  diesel:   'bg-gray-100 text-gray-700',
  cng:      'bg-blue-100 text-blue-700',
  lng:      'bg-cyan-100 text-cyan-700',
  hybrid:   'bg-teal-100 text-teal-700',
  electric: 'bg-green-100 text-green-700',
}

const MAKES = ['New Flyer', 'Gillig', 'MCI', 'Nova Bus', 'Prevost', 'Motor Coach Industries', 'Blue Bird', 'IC Bus', 'Starcraft', 'Other']

function daysInShop(intakeDate: string | null): number {
  if (!intakeDate) return 0
  return Math.floor((Date.now() - new Date(intakeDate).getTime()) / 86400000)
}

// ── Toast ─────────────────────────────────────────────────────────────────
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t) }, [onDone])
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-[#003087] text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
      {message}
    </div>
  )
}

// ── Vehicle Form Modal ─────────────────────────────────────────────────────
type VehicleFormData = {
  vin: string; make: string; model: string; year: string
  fuel_type: FuelType; agency_id: string; contract_id: string
  location_id: string; intake_date: string; target_completion: string
  length_ft: string; condition: Condition; notes: string
}

function VehicleModal({
  vehicle,
  agencies,
  contracts,
  locations,
  onSave,
  onClose,
}: {
  vehicle?: ExtendedVehicle
  agencies: Agency[]; contracts: Contract[]; locations: Location[]
  onSave: (data: VehicleFormData) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<VehicleFormData>({
    vin: vehicle?.vin ?? '',
    make: vehicle?.make ?? '',
    model: vehicle?.model ?? '',
    year: String(vehicle?.year ?? new Date().getFullYear() - 10),
    fuel_type: (vehicle?.fuel_type as FuelType) ?? 'diesel',
    agency_id: vehicle?.agency_id ?? '',
    contract_id: vehicle?.contract_id ?? '',
    location_id: vehicle?.location_id ?? '',
    intake_date: vehicle?.intake_date ?? new Date().toISOString().split('T')[0],
    target_completion: vehicle?.target_completion ?? '',
    length_ft: String(vehicle?.length_ft ?? 40),
    condition: vehicle?._condition ?? 'good',
    notes: vehicle?.notes ?? '',
  })
  const [err, setErr] = useState('')

  function set(field: keyof VehicleFormData, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function submit() {
    if (!form.vin.trim()) { setErr('VIN required'); return }
    if (!form.make.trim()) { setErr('Make required'); return }
    if (!form.agency_id) { setErr('Agency required'); return }
    if (!form.location_id) { setErr('Location required'); return }
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#003087]">{vehicle ? `Edit ${vehicle.vin}` : 'Add Vehicle'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
        </div>
        <div className="p-6 space-y-4">
          {err && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{err}</div>}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">VIN / Fleet Number *</label>
              <input type="text" placeholder="CCW-013" value={form.vin} onChange={e => set('vin', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Make *</label>
              <select value={form.make} onChange={e => set('make', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                <option value="">Select make...</option>
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Model</label>
              <input type="text" placeholder="D40LF" value={form.model} onChange={e => set('model', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Year</label>
              <input type="number" min="1990" max="2030" value={form.year} onChange={e => set('year', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Length (ft)</label>
              <select value={form.length_ft} onChange={e => set('length_ft', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                {['30','35','40','45','60'].map(l => <option key={l} value={l}>{l}ft</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Fuel Type</label>
              <select value={form.fuel_type} onChange={e => set('fuel_type', e.target.value as FuelType)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                {(['diesel','cng','lng','hybrid','electric'] as FuelType[]).map(f => (
                  <option key={f} value={f}>{f.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Condition</label>
              <select value={form.condition} onChange={e => set('condition', e.target.value as Condition)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                {(['excellent','good','fair','poor'] as Condition[]).map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Agency *</label>
              <select value={form.agency_id} onChange={e => set('agency_id', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                <option value="">Select agency...</option>
                {agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
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
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contract (optional)</label>
              <select value={form.contract_id} onChange={e => set('contract_id', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                <option value="">None</option>
                {contracts.map(c => <option key={c.id} value={c.id as string}>{c.contract_number as string}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Intake Date</label>
              <input type="date" value={form.intake_date} onChange={e => set('intake_date', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Target Completion</label>
              <input type="date" value={form.target_completion} onChange={e => set('target_completion', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Notes</label>
              <textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)}
                placeholder="Intake notes, special instructions..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
            <button onClick={submit}
              className="flex-1 bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070]">
              {vehicle ? 'Save Changes' : 'Add Vehicle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Damage Report Modal ─────────────────────────────────────────────────────
function DamageModal({ vehicle, onAddDamage, onClose }: {
  vehicle: ExtendedVehicle
  onAddDamage: (vehicleId: string, record: DamageRecord) => void
  onClose: () => void
}) {
  const [form, setForm] = useState({ photoUrl: '', description: '', severity: 'minor' as DamageSeverity, area: 'Exterior' })
  const [saved, setSaved] = useState(false)
  const [damagePhotoPreview, setDamagePhotoPreview] = useState('')

  const AREAS = ['Exterior', 'Front End', 'Rear End', 'Driver Side', 'Passenger Side', 'Roof', 'Interior', 'Undercarriage', 'Engine Bay', 'Door Systems']

  function submit() {
    if (!form.description.trim()) return
    onAddDamage(vehicle.id, {
      id: `dmg-${Date.now()}`,
      ...form,
      dateNoted: new Date().toISOString().split('T')[0],
    })
    setSaved(true)
    setTimeout(onClose, 1200)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#003087]">Log Damage — {vehicle.vin}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
        </div>
        {saved ? (
          <div className="p-10 text-center">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <p className="font-bold text-amber-700">Damage Recorded</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Area</label>
              <select value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Severity</label>
              <div className="flex gap-2">
                {(['minor','moderate','major'] as DamageSeverity[]).map(s => (
                  <button key={s} onClick={() => setForm(f => ({ ...f, severity: s }))}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-colors ${form.severity === s
                      ? s === 'major' ? 'border-red-500 bg-red-500 text-white'
                        : s === 'moderate' ? 'border-amber-500 bg-amber-500 text-white'
                        : 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-200 text-gray-600'}`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description *</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Describe the damage..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Photo (optional)</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  <Camera className="w-4 h-4" />
                  {damagePhotoPreview ? 'Change Photo' : 'Attach Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        setDamagePhotoPreview(url)
                        setForm(f => ({ ...f, photoUrl: url }))
                      }
                    }}
                  />
                </label>
                {damagePhotoPreview && (
                  <img src={damagePhotoPreview} alt="damage" className="w-14 h-14 rounded object-cover border border-gray-200" />
                )}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={onClose}
                className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">Cancel</button>
              <button onClick={submit}
                className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600">
                Log Damage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Vehicle Detail Drawer ──────────────────────────────────────────────────
function VehicleDrawer({
  vehicle,
  agencies,
  contracts,
  locations,
  onClose,
  onStatusChange,
  onEdit,
  onDelete,
  onLogDamage,
}: {
  vehicle: ExtendedVehicle
  agencies: Agency[]; contracts: Contract[]; locations: Location[]
  onClose: () => void
  onStatusChange: (id: string, status: VehicleStatus) => void
  onEdit: (v: ExtendedVehicle) => void
  onDelete: (id: string) => void
  onLogDamage: (v: ExtendedVehicle) => void
}) {
  const STATUS_ORDER: VehicleStatus[] = ['intake', 'queued', 'in_progress', 'qa_hold', 'complete', 'delivered']
  const [tab, setTab] = useState<'info' | 'damage'>('info')

  const agencyName = vehicle.agency_id ? agencies.find(a => a.id === vehicle.agency_id)?.name ?? '—' : '—'
  const locationName = vehicle.location_id ? locations.find(l => l.id === vehicle.location_id)?.name ?? '—' : '—'
  const sc = STATUS_CONFIG[vehicle.status ?? 'intake']

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#F8F9FB]">
          <div>
            <div className="font-mono text-sm font-bold text-[#003087]">{vehicle.vin}</div>
            <div className="text-xs text-gray-500">{vehicle.year} {vehicle.make} {vehicle.model} · {vehicle.length_ft}ft</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit(vehicle)} className="p-1.5 text-gray-500 hover:text-[#003087]"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => { onDelete(vehicle.id); onClose() }} className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-700" /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {(['info','damage'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === t ? 'text-[#003087] border-b-2 border-[#003087]' : 'text-gray-500 hover:text-gray-700'}`}>
              {t === 'info' ? 'Vehicle Info' : `Damage Log (${vehicle._damageRecords.length})`}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'info' ? (
            <div className="space-y-5">
              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Status</label>
                <select value={vehicle.status ?? 'intake'}
                  onChange={e => onStatusChange(vehicle.id, e.target.value as VehicleStatus)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20">
                  {STATUS_ORDER.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
                </select>
              </div>

              {/* Details */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                {[
                  { label: 'Agency', value: agencyName },
                  { label: 'Location', value: locationName },
                  { label: 'Fuel Type', value: (vehicle.fuel_type ?? '—').toUpperCase() },
                  { label: 'Condition', value: vehicle._condition?.charAt(0).toUpperCase() + (vehicle._condition?.slice(1) ?? '') },
                  { label: 'Intake Date', value: vehicle.intake_date ?? '—' },
                  { label: 'Target Completion', value: vehicle.target_completion ?? '—' },
                  { label: 'Days in Shop', value: `${daysInShop(vehicle.intake_date)} days` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500 text-xs font-medium uppercase">{label}</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>

              {vehicle.notes && (
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{vehicle.notes}</p>
                </div>
              )}

              {/* Inspection link */}
              <Link href={`/dashboard/fleet/inspect?vin=${vehicle.vin}`}
                className="flex items-center justify-center gap-2 w-full bg-[#003087] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#002070] transition-colors">
                <ClipboardCheck className="w-4 h-4" />
                Start Inspection Form
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <button onClick={() => onLogDamage(vehicle)}
                className="flex items-center gap-2 w-full border-2 border-dashed border-amber-300 text-amber-700 py-3 rounded-xl text-sm font-bold hover:bg-amber-50 transition-colors justify-center">
                <AlertTriangle className="w-4 h-4" />
                Log New Damage
              </button>
              {vehicle._damageRecords.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No damage records</p>
                </div>
              ) : vehicle._damageRecords.map(d => (
                <div key={d.id} className={`rounded-xl border p-4 ${d.severity === 'major' ? 'border-red-200 bg-red-50' : d.severity === 'moderate' ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase">{d.area}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${d.severity === 'major' ? 'bg-red-100 text-red-700' : d.severity === 'moderate' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {d.severity.charAt(0).toUpperCase() + d.severity.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{d.description}</p>
                  <div className="text-xs text-gray-400">{d.dateNoted}</div>
                  {d.photoUrl && (
                    <a href={d.photoUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-[#003087] mt-2 hover:underline">
                      <Camera className="w-3 h-3" /> View Photo
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function FleetClient({
  vehicles: rawVehicles,
  agencies,
  contracts,
  locations,
}: {
  vehicles: { id: string; vin: string | null; agency_id: string | null; contract_id: string | null; location_id: string | null; make: string | null; model: string | null; year: number | null; length_ft: number | null; fuel_type: string | null; status: string | null; intake_date: string | null; target_completion: string | null; delivered_at: string | null; notes: string | null; warranty_expiry: string | null; created_at: string | null }[]
  agencies: Agency[]
  contracts: Contract[]
  locations: Location[]
}) {
  const agencyMap = new Map(agencies.map(a => [a.id, a.name ?? '']))
  const locationMap = new Map(locations.map(l => [l.id, l.name ?? '']))

  const [vehicles, setVehicles] = useState<ExtendedVehicle[]>(() =>
    rawVehicles.map(v => ({
      ...v,
      _condition: 'good' as Condition,
      _damageRecords: [],
      _agencyName: v.agency_id ? agencyMap.get(v.agency_id) ?? '—' : '—',
      _locationName: v.location_id ? locationMap.get(v.location_id) ?? '—' : '—',
    }))
  )

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterFuel, setFilterFuel] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [editVehicle, setEditVehicle] = useState<ExtendedVehicle | undefined>()
  const [detailVehicle, setDetailVehicle] = useState<ExtendedVehicle | undefined>()
  const [damageVehicle, setDamageVehicle] = useState<ExtendedVehicle | undefined>()
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg) }

  const filtered = vehicles.filter(v => {
    const q = search.toLowerCase()
    const matchSearch = !q
      || (v.vin ?? '').toLowerCase().includes(q)
      || v._agencyName.toLowerCase().includes(q)
      || (v.make ?? '').toLowerCase().includes(q)
      || (v.model ?? '').toLowerCase().includes(q)
    const matchStatus = !filterStatus || v.status === filterStatus
    const matchFuel = !filterFuel || v.fuel_type === filterFuel
    return matchSearch && matchStatus && matchFuel
  })

  function addVehicle(data: VehicleFormData) {
    const agency = agencies.find(a => a.id === data.agency_id)
    const location = locations.find(l => l.id === data.location_id)
    const newV: ExtendedVehicle = {
      id: `v-new-${Date.now()}`,
      vin: data.vin,
      agency_id: data.agency_id,
      contract_id: data.contract_id || null,
      location_id: data.location_id,
      make: data.make,
      model: data.model,
      year: parseInt(data.year),
      length_ft: parseInt(data.length_ft),
      fuel_type: data.fuel_type,
      status: 'intake',
      intake_date: data.intake_date,
      target_completion: data.target_completion || null,
      delivered_at: null,
      notes: data.notes || null,
      warranty_expiry: null,
      created_at: new Date().toISOString(),
      _condition: data.condition,
      _damageRecords: [],
      _agencyName: agency?.name ?? '—',
      _locationName: location?.name ?? '—',
    }
    setVehicles(prev => [newV, ...prev])
    setShowCreate(false)
    showToast(`${newV.vin} added to fleet`)
  }

  function saveEdit(data: VehicleFormData) {
    if (!editVehicle) return
    const agency = agencies.find(a => a.id === data.agency_id)
    const location = locations.find(l => l.id === data.location_id)
    setVehicles(prev => prev.map(v => v.id === editVehicle.id ? {
      ...v,
      vin: data.vin, make: data.make, model: data.model,
      year: parseInt(data.year), length_ft: parseInt(data.length_ft),
      fuel_type: data.fuel_type, agency_id: data.agency_id,
      contract_id: data.contract_id || null, location_id: data.location_id,
      intake_date: data.intake_date, target_completion: data.target_completion || null,
      notes: data.notes || null, _condition: data.condition,
      _agencyName: agency?.name ?? v._agencyName,
      _locationName: location?.name ?? v._locationName,
    } : v))
    setEditVehicle(undefined)
    showToast('Vehicle updated')
  }

  function deleteVehicle(id: string) {
    const v = vehicles.find(v => v.id === id)
    setVehicles(prev => prev.filter(v => v.id !== id))
    setDetailVehicle(undefined)
    showToast(`${v?.vin} removed from fleet`)
  }

  function changeStatus(id: string, status: VehicleStatus) {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v))
    setDetailVehicle(prev => prev?.id === id ? { ...prev, status } : prev)
    showToast(`Status → ${STATUS_CONFIG[status].label}`)
  }

  function addDamage(vehicleId: string, record: DamageRecord) {
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, _damageRecords: [...v._damageRecords, record] } : v))
    setDetailVehicle(prev => prev?.id === vehicleId ? { ...prev, _damageRecords: [...(prev._damageRecords), record] } : prev)
    setDamageVehicle(undefined)
  }

  const statusCounts = Object.fromEntries(
    ['intake','queued','in_progress','qa_hold','complete','delivered'].map(s => [s, vehicles.filter(v => v.status === s).length])
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Fleet / Vehicles</h1>
          <p className="text-gray-500 text-sm">{vehicles.length} vehicles · {statusCounts['in_progress']} in production · {statusCounts['qa_hold']} QA hold</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/fleet/inspect"
            className="flex items-center gap-2 border border-[#003087] text-[#003087] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#003087] hover:text-white transition-colors">
            <ClipboardCheck className="w-4 h-4" /> Inspection Form
          </Link>
          <button onClick={() => setShowCreate(true)}
            className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Status KPIs */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {(['intake','queued','in_progress','qa_hold','complete','delivered'] as VehicleStatus[]).map(s => {
          const cfg = STATUS_CONFIG[s]
          return (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
              className={`rounded-xl border p-3 text-center transition-all ${filterStatus === s ? 'ring-2 ring-[#003087]' : 'hover:shadow-sm'} ${cfg.badge.replace('text-', 'border-')}`}>
              <div className={`text-xl font-bold ${cfg.badge.split(' ')[1]}`}>{statusCounts[s]}</div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">{cfg.label}</div>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search VIN, agency, make..."
            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="">All Statuses</option>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select value={filterFuel} onChange={e => setFilterFuel(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="">All Fuel Types</option>
          {['diesel','cng','lng','hybrid','electric'].map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">VIN</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fuel</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Condition</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Days</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                {vehicles.length === 0 ? (
                  <div>
                    <p className="font-medium mb-2">No vehicles yet</p>
                    <button onClick={() => setShowCreate(true)} className="text-[#003087] font-bold hover:underline">+ Add first vehicle</button>
                  </div>
                ) : 'No vehicles match your filters'}
              </td></tr>
            ) : filtered.map(v => {
              const sc = STATUS_CONFIG[v.status ?? 'intake']
              const fc = FUEL_COLORS[v.fuel_type ?? ''] ?? 'bg-gray-100 text-gray-700'
              const dmgCount = v._damageRecords.length
              return (
                <tr key={v.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setDetailVehicle(v)}>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-bold text-[#003087]">{v.vin}</span>
                    {dmgCount > 0 && (
                      <span className="ml-1 text-xs bg-amber-100 text-amber-700 px-1 rounded">{dmgCount} dmg</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{v.year} {v.make} {v.model}</div>
                    <div className="text-xs text-gray-400">{v.length_ft}ft</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{v._agencyName}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{v._locationName}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${fc}`}>{(v.fuel_type ?? '—').toUpperCase()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={v.status ?? 'intake'}
                      onChange={e => { e.stopPropagation(); changeStatus(v.id, e.target.value as VehicleStatus) }}
                      onClick={e => e.stopPropagation()}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${sc.badge}`}>
                      {Object.entries(STATUS_CONFIG).map(([k, cfg]) => <option key={k} value={k}>{cfg.label}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      v._condition === 'excellent' ? 'bg-green-100 text-green-700' :
                      v._condition === 'good' ? 'bg-blue-100 text-blue-700' :
                      v._condition === 'fair' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'}`}>
                      {v._condition.charAt(0).toUpperCase() + v._condition.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-gray-500">{daysInShop(v.intake_date)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                      <button onClick={() => setEditVehicle(v)} className="p-1 text-gray-400 hover:text-[#003087]"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { setDamageVehicle(v) }} className="p-1 text-gray-400 hover:text-amber-600"><AlertTriangle className="w-3.5 h-3.5" /></button>
                      <button onClick={() => deleteVehicle(v.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-400">
          {filtered.length} of {vehicles.length} vehicles · Click any row to open details
        </div>
      </div>

      {/* Modals + Drawers */}
      {showCreate && <VehicleModal agencies={agencies} contracts={contracts} locations={locations} onSave={addVehicle} onClose={() => setShowCreate(false)} />}
      {editVehicle && <VehicleModal vehicle={editVehicle} agencies={agencies} contracts={contracts} locations={locations} onSave={saveEdit} onClose={() => setEditVehicle(undefined)} />}
      {detailVehicle && (
        <VehicleDrawer
          vehicle={vehicles.find(v => v.id === detailVehicle.id) ?? detailVehicle}
          agencies={agencies} contracts={contracts} locations={locations}
          onClose={() => setDetailVehicle(undefined)}
          onStatusChange={changeStatus}
          onEdit={v => { setDetailVehicle(undefined); setEditVehicle(v) }}
          onDelete={deleteVehicle}
          onLogDamage={v => setDamageVehicle(v)}
        />
      )}
      {damageVehicle && (
        <DamageModal vehicle={damageVehicle} onAddDamage={addDamage} onClose={() => setDamageVehicle(undefined)} />
      )}
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}
