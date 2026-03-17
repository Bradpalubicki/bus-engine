'use client'

import { useState } from 'react'
import { Package, ExternalLink, X, Plus } from 'lucide-react'

type InventoryItem = {
  id: number
  brand: 'TSI' | 'SBL'
  year: number
  make: string
  model: string | null
  vin: string | null
  length_ft: number | null
  fuel_type: string | null
  seats: number | null
  mileage: number | null
  condition: string
  price: number | null
  price_display: string | null
  description: string | null
  features: string[]
  photos: string[]
  primary_photo_url: string | null
  status: string
  sbl_lease_type: string | null
  sbl_min_term_months: number | null
  created_at: string | null
  updated_at: string | null
  published_at: string | null
  sold_at: string | null
}

const statusConfig: Record<string, { label: string; color: string }> = {
  draft:   { label: 'Draft',   color: 'bg-gray-100 text-gray-600' },
  active:  { label: 'Active',  color: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  sold:    { label: 'Sold',    color: 'bg-red-100 text-red-700' },
  leased:  { label: 'Leased',  color: 'bg-blue-100 text-blue-700' },
}

function formatMileage(n: number | null) {
  if (!n) return '—'
  return n.toLocaleString() + ' mi'
}

function formatPrice(item: InventoryItem) {
  if (item.price_display) return item.price_display
  if (item.price) return '$' + item.price.toLocaleString()
  return 'Request Quote'
}

type AddBusForm = {
  brand: 'TSI' | 'SBL'
  year: string; make: string; model: string; vin: string
  length_ft: string; fuel_type: string; seats: string; mileage: string
  condition: string; price: string; description: string; status: string
  sbl_lease_type: string; sbl_min_term_months: string
}

function AddBusModal({ defaultBrand, onClose }: { defaultBrand: 'TSI' | 'SBL'; onClose: () => void }) {
  const [form, setForm] = useState<AddBusForm>({
    brand: defaultBrand, year: '', make: '', model: '', vin: '',
    length_ft: '', fuel_type: 'diesel', seats: '', mileage: '',
    condition: 'good', price: '', description: '', status: 'draft',
    sbl_lease_type: 'gap', sbl_min_term_months: '1',
  })
  const [saved, setSaved] = useState(false)

  function set(field: keyof AddBusForm, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSave() {
    // Demo: just show success state
    setSaved(true)
    setTimeout(() => onClose(), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">Add Bus to {form.brand} Inventory</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-7 h-7 text-green-600 rotate-45" />
            </div>
            <p className="text-lg font-bold text-green-700">Bus Added Successfully</p>
            <p className="text-sm text-gray-500 mt-1">It will appear as a Draft until you publish it.</p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Brand toggle */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Brand</label>
              <div className="flex gap-2">
                {(['TSI', 'SBL'] as const).map(b => (
                  <button key={b} onClick={() => set('brand', b)}
                    className={`px-5 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${form.brand === b ? 'border-[#003087] bg-[#003087] text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Year / Make / Model / VIN */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Year', field: 'year', placeholder: '2019' },
                { label: 'Make', field: 'make', placeholder: 'Gillig, New Flyer, MCI…' },
                { label: 'Model', field: 'model', placeholder: 'Low Floor, Xcelsior…' },
                { label: 'VIN (optional)', field: 'vin', placeholder: '1FNB123…' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={form[field as keyof AddBusForm]}
                    onChange={e => set(field as keyof AddBusForm, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
                  />
                </div>
              ))}
            </div>

            {/* Fuel / Length / Seats / Mileage */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Fuel Type</label>
                <select value={form.fuel_type} onChange={e => set('fuel_type', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {['diesel', 'cng', 'electric', 'diesel-electric', 'hydrogen', 'gasoline'].map(f => (
                    <option key={f} value={f}>{f.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Length (ft)</label>
                <input type="number" placeholder="40" value={form.length_ft} onChange={e => set('length_ft', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Seats</label>
                <input type="number" placeholder="40" value={form.seats} onChange={e => set('seats', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Mileage</label>
                <input type="number" placeholder="150000" value={form.mileage} onChange={e => set('mileage', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
            </div>

            {/* Condition / Price / Status */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Condition</label>
                <select value={form.condition} onChange={e => set('condition', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {['excellent', 'good', 'fair', 'refurbished'].map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{form.brand === 'TSI' ? 'Price ($)' : 'Monthly Rate ($)'}</label>
                <input type="number" placeholder={form.brand === 'TSI' ? '185000' : '2800'} value={form.price} onChange={e => set('price', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  <option value="draft">Draft (Hidden)</option>
                  <option value="active">Active (Live)</option>
                </select>
              </div>
            </div>

            {/* SBL-only: lease type + min term */}
            {form.brand === 'SBL' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Lease Type</label>
                  <select value={form.sbl_lease_type} onChange={e => set('sbl_lease_type', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                    {['gap', 'contract', 'lease-to-own', 'shuttle'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Min Term (months)</label>
                  <input type="number" placeholder="3" value={form.sbl_min_term_months} onChange={e => set('sbl_min_term_months', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description (optional)</label>
              <textarea rows={3} placeholder="Additional notes, features, history…" value={form.description} onChange={e => set('description', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Bus Listing
              </button>
              <button onClick={onClose}
                className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function InventoryManagerClient({ inventory }: { inventory: InventoryItem[] }) {
  const [activeTab, setActiveTab] = useState<'TSI' | 'SBL'>('TSI')
  const [showAddModal, setShowAddModal] = useState(false)

  const filtered = inventory.filter(i => i.brand === activeTab)
  const tsiCount = inventory.filter(i => i.brand === 'TSI').length
  const sblCount = inventory.filter(i => i.brand === 'SBL').length
  const activeCount = filtered.filter(i => i.status === 'active').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Inventory Management</h1>
          <p className="text-gray-500 text-sm">TSI for-sale buses + SBL lease fleet · {activeCount} active listings</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          Add Bus
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab('TSI')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'TSI' ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          TSI Buses for Sale ({tsiCount})
        </button>
        <button
          onClick={() => setActiveTab('SBL')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'SBL' ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          SBL Lease Fleet ({sblCount})
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Listed', value: filtered.length, color: 'text-[#003087]' },
          { label: 'Active / Live', value: filtered.filter(i => i.status === 'active').length, color: 'text-green-600' },
          { label: 'Draft / Hidden', value: filtered.filter(i => i.status === 'draft').length, color: 'text-gray-500' },
          { label: activeTab === 'TSI' ? 'Sold YTD' : 'Leased', value: filtered.filter(i => i.status === 'sold' || i.status === 'leased').length, color: 'text-blue-600' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Year / Make / Model</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fuel</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Length</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Mileage</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(item => {
              const sc = statusConfig[item.status] ?? { label: item.status, color: 'bg-gray-100 text-gray-600' }
              const isSoldOrLeased = item.status === 'sold' || item.status === 'leased'
              return (
                <tr key={item.id} className={`hover:bg-gray-50 ${isSoldOrLeased ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3">
                    <div className={`font-bold text-gray-800 ${isSoldOrLeased ? 'line-through' : ''}`}>
                      {item.year} {item.make} {item.model}
                    </div>
                    <div className="text-xs text-gray-400">{item.condition}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{item.fuel_type ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{item.length_ft ? `${item.length_ft}ft` : '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{formatMileage(item.mileage)}</td>
                  <td className="px-4 py-3 font-bold text-gray-800">{formatPrice(item)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${sc.color}`}>{sc.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {item.status === 'active' && (
                        <a
                          href={item.brand === 'TSI' ? '/tsi/inventory' : '/sbl/fleet'}
                          target="_blank"
                          className="text-[#003087] hover:underline"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {item.status !== 'sold' && item.status !== 'leased' && (
                        <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Edit</button>
                      )}
                      {item.status === 'active' && item.brand === 'TSI' && (
                        <button className="text-xs text-red-500 hover:text-red-700 font-medium">Mark Sold</button>
                      )}
                      {item.status === 'active' && item.brand === 'SBL' && (
                        <button className="text-xs text-blue-500 hover:text-blue-700 font-medium">Mark Leased</button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No inventory yet</p>
            <p className="text-sm">Add your first bus using the button above</p>
          </div>
        )}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
          DEMO — Active listings appear live on the {activeTab === 'TSI' ? '/tsi/inventory' : '/sbl/fleet'} page. Marked-sold buses auto-hide.
        </div>
      </div>

      {showAddModal && (
        <AddBusModal defaultBrand={activeTab} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  )
}
