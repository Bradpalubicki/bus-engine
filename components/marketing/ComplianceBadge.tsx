interface ComplianceBadgeProps {
  label: string
  status?: 'compliant' | 'registered' | 'certified' | 'member'
  citation?: string
}

export default function ComplianceBadge({ label, status = 'compliant', citation }: ComplianceBadgeProps) {
  const statusConfig = {
    compliant: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-500', label: 'Compliant' },
    registered: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Registered' },
    certified: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-500', label: 'Certified' },
    member: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Member' },
  }
  const config = statusConfig[status]

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.bg} ${config.border}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className={`text-sm font-bold ${config.text}`}>{label}</span>
      {citation && <span className={`text-xs ${config.text} opacity-70`}>· {citation}</span>}
    </div>
  )
}
