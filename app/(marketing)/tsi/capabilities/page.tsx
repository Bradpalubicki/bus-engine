import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TSI Capabilities Statement | Transit Sales International',
  description: 'Transit Sales International capabilities statement: NAICS 441228, pre-owned transit bus sales for government agencies. FTA compliant, Buy America documentation, SAM registered.',
  alternates: { canonical: 'https://completecoach.com/tsi/capabilities' },
}

const capabilitiesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Transit Sales International',
  url: 'https://completecoach.com/tsi',
  description: 'Pre-owned transit bus dealer serving government agencies. NAICS 441228. FTA compliant. SAM.gov registered.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '25280 Nance Street',
    addressLocality: 'Murrieta',
    addressRegion: 'CA',
    postalCode: '92562',
    addressCountry: 'US',
  },
  telephone: '+19516849585',
  email: 'info@transitsales.com',
  knowsAbout: [
    'Pre-owned transit bus sales',
    'FTA procurement compliance',
    'Buy America documentation',
    'Government fleet procurement',
    'NAICS 441228',
  ],
}

export default function TSICapabilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(capabilitiesSchema) }}
      />

      {/* Header */}
      <div className="bg-blue-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-2">Capabilities Statement</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Transit Sales International</h1>
          <p className="text-blue-200 text-lg">Pre-Owned Transit Bus Sales for Government Agencies</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="bg-blue-800 px-3 py-1 rounded-full">NAICS 441228</span>
            <span className="bg-blue-800 px-3 py-1 rounded-full">FTA Compliant</span>
            <span className="bg-blue-800 px-3 py-1 rounded-full">SAM.gov Registered</span>
            <span className="bg-blue-800 px-3 py-1 rounded-full">Buy America Docs Available</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Core Competencies */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-900 pb-2">Core Competencies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Pre-owned transit bus procurement and sales',
              'FTA-compliant acquisition documentation',
              'Buy America certification and compliance support',
              'Fleet assessment and vehicle inspection services',
              'Government agency fleet consulting',
              '60-day accelerated delivery program',
              'Multi-fuel type inventory: diesel, CNG, electric, hybrid',
              'Bus sizes 30–60 ft available',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-blue-700 font-bold mt-0.5">✓</span>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Differentiators */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-900 pb-2">Differentiators</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-700 pl-4">
              <h3 className="font-semibold text-gray-900">CCW Family of Companies</h3>
              <p className="text-gray-600 text-sm mt-1">TSI is a division of Carson Capital Corp, parent company of Complete Coach Works — the nation&apos;s largest transit bus remanufacturer. Our pre-owned buses are inspected, remanufactured, and sold with the backing of 38 years of transit expertise.</p>
            </div>
            <div className="border-l-4 border-blue-700 pl-4">
              <h3 className="font-semibold text-gray-900">FTA Procurement Expertise</h3>
              <p className="text-gray-600 text-sm mt-1">We provide complete FTA-compliant documentation packages including Buy America certifications, pre-award audit support, and procurement checklists tailored to each agency&apos;s grant program.</p>
            </div>
            <div className="border-l-4 border-blue-700 pl-4">
              <h3 className="font-semibold text-gray-900">60-Day Delivery Commitment</h3>
              <p className="text-gray-600 text-sm mt-1">Our accelerated delivery program gets FTA-compliant, inspected buses to your agency in 60 days or less — ideal for agencies with grant deadlines or fleet emergency needs.</p>
            </div>
            <div className="border-l-4 border-blue-700 pl-4">
              <h3 className="font-semibold text-gray-900">100% Employee-Owned (ESOP)</h3>
              <p className="text-gray-600 text-sm mt-1">As an ESOP company, every member of our team has a direct ownership stake in delivering exceptional service. This structure aligns our incentives entirely with our government customers.</p>
            </div>
          </div>
        </section>

        {/* Past Performance */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-900 pb-2">Past Performance</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { agency: 'TriMet (Portland, OR)', scope: 'Pre-owned diesel fleet acquisition', size: '12 buses' },
              { agency: 'SFMTA (San Francisco, CA)', scope: 'Pre-owned CNG fleet procurement', size: '8 buses' },
              { agency: 'Metro St. Louis (MO)', scope: 'Mixed fleet bus acquisition', size: '15 buses' },
              { agency: 'OCTA (Orange County, CA)', scope: 'Pre-owned transit bus sales', size: '20+ buses' },
              { agency: 'Yamhill County Transit (OR)', scope: 'Small fleet rural transit procurement', size: '4 buses' },
              { agency: 'Sandy Area Metro (OR)', scope: 'Community transit fleet update', size: '3 buses' },
            ].map((item) => (
              <div key={item.agency} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold text-gray-900 text-sm">{item.agency}</p>
                <p className="text-gray-500 text-xs mt-1">{item.scope}</p>
                <p className="text-blue-700 text-xs font-medium mt-1">{item.size}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company Data */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-900 pb-2">Company Data</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {[
                ['Legal Name', 'Transit Sales International'],
                ['NAICS Code', '441228 — Motorcycle, ATV, and All Other Motor Vehicle Dealers (Transit Bus)'],
                ['Business Type', 'ESOP — 100% Employee Owned'],
                ['Founded', '2005 (CCW Family: 1987)'],
                ['Headquarters', '25280 Nance Street, Murrieta, CA 92562'],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="text-gray-500 text-sm w-36 flex-shrink-0">{label}</span>
                  <span className="text-gray-900 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                ['Phone', '(951) 684-9585'],
                ['Email', 'info@transitsales.com'],
                ['Website', 'transitsales.com'],
                ['SAM.gov', 'Registered — Active'],
                ['Registrations', 'FTA, Buy America, State procurement portals'],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="text-gray-500 text-sm w-36 flex-shrink-0">{label}</span>
                  <span className="text-gray-900 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Start Your Procurement Conversation</h2>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">Ready to discuss your agency&apos;s fleet needs? Our team provides FTA documentation support, fleet assessments, and 60-day delivery for qualified agencies.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tsi#rfp"
              className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Submit an RFP
            </Link>
            <a
              href="tel:+19516849585"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Call (951) 684-9585
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
