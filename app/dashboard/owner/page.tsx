import { AlertTriangle, TrendingUp, DollarSign, Package, Truck, Zap } from 'lucide-react'

export const dynamic = 'force-dynamic'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function fmtPct(n: number) { return `${n.toFixed(1)}%` }

// ── MOCK DATA ── $50M+ multi-company operation ────────────────────────────────

const kpis = [
  { label: 'Total Revenue MTD', value: '$8.4M', sub: 'vs $7.9M target', trend: '+6.3%', up: true },
  { label: 'Gross Margin', value: '31.2%', sub: 'YTD avg 29.4%', trend: '+1.8 pts', up: true },
  { label: 'Cash on Hand', value: '$8.5M', sub: 'consolidated', trend: 'Stable', up: true },
  { label: 'Open Proposals', value: '23', sub: '$18.4M total value', trend: '5 new this week', up: true },
  { label: 'Buses in Production', value: '14', sub: 'CCW active work orders', trend: '3 delivering this mo.', up: true },
  { label: 'Fleet Units Available', value: '312', sub: 'TSI + SBL combined', trend: '+28 vs last month', up: true },
]

const companies = [
  {
    abbr: 'CCW',
    name: 'Complete Coach Works',
    color: '#003087',
    revenueMTD: 4200000,
    revenueTarget: 4000000,
    grossMargin: 34.1,
    keyLabel: 'Buses in Production',
    keyValue: '14',
    health: 'green' as const,
    updated: '2 min ago',
  },
  {
    abbr: 'TSI',
    name: 'Transit Sales International',
    color: '#14b8a6',
    revenueMTD: 2100000,
    revenueTarget: 2200000,
    grossMargin: 28.6,
    keyLabel: 'Inventory Units',
    keyValue: '247',
    health: 'yellow' as const,
    updated: '5 min ago',
  },
  {
    abbr: 'SBL',
    name: 'Shuttle Bus Leasing',
    color: '#2563eb',
    revenueMTD: 1380000,
    revenueTarget: 1300000,
    grossMargin: 41.2,
    keyLabel: 'Active Leases',
    keyValue: '65',
    health: 'green' as const,
    updated: '3 min ago',
  },
  {
    abbr: 'ZEPS',
    name: 'ZEPS Electric',
    color: '#16a34a',
    revenueMTD: 720000,
    revenueTarget: 900000,
    grossMargin: 22.8,
    keyLabel: 'Conversions In Progress',
    keyValue: '4',
    health: 'red' as const,
    updated: '8 min ago',
  },
]

type Severity = 'high' | 'med' | 'low'

const alerts: { severity: Severity; label: string; action: string; href: string }[] = [
  { severity: 'high', label: 'ZEPS MTD revenue 20% behind target', action: 'View pipeline', href: '/dashboard/pipeline' },
  { severity: 'high', label: '3 CCW invoices overdue > 45 days — $842K outstanding', action: 'View AR', href: '/dashboard/finance' },
  { severity: 'med', label: 'TSI — 2 inventory units on hold pending lien clearance', action: 'View inventory', href: '/dashboard/inventory' },
  { severity: 'med', label: 'SBL lease contract #SBL-2024-18 expires in 12 days', action: 'View contracts', href: '/dashboard/contracts' },
  { severity: 'low', label: 'ESOP loan payment due April 15 — $2.2M', action: 'View ESOP', href: '/dashboard/owner' },
  { severity: 'low', label: 'CCW Compliance: CARB annual cert renewal due May 1', action: 'View compliance', href: '/dashboard/compliance' },
]

