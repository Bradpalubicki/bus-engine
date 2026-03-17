import { FleetClient } from '@/components/dashboard/FleetClient'
import { demoVehicles, demoAgencies, demoContracts, demoLocations } from '@/lib/demo-data'

export default async function FleetPage() {
  const vehicles = demoVehicles.map((v) => ({
    id: v.id,
    vin: v.vin,
    agency_id: v.agencyId,
    contract_id: v.contractId,
    location_id: v.locationId,
    make: v.make,
    model: v.model,
    year: v.year,
    length_ft: v.lengthFt,
    fuel_type: v.fuelType,
    status: v.status,
    intake_date: v.intakeDate,
    target_completion: v.targetCompletion,
    delivered_at: v.deliveredAt ?? null,
    notes: null,
    warranty_expiry: null,
    created_at: v.intakeDate,
  }))

  const agencies = demoAgencies.map((a) => ({
    id: a.id,
    name: a.name,
    state: a.state,
    contact_name: a.contact,
    contact_email: a.email,
    contact_phone: null,
    clerk_org_id: null,
    created_at: null,
  }))

  const contracts = demoContracts.map((c) => ({
    id: c.id,
    contract_number: c.contractNumber,
    agency_id: c.agencyId,
    title: c.title,
    value: c.value,
    bus_count: c.busCount,
    start_date: c.startDate,
    end_date: c.endDate,
    status: c.status,
    estimated_total_cost: c.estimatedTotalCost,
    costs_incurred: c.costsIncurred,
    revenue_recognized: c.revenueEarned,
    notes: null,
    created_at: c.startDate,
  }))

  const locations = demoLocations.map((l) => ({
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
    <FleetClient
      vehicles={vehicles}
      agencies={agencies}
      contracts={contracts}
      locations={locations}
    />
  )
}
