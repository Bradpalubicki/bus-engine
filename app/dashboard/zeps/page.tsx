'use client'

import { useState } from 'react'
import { Zap, DollarSign, CheckCircle } from 'lucide-react'

const zepsBuses = [
  { vin: 'IndyGo-001', make: 'New Flyer', model: 'DE60LFR', year: 2011, convertedDate: '2022-03-15', totalMiles: 89420, status: 'Active Revenue Service' },
  { vin: 'IndyGo-002', make: 'New Flyer', model: 'XDE40', year: 2012, convertedDate: '2022-04-20', totalMiles: 82100, status: 'Active Revenue Service' },
  { vin: 'IndyGo-003', make: 'Gillig', model: 'Phantom', year: 2010, convertedDate: '2022-06-01', totalMiles: 78350, status: 'Active Revenue Service' },
  { vin: 'IndyGo-004', make: 'Nova Bus', model: 'LFS', year: 2011, convertedDate: '2022-08-12', totalMiles: 71200, status: 'Active Revenue Service' },
  { vin: 'IndyGo-005', make: 'New Flyer', model: 'D40LF', year: 2012, convertedDate: '2023-01-08', totalMiles: 58400, status: 'Active Revenue Service' },
]

function calcTCO(buses: number, newBusPrice: number) {
  const newTotal = buses * newBusPrice
  const zepsPerBus = newBusPrice * 0.32
  const zepsTotal = buses * zepsPerBus
  const savings = newTotal - zepsTotal
  return { newTotal, zepsTotal, savings, savingsPct: Math.round(savings / newTotal * 100) }
}

export default function ZepsPage() {
  const [busCount, setBusCount] = useState(10)
  const [newBusPrice, setNewBusPrice] = useState(900000)
  const tco = calcTCO(busCount, newBusPrice)

  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087] flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#E8A020]" /> ZEPS Program Dashboard
        </h1>
        <p className="text-gray-500 text-sm">Zero-Emission Propulsion System — Indianapolis Public Transit deployment</p>
      </div>

      {/* Fleet stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Buses Converted', value: '21', sub: 'IndyGo fleet' },
          { label: 'Total Revenue Miles', value: '1.02M', sub: 'Combined fleet' },
          { label: 'Avg Miles / Bus', value: '71,200', sub: 'Exceeding targets' },
          { label: 'Fleet Availability', value: '96.4%', sub: '30-day rolling avg' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{k.label}</div>
            <div className="text-2xl font-bold text-[#003087]">{k.value}</div>
            <div className="text-xs text-gray-400">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* TCO Calculator */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4" /> ZEPS TCO Calculator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Buses</label>
              <input
                type="number"
                value={busCount}
                onChange={e => setBusCount(Number(e.target.value))}
                min={1}
                max={200}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New BEB Price per Bus</label>
              <input
                type="number"
                value={newBusPrice}
                onChange={e => setNewBusPrice(Number(e.target.value))}
                step={50000}
                min={500000}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]"
              />
              <p className="text-xs text-gray-400 mt-1">Typical BEB: $800K–$1.1M per bus</p>
            </div>
          </div>
          <div className="bg-[#F8F9FB] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">New BEB Purchase</span>
              <span className="font-bold text-gray-800">{fmt(tco.newTotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">ZEPS Conversion</span>
              <span className="font-bold text-[#003087]">{fmt(tco.zepsTotal)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
              <span className="font-semibold text-gray-700">Your Savings</span>
              <span className="text-2xl font-bold text-green-600">{fmt(tco.savings)}</span>
            </div>
            <div className="bg-[#E8A020] text-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{tco.savingsPct}% Savings</div>
              <div className="text-xs mt-0.5 text-amber-100">vs. new bus procurement</div>
            </div>
          </div>
        </div>
      </div>

      {/* ZEPS Fleet */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-[#003087] mb-4">Converted Fleet — IndyGo (Sample)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F9FB] border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">VIN</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Converted</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total Miles</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {zepsBuses.map(b => (
                <tr key={b.vin} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#003087]">{b.vin}</td>
                  <td className="px-4 py-3 text-gray-700">{b.year} {b.make} {b.model}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{b.convertedDate}</td>
                  <td className="px-4 py-3 text-right font-semibold">{b.totalMiles.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />{b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
