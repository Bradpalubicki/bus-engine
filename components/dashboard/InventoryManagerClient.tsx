'use client'

import { useState } from 'react'
import { Package, ExternalLink, CheckCircle, AlertCircle, Clock } from 'lucide-react'

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

export function InventoryManagerClient({ inventory }: { inventory: InventoryItem[] }) {
  const [activeTab, setActiveTab] = useState<'TSI' | 'SBL'>('TSI')

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
        <button className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors flex items-center gap-2">
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
    </div>
  )
}
