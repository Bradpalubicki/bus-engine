'use client'
import { useState } from 'react'

interface CompanySwitcherProps {
  defaultCompany?: 'CCW' | 'TSI' | 'SBL'
  onSwitch?: (company: 'CCW' | 'TSI' | 'SBL') => void
}

export default function CompanySwitcher({ defaultCompany = 'CCW', onSwitch }: CompanySwitcherProps) {
  const [active, setActive] = useState<'CCW' | 'TSI' | 'SBL'>(defaultCompany)

  const handleSwitch = (company: 'CCW' | 'TSI' | 'SBL') => {
    setActive(company)
    onSwitch?.(company)
  }

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => handleSwitch('CCW')}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
            active === 'CCW' ? 'bg-[#003087] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          CCW
        </button>
        <button
          onClick={() => handleSwitch('TSI')}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
            active === 'TSI' ? 'bg-[#1a5fa8] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          TSI
        </button>
        <button
          onClick={() => handleSwitch('SBL')}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
            active === 'SBL' ? 'bg-[#2d7a3a] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          SBL
        </button>
      </div>
      <div className="bg-amber-400 text-amber-900 text-center py-1.5 px-4 text-xs font-semibold rounded-b-lg">
        DEMO MODE — All data is illustrative. Connect Supabase + Sage Intacct for live data.
      </div>
    </div>
  )
}
