import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { vehicleStatusColors, vehicleStatusLabel, daysAgo } from '@/lib/status-colors'
import { WODetailClient } from '@/components/dashboard/WODetailClient'
import type { Database } from '@/lib/database.types'

type WorkOrder = Database['public']['Tables']['bus_work_orders']['Row']
type LineItem = Database['public']['Tables']['bus_wo_line_items']['Row']
type TimeLog = Database['public']['Tables']['bus_wo_time_logs']['Row']
type QACheckpoint = Database['public']['Tables']['bus_qa_checkpoints']['Row']
type WOAssignment = Database['public']['Tables']['bus_wo_assignments']['Row']
type Technician = Database['public']['Tables']['bus_technicians']['Row']

export default async function WODetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const [
    woResult,
    lineItemsResult,
    timeLogsResult,
    qaResult,
    assignmentsResult,
    allTechsResult,
  ] = await Promise.all([
    supabase.from('bus_work_orders').select('*').eq('id', params.id).single(),
    supabase.from('bus_wo_line_items').select('*').eq('work_order_id', params.id),
    supabase.from('bus_wo_time_logs').select('*').eq('work_order_id', params.id).order('log_date', { ascending: false }),
    supabase.from('bus_qa_checkpoints').select('*').eq('work_order_id', params.id),
    supabase.from('bus_wo_assignments').select('*').eq('work_order_id', params.id),
    supabase.from('bus_technicians').select('id, name').eq('active', true).order('name'),
  ])

  const wo = woResult.data as WorkOrder | null
  if (!wo) notFound()

  const lineItems = (lineItemsResult.data ?? []) as LineItem[]
  const timeLogs = (timeLogsResult.data ?? []) as TimeLog[]
  const qaCheckpoints = (qaResult.data ?? []) as QACheckpoint[]
  const assignments = (assignmentsResult.data ?? []) as WOAssignment[]
  const allTechs = (allTechsResult.data ?? []) as Partial<Technician>[]

  // Fetch related vehicle/location info
  const [vehicleResult, locationResult] = await Promise.all([
    wo.vehicle_id ? supabase.from('bus_vehicles').select('*').eq('id', wo.vehicle_id).single() : Promise.resolve({ data: null }),
    wo.location_id ? supabase.from('bus_locations').select('*').eq('id', wo.location_id).single() : Promise.resolve({ data: null }),
  ])
  const vehicle = vehicleResult.data
  const location = locationResult.data

  // Fetch agency for vehicle
  const agencyResult = vehicle?.agency_id
    ? await supabase.from('bus_agencies').select('name').eq('id', vehicle.agency_id).single()
    : { data: null }
  const agencyName = agencyResult.data?.name ?? '—'

  // Fetch tech names for assignments
  const assignedTechIds = assignments.map(a => a.technician_id).filter(Boolean) as string[]
  const assignedTechsResult = assignedTechIds.length > 0
    ? await supabase.from('bus_technicians').select('id, name').in('id', assignedTechIds)
    : { data: [] }
  const assignedTechs = assignedTechsResult.data ?? []
  const techMap = new Map(assignedTechs.map(t => [t.id, t.name]))

  const statuses = ['queued', 'in_progress', 'qa_hold', 'complete', 'delivered']
  const currentStatusIdx = statuses.indexOf(wo.status ?? 'queued')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/work-orders" className="text-gray-400 hover:text-[#003087] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#003087] font-mono">{wo.wo_number}</h1>
          <p className="text-gray-500 text-sm">
            {vehicle?.vin} · {agencyName} · {wo.service_type}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-gray-400">{daysAgo(wo.opened_at)} days open</span>
          <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${vehicleStatusColors[wo.status ?? 'queued']}`}>
            {vehicleStatusLabel[wo.status ?? 'queued']}
          </span>
        </div>
      </div>

      {/* Status workflow */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">Workflow Progress</h2>
        <div className="flex gap-2 overflow-x-auto">
          {statuses.map((s, idx) => {
            const isCurrent = idx === currentStatusIdx
            const isPast = idx < currentStatusIdx
            return (
              <div key={s} className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold border ${
                isCurrent ? 'bg-[#003087] text-white border-[#003087]'
                : isPast ? 'bg-[#E8A020] text-white border-[#E8A020]'
                : 'bg-white text-gray-400 border-gray-200'
              }`}>
                {isPast ? '✓ ' : ''}{vehicleStatusLabel[s]}
              </div>
            )
          })}
        </div>
      </div>

      {/* Overview row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Vehicle', `${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`],
          ['Agency', agencyName],
          ['Location', location ? `${location.name}, ${location.city}` : '—'],
          ['Target Date', wo.target_date ? new Date(wo.target_date).toLocaleDateString() : '—'],
        ].map(([label, value]) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="text-sm font-semibold text-gray-800">{value ?? '—'}</div>
          </div>
        ))}
      </div>

      <WODetailClient
        woId={wo.id}
        woStatus={wo.status}
        woNotes={wo.notes}
        lineItems={lineItems}
        timeLogs={timeLogs}
        qaCheckpoints={qaCheckpoints}
        assignments={assignments.map(a => ({
          id: a.id,
          technician_id: a.technician_id,
          name: a.technician_id ? techMap.get(a.technician_id) ?? null : null,
        }))}
        allTechs={allTechs.map(t => ({ id: t.id!, name: t.name! }))}
      />
    </div>
  )
}
