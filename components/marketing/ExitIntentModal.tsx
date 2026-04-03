'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'ccw-exit-intent-shown'

export default function ExitIntentModal() {
  const [visible, setVisible] = useState(false)

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY > 0) return
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    if (scrolled < 0.4) return
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(true)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    let timer: ReturnType<typeof setTimeout>
    timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 30000)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseLeave])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-[#003087] px-8 py-6 text-white text-center">
          <div className="text-[#E8A020] text-sm font-bold uppercase tracking-widest mb-2">Before You Go</div>
          <h2 id="exit-modal-title" className="text-2xl font-bold leading-tight">Get a Free Fleet Assessment</h2>
          <p className="text-blue-200 text-sm mt-2">Find out exactly what your buses need — and how much you can save.</p>
        </div>
        <div className="px-8 py-6">
          <ul className="space-y-2 text-sm text-gray-700 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#E8A020] font-bold mt-0.5">✓</span>
              <span>No-cost evaluation of your current fleet condition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E8A020] font-bold mt-0.5">✓</span>
              <span>Custom refurbishment vs. replacement cost analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E8A020] font-bold mt-0.5">✓</span>
              <span>FTA funding eligibility check included</span>
            </li>
          </ul>
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setVisible(false)}
              className="block w-full text-center bg-[#E8A020] text-[#003087] font-bold py-3 rounded-lg hover:bg-[#d4911a] transition-colors"
            >
              Request My Free Assessment
            </Link>
            <a
              href="tel:9513720082"
              onClick={() => setVisible(false)}
              className="block w-full text-center border border-[#003087] text-[#003087] font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Call (951) 372-0082
            </a>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="mt-4 w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            No thanks, I&apos;ll continue browsing
          </button>
        </div>
      </div>
    </div>
  )
}
