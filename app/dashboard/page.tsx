import { createClient } from '@/lib/supabase/server'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { ThroughputChart } from '@/components/dashboard/ThroughputChart'
import {
  AlertTriangle, Bus, DollarSign, TrendingUp,
  Package, FileText, CheckCircle, Truck, Award,
  BarChart2, MapPin,
} from 'lucide-react'
import { vehicleStatusColors, vehicleStatusLabel, formatMoney, daysFromNow } from '@/lib/status-colors'
import type { Database } from '@/lib/database.types'

type Contract = Database['public']['Tables']['bus_contracts']['Row']
type Vehicle = Database['public']['Tables']['bus_vehicles']['Row']
type WorkOrder = Database['public']['Tables']['bus_work_orders']['Row']
type InsurancePolicy = Database['public']['Tables']['bus_insurance_policies']['Row']
type Inventory = Database['public']['Tables']['bus_inventory']['Row']
type Invoice = Database['public']['Tables']['bus_invoices']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']
type ActivityLog = Database['public']['Tables']['bus_activity_log']['Row']
type Part = Database['public']['Tables']['bus_parts']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']

function ActivityIcon({ type }: { type: string }) {
  const icons: Record<string, typeof Truck> = {
    delivery: Truck, invoice: DollarSign, wo_complete: CheckCircle,
    qa_hold: AlertTriangle, contract: FileText, parts: Package,
    rfp: TrendingUp, tech: Award,
  }
  const Icon = icons[type] || FileText
  return <Icon className="w-4 h-4" />
}

