import { createClient } from '@/lib/supabase/server'
import { MorningHuddle } from '@/components/dashboard/MorningHuddle'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createClient()
  const today = new Date().toISOString().split('T')[0]
  const weekEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  /* eslint-disable @typescript-eslint/no-explicit-any */
  try {
    const [
      workOrdersRes,
      overdueInvoicesRes,
      pipelineRes,
      deliveriesRes,
    ] = await Promise.all([
      supabase
        .from('bus_work_orders')
        .select('id, status, bus_id, opened_at, due_date, technician_id, bus_vehicles(unit_number), bus_technicians(first_name, last_name)')
        .neq('status', 'delivered')
        .neq('status', 'complete')
        .order('opened_at', { ascending: false })
        .limit(20),
      supabase
        .from('bus_invoices')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'overdue'),
      supabase
        .from('bus_rfp_pipeline')
        .select('est_value, status')
        .neq('status', 'lost'),
      supabase
        .from('bus_contracts')
        .select('id', { count: 'exact', head: true })
        .gte('delivery_date', today)
        .lte('delivery_date', weekEnd),
    ])

    const workOrders = (workOrdersRes.data || []).map((wo: any) => ({
      id: wo.id as string,
      busNumber: (wo.bus_vehicles as any)?.unit_number || wo.bus_id || 'Unknown',
      status: wo.status as string,
      technician: wo.bus_technicians
        ? `${(wo.bus_technicians as any).first_name} ${(wo.bus_technicians as any).last_name}`
        : '',
      dueDate: wo.due_date ? new Date(wo.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
    }))

    const overdueInvoices = overdueInvoicesRes.count || 0
    const pipelineValue = (pipelineRes.data || []).reduce(
      (sum: number, p: any) => sum + (Number(p.est_value) || 0),
      0
    )
    const deliveriesThisWeek = deliveriesRes.count || 0

    // Bus vehicles in production = work orders that are active (not complete/delivered)
    const busesInProduction = new Set(workOrders.map((wo) => wo.busNumber)).size

    const urgentItems: Array<{ type: string; label: string; detail: string; href: string; level: string }> = []

    const qaHold = workOrders.filter((wo) => wo.status === 'qa_hold')
    qaHold.forEach((wo) => {
      urgentItems.push({
        type: 'qa_hold',
        label: `QA Hold — Bus ${wo.busNumber}`,
        detail: 'Review quality issues before proceeding',
        href: '/dashboard/work-orders',
        level: 'critical',
      })
    })

    if (overdueInvoices > 0) {
      urgentItems.push({
        type: 'invoices',
        label: `${overdueInvoices} Overdue Invoice${overdueInvoices !== 1 ? 's' : ''}`,
        detail: 'Follow up on outstanding payments',
        href: '/dashboard/finance',
        level: 'warning',
      })
    }

    const pendingParts = workOrders.filter((wo) => wo.status === 'pending_parts')
    if (pendingParts.length > 0) {
      urgentItems.push({
        type: 'parts',
        label: `${pendingParts.length} Work Order${pendingParts.length !== 1 ? 's' : ''} Waiting on Parts`,
        detail: pendingParts.map((wo) => `Bus ${wo.busNumber}`).join(', '),
        href: '/dashboard/parts',
        level: 'info',
      })
    }

    const levelOrder: Record<string, number> = { critical: 0, warning: 1, info: 2 }
    urgentItems.sort((a, b) => (levelOrder[a.level] ?? 2) - (levelOrder[b.level] ?? 2))

    return (
      <MorningHuddle
        data={{
          workOrders,
          urgentItems,
          stats: {
            busesInProduction,
            pipelineValue,
            overdueInvoices,
            openWorkOrders: workOrders.length,
            deliveriesThisWeek,
          },
        }}
      />
    )
  } catch {
    return (
      <MorningHuddle
        data={{
          workOrders: [],
          urgentItems: [],
          stats: {
            busesInProduction: 0,
            pipelineValue: 0,
            overdueInvoices: 0,
            openWorkOrders: 0,
            deliveriesThisWeek: 0,
          },
        }}
      />
    )
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
