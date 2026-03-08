import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Award, AlertTriangle } from 'lucide-react'
import { daysFromNow } from '@/lib/status-colors'
import type { Database } from '@/lib/database.types'

type Technician = Database['public']['Tables']['bus_technicians']['Row']
type Certification = Database['public']['Tables']['bus_certifications']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']
type WOAssignment = Database['public']['Tables']['bus_wo_assignments']['Row']
type WorkOrder = Database['public']['Tables']['bus_work_orders']['Row']

export default async function TechniciansPage() {
  const supabase = createClient()

  const [techsResult, certsResult, locationsResult, assignmentsResult, workOrdersResult] = await Promise.all([
    supabase.from('bus_technicians').select('*').eq('active', true).order('name'),
    supabase.from('bus_certifications').select('*'),
    supabase.from('bus_locations').select('*'),
    supabase.from('bus_wo_assignments').select('*'),
    supabase.from('bus_work_orders').select('id, status'),
  ])

  const techs = (techsResult.data ?? []) as Technician[]
  const certs = (certsResult.data ?? []) as Certification[]
  const locations = (locationsResult.data ?? []) as Location[]
  const assignments = (assignmentsResult.data ?? []) as WOAssignment[]
  const workOrders = (workOrdersResult.data ?? []) as Partial<WorkOrder>[]

  const locationMap = new Map(locations.map(l => [l.id, l]))
  const certsByTech = new Map<string, Certification[]>()
  for (const cert of certs) {
    if (!cert.technician_id) continue
    if (!certsByTech.has(cert.technician_id)) certsByTech.set(cert.technician_id, [])
    certsByTech.get(cert.technician_id)!.push(cert)
  }
  const woStatusMap = new Map(workOrders.map(w => [w.id!, w.status ?? '']))
  const assignmentsByTech = new Map<string, string[]>() // tech_id -> wo_ids
  for (const a of assignments) {
    if (!a.technician_id || !a.work_order_id) continue
    if (!assignmentsByTech.has(a.technician_id)) assignmentsByTech.set(a.technician_id, [])
    assignmentsByTech.get(a.technician_id)!.push(a.work_order_id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Technicians</h1>
        <p className="text-gray-500 text-sm">{techs.length} active technicians</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techs.map(tech => {
          const location = tech.location_id ? locationMap.get(tech.location_id) : null
          const techCerts = certsByTech.get(tech.id) ?? []
          const woIds = assignmentsByTech.get(tech.id) ?? []
          const activeWOs = woIds.filter(wid => !['complete', 'delivered'].includes(woStatusMap.get(wid) ?? '')).length
          const expiringCerts = techCerts.filter(c => c.expiry_date && daysFromNow(c.expiry_date) < 90 && daysFromNow(c.expiry_date) >= 0)
          const expiredCerts = techCerts.filter(c => c.expiry_date && daysFromNow(c.expiry_date) < 0)
          const initials = tech.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

          return (
            <Link key={tech.id} href={`/dashboard/technicians/${tech.id}`}>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#003087] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-800">{tech.name}</h2>
                    <div className="text-xs text-gray-500">{location?.name} — {location?.city}</div>
                    {tech.years_experience && <div className="text-xs text-gray-400">{tech.years_experience} yrs experience</div>}
                  </div>
                  {(expiredCerts.length > 0 || expiringCerts.length > 0) && (
                    <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${expiredCerts.length > 0 ? 'text-red-500' : 'text-amber-500'}`} />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-[#F8F9FB] rounded-lg p-3">
                    <div className="text-xs text-gray-500">Active WOs</div>
                    <div className="text-xl font-bold text-[#003087]">{activeWOs}</div>
                  </div>
                  <div className="bg-[#F8F9FB] rounded-lg p-3">
                    <div className="text-xs text-gray-500">Certifications</div>
                    <div className="text-xl font-bold text-[#003087]">{techCerts.length}</div>
                  </div>
                </div>

                {expiringCerts.length > 0 && (
                  <div className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {expiringCerts.length} cert{expiringCerts.length > 1 ? 's' : ''} expiring soon
                  </div>
                )}
                {expiredCerts.length > 0 && (
                  <div className="text-xs text-red-700 bg-red-50 rounded-lg px-3 py-2 flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {expiredCerts.length} expired certification{expiredCerts.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
