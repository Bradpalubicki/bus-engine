import { demoLocations } from '@/lib/demo-data'
import { MapPin, Phone, AlertTriangle } from 'lucide-react'

export default function LocationsDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Locations</h1>
        <p className="text-gray-500 text-sm">10 facilities nationwide — real-time utilization and alert status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demoLocations.map(loc => (
          <div key={loc.id} className={`bg-white rounded-xl border shadow-sm p-5 ${loc.alerts > 0 ? 'border-amber-300' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#003087]">{loc.name}, {loc.state}</h3>
                  {loc.type === 'hq' && <span className="bg-[#E8A020] text-white text-xs font-bold px-2 py-0.5 rounded">HQ</span>}
                  {loc.type === 'satellite' && <span className="bg-[#003087] text-white text-xs font-bold px-2 py-0.5 rounded">SAT</span>}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{loc.address}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <Phone className="w-3 h-3" />{loc.phone}
                </div>
              </div>
              {loc.alerts > 0 && (
                <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                  <AlertTriangle className="w-3 h-3" />{loc.alerts} alerts
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F8F9FB] rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Active Work Orders</div>
                <div className="text-xl font-bold text-[#003087]">{loc.activeWOs}</div>
              </div>
              <div className="bg-[#F8F9FB] rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Utilization</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${loc.utilization >= 85 ? 'bg-green-500' : loc.utilization >= 65 ? 'bg-blue-500' : 'bg-gray-400'}`}
                      style={{ width: `${loc.utilization}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{loc.utilization}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
