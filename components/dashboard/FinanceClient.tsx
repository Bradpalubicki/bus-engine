'use client'

import { useState, useTransition } from 'react'
import { DollarSign, AlertTriangle, CheckCircle, Clock, Plus, X } from 'lucide-react'
import { createInvoice, updateInvoiceStatus } from '@/app/dashboard/finance/actions'
import { formatMoney, formatCurrency } from '@/lib/status-colors'
import type { Database } from '@/lib/database.types'

type Invoice = Database['public']['Tables']['bus_invoices']['Row']
type Contract = Database['public']['Tables']['bus_contracts']['Row']

const invoiceStatusColors: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  sent: 'bg-blue-100 text-blue-800',
  overdue: 'bg-red-100 text-red-800',
  draft: 'bg-gray-100 text-gray-700',
}

const invoiceStatusIcon: Record<string, typeof CheckCircle> = {
  paid: CheckCircle, sent: Clock, overdue: AlertTriangle, draft: Clock
}

export function FinanceClient({
  invoices,
  contracts,
  agencyMap,
}: {
  invoices: Invoice[]
  contracts: Contract[]
  agencyMap: Record<string, string>
}) {
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [selContract, setSelContract] = useState('')
  const [amount, setAmount] = useState('')
  const [invType, setInvType] = useState('milestone')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')

  const totalBacklog = contracts.reduce((s, c) => s + (c.value ?? 0), 0)
  const totalEarned = contracts.reduce((s, c) => s + (c.revenue_recognized ?? 0), 0)
  const totalInvoiced = invoices.reduce((s, i) => s + (i.amount ?? 0), 0)
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.amount ?? 0), 0)
  const overdueCount = invoices.filter(i => i.status === 'overdue').length

  const contractMap = new Map(contracts.map(c => [c.id, c]))

  const run = (fn: () => Promise<void>) => {
    setError(null)
    startTransition(async () => {
      try { await fn() } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Finance & Revenue Recognition</h1>
          <p className="text-gray-500 text-sm">Percentage-of-completion (POC) method · FTA contract billing</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004db3] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Contract Backlog', value: formatMoney(totalBacklog), icon: DollarSign, color: 'text-[#003087]' },
          { label: 'Revenue Recognized', value: formatMoney(totalEarned), icon: CheckCircle, color: 'text-green-600' },
          { label: 'Total Invoiced', value: formatMoney(totalInvoiced), icon: Clock, color: 'text-blue-600' },
          { label: 'Collected', value: formatMoney(totalPaid), icon: CheckCircle, color: 'text-green-700' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      {overdueCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-800 font-semibold">{overdueCount} overdue invoice{overdueCount > 1 ? 's' : ''} require immediate attention</span>
        </div>
      )}

      {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}

      {/* Revenue Recognition Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-[#003087] mb-4">Revenue Recognition by Contract</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Contract</th>
                <th className="text-left pb-2 font-medium">Agency</th>
                <th className="text-right pb-2 font-medium">Value</th>
                <th className="text-right pb-2 font-medium">Est. Cost</th>
                <th className="text-right pb-2 font-medium">Incurred</th>
                <th className="text-right pb-2 font-medium">Recognized</th>
                <th className="text-right pb-2 font-medium">% Complete</th>
                <th className="text-right pb-2 font-medium">Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contracts.map(c => {
                const pct = c.estimated_total_cost && c.estimated_total_cost > 0
                  ? Math.round((c.costs_incurred ?? 0) / c.estimated_total_cost * 100)
                  : 0
                const remaining = (c.value ?? 0) - (c.revenue_recognized ?? 0)
                const agencyName = c.agency_id ? agencyMap[c.agency_id] ?? '—' : '—'
                return (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="py-2.5 font-mono text-xs text-[#003087]">{c.contract_number}</td>
                    <td className="py-2.5 text-gray-700">{agencyName}</td>
                    <td className="py-2.5 text-right font-semibold">{formatMoney(c.value ?? 0)}</td>
                    <td className="py-2.5 text-right text-gray-500">{formatMoney(c.estimated_total_cost ?? 0)}</td>
                    <td className="py-2.5 text-right text-red-600">{formatMoney(c.costs_incurred ?? 0)}</td>
                    <td className="py-2.5 text-right text-green-700">{formatMoney(c.revenue_recognized ?? 0)}</td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-[#003087] h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <span className="text-xs font-medium">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right text-amber-700">{formatMoney(remaining)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Ledger */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-[#003087] mb-4">Invoice Ledger ({invoices.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Invoice #</th>
                <th className="text-left pb-2 font-medium">Agency / Contract</th>
                <th className="text-left pb-2 font-medium">Type</th>
                <th className="text-right pb-2 font-medium">Amount</th>
                <th className="text-left pb-2 font-medium">Status</th>
                <th className="text-left pb-2 font-medium">Due Date</th>
                <th className="text-left pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-gray-400 text-sm">No invoices yet</td></tr>
              ) : invoices.map(inv => {
                const contract = inv.contract_id ? contractMap.get(inv.contract_id) : null
                const agencyName = contract?.agency_id ? agencyMap[contract.agency_id] ?? '—' : '—'
                const StatusIcon = invoiceStatusIcon[inv.status ?? 'draft'] ?? Clock
                return (
                  <tr key={inv.id} className={`hover:bg-gray-50 ${inv.status === 'overdue' ? 'bg-red-50/30' : ''}`}>
                    <td className="py-2.5 font-mono text-xs text-[#003087]">{inv.invoice_number}</td>
                    <td className="py-2.5">
                      <div className="text-gray-700">{agencyName}</div>
                      <div className="text-xs text-gray-400">{contract?.title}</div>
                    </td>
                    <td className="py-2.5 text-gray-500 text-xs">{inv.invoice_type ?? '—'}</td>
                    <td className="py-2.5 text-right font-semibold text-gray-800">{formatCurrency(inv.amount ?? 0)}</td>
                    <td className="py-2.5">
                      <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full w-fit font-medium ${invoiceStatusColors[inv.status ?? 'draft']}`}>
                        <StatusIcon className="w-3 h-3" />
                        {inv.status ?? 'draft'}
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-500 text-xs">{inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '—'}</td>
                    <td className="py-2.5">
                      {inv.status !== 'paid' && (
                        <div className="flex gap-2">
                          {inv.status === 'draft' && (
                            <button onClick={() => run(() => updateInvoiceStatus(inv.id, 'sent'))}
                              className="text-xs text-blue-600 hover:underline">Mark Sent</button>
                          )}
                          <button onClick={() => run(() => updateInvoiceStatus(inv.id, 'paid'))}
                            className="text-xs text-green-600 hover:underline">Mark Paid</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-[#003087]">Create Invoice</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Contract *</label>
                <select value={selContract} onChange={e => setSelContract(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select contract...</option>
                  {contracts.map(c => <option key={c.id} value={c.id}>{c.contract_number} — {c.title}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Amount *</label>
                  <input value={amount} onChange={e => setAmount(e.target.value)} type="number" step="1000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Type</label>
                  <select value={invType} onChange={e => setInvType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    {['milestone', 'progress', 'final', 'retention'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Due Date</label>
                <input value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">Cancel</button>
                <button
                  disabled={!selContract || !amount || isPending}
                  onClick={() => run(async () => {
                    await createInvoice({ contract_id: selContract, amount: parseFloat(amount), invoice_type: invType, due_date: dueDate || undefined, notes: notes || undefined })
                    setShowModal(false); setSelContract(''); setAmount(''); setDueDate(''); setNotes('')
                  })}
                  className="flex-1 bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isPending ? 'Creating...' : 'Create Invoice'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
