import { redirect } from 'next/navigation'

export default function TSIDashboardRedirect() {
  // TSI uses the main inventory dashboard
  redirect('/dashboard/inventory')
}
