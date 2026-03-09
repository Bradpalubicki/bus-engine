'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart3, DollarSign, Bus, TrendingUp, FileText, Users,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductionData {
  openWOsByStatus: Record<string, number>
  openWOsTotal: number
  completedThisMonth: number
  avgCompletionDays: number
}

interface SixMonthEntry {
  month: string
  total: number
}

interface RevenueData {
  revenueThisMonth: number
  invoiceCountMonth: number
  outstandingAR: number
  overdueCount: number
  sixMonthRevenue: SixMonthEntry[]
}

interface FleetData {
  inProgressCount: number
  completedQtrVehicles: number
  totalVehicles: number
}

interface PipelineRow {
  status: string
  count: number
  value: number
}

interface PipelineData {
  activePipelineValue: number
  pipelineRows: PipelineRow[]
}

interface ContractsData {
  activeContracts: number
  activeContractValue: number
  totalContracts: number
}

interface TechEntry {
  id: string
  name: string
  active: boolean | null
}

interface TechniciansData {
  techList: TechEntry[]
}

interface Props {
  production: ProductionData
  revenue: RevenueData
  fleet: FleetData
  pipeline: PipelineData
  contracts: ContractsData
  technicians: TechniciansData
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const fmtK = (v: number) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`
  return fmt(v)
}

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 shadow-sm ${accent ? 'bg-[#003087] text-white border-[#003087]' : 'bg-white border-gray-100'}`}>
      <div className={`text-xs font-medium mb-1 ${accent ? 'text-blue-200' : 'text-gray-500'}`}>{label}</div>
      <div className={`text-2xl font-bold ${accent ? 'text-white' : 'text-[#003087]'}`}>{value}</div>
      {sub && <div className={`text-xs mt-1 ${accent ? 'text-blue-300' : 'text-gray-400'}`}>{sub}</div>}
    </div>
  )
}

