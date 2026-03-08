import { demoTechnicians } from '@/lib/demo-data'
import { Users, AlertTriangle, Award } from 'lucide-react'

export default function TechniciansPage() {
  const expiring = demoTechnicians.filter(t => t.certExpiry)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Technicians</h1>
        <p className="text-gray-500 text-sm">{demoTechnicians.length} technicians · {expiring.length} certification expiring</p>
      </div>

      {expiring.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-amber-800 text-sm">Certification Expiring Soon</span>
          </div>
          {expiring.map(t => (
            <div key={t.id} className="text-xs text-amber-700">{t.name} — cert expires {t.certExpiry}</div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoTechnicians.map(tech => (
          <div key={tech.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-bold text-[#003087]">{tech.name}</div>
                <div className="text-gray-500 text-xs mt-0.5">{tech.locationName} · {tech.yearsExp} yrs exp</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">{tech.activeWOs}</div>
                <div className="text-xs text-gray-400">active WOs</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tech.certs.map(cert => (
                <span key={cert} className="inline-flex items-center gap-1 text-xs bg-[#003087]/10 text-[#003087] px-2 py-0.5 rounded-full">
                  <Award className="w-2.5 h-2.5" />{cert}
                </span>
              ))}
            </div>
            {tech.certExpiry && (
              <div className="mt-3 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                Cert expires: {tech.certExpiry}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
