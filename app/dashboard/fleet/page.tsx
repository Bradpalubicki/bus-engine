import { createClient } from '@/lib/supabase/server'
import { FleetClient } from '@/components/dashboard/FleetClient'
import type { Database } from '@/lib/database.types'

type Vehicle = Database['public']['Tables']['bus_vehicles']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']
type Contract = Database['public']['Tables']['bus_contracts']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']

export default async function FleetPage() {
  const supabase = createClient()

  const [vehiclesResult, agenciesResult, contractsResult, locationsResult] = await Promise.all([
    supabase.from('bus_vehicles').select('*').order('created_at', { ascending: false }),
    supabase.from('bus_agencies').select('*').order('name'),
    supabase.from('bus_contracts').select('*').order('contract_number'),
    supabase.from('bus_locations').select('*').eq('active', true).order('name'),
  ])

  return (
    <FleetClient
      vehicles={(vehiclesResult.data ?? []) as Vehicle[]}
      agencies={(agenciesResult.data ?? []) as Agency[]}
      contracts={(contractsResult.data ?? []) as Contract[]}
      locations={(locationsResult.data ?? []) as Location[]}
    />
  )
}
