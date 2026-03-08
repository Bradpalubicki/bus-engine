import { demoInvoices, demoContracts, demoDashboardKPIs } from '@/lib/demo-data'
import { DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

function fmt(v: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
}

const invoiceStatus: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  sent: 'bg-blue-100 text-blue-800',
  overdue: 'bg-red-100 text-red-800',
  draft: 'bg-gray-100 text-gray-700',
}

export default function FinancePage() {
  const kpi = demoDashboardKPIs
  const totalBacklog = demoContracts.reduce((s, c) => s + c.value, 0)
  const totalEarned = demoContracts.reduce((s, c) => s + c.revenueEarned, 0)
  const totalCollected = demoContracts.reduce((s, c) => s + c.collected, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Finance & Revenue Recognition</h1>
        <p className="text-gray-500 text-sm">Percentage-of-completion (POC) method · FTA contract billing</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Contract Backlog', value: fmt(totalBacklog), icon: DollarSign, color: 'text-[#003087]' },
          { label: 'Revenue Earned (YTD)', value: fmt(totalEarned), icon: CheckCircle, color: 'text-green-600' },
          { label: 'Cash Collected', value: fmt(totalCollected), icon: DollarSign, color: 'text-blue-600' },
          { label: 'Days Sales Outstanding', value: `${kpi.dso} days`, icon: Clock, color: 'text-amber-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-[#003087] mb-4">Invoices</h2>
        <div className="space-y-3">
          {demoInvoices.map(inv => (
            <div key={inv.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 border border-gray-50">
              <div className="w-8 h-8 bg-[#003087]/10 rounded-lg flex items-center justify-center">
                {inv.status === 'overdue' ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <DollarSign className="w-4 h-4 text-[#003087]" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#003087]">{inv.invoiceNumber}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${invoiceStatus[inv.status]}`}>{inv.status}</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{inv.agencyName} · {inv.invoiceType}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-800">{inv.amount > 0 ? fmt(inv.amount) : '—'}</div>
                {inv.dueDate && <div className="text-xs text-gray-400">Due: {inv.dueDate}</div>}
                {inv.paidAt && <div className="text-xs text-green-600">Paid: {inv.paidAt}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unbilled revenue alert */}
      {kpi.unbilledRevenue > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-amber-800">Unbilled Revenue Alert</div>
            <div className="text-amber-700 text-sm mt-1">
              {fmt(kpi.unbilledRevenue)} in earned revenue has not yet been invoiced. Review milestone completion and generate invoices.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
