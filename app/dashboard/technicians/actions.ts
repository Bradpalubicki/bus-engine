'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addCertification(techId: string, data: {
  cert_type: string
  cert_number?: string
  issued_date?: string
  expiry_date?: string
}) {
  const supabase = createClient()
  const { error } = await supabase.from('bus_certifications').insert({
    technician_id: techId,
    cert_type: data.cert_type,
    cert_number: data.cert_number || null,
    issued_date: data.issued_date || null,
    expiry_date: data.expiry_date || null,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/technicians/${techId}`)
}
