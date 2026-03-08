'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function movePipelineStage(id: string, status: string) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_rfp_pipeline').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/pipeline')
}

export async function addOpportunity(data: {
  agency_name: string
  rfp_title: string
  est_value?: number
  deadline?: string
  win_probability?: number
  bd_owner?: string
  source?: string
  notes?: string
}) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_rfp_pipeline').insert({
    agency_name: data.agency_name,
    rfp_title: data.rfp_title,
    est_value: data.est_value || null,
    deadline: data.deadline || null,
    win_probability: data.win_probability ?? 50,
    bd_owner: data.bd_owner || null,
    source: data.source || null,
    notes: data.notes || null,
    status: 'opportunity',
  })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/pipeline')
}
