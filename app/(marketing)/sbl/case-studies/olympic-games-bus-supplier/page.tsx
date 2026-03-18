import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, MapPin, Calendar, Globe, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Official Olympic Games Bus Supplier — 2002 & 2010 Winter Games | SBL Case Study',
  description: 'Shuttle Bus Leasing served as official bus supplier for the 2002 Salt Lake City Winter Olympics and 2010 Vancouver Winter Olympics. Zero-failure fleet operations across two countries.',
  alternates: { canonical: 'https://completecoach.com/sbl/case-studies/olympic-games-bus-supplier' },
  openGraph: {
    title: 'Olympic Games Bus Supplier — 2002 & 2010 | SBL Case Study',
    description: 'SBL provided official fleet operations for the 2002 Salt Lake City and 2010 Vancouver Winter Olympic Games — athlete transport, venue shuttles, media operations.',
    url: 'https://completecoach.com/sbl/case-studies/olympic-games-bus-supplier',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Official Olympic Games Bus Supplier — 2002 & 2010 Winter Games',
  description: 'SBL provided official fleet operations for the 2002 Salt Lake City and 2010 Vancouver Winter Olympic Games — athlete transport, venue shuttles, media operations.',
  publisher: { '@type': 'Organization', name: 'Shuttle Bus Leasing', url: 'https://completecoach.com/sbl' },
  datePublished: '2010-03-01',
  author: { '@type': 'Organization', name: 'Shuttle Bus Leasing' },
  image: 'https://completecoach.com/wp-content/uploads/2024/06/SBL.jpg',
}

const scope = [
  'Large-scale transit bus fleet deployment',
  'Athlete village to venue transportation (all events)',
  'Media center and press shuttle operations',
  'VIP and official delegation transport',
  '24/7 operations with backup fleet reserves',
  'Multilingual driver coordination (Canada, 2010)',
  'On-site maintenance and emergency support',
  'Post-games fleet recovery and decommission',
]

const timeline = [
  { phase: 'Contract Award', desc: 'Contract awarded for 2002 Salt Lake City Games', date: '2001', type: 'milestone' },
  { phase: '2002 Olympics', desc: 'Salt Lake City Winter Olympics — SBL fleet in full service', date: 'February 2002', type: 'milestone' },
  { phase: 'Recovery', desc: 'Post-games fleet recovery and decommission', date: 'March 2002', type: 'ops' },
  { phase: 'Contract Award', desc: 'Contract awarded for 2010 Vancouver Games', date: '2009', type: 'milestone' },
  { phase: '2010 Olympics', desc: 'Vancouver Winter Olympics — SBL fleet in full service', date: 'February 2010', type: 'milestone' },
  { phase: 'Recovery', desc: 'Post-games fleet recovery complete', date: 'March 2010', type: 'ops' },
]

const stats = [
  { icon: Globe, value: '2', label: 'Olympic Games', sub: 'Salt Lake City + Vancouver' },
  { icon: MapPin, value: '2', label: 'Countries', sub: 'USA + Canada' },
  { icon: CheckCircle, value: '0', label: 'Service Failures', sub: 'Zero incidents across both Games' },
  { icon: Clock, value: '24/7', label: 'Operations', sub: 'Around-the-clock fleet management' },
]

