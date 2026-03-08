'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Bus, ChevronDown } from 'lucide-react'

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-[#003087] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E8A020] rounded flex items-center justify-center">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-sm leading-tight">Complete Coach Works</div>
              <div className="text-xs text-blue-200 leading-tight">Since 1985 · ESOP</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-blue-100 hover:text-white transition-colors py-2">
                Services <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white text-[#1A1A2E] shadow-xl rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {[
                  { label: 'Midlife Overhaul', href: '/services/midlife-overhaul' },
                  { label: 'CNG / LNG Repower', href: '/services/cng-repower' },
                  { label: 'ZEPS Electric Conversion', href: '/services/zeps-electric' },
                  { label: 'Body & Paint', href: '/services/body-paint' },
                  { label: 'Interior Rehabilitation', href: '/services/interior-rehab' },
                ].map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2.5 text-sm hover:bg-[#003087] hover:text-white transition-colors border-b border-gray-100 last:border-0"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">About</Link>
            <Link href="/locations" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Locations</Link>
            <Link href="/contact" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">Contact</Link>
            <Link
              href="/dashboard"
              className="bg-[#E8A020] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#f5b84a] transition-colors"
            >
              Ops Dashboard
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <Link href="/services/midlife-overhaul" className="block px-3 py-2 text-sm text-blue-100 hover:text-white">Midlife Overhaul</Link>
            <Link href="/services/cng-repower" className="block px-3 py-2 text-sm text-blue-100 hover:text-white">CNG / LNG Repower</Link>
            <Link href="/services/zeps-electric" className="block px-3 py-2 text-sm text-blue-100 hover:text-white">ZEPS Electric</Link>
            <Link href="/about" className="block px-3 py-2 text-sm text-blue-100 hover:text-white">About</Link>
            <Link href="/locations" className="block px-3 py-2 text-sm text-blue-100 hover:text-white">Locations</Link>
            <Link href="/contact" className="block px-3 py-2 text-sm text-blue-100 hover:text-white">Contact</Link>
            <Link href="/dashboard" className="block mx-3 mt-2 bg-[#E8A020] text-white px-4 py-2 rounded-lg text-sm font-semibold text-center">Ops Dashboard</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
