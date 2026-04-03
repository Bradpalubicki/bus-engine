import { redirect } from 'next/navigation'

export default function SBLDashboardRedirect() {
  // SBL uses the leases dashboard
  redirect('/dashboard/leases')
}
