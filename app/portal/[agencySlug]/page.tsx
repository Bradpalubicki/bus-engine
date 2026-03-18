import { CheckCircle2, Clock, AlertTriangle, Truck, FileText, Phone } from 'lucide-react'
import {
  demoVehicles,
  demoContracts,
  demoComplianceDocs,
} from '@/lib/demo-data'

// Slug → agency info map
const AGENCY_MAP: Record<string, { name: string; shortName: string; contractId: string }> = {
  'sfmta':       { name: 'San Francisco Municipal Transportation Agency', shortName: 'SFMTA',             contractId: 'con-1' },
  'lbt':         { name: 'Long Beach Transit',                             shortName: 'Long Beach Transit', contractId: 'con-2' },
  'indygo':      { name: 'Indianapolis Public Transportation Corporation', shortName: 'IndyGo',            contractId: 'con-3' },
  'denver-rtd':  { name: 'Denver Regional Transportation District',        shortName: 'Denver RTD',        contractId: 'con-4' },
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  intake:       { label: 'Intake',       color: 'bg-gray-100 text-gray-600' },
  queued:       { label: 'Queued',       color: 'bg-blue-100 text-blue-700' },
  in_progress:  { label: 'In Progress',  color: 'bg-amber-100 text-amber-700' },
  qa_hold:      { label: 'QA Hold',      color: 'bg-orange-100 text-orange-700' },
  complete:     { label: 'Complete',     color: 'bg-green-100 text-green-700' },
  delivered:    { label: 'Delivered',    color: 'bg-[#003087] text-white' },
}

const DOC_STATUS_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  signed:             { label: 'Signed',             color: 'bg-green-100 text-green-700',   icon: '✅' },
  submitted:          { label: 'Submitted',           color: 'bg-blue-100 text-blue-700',     icon: '📤' },
  pending_signature:  { label: 'Pending Signature',  color: 'bg-amber-100 text-amber-700',   icon: '✍️' },
  in_progress:        { label: 'In Progress',         color: 'bg-blue-50 text-blue-600',      icon: '🔄' },
  not_started:        { label: 'Not Started',         color: 'bg-gray-100 text-gray-500',     icon: '⏳' },
}

// Demo inspection history (not stored in demo-data — hardcoded per agency for portal)
const DEMO_INSPECTIONS: Record<string, { date: string; vin: string; result: 'pass' | 'conditional' | 'fail'; inspector: string }[]> = {
  'sfmta': [
    { date: '2026-03-10', vin: 'CCW-001', result: 'pass',        inspector: 'Mike Reyes' },
    { date: '2026-03-05', vin: 'CCW-009', result: 'conditional', inspector: 'Sarah Kim' },
    { date: '2026-02-28', vin: 'CCW-002', result: 'pass',        inspector: 'Tom Bradley' },
  ],
  'lbt': [
    { date: '2026-03-08', vin: 'CCW-003', result: 'pass',        inspector: 'James Wilson' },
    { date: '2026-02-20', vin: 'CCW-008', result: 'conditional', inspector: 'James Wilson' },
  ],
  'indygo': [
    { date: '2026-03-01', vin: 'CCW-004', result: 'pass',        inspector: 'Carlos Mendez' },
    { date: '2026-02-12', vin: 'CCW-005', result: 'pass',        inspector: 'Mike Reyes' },
    { date: '2026-01-20', vin: 'CCW-010', result: 'pass',        inspector: 'Carlos Mendez' },
  ],
  'denver-rtd': [
    { date: '2026-03-06', vin: 'CCW-007', result: 'pass', inspector: 'Lisa Park' },
  ],
}

function ResultBadge({ result }: { result: 'pass' | 'conditional' | 'fail' }) {
  const map = {
    pass:        'bg-green-100 text-green-700',
    conditional: 'bg-amber-100 text-amber-700',
    fail:        'bg-red-100 text-red-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${map[result]}`}>
      {result}
    </span>
  )
}

