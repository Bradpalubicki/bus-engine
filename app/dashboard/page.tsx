import {
  demoDashboardKPIs,
  demoLocations,
  demoWorkOrders,
  demoInsurance,
  demoParts,
  demoInvoices,
  demoRecentActivity,
  demoContracts,
} from '@/lib/demo-data'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { ThroughputChart } from '@/components/dashboard/ThroughputChart'
import {
  AlertTriangle, Bus, DollarSign, TrendingUp,
  Clock, Package, FileText, CheckCircle, Truck, Award,
  BarChart2, MapPin
} from 'lucide-react'

function formatM(v: number) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`
  return `$${v}`
}

const statusColors: Record<string, string> = {
  intake: 'bg-gray-100 text-gray-700',
  queued: 'bg-gray-200 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  qa_hold: 'bg-amber-100 text-amber-800',
  complete: 'bg-green-100 text-green-800',
  delivered: 'bg-[#003087] text-white',
}

const statusLabel: Record<string, string> = {
  intake: 'Intake',
  queued: 'Queued',
  in_progress: 'In Progress',
  qa_hold: 'QA Hold',
  complete: 'Complete',
  delivered: 'Delivered',
}

function ActivityIcon({ type }: { type: string }) {
  const icons: Record<string, typeof Truck> = {
    delivery: Truck,
    invoice: DollarSign,
    wo_complete: CheckCircle,
    qa_hold: AlertTriangle,
    contract: FileText,
    parts: Package,
    rfp: TrendingUp,
    tech: Award,
  }
  const Icon = icons[type] || FileText
  return <Icon className="w-4 h-4" />
}

export default function DashboardPage() {
  const kpi = demoDashboardKPIs
  const lowStockParts = demoParts.filter(p => p.status === 'low_stock')
  const expiringInsurance = demoInsurance.filter(i => i.daysUntilExpiry < 60)
  const overdueInvoices = demoInvoices.filter(i => i.status === 'overdue')

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">CEO Command Center</h1>
        <p className="text-gray-500 text-sm mt-0.5">Complete Coach Works — National Operations Overview</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Contract Backlog', value: formatM(kpi.contractBacklog), sub: '4 active contracts', icon: FileText, color: 'text-[#003087]' },
          { label: 'Revenue MTD', value: formatM(kpi.earnedRevenueMTD), sub: `Plan: ${formatM(kpi.earnedRevenuePlan)}`, icon: BarChart2, color: 'text-green-600' },
          { label: 'Cash Position', value: formatM(kpi.cashPosition), sub: `DSO: ${kpi.dso} days`, icon: DollarSign, color: 'text-blue-600' },
          { label: 'Buses in Production', value: kpi.busesInProduction.toString(), sub: 'Across all locations', icon: Bus, color: 'text-[#003087]' },
          { label: 'Pipeline Value', value: formatM(kpi.pipelineValue), sub: `${kpi.activeBids} active bids`, icon: TrendingUp, color: 'text-amber-600' },
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

      {/* Bus status chips */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h2 className="font-semibold text-[#003087] mb-3 text-sm">Fleet Production Status</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(kpi.busesByStatus).map(([status, count]) => (
            <span key={status} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${statusColors[status]}`}>
              <Bus className="w-3.5 h-3.5" />
              {count} {statusLabel[status]}
            </span>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4">Revenue — 6 Month Trend</h2>
          <RevenueChart />
        </div>

        {/* Alerts panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Alerts ({expiringInsurance.length + lowStockParts.length + overdueInvoices.length})
          </h2>
          <div className="space-y-3">
            {expiringInsurance.map(ins => (
              <div key={ins.id} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-amber-800">{ins.policyType}</div>
                  <div className="text-xs text-amber-600">Expires in {ins.daysUntilExpiry} days · {ins.carrier}</div>
                </div>
              </div>
            ))}
            {overdueInvoices.map(inv => (
              <div key={inv.id} className="flex items-start gap-2 p-2.5 bg-red-50 rounded-lg border border-red-200">
                <DollarSign className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-red-800">{inv.invoiceNumber} — Overdue</div>
                  <div className="text-xs text-red-600">{inv.agencyName} · ${inv.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
            {lowStockParts.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-start gap-2 p-2.5 bg-orange-50 rounded-lg border border-orange-200">
                <Package className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-orange-800">{p.partNumber} — Low Stock</div>
                  <div className="text-xs text-orange-600">{p.qtyOnHand} on hand, reorder at {p.reorderPoint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location heatmap + work orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location heatmap */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> 10 Locations — Utilization
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {demoLocations.map(loc => (
              <div key={loc.id} className={`rounded-lg p-2.5 border ${loc.alerts > 0 ? 'border-amber-300 bg-amber-50' : 'border-gray-100 bg-[#F8F9FB]'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#003087]">{loc.name}</span>
                  {loc.type === 'hq' && <span className="text-xs bg-[#E8A020] text-white px-1 rounded">HQ</span>}
                  {loc.alerts > 0 && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${loc.utilization >= 90 ? 'bg-green-500' : loc.utilization >= 70 ? 'bg-blue-500' : 'bg-gray-400'}`}
                      style={{ width: `${loc.utilization}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{loc.utilization}%</span>
                </div>
                <div className="text-xs text-gray-500">{loc.activeWOs} active WOs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Work Orders */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
            <Bus className="w-4 h-4" /> Active Work Orders
          </h2>
          <div className="space-y-2">
            {demoWorkOrders.slice(0, 8).map(wo => (
              <div key={wo.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#003087]">{wo.woNumber}</span>
                    <span className="text-xs text-gray-500 truncate">{wo.vin}</span>
                  </div>
                  <div className="text-xs text-gray-500">{wo.agencyName} · {wo.locationName} · {wo.serviceType}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColors[wo.status]}`}>
                  {statusLabel[wo.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Throughput + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4">Production Throughput (12 mo)</h2>
          <ThroughputChart />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-[#003087] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {demoRecentActivity.map(act => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#003087]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ActivityIcon type={act.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700">{act.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contracts summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-[#003087] mb-4">Active Contracts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Contract</th>
                <th className="text-left pb-2 font-medium">Agency</th>
                <th className="text-right pb-2 font-medium">Value</th>
                <th className="text-right pb-2 font-medium">% Complete</th>
                <th className="text-right pb-2 font-medium">Earned</th>
                <th className="text-right pb-2 font-medium">Collected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {demoContracts.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-2.5 font-mono text-xs text-[#003087]">{c.contractNumber}</td>
                  <td className="py-2.5 text-gray-700">{c.agencyName}</td>
                  <td className="py-2.5 text-right font-semibold">{formatM(c.value)}</td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-[#003087] h-1.5 rounded-full" style={{ width: `${c.percentComplete}%` }} />
                      </div>
                      <span className="text-xs">{c.percentComplete}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-right text-green-700">{formatM(c.revenueEarned)}</td>
                  <td className="py-2.5 text-right text-blue-700">{formatM(c.collected)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
