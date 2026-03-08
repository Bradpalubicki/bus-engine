import Image from 'next/image'
import Link from 'next/link'
import { Wrench, CheckCircle, ArrowRight, Clock, DollarSign, Shield } from 'lucide-react'

export const metadata = {
  title: 'Midlife Overhaul & Bus Remanufacturing | Complete Coach Works',
  description: 'CCW midlife overhaul programs extend transit bus service life by 12+ years at 15-25% of new bus cost. FTA Section 5307/5339 eligible. Buy America compliant.',
}

const scope = [
  'Complete engine and transmission rebuild or replacement',
  'Full electrical system inspection and repair',
  'Brake system overhaul — air and hydraulic',
  'Suspension rebuild — front and rear axles',
  'ADA equipment inspection, repair, and certification',
  'Destination sign system upgrade',
  'Interior: seating, flooring, lighting, handholds',
  'Exterior: body repair, paint, and graphics',
  'HVAC system service and certification',
  'CNG/hybrid system inspection (fuel-type specific)',
  'Pre-delivery inspection and road test',
  'As-built documentation and compliance package',
]

const stats = [
  { icon: Clock, value: '60–90', label: 'Days per bus', sub: 'Typical program duration' },
  { icon: DollarSign, value: '15–25%', label: 'Of new bus cost', sub: 'Typical program price' },
  { icon: Shield, value: '12+', label: 'Years added life', sub: 'Like-new mechanical condition' },
]

export default function MidlifeOverhaulPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-[#003087] text-white overflow-hidden min-h-[420px] flex items-end pb-16">
        <div className="absolute inset-0">
          <Image
            src="https://completecoach.com/wp-content/uploads/2024/06/IMG_3320.jpg"
            alt="CCW bus remanufacturing facility"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#003087]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" /> Core Service
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Midlife Overhaul &amp; Remanufacturing</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Complete mechanical, electrical, and cosmetic rehabilitation extending bus service life by 12+ years — at a fraction of new bus cost.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#F8F9FB] border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-[#003087] rounded-xl flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#003087]">{s.value}</div>
                  <div className="font-semibold text-sm text-[#1A1A2E]">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Scope of work */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#003087] mb-6">What&apos;s Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scope.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-[#F8F9FB] rounded-lg p-4 border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-[#E8A020] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* SFMTA case study callout */}
              <div className="mt-10 relative rounded-2xl overflow-hidden h-56">
                <Image
                  src="https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg"
                  alt="SFMTA 219-coach midlife overhaul"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#003087]/65 flex items-center">
                  <div className="p-8">
                    <div className="text-[#E8A020] text-xs font-bold uppercase tracking-widest mb-2">Case Study</div>
                    <div className="text-white text-xl font-bold">SFMTA — $102M Contract</div>
                    <div className="text-blue-100 text-sm mt-1">219 coaches. CCW&apos;s largest single contract to date. Midlife overhaul + hybrid repower.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-[#003087] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Program Details</h3>
                <div className="space-y-3 text-sm">
                  {[
                    ['Typical Duration', '60–90 days / bus'],
                    ['Extended Life', '12+ years'],
                    ['FTA Eligible', 'Section 5307 / 5339'],
                    ['Buy America', 'Compliant'],
                    ['DBE Program', 'Available'],
                    ['ESOP Company', '100% Employee-Owned'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-blue-700/50 pb-2 last:border-0 last:pb-0">
                      <span className="text-blue-200">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#E8A020] text-white rounded-2xl p-6">
                <h3 className="font-bold mb-2">Cost Advantage</h3>
                <p className="text-amber-100 text-sm leading-relaxed">
                  A CCW midlife overhaul typically costs <strong className="text-white">15–25% of a new equivalent bus</strong> — restoring it to like-new mechanical condition and extending service life by 12+ years.
                </p>
              </div>

              <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#003087] mb-2">Buses We Service</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  {['Gillig Phantom / Low Floor', 'New Flyer D40 / Xcelsior', 'MCI D-Series', 'Nova Bus LFS', 'Orion VII / Hybrid', 'NABI 40-LFW'].map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#E8A020] rounded-full flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="w-full bg-[#003087] text-white py-3.5 rounded-xl font-semibold hover:bg-[#004db3] transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Request a Program Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#003087] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Ready to extend your fleet&apos;s life?</h2>
          <p className="text-blue-100 mb-6 text-sm">CCW&apos;s engineering team will assess your fleet and provide a program cost estimate — at no charge.</p>
          <Link href="/contact" className="bg-[#E8A020] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#f5b84a] transition-colors inline-flex items-center gap-2">
            Contact Our Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
