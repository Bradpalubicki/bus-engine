import { ComingSoon } from '@/components/dashboard/ComingSoon'

export const metadata = {
  title: 'Analytics | Complete Coach Works',
}

export default function AnalyticsPage() {
  return (
    <ComingSoon
      title="Analytics"
      description="Production throughput, revenue by contract, on-time delivery rates, and fleet utilization metrics — all in one place."
      eta="Coming soon"
      actionLabel="View Work Orders"
      actionHref="/dashboard/work-orders"
    />
  )
}
