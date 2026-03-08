import { createClient } from '@/lib/supabase/server'
import { PartsClient } from '@/components/dashboard/PartsClient'
import type { Database } from '@/lib/database.types'

type Part = Database['public']['Tables']['bus_parts']['Row']
type Inventory = Database['public']['Tables']['bus_inventory']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']

export default async function PartsPage() {
  const supabase = createClient()

  const [partsResult, inventoryResult, locationsResult] = await Promise.all([
    supabase.from('bus_parts').select('*').eq('active', true).order('description'),
    supabase.from('bus_inventory').select('*'),
    supabase.from('bus_locations').select('*').eq('active', true).order('name'),
  ])

  return (
    <PartsClient
      parts={(partsResult.data ?? []) as Part[]}
      inventory={(inventoryResult.data ?? []) as Inventory[]}
      locations={(locationsResult.data ?? []) as Location[]}
    />
  )
}
