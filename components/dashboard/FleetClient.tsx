'use client'

import { useState, useTransition } from 'react'
import { Search, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addVehicle } from '@/app/dashboard/fleet/actions'
import { vehicleStatusColors, vehicleStatusLabel, fuelColors, daysAgo } from '@/lib/status-colors'
import type { Database } from '@/lib/database.types'

type Vehicle = Database['public']['Tables']['bus_vehicles']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']
type Contract = Database['public']['Tables']['bus_contracts']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']

const schema = z.object({
  vin: z.string().min(1, 'VIN required'),
  make: z.string().min(1, 'Make required'),
  model: z.string().min(1, 'Model required'),
  year: z.string().min(1, 'Year required'),
  fuel_type: z.enum(['diesel', 'cng', 'lng', 'hybrid', 'electric']),
  agency_id: z.string().min(1, 'Agency required'),
  contract_id: z.string().optional(),
  location_id: z.string().min(1, 'Location required'),
  intake_date: z.string().min(1, 'Intake date required'),
  target_completion: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function FleetClient({
  vehicles,
  agencies,
  contracts,
  locations,
}: {
  vehicles: Vehicle[]
  agencies: Agency[]
  contracts: Contract[]
  locations: Location[]
}) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterFuel, setFilterFuel] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const agencyMap = new Map(agencies.map(a => [a.id, a.name]))
  const locationMap = new Map(locations.map(l => [l.id, { name: l.name, city: l.city ?? '' }]))

  const filtered = vehicles.filter(v => {
    const q = search.toLowerCase()
    const agencyName = v.agency_id ? agencyMap.get(v.agency_id) ?? '' : ''
    const matchSearch = !q || v.vin.toLowerCase().includes(q) || agencyName.toLowerCase().includes(q)
    const matchStatus = !filterStatus || v.status === filterStatus
    const matchFuel = !filterFuel || v.fuel_type === filterFuel
    return matchSearch && matchStatus && matchFuel
  })

  const onSubmit = (data: FormData) => {
    setError(null)
    startTransition(async () => {
      try {
        await addVehicle({ ...data, year: parseInt(data.year) })
        reset()
        setShowModal(false)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to add vehicle')
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Fleet / Vehicles</h1>
          <p className="text-gray-500 text-sm">{vehicles.length} vehicles in system</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004db3] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search VIN or agency..."
            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
        >
          <option value="">All Statuses</option>
          {['intake', 'queued', 'in_progress', 'qa_hold', 'complete', 'delivered'].map(s => (
            <option key={s} value={s}>{vehicleStatusLabel[s]}</option>
          ))}
        </select>
        <select
          value={filterFuel}
          onChange={e => setFilterFuel(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
        >
          <option value="">All Fuel Types</option>
          {['diesel', 'cng', 'lng', 'hybrid', 'electric'].map(f => (
            <option key={f} value={f}>{f.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">VIN</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Vehicle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fuel</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Days in Shop</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">No vehicles found</td></tr>
            ) : filtered.map(v => {
              const agencyName = v.agency_id ? agencyMap.get(v.agency_id) ?? '—' : '—'
              const loc = v.location_id ? locationMap.get(v.location_id) : null
              return (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/fleet/${v.id}`} className="font-mono text-xs font-bold text-[#003087] hover:underline">
                      {v.vin}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{v.year} {v.make} {v.model}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{agencyName}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{loc?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${fuelColors[v.fuel_type ?? ''] ?? 'bg-gray-100 text-gray-600'}`}>
                      {(v.fuel_type ?? '—').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${vehicleStatusColors[v.status ?? 'intake']}`}>
                      {vehicleStatusLabel[v.status ?? 'intake']}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">{daysAgo(v.intake_date) ?? '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-[#003087]">Add Vehicle</h2>
              <button onClick={() => { setShowModal(false); reset(); setError(null) }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">VIN *</label>
                  <input {...register('vin')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  {errors.vin && <p className="text-red-500 text-xs mt-1">{errors.vin.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Year *</label>
                  <input {...register('year')} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Make *</label>
                  <input {...register('make')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                  {errors.make && <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Model *</label>
                  <input {...register('model')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Fuel Type *</label>
                  <select {...register('fuel_type')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    {['diesel', 'cng', 'lng', 'hybrid', 'electric'].map(f => (
                      <option key={f} value={f}>{f.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Intake Date *</label>
                  <input {...register('intake_date')} type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Agency *</label>
                  <select {...register('agency_id')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">Select agency...</option>
                    {agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                  {errors.agency_id && <p className="text-red-500 text-xs mt-1">{errors.agency_id.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Location *</label>
                  <select {...register('location_id')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">Select location...</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name} — {l.city}</option>)}
                  </select>
                  {errors.location_id && <p className="text-red-500 text-xs mt-1">{errors.location_id.message}</p>}
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Contract (optional)</label>
                  <select {...register('contract_id')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">None</option>
                    {contracts.map(c => <option key={c.id} value={c.id}>{c.contract_number} — {c.title}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Target Completion</label>
                  <input {...register('target_completion')} type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); reset(); setError(null) }}
                  className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isPending ? 'Adding...' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
