import { MapPin, Phone } from 'lucide-react'
import { demoLocations, demoWorkOrders, demoVehicles } from '@/lib/demo-data'

const typeColors: Record<string, string> = {
  hq: 'bg-[#003087] text-white',
  satellite: 'bg-blue-100 text-blue-800',
  field: 'bg-gray-100 text-gray-700',
}

export default async function LocationsPage() {
  const wosByLocation = new Map<string, typeof demoWorkOrders>()
  const vehiclesByLocation = new Map<string, typeof demoVehicles>()

  demoWorkOrders.forEach(wo => {
    const existing = wosByLocation.get(wo.locationId) ?? []
    wosByLocation.set(wo.locationId, [...existing, wo])
  })

  demoVehicles.forEach(v => {
    const existing = vehiclesByLocation.get(v.locationId) ?? []
    vehiclesByLocation.set(v.locationId, [...existing, v])
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Locations</h1>
        <p className="text-gray-500 text-sm">{demoLocations.length} active facilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {demoLocations.map(loc => {
          const wos = wosByLocation.get(loc.id) ?? []
          const vehicles = vehiclesByLocation.get(loc.id) ?? []
          const activeWOs = wos.filter(wo => !['complete', 'delivered'].includes(wo.status)).length
          const alertCount = loc.alerts ?? 0

          return (
            <div key={loc.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#F8F9FB] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#003087]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{loc.name}</h2>
                    <div className="text-xs text-gray-500">{loc.city}, {loc.state}</div>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${typeColors[loc.type] ?? 'bg-gray-100 text-gray-700'}`}>
                  {loc.type}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-[#F8F9FB] rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-[#003087]">{activeWOs}</div>
                  <div className="text-xs text-gray-500">Active WOs</div>
                </div>
                <div className="bg-[#F8F9FB] rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-[#003087]">{vehicles.length}</div>
                  <div className="text-xs text-gray-500">Vehicles</div>
                </div>
                <div className="bg-[#F8F9FB] rounded-lg p-3 text-center">
                  <div className={`text-xl font-bold ${loc.utilization > 90 ? 'text-red-600' : loc.utilization > 80 ? 'text-amber-600' : 'text-green-600'}`}>
                    {loc.utilization}%
                  </div>
                  <div className="text-xs text-gray-500">Utilization</div>
                </div>
              </div>

              {/* Utilization bar */}
              <div className="bg-gray-100 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full transition-all ${loc.utilization > 90 ? 'bg-red-500' : loc.utilization > 80 ? 'bg-amber-500' : 'bg-green-500'}`}
                  style={{ width: `${loc.utilization}%` }}
                />
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {loc.phone}
              </div>

              {alertCount > 0 && (
                <div className="mt-3 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                  ⚠️ {alertCount} alert{alertCount > 1 ? 's' : ''} — review required
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
