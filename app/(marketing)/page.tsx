import { Metadata } from 'next'
import Image from 'next/image'
import VideoHero from '@/components/marketing/VideoHero'
import Link from 'next/link'
import { AgencyProofStrip } from '@/components/AgencyProofStrip'

export const metadata: Metadata = {
  title: 'Complete Coach Works — Transit Bus Refurbishment & ZEPS Electric Conversion | Riverside, CA',
  description: 'CCW refurbishes transit buses at half the cost of new. ZEPS electric conversion: 70+ buses, 4M miles, $580K vs $830K OEM. FTA compliant. SAM registered.',
  alternates: { canonical: 'https://completecoach.com' },
  openGraph: {
    title: 'Complete Coach Works — Transit Bus Refurbishment | Riverside, CA',
    description: 'Nation\'s largest transit bus remanufacturer. ZEPS electric conversion, CNG repower, midlife overhaul.',
    url: 'https://completecoach.com',
    siteName: 'Complete Coach Works',
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://completecoach.com/#business',
  name: 'Complete Coach Works',
  description: 'The nation\'s largest transit bus remanufacturing company. ZEPS electric conversion, CNG repower, midlife refurbishment for transit agencies.',
  url: 'https://completecoach.com',
  telephone: '+18003003751',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1863 Service Court',
    addressLocality: 'Riverside',
    addressRegion: 'CA',
    postalCode: '92507',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 33.9806, longitude: -117.3755 },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '17:00' },
  foundingDate: '1987',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 350 },
  hasCredential: ['SAM.gov UEI QN7UN15K9NP2', 'CAGE 1QA89', 'CARB Certified', 'FTA Compliant', 'Buy America Compliant'],
  areaServed: { '@type': 'Country', name: 'United States' },
  knowsAbout: ['transit bus refurbishment', 'ZEPS electric bus conversion', 'CNG bus repower', 'bus midlife overhaul', 'FTA compliance'],
}

const services = [
  {
    title: 'Midlife Refurbishment',
    desc: 'Complete structural, mechanical, and cosmetic restoration. Extends bus life 10+ years at half the cost of new.',
    stat: '$300–400K avg. contract',
    href: '/services/midlife-overhaul',
    img: 'https://completecoach.com/wp-content/uploads/2024/03/rehabs.jpg',
    cta: 'Learn More',
  },
  {
    title: 'ZEPS Electric Conversion',
    desc: 'Battery-electric powertrain retrofit for any 30–60ft transit bus. FTA compliant, CARB certified, HVIP eligible.',
    stat: '70+ conversions completed',
    href: '/zeps',
    img: 'https://completecoach.com/wp-content/uploads/2024/07/ZEPS1.jpg',
    cta: 'Explore ZEPS',
  },
  {
    title: 'CNG Repower',
    desc: 'CARB-certified L9N CNG repowers. Drop-in replacement with minimal downtime. Proven in California fleets.',
    stat: 'CARB L9N certified',
    href: '/services/cng-repower',
    img: 'https://completecoach.com/wp-content/uploads/2024/07/repowers.jpg',
    cta: 'Learn More',
  },
  {
    title: 'Collision Repair',
    desc: 'Full structural and body collision repair. Certified technicians, OEM-grade materials, rapid turnaround.',
    stat: 'All makes & models',
    href: '/services/body-paint',
    img: 'https://completecoach.com/wp-content/uploads/2024/05/OCTA-BUS-ACCIDENT.jpg',
    cta: 'Learn More',
  },
  {
    title: 'Interior Rehab',
    desc: 'Flooring, seating, lighting, ADA upgrades, and full cosmetic refresh. Fleet-wide programs available.',
    stat: 'ADA compliant upgrades',
    href: '/services/interior-rehab',
    img: 'https://completecoach.com/wp-content/uploads/2024/05/IMG_4045.jpg',
    cta: 'Learn More',
  },
  {
    title: 'Powertrain Services',
    desc: 'Engine, transmission, and drivetrain overhaul. Factory-trained technicians on all major transit platforms.',
    stat: 'All major platforms',
    href: '/services/midlife-overhaul',
    img: 'https://completecoach.com/wp-content/uploads/2024/07/powertrain1.jpg',
    cta: 'Learn More',
  },
]

