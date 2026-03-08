import { createClient } from '@/lib/supabase/server'
import { PipelineClient } from '@/components/dashboard/PipelineClient'

export default async function PipelinePage() {
  const supabase = createClient()
  const { data: pipeline } = await supabase
    .from('bus_rfp_pipeline')
    .select('*')
    .order('created_at', { ascending: false })

  return <PipelineClient opportunities={pipeline ?? []} />
}
