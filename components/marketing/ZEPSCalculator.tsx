'use client'
import { useState } from 'react'

export default function ZEPSCalculator() {
  const [buses, setBuses] = useState(10)
  const [miles, setMiles] = useState(50000)
  const [diesel, setDiesel] = useState(3.80)

  const purchaseSavings = buses * 250000
  const annualFuelSavings = buses * ((miles / 5.5 * diesel) - (miles * 2.6 * 0.12))
  const annualMaintSavings = buses * 15000
  const tenYearTotal = purchaseSavings + (annualFuelSavings + annualMaintSavings) * 10

  const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`

  return (
    <div className="bg-[#0d1f3a] rounded-2xl p-8">
      <h3 className="text-xl font-bold text-white mb-6">ZEPS Fleet Savings Calculator</h3>
      <div className="space-y-6 mb-8">
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Fleet Size (buses)</label>
          <input type="range" min="1" max="100" value={buses} onChange={e => setBuses(Number(e.target.value))} className="w-full accent-[#E8A020]" />
          <div className="text-white font-bold text-lg">{buses} buses</div>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Annual Miles per Bus</label>
          <input type="range" min="10000" max="100000" step="5000" value={miles} onChange={e => setMiles(Number(e.target.value))} className="w-full accent-[#E8A020]" />
          <div className="text-white font-bold text-lg">{miles.toLocaleString()} miles</div>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Diesel Price ($/gal)</label>
          <input type="range" min="250" max="600" step="10" value={diesel * 100} onChange={e => setDiesel(Number(e.target.value) / 100)} className="w-full accent-[#E8A020]" />
          <div className="text-white font-bold text-lg">${diesel.toFixed(2)}/gal</div>
        </div>
      </div>
      <div className="border-t border-[#1a2e4a] pt-6 space-y-3">
        <div className="flex justify-between text-sm"><span className="text-gray-400">Purchase savings vs new OEM</span><span className="text-white font-bold">{fmt(purchaseSavings)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-400">Annual fuel savings</span><span className="text-white font-bold">{fmt(annualFuelSavings)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-400">Annual maintenance savings</span><span className="text-white font-bold">{fmt(annualMaintSavings)}</span></div>
        <div className="border-t border-[#1a2e4a] pt-3 flex justify-between"><span className="text-[#E8A020] font-bold">10-Year Total Savings</span><span className="text-[#E8A020] text-2xl font-bold">{fmt(tenYearTotal)}</span></div>
      </div>
    </div>
  )
}
