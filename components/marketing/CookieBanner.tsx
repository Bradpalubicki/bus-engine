'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'ccw-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#003087] text-white px-6 py-4 shadow-2xl border-t border-blue-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-blue-100 leading-relaxed">
          We use cookies to improve your experience and analyze site traffic.
          By continuing to use this site, you consent to our use of cookies.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/cookies"
            className="text-xs text-blue-300 hover:text-white underline transition-colors whitespace-nowrap"
          >
            Cookie Policy
          </Link>
          <button
            onClick={decline}
            className="bg-transparent border border-blue-400 text-blue-200 text-sm font-semibold px-5 py-2 rounded-lg hover:border-white hover:text-white transition-colors whitespace-nowrap"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="bg-[#E8A020] text-[#003087] text-sm font-bold px-5 py-2 rounded-lg hover:bg-[#d4911a] transition-colors whitespace-nowrap"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