export default function AgencyPortalPage({
  params,
}: {
  params: { agencySlug: string }
}) {
  const { agencySlug } = params
  const agency = AGENCY_MAP[agencySlug]

  if (!agency) {
    return (
      <div className="text-center py-24">
        <div className="text-5xl mb-4">🚌</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Portal not found</h1>
        <p className="text-gray-500 mb-6">
          We couldn&apos;t find a portal for <strong>{agencySlug}</strong>.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#003087] text-white px-5 py-3 rounded-lg text-sm font-semibold">
          <Phone className="w-4 h-4" />
          Contact CCW: (951) 684-9585
        </div>
      </div>
    )
  }

  const agencyVehicles = demoVehicles.filter(v => v.contractId === agency.contractId)
  const contract = demoContracts.find(c => c.id === agency.contractId)
  const agencyDocs = demoComplianceDocs.filter(d => d.contractId === agency.contractId)
  const inspections = DEMO_INSPECTIONS[agencySlug] ?? []

  const milestonesCompleted = contract?.milestones.filter(m => m.completedAt).length ?? 0
  const milestonesTotal = contract?.milestones.length ?? 0

  return (
    <div className="space-y-8">
      {/* Agency header */}
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{agency.shortName} — Rebuild Portal</div>
        <h1 className="text-2xl font-bold text-[#003087]">{agency.name}</h1>
        {contract && (
          <p className="text-gray-500 text-sm mt-1">
            Contract {contract.contractNumber} — {contract.title}
          </p>
        )}
      </div>

      {/* Active Buses */}
      <section>
        <h2 className="text-lg font-bold text-[#003087] mb-3 flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Active Buses ({agencyVehicles.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agencyVehicles.map(v => {
            const statusInfo = STATUS_LABELS[v.status] ?? { label: v.status, color: 'bg-gray-100 text-gray-600' }
            return (
              <div key={v.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-[#003087] font-mono text-sm">{v.vin}</div>
                    <div className="text-sm text-gray-700 mt-0.5">{v.year} {v.make} {v.model}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-500 mt-3 border-t border-gray-50 pt-3">
                  <div className="flex justify-between">
                    <span>Days in shop</span>
                    <span className="font-semibold text-gray-700">{v.daysInShop}d</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target delivery</span>
                    <span className="font-semibold text-gray-700">{v.targetCompletion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel type</span>
                    <span className="font-semibold text-gray-700 capitalize">{v.fuelType}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Recent Inspections */}
      {inspections.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-[#003087] mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Recent Inspections
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FB] border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Result</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Inspector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inspections.slice(0, 3).map((insp, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">{insp.date}</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#003087] text-xs">{insp.vin}</td>
                    <td className="px-4 py-3"><ResultBadge result={insp.result} /></td>
                    <td className="px-4 py-3 text-gray-600">{insp.inspector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Contract Progress */}
      {contract && (
        <section>
          <h2 className="text-lg font-bold text-[#003087] mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Contract Progress
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">{contract.title}</span>
              <span className="text-sm font-bold text-[#003087]">{contract.percentComplete}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-[#003087] h-3 rounded-full transition-all"
                style={{ width: `${contract.percentComplete}%` }}
              />
            </div>
            <div className="space-y-2">
              {contract.milestones.map(m => (
                <div key={m.id} className="flex items-center gap-3 text-sm">
                  {m.completedAt ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  )}
                  <span className={m.completedAt ? 'text-gray-700' : 'text-gray-400'}>
                    {m.title}
                  </span>
                  {m.completedAt && (
                    <span className="ml-auto text-xs text-green-600 font-medium">
                      Completed {m.completedAt}
                    </span>
                  )}
                  {!m.completedAt && (
                    <span className="ml-auto text-xs text-gray-400">
                      Due {m.dueDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex gap-6">
              <span>Total buses: <strong className="text-gray-700">{contract.busCount}</strong></span>
              <span>Milestones: <strong className="text-gray-700">{milestonesCompleted}/{milestonesTotal} complete</strong></span>
              <span>Contract end: <strong className="text-gray-700">{contract.endDate}</strong></span>
            </div>
          </div>
        </section>
      )}

      {/* Compliance Docs */}
      {agencyDocs.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-[#003087] mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Compliance Documents
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FB] border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Document</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {agencyDocs.map(doc => {
                  const ds = DOC_STATUS_LABELS[doc.status] ?? { label: doc.status, color: 'bg-gray-100 text-gray-500', icon: '—' }
                  return (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono font-bold text-[#003087] text-xs">{doc.vin}</td>
                      <td className="px-4 py-3 text-gray-700">{doc.docType}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ds.color}`}>
                          {ds.icon} {ds.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{doc.updatedAt ?? '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Attention notice */}
      {agencyVehicles.some(v => v.status === 'qa_hold') && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold text-amber-800 mb-0.5">QA Hold Notice</div>
            <div className="text-amber-700">
              {agencyVehicles.filter(v => v.status === 'qa_hold').map(v => v.vin).join(', ')}{' '}
              {agencyVehicles.filter(v => v.status === 'qa_hold').length === 1 ? 'is' : 'are'} currently
              on QA hold pending inspection sign-off. CCW will notify your team upon clearance.
            </div>
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="bg-[#003087] text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-bold text-lg">Questions about your rebuild?</div>
          <div className="text-blue-200 text-sm mt-0.5">Our project coordinators are available Monday–Friday, 7am–5pm PT</div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="font-bold text-xl">(951) 684-9585</div>
          <div className="text-blue-300 text-sm">info@completecoach.com</div>
        </div>
      </div>
    </div>
  )
}