export default async function DashboardPage() {
  const supabase = createClient()

  const today = new Date().toISOString().split('T')[0]
  const in90Days = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const [
    contractsResult,
    vehiclesResult,
    workOrdersResult,
    insurancePoliciesResult,
    inventoryAllResult,
    overdueInvoicesResult,
    pipelineResult,
    activityLogResult,
    locationsResult,
    agenciesResult,
    partsResult,
  ] = await Promise.all([
    supabase.from('bus_contracts').select('*').order('created_at', { ascending: false }),
    supabase.from('bus_vehicles').select('id, status, intake_date, agency_id, location_id'),
    supabase.from('bus_work_orders').select('*').neq('status', 'delivered').order('opened_at', { ascending: false }),
    supabase.from('bus_insurance_policies').select('*').lt('expiry_date', in90Days).gt('expiry_date', today),
    supabase.from('bus_inventory').select('*'),
    supabase.from('bus_invoices').select('*').eq('status', 'overdue'),
    supabase.from('bus_rfp_pipeline').select('est_value, status').neq('status', 'lost'),
    supabase.from('bus_activity_log').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('bus_locations').select('*').eq('active', true).order('type'),
    supabase.from('bus_agencies').select('*'),
    supabase.from('bus_parts').select('*'),
  ])

  const contracts = (contractsResult.data ?? []) as Contract[]
  const vehicles = (vehiclesResult.data ?? []) as Partial<Vehicle>[]
  const workOrders = (workOrdersResult.data ?? []) as WorkOrder[]
  const insurancePolicies = (insurancePoliciesResult.data ?? []) as InsurancePolicy[]
  const inventoryAll = (inventoryAllResult.data ?? []) as Inventory[]
  const overdueInvoices = (overdueInvoicesResult.data ?? []) as Invoice[]
  const pipeline = pipelineResult.data ?? []
  const activityLog = (activityLogResult.data ?? []) as ActivityLog[]
  const locations = (locationsResult.data ?? []) as Location[]
  const agencies = (agenciesResult.data ?? []) as Agency[]
  const parts = (partsResult.data ?? []) as Part[]

  const agencyMap = new Map(agencies.map(a => [a.id, a.name]))
  const contractMap = new Map(contracts.map(c => [c.id, c]))
  const partMap = new Map(parts.map(p => [p.id, p]))
  const locationMap = new Map(locations.map(l => [l.id, l]))

  const activeContracts = contracts.filter(c => c.status === 'active')
  const contractBacklog = activeContracts.reduce((s, c) => s + (c.value ?? 0), 0)
  const revenueMTD = activeContracts.reduce((s, c) => s + (c.revenue_recognized ?? 0), 0)
  const busesInProduction = vehicles.filter(v =>
    ['in_progress', 'qa_hold', 'intake', 'queued'].includes(v.status ?? '')
  ).length
  const openWOs = workOrders.length
  const pipelineValue = pipeline.filter(p => p.status !== 'lost').reduce((s, p) => s + (p.est_value ?? 0), 0)
  const lowStockParts = inventoryAll.filter(i => (i.quantity_on_hand ?? 0) <= (i.reorder_point ?? 5))

  const statusCounts: Record<string, number> = {}
  for (const v of vehicles) {
    const s = v.status ?? 'intake'
    statusCounts[s] = (statusCounts[s] ?? 0) + 1
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">CEO Command Center</h1>
        <p className="text-gray-500 text-sm mt-0.5">Complete Coach Works — National Operations Overview</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Contract Backlog', value: formatMoney(contractBacklog), sub: `${activeContracts.length} active contracts`, icon: FileText, color: 'text-[#003087]' },
          { label: 'Revenue MTD', value: formatMoney(revenueMTD), sub: 'Recognized this month', icon: BarChart2, color: 'text-green-600' },
          { label: 'Buses in Production', value: busesInProduction.toString(), sub: 'Across all locations', icon: Bus, color: 'text-[#003087]' },
          { label: 'Open Work Orders', value: openWOs.toString(), sub: 'Not yet delivered', icon: FileText, color: 'text-amber-600' },
          { label: 'Pipeline Value', value: formatMoney(pipelineValue), sub: 'Active bids', icon: TrendingUp, color: 'text-amber-600' },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Fleet status chips */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h2 className="font-semibold text-[#003087] mb-3 text-sm">Fleet Production Status</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <span key={status} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${vehicleStatusColors[status] ?? 'bg-gray-100 text-gray-600'}`}>
              <Bus className="w-3.5 h-3.5" />
              {count} {vehicleStatusLabel[status] ?? status}
            </span>
          ))}
        </div>
      </div>

      {/* Charts + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4">Revenue — Contract Summary</h2>
          <RevenueChart data={contracts.slice(0, 6).map(c => ({
            month: c.contract_number ?? c.title.slice(0, 8),
            earned: c.revenue_recognized ?? 0,
            invoiced: c.costs_incurred ?? 0,
            collected: Math.round((c.revenue_recognized ?? 0) * 0.85),
          }))} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Alerts ({insurancePolicies.length + lowStockParts.length + overdueInvoices.length})
          </h2>
          <div className="space-y-3">
            {insurancePolicies.map(ins => (
              <div key={ins.id} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-amber-800">{ins.policy_type}</div>
                  <div className="text-xs text-amber-600">Expires in {daysFromNow(ins.expiry_date!)} days · {ins.carrier}</div>
                </div>
              </div>
            ))}
            {overdueInvoices.map(inv => {
              const contract = inv.contract_id ? contractMap.get(inv.contract_id) : null
              const agencyName = contract?.agency_id ? agencyMap.get(contract.agency_id) ?? '—' : '—'
              return (
                <div key={inv.id} className="flex items-start gap-2 p-2.5 bg-red-50 rounded-lg border border-red-200">
                  <DollarSign className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-red-800">{inv.invoice_number} — Overdue</div>
                    <div className="text-xs text-red-600">{agencyName} · {formatMoney(inv.amount ?? 0)}</div>
                  </div>
                </div>
              )
            })}
            {lowStockParts.slice(0, 3).map(p => {
              const part = p.part_id ? partMap.get(p.part_id) : null
              return (
                <div key={p.id} className="flex items-start gap-2 p-2.5 bg-orange-50 rounded-lg border border-orange-200">
                  <Package className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-orange-800">{part?.part_number ?? '—'} — Low Stock</div>
                    <div className="text-xs text-orange-600">{p.quantity_on_hand} on hand · reorder at {p.reorder_point}</div>
                  </div>
                </div>
              )
            })}
            {insurancePolicies.length + lowStockParts.length + overdueInvoices.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-sm">
                <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-400" />
                All systems nominal
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Locations + Active WOs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Locations — Active WOs
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {locations.map(loc => {
              const activeWOCount = workOrders.filter(w =>
                w.location_id === loc.id && !['complete', 'delivered'].includes(w.status ?? '')
              ).length
              return (
                <div key={loc.id} className={`rounded-lg p-2.5 border ${activeWOCount > 5 ? 'border-amber-300 bg-amber-50' : 'border-gray-100 bg-[#F8F9FB]'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#003087]">{loc.name}</span>
                    {loc.type === 'hq' && <span className="text-xs bg-[#E8A020] text-white px-1 rounded">HQ</span>}
                  </div>
                  <div className="text-xs text-gray-500">{loc.city}, {loc.state}</div>
                  <div className="text-xs text-gray-500 mt-1">{activeWOCount} active WOs</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
            <Bus className="w-4 h-4" /> Active Work Orders
          </h2>
          <div className="space-y-2">
            {workOrders.slice(0, 8).map(wo => {
              const locName = wo.location_id ? locationMap.get(wo.location_id)?.name ?? '—' : '—'
              return (
                <div key={wo.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#003087]">{wo.wo_number}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {locName} · {wo.service_type}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${vehicleStatusColors[wo.status ?? 'queued']}`}>
                    {vehicleStatusLabel[wo.status ?? 'queued']}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Throughput + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4">WO Count by Status</h2>
          <ThroughputChart data={Object.entries(statusCounts).map(([status, count]) => ({
            month: vehicleStatusLabel[status] ?? status,
            buses: count,
          }))} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activityLog.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No recent activity logged</p>
            ) : activityLog.map(act => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#003087]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ActivityIcon type={act.event_type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700">{act.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {act.created_at ? new Date(act.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contracts summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-[#003087] mb-4">All Contracts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Contract #</th>
                <th className="text-left pb-2 font-medium">Agency</th>
                <th className="text-right pb-2 font-medium">Value</th>
                <th className="text-right pb-2 font-medium">% Complete</th>
                <th className="text-right pb-2 font-medium">Recognized</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contracts.map(c => {
                const pct = c.estimated_total_cost && c.estimated_total_cost > 0
                  ? Math.round((c.costs_incurred ?? 0) / c.estimated_total_cost * 100)
                  : 0
                const agencyName = c.agency_id ? agencyMap.get(c.agency_id) ?? '—' : '—'
                return (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="py-2.5 font-mono text-xs text-[#003087]">{c.contract_number}</td>
                    <td className="py-2.5 text-gray-700">{agencyName}</td>
                    <td className="py-2.5 text-right font-semibold">{formatMoney(c.value ?? 0)}</td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-[#003087] h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <span className="text-xs">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right text-green-700">{formatMoney(c.revenue_recognized ?? 0)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
