'use client'

import { useState, useTransition } from 'react'
import { Plus, X, Search, LayoutGrid, List, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createWorkOrder } from '@/app/dashboard/work-orders/actions'
import { vehicleStatusColors, vehicleStatusLabel, daysAgo } from '@/lib/status-colors'
import type { Database } from '@/lib/database.types'

type WorkOrder = Database['public']['Tables']['bus_work_orders']['Row']
type Vehicle = Database['public']['Tables']['bus_vehicles']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']

const schema = z.object({
  vehicle_id: z.string().min(1, 'Vehicle required'),
  service_type: z.string().min(1, 'Service type required'),
  location_id: z.string().min(1, 'Location required'),
  target_date: z.string().optional(),
  notes: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const SERVICE_TYPES = [
  'Midlife Overhaul', 'CNG Repower', 'ZEPS Conversion',
  'Body & Paint', 'Interior Rehab', 'CNG Retanking', 'Other'
]

const columns = ['queued', 'in_progress', 'qa_hold', 'complete', 'delivered']

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
  const [view, setView] = useState<'kanban' | 'table'>('kanban')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const vehicleMap = new Map(vehicles.map(v => [v.id, v]))
  const locationMap = new Map(locations.map(l => [l.id, l]))
  const agencyMap = new Map(agencies.map(a => [a.id, a.name]))

  const filtered = workOrders.filter(wo => {
    const q = search.toLowerCase()
    const vehicle = wo.vehicle_id ? vehicleMap.get(wo.vehicle_id) : null
    const agencyName = vehicle?.agency_id ? agencyMap.get(vehicle.agency_id) ?? '' : ''
    const matchSearch = !q
      || (wo.wo_number ?? '').toLowerCase().includes(q)
      || (vehicle?.vin ?? '').toLowerCase().includes(q)
      || agencyName.toLowerCase().includes(q)
    const matchStatus = !filterStatus || wo.status === filterStatus
    return matchSearch && matchStatus
  })

  const onSubmit = (data: FormData) => {
    setError(null)
    startTransition(async () => {
      try {
        await createWorkOrder(data)
        reset()
        setShowModal(false)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to create work order')
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Work Orders</h1>
          <p className="text-gray-500 text-sm">{workOrders.length} work orders across all locations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('kanban')}
              className={`px-3 py-1.5 text-sm ${view === 'kanban' ? 'bg-[#003087] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 text-sm ${view === 'table' ? 'bg-[#003087] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004db3] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New WO
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search WO#, VIN, agency..."
            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">All Statuses</option>
          {columns.map(s => <option key={s} value={s}>{vehicleStatusLabel[s]}</option>)}
        </select>
      </div>

      {view === 'kanban' ? (
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-4">
            {columns.map(col => {
              const wos = filtered.filter(wo => wo.status === col)
              return (
                <div key={col} className="w-64 flex-shrink-0">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-t-lg border-b-2 mb-3 ${vehicleStatusColors[col]}`}>
                    <span className="text-xs font-bold uppercase tracking-wide">{vehicleStatusLabel[col]}</span>
                    <span className="text-xs bg-white/40 px-1.5 py-0.5 rounded-full font-bold">{wos.length}</span>
                  </div>
                  <div className="space-y-3">
                    {wos.length === 0 ? (
                      <div className="text-center py-8 text-gray-300 text-sm border-2 border-dashed rounded-xl">Empty</div>
                    ) : wos.map(wo => {
                      const vehicle = wo.vehicle_id ? vehicleMap.get(wo.vehicle_id) : null
                      const loc = wo.location_id ? locationMap.get(wo.location_id) : null
                      const agencyName = vehicle?.agency_id ? agencyMap.get(vehicle.agency_id) ?? '—' : '—'
                      return (
                        <Link key={wo.id} href={`/dashboard/work-orders/${wo.id}`}>
                          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono font-bold text-[#003087]">{wo.wo_number}</span>
                              <span className="text-xs text-gray-400">{daysAgo(wo.opened_at)}d</span>
                            </div>
                            <div className="font-semibold text-sm text-gray-800 mb-1">{vehicle?.vin ?? '—'}</div>
                            <div className="text-xs text-gray-500 mb-2">{wo.service_type}</div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500">{agencyName}</div>
                              {loc && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin className="w-3 h-3" />{loc.name}
                                </div>
                              )}
                              {wo.target_date && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Calendar className="w-3 h-3" />Target: {new Date(wo.target_date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F9FB] border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">WO #</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">VIN</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Agency</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Service Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Days Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(wo => {
                const vehicle = wo.vehicle_id ? vehicleMap.get(wo.vehicle_id) : null
                const loc = wo.location_id ? locationMap.get(wo.location_id) : null
                const agencyName = vehicle?.agency_id ? agencyMap.get(vehicle.agency_id) ?? '—' : '—'
                return (
                  <tr key={wo.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/work-orders/${wo.id}`} className="font-mono text-xs font-bold text-[#003087] hover:underline">
                        {wo.wo_number}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">{vehicle?.vin ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{agencyName}</td>
                    <td className="px-4 py-3 text-gray-600">{wo.service_type ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{loc?.name ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${vehicleStatusColors[wo.status ?? 'queued']}`}>
                        {vehicleStatusLabel[wo.status ?? 'queued']}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">{daysAgo(wo.opened_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-[#003087]">New Work Order</h2>
              <button onClick={() => { setShowModal(false); reset(); setError(null) }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Vehicle (VIN) *</label>
                <select {...register('vehicle_id')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select vehicle...</option>
                  {vehicles.map(v => <option key={v.id} value={v.id}>{v.vin} — {v.year} {v.make} {v.model}</option>)}
                </select>
                {errors.vehicle_id && <p className="text-red-500 text-xs mt-1">{errors.vehicle_id.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Service Type *</label>
                <select {...register('service_type')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select service...</option>
                  {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service_type && <p className="text-red-500 text-xs mt-1">{errors.service_type.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Location *</label>
                <select {...register('location_id')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select location...</option>
                  {locations.map(l => <option key={l.id} value={l.id}>{l.name} — {l.city}</option>)}
                </select>
                {errors.location_id && <p className="text-red-500 text-xs mt-1">{errors.location_id.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Target Date</label>
                <input {...register('target_date')} type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Notes</label>
                <textarea {...register('notes')} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowModal(false); reset(); setError(null) }}
                  className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                  Cancel
                </button>
                <button type="submit" disabled={isPending}
                  className="flex-1 bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                  {isPending ? 'Creating...' : 'Create WO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
