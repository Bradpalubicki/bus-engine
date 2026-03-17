import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const stageNames = ['', 'Intake', 'Teardown', 'Body/Structure', 'Mechanical', 'Electrical', 'Interior', 'Testing', 'Delivery Prep']
const stageColors: Record<number, string> = {
  1: 'bg-gray-100 text-gray-700',
  2: 'bg-blue-100 text-blue-700',
  3: 'bg-purple-100 text-purple-700',
  4: 'bg-orange-100 text-orange-700',
  5: 'bg-yellow-100 text-yellow-700',
  6: 'bg-pink-100 text-pink-700',
  7: 'bg-indigo-100 text-indigo-700',
  8: 'bg-green-100 text-green-700',
}

interface BusStage {
  id: number
  bus_id: string
  agency_name: string
  contract_number: string | null
  current_stage: number
  estimated_completion: string | null
  status: string
}

async function getBuses(): Promise<BusStage[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data, error } = await supabase
      .from('bus_production_stages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) return getDemoBuses()
    return data as BusStage[]
  } catch {
    return getDemoBuses()
  }
}

function getDemoBuses(): BusStage[] {
  return [
    { id: 1, bus_id: 'TRMT-2024-001', agency_name: 'TriMet', contract_number: 'CCW-2024-0847', current_stage: 5, estimated_completion: '2026-04-15', status: 'in_progress' },
    { id: 2, bus_id: 'TRMT-2024-002', agency_name: 'TriMet', contract_number: 'CCW-2024-0847', current_stage: 3, estimated_completion: '2026-05-01', status: 'in_progress' },
    { id: 3, bus_id: 'IDYG-2024-007', agency_name: 'IndyGo', contract_number: 'CCW-2024-0923', current_stage: 7, estimated_completion: '2026-03-28', status: 'in_progress' },
    { id: 4, bus_id: 'OCTA-2025-012', agency_name: 'OCTA', contract_number: 'CCW-2025-1001', current_stage: 1, estimated_completion: '2026-06-30', status: 'in_progress' },
    { id: 5, bus_id: 'FTHL-2024-003', agency_name: 'Foothill Transit', contract_number: 'CCW-2024-0756', current_stage: 8, estimated_completion: '2026-03-20', status: 'in_progress' },
  ]
}

export default async function AgencyPortalPage() {
  const buses = await getBuses()
  const attentionNeeded = buses.filter(b => b.current_stage >= 7)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Fleet — Production Status</h1>
        <p className="text-gray-500">Real-time tracking of your buses through the CCW production process</p>
      </div>

      {attentionNeeded.length > 0 && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <div className="text-green-500 text-xl">✅</div>
          <div>
            <div className="font-bold text-green-800">{attentionNeeded.length} bus{attentionNeeded.length > 1 ? 'es' : ''} approaching delivery</div>
            <div className="text-sm text-green-600">Ready for final inspection and delivery coordination</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map(bus => (
          <Link key={bus.id} href={`/agency/${bus.id}`}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-[#003087]/30 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-bold text-gray-900 text-lg">{bus.bus_id}</div>
                  <div className="text-sm text-gray-500">{bus.agency_name}</div>
                  {bus.contract_number && <div className="text-xs text-gray-400 mt-1">Contract: {bus.contract_number}</div>}
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${stageColors[bus.current_stage] || 'bg-gray-100 text-gray-700'}`}>
                  Stage {bus.current_stage}: {stageNames[bus.current_stage]}
                </span>
              </div>
              {/* Mini progress bar */}
              <div className="flex gap-1 mb-3">
                {Array.from({length: 8}, (_, i) => (
                  <div key={i} className={`flex-1 h-2 rounded-full ${i < bus.current_stage ? 'bg-[#003087]' : 'bg-gray-100'}`} />
                ))}
              </div>
              <div className="text-xs text-gray-400">
                {bus.current_stage}/8 stages complete
                {bus.estimated_completion && ` · Est. ${new Date(bus.estimated_completion).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
