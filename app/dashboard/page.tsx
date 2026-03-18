import { MorningHuddle } from '@/components/dashboard/MorningHuddle'
import { WebsiteHealthScores } from '@/components/dashboard/WebsiteHealthScores'
import {
  demoDashboardKPIs,
  demoWorkOrders,
  demoRecentActivity,
  websiteHealthScores,
} from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  // Always use demo data for now — Supabase connection optional
  const workOrders = demoWorkOrders.map((wo) => ({
    id: wo.id,
    busNumber: wo.vin,
    status: wo.status,
    technician: wo.techAssigned ?? '',
    dueDate: wo.targetDate
      ? new Date(wo.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : '',
  }))

  const urgentItems: Array<{
    type: string
    label: string
    detail: string
    href: string
    level: string
  }> = []

  const qaHolds = demoWorkOrders.filter((wo) => wo.status === 'qa_hold')
  qaHolds.forEach((wo) => {
    urgentItems.push({
      type: 'qa_hold',
      label: `QA Hold — Bus ${wo.vin}`,
      detail: 'Review quality issues before proceeding',
      href: '/dashboard/work-orders',
      level: 'critical',
    })
  })

  const overdueInvoices = 1 // demoInvoices has 1 overdue
  if (overdueInvoices > 0) {
    urgentItems.push({
      type: 'invoices',
      label: `${overdueInvoices} Overdue Invoice`,
      detail: 'Long Beach Transit — INV-2026-002 — $187,500',
      href: '/dashboard/finance',
      level: 'warning',
    })
  }

  return (
    <div className="space-y-8">
      <MorningHuddle
        data={{
          workOrders,
          urgentItems,
          stats: {
            busesInProduction: demoDashboardKPIs.busesInProduction,
            pipelineValue: demoDashboardKPIs.pipelineValue,
            overdueInvoices,
            openWorkOrders: demoWorkOrders.filter(
              (wo) => wo.status !== 'delivered' && wo.status !== 'complete'
            ).length,
            deliveriesThisWeek: 1,
          },
        }}
      />
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Website Health Scores</h2>
          <span className="text-xs text-slate-400">Updated {websiteHealthScores.lastUpdated} · Hover each for detail</span>
        </div>
        <WebsiteHealthScores data={websiteHealthScores} />
      </section>
    </div>
  )
}
