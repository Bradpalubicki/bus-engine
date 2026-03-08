import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { formatMoney } from '@/lib/status-colors'
import type { Database } from '@/lib/database.types'

type Contract = Database['public']['Tables']['bus_contracts']['Row']

const contractStatusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  complete: 'bg-[#003087] text-white',
  pending: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default async function ContractsPage() {
  const supabase = createClient()

  const [contractsResult, agenciesResult, milestonesResult] = await Promise.all([
    supabase.from('bus_contracts').select('*').order('created_at', { ascending: false }),
    supabase.from('bus_agencies').select('*'),
    supabase.from('bus_contract_milestones').select('*'),
  ])

  const contracts = (contractsResult.data ?? []) as Contract[]
  const agencies = (agenciesResult.data ?? []) as { id: string; name: string }[]
  const agencyMap = new Map(agencies.map(a => [a.id, a.name]))
  const allMilestones = (milestonesResult.data ?? []) as { id: string; contract_id: string | null; completed_at: string | null }[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Contracts</h1>
        <p className="text-gray-500 text-sm">{contracts.length} government transit contracts</p>
      </div>

      <div className="space-y-4">
        {contracts.map(c => {
          const pct = c.estimated_total_cost && c.estimated_total_cost > 0
            ? Math.round((c.costs_incurred ?? 0) / c.estimated_total_cost * 100)
            : 0
          const milestones = allMilestones.filter(m => m.contract_id === c.id)
          const completedMilestones = milestones.filter(m => m.completed_at).length
          const agencyName = c.agency_id ? agencyMap.get(c.agency_id) ?? '—' : '—'

          return (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-mono text-xs text-gray-400 mb-1">{c.contract_number}</div>
                  <h2 className="text-lg font-bold text-[#003087]">{c.title}</h2>
                  <div className="text-gray-500 text-sm mt-1">
                    {agencyName} · {c.bus_count} buses
                    {c.start_date && c.end_date && ` · ${new Date(c.start_date).toLocaleDateString()} – ${new Date(c.end_date).toLocaleDateString()}`}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#003087]">{formatMoney(c.value ?? 0)}</div>
                    <div className="text-xs text-gray-400">contract value</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${contractStatusColors[c.status ?? 'pending'] ?? 'bg-gray-100 text-gray-600'}`}>
                    {c.status ?? 'pending'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">Completion ({completedMilestones}/{milestones.length} milestones)</span>
                  <span className="text-sm font-bold text-[#003087]">{pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-[#003087] h-3 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: 'Revenue Recognized', value: formatMoney(c.revenue_recognized ?? 0), color: 'text-green-700' },
                  { label: 'Costs Incurred', value: formatMoney(c.costs_incurred ?? 0), color: 'text-red-700' },
                  { label: 'Est. Total Cost', value: formatMoney(c.estimated_total_cost ?? 0), color: 'text-blue-700' },
                  { label: 'Remaining Value', value: formatMoney((c.value ?? 0) - (c.revenue_recognized ?? 0)), color: 'text-amber-700' },
                ].map(item => (
                  <div key={item.label} className="bg-[#F8F9FB] rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                    <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                {c.notes && <p className="text-xs text-gray-500 italic">{c.notes}</p>}
                <Link
                  href={`/dashboard/contracts/${c.id}`}
                  className="ml-auto text-xs text-[#003087] font-medium hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" /> View Details
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
