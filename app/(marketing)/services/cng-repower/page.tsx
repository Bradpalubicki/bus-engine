import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, CheckCircle, ArrowRight, Leaf, DollarSign, Gauge } from 'lucide-react'

export const metadata = {
  title: 'CNG / LNG Engine Repower | Complete Coach Works',
  description: 'Convert your diesel fleet to clean CNG or LNG. CCW repower programs are FTA eligible, Buy America compliant, and cut fuel costs 30–50%.',
}

const scope = [
  'Engine removal and CNG/LNG powerplant installation',
  'Fuel system plumbing and pressure testing',
  'Exhaust and emissions system integration',
  'Engine management system programming',
  'Transmission adaptation and validation',
  'Cooling system upgrade for new powerplant',
  'Electrical integration and diagnostics',
  'CARB/EPA emissions compliance verification',
  'Road test and performance validation',
  'As-built documentation package',
]

export default function CngRepowerPage() {
  return (
    <>
      <section className="relative bg-[#003087] text-white overflow-hidden min-h-[420px] flex items-end pb-16">
        <div className="absolute inset-0">
          <Image src="https://completecoach.com/wp-content/uploads/2024/07/repowers.jpg" alt="CNG engine repower" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-[#003087]/72" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" /> Clean Fuel Conversion
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">CNG / LNG Engine Repower</h1>
          <p className="text-xl text-blue-100 max-w-2xl">Convert diesel fleets to clean-burning natural gas — cutting fuel costs 30–50% and reducing emissions while extending fleet life.</p>
        </div>
      </section>

      <section className="bg-[#F8F9FB] border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Leaf, value: '30–50%', label: 'Fuel cost reduction', sub: 'CNG vs. diesel equivalent' },
              { icon: DollarSign, value: '40–60%', label: 'Lower CO₂ emissions', sub: 'vs. diesel combustion' },
              { icon: Gauge, value: '20–30%', label: 'Of new bus cost', sub: 'Typical repower price' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-[#003087] rounded-xl flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#003087]">{s.value}</div>
                  <div className="font-semibold text-sm text-[#1A1A2E]">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#003087] mb-6">Repower Scope of Work</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scope.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-[#F8F9FB] rounded-lg p-4 border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-[#E8A020] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 bg-[#F8F9FB] rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-[#003087] mb-4">CNG vs. LNG — Which is right for your fleet?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="font-bold text-[#003087] mb-2">CNG — Compressed Natural Gas</div>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                      {['Best for urban/commuter routes','Fueling infrastructure widely available','Industry standard for transit buses','Lower upfront equipment cost'].map(i => (
                        <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#003087] rounded-full flex-shrink-0" />{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-[#E8A020] mb-2">LNG — Liquefied Natural Gas</div>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                      {['Best for long-haul / intercity routes','Higher energy density — more range','Lower fuel cost per mile on long routes','Suitable for coach and express service'].map(i => (
                        <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#E8A020] rounded-full flex-shrink-0" />{i}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-[#003087] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Program Details</h3>
                <div className="space-y-3 text-sm">
                  {[['Powerplants','Cummins L9N / ISL G'],['Fuel Types','CNG, LNG, RNG'],['FTA Eligible','Section 5307 / 5339'],['Buy America','Compliant'],['CARB Compliance','Available'],['Warranty','Full system warranty']].map(([k,v]) => (
                    <div key={k} className="flex justify-between border-b border-blue-700/50 pb-2 last:border-0 last:pb-0">
                      <span className="text-blue-200">{k}</span>
                      <span className="font-semibold text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#E8A020] text-white rounded-2xl p-6">
                <h3 className="font-bold mb-2">Case Study: Long Beach Transit</h3>
                <p className="text-amber-100 text-sm leading-relaxed">13 CNG repower conversions — on time, on budget, zero-emission compliant. Contract value: <strong className="text-white">$1.85M</strong>.</p>
              </div>
              <Link href="/contact" className="w-full bg-[#003087] text-white py-3.5 rounded-xl font-semibold hover:bg-[#004db3] transition-colors flex items-center justify-center gap-2 text-sm">
                Request a Program Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#003087] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Ready to clean up your fleet?</h2>
          <p className="text-blue-100 mb-6 text-sm">CCW will assess your powertrains and provide a repower program proposal — no obligation.</p>
          <Link href="/contact" className="bg-[#E8A020] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#f5b84a] transition-colors inline-flex items-center gap-2">
            Contact Our Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
