import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agency Portal — Complete Coach Works Bus Production Tracker',
  description: 'Track your transit buses through the CCW production process in real time.',
}

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Agency portal header */}
      <header className="bg-[#003087] text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-bold text-xl">CCW</div>
            <div className="h-6 w-px bg-blue-400" />
            <div className="text-sm font-medium text-blue-200">Agency Portal</div>
          </div>
          <div className="text-sm text-blue-200">Bus Production Tracker</div>
        </div>
      </header>
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          Complete Coach Works · Riverside, CA · (951) 826-5000 · Confidential — Authorized Users Only
        </div>
      </footer>
    </div>
  )
}
