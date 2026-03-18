import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SBL Lease Fleet — Transit Buses for Short & Long-Term Lease | Shuttle Bus Leasing',
  description: "Browse SBL's lease fleet. 30ft to 60ft transit buses. Short-term from $1,400/mo. Contract and lease-to-own programs. Official 2002 & 2010 Olympics bus supplier.",
  alternates: { canonical: 'https://completecoach.com/sbl/fleet' },
  openGraph: {
    title: 'SBL Lease Fleet | Transit Bus Leasing Programs | Short & Long-Term',
    description: 'Short-term, contract, and lease-to-own transit bus programs. 1,000+ buses available. Official 2002 & 2010 Olympic Games bus supplier.',
    url: 'https://completecoach.com/sbl/fleet',
    siteName: 'Shuttle Bus Leasing',
    type: 'website',
  },
}

const leasePrograms = [
  { type: 'Short-Term / Gap', duration: '1–12 months', use: 'Emergency coverage, fleet gaps, rehab downtime', img: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg', price: 'From $1,400/mo' },
  { type: 'Contract Lease', duration: '1–5 years', use: 'Fixed-route operations, dedicated service', img: 'https://completecoach.com/wp-content/uploads/2024/03/muni.jpg', price: 'From $2,800/mo' },
  { type: 'Lease-to-Own', duration: 'Flexible terms', use: 'Budget-constrained agencies, path to ownership', img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_3320.jpg', price: 'Custom pricing' },
  { type: 'Employee Shuttle', duration: 'Ongoing', use: 'Corporate campus, hospital systems, events', img: 'https://completecoach.com/wp-content/uploads/2024/04/st-louis-bus.jpg', price: 'From $1,400/mo' },
]

const fleetCards = [
  { year: 2018, make: 'MCI', model: 'D4500CT', fuel: 'Diesel', length: 45, seats: 55, condition: 'Refurbished', price: 'From $4,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/04/sandy.jpg' },
  { year: 2016, make: 'Gillig', model: 'Low Floor 40ft', fuel: 'CNG', length: 40, seats: 40, condition: 'Refurbished', price: 'From $2,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/03/yamhill.jpg' },
  { year: 2020, make: 'Starcraft', model: 'Allstar', fuel: 'Gas', length: 30, seats: 24, condition: 'Refurbished', price: 'From $1,400/mo', img: 'https://completecoach.com/wp-content/uploads/2024/04/st-louis-rehab.jpg' },
  { year: 2017, make: 'New Flyer', model: 'Xcelsior XD40', fuel: 'Diesel', length: 40, seats: 40, condition: 'Refurbished', price: 'From $2,500/mo', img: 'https://completecoach.com/wp-content/uploads/2024/08/octa2.jpg' },
  { year: 2019, make: 'Gillig', model: 'Low Floor 35ft', fuel: 'CNG', length: 35, seats: 35, condition: 'Refurbished', price: 'From $2,200/mo', img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_2928.jpg' },
  { year: 2015, make: 'Van Hool', model: 'AG300', fuel: 'CNG', length: 60, seats: 52, condition: 'Refurbished', price: 'From $3,800/mo', img: 'https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg' },
]

export default function SBLFleetPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1a2e1a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-green-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/sbl" className="hover:text-white transition-colors">SBL</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Fleet</span>
          </div>
          <div className="inline-block bg-[#2d7a3a]/50 border border-[#86efac]/40 rounded-full px-4 py-1.5 text-[#86efac] text-xs font-bold uppercase tracking-widest mb-4">
            Lease Programs
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">SBL Lease Fleet</h1>
          <p className="text-green-200 text-lg max-w-3xl mb-6">
            Short-term, contract, and lease-to-own programs. 1,000+ buses. Quote in 24 hours.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { value: '1,000+', label: 'Buses Available' },
              { value: '24-hr', label: 'Quote Turnaround' },
              { value: '2 Olympics', label: 'Official Supplier' },
              { value: 'FTA', label: 'Compliant' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-[#86efac]">{s.value}</div>
                <div className="text-xs text-green-300 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Olympics trust bar */}
      <section className="bg-[#2d7a3a] text-white py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="text-4xl">🏅</div>
          <div>
            <div className="font-bold text-lg">Official Bus Supplier — Two Olympic Games</div>
            <div className="text-green-200 text-sm mt-1">2002 Winter Olympics, Salt Lake City · 2010 Winter Olympics, Vancouver</div>
          </div>
          <div className="hidden md:block h-10 w-px bg-green-500/50" />
          <div className="text-sm text-green-200">
            <span className="text-white font-bold">1,000+</span> buses available · <span className="text-white font-bold">24-hour</span> quote turnaround · <span className="text-white font-bold">FTA</span> compliant
          </div>
        </div>
      </section>

      {/* Lease Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Fleet Grid */}
      <section className="py-16 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-sm font-bold text-[#2d7a3a] uppercase tracking-widest mb-2">Available Now</div>
              <h2 className="text-3xl font-bold text-gray-900">Available Lease Fleet</h2>
              <p className="text-gray-500 mt-1">All units maintained to FTA standards · ADA compliant</p>
            </div>
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
        </div>
      </section>

      {/* Why Lease */}
      <section className="py-16 bg-[#1a2e1a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-[#86efac] uppercase tracking-widest mb-3">The Business Case</div>
            <h2 className="text-3xl font-bold">Why Agencies Lease Instead of Buy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📉', title: 'Preserve Capital', body: 'No large upfront purchase. Lease payments come from operating budget, not capital budget — easier board approval, faster deployment.' },
              { icon: '🔄', title: 'Fleet Flexibility', body: 'Scale up for summer ridership, pull back in winter. Add buses for special events. Return units when rehab is done. No stranded assets.' },
              { icon: '🛡️', title: 'Maintenance Included', body: "SBL lease programs include full preventive maintenance to FTA standards. Your team focuses on operations — we handle the buses." },
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

      {/* Olympics Case Study Callout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a2e1a] to-[#2d7a3a] rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-block bg-[#86efac]/20 border border-[#86efac]/40 rounded-full px-3 py-1 text-[#86efac] text-xs font-bold uppercase tracking-widest mb-3">
                  Case Study
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Olympic Games Bus Supplier — Two Winter Olympics</h2>
                <p className="text-green-200 text-sm leading-relaxed max-w-xl">
                  SBL served as official bus supplier for the 2002 Salt Lake City and 2010 Vancouver Winter Olympic Games. Zero-failure fleet operations across two countries.
                </p>
              </div>
              <Link
                href="/sbl/case-studies/olympic-games-bus-supplier"
                className="flex-shrink-0 inline-block bg-[#86efac] text-[#1a2e1a] font-bold px-6 py-3 rounded-xl hover:bg-[#a7f3d0] transition-colors text-sm"
              >
                Read the Full Case Study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#2d7a3a] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Lease Your Next Fleet?</h2>
          <p className="text-green-200 text-lg mb-8">Get a custom lease quote within 24 hours. Our team will match you with the right buses for your routes, ridership, and budget.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#2d7a3a] font-bold px-8 py-4 rounded-lg hover:bg-green-50 transition-colors text-lg">
              Request a Lease Quote
            </Link>
            <Link href="/sbl" className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              Back to SBL Home
            </Link>
          </div>
          <p className="text-green-300 text-sm mt-6">📞 (951) 684-9585 · info@completecoach.com · Quote in 24 hours guaranteed</p>
        </div>
      </section>
    </main>
  )
}
