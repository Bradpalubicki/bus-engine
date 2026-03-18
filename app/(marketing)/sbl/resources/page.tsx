import Link from 'next/link'
import { FileText, Download, ArrowRight, Phone, Mail } from 'lucide-react'

export const metadata = {
  title: 'Resources | Shuttle Bus Leasing',
  description: 'SBL resources — lease program guides, fleet planning tools, compliance documentation, and transit industry references.',
}

const resources = [
  {
    category: 'Lease Programs & Planning',
    items: [
      { title: 'SBL Fleet Catalog', desc: 'Current leasable fleet — 1,000+ buses, 30 to 60ft, diesel, CNG, hybrid, and electric. Monthly pricing and availability.', href: '/sbl/fleet', cta: 'View Fleet', external: false },
      { title: 'Lease vs. Buy Calculator Guide', desc: 'How to evaluate short-term leasing vs. capital purchase for gap coverage, seasonal needs, and emergency replacement scenarios.', href: '/contact', cta: 'Request Guide', external: false },
      { title: 'Lease Program Overview', desc: 'All four SBL lease programs explained — short-term, long-term, lease-to-own, and event/gap coverage. Terms, rates, and what\'s included.', href: '/contact', cta: 'Request PDF', external: false },
    ],
  },
  {
    category: 'Operations & Maintenance',
    items: [
      { title: 'Lessee Maintenance Responsibilities', desc: 'What SBL handles vs. what the lessee is responsible for — preventive maintenance schedules, roadcall procedures, and damage reporting.', href: '/contact', cta: 'Request Document', external: false },
      { title: 'Fleet Delivery & Acceptance Guide', desc: 'What to expect on delivery day — pre-delivery inspection, driver orientation, documentation, and insurance requirements.', href: '/contact', cta: 'Request PDF', external: false },
      { title: 'Emergency Replacement Program', desc: 'SBL\'s 72-hour emergency replacement guarantee — how it works, availability zones, and how to activate a replacement during an unplanned outage.', href: '/contact', cta: 'Learn More', external: false },
    ],
  },
  {
    category: 'FTA & Compliance',
    items: [
      { title: 'FTA Leasing Guidelines (49 CFR Part 639)', desc: 'Federal regulations governing transit bus leasing arrangements funded in part by federal grants — applicability and compliance steps.', href: 'https://www.transit.dot.gov', cta: 'FTA.gov', external: true },
      { title: 'ADA Compliance Documentation', desc: 'All SBL lease vehicles meet ADA accessibility standards — documentation available for fleet audit and federal reporting purposes.', href: '/contact', cta: 'Request Document', external: false },
      { title: 'CARB Fleet Rule Compliance', desc: 'How SBL\'s lease fleet meets California Air Resources Board in-use transit bus regulations for California-based operators.', href: 'https://ww2.arb.ca.gov', cta: 'Visit CARB', external: true },
    ],
  },
  {
    category: 'Event & Special Operations',
    items: [
      { title: 'Event Fleet Planning Guide', desc: 'Capacity planning, logistics, driver coordination, and contingency protocols for major events — based on SBL\'s 2002 & 2010 Olympic Games experience.', href: '/contact', cta: 'Request Guide', external: false },
      { title: 'Olympic Games Case Study', desc: 'How SBL provided zero-failure bus service for the 2002 Salt Lake City and 2010 Vancouver Olympics — 100% on-time performance across multi-venue operations.', href: '/sbl/case-studies/olympic-games-bus-supplier', cta: 'Read Case Study', external: false },
      { title: 'APTA — Public Transit Resources', desc: 'Industry standards, advocacy, and resources for public transit agencies and fleet operators.', href: 'https://www.apta.com', cta: 'Visit APTA', external: true },
    ],
  },
]

export default function SBLResourcesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#2d7a3a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-green-100 text-xs font-bold uppercase tracking-widest mb-4">
            SBL Resources
          </div>
          <h1 className="text-4xl font-bold mb-3">Leasing Resources & Documentation</h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Everything your agency needs to plan, execute, and manage a bus leasing program — from program guides to FTA compliance documentation.
          </p>
        </div>
      </section>

      {/* Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {resources.map((group) => (
          <div key={group.category}>
            <h2 className="text-xl font-bold text-[#003087] mb-6 pb-3 border-b border-gray-200">{group.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {group.items.map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[#2d7a3a]" />
                    </div>
                    <h3 className="font-semibold text-[#003087] text-sm leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{item.desc}</p>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-[#2d7a3a] text-xs font-semibold hover:underline"
                  >
                    {item.external ? <Download className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-[#2d7a3a] text-white py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Need a Custom Lease Quote?</h2>
          <p className="text-green-100 mb-8">Our fleet specialists can put together a lease program tailored to your agency\'s budget, timeline, and fleet requirements — typically within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#2d7a3a] px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center gap-2">
              <Mail className="w-4 h-4" /> Get a Quote
            </Link>
            <a href="tel:+19516893700" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> (951) 689-3700
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
