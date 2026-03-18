import type { ReactNode } from 'react'

export const metadata = {
  title: 'CCW Agency Portal',
  description: 'Project status portal for transit agencies served by Complete Coach Works',
}

export default function PortalRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-1">
        {children}
      </div>
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-8">
        Powered by{' '}
        <span className="font-semibold text-[#003087]">Complete Coach Works</span>
        {' '}Operations Platform &nbsp;·&nbsp; (951) 684-9585 &nbsp;·&nbsp; info@completecoach.com
      </footer>
    </div>
  )
}
