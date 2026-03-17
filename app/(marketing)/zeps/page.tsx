import Link from 'next/link'
import { Metadata } from 'next'
import ZEPSCalculator from '@/components/marketing/ZEPSCalculator'

export const metadata: Metadata = {
  title: 'ZEPS Electric Bus Conversion — Zero Emission Powertrain System | Complete Coach Works',
  description: 'ZEPS converts existing transit buses to battery-electric for $580K vs $830K new OEM. 70+ conversions, 4M miles, FTA compliant, CARB certified. 403, 504, or 605 kWh packs.',
  alternates: { canonical: 'https://completecoach.com/zeps' },
}

const zepsProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'ZEPS Electric Bus Conversion',
  description: 'Battery-electric powertrain retrofit for 30–60ft transit buses. $580K vs $830K OEM. CARB certified, FTA compliant, HVIP eligible.',
  brand: { '@type': 'Brand', name: 'Complete Coach Works' },
  manufacturer: { '@type': 'Organization', name: 'Complete Coach Works', url: 'https://completecoach.com' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '580000',
    availability: 'https://schema.org/InStock',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Battery Options', value: '403, 504, or 605 kWh' },
    { '@type': 'PropertyValue', name: 'Compliance', value: 'CARB Certified, FTA Compliant, Buy America' },
    { '@type': 'PropertyValue', name: 'HVIP Eligible', value: 'Up to $165,000 voucher per bus' },
    { '@type': 'PropertyValue', name: 'Conversions Completed', value: '70+' },
  ],
}

const stages = [
  {
    num: '01',
    title: 'Fleet Assessment',
    desc: 'CCW engineers inspect your fleet — age, condition, and remaining useful life. We determine ZEPS eligibility and recommend the optimal battery pack size per route. 30–60 day process.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Powertrain Removal',
    desc: 'The diesel or CNG drivetrain is fully extracted: engine, transmission, radiator, fuel system, exhaust system. The chassis, body, and structure are retained and reused.',
    icon: '🔧',
  },
  {
    num: '03',
    title: 'Battery Pack Integration',
    desc: 'Choose 403, 504, or 605 kWh Samsung NMC lithium-ion pack based on your route requirements. Thermal management system and Battery Management System (BMS) installed.',
    icon: '⚡',
  },
  {
    num: '04',
    title: 'Electric Motor & Drivetrain',
    desc: '131 kW permanent magnet synchronous motor installed with regenerative braking. Differential remanufactured to 6.1:1 ratio for EV torque curve. Voith VEDS for articulated buses.',
    icon: '⚙️',
  },
  {
    num: '05',
    title: 'Systems & Controls Rebuild',
    desc: 'Complete electrical rebuild: 50 kW on-board charger, 480V 3-phase charging port, energy-efficient HVAC, electric power steering, LED lighting, driver display, and route computer.',
    icon: '🖥️',
  },
  {
    num: '06',
    title: 'Testing & Certification',
    desc: 'CARB emissions testing, FTA compliance documentation, ADA systems verification, Buy America certification package. Pre-delivery inspection and road test.',
    icon: '✅',
  },
]

const agencies = [
  { name: 'IndyGo', city: 'Indianapolis, IN', buses: 21, note: 'Largest ZEPS fleet' },
  { name: 'Indianapolis Intl Airport', city: 'Indianapolis, IN', buses: 9, note: '' },
  { name: 'GTrans', city: 'Gardena, CA', buses: 5, note: '' },
  { name: 'Wichita Transit', city: 'Wichita, KS', buses: 7, note: '' },
  { name: 'TriMet', city: 'Portland, OR', buses: 4, note: 'First 60-ft conversion in the US' },
  { name: 'Montebello Bus Lines', city: 'Montebello, CA', buses: 3, note: '' },
  { name: 'Twin Transit', city: 'Chehalis, WA', buses: 2, note: '' },
  { name: 'Metro McAllen', city: 'McAllen, TX', buses: 2, note: '' },
  { name: 'Ben Franklin Transit', city: 'Richland, WA', buses: 1, note: 'First ZEPS ever built (2013)' },
  { name: 'Utah Transit Authority', city: 'Salt Lake City, UT', buses: 1, note: '' },
]

