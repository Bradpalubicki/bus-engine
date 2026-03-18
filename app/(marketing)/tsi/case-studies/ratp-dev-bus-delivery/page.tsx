import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, MapPin, Calendar, Package, Truck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'RATP Dev 10-Bus Fleet Delivery — TSI Case Study | Transit Sales International',
  description: 'TSI delivered 10 pre-owned transit buses to RATP Dev USA in 60 days under an accelerated delivery contract. FTA compliant, Buy America documentation provided. March 2026.',
  alternates: { canonical: 'https://completecoach.com/tsi/case-studies/ratp-dev-bus-delivery' },
  openGraph: {
    title: 'RATP Dev 10-Bus Fleet Delivery | TSI Case Study',
    description: 'Transit Sales International delivers 10 pre-owned transit buses to RATP Dev USA in 60 days. FTA compliant, Buy America documentation provided.',
    url: 'https://completecoach.com/tsi/case-studies/ratp-dev-bus-delivery',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'RATP Dev 10-Bus Fleet Delivery — TSI Case Study',
  description: 'Transit Sales International delivers 10 pre-owned transit buses to RATP Dev USA in 60 days under an accelerated delivery program.',
  publisher: { '@type': 'Organization', name: 'Transit Sales International', url: 'https://completecoach.com/tsi' },
  datePublished: '2026-03-01',
  author: { '@type': 'Organization', name: 'Transit Sales International' },
  image: 'https://completecoach.com/wp-content/uploads/2026/03/Go-Durham-Adjusted-400x250.jpg',
}

const scope = [
  'Fleet-wide condition assessment of candidate buses',
  'Selection of 10 matched 40ft diesel-electric buses',
  'Complete mechanical inspection and certification',
  'FTA Buy America documentation package',
  'ADA compliance verification and certification',
  'Pre-delivery road test and inspection report',
  'Accelerated 60-day delivery to Durham, NC',
  'Post-delivery technical support package',
]

const timeline = [
  { phase: 'Award', desc: 'Contract signed with RATP Dev USA', date: 'January 2026', type: 'milestone' },
  { phase: 'Assessment', desc: 'Fleet-wide inspection of candidate inventory', date: 'February 2026', type: 'ops' },
  { phase: 'Preparation', desc: 'Mechanical certification + FTA documentation package', date: 'February–March 2026', type: 'ops' },
  { phase: 'Delivery', desc: 'All 10 units delivered to Durham, NC', date: 'March 2026', type: 'milestone' },
  { phase: 'Revenue Service', desc: 'Buses in Go-Durham daily revenue service', date: 'March 2026', type: 'milestone' },
]

const stats = [
  { icon: Truck, value: '10', label: 'Buses Delivered', sub: 'All in revenue service' },
  { icon: Calendar, value: '60', label: 'Day Delivery', sub: 'Accelerated program' },
  { icon: CheckCircle, value: '100%', label: 'FTA Compliant', sub: 'Buy America docs provided' },
  { icon: Package, value: '0', label: 'Failures', sub: 'Zero delivery incidents' },
]

