'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const dashboardOptions = [
  { label: 'Complete Coach Works', abbr: 'CCW', href: '/dashboard/ccw', color: '#003087' },
  { label: 'Transit Sales International', abbr: 'TSI', href: '/dashboard/tsi', color: '#14b8a6' },
  { label: 'Shuttle Bus Leasing', abbr: 'SBL', href: '/dashboard/sbl', color: '#2563eb' },
  { label: 'ZEPS Electric', abbr: 'ZEPS', href: '/dashboard/zeps', color: '#16a34a' },
]

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [dashOpen, setDashOpen] = useState(false)
  const [mobileDashOpen, setMobileDashOpen] = useState(false)
  const dashRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dashRef.current && !dashRef.current.contains(e.target as Node)) {
        setDashOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const isTSI = pathname.startsWith('/tsi')
  const isSBL = pathname.startsWith('/sbl')
  const isZEPS = pathname.startsWith('/zeps')
  const brand = isTSI ? 'TSI' : isSBL ? 'SBL' : isZEPS ? 'ZEPS' : 'CCW'

  const brandConfig = {
    CCW:  { name: 'Complete Coach Works',      color: '#003087', logo: 'CCW',  phone: '(951) 372-0082', tel: '9513720082' },
    TSI:  { name: 'Transit Sales International', color: '#1a5fa8', logo: 'TSI',  phone: '(951) 684-9585', tel: '9516849585' },
    SBL:  { name: 'Shuttle Bus Leasing',        color: '#2d7a3a', logo: 'SBL',  phone: '(951) 684-9585', tel: '9516849585' },
    ZEPS: { name: 'ZEPS Drive',                 color: '#16a34a', logo: 'ZEPS', phone: '(951) 372-0082', tel: '9513720082' },
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
      { href: '/tsi/capabilities', label: 'Capabilities' },
      { href: '/tsi/resources', label: 'Resources' },
      { href: '/news', label: 'News' },
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
          {/* Phone — desktop text, hidden on mobile */}
          <a
            href={`tel:${brandConfig[brand].tel}`}
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {brandConfig[brand].phone}
          </a>
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
          {/* Operations Dashboard dropdown */}
          <div className="relative" ref={dashRef}>
            <button
              onClick={() => setDashOpen(!dashOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              Operations Dashboard
              <svg className={`w-3.5 h-3.5 transition-transform ${dashOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dashOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                {dashboardOptions.map(opt => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => setDashOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: opt.color }}
                    />
                    <span className="text-xs font-bold text-gray-400 w-8 flex-shrink-0">{opt.abbr}</span>
                    <span className="text-sm text-gray-700">{opt.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <a href={`tel:${brandConfig[brand].tel}`} aria-label={`Call ${brandConfig[brand].name} at ${brandConfig[brand].phone}`} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3">
          {navLinks[brand].map(link => (
            <Link key={link.href + link.label} href={link.href} className="block text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <div>
            <button
              onClick={() => setMobileDashOpen(!mobileDashOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 w-full text-left"
            >
              Operations Dashboard
              <svg className={`w-3.5 h-3.5 ml-auto transition-transform ${mobileDashOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileDashOpen && (
              <div className="mt-2 ml-4 space-y-2">
                {dashboardOptions.map(opt => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => { setOpen(false); setMobileDashOpen(false) }}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
                    {opt.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
