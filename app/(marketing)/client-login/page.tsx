import Link from 'next/link'
import Image from 'next/image'
import { Lock, ArrowRight, Shield, Phone } from 'lucide-react'

export const metadata = {
  title: 'Client Login | CCW · TSI · SBL',
  description: 'Secure client portal for Complete Coach Works, Transit Sales International, and Shuttle Bus Leasing customers.',
}

export default function ClientLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#003087] rounded-2xl mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#003087] mb-3">Client Portal Login</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Access your project status, invoices, compliance documents, and fleet reports.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* CCW */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-2 bg-[#003087]" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png"
                  alt="Complete Coach Works"
                  width={100}
                  height={36}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Track overhaul milestones, review inspection reports, download compliance docs, and manage your fleet rebuild contracts.
              </p>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full bg-[#003087] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#002070] transition-colors"
              >
                CCW Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TSI */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-2 bg-[#1a5fa8]" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="https://transitsales.com/wp-content/uploads/2023/08/TSI_NEW2023.jpg"
                  alt="Transit Sales International"
                  width={100}
                  height={36}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-gray-500 mb-5">
                View purchase agreements, delivery schedules, vehicle specs, and FTA compliance documentation for your bus acquisitions.
              </p>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full bg-[#1a5fa8] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#154e8a] transition-colors"
              >
                TSI Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* SBL */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-2 bg-[#2d7a3a]" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="https://sblbus.com/wp-content/uploads/2023/08/SBL_NEW2023.jpg"
                  alt="Shuttle Bus Leasing"
                  width={100}
                  height={36}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Manage your lease agreements, payment schedules, fleet utilization reports, and maintenance records in one place.
              </p>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full bg-[#2d7a3a] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#236130] transition-colors"
              >
                SBL Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Security badge */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4 mb-8">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-gray-800 text-sm">Secure Client Access</div>
            <p className="text-gray-500 text-sm mt-0.5">
              All client portals are protected by multi-factor authentication and 256-bit encryption. Your project data and documents are only accessible to authorized personnel on your account.
            </p>
          </div>
        </div>

        {/* Need access */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-3">Don&apos;t have portal access yet?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 text-[#003087] font-semibold text-sm hover:underline">
              Request Access <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-gray-300">|</span>
            <a href="tel:+19516893700" className="inline-flex items-center gap-2 text-gray-600 text-sm hover:text-[#003087]">
              <Phone className="w-3.5 h-3.5" /> (951) 689-3700
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