export default function ZEPSPage() {
  return (
    <main className="bg-[#0A1F12] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(zepsProductSchema) }} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F12] via-[#0d2d1a] to-[#001f0d]" />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/15 border border-[#22c55e]/40 rounded-full px-6 py-2 text-[#22c55e] text-sm font-bold mb-8">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
            ZEPS — Zero Emission Powertrain System
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-none tracking-tight">
            Your Fleet Goes Electric.<br />
            <span className="text-[#22c55e]">Your Budget Stays Intact.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            ZEPS converts the diesel buses you already own into battery-electric vehicles — for <strong className="text-white">$580K per bus</strong> vs. $830K for a new OEM electric. Same chassis your drivers know. Zero emissions. 6-month delivery.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 max-w-4xl mx-auto">
            {[
              { value: '$580K', label: 'Per Conversion' },
              { value: '70+', label: 'Conversions Done' },
              { value: '4M mi', label: 'In Service' },
              { value: '14', label: 'Agencies Served' },
              { value: '6 mo', label: 'Delivery' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-[#22c55e]">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#22c55e] text-[#0A1F12] font-bold px-10 py-4 rounded-xl text-lg hover:bg-[#16a34a] transition-colors">
              Request Fleet Assessment →
            </Link>
            <a href="#how-it-works" className="inline-block border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-white/5 transition-colors">
              How It Works ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── THE TRANSFORMATION — WHAT ACTUALLY HAPPENS ── */}
      <section className="py-24 px-6 bg-[#060e08]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-3">The Conversion</div>
            <h2 className="text-4xl font-bold mb-4">What ZEPS Does to Your Bus</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We strip the diesel drivetrain, rebuild the chassis, and install a full battery-electric powertrain — reusing everything that doesn't wear out.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Removed column */}
            <div className="bg-red-950/30 border border-red-900/40 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 font-bold text-lg">−</div>
                <h3 className="text-xl font-bold text-red-300">What Comes Out</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Diesel engine (or CNG system)',
                  'Transmission',
                  'Radiator and cooling system',
                  'Fuel tanks and fuel lines',
                  'Exhaust system',
                  'All belt-driven accessories',
                  'Original differential (remanufactured)',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-red-200">
                    <div className="w-5 h-5 rounded-full border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-0.5 bg-red-400" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-red-900/40 text-xs text-red-400">
                The chassis, body shell, and structural components are retained — saving ~10× the raw materials vs. a new bus build.
              </div>
            </div>

            {/* Added column */}
            <div className="bg-green-950/30 border border-green-900/40 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#22c55e]/20 rounded-lg flex items-center justify-center text-[#22c55e] font-bold text-lg">+</div>
                <h3 className="text-xl font-bold text-green-300">What Goes In</h3>
              </div>
              <div className="space-y-3">
                {[
                  '131 kW permanent magnet synchronous motor (full torque from 0 RPM)',
                  '403, 504, or 605 kWh Samsung NMC lithium-ion battery pack',
                  'Battery Management System (BMS) with thermal management',
                  '50 kW on-board charger — standard 480V 3-phase depot power',
                  'Regenerative braking system',
                  'Electric air compressor + power steering pump',
                  'Energy-efficient HVAC system',
                  'LED interior and exterior lighting',
                  'Charging port, telematics, driver display, route computer',
                  'New composite flooring, seating, and lightweight aluminum wheels',
                  'Voith VEDS system (articulated 60-ft buses)',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm text-green-200">
                    <div className="w-5 h-5 rounded-full border border-[#22c55e]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance specs strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Motor', value: '131 kW', sub: 'Perm. magnet synchronous' },
              { label: 'Torque', value: '~1,800 lb-ft', sub: 'Full torque from 0 RPM' },
              { label: 'Range', value: 'Up to 280 mi', sub: '605 kWh articulated config' },
              { label: 'Charging', value: '480V 3-phase', sub: 'Standard depot power — no upgrade needed' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 rounded-xl p-5 border border-[#22c55e]/20">
                <div className="text-xs text-[#22c55e] font-bold uppercase tracking-wide mb-1">{s.label}</div>
                <div className="text-lg font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROCESS ── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-3">The Process</div>
            <h2 className="text-4xl font-bold mb-4">Six Stages. Diesel In. Electric Out.</h2>
            <p className="text-gray-400 max-w-xl mx-auto">From intake to delivery in approximately 60–90 days per bus.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage, i) => (
              <div key={stage.num} className="relative bg-white/5 rounded-2xl p-7 border border-white/10 hover:border-[#22c55e]/40 transition-colors group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-black text-[#22c55e]/20 group-hover:text-[#22c55e]/40 transition-colors leading-none">{stage.num}</div>
                  <div className="text-2xl">{stage.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-2">{stage.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{stage.desc}</p>
                {i < stages.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-[#22c55e]/30 text-xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BATTERY OPTIONS ── */}
      <section className="py-20 px-6 bg-[#060e08]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-3">Battery Packs</div>
            <h2 className="text-4xl font-bold mb-4">Three Pack Sizes. Every Route Covered.</h2>
            <p className="text-gray-400">CCW engineers match the pack size to your route requirements during the fleet assessment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { kWh: 403, range: '150–180 mi', buses: '30–35 ft', best: 'Urban commuter routes with overnight charging', highlight: false },
              { kWh: 504, range: '180–220 mi', buses: '35–40 ft', best: 'Suburban, express, and mixed routes', highlight: true },
              { kWh: 605, range: '220–280 mi', buses: '40–60 ft articulated', best: 'High-ridership BRT and all-day service', highlight: false },
            ].map(pack => (
              <div key={pack.kWh} className={`rounded-2xl p-8 border text-center ${pack.highlight ? 'bg-[#22c55e]/10 border-[#22c55e]/40' : 'bg-white/5 border-white/10'}`}>
                {pack.highlight && <div className="text-xs font-bold text-[#22c55e] uppercase tracking-widest mb-3">Most Popular</div>}
                <div className="text-5xl font-bold text-[#22c55e] mb-1">{pack.kWh}</div>
                <div className="text-gray-400 text-sm mb-6">kWh</div>
                <div className="space-y-3 text-sm text-left border-t border-white/10 pt-5">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400">Range</span>
                    <span className="font-semibold">{pack.range}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400">Bus size</span>
                    <span className="font-semibold">{pack.buses}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-gray-400 flex-shrink-0">Best for</span>
                    <span className="font-semibold text-right">{pack.best}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENCIES ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-3">Proven in Service</div>
            <h2 className="text-4xl font-bold mb-4">14 Agencies. 70+ Buses. 4 Million Miles.</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Every ZEPS bus in the table below is operating in daily revenue service. This is not a pilot program.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Transit Agency</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Location</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-semibold">Buses</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {agencies.map((a, i) => (
                  <tr key={a.name} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <td className="py-3.5 px-4 font-semibold text-white">{a.name}</td>
                    <td className="py-3.5 px-4 text-gray-400">{a.city}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#22c55e]">{a.buses}</td>
                    <td className="py-3.5 px-4 text-gray-500 text-xs">{a.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs mt-4">Partial list. 4M+ passenger miles logged in combined revenue service across all ZEPS fleets.</p>
        </div>
      </section>

      {/* ── FUNDING & INCENTIVES ── */}
      <section className="py-20 px-6 bg-[#060e08]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-3">Funding</div>
            <h2 className="text-4xl font-bold mb-4">Incentives That Cut Your Net Cost</h2>
            <p className="text-gray-400">ZEPS is eligible for the federal and state programs most transit agencies already use.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                program: 'CARB HVIP',
                amount: 'Up to $165,000',
                sub: 'Per bus voucher',
                desc: 'California\'s Hybrid and Zero-Emission Truck and Bus Voucher Incentive Project. Applied at point of sale.',
                net: 'Net per bus: ~$415K after HVIP',
              },
              {
                program: 'FTA Section 5339',
                amount: '80/20 Split',
                sub: 'Federal match',
                desc: 'Bus and Bus Facilities grants cover 80% of eligible project costs. ZEPS is fully FTA compliant and Buy America certified.',
                net: 'Your agency pays 20%',
              },
              {
                program: 'EPA Clean Buses',
                amount: 'Up to $375K',
                sub: 'Per bus (school bus adjacent)',
                desc: 'Inflation Reduction Act funding for clean transit. CCW can assist with grant documentation for eligible agencies.',
                net: 'Ask about eligibility',
              },
            ].map(f => (
              <div key={f.program} className="bg-white/5 border border-[#22c55e]/20 rounded-2xl p-7">
                <div className="text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-3">{f.program}</div>
                <div className="text-3xl font-bold text-white mb-0.5">{f.amount}</div>
                <div className="text-gray-400 text-sm mb-4">{f.sub}</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                <div className="text-xs font-bold text-[#22c55e] border-t border-white/10 pt-4">{f.net}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[#22c55e] text-5xl mb-6">"</div>
          <p className="text-xl text-gray-200 leading-relaxed italic mb-6">
            The response from the drivers has been very good. They are excited about how quiet and smooth the ride is.
          </p>
          <div className="text-sm text-gray-400">
            Mario Delgado, Director of Transit — Metro McAllen, TX
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="py-24 px-6 bg-[#060e08]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-3">ROI Calculator</div>
            <h2 className="text-4xl font-bold mb-4">Calculate Your Fleet Savings</h2>
            <p className="text-gray-400">Adjust the sliders to see total savings for your fleet size and operating profile.</p>
          </div>
          <ZEPSCalculator />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0A1F12] to-[#0d2d1a]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-4">Get Started</div>
          <h2 className="text-4xl font-bold mb-4">Ready to Electrify Your Fleet?</h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            CCW's engineering team will assess your fleet at no charge — matching bus age, condition, and route requirements to the right ZEPS configuration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#22c55e] text-[#0A1F12] font-bold px-10 py-4 rounded-xl text-lg hover:bg-[#16a34a] transition-colors">
              Request Fleet Assessment →
            </Link>
            <Link href="/services/zeps-electric" className="border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-white/5 transition-colors">
              ZEPS Service Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
