'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function NavBar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isTSI = pathname.startsWith('/tsi')
  const isSBL = pathname.startsWith('/sbl')
  const brand = isTSI ? 'TSI' : isSBL ? 'SBL' : 'CCW'

  const brandConfig = {
    CCW: { name: 'Complete Coach Works', color: '#003087', logo: 'CCW' },
    TSI: { name: 'Transit Sales International', color: '#1a5fa8', logo: 'TSI' },
    SBL: { name: 'Shuttle Bus Leasing', color: '#2d7a3a', logo: 'SBL' },
  } as const
  const config = brandConfig[brand]

  const [zepsPulse, setZepsPulse] = useState(false)
  useEffect(() => {
    // pulse for 1.5s every 10s
    const run = () => {
      setZepsPulse(true)
      setTimeout(() => setZepsPulse(false), 1500)
    }
    run()
    const id = setInterval(run, 10000)
    return () => clearInterval(id)
  }, [])

  const navLinks = {
    CCW: [
      { href: '/#services', label: 'Services' },
      { href: '/zeps', label: 'ZEPS Electric' },
      { href: '/news', label: 'News & Events' },
      { href: '/careers', label: 'Employment' },
      { href: '/contact', label: 'Contact' },
    ],
    TSI: [
      { href: '/tsi/inventory', label: 'Inventory' },
      { href: '/news', label: 'News' },
      { href: '/careers', label: 'Careers' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/contact', label: 'Contact' },
    ],
    SBL: [
      { href: '/sbl/fleet', label: 'Fleet' },
      { href: '/news', label: 'News' },
      { href: '/careers', label: 'Careers' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/contact', label: 'Contact' },
    ],
  } as const

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={brand === 'TSI' ? '/tsi' : brand === 'SBL' ? '/sbl' : '/'} className="flex items-center">
          {brand === 'CCW' ? (
            <Image
              src="https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png"
              alt="Complete Coach Works"
              width={220}
              height={80}
              className="h-16 w-auto object-contain"
              priority
            />
          ) : brand === 'TSI' ? (
            <Image
              src="https://transitsales.com/wp-content/uploads/2023/08/TSI_NEW2023.jpg"
              alt="Transit Sales International"
              width={180}
              height={64}
              className="h-14 w-auto object-contain"
              priority
            />
          ) : (
            <Image
              src="https://sblbus.com/wp-content/uploads/2023/08/SBL_NEW2023.jpg"
              alt="Shuttle Bus Leasing"
              width={180}
              height={64}
              className="h-14 w-auto object-contain"
              priority
            />
          )}
        </Link>
        <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Link href="/" className={`px-3 py-1 rounded text-sm font-medium transition-colors ${!isTSI && !isSBL ? 'bg-[#003087] text-white' : 'text-gray-600 hover:text-gray-900'}`}>CCW</Link>
          <Link href="/tsi" className={`px-3 py-1 rounded text-sm font-medium transition-colors ${isTSI ? 'bg-[#1a5fa8] text-white' : 'text-gray-600 hover:text-gray-900'}`}>TSI</Link>
          <Link href="/sbl" className={`px-3 py-1 rounded text-sm font-medium transition-colors ${isSBL ? 'bg-[#2d7a3a] text-white' : 'text-gray-600 hover:text-gray-900'}`}>SBL</Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {navLinks[brand].map(link => {
            const isZeps = link.href === '/zeps'
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 relative ${
                  isZeps
                    ? zepsPulse
                      ? 'text-[#16a34a] scale-105'
                      : 'text-gray-700 hover:text-[#16a34a]'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {isZeps && (
                  <span className={`absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#22c55e] transition-all duration-300 ${zepsPulse ? 'opacity-100 scale-125' : 'opacity-0'}`} />
                )}
                {link.label}
                {isZeps && zepsPulse && (
                  <span className="absolute inset-0 rounded-md bg-[#22c55e]/10 -mx-2 -my-1" />
                )}
              </Link>
            )
          })}
          <Link href="/dashboard" className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: config.color }}>
            Dashboard →
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3">
          <div className="flex gap-2 mb-3">
            <Link href="/" className={`flex-1 text-center px-3 py-1 rounded text-sm font-medium transition-colors ${!isTSI && !isSBL ? 'bg-[#003087] text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setOpen(false)}>CCW</Link>
            <Link href="/tsi" className={`flex-1 text-center px-3 py-1 rounded text-sm font-medium transition-colors ${isTSI ? 'bg-[#1a5fa8] text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setOpen(false)}>TSI</Link>
            <Link href="/sbl" className={`flex-1 text-center px-3 py-1 rounded text-sm font-medium transition-colors ${isSBL ? 'bg-[#2d7a3a] text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setOpen(false)}>SBL</Link>
          </div>
          {navLinks[brand].map(link => (
            <Link key={link.href} href={link.href} className="block text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/dashboard" className="block text-sm font-bold" style={{ color: config.color }} onClick={() => setOpen(false)}>Dashboard →</Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar
