import Link from 'next/link'
import { Wrench, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Midlife Overhaul & Remanufacturing | Complete Coach Works',
}

export default function MidlifeOverhaulPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-14 h-14 bg-[#003087] rounded-xl flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#003087] mb-4">Midlife Overhaul / Remanufacturing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Complete mechanical, electrical, and cosmetic rehabilitation that extends bus service life by 12+ years.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#F8F9FB] rounded-xl p-6">
            <h2 className="font-bold text-[#003087] mb-4">What's Included</h2>
            <ul className="space-y-2">
              {[
                'Complete engine and transmission rebuild or replacement',
                'Full electrical system inspection and repair',
                'Brake system overhaul (air/hydraulic)',
                'Suspension rebuild — front and rear',
                'ADA equipment inspection, repair, and certification',
                'Destination sign system upgrade',
                'Interior: seating, flooring, lighting, handholds',
                'Exterior: body repair, paint, graphics',
                'HVAC system service and certification',
                'CNG/hybrid system inspection (fuel-type specific)',
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="bg-[#003087] text-white rounded-xl p-6">
              <h3 className="font-bold mb-3">Program Details</h3>
              <div className="space-y-2 text-sm text-blue-100">
                <div className="flex justify-between"><span>Typical Duration</span><span className="font-semibold">60–90 days per bus</span></div>
                <div className="flex justify-between"><span>Extended Life</span><span className="font-semibold">12+ years</span></div>
                <div className="flex justify-between"><span>FTA Eligible</span><span className="font-semibold">Yes — Section 5307/5339</span></div>
                <div className="flex justify-between"><span>Buy America</span><span className="font-semibold">Compliant</span></div>
              </div>
            </div>
            <div className="bg-[#E8A020] text-white rounded-xl p-6">
              <h3 className="font-bold mb-2">Cost vs. New Bus</h3>
              <p className="text-amber-100 text-sm">A CCW midlife overhaul typically costs 15–25% of the price of a new equivalent bus — while restoring it to like-new mechanical condition.</p>
            </div>
            <Link href="/contact" className="w-full bg-[#003087] text-white py-3 rounded-lg font-semibold hover:bg-[#004db3] transition-colors flex items-center justify-center gap-2">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
