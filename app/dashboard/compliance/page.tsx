import { demoComplianceDocs } from '@/lib/demo-data'
import { Shield, CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react'

const docStatusColors: Record<string, string> = {
  signed: 'bg-green-100 text-green-800',
  submitted: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  pending_signature: 'bg-amber-100 text-amber-800',
  not_started: 'bg-gray-100 text-gray-600',
}

const docStatusIcon: Record<string, typeof CheckCircle> = {
  signed: CheckCircle,
  submitted: FileText,
  in_progress: Clock,
  pending_signature: AlertTriangle,
  not_started: Clock,
}

export default function CompliancePage() {
  const complete = demoComplianceDocs.filter(d => d.status === 'signed').length
  const pending = demoComplianceDocs.filter(d => ['pending_signature', 'not_started'].includes(d.status)).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Compliance & Documentation</h1>
        <p className="text-gray-500 text-sm">FTA, Buy America, ADA, and CARB compliance tracking</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{complete}</div>
          <div className="text-xs text-gray-500 mt-1">Signed / Complete</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{demoComplianceDocs.filter(d => ['submitted', 'in_progress'].includes(d.status)).length}</div>
          <div className="text-xs text-gray-500 mt-1">In Progress</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{pending}</div>
          <div className="text-xs text-gray-500 mt-1">Action Required</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Agency</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Document</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {demoComplianceDocs.map(doc => {
              const StatusIcon = docStatusIcon[doc.status]
              return (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#003087]">{doc.vin}</td>
                  <td className="px-4 py-3 text-gray-600">{doc.agencyName}</td>
                  <td className="px-4 py-3 text-gray-700">{doc.docType}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${docStatusColors[doc.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      {doc.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{doc.updatedAt || '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
