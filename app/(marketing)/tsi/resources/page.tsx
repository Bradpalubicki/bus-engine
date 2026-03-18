import Link from 'next/link'
import { FileText, Download, ArrowRight, Phone, Mail, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Resources | Transit Sales International',
  description: 'TSI resources — bus specifications, FTA compliance documentation, financing guides, and transit industry reference materials.',
}

const resources = [
  {
    category: 'Sales & Purchasing',
    items: [
      { title: 'TSI Bus Inventory Catalog', desc: 'Current inventory of 1,000+ pre-owned transit buses — 30 to 60ft, all fuel types.', href: '/tsi/inventory', cta: 'Browse Inventory', external: false },
      { title: 'FTA Pre-Owned Bus Procurement Guide', desc: 'How to use federal Section 5307 and 5309 funds to purchase pre-owned transit buses — eligibility, documentation, and compliance steps.', href: '/contact', cta: 'Request PDF', external: false },
      { title: '60-Day Accelerated Delivery Program', desc: 'TSI\'s guaranteed 60-day delivery window — how it works, what\'s included, and how to qualify.', href: '/contact', cta: 'Get Details', external: false },
    ],
  },
  {
    category: 'Technical Specifications',
    items: [
      { title: 'Bus Inspection Checklist (Pre-Purchase)', desc: 'Comprehensive mechanical and cosmetic inspection checklist for evaluating pre-owned transit buses before purchase.', href: '/contact', cta: 'Request PDF', external: false },
      { title: 'Fuel Type Comparison Guide', desc: 'Side-by-side comparison of diesel, CNG, hybrid, and electric pre-owned bus options — cost, availability, and CARB compliance status.', href: '/contact', cta: 'Request PDF', external: false },
      { title: 'Vehicle History Documentation', desc: 'What to expect in TSI vehicle history packages — maintenance records, mileage, prior agency service, and certification status.', href: '/contact', cta: 'Learn More', external: false },
    ],
  },
  {
    category: 'FTA & Compliance',
    items: [
      { title: 'Buy America Compliance Statement', desc: 'TSI\'s official Buy America compliance documentation for federally funded transit bus purchases.', href: '/contact', cta: 'Request Document', external: false },
      { title: 'FTA Bus Age & Mileage Standards', desc: 'Federal guidelines for useful life of transit buses and eligibility requirements for disposition and replacement.', href: 'https://www.transit.dot.gov/funding/grants/grant-programs/bus-bus-facilities', cta: 'FTA.gov', external: true },
      { title: 'SAM.gov Vendor Registration', desc: 'TSI is a registered federal vendor on SAM.gov — required for agencies processing purchases under federal grant programs.', href: 'https://sam.gov', cta: 'SAM.gov', external: true },
    ],
  },
  {
    category: 'Industry Links',
    items: [
      { title: 'APTA — American Public Transportation Association', desc: 'Industry standards, advocacy, and resources for public transit agencies and vendors.', href: 'https://www.apta.com', cta: 'Visit APTA', external: true },
      { title: 'FTA — Federal Transit Administration', desc: 'Federal funding programs, compliance requirements, and grant guidance for transit agencies.', href: 'https://www.transit.dot.gov', cta: 'Visit FTA', external: true },
      { title: 'CARB — California Air Resources Board', desc: 'Zero-emission and low-emission fleet mandates, incentive programs, and compliance timelines.', href: 'https://ww2.arb.ca.gov', cta: 'Visit CARB', external: true },
    ],
  },
]

export default function TSIResourcesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a5fa8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-blue-100 text-xs font-bold uppercase tracking-widest mb-4">
            TSI Resources
          </div>
          <h1 className="text-4xl font-bold mb-3">Transit Procurement Resources</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Guides, compliance documents, technical specs, and industry links to help your agency make confident bus procurement decisions.
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
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[#1a5fa8]" />
                    </div>
                    <h3 className="font-semibold text-[#003087] text-sm leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{item.desc}</p>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-[#1a5fa8] text-xs font-semibold hover:underline"
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

      {/* TSI Sales Team CTA */}
      <section className="bg-[#1a5fa8] text-white py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Need a Specific Document?</h2>
          <p className="text-blue-100 mb-8">Our sales team can provide vehicle history reports, custom spec sheets, compliance documentation, and financing guidance for any bus in our inventory.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#1a5fa8] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contact TSI Sales
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
