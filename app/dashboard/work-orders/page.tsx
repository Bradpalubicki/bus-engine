import { WorkOrdersClient } from '@/components/dashboard/WorkOrdersClient'
import { demoWorkOrders, demoVehicles, demoLocations, demoAgencies } from '@/lib/demo-data'
import type { Database } from '@/lib/database.types'

type WorkOrder = Database['public']['Tables']['bus_work_orders']['Row']
type Vehicle = Database['public']['Tables']['bus_vehicles']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']
type Agency = Database['public']['Tables']['bus_agencies']['Row']

export default async function WorkOrdersPage() {
  const workOrders: WorkOrder[] = demoWorkOrders.map((wo) => ({
    id: wo.id,
    wo_number: wo.woNumber,
    vehicle_id: wo.vehicleId,
    contract_id: wo.contractId,
    location_id: wo.locationId,
    service_type: wo.serviceType,
    status: wo.status,
    priority: null,
    notes: null,
    opened_at: wo.openedAt,
    target_date: wo.targetDate,
    completed_at: null,
    closed_at: null,
    created_at: wo.openedAt,
  }))

  const vehicles: Vehicle[] = demoVehicles.map((v) => ({
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

  const locations: Location[] = demoLocations.map((l) => ({
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

  const agencies: Agency[] = demoAgencies.map((a) => ({
    id: a.id,
    name: a.name,
    state: a.state,
    contact_name: a.contact,
    contact_email: a.email,
    contact_phone: null,
    clerk_org_id: null,
    created_at: null,
  }))

  return (
    <WorkOrdersClient
      workOrders={workOrders}
      vehicles={vehicles}
      locations={locations}
      agencies={agencies}
    />
  )
}