// 6-month revenue trend (stacked by company, in thousands)
const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
const revenueByMonth = [
  { month: 'Oct', CCW: 6800, TSI: 1900, SBL: 1200, ZEPS: 900 },
  { month: 'Nov', CCW: 7200, TSI: 2100, SBL: 1300, ZEPS: 1100 },
  { month: 'Dec', CCW: 5900, TSI: 1600, SBL: 1100, ZEPS: 600 },
  { month: 'Jan', CCW: 7500, TSI: 2400, SBL: 1400, ZEPS: 800 },
  { month: 'Feb', CCW: 8100, TSI: 2200, SBL: 1350, ZEPS: 950 },
  { month: 'Mar', CCW: 4200, TSI: 2100, SBL: 1380, ZEPS: 720 },
]
const maxMonthTotal = Math.max(...revenueByMonth.map(m => m.CCW + m.TSI + m.SBL + m.ZEPS))

const pipeline = [
  { company: 'CCW', abbr: 'CCW', color: '#003087', quotes: 9, totalValue: 11200000, stage: 'Active pursuit' },
  { company: 'TSI', abbr: 'TSI', color: '#14b8a6', quotes: 7, totalValue: 3800000, stage: 'Quoted' },
  { company: 'SBL', abbr: 'SBL', color: '#2563eb', quotes: 5, totalValue: 2100000, stage: 'In discussion' },
  { company: 'ZEPS', abbr: 'ZEPS', color: '#16a34a', quotes: 2, totalValue: 1300000, stage: 'RFP stage' },
]

const healthColors = {
  green: { dot: 'bg-green-500', label: 'Healthy', text: 'text-green-600 bg-green-50' },
  yellow: { dot: 'bg-amber-400', label: 'Watch', text: 'text-amber-700 bg-amber-50' },
  red: { dot: 'bg-red-500', label: 'Action Needed', text: 'text-red-700 bg-red-50' },
}

const severityStyles = {
  high: 'bg-red-100 text-red-700 border-red-200',
  med: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-blue-100 text-blue-700 border-blue-200',
}

