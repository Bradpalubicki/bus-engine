import { createClient } from '@/lib/supabase/server'
import { WorkOrdersClient } from '@/components/dashboard/WorkOrdersClient'
import type { Database } from '@/lib/database.types'

type WorkOrder = Database['public']['Tables']['bus_work_orders']['Row']
type Vehicle = Database['public']['Tables']['bus_vehicles']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']

export default async function WorkOrdersPage() {
  const supabase = createClient()

  const [workOrdersResult, vehiclesResult, locationsResult, agenciesResult] = await Promise.all([
    supabase.from('bus_work_orders').select('*').order('opened_at', { ascending: false }),
    supabase.from('bus_vehicles').select('*').order('vin'),
    supabase.from('bus_locations').select('*').eq('active', true).order('name'),
    supabase.from('bus_agencies').select('*'),
  ])

  return (
    <WorkOrdersClient
      workOrders={(workOrdersResult.data ?? []) as WorkOrder[]}
      vehicles={(vehiclesResult.data ?? []) as Vehicle[]}
      locations={(locationsResult.data ?? []) as Location[]}
      agencies={(agenciesResult.data ?? []) as Agency[]}
    />
  )
}