const galleryImages = [
  { src: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg', alt: 'TriMet bus refurbishment — Portland, OR' },
  { src: 'https://completecoach.com/wp-content/uploads/2024/03/muni.jpg', alt: 'SF Muni bus rehabilitation project' },
  { src: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_3320.jpg', alt: 'CCW production floor — Riverside, CA' },
  { src: 'https://completecoach.com/wp-content/uploads/2024/07/zeps-chassis.jpg', alt: 'ZEPS electric chassis conversion in progress' },
  { src: 'https://completecoach.com/wp-content/uploads/2024/04/st-louis-bus.jpg', alt: 'St. Louis Metro bus rehabilitation' },
  { src: 'https://completecoach.com/wp-content/uploads/2024/08/octa2.jpg', alt: 'OCTA bus accident repair — complete restoration' },
]

const news = [
  {
    img: 'https://completecoach.com/wp-content/uploads/2026/03/Lifecycle-website-980x405-1-400x250.jpg',
    title: 'Lifecycle Cost Matters: Value Through Smarter Fleet Investment',
    date: 'March 2026',
    href: '/news',
  },
  {
    img: 'https://completecoach.com/wp-content/uploads/2026/02/apta-400x250.jpg',
    title: 'CCW Wins APTA Ad Wheel Award for 50-50 Bus Campaign',
    date: 'February 2026',
    href: '/news',
  },
  {
    img: 'https://completecoach.com/wp-content/uploads/2026/01/Mountain-Line-Logo_FINAL-400x250.webp',
    title: 'CCW Awarded Mountain Line Bus Refurbishment Contract',
    date: 'January 2026',
    href: '/news',
  },
]

export default function CCWHomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      {/* Hero — full viewport, CCW logo + video */}
      <VideoHero
        videoSrc="/videos/ccw-hero.mp4"
        fallbackImage="https://completecoach.com/wp-content/uploads/2024/08/CCW-9-2017-10.jpg"
        overlay="from-[#0A1628]/85 to-[#003087]/55"
        headline="America's Transit Bus Refurbishment Leader"
        subheadline="Half the cost. Half the delivery time. FTA compliant."
        ctaPrimary={{ label: 'Get a Fleet Assessment', href: '/contact' }}
        ctaSecondary={{ label: 'See ZEPS Electric', href: '/zeps' }}
        brand="CCW"
        stats={[
          { value: '38 Yrs', label: 'In Business' },
          { value: '350+', label: 'Employees' },
          { value: '70+', label: 'ZEPS Conversions' },
          { value: '4M+', label: 'Electric Miles' },
          { value: '#1', label: "Nation's Leading Remanufacturer" },
          { value: '10', label: 'Locations' },
        ]}
      />

      {/* ── AI AGENT TEASER ── */}
      <section className="bg-[#0A1628] py-4 px-6 border-b border-[#003087]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-200 text-sm text-center sm:text-left">
            <span className="text-[#E8A020] font-bold">Questions about specs, pricing, or FTA compliance?</span>
            {' '}Ask our AI Fleet Advisor — available 24/7.
          </p>
          <Link
            href="#ai-agent"
            id="open-ai-chat"
            className="flex-shrink-0 bg-[#E8A020] text-[#0A1628] text-sm font-bold px-5 py-2 rounded-lg hover:bg-[#d4911a] transition-colors whitespace-nowrap"
          >
            Ask Now →
          </Link>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">What We Do</div>
            <h2 className="text-4xl font-bold text-[#003087]">Full-Spectrum Bus Services</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">From collision repair to zero-emission conversions — CCW handles every phase of a bus&apos;s lifecycle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.title} href={s.href} className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#003087]/30 group-hover:bg-[#003087]/10 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#003087] mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E8A020]">{s.stat}</span>
                    <span className="text-sm font-bold text-[#003087] group-hover:underline">{s.cta} →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services/midlife-overhaul" className="inline-block border-2 border-[#003087] text-[#003087] font-bold px-8 py-3 rounded-lg hover:bg-[#003087] hover:text-white transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── ZEPS SPOTLIGHT ── */}
      <section className="py-20 bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#E8A020] text-sm font-bold uppercase tracking-wider mb-4">ZEPS Electric Conversion</div>
            <h2 className="text-4xl font-bold mb-6">Electric Fleet Without the OEM Price Tag</h2>
            <p className="text-gray-300 text-lg mb-8">ZEPS converts your existing fleet to battery-electric for $580K — vs $830K for a new OEM electric bus. 70+ conversions. 4 million miles in revenue service.</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div><div className="text-3xl font-bold text-[#E8A020]">70+</div><div className="text-sm text-gray-400">Conversions</div></div>
              <div><div className="text-3xl font-bold text-[#E8A020]">4M</div><div className="text-sm text-gray-400">Miles in Service</div></div>
              <div><div className="text-3xl font-bold text-[#E8A020]">$250K</div><div className="text-sm text-gray-400">Saved Per Bus</div></div>
            </div>
            <Link href="/zeps" className="inline-flex items-center bg-[#E8A020] text-[#0A1628] font-bold px-8 py-4 rounded-lg hover:bg-[#d4911a] transition-colors">
              Explore ZEPS →
            </Link>
          </div>
          <div className="relative h-72 md:h-auto rounded-2xl overflow-hidden">
            <Image
              src="https://completecoach.com/wp-content/uploads/2024/07/ZEPS1.jpg"
              alt="ZEPS zero-emission electric bus conversion by CCW"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-xl p-4">
              <div className="text-center text-sm text-gray-300 mb-3">Cost Comparison Per Bus</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>New OEM Electric</span><span className="font-bold">$830,000</span></div>
                  <div className="bg-red-500/30 rounded-full h-2"><div className="bg-red-500 rounded-full h-2 w-full" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>ZEPS Conversion</span><span className="font-bold text-[#E8A020]">$580,000</span></div>
                  <div className="bg-[#E8A020]/30 rounded-full h-2"><div className="bg-[#E8A020] rounded-full h-2" style={{ width: '70%' }} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-20 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">Our Work</div>
            <h2 className="text-4xl font-bold text-[#003087]">Project Gallery</h2>
            <p className="text-gray-500 mt-3">Real buses. Real agencies. Real results.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((img) => (
              <div key={img.src} className="relative aspect-video rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#003087]/0 group-hover:bg-[#003087]/50 transition-colors flex items-end p-3">
                  <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/gallery" className="inline-block bg-[#003087] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#002070] transition-colors">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWS & EVENTS ── */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">Latest</div>
              <h2 className="text-4xl font-bold text-[#003087]">News & Events</h2>
            </div>
            <Link href="/news" className="text-sm font-bold text-[#003087] hover:underline hidden md:block">
              All News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link key={item.title} href={item.href} className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-400 mb-2">{item.date}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#003087] transition-colors leading-snug">{item.title}</h3>
                  <div className="mt-3 text-sm font-semibold text-[#003087] group-hover:underline">Read More →</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/news" className="inline-block border-2 border-[#003087] text-[#003087] font-bold px-8 py-3 rounded-lg">
              All News →
            </Link>
          </div>
        </div>
      </section>

      {/* ── AGENCY TRUST BAR ── */}
      <div className="max-w-7xl mx-auto px-6">
        <AgencyProofStrip />
      </div>

      {/* ── CTA BANNER ── */}
      <section className="py-16 bg-[#003087] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Extend Your Fleet&apos;s Life?</h2>
          <p className="text-blue-200 text-lg mb-8">Get a free fleet assessment from CCW&apos;s engineering team. Most agencies save 40–60% vs buying new.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#E8A020] text-[#003087] font-bold px-8 py-4 rounded-lg hover:bg-[#d4911a] transition-colors text-lg">
              Get a Free Assessment
            </Link>
            <Link href="/ccw/compliance" className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              View Compliance Docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE TRUST BAR ── */}
      <section className="py-6 bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            {['FTA Registered TVM', 'APTA Member', 'Buy America Compliant', 'DBE Program', 'CARB Certified', 'SAM.gov Registered', 'ESOP Company'].map(b => (
              <span key={b} className="flex items-center gap-2"><span className="text-green-400">✓</span>{b}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
