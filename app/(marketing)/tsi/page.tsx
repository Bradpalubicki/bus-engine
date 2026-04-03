import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import VideoHero from '@/components/marketing/VideoHero'
import { demoTSIInventory } from '@/lib/demo-data'
import { AgencyProofStrip } from '@/components/AgencyProofStrip'
import RFPForm from '@/components/marketing/RFPForm'

export const metadata: Metadata = {
  title: 'Transit Sales International — Pre-Owned Transit Buses For Sale | Murrieta, CA',
  description: 'TSI sells pre-owned transit buses — 30 to 60ft, diesel, CNG, electric, hybrid. FTA compliant. Buy America docs available. 60-day accelerated delivery program.',
  alternates: { canonical: 'https://completecoach.com/tsi' },
  openGraph: {
    title: 'Transit Sales International | Used Transit Buses for Sale | FTA Compliant',
    description: 'Pre-owned transit buses for government agencies. All fuel types, all sizes. FTA compliant, Buy America documentation available.',
    url: 'https://completecoach.com/tsi',
    siteName: 'Complete Coach Works',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'Transit Sales International — Pre-Owned Transit Buses' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transit Sales International | Used Transit Buses for Sale',
    description: 'Pre-owned transit buses for government agencies. FTA compliant. 60-day delivery.',
    images: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=630&fit=crop'],
  },
}

const tsiOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Transit Sales International',
  url: 'https://completecoach.com/tsi',
  logo: 'https://bus-engine.vercel.app/logo.png',
  description: 'Pre-owned transit bus sales for government agencies. 30 to 60ft buses, all fuel types, FTA compliant, Buy America documentation available. 60-day accelerated delivery.',
  parentOrganization: { '@type': 'Organization', name: 'Carson Capital Corp' },
  address: { '@type': 'PostalAddress', streetAddress: '25280 Nance Street', addressLocality: 'Murrieta', addressRegion: 'CA', postalCode: '92562', addressCountry: 'US' },
  telephone: '+19516849585',
  email: 'info@transitsales.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '34',
    bestRating: '5',
  },
}

const busPhotos = [
  'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg',
  'https://completecoach.com/wp-content/uploads/2024/03/muni.jpg',
  'https://completecoach.com/wp-content/uploads/2024/04/st-louis-bus.jpg',
  'https://completecoach.com/wp-content/uploads/2024/06/IMG_3320.jpg',
  'https://completecoach.com/wp-content/uploads/2024/08/octa2.jpg',
  'https://completecoach.com/wp-content/uploads/2024/04/Trimet-before.jpg',
  'https://completecoach.com/wp-content/uploads/2024/03/architect-10-1.jpg',
  'https://completecoach.com/wp-content/uploads/2024/07/ZEPS1.jpg',
  'https://completecoach.com/wp-content/uploads/2024/04/sandy.jpg',
  'https://completecoach.com/wp-content/uploads/2024/04/st-louis-rehab.jpg',
  'https://completecoach.com/wp-content/uploads/2024/03/yamhill.jpg',
  'https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg',
]

const fuelColors: Record<string, string> = {
  diesel:            'bg-gray-100 text-gray-700',
  cng:               'bg-blue-100 text-blue-700',
  electric:          'bg-green-100 text-green-700',
  'diesel-electric': 'bg-teal-100 text-teal-700',
  hydrogen:          'bg-purple-100 text-purple-700',
}

const news = [
  { img: '/images/tsi-inventory/used-transit-bus-2001-new-flyer-d40lf-diesel-trimet-fleet.jpg', title: 'TSI Completes First Delivery Under 10-Bus Contract with RATP Dev', date: 'March 2026' },
  { img: '/images/tsi-inventory/shuttle-bus-leasing-fleet-riverside-ca-used-transit-buses.jpg', title: 'TSI Introduces Accelerated Delivery Program — 60-Day Guarantee', date: 'January 2026' },
  { img: '/images/client-proof/trimet-portland-transit-bus-refurbishment-ccw.jpg', title: 'Flexibility That Fits: Why Bus Leasing Is a Game-Changer for Transit Agencies', date: 'November 2025' },
]

