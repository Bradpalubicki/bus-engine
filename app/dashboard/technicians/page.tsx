import Link from 'next/link'
import { Award, AlertTriangle } from 'lucide-react'
import { daysFromNow } from '@/lib/status-colors'
import { demoTechnicians, demoLocations } from '@/lib/demo-data'

export default async function TechniciansPage() {
  const locationMap = new Map(demoLocations.map(l => [l.id, l]))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Technicians</h1>
        <p className="text-gray-500 text-sm">{demoTechnicians.length} active technicians</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoTechnicians.map(tech => {
          const location = locationMap.get(tech.locationId)
          const initials = tech.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
          const expiringCerts = tech.certExpiry ? [tech.certExpiry].filter(d => {
            const days = daysFromNow(d)
            return days >= 0 && days < 90
          }) : []
          const expiredCerts = tech.certExpiry ? [tech.certExpiry].filter(d => daysFromNow(d) < 0) : []

          return (
            <Link key={tech.id} href={`/dashboard/technicians/${tech.id}`}>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#003087] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-800">{tech.name}</h2>
                    {location && <div className="text-xs text-gray-500">{location.name} — {location.city}</div>}
                    <div className="text-xs text-gray-400">{tech.yearsExp} yrs experience</div>
                  </div>
                  {(expiredCerts.length > 0 || expiringCerts.length > 0) && (
                    <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${expiredCerts.length > 0 ? 'text-red-500' : 'text-amber-500'}`} />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-[#F8F9FB] rounded-lg p-3">
                    <div className="text-xs text-gray-500">Active WOs</div>
                    <div className="text-xl font-bold text-[#003087]">{tech.activeWOs}</div>
                  </div>
                  <div className="bg-[#F8F9FB] rounded-lg p-3">
                    <div className="text-xs text-gray-500">Certifications</div>
                    <div className="text-xl font-bold text-[#003087]">{tech.certs.length}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tech.certs.slice(0, 3).map(cert => (
                    <span key={cert} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{cert}</span>
                  ))}
                  {tech.certs.length > 3 && (
                    <span className="text-xs text-gray-400">+{tech.certs.length - 3} more</span>
                  )}
                </div>

                {expiringCerts.length > 0 && (
                  <div className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 flex items-center gap-1 mt-3">
                    <Award className="w-3.5 h-3.5" />
                    Cert expiring soon
                  </div>
                )}
                {expiredCerts.length > 0 && (
                  <div className="text-xs text-red-700 bg-red-50 rounded-lg px-3 py-2 flex items-center gap-1 mt-3">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Expired certification
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
