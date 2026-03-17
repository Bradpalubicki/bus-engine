import { Building2, AlertTriangle } from 'lucide-react'
import { demoVendors } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

const statusColors: Record<string, string> = {
  active:       'bg-green-100 text-green-700',
  inactive:     'bg-gray-100 text-gray-500',
  under_review: 'bg-amber-100 text-amber-700',
}

const categoryLabels: Record<string, string> = {
  parts_supplier:   'Parts Supplier',
  subcontractor:    'Subcontractor',
  service_provider: 'Service Provider',
  equipment:        'Equipment',
}

export default async function VendorsPage() {
  const underReview = demoVendors.filter(v => v.status === 'under_review')
  const expiringSoon = demoVendors.filter(v => {
    if (!v.contract_end) return false
    const days = Math.ceil((new Date(v.contract_end).getTime() - Date.now()) / 86400000)
    return days >= 0 && days <= 60
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Vendor Management</h1>
          <p className="text-gray-500 text-sm">{demoVendors.length} vendors · {demoVendors.filter(v => v.status === 'active').length} active</p>
        </div>
        <button className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors">
          + Add Vendor
        </button>
      </div>

      {/* Alerts */}
      {(underReview.length > 0 || expiringSoon.length > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-bold text-amber-900">Attention Required</div>
            {underReview.map(v => (
              <div key={v.id} className="text-sm text-amber-700">{v.name} — under review</div>
            ))}
            {expiringSoon.map(v => {
              const days = Math.ceil((new Date(v.contract_end!).getTime() - Date.now()) / 86400000)
              return (
                <div key={v.id} className="text-sm text-amber-700">{v.name} contract expires in {days} days</div>
              )
            })}
          </div>
        </div>
      )}

      {/* Vendor Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#003087]" />
          <h2 className="font-bold text-gray-900">All Vendors</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vendor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Contact</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Contract Value</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Contract Ends</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {demoVendors.map(vendor => {
              const sc = statusColors[vendor.status] ?? 'bg-gray-100 text-gray-600'
              const daysLeft = vendor.contract_end
                ? Math.ceil((new Date(vendor.contract_end).getTime() - Date.now()) / 86400000)
                : null
              const isExpiring = daysLeft !== null && daysLeft >= 0 && daysLeft <= 60
              return (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{vendor.name}</td>
                  <td className="px-4 py-3 text-gray-600">{categoryLabels[vendor.category] ?? vendor.category}</td>
                  <td className="px-4 py-3 text-gray-500">{vendor.contact_name ?? '—'}</td>
                  <td className="px-4 py-3 font-bold text-gray-800">
                    {vendor.contract_value ? `$${(vendor.contract_value / 1000000).toFixed(1)}M` : '—'}
                  </td>
                  <td className={`px-4 py-3 ${isExpiring ? 'text-amber-700 font-bold' : 'text-gray-500'}`}>
                    {vendor.contract_end
                      ? new Date(vendor.contract_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}
                    {isExpiring && <span className="ml-1 text-xs">({daysLeft}d)</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold capitalize ${sc}`}>
                      {vendor.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
          DEMO — Connect to Sage Intacct for live vendor payment history and AP aging.
        </div>
      </div>
    </div>
  )
}
