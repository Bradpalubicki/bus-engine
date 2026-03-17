import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { CheckCircle, ArrowRight, Clock, DollarSign, Shield, Bus, MapPin, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SFMTA 219-Coach Midlife Overhaul — Case Study | Complete Coach Works',
  description: 'How CCW delivered a $101.6M, 5-year midlife overhaul program for San Francisco Muni\'s 219-coach hybrid-electric and trolley fleet. Contract awarded March 2022.',
  alternates: { canonical: 'https://completecoach.com/case-studies/sfmta-219-coach-midlife-overhaul' },
  openGraph: {
    title: 'SFMTA 219-Coach Midlife Overhaul — CCW Case Study',
    description: 'CCW\'s largest single contract: 5-year midlife overhaul for San Francisco Muni. $101.6M. 219 coaches. FTA compliant.',
    type: 'article',
  },
}

const caseStudySchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'SFMTA 219-Coach Midlife Overhaul — Complete Coach Works',
  description: 'CCW was awarded a $101,659,122.25 contract by the SFMTA Board of Directors (March 1, 2022) to perform midlife overhauls on 219 New Flyer hybrid-electric and trolley coaches over 5 years.',
  author: { '@type': 'Organization', name: 'Complete Coach Works', url: 'https://completecoach.com' },
  publisher: { '@type': 'Organization', name: 'Complete Coach Works' },
  datePublished: '2022-03-01',
}

const fleetBreakdown = [
  { type: '40-ft Hybrid-Electric New Flyer', qty: 48, notes: 'Standard fixed-route, diesel-electric hybrid' },
  { type: '60-ft Articulated Hybrid-Electric New Flyer', qty: 111, notes: 'High-capacity corridor routes' },
  { type: '60-ft Articulated Electric Trolley', qty: 60, notes: 'Overhead catenary, zero-emission operation' },
]

const scopeItems = [
  'Complete engine and transmission rebuild (hybrid coaches)',
  'Full electrical system inspection, repair, and requalification',
  'Brake system overhaul — air, hydraulic, and regenerative',
  'Suspension rebuild — front and rear axles',
  'ADA equipment inspection, certification, and documentation',
  'HVAC system service, recharge, and certification',
  'Interior rehabilitation — seating, flooring, lighting, handholds',
  'Exterior body repair, paint, and SFMTA graphics package',
  'Destination sign system inspection and update',
  'Hybrid/trolley propulsion system service and testing',
  'Pre-delivery inspection and road test per SFMTA specs',
  'As-built documentation and compliance package',
]

const timeline = [
  { date: 'March 1, 2022', event: 'SFMTA Board of Directors awards contract to CCW', type: 'milestone' },
  { date: 'Q2 2022', event: 'Program mobilization — facility prep, team assembly, parts procurement begins', type: 'ops' },
  { date: 'Q3 2022', event: 'First coach intake at CCW Riverside, CA facility', type: 'ops' },
  { date: '2023–2024', event: 'Ongoing deliveries — 60–90 days per coach from intake to PDI', type: 'ops' },
  { date: '2025', event: 'Deliveries to Alameda, CA satellite facility for final trolley coaches', type: 'ops' },
  { date: '2027 (est.)', event: 'Program completion — all 219 coaches returned to active service', type: 'milestone' },
]

const results = [
  { icon: DollarSign, value: '$101.6M', label: 'Contract Value', sub: 'SFMTA Board authorized not-to-exceed amount' },
  { icon: Bus, value: '219', label: 'Coaches Overhauled', sub: '48 standard + 111 artic hybrid + 60 trolley' },
  { icon: Shield, value: '12+ Years', label: 'Service Life Extended', sub: 'Per coach, like-new mechanical condition' },
  { icon: Clock, value: '5 Years', label: 'Program Duration', sub: 'Awarded March 2022' },
]

