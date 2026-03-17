import { DollarSign, TrendingUp, Building, Shield, AlertTriangle } from 'lucide-react'
import { demoFinancials } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export default async function OwnerPage() {
  const f = demoFinancials
  const esopRemaining = f.esop_payoff_year - 2026
  const esopPaid = f.esop_loan_balance / (f.esop_annual_payment * (f.esop_payoff_year - 2006))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#003087]">Owner Financial Dashboard</h1>
            <span className="bg-amber-400 text-amber-900 text-xs px-2 py-0.5 rounded-full font-bold">OWNER VIEW</span>
          </div>
          <p className="text-gray-500 text-sm">
            {f.period} · {f.company} · DEMO — Connect Sage Intacct for live data
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-4 h-4" />
          Sage Intacct not connected
        </div>
      </div>

      {/* P&L Summary */}
      <div className="bg-[#003087] text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-[#E8A020]" />
          <h2 className="font-bold text-lg">Income Statement — {f.period}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: 'Total Revenue', value: fmt(f.revenue_total), color: 'text-white' },
            { label: 'Gross Profit', value: fmt(f.gross_profit), color: 'text-green-300' },
            { label: 'EBITDA', value: fmt(f.ebitda), color: 'text-green-300' },
            { label: 'Net Income', value: fmt(f.net_income), color: 'text-green-300' },
          ].map(item => (
            <div key={item.label} className="bg-white/10 rounded-xl p-4">
              <div className="text-blue-300 text-xs mb-1">{item.label}</div>
              <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-blue-300 text-xs mb-1">Bus Rehabilitation</div>
            <div className="font-bold">{fmt(f.revenue_refurb)}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-blue-300 text-xs mb-1">ZEPS Conversions</div>
            <div className="font-bold">{fmt(f.revenue_zeps)}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-blue-300 text-xs mb-1">Parts Sales</div>
            <div className="font-bold">{fmt(f.revenue_parts_sales)}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-blue-300">
          <div className="flex items-center gap-1">
            <span>Gross Margin: <strong className="text-white">{f.gross_margin_pct}%</strong></span>
          </div>
          <span>·</span>
          <span>COGS: <strong className="text-white">{fmt(f.cogs_total)}</strong></span>
          <span>·</span>
          <span>OpEx: <strong className="text-white">{fmt(f.operating_expenses)}</strong></span>
        </div>
      </div>

      {/* Balance Sheet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-[#003087]" />
            <h3 className="font-bold text-gray-900">Cash & Liquidity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Cash on Hand</span>
              <span className="font-bold text-gray-800">{fmt(f.cash_on_hand)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Accounts Receivable</span>
              <span className="font-bold text-gray-800">{fmt(f.accounts_receivable)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Accounts Payable</span>
              <span className="font-bold text-gray-800">{fmt(f.accounts_payable)}</span>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Total Assets</span>
              <span className="font-bold text-[#003087]">{fmt(f.total_assets)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-4 h-4 text-[#003087]" />
            <h3 className="font-bold text-gray-900">Debt Position</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Debt</span>
              <span className="font-bold text-gray-800">{fmt(f.total_debt)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Debt / Assets</span>
              <span className="font-bold text-gray-800">{((f.total_debt / f.total_assets) * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">EBITDA / Debt</span>
              <span className="font-bold text-green-600">{(f.ebitda / f.total_debt).toFixed(2)}×</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-gray-900">ESOP Loan Tracker</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Loan Balance</span>
              <span className="font-bold text-amber-700">{fmt(f.esop_loan_balance)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Annual Payment</span>
              <span className="font-bold text-gray-800">{fmt(f.esop_annual_payment)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Projected Payoff</span>
              <span className="font-bold text-gray-800">{f.esop_payoff_year}</span>
            </div>
            <div className="bg-amber-50 rounded-lg p-2 mt-2">
              <div className="text-xs text-amber-700 font-semibold">{esopRemaining} years remaining</div>
              {/* Progress bar */}
              <div className="bg-amber-200 rounded-full h-2 mt-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${(1 - esopPaid) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue breakdown */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 mb-4">Revenue by Division ({f.period})</h3>
        <div className="space-y-3">
          {[
            { label: 'Bus Rehabilitation (CCW)', value: f.revenue_refurb, pct: (f.revenue_refurb / f.revenue_total * 100), color: 'bg-[#003087]' },
            { label: 'ZEPS Zero-Emission Conversions', value: f.revenue_zeps, pct: (f.revenue_zeps / f.revenue_total * 100), color: 'bg-green-500' },
            { label: 'Parts Sales (TSI + CCW)', value: f.revenue_parts_sales, pct: (f.revenue_parts_sales / f.revenue_total * 100), color: 'bg-blue-400' },
          ].map(d => (
            <div key={d.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{d.label}</span>
                <span className="font-bold text-gray-800">{fmt(d.value)} <span className="text-gray-400 font-normal">({d.pct.toFixed(0)}%)</span></span>
              </div>
              <div className="bg-gray-100 rounded-full h-2">
                <div className={`${d.color} h-2 rounded-full`} style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-400">
          DEMO — Connect Sage Intacct (Company ID + Web Services credentials) in Settings to sync live P&L data.
        </div>
      </div>
    </div>
  )
}
