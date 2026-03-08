import { createClient } from '@/lib/supabase/server'
import { FinanceClient } from '@/components/dashboard/FinanceClient'
import type { Database } from '@/lib/database.types'

type Invoice = Database['public']['Tables']['bus_invoices']['Row']
type Contract = Database['public']['Tables']['bus_contracts']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']

export default async function FinancePage() {
  const supabase = createClient()

  const [invoicesResult, contractsResult, agenciesResult] = await Promise.all([
    supabase.from('bus_invoices').select('*').order('created_at', { ascending: false }),
    supabase.from('bus_contracts').select('*').order('contract_number'),
    supabase.from('bus_agencies').select('*'),
  ])

  const invoices = (invoicesResult.data ?? []) as Invoice[]
  const contracts = (contractsResult.data ?? []) as Contract[]
  const agencies = (agenciesResult.data ?? []) as Agency[]
  const agencyMap = new Map(agencies.map(a => [a.id, a.name]))

  return (
    <FinanceClient
      invoices={invoices}
      contracts={contracts}
      agencyMap={Object.fromEntries(agencyMap)}
    />
  )
}
