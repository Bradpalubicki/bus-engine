export const vehicleStatusColors: Record<string, string> = {
  intake: 'bg-gray-100 text-gray-700',
  queued: 'bg-gray-200 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  qa_hold: 'bg-amber-100 text-amber-800',
  complete: 'bg-green-100 text-green-800',
  delivered: 'bg-[#003087] text-white',
}

export const vehicleStatusLabel: Record<string, string> = {
  intake: 'Intake',
  queued: 'Queued',
  in_progress: 'In Progress',
  qa_hold: 'QA Hold',
  complete: 'Complete',
  delivered: 'Delivered',
}

export const woStatusColors: Record<string, string> = {
  queued: 'bg-gray-200 text-gray-800 border-gray-300',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  qa_hold: 'bg-amber-100 text-amber-800 border-amber-200',
  complete: 'bg-green-100 text-green-800 border-green-200',
  delivered: 'bg-[#003087] text-white border-[#003087]',
}

export const fuelColors: Record<string, string> = {
  diesel: 'bg-gray-100 text-gray-700',
  cng: 'bg-blue-100 text-blue-700',
  lng: 'bg-cyan-100 text-cyan-700',
  hybrid: 'bg-green-100 text-green-700',
  electric: 'bg-emerald-100 text-emerald-700',
}

export function formatMoney(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`
  return `$${v}`
}

export function formatCurrency(v: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(v)
}

export function daysFromNow(dateStr: string) {
  const ms = new Date(dateStr).getTime() - Date.now()
  return Math.ceil(ms / 86_400_000)
}

export function daysAgo(dateStr: string | null | undefined) {
  if (!dateStr) return null
  const ms = Date.now() - new Date(dateStr).getTime()
  return Math.floor(ms / 86_400_000)
}