export default function RatpDevCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end pb-16 overflow-hidden bg-[#0f3a6e]">
        <div className="absolute inset-0">
          <Image
            src="https://completecoach.com/wp-content/uploads/2026/03/Go-Durham-Adjusted-400x250.jpg"
            alt="Go-Durham transit buses — RATP Dev USA fleet delivered by TSI"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0f3a6e]/65" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-sm text-blue-300 mb-4">
            <Link href="/tsi" className="hover:text-white transition-colors">TSI</Link>
            <span className="mx-2">/</span>
            <span className="text-blue-300">Case Studies</span>
            <span className="mx-2">/</span>
            <span className="text-white">RATP Dev Delivery</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#1a5fa8] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            Contract Delivery
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">RATP Dev — 10-Bus Fleet Delivery</h1>
          <div className="flex flex-wrap gap-5 text-sm text-blue-200">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Go-Durham / RATP Dev USA</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> March 2026</span>
            <span className="flex items-center gap-1.5"><Package className="w-4 h-4" /> 10-Bus Contract</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Pre-Owned Transit Buses</span>
          </div>
        </div>
      </section>

      {/* Results Stats */}
      <section className="bg-[#F8F9FB] border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-[#0f3a6e] rounded-xl flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1a5fa8]">{s.value}</div>
                  <div className="font-semibold text-sm text-[#1A1A2E]">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Main content */}
            <div className="lg:col-span-2 space-y-10">

              {/* About RATP Dev */}
              <div className="bg-[#F8F9FB] rounded-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#0f3a6e] mb-4">About RATP Dev USA</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  RATP Dev is a subsidiary of RATP Group, the Paris metropolitan transport operator — one of the world&apos;s largest public transit organizations, carrying over 3.2 billion passengers annually. RATP Dev USA manages public transit systems across multiple US cities, including Go-Durham (Durham Area Transit Authority) in Durham, North Carolina.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  When RATP Dev USA needed to rapidly expand the Go-Durham fleet, they turned to TSI for access to certified pre-owned buses that could be in revenue service within 60 days — a timeline impossible to meet with new bus procurement.
                </p>
              </div>

              {/* Scope of Work */}
              <div>
                <h2 className="text-2xl font-bold text-[#0f3a6e] mb-6">What TSI Delivered</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scope.map(item => (
                    <div key={item} className="flex items-start gap-3 bg-[#F8F9FB] rounded-lg p-4 border border-gray-100">
                      <CheckCircle className="w-5 h-5 text-[#1a5fa8] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fleet Breakdown */}
              <div>
                <h2 className="text-2xl font-bold text-[#0f3a6e] mb-4">Fleet Breakdown</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-[#0f3a6e] text-white">
                      <tr>
                        <th className="text-left px-6 py-3 font-semibold">Vehicle Type</th>
                        <th className="text-left px-6 py-3 font-semibold">Quantity</th>
                        <th className="text-left px-6 py-3 font-semibold">Fuel</th>
                        <th className="text-left px-6 py-3 font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">40ft Low Floor</td>
                        <td className="px-6 py-4 text-gray-600">10</td>
                        <td className="px-6 py-4 text-gray-600">Diesel-Electric</td>
                        <td className="px-6 py-4 text-gray-500">2013–2016 model years</td>
                      </tr>
                      <tr className="bg-[#F8F9FB]">
                        <td className="px-6 py-4 font-bold text-[#0f3a6e]">Total</td>
                        <td className="px-6 py-4 font-bold text-[#0f3a6e]">10</td>
                        <td className="px-6 py-4 text-gray-600"></td>
                        <td className="px-6 py-4 text-gray-600">All delivered to Durham, NC</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Program Timeline */}
              <div>
                <h2 className="text-2xl font-bold text-[#0f3a6e] mb-6">Program Timeline</h2>
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200" />
                  <div className="space-y-6">
                    {timeline.map(event => (
                      <div key={event.phase} className="relative pl-12">
                        <div className={`absolute left-2 top-1.5 w-4 h-4 rounded-full border-2 ${event.type === 'milestone' ? 'bg-[#1a5fa8] border-[#1a5fa8]' : 'bg-white border-gray-300'}`} />
                        <div className="text-xs font-bold text-[#1a5fa8] uppercase tracking-wider mb-0.5">{event.phase}</div>
                        <div className="font-semibold text-gray-900 text-sm">{event.desc}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{event.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Contract Summary */}
              <div className="bg-[#0f3a6e] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Contract Summary</h3>
                <div className="space-y-3 text-sm">
                  {[
                    ['Client', 'RATP Dev USA'],
                    ['System', 'Go-Durham (DATAR)'],
                    ['Contract Type', 'Pre-owned sale'],
                    ['Quantity', '10 buses'],
                    ['Vehicle', '40ft diesel-electric'],
                    ['Delivery', '60-day accelerated'],
                    ['FTA Status', 'Buy America compliant'],
                    ['Year', '2026'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-blue-700/50 pb-2 last:border-0 last:pb-0">
                      <span className="text-blue-200">{k}</span>
                      <span className="font-semibold text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sourcing note */}
              <div className="bg-[#60a5fa]/15 border border-[#60a5fa]/40 rounded-2xl p-6">
                <h3 className="font-bold text-[#0f3a6e] mb-2">About TSI Sourcing</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All TSI inventory is sourced from verified transit agencies nationwide. Each unit undergoes a complete mechanical inspection and certification before sale. Buy America documentation provided on every unit.
                </p>
              </div>

              {/* Related links */}
              <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#0f3a6e] mb-3">Related</h3>
                <div className="space-y-2">
                  <Link href="/tsi/inventory" className="flex items-center justify-between text-sm font-medium text-[#1a5fa8] hover:underline py-1">
                    Browse TSI Inventory <span>→</span>
                  </Link>
                  <Link href="/contact" className="flex items-center justify-between text-sm font-medium text-[#1a5fa8] hover:underline py-1">
                    Request Accelerated Delivery <span>→</span>
                  </Link>
                  <Link href="/tsi" className="flex items-center justify-between text-sm font-medium text-[#1a5fa8] hover:underline py-1">
                    Back to TSI <span>→</span>
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="w-full bg-[#1a5fa8] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1555a0] transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Request Accelerated Delivery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="bg-[#1a5fa8] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Need buses fast? TSI can deploy your fleet in 60 days.</h2>
          <p className="text-blue-100 mb-6 text-sm">Our sales team has placed buses with 50+ transit agencies. Tell us your timeline and we&apos;ll make it happen.</p>
          <Link href="/contact" className="bg-white text-[#1a5fa8] px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors inline-block">
            Contact Our Sales Team →
          </Link>
        </div>
      </section>
    </>
  )
}
