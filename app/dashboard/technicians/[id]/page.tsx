import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { vehicleStatusColors, vehicleStatusLabel } from '@/lib/status-colors'
import { TechDetailClient } from '@/components/dashboard/TechDetailClient'
import type { Database } from '@/lib/database.types'

type Certification = Database['public']['Tables']['bus_certifications']['Row']
type WorkOrder = Database['public']['Tables']['bus_work_orders']['Row']

export default async function TechDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const [techResult, certsResult, assignmentsResult] = await Promise.all([
    supabase.from('bus_technicians').select('*').eq('id', params.id).single(),
    supabase.from('bus_certifications').select('*').eq('technician_id', params.id),
    supabase.from('bus_wo_assignments').select('work_order_id').eq('technician_id', params.id),
  ])

  const tech = techResult.data
  if (!tech) notFound()

  const certs = (certsResult.data ?? []) as Certification[]
  const woIds = (assignmentsResult.data ?? []).map(a => a.work_order_id).filter(Boolean) as string[]

  let location = null
  let activeWOs: WorkOrder[] = []

  if (tech.location_id) {
    const { data } = await supabase.from('bus_locations').select('*').eq('id', tech.location_id).single()
    location = data
  }

  if (woIds.length > 0) {
    const { data } = await supabase.from('bus_work_orders').select('*').in('id', woIds).neq('status', 'complete').neq('status', 'delivered')
    activeWOs = (data ?? []) as WorkOrder[]
  }

  const initials = tech.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/technicians" className="text-gray-400 hover:text-[#003087] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="w-12 h-12 bg-[#003087] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">{tech.name}</h1>
          <p className="text-gray-500 text-sm">{location?.name} — {location?.city}, {location?.state}</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Years Experience', value: tech.years_experience ?? '—' },
          { label: 'Active WOs', value: activeWOs.length },
          { label: 'Certifications', value: certs.length },
          { label: 'Hire Date', value: tech.hire_date ? new Date(tech.hire_date).toLocaleDateString() : '—' },
        ].map(k => (
          <div key={String(k.label)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{k.label}</div>
            <div className="text-xl font-bold text-[#003087]">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#003087] mb-3">Contact</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          {[
            ['Email', tech.email],
            ['Phone', tech.phone],
          ].map(([l, v]) => (
            <div key={String(l)}>
              <dt className="text-xs text-gray-500">{l}</dt>
              <dd className="font-medium text-gray-800">{v ?? '—'}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#003087]">Certifications ({certs.length})</h2>
        </div>
        <TechDetailClient techId={params.id} certs={certs} />
      </div>

      {/* Active WOs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#003087] mb-4">Active Work Orders ({activeWOs.length})</h2>
        {activeWOs.length === 0 ? (
          <p className="text-gray-400 text-sm">No active work orders</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">WO #</th>
                <th className="text-left pb-2 font-medium">Service Type</th>
                <th className="text-left pb-2 font-medium">Status</th>
                <th className="text-left pb-2 font-medium">Opened</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activeWOs.map(wo => (
                <tr key={wo.id}>
                  <td className="py-2.5">
                    <Link href={`/dashboard/work-orders/${wo.id}`} className="font-mono text-xs font-bold text-[#003087] hover:underline">
                      {wo.wo_number}
                    </Link>
                  </td>
                  <td className="py-2.5 text-gray-700">{wo.service_type ?? '—'}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${vehicleStatusColors[wo.status ?? 'queued']}`}>
                      {vehicleStatusLabel[wo.status ?? 'queued']}
                    </span>
                  </td>
                  <td className="py-2.5 text-gray-500 text-xs">{wo.opened_at ? new Date(wo.opened_at).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
