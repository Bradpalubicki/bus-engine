import { createClient } from '@/lib/supabase/server'
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'

export const metadata = {
  title: 'Analytics | Complete Coach Works',
}

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function safeQuery(fn: () => PromiseLike<{ data: any; error: any }>): Promise<any> {
  try {
    const { data } = await fn()
    return data
  } catch {
    return null
  }
}

export default async function AnalyticsPage() {
  const supabase = createClient()

  const [
    woStatusData,
    woCompletedMonthData,
    woAvgDaysData,
    invoicesMonthData,
    invoicesOutstandingData,
    invoicesSixMonthData,
    fleetActiveWOData,
    fleetQtrData,
    vehiclesTotalData,
    pipelineData,
    contractsData,
    contractDeliveryData,
    techWOData,
  ] = await Promise.all([
    // Production: open WOs by status
    safeQuery(() => supabase
      .from('bus_work_orders')
      .select('status')
      .not('status', 'in', '(complete,delivered)')),

    // Production: completed this month
    safeQuery(() => supabase
      .from('bus_work_orders')
      .select('id', { count: 'exact', head: true })
      .in('status', ['complete', 'delivered'])
      .gte('closed_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())),

    // Production: avg completion days (last 90 days)
    safeQuery(() => supabase
      .from('bus_work_orders')
      .select('opened_at, closed_at')
      .in('status', ['complete', 'delivered'])
      .gte('closed_at', new Date(Date.now() - 90 * 86400000).toISOString())),

    // Revenue: invoices this month
    safeQuery(() => supabase
      .from('bus_invoices')
      .select('amount, status')
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())),

    // Revenue: outstanding AR
    safeQuery(() => supabase
      .from('bus_invoices')
      .select('amount, status')
      .in('status', ['sent', 'overdue', 'draft'])),

    // Revenue: last 6 months
    safeQuery(() => supabase
      .from('bus_invoices')
      .select('amount, created_at, status')
      .gte('created_at', new Date(Date.now() - 180 * 86400000).toISOString())
      .order('created_at')),

    // Fleet: vehicles in active WOs
    safeQuery(() => supabase
      .from('bus_work_orders')
      .select('vehicle_id')
      .not('status', 'in', '(complete,delivered)')),

    // Fleet: completed this quarter
    safeQuery(() => supabase
      .from('bus_work_orders')
      .select('vehicle_id')
      .in('status', ['complete', 'delivered'])
      .gte('closed_at', new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3, 1).toISOString())),

    // Fleet: total vehicles
    safeQuery(() => supabase
      .from('bus_vehicles')
      .select('id, status', { count: 'exact' })),

    // Pipeline: by status
    safeQuery(() => supabase
      .from('bus_rfp_pipeline')
      .select('status, est_value')),

    // Contracts: active
    safeQuery(() => supabase
      .from('bus_contracts')
      .select('status, value')),

    // Contracts: delivery performance
    safeQuery(() => supabase
      .from('bus_contracts')
      .select('status, end_date, created_at')
      .eq('status', 'complete')
      .gte('created_at', new Date(Date.now() - 365 * 86400000).toISOString())),

    // Technicians: work orders per tech (last 30 days via assignments)
    safeQuery(() => supabase
      .from('bus_technicians')
      .select('id, name, active')
      .eq('active', true)),
  ])

  // Process production data
  const openWOsByStatus: Record<string, number> = {}
  if (Array.isArray(woStatusData)) {
    for (const wo of woStatusData as Array<{ status: string | null }>) {
      const s = wo.status ?? 'unknown'
      openWOsByStatus[s] = (openWOsByStatus[s] ?? 0) + 1
    }
  }
  const openWOsTotal = Object.values(openWOsByStatus).reduce((a, b) => a + b, 0)

  const completedThisMonth = Array.isArray(woCompletedMonthData) ? woCompletedMonthData.length : 0

  let avgCompletionDays = 0
  if (Array.isArray(woAvgDaysData) && woAvgDaysData.length > 0) {
    const days = (woAvgDaysData as Array<{ opened_at: string | null; closed_at: string | null }>)
      .filter(w => w.opened_at && w.closed_at)
      .map(w => (new Date(w.closed_at!).getTime() - new Date(w.opened_at!).getTime()) / 86400000)
    avgCompletionDays = days.length > 0 ? Math.round(days.reduce((a, b) => a + b, 0) / days.length) : 0
  }

  // Process revenue data
  const invoiceItems = (Array.isArray(invoicesMonthData) ? invoicesMonthData : []) as Array<{ amount: number | null; status: string | null }>
  const revenueThisMonth = invoiceItems.reduce((sum, i) => sum + (i.amount ?? 0), 0)
  const invoiceCountMonth = invoiceItems.length

  const outstandingItems = (Array.isArray(invoicesOutstandingData) ? invoicesOutstandingData : []) as Array<{ amount: number | null; status: string | null }>
  const outstandingAR = outstandingItems.reduce((sum, i) => sum + (i.amount ?? 0), 0)
  const overdueCount = outstandingItems.filter(i => i.status === 'overdue').length

  // Six-month revenue by month
  const sixMonthMap: Record<string, number> = {}
  if (Array.isArray(invoicesSixMonthData)) {
    for (const inv of invoicesSixMonthData as Array<{ amount: number | null; created_at: string | null }>) {
      if (!inv.created_at) continue
      const month = inv.created_at.slice(0, 7) // YYYY-MM
      sixMonthMap[month] = (sixMonthMap[month] ?? 0) + (inv.amount ?? 0)
    }
  }
  const sixMonthRevenue = Object.entries(sixMonthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }))

  // Process fleet data
  const activeVehicleIds = new Set(
    (Array.isArray(fleetActiveWOData) ? fleetActiveWOData : [])
      .map((w: { vehicle_id: string | null }) => w.vehicle_id)
      .filter(Boolean)
  )
  const inProgressCount = activeVehicleIds.size
  const completedQtrVehicles = new Set(
    (Array.isArray(fleetQtrData) ? fleetQtrData : [])
      .map((w: { vehicle_id: string | null }) => w.vehicle_id)
      .filter(Boolean)
  ).size
  const totalVehicles = Array.isArray(vehiclesTotalData) ? vehiclesTotalData.length : 0

  // Process pipeline data
  const pipelineByStatus: Record<string, { count: number; value: number }> = {}
  if (Array.isArray(pipelineData)) {
    for (const p of pipelineData as Array<{ status: string | null; est_value: number | null }>) {
      const s = p.status ?? 'unknown'
      if (!pipelineByStatus[s]) pipelineByStatus[s] = { count: 0, value: 0 }
      pipelineByStatus[s].count++
      pipelineByStatus[s].value += p.est_value ?? 0
    }
  }
  const activePipelineValue = Object.entries(pipelineByStatus)
    .filter(([s]) => !['lost', 'delivered'].includes(s))
    .reduce((sum, [, v]) => sum + v.value, 0)
  const pipelineRows = Object.entries(pipelineByStatus).map(([status, { count, value }]) => ({ status, count, value }))

  // Process contracts data
  const contractItems = (Array.isArray(contractsData) ? contractsData : []) as Array<{ status: string | null; value: number | null }>
  const activeContracts = contractItems.filter(c => c.status === 'active').length
  const activeContractValue = contractItems.filter(c => c.status === 'active').reduce((sum, c) => sum + (c.value ?? 0), 0)
  const totalContracts = contractItems.length

  // Tech list for display (WO counts joined separately would require RPC — show tech names)
  const techList = (Array.isArray(techWOData) ? techWOData : []) as Array<{ id: string; name: string; active: boolean | null }>

  return (
    <AnalyticsDashboard
      production={{
        openWOsByStatus,
        openWOsTotal,
        completedThisMonth,
        avgCompletionDays,
      }}
      revenue={{
        revenueThisMonth,
        invoiceCountMonth,
        outstandingAR,
        overdueCount,
        sixMonthRevenue,
      }}
      fleet={{
        inProgressCount,
        completedQtrVehicles,
        totalVehicles,
      }}
      pipeline={{
        activePipelineValue,
        pipelineRows,
      }}
      contracts={{
        activeContracts,
        activeContractValue,
        totalContracts,
      }}
      technicians={{
        techList,
      }}
    />
  )
}
