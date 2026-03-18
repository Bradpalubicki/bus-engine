'use client'

import { useState } from 'react'
import { InventoryManagerClient } from '@/components/dashboard/InventoryManagerClient'
import { demoTSIInventory, demoTSISalesPipeline, demoBuyerLeads } from '@/lib/demo-data'
import { TrendingUp, Users } from 'lucide-react'

const STATUS_PIPELINE_COLORS: Record<string, string> = {
  prospect: 'bg-gray-100 text-gray-600',
  quoted: 'bg-blue-100 text-blue-700',
  negotiating: 'bg-amber-100 text-amber-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-600',
}

const LEAD_COLORS: Record<string, string> = {
  hot: 'bg-red-100 text-red-700',
  warm: 'bg-amber-100 text-amber-700',
  cold: 'bg-blue-100 text-blue-600',
}

function fmt(n: number) {
  return '$' + (n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + 'M' : (n / 1000).toFixed(0) + 'K')
}

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'pipeline' | 'leads'>('inventory')

  // Map demo TSI inventory to shape expected by InventoryManagerClient
  const tsiInventory = demoTSIInventory.map(b => ({
    id: b.id,
    brand: 'TSI' as const,
    year: b.year,
    make: b.make,
    model: b.model,
    vin: null,
    length_ft: b.length,
    fuel_type: b.fuelType,
    seats: b.seats,
    mileage: b.mileage,
    condition: b.condition,
    price: b.price,
    price_display: null,
    description: null,
    features: [],
    photos: [],
    primary_photo_url: null,
    status: b.status === 'available' ? 'active' : b.status,
    sbl_lease_type: null,
    sbl_min_term_months: null,
    created_at: null,
    updated_at: null,
    published_at: null,
    sold_at: null,
  }))

  const sblInventory = [
    { id: 101, brand: 'SBL' as const, year: 2018, make: 'MCI', model: 'D4500CT', vin: null, length_ft: 45, fuel_type: 'diesel', seats: 55, mileage: 210000, condition: 'refurbished', price: null, price_display: 'From $4,800/mo', description: 'Charter coach, executive seating', features: ['WiFi', 'Restroom', 'PA System'], photos: [], primary_photo_url: null, status: 'active', sbl_lease_type: 'contract', sbl_min_term_months: 6, created_at: null, updated_at: null, published_at: null, sold_at: null },
    { id: 102, brand: 'SBL' as const, year: 2016, make: 'Gillig', model: 'Low Floor', vin: null, length_ft: 40, fuel_type: 'cng', seats: 40, mileage: 285000, condition: 'refurbished', price: null, price_display: 'From $2,800/mo', description: 'Fixed-route transit lease', features: ['ADA Lift', 'AC', 'Fareboxes'], photos: [], primary_photo_url: null, status: 'active', sbl_lease_type: 'gap', sbl_min_term_months: 3, created_at: null, updated_at: null, published_at: null, sold_at: null },
    { id: 103, brand: 'SBL' as const, year: 2020, make: 'Starcraft', model: 'Allstar', vin: null, length_ft: 30, fuel_type: 'gasoline', seats: 24, mileage: 95000, condition: 'refurbished', price: null, price_display: 'From $1,400/mo', description: 'Employee/shuttle lease', features: ['AC', 'Luggage'], photos: [], primary_photo_url: null, status: 'active', sbl_lease_type: 'shuttle', sbl_min_term_months: 1, created_at: null, updated_at: null, published_at: null, sold_at: null },
  ]

  const allInventory = [...tsiInventory, ...sblInventory]

  return (
    <div className="space-y-4">
      {/* Tab switcher for TSI operations */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { key: 'inventory', label: 'Bus Inventory' },
          { key: 'pipeline', label: 'Sales Pipeline' },
          { key: 'leads', label: 'Buyer Leads' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === t.key ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'inventory' && <InventoryManagerClient inventory={allInventory} />}

      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#003087]" />
            <h2 className="text-xl font-bold text-[#003087]">Sales Pipeline</h2>
            <span className="text-sm text-gray-500 ml-1">— {demoTSISalesPipeline.length} active RFQs</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FB] border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Agency</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bus Type</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Qty</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Est Value</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Days in Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {demoTSISalesPipeline.map(rfq => (
                  <tr key={rfq.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{rfq.agency}</td>
                    <td className="px-4 py-3 text-gray-600">{rfq.busType}</td>
                    <td className="px-4 py-3 text-right font-medium">{rfq.qty}</td>
                    <td className="px-4 py-3 text-right font-semibold text-green-700">{fmt(rfq.estValue)}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{rfq.contact}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold capitalize ${STATUS_PIPELINE_COLORS[rfq.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {rfq.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500 text-xs">{rfq.daysInStage}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#003087]" />
            <h2 className="text-xl font-bold text-[#003087]">Buyer Leads</h2>
            <span className="text-sm text-gray-500 ml-1">— agencies actively shopping</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoBuyerLeads.map(lead => (
              <div key={lead.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-900">{lead.agency}</div>
                    <div className="text-xs text-gray-400">{lead.state}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold capitalize ${LEAD_COLORS[lead.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {lead.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">Needs</span>
                    <span className="font-medium text-gray-800 text-xs">{lead.busesNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">Budget</span>
                    <span className="font-semibold text-green-700 text-xs">{lead.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">Contact</span>
                    <a href={`mailto:${lead.email}`} className="text-xs text-[#003087] hover:underline">{lead.contact}</a>
                  </div>
                </div>
                {lead.notes && <p className="text-xs text-gray-400 mt-2 border-t border-gray-50 pt-2">{lead.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
