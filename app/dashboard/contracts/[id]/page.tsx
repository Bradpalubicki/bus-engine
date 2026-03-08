import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, CheckCircle, Clock } from 'lucide-react'
import { formatMoney, vehicleStatusColors, vehicleStatusLabel } from '@/lib/status-colors'
import type { Database } from '@/lib/database.types'

type Contract = Database['public']['Tables']['bus_contracts']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']
type Milestone = Database['public']['Tables']['bus_contract_milestones']['Row']
type Vehicle = Database['public']['Tables']['bus_vehicles']['Row']
type Invoice = Database['public']['Tables']['bus_invoices']['Row']

export default async function ContractDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const [contractResult, milestonesResult, vehiclesResult, invoicesResult] = await Promise.all([
    supabase.from('bus_contracts').select('*').eq('id', params.id).single(),
    supabase.from('bus_contract_milestones').select('*').eq('contract_id', params.id).order('due_date'),
    supabase.from('bus_vehicles').select('id, vin, make, model, year, status').eq('contract_id', params.id),
    supabase.from('bus_invoices').select('*').eq('contract_id', params.id).order('created_at', { ascending: false }),
  ])

  const contract = contractResult.data as Contract | null
  if (!contract) notFound()

  let agency: Agency | null = null
  if (contract.agency_id) {
    const { data } = await supabase.from('bus_agencies').select('*').eq('id', contract.agency_id).single()
    agency = data as Agency | null
  }

  const milestones = (milestonesResult.data ?? []) as Milestone[]
  const vehicles = (vehiclesResult.data ?? []) as Vehicle[]
  const invoices = (invoicesResult.data ?? []) as Invoice[]

  const pct = contract.estimated_total_cost && contract.estimated_total_cost > 0
    ? Math.round((contract.costs_incurred ?? 0) / contract.estimated_total_cost * 100)
    : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/contracts" className="text-gray-400 hover:text-[#003087] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="font-mono text-xs text-gray-400">{contract.contract_number}</div>
          <h1 className="text-2xl font-bold text-[#003087]">{contract.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Contract Value', value: formatMoney(contract.value ?? 0), color: 'text-[#003087]' },
          { label: 'Revenue Recognized', value: formatMoney(contract.revenue_recognized ?? 0), color: 'text-green-600' },
          { label: 'Costs Incurred', value: formatMoney(contract.costs_incurred ?? 0), color: 'text-red-600' },
          { label: '% Complete', value: `${pct}%`, color: 'text-amber-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{k.label}</div>
            <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[#003087]">Overall Progress</span>
          <span className="text-lg font-bold text-[#003087]">{pct}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4">
          <div className="bg-[#003087] h-4 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-[#003087] mb-4">Agency</h2>
          <dl className="space-y-2 text-sm">
            {[
              ['Name', agency?.name],
              ['Contact', agency?.contact_name],
              ['Email', agency?.contact_email],
              ['Phone', agency?.contact_phone],
            ].map(([l, v]) => (
              <div key={String(l)} className="flex justify-between">
                <dt className="text-gray-500">{l}</dt>
                <dd className="font-medium text-gray-800">{v ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-[#003087] mb-4">Contract Details</h2>
          <dl className="space-y-2 text-sm">
            {[
              ['Bus Count', contract.bus_count],
              ['Start', contract.start_date ? new Date(contract.start_date).toLocaleDateString() : '—'],
              ['End', contract.end_date ? new Date(contract.end_date).toLocaleDateString() : '—'],
              ['Status', contract.status],
              ['Est. Cost', formatMoney(contract.estimated_total_cost ?? 0)],
            ].map(([l, v]) => (
              <div key={String(l)} className="flex justify-between">
                <dt className="text-gray-500">{l}</dt>
                <dd className="font-medium text-gray-800">{String(v ?? '—')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#003087] mb-4">Milestones ({milestones.length})</h2>
        {milestones.length === 0 ? (
          <p className="text-gray-400 text-sm">No milestones defined</p>
        ) : (
          <div className="space-y-3">
            {milestones.map(m => (
              <div key={m.id} className={`flex items-center justify-between p-4 rounded-lg border ${m.completed_at ? 'bg-green-50 border-green-200' : 'bg-[#F8F9FB] border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  {m.completed_at ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> : <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                  <div>
                    <div className="text-sm font-medium text-gray-800">{m.title}</div>
                    <div className="text-xs text-gray-500">
                      {m.due_date && `Due: ${new Date(m.due_date).toLocaleDateString()}`}
                      {m.completed_at && ` · Completed: ${new Date(m.completed_at).toLocaleDateString()}`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {m.billing_amount && <div className="text-sm font-semibold text-[#003087]">{formatMoney(m.billing_amount)}</div>}
                  {m.weight_pct && <div className="text-xs text-gray-400">{m.weight_pct}% weight</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#003087] mb-4">Vehicles ({vehicles.length})</h2>
        {vehicles.length === 0 ? (
          <p className="text-gray-400 text-sm">No vehicles on this contract</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">VIN</th>
                <th className="text-left pb-2 font-medium">Vehicle</th>
                <th className="text-left pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vehicles.map(v => (
                <tr key={v.id}>
                  <td className="py-2 font-mono text-xs text-[#003087]">{v.vin}</td>
                  <td className="py-2 text-gray-700">{v.year} {v.make} {v.model}</td>
                  <td className="py-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${vehicleStatusColors[v.status ?? 'intake']}`}>
                      {vehicleStatusLabel[v.status ?? 'intake']}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#003087] mb-4">Invoices ({invoices.length})</h2>
        {invoices.length === 0 ? (
          <p className="text-gray-400 text-sm">No invoices on this contract</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Invoice #</th>
                <th className="text-right pb-2 font-medium">Amount</th>
                <th className="text-left pb-2 font-medium">Status</th>
                <th className="text-left pb-2 font-medium">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td className="py-2 font-mono text-xs">{inv.invoice_number}</td>
                  <td className="py-2 text-right font-semibold">{formatMoney(inv.amount ?? 0)}</td>
                  <td className="py-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === 'paid' ? 'bg-green-100 text-green-800' : inv.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                      {inv.status ?? '—'}
                    </span>
                  </td>
                  <td className="py-2 text-gray-500 text-xs">{inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
