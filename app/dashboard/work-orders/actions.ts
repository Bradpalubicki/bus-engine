'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createWorkOrder(data: {
  vehicle_id: string
  service_type: string
  location_id: string
  target_date?: string
  notes?: string
}) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_work_orders').insert({
    vehicle_id: data.vehicle_id,
    service_type: data.service_type,
    location_id: data.location_id,
    target_date: data.target_date || null,
    notes: data.notes || null,
    status: 'queued',
    opened_at: new Date().toISOString(),
  })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/work-orders')
}

export async function updateWOStatus(id: string, status: string) {
  const supabase = createClient()
  const updates: Record<string, string | null> = { status }
  if (status === 'delivered') updates.closed_at = new Date().toISOString()
  const { error } = await supabase.from('bus_work_orders').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/work-orders')
  revalidatePath(`/dashboard/work-orders/${id}`)
}

export async function addLineItem(woId: string, data: {
  description: string
  service_type?: string
  est_hours?: number
}) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_wo_line_items').insert({
    work_order_id: woId,
    description: data.description,
    service_type: data.service_type || null,
    est_hours: data.est_hours || null,
    status: 'pending',
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/work-orders/${woId}`)
}

export async function logTime(woId: string, data: {
  log_date: string
  hours: number
  technician_name?: string
  notes?: string
}) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_wo_time_logs').insert({
    work_order_id: woId,
    log_date: data.log_date,
    hours: data.hours,
    technician_name: data.technician_name || null,
    notes: data.notes || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/work-orders/${woId}`)
}

export async function updateQACheckpoint(id: string, status: string, notes?: string) {
  const supabase = createClient()
  const updates: Record<string, string | null> = { status }
  if (status === 'pass') updates.signed_at = new Date().toISOString()
  if (notes) updates.notes = notes
  const { error } = await supabase.from('bus_qa_checkpoints').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
  const { data: cp } = await supabase.from('bus_qa_checkpoints').select('work_order_id').eq('id', id).single()
  if (cp?.work_order_id) revalidatePath(`/dashboard/work-orders/${cp.work_order_id}`)
}

export async function updateWONotes(id: string, notes: string) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_work_orders').update({ notes }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/work-orders/${id}`)
}

export async function assignTechnician(woId: string, techId: string) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_wo_assignments').insert({
    work_order_id: woId,
    technician_id: techId,
    assigned_at: new Date().toISOString(),
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/work-orders/${woId}`)
}
