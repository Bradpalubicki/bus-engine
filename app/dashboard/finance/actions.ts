'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createInvoice(data: {
  contract_id: string
  amount: number
  invoice_type?: string
  due_date?: string
  notes?: string
}) {
  const supabase = createClient()
  const count = await supabase.from('bus_invoices').select('id', { count: 'exact', head: true })
  const num = `INV-${String((count.count ?? 0) + 1).padStart(4, '0')}`
  const { error } = await supabase.from('bus_invoices').insert({
    contract_id: data.contract_id,
    amount: data.amount,
    invoice_type: data.invoice_type || 'milestone',
    due_date: data.due_date || null,
    notes: data.notes || null,
    invoice_number: num,
    status: 'draft',
    issued_at: new Date().toISOString(),
  })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/finance')
}

export async function updateInvoiceStatus(id: string, status: string) {
  const supabase = createClient()
  const updates: Record<string, string | null> = { status }
  if (status === 'paid') updates.paid_at = new Date().toISOString()
  const { error } = await supabase.from('bus_invoices').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/finance')
}
