'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addVehicle(data: {
  vin: string
  make: string
  model: string
  year: number
  fuel_type: string
  agency_id: string
  contract_id?: string
  location_id: string
  intake_date: string
  target_completion?: string
}) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_vehicles').insert({
    vin: data.vin,
    make: data.make,
    model: data.model,
    year: data.year,
    fuel_type: data.fuel_type,
    agency_id: data.agency_id,
    contract_id: data.contract_id || null,
    location_id: data.location_id,
    intake_date: data.intake_date,
    target_completion: data.target_completion || null,
    status: 'intake',
  })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/fleet')
}

export async function updateVehicleStatus(id: string, status: string) {
  const supabase = createClient()
  const updates: Record<string, string | null> = { status }
  if (status === 'delivered') updates.delivered_at = new Date().toISOString()
  const { error } = await supabase.from('bus_vehicles').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/fleet')
  revalidatePath(`/dashboard/fleet/${id}`)
}
