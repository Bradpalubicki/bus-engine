'use client'

import { useState } from 'react'
import { Truck, DollarSign, Calendar, AlertTriangle } from 'lucide-react'
import { demoSBLLeases, demoSBLFleetUtilization } from '@/lib/demo-data'

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  upcoming: 'bg-blue-100 text-blue-700',
  expired: 'bg-gray-100 text-gray-500',
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function LeasesPage() {
  const [activeTab, setActiveTab] = useState<'leases' | 'utilization'>('leases')

  const totalMonthly = demoSBLLeases
    .filter(l => l.status === 'active')
    .reduce((s, l) => s + l.monthlyPayment, 0)
  const activeCount = demoSBLLeases.filter(l => l.status === 'active').length
  const onLeaseCount = demoSBLFleetUtilization.filter(v => v.status === 'on_lease').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Active Leases</h1>
          <p className="text-gray-500 text-sm">SBL fleet leasing · {activeCount} active leases · {fmt(totalMonthly)}/mo recurring</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Leases', value: activeCount, icon: Truck, color: 'text-[#003087]' },
          { label: 'Monthly Revenue', value: fmt(totalMonthly), icon: DollarSign, color: 'text-green-600' },
          { label: 'Buses On Lease', value: onLeaseCount, icon: Truck, color: 'text-blue-600' },
          { label: 'Available Units', value: demoSBLFleetUtilization.filter(v => v.status === 'available').length, icon: Calendar, color: 'text-amber-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(['leases', 'utilization'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${activeTab === t ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500'}`}>
            {t === 'leases' ? 'Active Leases' : 'Fleet Utilization'}
          </button>
        ))}
      </div>

      {activeTab === 'leases' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F9FB] border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Lessee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fleet</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Monthly</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Term</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Days Left</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {demoSBLLeases.map(lease => (
                <tr key={lease.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">{lease.lessee}</td>
                  <td className="px-4 py-3">
                    <div className="text-gray-700">{lease.busCount} × {lease.busType}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-700">{fmt(lease.monthlyPayment)}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-500">{lease.startDate} → {lease.endDate}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-bold ${lease.daysRemaining <= 30 ? 'text-amber-600' : 'text-gray-700'}`}>
                      {lease.daysRemaining}d
                      {lease.daysRemaining <= 30 && <AlertTriangle className="w-3 h-3 inline ml-1" />}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold capitalize ${STATUS_COLORS[lease.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {lease.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'utilization' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F9FB] border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">VIN</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Current Lessee</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Utilization</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {demoSBLFleetUtilization.map(v => (
                <tr key={v.vin} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#003087]">{v.vin}</td>
                  <td className="px-4 py-3 text-gray-700">{v.make} {v.model}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{v.lessee ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#003087] h-2 rounded-full" style={{ width: `${v.utilization}%` }} />
                      </div>
                      <span className="text-sm font-semibold">{v.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      v.status === 'on_lease' ? 'bg-green-100 text-green-700' :
                      v.status === 'maintenance' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {v.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
