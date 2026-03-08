import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export const metadata = { title: 'CNG Re-tanking | Complete Coach Works' }
export default function CngRetankingPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003087] mb-4">CNG Re-tanking</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Certified CNG cylinder inspection, hydrostatic testing, and replacement for compliant fleet operations.</p>
        </div>
        <div className="bg-[#F8F9FB] rounded-2xl p-8 mb-8">
          <p className="text-gray-600">CNG cylinders have a regulated service life (typically 15-20 years). CCW's certified team performs DOT-compliant hydrostatic testing, visual inspection, and cylinder replacement as required by NFPA 52 and manufacturer specifications.</p>
        </div>
        <div className="text-center">
          <Link href="/contact" className="bg-[#003087] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#004db3] transition-colors inline-flex items-center gap-2">
            Schedule Inspection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
