import { FinanceClient } from '@/components/dashboard/FinanceClient'
import { demoInvoices, demoContracts, demoAgencies } from '@/lib/demo-data'
import type { Database } from '@/lib/database.types'

type Invoice = Database['public']['Tables']['bus_invoices']['Row']
type Contract = Database['public']['Tables']['bus_contracts']['Row']

export default async function FinancePage() {
  const invoices: Invoice[] = demoInvoices.map((inv) => ({
    id: inv.id,
    invoice_number: inv.invoiceNumber,
    contract_id: inv.contractId,
    amount: inv.amount,
    invoice_type: inv.invoiceType,
    status: inv.status,
    issued_at: inv.issuedAt,
    due_date: inv.dueDate,
    paid_at: inv.paidAt,
    notes: null,
    created_at: inv.issuedAt,
  }))

  const contracts: Contract[] = demoContracts.map((c) => ({
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
    notes: null,
    created_at: c.startDate,
  }))

  const agencyMap = Object.fromEntries(
    demoAgencies.map((a) => [a.id, a.name])
  )

  return (
    <FinanceClient
      invoices={invoices}
      contracts={contracts}
      agencyMap={agencyMap}
    />
  )
}
