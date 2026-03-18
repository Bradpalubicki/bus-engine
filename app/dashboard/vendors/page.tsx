'use client'

import { useState } from 'react'
import { Building2, AlertTriangle, Plus, X, Edit2, Trash2, Mail, Phone } from 'lucide-react'

type VendorStatus = 'active' | 'inactive' | 'under_review'
type VendorCategory = 'parts_supplier' | 'subcontractor' | 'service_provider' | 'equipment' | 'other'

type Vendor = {
  id: string
  name: string
  category: VendorCategory
  contact_name: string
  contact_email: string
  contact_phone: string
  contract_value: number | null
  contract_start: string | null
  contract_end: string | null
  status: VendorStatus
  notes: string
}

const CATEGORIES: VendorCategory[] = ['parts_supplier', 'subcontractor', 'service_provider', 'equipment', 'other']
const CAT_LABELS: Record<VendorCategory, string> = {
  parts_supplier: 'Parts Supplier',
  subcontractor: 'Subcontractor',
  service_provider: 'Service Provider',
  equipment: 'Equipment',
  other: 'Other',
}
const STATUS_COLORS: Record<VendorStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-500',
  under_review: 'bg-amber-100 text-amber-700',
}

const DEMO_VENDORS: Vendor[] = [
  { id: 'v-1', name: 'Cummins Engine', category: 'parts_supplier', contact_name: 'Tom Bradley', contact_email: 'tbradley@cummins.com', contact_phone: '(812) 377-5000', contract_value: 2_400_000, contract_start: '2024-01-01', contract_end: '2024-12-31', status: 'active', notes: '' },
  { id: 'v-2', name: 'Allison Transmission', category: 'parts_supplier', contact_name: 'Sarah Kim', contact_email: 'skim@allisontransmission.com', contact_phone: '(317) 242-5000', contract_value: 1_800_000, contract_start: '2024-01-01', contract_end: '2025-03-31', status: 'active', notes: '' },
  { id: 'v-3', name: 'Thermo King', category: 'service_provider', contact_name: 'Mike Davis', contact_email: 'mdavis@thermoking.com', contact_phone: '(952) 887-2200', contract_value: 480_000, contract_start: '2024-01-01', contract_end: '2024-06-15', status: 'active', notes: 'HVAC service partner' },
  { id: 'v-4', name: 'Ricon Corp', category: 'parts_supplier', contact_name: 'Lisa Torres', contact_email: 'ltorres@ricon.com', contact_phone: '(818) 267-3000', contract_value: 320_000, contract_start: '2023-06-01', contract_end: '2024-05-31', status: 'under_review', notes: 'Contract renewal pending' },
  { id: 'v-5', name: 'MCI Bus Parts', category: 'parts_supplier', contact_name: 'James Wilson', contact_email: 'jwilson@mcicoach.com', contact_phone: '(402) 496-2900', contract_value: 960_000, contract_start: '2023-01-01', contract_end: '2025-12-31', status: 'active', notes: '' },
]

type VendorForm = Omit<Vendor, 'id'>

