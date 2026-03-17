import { FinanceClient } from '@/components/dashboard/FinanceClient'
import { demoInvoices, demoContracts, demoAgencies } from '@/lib/demo-data'

export default async function FinancePage() {
  const invoices = demoInvoices.map((inv) => ({
    id: inv.id,
    invoice_number: inv.invoiceNumber,
    contract_id: inv.contractId,
    amount: inv.amount,
    invoice_type: inv.invoiceType,
    status: inv.status as 'draft' | 'sent' | 'paid' | 'overdue',
    issued_at: inv.issuedAt,
    due_date: inv.dueDate,
    paid_at: inv.paidAt ?? null as string | null,
    notes: null as string | null,
    created_at: inv.issuedAt,
  }))

  const contracts = demoContracts.map((c) => ({
    id: c.id,
    contract_number: c.contractNumber,
    agency_id: c.agencyId,
    title: c.title,
    value: c.value,
    bus_count: c.busCount,
    start_date: c.startDate,
    end_date: c.endDate,
    status: c.status,
    estimated_total_cost: c.estimatedTotalCost,
    costs_incurred: c.costsIncurred,
    revenue_recognized: c.revenueEarned,
    notes: null as string | null,
    created_at: c.startDate,
  }))

  const agencyMap = Object.fromEntries(demoAgencies.map((a) => [a.id, a.name]))

  return (
    <FinanceClient
      invoices={invoices}
      contracts={contracts}
      agencyMap={agencyMap}
    />
  )
}