export default function SFMTACaseStudyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      {/* Hero */}
      <section className="relative bg-[#003087] text-white overflow-hidden min-h-[480px] flex items-end pb-16">
        <div className="absolute inset-0">
          <Image
            src="https://completecoach.com/wp-content/uploads/2024/08/SFMTA-scaled.jpg"
            alt="SFMTA Muni fleet — 219-coach midlife overhaul program, San Francisco"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#003087]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link href="/news" className="text-blue-200 text-sm hover:text-white transition-colors">← News & Events</Link>
            <span className="text-blue-400 text-sm">/</span>
            <span className="text-blue-200 text-sm">Case Study</span>
          </div>
          <div className="inline-block bg-[#E8A020]/20 border border-[#E8A020]/40 rounded-full px-4 py-1.5 text-[#E8A020] text-xs font-bold uppercase tracking-widest mb-4">
            Case Study — Contract Award
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 max-w-3xl leading-tight">
            SFMTA 219-Coach<br />Midlife Overhaul Program
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> San Francisco, CA</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Awarded March 2022</div>
            <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> $101,659,122.25</div>
          </div>
        </div>
      </section>

      {/* Result stats */}
      <section className="bg-[#F8F9FB] border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {results.map((r) => (
              <div key={r.label} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 bg-[#003087] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <r.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#003087] mb-0.5">{r.value}</div>
                <div className="text-sm font-semibold text-[#1A1A2E]">{r.label}</div>
                <div className="text-xs text-gray-500 mt-1">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Background */}
              <div>
                <h2 className="text-2xl font-bold text-[#003087] mb-4">Background</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  San Francisco Municipal Transportation Agency (SFMTA) operates one of the largest and most complex urban transit fleets in the United States — including a substantial fleet of New Flyer hybrid-electric coaches and electric trolley buses that serve the city's core corridors.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By 2022, a significant portion of this fleet had reached or was approaching the midlife threshold — the point at which federal transit funding guidelines and fleet management best practices call for a comprehensive mechanical and cosmetic overhaul rather than continued deferred maintenance or costly replacement.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  SFMTA issued a competitive procurement for a midlife overhaul contractor capable of processing 219 coaches at scale, within FTA Buy America requirements, across a five-year program window. Complete Coach Works won the contract — the largest single contract in CCW's 34-year history.
                </p>
              </div>

              {/* Contract facts */}
              <div className="bg-[#F8F9FB] rounded-2xl p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-[#003087] mb-2">The Contract</h2>
                <p className="text-sm text-gray-500 mb-6">Source: SFMTA Board of Directors, Calendar Item 11, March 1, 2022</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[
                    ['Awarding Agency', 'San Francisco Municipal Transportation Agency'],
                    ['Contract Value', '$101,659,122.25 (not-to-exceed)'],
                    ['Award Date', 'March 1, 2022 — SFMTA Board of Directors'],
                    ['Program Length', '5 years'],
                    ['Vehicles', '219 coaches (3 fleet types)'],
                    ['Contractor', 'Complete Coach Works (CCW)'],
                    ['Primary Facility', 'CCW — Riverside, CA'],
                    ['Compliance', 'FTA Buy America · CARB · ADA'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{k}</span>
                      <span className="text-gray-800 font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fleet breakdown */}
              <div>
                <h2 className="text-2xl font-bold text-[#003087] mb-6">Fleet Breakdown</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#003087] text-white text-left">
                        <th className="px-5 py-3 font-semibold rounded-tl-lg">Coach Type</th>
                        <th className="px-5 py-3 font-semibold text-center">Qty</th>
                        <th className="px-5 py-3 font-semibold rounded-tr-lg">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fleetBreakdown.map((row, i) => (
                        <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'}>
                          <td className="px-5 py-4 font-medium text-gray-800 border-b border-gray-100">{row.type}</td>
                          <td className="px-5 py-4 text-center font-bold text-[#003087] border-b border-gray-100">{row.qty}</td>
                          <td className="px-5 py-4 text-gray-500 border-b border-gray-100">{row.notes}</td>
                        </tr>
                      ))}
                      <tr className="bg-[#003087]/5">
                        <td className="px-5 py-4 font-bold text-[#003087]">Total</td>
                        <td className="px-5 py-4 text-center font-bold text-[#003087]">219</td>
                        <td className="px-5 py-4 text-gray-500">5-year program</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Scope */}
              <div>
                <h2 className="text-2xl font-bold text-[#003087] mb-6">Scope of Work</h2>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                  Each coach undergoes a comprehensive rehabilitation following SFMTA program specifications. CCW performs all work at its Riverside, CA facility with final deliveries at the Alameda, CA satellite location.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scopeItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-[#F8F9FB] rounded-lg p-4 border border-gray-100">
                      <CheckCircle className="w-4 h-4 text-[#E8A020] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo */}
              <div>
                <h2 className="text-2xl font-bold text-[#003087] mb-6">Program Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { src: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg', alt: 'SFMTA coach during midlife overhaul at CCW Riverside facility' },
                    { src: 'https://completecoach.com/wp-content/uploads/2024/08/SFMTA-scaled.jpg', alt: 'SFMTA 219-coach fleet — aerial view of program' },
                  ].map((img) => (
                    <div key={img.src} className="relative h-56 rounded-xl overflow-hidden">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h2 className="text-2xl font-bold text-[#003087] mb-6">Program Timeline</h2>
                <div className="relative pl-8 border-l-2 border-gray-200 space-y-6">
                  {timeline.map((t) => (
                    <div key={t.date} className="relative">
                      <div className={`absolute -left-[41px] w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${t.type === 'milestone' ? 'bg-[#E8A020]' : 'bg-[#003087]'}`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <div className="text-xs font-bold text-[#E8A020] uppercase tracking-wide mb-0.5">{t.date}</div>
                      <div className="text-sm text-gray-700 leading-relaxed">{t.event}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">

              {/* Key facts */}
              <div className="bg-[#003087] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Program At a Glance</h3>
                <div className="space-y-3 text-sm">
                  {[
                    ['Client', 'SFMTA (San Francisco Muni)'],
                    ['Contract Value', '$101,659,122.25'],
                    ['Coaches', '219 (3 fleet types)'],
                    ['Duration', '5 years (2022–2027)'],
                    ['CCW History', "Largest single contract in CCW's history"],
                    ['FTA Eligible', 'Section 5307 / 5339'],
                    ['Buy America', 'Compliant'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-start border-b border-blue-700/50 pb-3 last:border-0 last:pb-0 gap-3">
                      <span className="text-blue-200 flex-shrink-0">{k}</span>
                      <span className="font-semibold text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">Verified Source</div>
                <p className="text-sm text-amber-900 leading-relaxed">
                  Contract value and scope verified from the SFMTA Board of Directors Calendar Item 11, March 1, 2022 — publicly available at sfmta.com.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#003087] mb-2">Ready to plan your program?</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  CCW's engineering team will assess your fleet and provide a program cost estimate — at no charge.
                </p>
                <Link
                  href="/contact"
                  className="w-full bg-[#003087] text-white py-3 rounded-xl font-semibold hover:bg-[#004db3] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Request a Fleet Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Related */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Related</div>
                <div className="space-y-2">
                  {[
                    { href: '/services/midlife-overhaul', label: 'Midlife Overhaul Service', desc: 'Full scope and program details' },
                    { href: '/news', label: 'News & Events', desc: 'More contract awards and updates' },
                    { href: '/contact', label: 'Contact CCW', desc: 'Start your fleet assessment' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="block bg-white border border-gray-100 rounded-xl p-4 hover:border-[#003087]/30 hover:bg-[#F8F9FB] transition-colors group">
                      <div className="font-semibold text-sm text-[#003087] group-hover:text-[#E8A020] transition-colors">{l.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{l.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#003087] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Interested in a program like this for your agency?</h2>
          <p className="text-blue-100 mb-6 text-sm">CCW has delivered large-scale midlife overhaul programs for agencies across North America. Let us assess your fleet.</p>
          <Link href="/contact" className="bg-[#E8A020] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#f5b84a] transition-colors inline-flex items-center gap-2">
            Contact Our Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
