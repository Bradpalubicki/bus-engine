import { createClient } from '@/lib/supabase/server'
import { Shield } from 'lucide-react'
import { markCCWSigned, markAgencySigned, updateDocStatus } from './actions'
import type { Database } from '@/lib/database.types'

type ComplianceDoc = Database['public']['Tables']['bus_compliance_docs']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']
type Contract = Database['public']['Tables']['bus_contracts']['Row']

const docStatusColors: Record<string, string> = {
  complete: 'bg-green-100 text-green-800',
  signed: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  draft: 'bg-gray-100 text-gray-700',
  rejected: 'bg-red-100 text-red-800',
}

export default async function CompliancePage() {
  const supabase = createClient()

  const [docsResult, contractsResult, agenciesResult, vehiclesResult] = await Promise.all([
    supabase.from('bus_compliance_docs').select('*').order('created_at', { ascending: false }),
    supabase.from('bus_contracts').select('id, contract_number, agency_id'),
    supabase.from('bus_agencies').select('id, name'),
    supabase.from('bus_vehicles').select('id, vin, make, model'),
  ])

  const docs = (docsResult.data ?? []) as ComplianceDoc[]
  const contracts = contractsResult.data ?? []
  const agencies = agenciesResult.data ?? []
  const vehicles = agenciesResult.data ?? []

  // Build lookup maps
  const agencyMap = new Map(agencies.map(a => [a.id, a.name]))
  const contractMap = new Map(contracts.map(c => [
    c.id,
    { contract_number: c.contract_number, agency_name: agencyMap.get(c.agency_id ?? '') ?? '—' }
  ]))
  const vehicleMap = new Map((vehiclesResult.data ?? []).map(v => [v.id, v]))

  const pending = docs.filter(d => !d.ccw_signed_at || !d.agency_signed_at).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Compliance</h1>
          <p className="text-gray-500 text-sm">{docs.length} documents · {pending} pending signatures</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
          <Shield className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-medium text-amber-800">{pending} docs need attention</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">VIN</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Agency / Contract</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Doc Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">CCW Signed</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Agency Signed</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {docs.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No compliance documents</td></tr>
            ) : docs.map(doc => {
              const vehicle = doc.vehicle_id ? vehicleMap.get(doc.vehicle_id) : null
              const contractInfo = doc.contract_id ? contractMap.get(doc.contract_id) : null
              return (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-mono text-xs font-bold text-[#003087]">{vehicle?.vin ?? '—'}</div>
                    <div className="text-xs text-gray-400">{vehicle?.make} {vehicle?.model}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-700">{contractInfo?.agency_name ?? '—'}</div>
                    <div className="text-xs text-gray-400">{contractInfo?.contract_number}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{doc.doc_type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${docStatusColors[doc.status ?? 'pending'] ?? 'bg-gray-100 text-gray-600'}`}>
                      {doc.status ?? 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {doc.ccw_signed_at ? (
                      <span className="text-green-600">✓ {new Date(doc.ccw_signed_at).toLocaleDateString()}</span>
                    ) : (
                      <form action={markCCWSigned.bind(null, doc.id)}>
                        <button type="submit" className="text-xs text-[#003087] hover:underline">Mark Signed</button>
                      </form>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {doc.agency_signed_at ? (
                      <span className="text-green-600">✓ {new Date(doc.agency_signed_at).toLocaleDateString()}</span>
                    ) : (
                      <form action={markAgencySigned.bind(null, doc.id)}>
                        <button type="submit" className="text-xs text-[#003087] hover:underline">Mark Signed</button>
                      </form>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {['pending', 'complete'].filter(s => s !== doc.status).map(s => (
                        <form key={s} action={updateDocStatus.bind(null, doc.id, s)}>
                          <button type="submit" className="text-xs text-gray-500 hover:text-[#003087] hover:underline">
                            → {s}
                          </button>
                        </form>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
