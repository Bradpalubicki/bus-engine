import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { vehicleStatusColors, vehicleStatusLabel, fuelColors, formatMoney, daysAgo } from '@/lib/status-colors'
import { updateVehicleStatus } from '@/app/dashboard/fleet/actions'
import type { Database } from '@/lib/database.types'

type WorkOrder = Database['public']['Tables']['bus_work_orders']['Row']
type ComplianceDoc = Database['public']['Tables']['bus_compliance_docs']['Row']

export default async function FleetDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const [vehicleResult, workOrdersResult, complianceDocsResult] = await Promise.all([
    supabase.from('bus_vehicles').select('*').eq('id', params.id).single(),
    supabase.from('bus_work_orders').select('*').eq('vehicle_id', params.id).order('opened_at', { ascending: false }),
    supabase.from('bus_compliance_docs').select('*').eq('vehicle_id', params.id),
  ])

  const vehicle = vehicleResult.data
  if (!vehicle) notFound()

  const workOrders = (workOrdersResult.data ?? []) as WorkOrder[]
  const complianceDocs = (complianceDocsResult.data ?? []) as ComplianceDoc[]

  // Fetch related records separately
  const [agencyResult, contractResult, locationResult, locationsResult] = await Promise.all([
    vehicle.agency_id ? supabase.from('bus_agencies').select('*').eq('id', vehicle.agency_id).single() : Promise.resolve({ data: null }),
    vehicle.contract_id ? supabase.from('bus_contracts').select('*').eq('id', vehicle.contract_id).single() : Promise.resolve({ data: null }),
    vehicle.location_id ? supabase.from('bus_locations').select('*').eq('id', vehicle.location_id).single() : Promise.resolve({ data: null }),
    supabase.from('bus_locations').select('*'),
  ])

  const agency = agencyResult.data
  const contract = contractResult.data
  const location = locationResult.data
  const locationMap = new Map((locationsResult.data ?? []).map(l => [l.id, l.name]))

  const statuses = ['intake', 'queued', 'in_progress', 'qa_hold', 'complete', 'delivered']
  const currentStatusIdx = statuses.indexOf(vehicle.status ?? 'intake')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/fleet" className="text-gray-400 hover:text-[#003087] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#003087] font-mono">{vehicle.vin}</h1>
          <p className="text-gray-500 text-sm">{vehicle.year} {vehicle.make} {vehicle.model} · {agency?.name}</p>
        </div>
        <span className={`ml-auto text-xs px-3 py-1.5 rounded-full font-semibold ${vehicleStatusColors[vehicle.status ?? 'intake']}`}>
          {vehicleStatusLabel[vehicle.status ?? 'intake']}
        </span>
      </div>

      {/* Status workflow */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">Status Workflow</h2>
        <div className="flex gap-2 overflow-x-auto">
          {statuses.map((s, idx) => {
            const isCurrent = idx === currentStatusIdx
            const isPast = idx < currentStatusIdx
            return (
              <form key={s} action={updateVehicleStatus.bind(null, params.id, s)}>
                <button
                  type="submit"
                  disabled={isCurrent}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    isCurrent
                      ? 'bg-[#003087] text-white border-[#003087] cursor-default'
                      : isPast
                      ? 'bg-[#E8A020] text-white border-[#E8A020] hover:opacity-80'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-[#003087] hover:text-[#003087]'
                  }`}
                >
                  {isPast ? '✓ ' : ''}{vehicleStatusLabel[s]}
                </button>
              </form>
            )
          })}
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-[#003087] mb-4">Vehicle Details</h2>
          <dl className="space-y-2 text-sm">
            {[
              ['VIN', vehicle.vin],
              ['Year', vehicle.year],
              ['Make', vehicle.make],
              ['Model', vehicle.model],
              ['Fuel', vehicle.fuel_type?.toUpperCase()],
              ['Length', vehicle.length_ft ? `${vehicle.length_ft} ft` : '—'],
              ['Days in Shop', daysAgo(vehicle.intake_date)],
              ['Target Completion', vehicle.target_completion ?? '—'],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex justify-between">
                <dt className="text-gray-500">{label}</dt>
                <dd className="font-medium text-gray-800">{value ?? '—'}</dd>
              </div>
            ))}
            {vehicle.fuel_type && (
              <div className="pt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${fuelColors[vehicle.fuel_type] ?? 'bg-gray-100 text-gray-600'}`}>
                  {vehicle.fuel_type.toUpperCase()}
                </span>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-[#003087] mb-4">Agency</h2>
          <dl className="space-y-2 text-sm">
            {[
              ['Name', agency?.name],
              ['Contact', agency?.contact_name],
              ['Email', agency?.contact_email],
              ['Phone', agency?.contact_phone],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex justify-between">
                <dt className="text-gray-500">{label}</dt>
                <dd className="font-medium text-gray-800">{value ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-[#003087] mb-4">Contract & Location</h2>
          <dl className="space-y-2 text-sm">
            {[
              ['Contract #', contract?.contract_number],
              ['Contract Title', contract?.title],
              ['Contract Value', contract?.value ? formatMoney(contract.value) : '—'],
              ['Location', location?.name],
              ['City', location?.city],
              ['State', location?.state],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex justify-between">
                <dt className="text-gray-500">{label}</dt>
                <dd className="font-medium text-gray-800">{value ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Work Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#003087] mb-4">Work Orders</h2>
        {workOrders.length === 0 ? (
          <p className="text-gray-400 text-sm">No work orders for this vehicle</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">WO #</th>
                <th className="text-left pb-2 font-medium">Service Type</th>
                <th className="text-left pb-2 font-medium">Location</th>
                <th className="text-left pb-2 font-medium">Opened</th>
                <th className="text-left pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {workOrders.map(wo => (
                <tr key={wo.id} className="hover:bg-gray-50">
                  <td className="py-2.5">
                    <Link href={`/dashboard/work-orders/${wo.id}`} className="font-mono text-xs font-bold text-[#003087] hover:underline">
                      {wo.wo_number}
                    </Link>
                  </td>
                  <td className="py-2.5 text-gray-700">{wo.service_type ?? '—'}</td>
                  <td className="py-2.5 text-gray-600">{wo.location_id ? locationMap.get(wo.location_id) ?? '—' : '—'}</td>
                  <td className="py-2.5 text-gray-500 text-xs">{wo.opened_at ? new Date(wo.opened_at).toLocaleDateString() : '—'}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${vehicleStatusColors[wo.status ?? 'queued']}`}>
                      {vehicleStatusLabel[wo.status ?? 'queued']}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Compliance Docs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#003087] mb-4">Compliance Documents</h2>
        {complianceDocs.length === 0 ? (
          <p className="text-gray-400 text-sm">No compliance documents on file</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Doc Type</th>
                <th className="text-left pb-2 font-medium">Status</th>
                <th className="text-left pb-2 font-medium">CCW Signed</th>
                <th className="text-left pb-2 font-medium">Agency Signed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {complianceDocs.map(doc => (
                <tr key={doc.id}>
                  <td className="py-2.5 text-gray-700">{doc.doc_type}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${doc.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {doc.status ?? 'pending'}
                    </span>
                  </td>
                  <td className="py-2.5 text-gray-500 text-xs">{doc.ccw_signed_at ? new Date(doc.ccw_signed_at).toLocaleDateString() : '—'}</td>
                  <td className="py-2.5 text-gray-500 text-xs">{doc.agency_signed_at ? new Date(doc.agency_signed_at).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
