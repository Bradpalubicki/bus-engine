'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addPart(data: {
  part_number: string
  description: string
  category?: string
  unit_cost?: number
  supplier_name?: string
  location_id: string
  reorder_point?: number
  reorder_qty?: number
}) {
  const supabase = createClient()
  const { data: part, error: partError } = await supabase.from('bus_parts').insert({
    part_number: data.part_number,
    description: data.description,
    category: data.category || null,
    unit_cost: data.unit_cost || null,
    supplier_name: data.supplier_name || null,
    active: true,
  }).select().single()
  if (partError) throw new Error(partError.message)

  const { error: invError } = await supabase.from('bus_inventory').insert({
    part_id: part.id,
    location_id: data.location_id,
    quantity_on_hand: 0,
    reorder_point: data.reorder_point || 5,
    reorder_qty: data.reorder_qty || 10,
  })
  if (invError) throw new Error(invError.message)
  revalidatePath('/dashboard/parts')
}

export async function receiveStock(data: {
  part_id: string
  location_id: string
  qty: number
  reference?: string
}) {
  const supabase = createClient()
  const { error: txnError } = await supabase.from('bus_inventory_txns').insert({
    part_id: data.part_id,
    location_id: data.location_id,
    quantity: data.qty,
    txn_type: 'receive',
    reference: data.reference || null,
  })
  if (txnError) throw new Error(txnError.message)

  const { data: inv } = await supabase.from('bus_inventory')
    .select('id, quantity_on_hand')
    .eq('part_id', data.part_id)
    .eq('location_id', data.location_id)
    .single()

  if (inv) {
    await supabase.from('bus_inventory').update({
      quantity_on_hand: (inv.quantity_on_hand ?? 0) + data.qty
    }).eq('id', inv.id)
  }
  revalidatePath('/dashboard/parts')
}

export async function logUsage(data: {
  part_id: string
  location_id: string
  qty: number
  work_order_id?: string
}) {
  const supabase = createClient()
  const { error: txnError } = await supabase.from('bus_inventory_txns').insert({
    part_id: data.part_id,
    location_id: data.location_id,
    quantity: -data.qty,
    txn_type: 'use',
    work_order_id: data.work_order_id || null,
  })
  if (txnError) throw new Error(txnError.message)

  const { data: inv } = await supabase.from('bus_inventory')
    .select('id, quantity_on_hand')
    .eq('part_id', data.part_id)
    .eq('location_id', data.location_id)
    .single()

  if (inv) {
    await supabase.from('bus_inventory').update({
      quantity_on_hand: Math.max(0, (inv.quantity_on_hand ?? 0) - data.qty)
    }).eq('id', inv.id)
  }
  revalidatePath('/dashboard/parts')
}
