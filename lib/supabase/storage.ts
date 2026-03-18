'use server'
import { createClient } from '@/lib/supabase/server'

const BUCKET = 'bus-engine'

export async function uploadInspectionPhoto(
  formData: FormData,
  vehicleId: string,
  inspectionId: string,
  itemSlug: string
): Promise<{ url: string | null; error: string | null }> {
  const file = formData.get('photo') as File
  if (!file) return { url: null, error: 'No file provided' }

  try {
    const supabase = await createClient()
    const ext = file.name.split('.').pop() || 'jpg'
    const path = `inspections/${vehicleId}/${inspectionId}/${itemSlug}-${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: true })

    if (error) return { url: null, error: error.message }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
    return { url: urlData.publicUrl, error: null }
  } catch (err) {
    return { url: null, error: err instanceof Error ? err.message : 'Upload failed' }
  }
}
