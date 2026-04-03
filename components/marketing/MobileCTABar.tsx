'use client'

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#003087] border-t border-blue-800 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
      <p className="text-white text-sm font-semibold leading-tight flex-1">
        Free Fleet Assessment
      </p>
      <a
        href="tel:9513720082"
        className="bg-[#E8A020] text-[#003087] text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#d4911a] transition-colors whitespace-nowrap flex-shrink-0"
        aria-label="Call Complete Coach Works for a free fleet assessment"
      >
        Call (951) 372-0082
      </a>
    </div>
  )
}
