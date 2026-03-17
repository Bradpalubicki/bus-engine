import { PipelineClient } from '@/components/dashboard/PipelineClient'
import { demoPipeline } from '@/lib/demo-data'

export default async function PipelinePage() {
  const opportunities = demoPipeline.map((p) => ({
    id: p.id,
    agency_name: p.agencyName,
    rfp_title: p.rfpTitle,
    est_value: p.estValue,
    deadline: p.deadline,
    win_probability: p.winProbability,
    bd_owner: p.bdOwner,
    status: p.status,
    notes: null,
  }))

  return <PipelineClient opportunities={opportunities} />
}
