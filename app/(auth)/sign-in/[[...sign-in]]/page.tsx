import { Bus } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#003087] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#003087]">Complete Coach Works</h1>
          <p className="text-gray-500 mt-1">Operations Platform</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-center text-gray-600 mb-6">Sign in to access the CCW operations dashboard.</p>
          <Link
            href="/dashboard"
            className="w-full bg-[#003087] text-white py-3 rounded-lg font-semibold text-center block hover:bg-[#004db3] transition-colors"
          >
            Enter Demo Dashboard
          </Link>
          <p className="text-center text-xs text-gray-400 mt-4">Demo mode — no authentication required</p>
        </div>
      </div>
    </div>
  )
}
