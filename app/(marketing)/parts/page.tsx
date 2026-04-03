import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Transit Bus Parts & Components | Complete Coach Works',
  description: 'OEM and aftermarket transit bus parts from CCW. Drivetrain, electrical, HVAC, body panels, interior components, and more. Serving transit agencies nationwide.',
  alternates: { canonical: 'https://completecoach.com/parts' },
}

const categories = [
  {
    icon: '⚙️',
    title: 'Drivetrain & Powertrain',
    items: ['Engines & Repowers', 'Transmissions', 'Drive Axles', 'Driveshafts', 'Differentials', 'CNG Fuel Systems'],
    accent: '#003087',
  },
  {
    icon: '⚡',
    title: 'Electrical & Electronics',
    items: ['Alternators & Starters', 'Lighting Systems', 'Fare Box Wiring', 'PA & Communications', 'Camera & Safety Systems', 'HVIP-Eligible EV Components'],
    accent: '#003087',
  },
  {
    icon: '❄️',
    title: 'HVAC Systems',
    items: ['A/C Compressors', 'Evaporators & Condensers', 'Blower Motors', 'Ductwork & Vents', 'Heating Units', 'Climate Control Modules'],
    accent: '#003087',
  },
  {
    icon: '🚌',
    title: 'Body Panels & Exterior',
    items: ['Front & Rear Caps', 'Side Panels & Skirts', 'Roof Sections', 'Destination Sign Bezels', 'Door Panels & Frames', 'Bumpers & Fascias'],
    accent: '#003087',
  },
  {
    icon: '🪑',
    title: 'Interior Components',
    items: ['Passenger Seating', 'Flooring Systems', 'Grab Rails & Stanchions', 'ADA Ramps & Lifts', 'Interior Lighting', 'Driver Partitions'],
    accent: '#003087',
  },
  {
    icon: '🔧',
    title: 'Brake & Suspension',
    items: ['Brake Shoes & Pads', 'Air Dryers & Valves', 'Shock Absorbers', 'Air Bags & Springs', 'Steering Components', 'Wheel Hubs & Bearings'],
    accent: '#003087',
  },
]

const brands = [
  'Gillig', 'New Flyer', 'NABI', 'Orion', 'Blue Bird', 'Motor Coach Industries',
  'Daimler Buses', 'Nova Bus', 'Proterra', 'BYD', 'Allison Transmission', 'Cummins',
]

export default function PartsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#003087] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-4">Parts & Components</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Genuine OEM & Aftermarket<br className="hidden md:block" /> Transit Bus Parts
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-10">
            CCW maintains one of the largest transit bus parts inventories in the country. OEM-spec components for all major makes and models — in stock and ready to ship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:8003003751"
              className="bg-[#E8A020] text-[#003087] font-bold px-8 py-4 rounded-xl hover:bg-[#d4911a] transition-colors text-lg"
            >
              Call Parts Dept: (800) 300-3751
            </a>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Submit Parts Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0A1628] text-white py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10,000+', label: 'Part Numbers In Stock' },
              { value: 'All Makes', label: 'Major OEM Brands' },
              { value: 'Same-Day', label: 'Quote Turnaround' },
              { value: 'FTA', label: 'Buy America Eligible' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[#E8A020]">{s.value}</div>
                <div className="text-sm text-blue-300 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">What We Carry</div>
            <h2 className="text-3xl font-bold text-[#003087]">Parts by Category</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">OEM-spec and aftermarket alternatives for every system on your bus — from drivetrain to destination sign.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(cat => (
              <div key={cat.title} className="bg-[#F8F9FB] rounded-2xl p-7 border border-gray-100 hover:border-[#003087] hover:shadow-lg transition-all group">
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-bold text-[#003087] mb-4">{cat.title}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8A020] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands we support */}
      <section className="py-16 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">Compatibility</div>
            <h2 className="text-2xl font-bold text-[#003087]">Makes & Models We Support</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map(brand => (
              <span key={brand} className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:border-[#003087] hover:text-[#003087] transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Parts inquiry CTA */}
      <section className="py-20 bg-[#003087] text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">Get a Quote</div>
            <h2 className="text-3xl font-bold mb-4">Parts Inquiry</h2>
            <p className="text-blue-200 text-lg">Tell us the part number, bus make/model, and quantity — we&apos;ll respond within one business day with availability and pricing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white/10 rounded-2xl p-7 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E8A020] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#003087]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg">Parts Hotline</div>
                  <div className="text-blue-200 text-sm">Mon–Fri · 7am–5pm Pacific</div>
                </div>
              </div>
              <a href="tel:8003003751" className="text-2xl font-black text-[#E8A020] hover:text-amber-300 transition-colors block mb-1">
                (800) 300-3751
              </a>
              <div className="text-blue-200 text-sm">Ask for the Parts Department</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-7 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E8A020] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#003087]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg">Email Parts</div>
                  <div className="text-blue-200 text-sm">Response within 1 business day</div>
                </div>
              </div>
              <a href="mailto:parts@completecoach.com" className="text-lg font-bold text-[#E8A020] hover:text-amber-300 transition-colors block mb-1">
                parts@completecoach.com
              </a>
              <div className="text-blue-200 text-sm">Include part #, make/model, quantity</div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/contact" className="inline-block bg-[#E8A020] text-[#003087] font-bold px-10 py-4 rounded-xl hover:bg-[#d4911a] transition-colors text-lg">
              Submit a Parts Inquiry Form →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