export default function OlympicCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end pb-16 overflow-hidden bg-[#1a2e1a]">
        <div className="absolute inset-0">
          <Image
            src="https://completecoach.com/wp-content/uploads/2024/06/SBL.jpg"
            alt="SBL fleet — Olympic Games bus operations"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#1a2e1a]/65" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-sm text-green-400 mb-4">
            <Link href="/sbl" className="hover:text-white transition-colors">SBL</Link>
            <span className="mx-2">/</span>
            <span className="text-green-300">Case Studies</span>
            <span className="mx-2">/</span>
            <span className="text-white">Olympic Games</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#2d7a3a] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            🏅 Major Event Fleet
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Olympic Games Bus Supplier — Two Winter Games</h1>
          <div className="flex flex-wrap gap-5 text-sm text-green-200">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Salt Lake City, UT &amp; Vancouver, BC</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 2002 &amp; 2010</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Two Olympics</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Large-Scale Fleet Operations</span>
          </div>
        </div>
      </section>

      {/* Results Stats */}
      <section className="bg-[#F8F9FB] border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-[#1a2e1a] rounded-xl flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#2d7a3a]">{s.value}</div>
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

              {/* The Olympic Challenge */}
              <div className="bg-[#F8F9FB] rounded-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1a2e1a] mb-4">The Olympic Challenge</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  The Olympic Games demand flawless large-scale transportation. For both the 2002 Salt Lake City Winter Olympics and the 2010 Vancouver Winter Olympics, the organizing committees required a reliable partner to provide transit buses for athlete transport, venue-to-venue connections, media operations, and VIP shuttles — with zero tolerance for failure.
                </p>
                <p className="text-gray-600 leading-relaxed mb-3">
                  SBL was selected as the official bus supplier for both events — one of only a handful of companies to have provided fleet services for multiple Olympic Games.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The logistics demanded 24/7 operations, backup fleet reserves, multilingual coordination (especially for Vancouver in 2010), and on-site maintenance capability at all venues. SBL delivered both times without a single service failure.
                </p>
              </div>

              {/* Scope */}
              <div>
                <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">What SBL Provided</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scope.map(item => (
                    <div key={item} className="flex items-start gap-3 bg-[#F8F9FB] rounded-lg p-4 border border-gray-100">
                      <CheckCircle className="w-5 h-5 text-[#2d7a3a] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Breakdown */}
              <div>
                <h2 className="text-2xl font-bold text-[#1a2e1a] mb-4">Event Breakdown</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-[#1a2e1a] text-white">
                      <tr>
                        <th className="text-left px-6 py-3 font-semibold">Event</th>
                        <th className="text-left px-6 py-3 font-semibold">Year</th>
                        <th className="text-left px-6 py-3 font-semibold">Location</th>
                        <th className="text-left px-6 py-3 font-semibold">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">XIX Olympic Winter Games</td>
                        <td className="px-6 py-4 text-gray-600">2002</td>
                        <td className="px-6 py-4 text-gray-600">Salt Lake City, UT</td>
                        <td className="px-6 py-4 text-gray-600">Official Bus Supplier</td>
                      </tr>
                      <tr className="bg-[#F8F9FB]">
                        <td className="px-6 py-4 font-medium text-gray-900">XXI Olympic Winter Games</td>
                        <td className="px-6 py-4 text-gray-600">2010</td>
                        <td className="px-6 py-4 text-gray-600">Vancouver, BC</td>
                        <td className="px-6 py-4 text-gray-600">Official Bus Supplier</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">Operations Timeline</h2>
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200" />
                  <div className="space-y-6">
                    {timeline.map((event, i) => (
                      <div key={i} className="relative pl-12">
                        <div className={`absolute left-2 top-1.5 w-4 h-4 rounded-full border-2 ${event.type === 'milestone' ? 'bg-[#2d7a3a] border-[#2d7a3a]' : 'bg-white border-gray-300'}`} />
                        <div className="text-xs font-bold text-[#2d7a3a] uppercase tracking-wider mb-0.5">{event.phase}</div>
                        <div className="font-semibold text-gray-900 text-sm">{event.desc}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{event.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-[#2d7a3a] pl-6 py-2">
                <p className="text-gray-700 text-lg italic leading-relaxed">
                  &ldquo;Providing fleet support for two Olympic Games — in two countries — without a single service failure is the standard we hold ourselves to for every client.&rdquo;
                </p>
                <footer className="mt-3 text-sm font-semibold text-[#2d7a3a]">— SBL Operations Team</footer>
              </blockquote>

            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Event Summary */}
              <div className="bg-[#1a2e1a] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Event Summary</h3>
                <div className="space-y-3 text-sm">
                  {[
                    ['Events', '2002 + 2010 Winter Olympics'],
                    ['Clients', 'SLOC (2002), VANOC (2010)'],
                    ['Operations', '24/7 during Games'],
                    ['Scope', 'Athletes, media, VIP, officials'],
                    ['Countries', 'USA + Canada'],
                    ['Service Failures', '0'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-green-700/50 pb-2 last:border-0 last:pb-0">
                      <span className="text-green-300">{k}</span>
                      <span className="font-semibold text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Standard */}
              <div className="bg-[#86efac]/15 border border-[#86efac]/40 rounded-2xl p-6">
                <h3 className="font-bold text-[#1a2e1a] mb-2">The Standard</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  SBL brings Olympic-level reliability to every lease program. The same zero-failure commitment we made to two Olympic organizing committees applies to every agency we serve — from a two-bus short-term lease to a 50-unit contract operation.
                </p>
              </div>

              {/* Related links */}
              <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#1a2e1a] mb-3">Related</h3>
                <div className="space-y-2">
                  <Link href="/sbl/fleet" className="flex items-center justify-between text-sm font-medium text-[#2d7a3a] hover:underline py-1">
                    Browse SBL Fleet <span>→</span>
                  </Link>
                  <Link href="/contact" className="flex items-center justify-between text-sm font-medium text-[#2d7a3a] hover:underline py-1">
                    Request a Lease Quote <span>→</span>
                  </Link>
                  <Link href="/sbl" className="flex items-center justify-between text-sm font-medium text-[#2d7a3a] hover:underline py-1">
                    Back to SBL <span>→</span>
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="w-full bg-[#2d7a3a] text-white py-3.5 rounded-xl font-semibold hover:bg-[#256832] transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Request a Lease Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="bg-[#2d7a3a] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Olympic-level fleet reliability for your agency.</h2>
          <p className="text-green-100 mb-6 text-sm">Get a custom lease quote within 24 hours. Our team will match you with the right buses for your routes, ridership, and budget.</p>
          <Link href="/contact" className="bg-white text-[#2d7a3a] px-8 py-3.5 rounded-xl font-semibold hover:bg-green-50 transition-colors inline-block">
            Request a Lease Quote →
          </Link>
        </div>
      </section>
    </>
  )
}
