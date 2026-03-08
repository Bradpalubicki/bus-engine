import { createClient } from '@/lib/supabase/server'
import { MapPin, Phone } from 'lucide-react'
import type { Database } from '@/lib/database.types'

type Location = Database['public']['Tables']['bus_locations']['Row']

const typeColors: Record<string, string> = {
  hq: 'bg-[#003087] text-white',
  satellite: 'bg-blue-100 text-blue-800',
  field: 'bg-gray-100 text-gray-700',
}

export default async function LocationsPage() {
  const supabase = createClient()

  const [locationsResult, workOrdersResult, vehiclesResult] = await Promise.all([
    supabase.from('bus_locations').select('*').eq('active', true).order('type'),
    supabase.from('bus_work_orders').select('id, location_id, status, vehicle_id'),
    supabase.from('bus_vehicles').select('id, vin, status, location_id'),
  ])

  const locations = (locationsResult.data ?? []) as Location[]
  const workOrders = workOrdersResult.data ?? []
  const vehicles = vehiclesResult.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Locations</h1>
        <p className="text-gray-500 text-sm">{locations.length} active facilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map(loc => {
          const locWOs = workOrders.filter(w => w.location_id === loc.id)
          const activeWOs = locWOs.filter(w => !['complete', 'delivered'].includes(w.status ?? ''))
          const locVehicles = vehicles.filter(v => v.location_id === loc.id)

          return (
            <div key={loc.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-bold text-[#003087]">{loc.name}</h2>
                  <div className="text-sm text-gray-500 mt-0.5">{loc.address}</div>
                  <div className="text-sm text-gray-500">{loc.city}, {loc.state}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[loc.type ?? 'field'] ?? 'bg-gray-100 text-gray-600'}`}>
                  {(loc.type ?? 'field').toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-[#F8F9FB] rounded-lg p-3">
                  <div className="text-xs text-gray-500">Active WOs</div>
                  <div className="text-xl font-bold text-[#003087]">{activeWOs.length}</div>
                </div>
                <div className="bg-[#F8F9FB] rounded-lg p-3">
                  <div className="text-xs text-gray-500">Vehicles</div>
                  <div className="text-xl font-bold text-[#003087]">{locVehicles.length}</div>
                </div>
              </div>

              {loc.phone && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone className="w-3.5 h-3.5" />
                  {loc.phone}
                </div>
              )}

              {activeWOs.length > 3 && (
                <div className="mt-3 flex items-center gap-1 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                  <MapPin className="w-3.5 h-3.5" />
                  High utilization — {activeWOs.length} active work orders
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
