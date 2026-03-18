import type { ReactNode } from 'react'

export default function AgencyPortalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Header bar */}
      <div className="bg-[#003087] text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-lg font-bold tracking-tight">Complete Coach Works</div>
            <div className="text-xs text-blue-300 mt-0.5">Confidential — Project Status Portal</div>
          </div>
          <div className="text-xs text-blue-300 text-right">
            <div>For questions, contact CCW:</div>
            <div className="font-semibold text-white">(951) 684-9585</div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