function VendorModal({ vendor, onClose, onSave }: { vendor?: Vendor; onClose: () => void; onSave: (f: VendorForm) => void }) {
  const [form, setForm] = useState<VendorForm>(vendor ?? {
    name: '', category: 'parts_supplier', contact_name: '', contact_email: '',
    contact_phone: '', contract_value: null, contract_start: '', contract_end: '',
    status: 'active', notes: '',
  })
  const [saved, setSaved] = useState(false)
  function set<K extends keyof VendorForm>(k: K, v: VendorForm[K]) { setForm(f => ({ ...f, [k]: v })) }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{vendor ? 'Edit Vendor' : 'Add Vendor'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <Building2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-bold text-green-700">Vendor Saved</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Vendor Name *</label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value as VendorCategory)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {CATEGORIES.map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value as VendorStatus)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="under_review">Under Review</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contact Name</label>
                <input type="text" value={form.contact_name} onChange={e => set('contact_name', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contact Phone</label>
                <input type="tel" value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contact Email</label>
                <input type="email" value={form.contact_email} onChange={e => set('contact_email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contract Value ($)</label>
                <input type="number" value={form.contract_value ?? ''} onChange={e => set('contract_value', e.target.value ? Number(e.target.value) : null)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div />
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contract Start</label>
                <input type="date" value={form.contract_start ?? ''} onChange={e => set('contract_start', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contract End</label>
                <input type="date" value={form.contract_end ?? ''} onChange={e => set('contract_end', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Notes</label>
                <textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (form.name) { onSave(form); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Vendor
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

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(DEMO_VENDORS)
  const [showModal, setShowModal] = useState(false)
  const [editVendor, setEditVendor] = useState<Vendor | undefined>()
  const [filterStatus, setFilterStatus] = useState<VendorStatus | 'all'>('all')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2200) }

  function saveVendor(form: VendorForm) {
    if (editVendor) {
      setVendors(vs => vs.map(v => v.id === editVendor.id ? { ...v, ...form } : v))
      showToast('Vendor updated')
    } else {
      setVendors(vs => [...vs, { ...form, id: `v-${Date.now()}` }])
      showToast('Vendor added')
    }
    setShowModal(false); setEditVendor(undefined)
  }

  function deleteVendor(id: string) { setVendors(vs => vs.filter(v => v.id !== id)); showToast('Vendor removed') }

  const daysUntil = (date: string | null) => date ? Math.ceil((new Date(date).getTime() - Date.now()) / 86400000) : null
  const expiringSoon = vendors.filter(v => { const d = daysUntil(v.contract_end); return d !== null && d >= 0 && d <= 60 })
  const expired = vendors.filter(v => { const d = daysUntil(v.contract_end); return d !== null && d < 0 })
  const underReview = vendors.filter(v => v.status === 'under_review')

  const filtered = filterStatus === 'all' ? vendors : vendors.filter(v => v.status === filterStatus)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Vendor Management</h1>
          <p className="text-gray-500 text-sm">
            {vendors.length} vendors · {vendors.filter(v => v.status === 'active').length} active
          </p>
        </div>
        <button onClick={() => { setEditVendor(undefined); setShowModal(true) }}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      {(expired.length > 0 || expiringSoon.length > 0 || underReview.length > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-bold text-amber-900 mb-1">Attention Required</div>
            {expired.map(v => (
              <div key={v.id} className="text-sm text-red-700 font-medium">{v.name} — contract expired {v.contract_end ? new Date(v.contract_end).toLocaleDateString() : ''} — renewal needed</div>
            ))}
            {expiringSoon.map(v => {
              const d = daysUntil(v.contract_end)!
              return <div key={v.id} className="text-sm text-amber-700">{v.name} — contract expires in {d} day{d !== 1 ? 's' : ''}</div>
            })}
            {underReview.map(v => (
              <div key={v.id} className="text-sm text-amber-700">{v.name} — under review</div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(['all', 'active', 'inactive', 'under_review'] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${filterStatus === s ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500'}`}>
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vendor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Contact</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Contract End</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="py-12 text-center text-gray-400">
                <Building2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p>No vendors found</p>
                <button onClick={() => { setEditVendor(undefined); setShowModal(true) }} className="mt-2 text-sm text-[#003087] font-semibold">
                  Add first vendor →
                </button>
              </td></tr>
            ) : filtered.map(v => {
              const d = daysUntil(v.contract_end)
              const expiring = d !== null && d >= 0 && d <= 60
              const isExpired = d !== null && d < 0
              return (
                <tr key={v.id} className={`hover:bg-gray-50 ${isExpired ? 'bg-red-50/30' : expiring ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">{v.name}</div>
                    {v.notes && <div className="text-xs text-gray-400">{v.notes}</div>}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{CAT_LABELS[v.category]}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-700">{v.contact_name}</div>
                    <div className="flex gap-3 mt-0.5">
                      {v.contact_email && (
                        <a href={`mailto:${v.contact_email}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3" /> Email
                        </a>
                      )}
                      {v.contact_phone && (
                        <a href={`tel:${v.contact_phone}`} className="text-xs text-gray-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {v.contact_phone}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">
                    {v.contract_value ? `$${(v.contract_value / 1_000_000).toFixed(1)}M` : '—'}
                  </td>
                  <td className={`px-4 py-3 ${isExpired ? 'text-red-700 font-bold' : expiring ? 'text-amber-700 font-bold' : 'text-gray-500'} text-xs`}>
                    {v.contract_end ? new Date(v.contract_end).toLocaleDateString() : '—'}
                    {isExpired && <span className="ml-1.5 bg-red-100 text-red-700 text-xs px-1.5 py-0.5 rounded-full font-bold">Expired</span>}
                    {expiring && !isExpired && <span className="ml-1">({d}d)</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold capitalize ${STATUS_COLORS[v.status]}`}>
                      {v.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => { setEditVendor(v); setShowModal(true) }}
                        className="p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteVendor(v.id)}
                        className="p-1.5 rounded bg-red-50 text-red-400 hover:bg-red-100">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <VendorModal
          vendor={editVendor}
          onClose={() => { setShowModal(false); setEditVendor(undefined) }}
          onSave={saveVendor}
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