export default function OwnerDashboard() {
  const totalMTD = companies.reduce((s, c) => s + c.revenueMTD, 0)
  const totalTarget = companies.reduce((s, c) => s + c.revenueTarget, 0)

  return (
    <div className="space-y-6">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold" style={{ color: '#0A1628' }}>Executive Owner Dashboard</h1>
            <span className="bg-[#F5A623] text-[#0A1628] text-xs px-2.5 py-0.5 rounded-full font-bold">OWNER VIEW</span>
          </div>
          <p className="text-gray-500 text-sm">Carson Capital Corp · CCW · TSI · SBL · ZEPS · March 2026</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-amber-50 text-amber-700 border border-amber-200 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          Live data via Sage + internal systems
        </div>
      </div>

      {/* ── KPI STRIP ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1 leading-tight">{k.label}</div>
            <div className="text-2xl font-bold" style={{ color: '#0A1628' }}>{k.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
            <div className={`text-xs font-semibold mt-1.5 ${k.up ? 'text-green-600' : 'text-red-600'}`}>{k.trend}</div>
          </div>
        ))}
      </div>

      {/* ── MAIN GRID: scorecards + alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Company scorecards (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Company Scorecards</h2>
            <div className="text-sm text-gray-500">
              MTD Total: <span className="font-bold text-[#0A1628]">{fmt(totalMTD)}</span>
              <span className="text-gray-400"> / {fmt(totalTarget)} target</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map((c) => {
              const pct = Math.min((c.revenueMTD / c.revenueTarget) * 100, 100)
              const hc = healthColors[c.health]
              return (
                <div key={c.abbr} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: c.color }}
                      >{c.abbr}</span>
                      <span className="font-semibold text-gray-800 text-sm">{c.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${hc.text}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${hc.dot}`} style={{ verticalAlign: 'middle' }} />
                      {hc.label}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-500">Revenue MTD</span>
                      <span className="font-bold text-gray-800">{fmt(c.revenueMTD)} / {fmt(c.revenueTarget)}</span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: c.color }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{pct.toFixed(0)}% of target</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">Gross Margin</div>
                      <div className="text-lg font-bold text-gray-800">{fmtPct(c.grossMargin)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">{c.keyLabel}</div>
                      <div className="text-lg font-bold" style={{ color: c.color }}>{c.keyValue}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-3">Updated {c.updated}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Alerts column (1/3 width) */}
        <div className="space-y-4">
          <h2 className="font-bold text-gray-900">Alerts & Actions</h2>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className={`rounded-xl border p-4 ${severityStyles[a.severity]}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs leading-relaxed font-medium">{a.label}</p>
                  <span className="text-xs font-bold uppercase flex-shrink-0 opacity-60">
                    {a.severity === 'high' ? '🔴' : a.severity === 'med' ? '🟡' : '🔵'}
                  </span>
                </div>
                <a
                  href={a.href}
                  className="text-xs font-bold mt-2 inline-block underline underline-offset-2 opacity-80 hover:opacity-100"
                >
                  {a.action} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVENUE TREND CHART ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-[#F5A623]" />
          <h2 className="font-bold text-gray-900">6-Month Revenue Trend — All Companies ($ thousands)</h2>
        </div>
        <div className="flex items-end gap-3 h-48">
          {revenueByMonth.map((m) => {
            const total = m.CCW + m.TSI + m.SBL + m.ZEPS
            const barH = (total / maxMonthTotal) * 100
            const ccwH = (m.CCW / total) * barH
            const tsiH = (m.TSI / total) * barH
            const sblH = (m.SBL / total) * barH
            const zepsH = (m.ZEPS / total) * barH
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-gray-500 font-medium">{fmt(total * 1000)}</div>
                <div className="w-full flex flex-col-reverse rounded-md overflow-hidden" style={{ height: `${barH * 1.5}px` }}>
                  <div style={{ height: `${ccwH * 1.5}px`, backgroundColor: '#003087' }} title={`CCW $${m.CCW}K`} />
                  <div style={{ height: `${tsiH * 1.5}px`, backgroundColor: '#14b8a6' }} title={`TSI $${m.TSI}K`} />
                  <div style={{ height: `${sblH * 1.5}px`, backgroundColor: '#2563eb' }} title={`SBL $${m.SBL}K`} />
                  <div style={{ height: `${zepsH * 1.5}px`, backgroundColor: '#16a34a' }} title={`ZEPS $${m.ZEPS}K`} />
                </div>
                <div className="text-xs text-gray-500">{m.month}</div>
              </div>
            )
          })}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
          {[
            { label: 'CCW', color: '#003087' },
            { label: 'TSI', color: '#14b8a6' },
            { label: 'SBL', color: '#2563eb' },
            { label: 'ZEPS', color: '#16a34a' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── PIPELINE SNAPSHOT ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="w-5 h-5 text-[#F5A623]" />
          <h2 className="font-bold text-gray-900">Pipeline Snapshot — Open Quotes & Proposals</h2>
          <span className="ml-auto text-sm text-gray-500">
            Total: <span className="font-bold text-[#0A1628]">{fmt(pipeline.reduce((s, p) => s + p.totalValue, 0))}</span>
            {' '}across {pipeline.reduce((s, p) => s + p.quotes, 0)} open items
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pipeline.map((p) => (
            <div key={p.abbr} className="rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: p.color }}>{p.abbr}</span>
                <span className="text-sm text-gray-600">{p.stage}</span>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: p.color }}>{p.quotes}</div>
              <div className="text-xs text-gray-500">open quotes</div>
              <div className="text-lg font-bold text-gray-800 mt-2">{fmt(p.totalValue)}</div>
              <div className="text-xs text-gray-400">total pipeline value</div>
              <div className="mt-3 text-xs text-gray-400">{fmt(p.totalValue / p.quotes)} avg deal size</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-400 border-t border-gray-100 pt-4">
          DEMO — Connect Salesforce or HubSpot in Settings to sync live pipeline data.
        </div>
      </div>

    </div>
  )
}
