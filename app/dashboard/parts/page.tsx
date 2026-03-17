import { PartsClient } from '@/components/dashboard/PartsClient'
import { demoParts, demoLocations } from '@/lib/demo-data'
import type { Database } from '@/lib/database.types'

type Part = Database['public']['Tables']['bus_parts']['Row']
type Inventory = Database['public']['Tables']['bus_inventory']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']

export default async function PartsPage() {
  const parts: Part[] = demoParts.map((p) => ({
    id: p.id,
    part_number: p.partNumber,
    description: p.description,
    category: p.category,
    supplier_name: p.supplier,
    unit_cost: p.unitCost,
    active: true,
    created_at: null,
  }))

  // Build inventory records from demo parts (one record per part at loc-1)
  const inventory: Inventory[] = demoParts.map((p) => ({
    id: `inv-${p.id}`,
    part_id: p.id,
    location_id: 'loc-1',
    quantity_on_hand: p.qtyOnHand,
    reorder_point: p.reorderPoint,
    reorder_qty: p.reorderPoint * 2,
  }))

  const locations: Location[] = demoLocations.slice(0, 5).map((l) => ({
    id: l.id,
    name: l.name,
    city: l.city,
    state: l.state,
    address: l.address,
    phone: l.phone,
    type: l.type,
    active: true,
    created_at: null,
  }))

  return (
    <PartsClient
      parts={parts}
      inventory={inventory}
      locations={locations}
    />
  )
}
