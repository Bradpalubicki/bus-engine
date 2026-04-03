import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import VideoHero from '@/components/marketing/VideoHero'
import { AgencyProofStrip } from '@/components/AgencyProofStrip'
import { ServiceGallery } from '@/components/ServiceGallery'
import { sblFleetImages } from '@/data/imageManifest'
import RFPForm from '@/components/marketing/RFPForm'

export const metadata: Metadata = {
  title: 'Shuttle Bus Leasing — Short & Long-Term Transit Bus Leasing | Riverside, CA',
  description: 'SBL offers seasonal, gap, contract, and lease-to-own bus programs. 2002 & 2010 Olympics supplier. 1,000+ bus inventory. FTA compliant. Get a quote in 24 hours.',
  alternates: { canonical: 'https://completecoach.com/sbl' },
  openGraph: {
    title: 'Shuttle Bus Leasing | Transit Bus Rental & Lease | Seasonal & Contract',
    description: 'Short and long-term transit bus leasing. Seasonal, gap, contract, employee shuttle, and lease-to-own programs. Official Olympic bus supplier.',
    url: 'https://completecoach.com/sbl',
    siteName: 'Complete Coach Works',
    type: 'website',
    images: [{ url: 'https://completecoach.com/wp-content/uploads/2024/08/CCW-9-2017-10.jpg', width: 1200, height: 630, alt: 'Shuttle Bus Leasing — Transit Bus Fleet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shuttle Bus Leasing | Transit Bus Rental & Lease',
    description: 'Short and long-term transit bus leasing. Olympic supplier. 1,000+ bus inventory.',
    images: ['https://completecoach.com/wp-content/uploads/2024/08/CCW-9-2017-10.jpg'],
  },
}

const sblOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shuttle Bus Leasing',
  url: 'https://completecoach.com/sbl',
  logo: 'https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png',
  description: 'Short-term, contract, and lease-to-own transit bus programs. Official bus supplier for the 2002 Salt Lake City and 2010 Vancouver Winter Olympic Games.',
  parentOrganization: { '@type': 'Organization', name: 'Carson Capital Corp' },
  address: { '@type': 'PostalAddress', streetAddress: '1313 Columbia Ave', addressLocality: 'Riverside', addressRegion: 'CA', postalCode: '92507', addressCountry: 'US' },
  telephone: '+19516849585',
  email: 'info@completecoach.com',
}

const leasePrograms = [
  {
    type: 'Short-Term / Gap',
    duration: '1–12 months',
    use: 'Emergency coverage, fleet gaps, rehab downtime',
    img: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg',
    price: 'From $1,400/mo',
  },
  {
    type: 'Contract Lease',
    duration: '1–5 years',
    use: 'Fixed-route operations, dedicated service',
    img: 'https://completecoach.com/wp-content/uploads/2024/03/muni.jpg',
    price: 'From $2,800/mo',
  },
  {
    type: 'Lease-to-Own',
    duration: 'Flexible terms',
    use: 'Budget-constrained agencies, path to ownership',
    img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_3320.jpg',
    price: 'Custom pricing',
  },
  {
    type: 'Employee Shuttle',
    duration: 'Ongoing',
    use: 'Corporate campus, hospital systems, events',
    img: 'https://completecoach.com/wp-content/uploads/2024/04/st-louis-bus.jpg',
    price: 'From $1,400/mo',
  },
]

const fleetCards = [
  { year: 2018, make: 'MCI', model: 'D4500CT', fuel: 'Diesel', length: 45, seats: 55, condition: 'Refurbished', price: 'From $4,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/04/sandy.jpg' },
  { year: 2016, make: 'Gillig', model: 'Low Floor 40ft', fuel: 'CNG', length: 40, seats: 40, condition: 'Refurbished', price: 'From $2,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/03/yamhill.jpg' },
  { year: 2020, make: 'Starcraft', model: 'Allstar', fuel: 'Gas', length: 30, seats: 24, condition: 'Refurbished', price: 'From $1,400/mo', img: 'https://completecoach.com/wp-content/uploads/2024/04/st-louis-rehab.jpg' },
  { year: 2017, make: 'New Flyer', model: 'Xcelsior XD40', fuel: 'Diesel', length: 40, seats: 40, condition: 'Refurbished', price: 'From $2,500/mo', img: 'https://completecoach.com/wp-content/uploads/2024/08/octa2.jpg' },
  { year: 2019, make: 'Gillig', model: 'Low Floor 35ft', fuel: 'CNG', length: 35, seats: 35, condition: 'Refurbished', price: 'From $2,200/mo', img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_2928.jpg' },
  { year: 2015, make: 'Van Hool', model: 'AG300', fuel: 'CNG', length: 60, seats: 52, condition: 'Refurbished', price: 'From $3,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg' },
]

const news = [
  { img: '/images/sbl-fleet/shuttle-bus-leasing-fleet-riverside-ca-used-transit-buses.jpg', title: 'SBL Announces Two-Bus Lease for Ozark Regional Transit Authority', date: 'January 2026' },
  { img: '/images/sbl-fleet/new-flyer-d60lf-60ft-articulated-transit-bus-lease.jpg', title: 'Flexibility That Fits: Why Bus Leasing Is a Game-Changer for Transit Agencies', date: 'November 2025' },
  { img: '/images/midlife-overhaul/transit-bus-midlife-overhaul-shop-floor-complete-coach-works.jpg', title: 'Lifecycle Cost Matters: Value Through Smarter Fleet Investment', date: 'March 2026' },
]

export default function SBLHomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sblOrganizationSchema) }} />
      <VideoHero
        videoSrc="https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4"
        fallbackImage="https://completecoach.com/wp-content/uploads/2024/06/SBL.jpg"
        overlay="from-[#1a2e1a]/88 to-[#2d7a3a]/55"
        eyebrow="Short-Term · Contract · Lease-to-Own Programs"
        headline="Transit Bus Leasing Built for Agencies"
        accentWord="Leasing"
        proofPoints={[
          'Gap coverage same week',
          'Lease-to-own available',
          'CCW-maintained fleet',
        ]}
        subheadline="Short-term, contract, and lease-to-own programs. 1,000+ bus inventory. Quote in 24 hours."
        ctaPrimary={{ label: 'View Lease Programs', href: '/sbl/fleet' }}
        ctaSecondary={{ label: 'Get a Quote', href: '/contact' }}
        brand="SBL"
        stats={[
          { value: '1,000+', label: 'Bus Inventory' },
          { value: '2002 & 2010', label: 'Olympics Supplier' },
          { value: '24 hrs', label: 'Quote Turnaround' },
          { value: '1–60 mo', label: 'Lease Terms' },
          { value: 'FTA', label: 'Compliant' },
          { value: 'Nationwide', label: 'Delivery' },
        ]}
      />

      {/* Olympics trust bar — lead with it, it's the biggest credential */}
      <section className="bg-[#2d7a3a] text-white py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="text-4xl">🏅</div>
          <div>
            <div className="font-bold text-lg">Official Bus Supplier — Two Olympic Games</div>
            <div className="text-green-200 text-sm mt-1">2002 Winter Olympics, Salt Lake City · 2010 Winter Olympics, Vancouver</div>
          </div>
          <div className="hidden md:block h-10 w-px bg-green-500/50" />
          <div className="text-sm text-green-200">
            <span className="text-white font-bold">1,000+ buses</span> available · <span className="text-white font-bold">24-hour</span> quote turnaround · <span className="text-white font-bold">FTA</span> compliant
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1a2e1a] text-white py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '1,000+', label: 'Buses Available' },
            { value: '24 Hrs', label: 'Quote Turnaround' },
            { value: '2 Olympics', label: 'Official Supplier' },
            { value: 'All Sizes', label: '30ft to 60ft' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-[#86efac]">{s.value}</div>
              <div className="text-sm text-green-300 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lease Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-[#2d7a3a] uppercase tracking-widest mb-3">How It Works</div>
            <h2 className="text-3xl font-bold text-gray-900">Lease Programs for Every Need</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">From emergency gap coverage to long-term fleet operations — SBL has a program that fits your budget and timeline.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leasePrograms.map(p => (
              <Link key={p.type} href="/contact" className="group block rounded-2xl overflow-hidden border border-gray-200 hover:border-[#2d7a3a] hover:shadow-xl transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image src={p.img} alt={p.type} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className="absolute inset-0 bg-[#1a2e1a]/50" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#2d7a3a] text-white text-xs px-2.5 py-1 rounded-full font-bold">{p.price}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{p.type}</h3>
                  <div className="text-sm text-[#2d7a3a] font-medium mb-2">{p.duration}</div>
                  <p className="text-gray-500 text-sm">{p.use}</p>
                  <div className="mt-4 text-sm font-bold text-[#2d7a3a] group-hover:underline">Get a Quote →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEASE VS BUY COMPARISON ── */}
      <section className="py-16 bg-[#F8F9FB]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-sm font-bold text-[#2d7a3a] uppercase tracking-widest mb-3">Side by Side</div>
            <h2 className="text-3xl font-bold text-gray-900">Lease vs. Buy vs. Finance</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a2e1a] text-white">
                  <th className="text-left px-5 py-4 font-semibold rounded-tl-2xl">Criteria</th>
                  <th className="text-center px-5 py-4 font-semibold">Purchase New</th>
                  <th className="text-center px-5 py-4 font-semibold">CCW/TSI Pre-Owned</th>
                  <th className="text-center px-5 py-4 font-semibold bg-[#2d7a3a] rounded-tr-2xl">SBL Lease ✓</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Upfront cost', '$700K–$900K', '$250K–$450K', '$0 down available'],
                  ['Monthly cost', 'Loan payment', 'Loan payment', 'Fixed lease rate'],
                  ['Maintenance', 'Your cost', 'Your cost', 'Included options'],
                  ['Fleet flexibility', 'Low', 'Medium', 'High'],
                  ['FTA funding', 'Yes', 'Yes', 'Yes'],
                  ['End of term', 'Own asset', 'Own asset', 'Return or buy'],
                ].map(([criteria, newBus, preOwned, lease], i) => (
                  <tr key={criteria} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'}>
                    <td className="px-5 py-3.5 font-medium text-gray-800">{criteria}</td>
                    <td className="px-5 py-3.5 text-center text-gray-500">{newBus}</td>
                    <td className="px-5 py-3.5 text-center text-gray-500">{preOwned}</td>
                    <td className="px-5 py-3.5 text-center font-semibold text-[#2d7a3a]">{lease}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Available Fleet */}
      <section className="py-16 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-sm font-bold text-[#2d7a3a] uppercase tracking-widest mb-2">Available Now</div>
              <h2 className="text-3xl font-bold text-gray-900">Lease Fleet Inventory</h2>
              <p className="text-gray-500 mt-1">All units maintained to FTA standards · ADA compliant</p>
            </div>
            <Link href="/sbl/fleet" className="hidden md:block text-sm font-bold text-[#2d7a3a] hover:underline">
              View Full Fleet →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetCards.map(bus => (
              <Link key={`${bus.year}-${bus.make}-${bus.model}`} href="/contact" className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#2d7a3a] hover:shadow-xl transition-all">
                <div className="relative h-52 overflow-hidden">
                  <Image src={bus.img} alt={`${bus.year} ${bus.make} ${bus.model} lease`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">Available</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{bus.year} {bus.make}</h3>
                      <div className="text-gray-500 text-sm">{bus.model}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#2d7a3a]">{bus.price}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">{bus.fuel}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{bus.length}ft</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{bus.seats} seats</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">{bus.condition}</span>
                  </div>
                  <div className="text-sm font-bold text-[#2d7a3a] group-hover:underline">Inquire About Lease →</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/sbl/fleet" className="inline-block bg-[#2d7a3a] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#256832] transition-colors text-lg">
              View Full Lease Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Why Lease */}
      <section className="py-16 bg-[#1a2e1a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-[#86efac] uppercase tracking-widest mb-3">The Business Case</div>
            <h2 className="text-3xl font-bold">Why Agencies Lease Instead of Buy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📉', title: 'Preserve Capital', body: 'No large upfront purchase. Lease payments come from operating budget, not capital budget — easier board approval, faster deployment.' },
              { icon: '🔄', title: 'Fleet Flexibility', body: 'Scale up for summer ridership, pull back in winter. Add buses for special events. Return units when rehab is done. No stranded assets.' },
              { icon: '🛡️', title: 'Maintenance Included', body: 'SBL lease programs include full preventive maintenance to FTA standards. Your team focuses on operations — we handle the buses.' },
            ].map(item => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-8 hover:bg-white/15 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-green-200 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-bold text-[#2d7a3a] uppercase tracking-widest mb-3">Our Fleet</div>
            <h2 className="text-3xl font-bold text-gray-900">Buses in the Field</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { src: 'https://completecoach.com/wp-content/uploads/2024/06/SBL.jpg', alt: 'SBL lease fleet — Riverside, CA' },
              { src: 'https://completecoach.com/wp-content/uploads/2024/06/transit-sales.jpg', alt: 'TSI / SBL bus yard — Murrieta, CA' },
              { src: 'https://completecoach.com/wp-content/uploads/2024/03/facility.jpg', alt: 'CCW / SBL maintenance facility' },
              { src: 'https://completecoach.com/wp-content/uploads/2024/08/accident2.jpg', alt: 'Full collision repair before lease' },
              { src: 'https://completecoach.com/wp-content/uploads/2024/04/Untitled-1-1.jpg', alt: 'Refurbished bus ready for lease' },
              { src: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg', alt: 'CNG bus — lease fleet' },
            ].map(img => (
              <div key={img.src} className="relative aspect-video rounded-xl overflow-hidden group">
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-[#2d7a3a]/0 group-hover:bg-[#2d7a3a]/40 transition-colors flex items-end p-3">
                  <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.alt}</p>
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
              <div className="text-sm font-bold text-[#2d7a3a] uppercase tracking-widest mb-2">Latest</div>
              <h2 className="text-3xl font-bold text-gray-900">SBL News</h2>
            </div>
            <Link href="/news" className="hidden md:block text-sm font-bold text-[#2d7a3a] hover:underline">All News →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map(item => (
              <Link key={item.title} href="/news" className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-400 mb-2">{item.date}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#2d7a3a] transition-colors leading-snug">{item.title}</h3>
                  <div className="mt-3 text-sm font-semibold text-[#2d7a3a] group-hover:underline">Read More →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Gallery */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Available Fleet</h2>
          <p className="text-sm text-gray-500 mb-6">1,000+ buses in inventory. All lengths, all fuel types. Ready for lease.</p>
          <ServiceGallery images={sblFleetImages} defaultShow={6} />
          <AgencyProofStrip />
        </div>
      </section>

      {/* ── SBL RFP FORM ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-bold text-[#2d7a3a] uppercase tracking-widest mb-3">Get a Quote</div>
            <h2 className="text-3xl font-bold text-gray-900">Request a Lease Quote</h2>
            <p className="text-gray-500 mt-3">We&apos;ll respond within 24 hours with a custom lease proposal.</p>
          </div>
          <RFPForm brand="SBL" accentColor="#2563eb" />
        </div>
      </section>

      {/* ── AI NUDGE BANNER ── */}
      <section className="py-10 px-6" style={{ backgroundColor: '#eef2ff', borderTop: '1px solid #c7d2fe', borderBottom: '1px solid #c7d2fe' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#6366f1' }}>AI Leasing Advisor — Available 24/7</div>
            <p className="text-gray-800 font-semibold text-lg leading-snug">Questions about lease programs, pricing, or fleet coverage?</p>
            <p className="text-gray-500 text-sm mt-1">Our AI agent can walk you through SBL's short-term, contract, and lease-to-own programs — and match buses to your routes.</p>
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
      <section className="py-16 bg-[#2d7a3a] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to <span style={{ color: '#60a5fa' }}>Lease</span> Your Next Fleet?</h2>
          <p className="text-green-200 text-lg mb-8">Get a custom lease quote within 24 hours. Our team will match you with the right buses for your routes, ridership, and budget.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="font-bold px-8 py-4 rounded-lg hover:brightness-110 transition-all text-lg" style={{ backgroundColor: '#2563eb', color: '#fff' }}>
              Request a Lease Quote
            </Link>
            <Link href="/sbl/fleet" className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              View Full Fleet
            </Link>
          </div>
          <p className="text-green-300 text-sm mt-6">📞 (951) 684-9585 · info@completecoach.com · Quote in 24 hours guaranteed</p>
        </div>
      </section>
    </main>
  )
}
