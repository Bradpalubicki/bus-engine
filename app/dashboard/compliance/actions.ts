'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markCCWSigned(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_compliance_docs').update({ ccw_signed_at: new Date().toISOString() }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/compliance')
}

export async function markAgencySigned(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_compliance_docs').update({ agency_signed_at: new Date().toISOString() }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/compliance')
}

export async function updateDocStatus(id: string, status: string) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_compliance_docs').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/compliance')
}
