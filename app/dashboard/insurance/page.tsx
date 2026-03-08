import { createClient } from '@/lib/supabase/server'
import { AlertTriangle, Shield, Plus } from 'lucide-react'
import { daysFromNow, formatMoney } from '@/lib/status-colors'

export const dynamic = 'force-dynamic'

export default async function InsurancePage() {
  const supabase = createClient()

  const { data: policies } = await supabase
    .from('bus_insurance_policies')
    .select('*')
    .order('expiry_date')

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Insurance Policies</h1>
          <p className="text-gray-500 text-sm">{policies?.length ?? 0} policies on file</p>
        </div>
        <Shield className="w-8 h-8 text-[#003087]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(policies ?? []).map(policy => {
          const daysLeft = policy.expiry_date ? daysFromNow(policy.expiry_date) : null
          const isExpired = daysLeft !== null && daysLeft < 0
          const isCritical = daysLeft !== null && daysLeft >= 0 && daysLeft < 30
          const isWarning = daysLeft !== null && daysLeft >= 30 && daysLeft < 90

          return (
            <div key={policy.id} className={`bg-white rounded-xl border shadow-sm p-5 ${
              isExpired ? 'border-red-400 bg-red-50/30' :
              isCritical ? 'border-red-300 bg-red-50/20' :
              isWarning ? 'border-amber-300 bg-amber-50/20' :
              'border-gray-100'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    {(isExpired || isCritical) && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {isWarning && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    <h2 className="font-bold text-[#003087]">{policy.policy_type}</h2>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{policy.carrier} · #{policy.policy_number}</div>
                </div>
                <div className="text-right">
                  {daysLeft !== null && (
                    <div className={`text-sm font-bold ${isExpired ? 'text-red-600' : isCritical ? 'text-red-500' : isWarning ? 'text-amber-600' : 'text-green-600'}`}>
                      {isExpired ? `Expired ${Math.abs(daysLeft)}d ago` : `${daysLeft} days left`}
                    </div>
                  )}
                  {(isExpired || isCritical) && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">ACTION REQUIRED</span>
                  )}
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Status', policy.status ?? '—'],
                  ['Coverage Limit', policy.coverage_limit ? formatMoney(policy.coverage_limit) : '—'],
                  ['Effective Date', policy.effective_date ? new Date(policy.effective_date).toLocaleDateString() : '—'],
                  ['Expiry Date', policy.expiry_date ? new Date(policy.expiry_date).toLocaleDateString() : '—'],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <dt className="text-xs text-gray-500">{label}</dt>
                    <dd className="font-medium text-gray-800">{value}</dd>
                  </div>
                ))}
              </dl>

              {policy.notes && (
                <p className="mt-3 text-xs text-gray-500 italic border-t border-gray-100 pt-3">{policy.notes}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
