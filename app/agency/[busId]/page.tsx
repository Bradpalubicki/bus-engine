import { notFound } from 'next/navigation'
import StageProgressBar from '@/components/agency/StageProgressBar'

const stageNames = ['', 'Intake & Inspection', 'Teardown', 'Body & Structure', 'Mechanical', 'Electrical', 'Interior', 'Testing & QA', 'Delivery Prep']

interface BusDetail {
  id: number
  bus_id: string
  agency_name: string
  contract_number: string | null
  current_stage: number
  estimated_completion: string | null
  notes: string | null
  status: string
  stage_1_started_at?: string | null
  stage_1_completed_at?: string | null
  stage_2_started_at?: string | null
  stage_2_completed_at?: string | null
  stage_3_started_at?: string | null
  stage_3_completed_at?: string | null
  stage_4_started_at?: string | null
  stage_4_completed_at?: string | null
  stage_5_started_at?: string | null
  stage_5_completed_at?: string | null
  stage_6_started_at?: string | null
  stage_6_completed_at?: string | null
  stage_7_started_at?: string | null
  stage_7_completed_at?: string | null
  stage_8_started_at?: string | null
  stage_8_completed_at?: string | null
}

const demoBuses: Record<string, BusDetail> = {
  '1': { id: 1, bus_id: 'TRMT-2024-001', agency_name: 'TriMet', contract_number: 'CCW-2024-0847', current_stage: 5, estimated_completion: '2026-04-15', notes: 'ZEPS 504 kWh conversion. On schedule.', status: 'in_progress', stage_1_completed_at: '2026-01-10', stage_2_completed_at: '2026-01-25', stage_3_completed_at: '2026-02-10', stage_4_completed_at: '2026-02-28', stage_5_started_at: '2026-03-01' },
  '2': { id: 2, bus_id: 'TRMT-2024-002', agency_name: 'TriMet', contract_number: 'CCW-2024-0847', current_stage: 3, estimated_completion: '2026-05-01', notes: 'ZEPS 504 kWh conversion. Body work in progress.', status: 'in_progress', stage_1_completed_at: '2026-02-01', stage_2_completed_at: '2026-02-20', stage_3_started_at: '2026-02-21' },
  '3': { id: 3, bus_id: 'IDYG-2024-007', agency_name: 'IndyGo', contract_number: 'CCW-2024-0923', current_stage: 7, estimated_completion: '2026-03-28', notes: 'Midlife refurbishment. Testing phase.', status: 'in_progress', stage_1_completed_at: '2025-12-01', stage_2_completed_at: '2025-12-20', stage_3_completed_at: '2026-01-10', stage_4_completed_at: '2026-02-01', stage_5_completed_at: '2026-02-20', stage_6_completed_at: '2026-03-05', stage_7_started_at: '2026-03-06' },
  '4': { id: 4, bus_id: 'OCTA-2025-012', agency_name: 'OCTA', contract_number: 'CCW-2025-1001', current_stage: 1, estimated_completion: '2026-06-30', notes: 'New intake. CNG repower + ADA upgrade.', status: 'in_progress', stage_1_started_at: '2026-03-10' },
  '5': { id: 5, bus_id: 'FTHL-2024-003', agency_name: 'Foothill Transit', contract_number: 'CCW-2024-0756', current_stage: 8, estimated_completion: '2026-03-20', notes: 'Final delivery prep. Paperwork complete.', status: 'in_progress', stage_1_completed_at: '2025-11-01', stage_2_completed_at: '2025-11-20', stage_3_completed_at: '2025-12-10', stage_4_completed_at: '2026-01-05', stage_5_completed_at: '2026-01-25', stage_6_completed_at: '2026-02-15', stage_7_completed_at: '2026-03-05', stage_8_started_at: '2026-03-06' },
}

export default async function BusDetailPage({ params }: { params: Promise<{ busId: string }> }) {
  const { busId } = await params
  const bus = demoBuses[busId]
  if (!bus) notFound()

  const stages = Array.from({ length: 8 }, (_, i) => {
    const n = i + 1
    return {
      name: stageNames[n],
      startedAt: (bus as unknown as Record<string, string | null | undefined>)[`stage_${n}_started_at`],
      completedAt: (bus as unknown as Record<string, string | null | undefined>)[`stage_${n}_completed_at`],
    }
  })

  const activityFeed = stages
    .flatMap((s, i) => {
      const events = []
      if (s.startedAt) events.push({ date: s.startedAt, text: `Stage ${i+1} started: ${s.name}`, type: 'start' })
      if (s.completedAt) events.push({ date: s.completedAt, text: `Stage ${i+1} completed: ${s.name}`, type: 'complete' })
      return events
    })
    .filter(e => e.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())

  return (
    <div>
      {/* Back link */}
      <a href="/agency" className="text-sm text-[#003087] hover:underline mb-6 inline-block">← Back to Fleet</a>

      {/* Bus header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{bus.bus_id}</h1>
            <div className="text-gray-500">{bus.agency_name} · {bus.contract_number}</div>
          </div>
          <div className="flex items-center gap-4">
            {bus.estimated_completion && (
              <div className="text-right">
                <div className="text-xs text-gray-400">Estimated Delivery</div>
                <div className="font-bold text-gray-900">{new Date(bus.estimated_completion).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              </div>
            )}
            <div className="bg-[#003087] text-white px-4 py-2 rounded-lg font-bold text-sm">
              Stage {bus.current_stage}/8
            </div>
          </div>
        </div>
        <StageProgressBar currentStage={bus.current_stage} stages={stages} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity feed */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Activity Timeline</h2>
          {activityFeed.length > 0 ? (
            <div className="space-y-3">
              {activityFeed.map((event, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4">
                  <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${event.type === 'complete' ? 'bg-green-500' : 'bg-[#003087]'}`} />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{event.text}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(event.date!).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">
              Activity updates will appear here as work progresses.
            </div>
          )}
        </div>

        {/* Side info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Current Stage</h3>
            <div className="text-3xl font-bold text-[#003087] mb-1">{stageNames[bus.current_stage]}</div>
            <div className="text-sm text-gray-500">Stage {bus.current_stage} of 8</div>
          </div>
          {bus.notes && (
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <h3 className="font-bold text-blue-900 mb-2">Notes</h3>
              <p className="text-sm text-blue-700">{bus.notes}</p>
            </div>
          )}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-3">Need an Update?</h3>
            <p className="text-sm text-gray-500 mb-4">Contact your CCW project manager directly.</p>
            <a href="tel:9518265000" className="block w-full text-center bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
              Call (951) 826-5000
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
