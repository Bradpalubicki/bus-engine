'use client'

import { useState } from 'react'
import {
  DollarSign, AlertTriangle, CheckCircle, Clock, Plus, X,
  Download, Send, Trash2, Edit2,
} from 'lucide-react'

type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue'

type LineItem = { id: string; description: string; amount: number }

type Invoice = {
  id: string
  invoice_number: string | null
  contract_id: string | null
  amount: number | null
  invoice_type: string | null
  status: InvoiceStatus
  issued_at: string | null
  due_date: string | null
  paid_at: string | null
  notes: string | null
  created_at: string | null
  _lineItems: LineItem[]
}

type Contract = {
  id: string
  contract_number: string | null
  agency_id: string | null
  title: string | null
  value: number | null
  bus_count: number | null
  start_date: string | null
  end_date: string | null
  status: string | null
  estimated_total_cost: number | null
  costs_incurred: number | null
  revenue_recognized: number | null
  notes: string | null
  created_at: string | null
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const STATUS_COLORS: Record<InvoiceStatus, string> = {
  paid: 'bg-green-100 text-green-800',
  sent: 'bg-blue-100 text-blue-800',
  overdue: 'bg-red-100 text-red-800',
  draft: 'bg-gray-100 text-gray-700',
}

type InvoiceForm = {
  contract_id: string
  invoice_type: string
  due_date: string
  notes: string
  lineItems: LineItem[]
}

function InvoiceModal({
  contracts,
  agencyMap,
  onClose,
  onSave,
}: {
  contracts: Contract[]
  agencyMap: Record<string, string>
  onClose: () => void
  onSave: (form: InvoiceForm) => void
}) {
  const [form, setForm] = useState<InvoiceForm>({
    contract_id: '', invoice_type: 'milestone', due_date: '', notes: '',
    lineItems: [{ id: 'li-1', description: '', amount: 0 }],
  })
  const [saved, setSaved] = useState(false)

  function addLine() {
    setForm(f => ({ ...f, lineItems: [...f.lineItems, { id: `li-${Date.now()}`, description: '', amount: 0 }] }))
  }
  function updateLine(id: string, field: 'description' | 'amount', val: string) {
    setForm(f => ({
      ...f,
      lineItems: f.lineItems.map(li => li.id === id ? { ...li, [field]: field === 'amount' ? Number(val) : val } : li),
    }))
  }
  function removeLine(id: string) {
    setForm(f => ({ ...f, lineItems: f.lineItems.filter(li => li.id !== id) }))
  }

  const total = form.lineItems.reduce((s, li) => s + li.amount, 0)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">Create Invoice</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        {saved ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <p className="text-lg font-bold text-green-700">Invoice Created</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contract</label>
                <select value={form.contract_id} onChange={e => setForm(f => ({ ...f, contract_id: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  <option value="">Select contract…</option>
                  {contracts.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.contract_number} — {c.agency_id ? (agencyMap[c.agency_id] ?? 'Unknown') : 'Unknown'}: {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Invoice Type</label>
                <select value={form.invoice_type} onChange={e => setForm(f => ({ ...f, invoice_type: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {['milestone', 'progress', 'final', 'retention', 'deposit'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Due Date</label>
                <input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
            </div>

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Line Items</label>
                <button onClick={addLine} className="text-xs text-[#003087] font-semibold hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add Line
                </button>
              </div>
              <div className="space-y-2">
                {form.lineItems.map(li => (
                  <div key={li.id} className="flex gap-2 items-center">
                    <input type="text" placeholder="Description" value={li.description}
                      onChange={e => updateLine(li.id, 'description', e.target.value)}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
                    <input type="number" placeholder="0" value={li.amount || ''}
                      onChange={e => updateLine(li.id, 'amount', e.target.value)}
                      className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
                    <button onClick={() => removeLine(li.id)} className="text-gray-300 hover:text-red-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2 text-sm font-bold text-[#003087]">
                Total: {fmt(total)}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Notes</label>
              <textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { if (form.contract_id && total > 0) { onSave(form); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Create Invoice
              </button>
              <button onClick={onClose} className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function exportCSV(invoices: Invoice[], agencyMap: Record<string, string>, contractMap: Map<string, Contract>) {
  const rows = [
    ['Invoice #', 'Agency', 'Contract', 'Type', 'Amount', 'Status', 'Due Date', 'Paid At', 'Notes'],
    ...invoices.map(inv => {
      const contract = inv.contract_id ? contractMap.get(inv.contract_id) : null
      const agency = contract?.agency_id ? (agencyMap[contract.agency_id] ?? '') : ''
      return [
        inv.invoice_number ?? '',
        agency,
        contract?.contract_number ?? '',
        inv.invoice_type ?? '',
        String(inv.amount ?? 0),
        inv.status,
        inv.due_date ?? '',
        inv.paid_at ?? '',
        inv.notes ?? '',
      ]
    }),
  ]
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function FinanceClient({
  invoices: initialInvoices,
  contracts,
  agencyMap,
}: {
  invoices: Omit<Invoice, '_lineItems'>[]
  contracts: Contract[]
  agencyMap: Record<string, string>
}) {
  const [invoices, setInvoices] = useState<Invoice[]>(
    initialInvoices.map(inv => ({ ...inv, _lineItems: [] }))
  )
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState<InvoiceStatus | 'all'>('all')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2200) }

  const contractMap = new Map(contracts.map(c => [c.id, c]))

  function nextInvoiceNum() {
    const year = new Date().getFullYear()
    const n = invoices.filter(i => i.invoice_number?.startsWith(`INV-${year}`)).length + 1
    return `INV-${year}-${String(n).padStart(3, '0')}`
  }

  function saveInvoice(form: InvoiceForm) {
    const total = form.lineItems.reduce((s, li) => s + li.amount, 0)
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoice_number: nextInvoiceNum(),
      contract_id: form.contract_id,
      amount: total,
      invoice_type: form.invoice_type,
      status: 'draft',
      issued_at: new Date().toISOString().split('T')[0],
      due_date: form.due_date || null,
      paid_at: null,
      notes: form.notes || null,
      created_at: new Date().toISOString().split('T')[0],
      _lineItems: form.lineItems,
    }
    setInvoices(invs => [newInv, ...invs])
    setShowModal(false)
    showToast('Invoice created')
  }

  function markStatus(id: string, status: InvoiceStatus) {
    setInvoices(invs => invs.map(inv => inv.id === id ? {
      ...inv,
      status,
      paid_at: status === 'paid' ? new Date().toISOString().split('T')[0] : inv.paid_at,
    } : inv))
    showToast(status === 'paid' ? 'Invoice marked paid ✓' : status === 'sent' ? 'Invoice marked sent' : 'Status updated')
  }

  function sendReminder(inv: Invoice) {
    showToast(`Reminder sent for ${inv.invoice_number}`)
  }

  function deleteInvoice(id: string) {
    setInvoices(invs => invs.filter(inv => inv.id !== id))
    showToast('Invoice deleted')
  }

  const totalBacklog = contracts.reduce((s, c) => s + (c.value ?? 0), 0)
  const totalEarned = contracts.reduce((s, c) => s + (c.revenue_recognized ?? 0), 0)
  const totalInvoiced = invoices.reduce((s, i) => s + (i.amount ?? 0), 0)
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.amount ?? 0), 0)
  const overdueCount = invoices.filter(i => i.status === 'overdue').length

  const filtered = filterStatus === 'all' ? invoices : invoices.filter(i => i.status === filterStatus)

  // Simple bar chart — monthly invoiced totals (last 6 months)
  const monthlyData = (() => {
    const months: { label: string; amount: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      const label = d.toLocaleString('default', { month: 'short' })
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const amount = invoices
        .filter(inv => (inv.issued_at ?? '').startsWith(key))
        .reduce((s, inv) => s + (inv.amount ?? 0), 0)
      months.push({ label, amount })
    }
    return months
  })()
  const maxBar = Math.max(...monthlyData.map(m => m.amount), 1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Finance</h1>
          <p className="text-gray-500 text-sm">POC revenue recognition · FTA contract billing</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportCSV(invoices, agencyMap, contractMap)}
            className="border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Contract Backlog', value: fmt(totalBacklog), icon: DollarSign, color: 'text-[#003087]' },
          { label: 'Revenue Recognized', value: fmt(totalEarned), icon: CheckCircle, color: 'text-green-600' },
          { label: 'Total Invoiced', value: fmt(totalInvoiced), icon: Clock, color: 'text-blue-600' },
          { label: 'Collected', value: fmt(totalPaid), icon: CheckCircle, color: 'text-green-700' },
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
          <span className="text-red-800 font-semibold">{overdueCount} overdue invoice{overdueCount > 1 ? 's' : ''} require{overdueCount === 1 ? 's' : ''} immediate attention</span>
        </div>
      )}

      {/* Revenue Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-[#003087] mb-4">Monthly Revenue (Last 6 Months)</h2>
        <div className="flex gap-3">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between text-xs text-gray-400 text-right pr-1" style={{ height: '96px' }}>
            <span>${(maxBar / 1000).toFixed(0)}K</span>
            <span>${(maxBar / 2000).toFixed(0)}K</span>
            <span>$0</span>
          </div>
          {/* Bars */}
          <div className="flex items-end gap-3 flex-1" style={{ height: '96px' }}>
            {monthlyData.map(m => (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="text-xs text-gray-500 font-medium">{m.amount > 0 ? `$${(m.amount / 1000).toFixed(0)}K` : '$0'}</div>
                <div className="w-full bg-gray-100 rounded-t-md overflow-hidden flex flex-col justify-end" style={{ height: '72px' }}>
                  <div
                    className={`w-full rounded-t-md transition-all ${m.amount > 0 ? 'bg-[#003087]' : 'bg-gray-200'}`}
                    style={{ height: m.amount > 0 ? `${Math.max((m.amount / maxBar) * 100, 4)}%` : '4px' }}
                  />
                </div>
                <div className="text-xs text-gray-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                    <td className="py-2.5 text-gray-700 text-xs">{agencyName}</td>
                    <td className="py-2.5 text-right font-semibold text-sm">{fmt(c.value ?? 0)}</td>
                    <td className="py-2.5 text-right text-green-700 text-sm">{fmt(c.revenue_recognized ?? 0)}</td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-[#003087] h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <span className="text-xs font-medium">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right text-amber-700 text-sm">{fmt(remaining)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Ledger */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#003087]">Invoice Ledger ({invoices.length})</h2>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {(['all', 'draft', 'sent', 'overdue', 'paid'] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${filterStatus === s ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Invoice #</th>
                <th className="text-left pb-2 font-medium">Agency / Contract</th>
                <th className="text-left pb-2 font-medium">Type</th>
                <th className="text-right pb-2 font-medium">Amount</th>
                <th className="text-left pb-2 font-medium">Status</th>
                <th className="text-left pb-2 font-medium">Due</th>
                <th className="text-left pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-gray-400 text-sm">No invoices</td></tr>
              ) : filtered.map(inv => {
                const contract = inv.contract_id ? contractMap.get(inv.contract_id) : undefined
                const agencyName = contract?.agency_id ? agencyMap[contract.agency_id] ?? '—' : '—'
                const isOverdue = inv.status !== 'paid' && inv.due_date && new Date(inv.due_date) < new Date()
                return (
                  <tr key={inv.id} className={`hover:bg-gray-50 ${isOverdue ? 'bg-red-50/30' : ''}`}>
                    <td className="py-2.5 font-mono text-xs text-[#003087]">{inv.invoice_number}</td>
                    <td className="py-2.5">
                      <div className="text-gray-700 text-xs">{agencyName}</div>
                      <div className="text-xs text-gray-400">{contract?.title}</div>
                    </td>
                    <td className="py-2.5 text-gray-500 text-xs capitalize">{inv.invoice_type ?? '—'}</td>
                    <td className="py-2.5 text-right font-semibold text-gray-800">{fmt(inv.amount ?? 0)}</td>
                    <td className="py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-500 text-xs">
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '—'}
                      {isOverdue && <span className="ml-1 text-red-600 font-bold">!</span>}
                    </td>
                    <td className="py-2.5">
                      <div className="flex gap-2 items-center">
                        {inv.status === 'draft' && (
                          <button onClick={() => markStatus(inv.id, 'sent')}
                            className="text-xs text-blue-600 hover:underline font-medium">Send</button>
                        )}
                        {inv.status !== 'paid' && (
                          <>
                            <button onClick={() => markStatus(inv.id, 'paid')}
                              className="text-xs text-green-600 hover:underline font-medium">Paid</button>
                            <button onClick={() => sendReminder(inv)}
                              className="p-1 rounded bg-amber-50 text-amber-600 hover:bg-amber-100">
                              <Send className="w-3 h-3" />
                            </button>
                          </>
                        )}
                        <button onClick={() => deleteInvoice(inv.id)}
                          className="p-1 rounded bg-red-50 text-red-400 hover:bg-red-100">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <InvoiceModal
          contracts={contracts}
          agencyMap={agencyMap}
          onClose={() => setShowModal(false)}
          onSave={saveInvoice}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
