import { demoVehicles } from '@/lib/demo-data'
import { Bus } from 'lucide-react'

const statusColors: Record<string, string> = {
  intake: 'bg-gray-100 text-gray-700',
  queued: 'bg-gray-200 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  qa_hold: 'bg-amber-100 text-amber-800',
  complete: 'bg-green-100 text-green-800',
  delivered: 'bg-[#003087] text-white',
}

const statusLabel: Record<string, string> = {
  intake: 'Intake', queued: 'Queued', in_progress: 'In Progress',
  qa_hold: 'QA Hold', complete: 'Complete', delivered: 'Delivered',
}

const fuelColors: Record<string, string> = {
  diesel: 'bg-gray-100 text-gray-700',
  cng: 'bg-blue-100 text-blue-700',
  hybrid: 'bg-green-100 text-green-700',
  electric: 'bg-emerald-100 text-emerald-700',
}

export default function FleetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Fleet / Vehicles</h1>
          <p className="text-gray-500 text-sm">{demoVehicles.length} vehicles in system</p>
        </div>
        <button className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004db3] transition-colors flex items-center gap-2">
          <Bus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">VIN</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Vehicle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fuel</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Technician</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Days in Shop</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {demoVehicles.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs font-bold text-[#003087]">{v.vin}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">{v.year} {v.make} {v.model}</div>
                  <div className="text-xs text-gray-400">{v.lengthFt}ft</div>
                </td>
                <td className="px-4 py-3 text-gray-600">{v.agencyName}</td>
                <td className="px-4 py-3 text-gray-600">{v.locationId.replace('loc-', 'L')}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${fuelColors[v.fuelType] || 'bg-gray-100 text-gray-600'}`}>
                    {v.fuelType.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">{v.techAssigned || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[v.status]}`}>
                    {statusLabel[v.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-600">{v.daysInShop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
