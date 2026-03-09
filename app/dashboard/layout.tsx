import { Sidebar } from '@/components/dashboard/Sidebar'
import { EngineSwitcher } from '@/components/dashboard/EngineSwitcher'

export const metadata = {
  title: 'Operations Dashboard | Complete Coach Works',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FB]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <span className="text-sm font-medium text-[#003087]">Complete Coach Works</span>
            <span className="text-xs text-gray-400 ml-2">· Operations Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <EngineSwitcher />
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium border border-green-200">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              LIVE
            </span>
          </div>
        </header>
        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
