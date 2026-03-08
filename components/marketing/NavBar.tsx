'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const services = [
  { label: 'Midlife Overhaul', href: '/services/midlife-overhaul' },
  { label: 'CNG / LNG Repower', href: '/services/cng-repower' },
  { label: 'ZEPS Electric Conversion', href: '/services/zeps-electric' },
  { label: 'Body & Paint', href: '/services/body-paint' },
  { label: 'Interior Rehabilitation', href: '/services/interior-rehab' },
  { label: 'CNG Re-tanking', href: '/services/cng-retanking' },
]

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo — larger on white bg */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png"
              alt="Complete Coach Works"
              width={220}
              height={70}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {/* Services dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-semibold text-[#1A1A2E] hover:text-[#003087] transition-colors py-2">
                Services <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 w-60 bg-white text-[#1A1A2E] shadow-2xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100 mt-1">
                {services.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-3 text-sm font-medium hover:bg-[#003087] hover:text-white transition-colors border-b border-gray-100 last:border-0"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="text-sm font-semibold text-[#1A1A2E] hover:text-[#003087] transition-colors">About</Link>
            <Link href="/gallery" className="text-sm font-semibold text-[#1A1A2E] hover:text-[#003087] transition-colors">Gallery</Link>
            <Link href="/locations" className="text-sm font-semibold text-[#1A1A2E] hover:text-[#003087] transition-colors">Locations</Link>
            <Link href="/dbe" className="text-sm font-semibold text-[#1A1A2E] hover:text-[#003087] transition-colors">DBE</Link>
            <Link href="/contact" className="text-sm font-semibold text-[#1A1A2E] hover:text-[#003087] transition-colors">Contact</Link>

            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/contact"
                className="bg-[#003087] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#004db3] transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/dashboard"
                className="bg-[#E8A020] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#f5b84a] transition-colors"
              >
                Ops Dashboard
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#003087] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-0.5">
            <p className="px-3 pt-1 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Services</p>
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="block px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F8F9FB] rounded-lg">
                {s.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link href="/about" className="block px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F8F9FB] rounded-lg">About</Link>
            <Link href="/gallery" className="block px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F8F9FB] rounded-lg">Gallery</Link>
            <Link href="/locations" className="block px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F8F9FB] rounded-lg">Locations</Link>
            <Link href="/dbe" className="block px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F8F9FB] rounded-lg">DBE</Link>
            <Link href="/contact" className="block px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-[#F8F9FB] rounded-lg">Contact</Link>
            <div className="px-3 pt-2 flex flex-col gap-2">
              <Link href="/contact" className="bg-[#003087] text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-center">Get a Quote</Link>
              <Link href="/dashboard" className="bg-[#E8A020] text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-center">Ops Dashboard</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
