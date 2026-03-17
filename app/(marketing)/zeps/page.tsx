import { Metadata } from 'next'
import ZEPSCalculator from '@/components/marketing/ZEPSCalculator'

export const metadata: Metadata = {
  title: 'ZEPS Electric Conversion — Transit Bus Battery-Electric Retrofit | Complete Coach Works',
  description: 'ZEPS converts existing transit buses to battery-electric for $580K vs $830K new OEM. 70+ conversions, 4M miles, FTA compliant, CARB certified.',
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
    seller: { '@type': 'Organization', name: 'Complete Coach Works' },
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Battery Options', value: '403, 504, or 605 kWh' },
    { '@type': 'PropertyValue', name: 'Compliance', value: 'CARB Certified, FTA Compliant, Buy America' },
    { '@type': 'PropertyValue', name: 'HVIP Eligible', value: 'Up to $165,000 voucher per bus' },
    { '@type': 'PropertyValue', name: 'Conversions Completed', value: '70+' },
  ],
}

const stages = [
  { num: '01', title: 'Fleet Assessment', desc: 'CCW engineers inspect your fleet. Determine ZEPS eligibility by age, condition, and remaining useful life. 30-60 day process.' },
  { num: '02', title: 'Powertrain Removal', desc: 'Diesel/CNG drivetrain removed. Engine, transmission, fuel system, and exhaust system extracted.' },
  { num: '03', title: 'Battery Pack Integration', desc: 'Choose 403, 504, or 605 kWh pack based on route requirements. Thermal management and BMS installed.' },
  { num: '04', title: 'Electric Motor Installation', desc: 'High-efficiency electric motor and regenerative braking system installed. Voith partnership for articulated buses.' },
  { num: '05', title: 'Controls & Systems', desc: 'Complete electrical system rebuild. Charging port, telematics, driver display, and route computer installed.' },
  { num: '06', title: 'Testing & Certification', desc: 'CARB emissions testing, FTA compliance documentation, ADA systems verification. Buy America certification package.' },
]

export default function ZEPSPage() {
  return (
    <main className="bg-[#0A1628] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(zepsProductSchema) }} />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#001a4d]" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24">
          <div className="inline-block bg-[#E8A020]/20 border border-[#E8A020]/40 rounded-full px-6 py-2 text-[#E8A020] text-sm font-bold mb-8">
            ZEPS — Zero Emission Powertrain System
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none">
            Electric Fleet.<br />
            <span className="text-[#E8A020]">Without the Price Tag.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Convert your existing transit buses to battery-electric for $580K — vs $830K for a new OEM electric bus. FTA compliant. CARB certified. HVIP vouchers accepted. 6-month delivery.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[{ value: '$580K', label: 'Per Conversion' }, { value: '70+', label: 'Conversions Done' }, { value: '4M mi', label: 'In Service' }, { value: '6 mo', label: 'Delivery Time' }].map(s => (
              <div key={s.label} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-[#E8A020]">{s.value}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <a href="/contact" className="inline-block bg-[#E8A020] text-[#0A1628] font-bold px-10 py-5 rounded-xl text-lg hover:bg-[#d4911a] transition-colors">
            Request Fleet Assessment →
          </a>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">The ZEPS Process</h2>
          <p className="text-gray-400 text-center mb-16">Six stages from diesel to battery-electric</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stages.map(stage => (
              <div key={stage.num} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#E8A020]/40 transition-colors">
                <div className="text-5xl font-bold text-[#E8A020]/30 mb-4">{stage.num}</div>
                <h3 className="text-xl font-bold mb-3">{stage.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-[#060e1c]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Calculate Your Fleet Savings</h2>
          <p className="text-gray-400 text-center mb-12">Adjust the sliders to see total savings for your fleet</p>
          <ZEPSCalculator />
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Battery Pack Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { kWh: 403, range: '150–180 mi', buses: '30–35ft', best: 'Urban commuter routes' },
              { kWh: 504, range: '180–220 mi', buses: '35–40ft', best: 'Suburban & express routes' },
              { kWh: 605, range: '220–280 mi', buses: '40–60ft articulated', best: 'High-ridership BRT routes' },
            ].map(pack => (
              <div key={pack.kWh} className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
                <div className="text-5xl font-bold text-[#E8A020] mb-2">{pack.kWh}</div>
                <div className="text-gray-400 text-sm mb-6">kWh</div>
                <div className="space-y-3 text-sm text-left">
                  <div className="flex justify-between"><span className="text-gray-400">Range</span><span className="text-white">{pack.range}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Bus size</span><span className="text-white">{pack.buses}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Best for</span><span className="text-white text-right">{pack.best}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