export default function TSIHomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tsiOrganizationSchema) }} />
      <VideoHero
        videoSrc="https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4"
        fallbackImage="https://completecoach.com/wp-content/uploads/2024/03/facility.jpg"
        overlay="from-[#0f3a6e]/85 to-[#1a5fa8]/55"
        eyebrow="1,000+ Units in Stock · 60-Day Delivery Guarantee"
        headline="Pre-Owned Transit Buses Ready to Deploy"
        accentWord="Deploy"
        proofPoints={[
          '60-Day accelerated delivery',
          '40–50% less than new OEM',
          'FTA 5307/5339 funding eligible',
        ]}
        subheadline="30 to 60ft · All fuel types · FTA compliant · 60-day delivery"
        ctaPrimary={{ label: 'Browse Inventory', href: '/tsi/inventory' }}
        ctaSecondary={{ label: 'Get a Quote', href: '/contact' }}
        brand="TSI"
        stats={[
          { value: '500+', label: 'Buses Sold' },
          { value: '30–60ft', label: 'All Sizes' },
          { value: '5', label: 'Fuel Types' },
          { value: '60 Days', label: 'Delivery Program' },
          { value: 'FTA', label: 'Compliant' },
          { value: '100+', label: 'Agency Clients' },
        ]}
      />

      {/* Search bar */}
      <section className="bg-[#1a5fa8] py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-3 flex flex-col sm:flex-row gap-3 shadow-lg">
            <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]">
              <option value="">All Lengths</option>
              <option value="30">30ft</option>
              <option value="35">35ft</option>
              <option value="40">40ft</option>
              <option value="60">60ft Articulated</option>
            </select>
            <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]">
              <option value="">All Fuel Types</option>
              <option value="diesel">Diesel</option>
              <option value="cng">CNG / LNG</option>
              <option value="electric">Electric / BEV</option>
              <option value="hybrid">Hybrid</option>
              <option value="hydrogen">Hydrogen</option>
            </select>
            <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]">
              <option value="">All Conditions</option>
              <option value="refurbished">Refurbished</option>
              <option value="as-is">As-Is</option>
            </select>
            <Link href="/tsi/inventory" className="bg-[#1a5fa8] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#1555a0] transition-colors whitespace-nowrap text-center text-sm">
              Search →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#0f3a6e] text-white py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '1,000+', label: 'Buses in Inventory' },
            { value: '60 Days', label: 'Accelerated Delivery' },
            { value: '50+', label: 'Agencies Served' },
            { value: 'FTA', label: 'Buy America Compliant' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-[#60a5fa]">{s.value}</div>
              <div className="text-sm text-blue-300 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Inventory Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-2">Available Now</div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Inventory</h2>
              <p className="text-gray-500 mt-1">All units FTA eligible · Buy America documentation available on request</p>
            </div>
            <Link href="/tsi/inventory" className="hidden md:block text-sm font-bold text-[#1a5fa8] hover:underline">
              View All 1,000+ Buses →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoTSIInventory.map((bus, i) => (
              <Link key={bus.id} href="/contact" className="group block rounded-2xl overflow-hidden border border-gray-200 hover:border-[#1a5fa8] hover:shadow-xl transition-all">
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <Image
                    src={busPhotos[i % busPhotos.length]}
                    alt={`${bus.year} ${bus.make} ${bus.model} — ${bus.fuelType} transit bus for sale`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${bus.condition === 'refurbished' ? 'bg-green-500 text-white' : 'bg-amber-400 text-amber-900'}`}>
                      {bus.condition === 'refurbished' ? 'Refurbished' : 'As-Is'}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${bus.status === 'available' ? 'bg-white text-[#1a5fa8]' : 'bg-amber-100 text-amber-800'}`}>
                      {bus.status === 'available' ? 'Available' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{bus.year} {bus.make}</h3>
                      <div className="text-gray-500 text-sm">{bus.model}</div>
                    </div>
                    <div className="text-xl font-bold text-[#1a5fa8]">${bus.price.toLocaleString()}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${fuelColors[bus.fuelType] ?? 'bg-gray-100 text-gray-600'}`}>{bus.fuelType}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{bus.length}ft</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{bus.seats} seats</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{bus.mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="text-sm font-bold text-[#1a5fa8] group-hover:underline">Request Info →</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/tsi/inventory" className="inline-block bg-[#1a5fa8] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#1555a0] transition-colors text-lg">
              View All 1,000+ Buses →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRE-OWNED VS NEW COMPARISON ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-3">Side by Side</div>
            <h2 className="text-3xl font-bold text-gray-900">Pre-Owned vs. New OEM</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a5fa8] text-white">
                  <th className="text-left px-5 py-4 font-semibold rounded-tl-2xl">Criteria</th>
                  <th className="text-center px-5 py-4 font-semibold">New OEM Bus</th>
                  <th className="text-center px-5 py-4 font-semibold bg-[#14b8a6] text-[#0f3a6e] rounded-tr-2xl">TSI Pre-Owned ✓</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Cost', '$700K–$900K', '$250K–$450K'],
                  ['Delivery', '12–18 months', '30–60 days'],
                  ['FTA Eligible', 'Yes', 'Yes (5307/5339)'],
                  ['Buy America', 'Yes', 'Verify by unit'],
                  ['Condition', 'New', 'Inspected + certified'],
                  ['Refurb available', 'No', 'Yes — CCW on-site'],
                ].map(([criteria, newBus, tsi], i) => (
                  <tr key={criteria} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'}>
                    <td className="px-5 py-3.5 font-medium text-gray-800">{criteria}</td>
                    <td className="px-5 py-3.5 text-center text-gray-500">{newBus}</td>
                    <td className="px-5 py-3.5 text-center font-semibold text-[#1a5fa8]">{tsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── AI AGENT TEASER ── */}
      <section className="bg-[#0f3a6e] py-4 px-6 border-b border-[#1a5fa8]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-200 text-sm text-center sm:text-left">
            <span className="text-[#60a5fa] font-bold">Questions about inventory, FTA compliance, or delivery timelines?</span>
            {' '}Ask our AI Bus Expert — available 24/7.
          </p>
          <Link
            href="/contact"
            className="flex-shrink-0 bg-[#60a5fa] text-[#0f3a6e] text-sm font-bold px-5 py-2 rounded-lg hover:bg-[#93c5fd] transition-colors whitespace-nowrap"
          >
            Ask Now →
          </Link>
        </div>
      </section>

      {/* ── CONTACT CTA STRIP ── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-3">Ready to Buy?</div>
            <h2 className="text-3xl font-bold text-gray-900">Three Ways to Connect</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Talk to an Expert */}
            <div className="bg-[#F8F9FB] rounded-2xl p-8 border border-gray-200 flex flex-col items-center text-center">
              <div className="relative w-20 h-24 rounded-xl overflow-hidden mb-4 flex-shrink-0">
                <Image
                  src="https://completecoach.com/wp-content/uploads/2026/02/james-200x300-1.jpg"
                  alt="James Carson — TSI Western Regional Sales"
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </div>
              <div className="font-bold text-gray-900 text-lg">James Carson</div>
              <div className="text-sm text-[#1a5fa8] font-medium mt-1 mb-1">Western Regional Sales</div>
              <div className="text-xs text-gray-500 mb-5">20+ years placing transit buses with agencies nationwide</div>
              <Link
                href="/contact"
                className="w-full bg-[#1a5fa8] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1555a0] transition-colors text-sm"
              >
                Talk to an Expert →
              </Link>
            </div>

            {/* Call Us */}
            <div className="bg-[#1a5fa8] rounded-2xl p-8 flex flex-col items-center text-center text-white">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-sm font-medium text-blue-200 mb-2">Call Us Directly</div>
              <a href="tel:9516849585" className="text-3xl font-black text-white hover:text-[#60a5fa] transition-colors mb-2 block">
                (951) 684-9585
              </a>
              <div className="text-xs text-blue-200 mb-6">Mon–Fri · 8am–5pm Pacific</div>
              <a
                href="tel:9516849585"
                className="w-full bg-white text-[#1a5fa8] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
              >
                Call Now →
              </a>
            </div>

            {/* We'll Contact You */}
            <div className="bg-[#F8F9FB] rounded-2xl p-8 border border-gray-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#1a5fa8]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#1a5fa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="font-bold text-gray-900 text-lg mb-1">We Can Contact You</div>
              <div className="text-sm text-gray-500 mb-5">Leave your info and a TSI specialist will reach out within one business day.</div>
              <div className="w-full space-y-3 mb-5">
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-1 font-medium">Your Name</div>
                  <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 bg-white">e.g. John Smith, Fleet Manager</div>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-1 font-medium">Email or Phone</div>
                  <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 bg-white">e.g. john@transitagency.gov</div>
                </div>
              </div>
              <Link
                href="/contact"
                className="w-full bg-[#1a5fa8] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1555a0] transition-colors text-sm"
              >
                Send My Inquiry →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Why Buy Pre-Owned */}
      <section className="py-16 bg-[#0f3a6e] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-[#60a5fa] uppercase tracking-widest mb-3">The Smart Choice</div>
            <h2 className="text-3xl font-bold">Why Agencies Choose Pre-Owned</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: '40–60% Cost Savings', body: 'A refurbished 40ft low-floor runs $145K–$265K vs $550K+ for new. Same revenue service, same capacity, far less budget impact.' },
              { icon: '📋', title: 'FTA Buy America Eligible', body: 'All TSI inventory is FTA eligible. Buy America documentation available on request. We\'ve completed federal procurement for 50+ agencies.' },
              { icon: '⚡', title: '60-Day Accelerated Delivery', body: 'New buses take 18–36 months. TSI\'s Accelerated Delivery Program puts buses in revenue service within 60 days — ideal for emergency fleet gaps.' },
            ].map(item => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-8 hover:bg-white/15 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-200 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Segments */}
      <section className="py-16 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-3">Who We Serve</div>
            <h2 className="text-3xl font-bold text-gray-900">Industries We Supply</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: 'https://completecoach.com/wp-content/uploads/2018/08/TRANST-ICON.png', label: 'Transit Agencies' },
              { icon: 'https://completecoach.com/wp-content/uploads/2018/08/UNIVERSITY-ICON.png', label: 'Universities' },
              { icon: 'https://completecoach.com/wp-content/uploads/2018/08/GOVERNMENT-ICON.png', label: 'Government' },
              { icon: 'https://completecoach.com/wp-content/uploads/2018/08/AIRPORT-ICON.png', label: 'Airports' },
              { icon: 'https://completecoach.com/wp-content/uploads/2018/08/TRAVEL-ICON.png', label: 'Charter & Tour' },
            ].map(seg => (
              <div key={seg.label} className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-[#1a5fa8] hover:shadow-md transition-all">
                <div className="relative w-14 h-14 mx-auto mb-3">
                  <Image src={seg.icon} alt={seg.label} fill className="object-contain" sizes="56px" />
                </div>
                <div className="text-sm font-bold text-gray-700">{seg.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sales Team */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-3">Our Team</div>
            <h2 className="text-3xl font-bold text-gray-900">Talk to a Bus Expert</h2>
            <p className="text-gray-500 mt-2">Our sales team has placed buses with 50+ transit agencies nationwide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'James Carson', title: 'Western Regional Sales', img: 'https://completecoach.com/wp-content/uploads/2026/02/james-200x300-1.jpg', phone: '(951) 684-9585' },
              { name: 'Jay Raber', title: 'Regional Sales Manager', img: 'https://completecoach.com/wp-content/uploads/2026/02/Jay-200x300-1.jpg', phone: '(951) 684-9585' },
            ].map(rep => (
              <div key={rep.name} className="flex items-center gap-5 bg-[#F8F9FB] rounded-2xl p-6 border border-gray-200">
                <div className="relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image src={rep.img} alt={rep.name} fill className="object-cover object-top" sizes="80px" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{rep.name}</div>
                  <div className="text-sm text-[#1a5fa8] font-medium mb-2">{rep.title}</div>
                  <a href="tel:9516849585" className="text-sm text-gray-600 hover:text-[#1a5fa8]">{rep.phone}</a>
                  <div className="mt-2">
                    <Link href="/contact" className="text-sm font-bold text-[#1a5fa8] hover:underline">Send a Message →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-2">Latest</div>
              <h2 className="text-3xl font-bold text-gray-900">TSI News</h2>
            </div>
            <Link href="/news" className="hidden md:block text-sm font-bold text-[#1a5fa8] hover:underline">All News →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map(item => (
              <Link key={item.title} href="/news" className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-400 mb-2">{item.date}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#1a5fa8] transition-colors leading-snug">{item.title}</h3>
                  <div className="mt-3 text-sm font-semibold text-[#1a5fa8] group-hover:underline">Read More →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <AgencyProofStrip />
      </div>

      {/* ── TSI RFP FORM ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-3">Get a Quote</div>
            <h2 className="text-3xl font-bold text-gray-900">Find Your Next Bus</h2>
            <p className="text-gray-500 mt-3">Tell us what you need — a TSI specialist will respond within one business day.</p>
          </div>
          <RFPForm brand="TSI" accentColor="#14b8a6" />
        </div>
      </section>

      {/* ── AI NUDGE BANNER ── */}
      <section className="py-10 px-6" style={{ backgroundColor: '#eef2ff', borderTop: '1px solid #c7d2fe', borderBottom: '1px solid #c7d2fe' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#6366f1' }}>AI Bus Expert — Available 24/7</div>
            <p className="text-gray-800 font-semibold text-lg leading-snug">Questions about inventory, delivery timelines, or FTA funding?</p>
            <p className="text-gray-500 text-sm mt-1">Our AI agent knows TSI's full inventory, 60-day delivery program, FTA 5307/5339 eligibility, and Buy America requirements.</p>
          </div>
          <a
            href="#ai-agent"
            className="flex-shrink-0 font-bold px-7 py-3 rounded-lg text-white hover:brightness-110 transition-all whitespace-nowrap text-sm"
            style={{ backgroundColor: '#4f46e5' }}
          >
            Ask Now →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1a5fa8] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Next <span style={{ color: '#14b8a6' }}>Fleet?</span></h2>
          <p className="text-blue-200 text-lg mb-8">TSI has placed buses with 50+ transit agencies. Tell us what you need and we&apos;ll find it.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tsi/inventory" className="font-bold px-8 py-4 rounded-lg hover:brightness-110 transition-all text-lg" style={{ backgroundColor: '#14b8a6', color: '#0A1628' }}>
              Browse All Inventory
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