function MiniBar({ value, max, color = '#E8A020' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}

const STATUS_LABELS: Record<string, string> = {
  intake: 'Intake',
  in_progress: 'In Progress',
  qa: 'QA / Inspection',
  paint: 'Paint',
  waiting_parts: 'Waiting Parts',
  hold: 'On Hold',
  unknown: 'Unknown',
}

const PIPELINE_STATUS_LABELS: Record<string, string> = {
  prospect: 'Prospect',
  qualified: 'Qualified',
  proposal: 'Proposal Sent',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
  delivered: 'Delivered',
}

function formatMonth(yyyyMM: string) {
  const [y, m] = yyyyMM.split('-')
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString('default', { month: 'short', year: '2-digit' })
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AnalyticsDashboard({ production, revenue, fleet, pipeline, contracts, technicians }: Props) {
  const maxWOStatus = Math.max(...Object.values(production.openWOsByStatus), 1)
  const maxPipelineValue = Math.max(...pipeline.pipelineRows.map(r => r.value), 1)
  const maxRevMonth = Math.max(...revenue.sixMonthRevenue.map(r => r.total), 1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087] flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-[#E8A020]" />
          Analytics
        </h1>
        <p className="text-gray-500 text-sm">Production throughput, revenue, fleet, pipeline, contracts, and technician metrics</p>
      </div>

      <Tabs defaultValue="production">
        <TabsList className="bg-[#F8F9FB] border border-gray-100 p-1 rounded-xl flex flex-wrap gap-1 h-auto">
          {[
            { value: 'production', label: 'Production', icon: BarChart3 },
            { value: 'revenue',    label: 'Revenue',    icon: DollarSign },
            { value: 'fleet',      label: 'Fleet',      icon: Bus },
            { value: 'pipeline',   label: 'Pipeline',   icon: TrendingUp },
            { value: 'contracts',  label: 'Contracts',  icon: FileText },
            { value: 'technicians',label: 'Technicians',icon: Users },
          ].map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm data-[state=active]:bg-[#003087] data-[state=active]:text-white text-gray-600"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Production ── */}
        <TabsContent value="production" className="mt-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Open Work Orders" value={production.openWOsTotal} sub="Active in shop" accent />
            <StatCard label="Completed This Month" value={production.completedThisMonth} sub="Closed WOs" />
            <StatCard label="Avg Completion" value={`${production.avgCompletionDays}d`} sub="Last 90 days" />
            <StatCard label="Stages Tracked" value={Object.keys(production.openWOsByStatus).length} sub="Active statuses" />
          </div>

          {Object.keys(production.openWOsByStatus).length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-[#003087] mb-4">Open WOs by Stage</h2>
              <div className="space-y-3">
                {Object.entries(production.openWOsByStatus)
                  .sort(([, a], [, b]) => b - a)
                  .map(([status, count]) => (
                    <div key={status}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{STATUS_LABELS[status] ?? status}</span>
                        <span className="font-semibold text-[#003087]">{count}</span>
                      </div>
                      <MiniBar value={count} max={maxWOStatus} />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
              No open work orders
            </div>
          )}
        </TabsContent>

        {/* ── Revenue ── */}
        <TabsContent value="revenue" className="mt-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Revenue This Month" value={fmtK(revenue.revenueThisMonth)} sub={`${revenue.invoiceCountMonth} invoices`} accent />
            <StatCard label="Outstanding AR" value={fmtK(revenue.outstandingAR)} sub="Unpaid invoices" />
            <StatCard label="Overdue Invoices" value={revenue.overdueCount} sub="Require follow-up" />
            <StatCard label="6-Month Periods" value={revenue.sixMonthRevenue.length} sub="With invoice data" />
          </div>

          {revenue.sixMonthRevenue.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-[#003087] mb-4">Revenue — Last 6 Months</h2>
              <div className="space-y-3">
                {revenue.sixMonthRevenue.map(({ month, total }) => (
                  <div key={month}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{formatMonth(month)}</span>
                      <span className="font-semibold text-[#003087]">{fmtK(total)}</span>
                    </div>
                    <MiniBar value={total} max={maxRevMonth} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
              No invoice data for the last 6 months
            </div>
          )}
        </TabsContent>

        {/* ── Fleet ── */}
        <TabsContent value="fleet" className="mt-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard label="In Active Work Orders" value={fleet.inProgressCount} sub="Vehicles being worked on" accent />
            <StatCard label="Completed This Quarter" value={fleet.completedQtrVehicles} sub="Unique vehicles" />
            <StatCard label="Total Fleet" value={fleet.totalVehicles} sub="In system" />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-[#003087] mb-4">Fleet Utilization</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Vehicles In-Shop</span>
                  <span className="font-semibold text-[#003087]">
                    {fleet.totalVehicles > 0 ? `${Math.round((fleet.inProgressCount / fleet.totalVehicles) * 100)}%` : '—'}
                  </span>
                </div>
                <MiniBar value={fleet.inProgressCount} max={fleet.totalVehicles || 1} color="#003087" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Completed This Quarter</span>
                  <span className="font-semibold text-[#003087]">
                    {fleet.completedQtrVehicles} vehicles
                  </span>
                </div>
                <MiniBar value={fleet.completedQtrVehicles} max={fleet.totalVehicles || 1} color="#E8A020" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Pipeline ── */}
        <TabsContent value="pipeline" className="mt-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard label="Active Pipeline" value={fmtK(pipeline.activePipelineValue)} sub="Excl. lost/delivered" accent />
            <StatCard label="Pipeline Stages" value={pipeline.pipelineRows.length} sub="With opportunities" />
            <StatCard
              label="Total Opportunities"
              value={pipeline.pipelineRows.reduce((s, r) => s + r.count, 0)}
              sub="All stages"
            />
          </div>

          {pipeline.pipelineRows.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-[#003087] mb-4">Pipeline by Stage</h2>
              <div className="space-y-3">
                {pipeline.pipelineRows
                  .sort((a, b) => b.value - a.value)
                  .map(row => (
                    <div key={row.status}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">
                          {PIPELINE_STATUS_LABELS[row.status] ?? row.status}
                          <span className="text-gray-400 ml-1 text-xs">({row.count})</span>
                        </span>
                        <span className="font-semibold text-[#003087]">{fmtK(row.value)}</span>
                      </div>
                      <MiniBar value={row.value} max={maxPipelineValue} />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
              No pipeline data
            </div>
          )}
        </TabsContent>

        {/* ── Contracts ── */}
        <TabsContent value="contracts" className="mt-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard label="Active Contracts" value={contracts.activeContracts} sub="Currently in force" accent />
            <StatCard label="Active Contract Value" value={fmtK(contracts.activeContractValue)} sub="Total committed" />
            <StatCard label="All Contracts" value={contracts.totalContracts} sub="In system" />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-[#003087] mb-4">Contract Breakdown</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs text-gray-500 mb-2">Active vs Total</div>
                <MiniBar value={contracts.activeContracts} max={contracts.totalContracts || 1} color="#003087" />
                <div className="text-xs text-gray-400 mt-1">
                  {contracts.totalContracts > 0
                    ? `${Math.round((contracts.activeContracts / contracts.totalContracts) * 100)}% active`
                    : 'No contracts'}
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Active</span><span className="font-semibold text-green-600">{contracts.activeContracts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other</span><span className="font-semibold text-gray-500">{contracts.totalContracts - contracts.activeContracts}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-1 mt-1">
                  <span>Total</span><span className="font-bold text-[#003087]">{contracts.totalContracts}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Technicians ── */}
        <TabsContent value="technicians" className="mt-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard label="Active Technicians" value={technicians.techList.filter(t => t.active !== false).length} sub="Currently on roster" accent />
            <StatCard label="Total Technicians" value={technicians.techList.length} sub="In system" />
            <StatCard label="Production Capacity" value={`${technicians.techList.length} techs`} sub="See Work Orders for per-tech load" />
          </div>

          {technicians.techList.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F9FB] border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Technician</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {technicians.techList.map(tech => (
                    <tr key={tech.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-[#003087]">{tech.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium ${
                          tech.active !== false
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {tech.active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-50">
                Per-technician WO counts available in the Work Orders view
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
              No technician records found
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
