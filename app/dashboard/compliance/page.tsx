import { Shield } from 'lucide-react'
import { demoComplianceDocs, demoAgencies, demoContracts } from '@/lib/demo-data'

const docStatusColors: Record<string, string> = {
  complete: 'bg-green-100 text-green-800',
  signed: 'bg-green-100 text-green-800',
  submitted: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-amber-100 text-amber-800',
  pending_signature: 'bg-purple-100 text-purple-800',
  not_started: 'bg-gray-100 text-gray-600',
  draft: 'bg-gray-100 text-gray-700',
  rejected: 'bg-red-100 text-red-800',
}

const tabs = ['All Docs', 'Buy America', 'ADA', 'CARB', 'DBE']

export default async function CompliancePage() {
  const agencyMap = new Map(demoAgencies.map(a => [a.id, a.name]))
  const contractMap = new Map(demoContracts.map(c => [c.id, c.contractNumber]))

  const buyAmericaDocs = demoComplianceDocs.filter(d => d.docType.toLowerCase().includes('buy america'))
  const adaDocs = demoComplianceDocs.filter(d => d.docType.toLowerCase().includes('ada'))
  const carbDocs = demoComplianceDocs.filter(d => d.docType.toLowerCase().includes('carb'))

  const docsByType = {
    'All Docs': demoComplianceDocs,
    'Buy America': buyAmericaDocs,
    'ADA': adaDocs,
    'CARB': carbDocs,
    'DBE': [],
  }

  const completeCount = demoComplianceDocs.filter(d => d.status === 'signed' || d.status === 'complete').length
  const pendingCount = demoComplianceDocs.filter(d => d.status === 'in_progress' || d.status === 'pending_signature').length
  const notStartedCount = demoComplianceDocs.filter(d => d.status === 'not_started').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Compliance Documents</h1>
          <p className="text-gray-500 text-sm">FTA documentation tracking for all active contracts</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/ccw/compliance" target="_blank" className="text-sm text-[#003087] hover:underline font-medium">
            View Public Compliance Page →
          </a>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-700">{completeCount}</div>
          <div className="text-sm text-green-600">Complete / Signed</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-amber-700">{pendingCount}</div>
          <div className="text-sm text-amber-600">In Progress / Pending</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-700">{notStartedCount}</div>
          <div className="text-sm text-gray-600">Not Started</div>
        </div>
      </div>

      {/* Compliance categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Buy America', icon: '🇺🇸', citation: '49 USC 5323(j)', status: 'compliant' },
          { label: 'ADA Compliance', icon: '♿', citation: '49 CFR Parts 37/38', status: 'compliant' },
          { label: 'CARB Certified', icon: '🌿', citation: 'ICT + L9N', status: 'certified' },
          { label: 'DBE Program', icon: '🤝', citation: '49 CFR 26.49', status: 'active' },
        ].map(cat => (
          <div key={cat.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-2xl mb-2">{cat.icon}</div>
            <div className="font-bold text-gray-900 text-sm mb-1">{cat.label}</div>
            <div className="text-xs text-gray-400 mb-3">{cat.citation}</div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-bold text-green-700 capitalize">{cat.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Document table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#003087]" />
          <h2 className="font-bold text-gray-900">Active Compliance Documents</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bus / VIN</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Document Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {demoComplianceDocs.map(doc => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs font-bold text-[#003087]">{doc.vin}</td>
                <td className="px-4 py-3 text-gray-600">{doc.agencyName}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">{doc.docType}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${docStatusColors[doc.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {doc.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SAM.gov registration alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="text-2xl">🏛️</div>
          <div>
            <div className="font-bold text-blue-900 mb-1">SAM.gov Registration</div>
            <div className="text-sm text-blue-700 mb-3">
              UEI: QN7UN15K9NP2 · CAGE: 1QA89 · Expires: August 25, 2026
              <span className="ml-2 bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">161 days remaining</span>
            </div>
            <a href="https://sam.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 font-bold hover:underline">
              Renew at sam.gov →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
