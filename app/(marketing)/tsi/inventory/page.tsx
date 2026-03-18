import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { demoTSIInventory } from '@/lib/demo-data'

export const metadata: Metadata = {
  title: 'TSI Pre-Owned Bus Inventory — Transit Buses For Sale | FTA Compliant',
  description: "Browse TSI's pre-owned transit bus inventory. 30ft to 60ft. Diesel, CNG, electric, hybrid. FTA eligible. Buy America documentation available. 60-day delivery.",
  alternates: { canonical: 'https://completecoach.com/tsi/inventory' },
  openGraph: {
    title: 'TSI Pre-Owned Bus Inventory | FTA Compliant Transit Buses For Sale',
    description: '1,000+ pre-owned transit buses. All fuel types, all sizes. FTA eligible. Buy America documentation available. 60-day accelerated delivery.',
    url: 'https://completecoach.com/tsi/inventory',
    siteName: 'Transit Sales International',
    type: 'website',
  },
}

const inventorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'TSI Pre-Owned Transit Bus Inventory',
  description: 'Pre-owned transit buses for sale — 30 to 60ft, all fuel types, FTA compliant',
  url: 'https://completecoach.com/tsi/inventory',
  numberOfItems: 12,
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
  diesel: 'bg-gray-100 text-gray-700',
  cng: 'bg-blue-100 text-blue-700',
  electric: 'bg-green-100 text-green-700',
  'diesel-electric': 'bg-teal-100 text-teal-700',
  hydrogen: 'bg-purple-100 text-purple-700',
}

export default function TSIInventoryPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(inventorySchema) }} />

      {/* Hero */}
      <section className="bg-[#0f3a6e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-blue-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tsi" className="hover:text-white transition-colors">TSI</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Inventory</span>
          </div>
          <div className="inline-block bg-[#1a5fa8]/50 border border-[#60a5fa]/40 rounded-full px-4 py-1.5 text-[#60a5fa] text-xs font-bold uppercase tracking-widest mb-4">
            Available Now
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">TSI Pre-Owned Bus Inventory</h1>
          <p className="text-blue-200 text-lg max-w-3xl mb-6">
            30 to 60ft · All fuel types · FTA eligible · Buy America documentation available · 60-day delivery program
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#60a5fa]">1,000+</div>
              <div className="text-xs text-blue-300 mt-0.5">Buses Available</div>
            </div>
            <div className="w-px bg-blue-700/50" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#60a5fa]">60 Days</div>
              <div className="text-xs text-blue-300 mt-0.5">Accelerated Delivery</div>
            </div>
            <div className="w-px bg-blue-700/50" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#60a5fa]">FTA</div>
              <div className="text-xs text-blue-300 mt-0.5">Buy America Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search/Filter Bar */}
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
            <Link href="/contact" className="bg-[#1a5fa8] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#1555a0] transition-colors whitespace-nowrap text-center text-sm">
              Search →
            </Link>
          </div>
          <p className="text-blue-200 text-xs mt-2 text-center">Contact us to search our full 1,000+ bus inventory</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-2">Available Now</div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Inventory</h2>
              <p className="text-gray-500 mt-1">All units FTA eligible · Buy America documentation available on request</p>
            </div>
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
        </div>
      </section>

      {/* FTA / Buy America Callout */}
      <section className="py-16 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="text-sm font-bold text-[#1a5fa8] uppercase tracking-widest mb-3">Federal Compliance</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Inventory FTA Eligible</h2>
              <div className="space-y-4">
                {[
                  'Buy America documentation available on request',
                  'Section 5307 / 5339 compliant for all units',
                  'Federal procurement completed for 50+ agencies',
                  'Pre-delivery inspection report on every bus',
                  'ADA compliance verified and certified',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1a5fa8] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0f3a6e] text-white rounded-2xl p-8">
              <h3 className="font-bold text-xl mb-3">Accelerated Delivery Program</h3>
              <p className="text-blue-200 text-sm leading-relaxed mb-6">
                TSI can put buses in revenue service within 60 days — compared to 18–36 months for new. Ideal for emergency fleet gaps and interim service while new procurement is pending.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-[#1a5fa8] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
              >
                Request Accelerated Delivery Info →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Callout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#0f3a6e] to-[#1a5fa8] rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-block bg-[#60a5fa]/20 border border-[#60a5fa]/40 rounded-full px-3 py-1 text-[#60a5fa] text-xs font-bold uppercase tracking-widest mb-3">
                  Case Study
                </div>
                <h2 className="text-xl font-bold text-white mb-2">RATP Dev — 10-Bus Fleet Delivery</h2>
                <p className="text-blue-200 text-sm leading-relaxed max-w-xl">
                  TSI delivered 10 pre-owned transit buses to RATP Dev USA in 60 days under an accelerated delivery contract. March 2026.
                </p>
              </div>
              <Link
                href="/tsi/case-studies/ratp-dev-bus-delivery"
                className="flex-shrink-0 inline-block bg-[#E8A020] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#f5b84a] transition-colors text-sm"
              >
                Read the Full Case Study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#1a5fa8] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Buy? Talk to a Bus Expert.</h2>
          <p className="text-blue-200 text-lg mb-8">Our sales team has placed buses with 50+ transit agencies. Tell us what you need and we&apos;ll find it.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#1a5fa8] font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg">
              Request a Quote
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
