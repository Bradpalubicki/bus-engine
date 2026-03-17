interface SAMGovBadgeProps {
  uei: string
  cage: string
  expiryDate: string
  naicsCodes: string[]
}

export default function SAMGovBadge({ uei, cage, expiryDate, naicsCodes }: SAMGovBadgeProps) {
  const expiry = new Date(expiryDate)
  const today = new Date()
  const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const isExpiringSoon = daysUntilExpiry < 90

  return (
    <div className="bg-[#003087] text-white rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">SAM.gov Registration</div>
          <div className="text-2xl font-bold">Active Federal Registration</div>
        </div>
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">ACTIVE</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="text-xs text-blue-300 mb-1">UEI</div>
          <div className="font-bold font-mono text-sm">{uei}</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <div className="text-xs text-blue-300 mb-1">CAGE Code</div>
          <div className="font-bold font-mono text-sm">{cage}</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <div className="text-xs text-blue-300 mb-1">Registration Expiry</div>
          <div className={`font-bold text-sm ${isExpiringSoon ? 'text-yellow-300' : 'text-white'}`}>
            {expiry.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {isExpiringSoon && ' ⚠️'}
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <div className="text-xs text-blue-300 mb-1">Status</div>
          <div className="font-bold text-green-300 text-sm">SAM Registered ✓</div>
        </div>
      </div>
      <div>
        <div className="text-xs text-blue-300 mb-2 font-bold uppercase tracking-wider">NAICS Codes</div>
        <div className="flex flex-wrap gap-2">
          {naicsCodes.map(code => (
            <span key={code} className="bg-white/10 rounded-lg px-3 py-1 text-sm font-mono">{code}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
