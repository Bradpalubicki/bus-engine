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
  const isZEPS = pathname.startsWith('/zeps')
  const brand = isTSI ? 'TSI' : isSBL ? 'SBL' : isZEPS ? 'ZEPS' : 'CCW'

  const brandConfig = {
    CCW: { name: 'Complete Coach Works', color: '#003087', logo: 'CCW' },
    TSI: { name: 'Transit Sales International', color: '#1a5fa8', logo: 'TSI' },
    SBL: { name: 'Shuttle Bus Leasing', color: '#2d7a3a', logo: 'SBL' },
    ZEPS: { name: 'ZEPS Drive', color: '#16a34a', logo: 'ZEPS' },
  } as const

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
      { href: '/services', label: 'Services' },
      { href: '/about', label: 'About' },
      { href: '/parts', label: 'Parts' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/news', label: 'News & Events' },
      { href: '/careers', label: 'Employment' },
      { href: '/contact', label: 'Contact' },
    ],
    TSI: [
      { href: '/tsi/inventory', label: 'Inventory' },
      { href: '/news', label: 'News' },
      { href: '/tsi/resources', label: 'Resources' },
      { href: '/careers', label: 'Careers' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/contact', label: 'Contact' },
    ],
    SBL: [
      { href: '/sbl/fleet', label: 'Fleet' },
      { href: '/news', label: 'News' },
      { href: '/sbl/resources', label: 'Resources' },
      { href: '/careers', label: 'Careers' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/contact', label: 'Contact' },
    ],
    ZEPS: [
      { href: '/zeps', label: 'Overview' },
      { href: '/zeps/technology', label: 'Technology' },
      { href: '/zeps/fleet', label: 'Fleet Solutions' },
      { href: '/news', label: 'News' },
      { href: '/contact', label: 'Contact' },
    ],
  } as const

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={brand === 'TSI' ? '/tsi' : brand === 'SBL' ? '/sbl' : brand === 'ZEPS' ? '/zeps' : '/'} className="flex items-center">
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
          ) : brand === 'SBL' ? (
            <Image
              src="https://sblbus.com/wp-content/uploads/2023/08/SBL_NEW2023.jpg"
              alt="Shuttle Bus Leasing"
              width={180}
              height={64}
              className="h-14 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-2xl font-black tracking-tight text-[#16a34a]">ZEPS Drive</span>
          )}
        </Link>
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
          <Link href="/client-login" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 hover:border-gray-400 hover:text-gray-900 transition-colors">
            Client Login
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
          {navLinks[brand].map(link => (
            <Link key={link.href + link.label} href={link.href} className="block text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/client-login" className="block text-sm font-medium text-gray-600" onClick={() => setOpen(false)}>Client Login</Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar
