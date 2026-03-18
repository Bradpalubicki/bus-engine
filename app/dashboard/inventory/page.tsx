import { InventoryManagerClient } from '@/components/dashboard/InventoryManagerClient'
import { demoTSIInventory } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  // Map demo TSI inventory to the shape expected by the client
  const tsiInventory = demoTSIInventory.map(b => ({
    id: b.id,
    brand: 'TSI' as const,
    year: b.year,
    make: b.make,
    model: b.model,
    vin: null,
    length_ft: b.length,
    fuel_type: b.fuelType,
    seats: b.seats,
    mileage: b.mileage,
    condition: b.condition,
    price: b.price,
    price_display: null,
    description: null,
    features: [],
    photos: [],
    primary_photo_url: null,
    status: b.status === 'available' ? 'active' : b.status,
    sbl_lease_type: null,
    sbl_min_term_months: null,
    created_at: null,
    updated_at: null,
    published_at: null,
    sold_at: null,
  }))

  // Demo SBL lease fleet
  const sblInventory = [
    { id: 101, brand: 'SBL' as const, year: 2018, make: 'MCI', model: 'D4500CT', vin: null, length_ft: 45, fuel_type: 'diesel', seats: 55, mileage: 210000, condition: 'refurbished', price: null, price_display: 'From $4,800/mo', description: 'Charter coach, executive seating', features: ['WiFi', 'Restroom', 'PA System'], photos: [], primary_photo_url: null, status: 'active', sbl_lease_type: 'contract', sbl_min_term_months: 6, created_at: null, updated_at: null, published_at: null, sold_at: null },
    { id: 102, brand: 'SBL' as const, year: 2016, make: 'Gillig', model: 'Low Floor', vin: null, length_ft: 40, fuel_type: 'cng', seats: 40, mileage: 285000, condition: 'refurbished', price: null, price_display: 'From $2,800/mo', description: 'Fixed-route transit lease', features: ['ADA Lift', 'AC', 'Fareboxes'], photos: [], primary_photo_url: null, status: 'active', sbl_lease_type: 'gap', sbl_min_term_months: 3, created_at: null, updated_at: null, published_at: null, sold_at: null },
    { id: 103, brand: 'SBL' as const, year: 2020, make: 'Starcraft', model: 'Allstar', vin: null, length_ft: 30, fuel_type: 'gasoline', seats: 24, mileage: 95000, condition: 'refurbished', price: null, price_display: 'From $1,400/mo', description: 'Employee/shuttle lease', features: ['AC', 'Luggage'], photos: [], primary_photo_url: null, status: 'active', sbl_lease_type: 'shuttle', sbl_min_term_months: 1, created_at: null, updated_at: null, published_at: null, sold_at: null },
  ]

  const allInventory = [...tsiInventory, ...sblInventory]

  return (
    <InventoryManagerClient inventory={allInventory} />
  )
}
