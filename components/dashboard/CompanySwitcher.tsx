'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const companies = [
  { abbr: 'ALL',  name: 'Consolidated',               href: '/dashboard/owner', color: '#C8A84B' },
  { abbr: 'CCW',  name: 'Complete Coach Works',        href: '/dashboard/ccw',   color: '#003087' },
  { abbr: 'TSI',  name: 'Transit Sales International', href: '/dashboard/tsi',   color: '#14b8a6' },
  { abbr: 'SBL',  name: 'Shuttle Bus Leasing',         href: '/dashboard/sbl',   color: '#2563eb' },
  { abbr: 'ZEPS', name: 'Electric',                    href: '/dashboard/zeps',  color: '#16a34a' },
]

export default function CompanySwitcher() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-2.5 flex items-center gap-2 overflow-x-auto flex-shrink-0">
      {companies.map((co) => {
        const active = pathname === co.href || pathname.startsWith(co.href + '/')
        return (
          <Link
            key={co.href}
            href={co.href}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 border"
            style={
              active
                ? { backgroundColor: co.color, borderColor: co.color, color: '#fff' }
                : { backgroundColor: 'transparent', borderColor: '#d1d5db', color: '#6b7280' }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: active ? '#ffffff99' : co.color }}
            />
            <span className="hidden sm:inline">{co.name}</span>
            <span className="sm:hidden">{co.abbr}</span>
          </Link>
        )
      })}
    </div>
  )
}
