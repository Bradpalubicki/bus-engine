import Image from 'next/image'
import Link from 'next/link'
import { Bus, CheckCircle, ArrowRight, Users, Accessibility, Monitor } from 'lucide-react'

export const metadata = {
  title: 'Interior Rehabilitation | Complete Coach Works',
  description: 'Full transit bus interior rehabilitation — seating, flooring, ADA upgrades, destination signs, lighting, and passenger comfort systems.',
}

const scope = [
  'Seat removal, refurbishment, or full replacement',
  'Floor covering removal and new flooring installation',
  'ADA wheelchair securement system inspection and upgrade',
  'Handrail and stanchion replacement',
  'Destination sign system upgrade or replacement',
  'Interior lighting — LED upgrade',
  'HVAC distribution and duct cleaning',
  'Window replacement and re-sealing',
  'Interior panel repair and painting',
  'Fare box and driver area rehabilitation',
  'PA system and passenger communication upgrade',
  'Pre-delivery ADA compliance sign-off',
]

export default function InteriorRehabPage() {
  return (
    <>
      <section className="relative bg-[#003087] text-white overflow-hidden min-h-[420px] flex items-end pb-16">
        <div className="absolute inset-0">
          <Image src="https://completecoach.com/wp-content/uploads/2024/04/st-louis-rehab.jpg" alt="CCW interior rehabilitation" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-[#003087]/72" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            <Bus className="w-3.5 h-3.5" /> Passenger Experience
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Interior Rehabilitation</h1>
          <p className="text-xl text-blue-100 max-w-2xl">Complete interior restoration — seating, flooring, ADA upgrades, destination signs, and lighting — returning passenger comfort to like-new condition.</p>
        </div>
      </section>

      <section className="bg-[#F8F9FB] border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Accessibility, value: 'ADA', label: 'Compliant upgrades', sub: '49 CFR Part 38 certified' },
              { icon: Users, value: 'Full', label: 'Passenger systems', sub: 'Seating, flooring, HVAC' },
              { icon: Monitor, value: 'LED', label: 'Destination systems', sub: 'Luminator & Hanover' },
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
              <h2 className="text-2xl font-bold text-[#003087] mb-6">Rehabilitation Scope</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {scope.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-[#F8F9FB] rounded-lg p-4 border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-[#E8A020] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <div className="relative rounded-2xl overflow-hidden h-52">
                <Image src="https://completecoach.com/wp-content/uploads/2024/04/st-louis.jpg" alt="St. Louis transit bus interior rehab" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#003087]/65 flex items-center">
                  <div className="p-8">
                    <div className="text-[#E8A020] text-xs font-bold uppercase tracking-widest mb-2">Case Study</div>
                    <div className="text-white text-lg font-bold">Denver RTD Interior Rehab</div>
                    <div className="text-blue-100 text-sm mt-1">8 buses fully rehabilitated — seating, flooring, ADA systems, LED lighting. $780K contract.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-[#003087] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">ADA Compliance</h3>
                <p className="text-blue-200 text-sm mb-4 leading-relaxed">All CCW interior rehabs include ADA compliance verification and sign-off per 49 CFR Part 38 requirements.</p>
                <div className="space-y-2 text-sm">
                  {['Wheelchair securement','Kneeling system','Priority seating signage','Audio/visual stop announcements','Slip-resistant flooring'].map(i => (
                    <div key={i} className="flex items-center gap-2 text-blue-100">
                      <CheckCircle className="w-4 h-4 text-[#E8A020] flex-shrink-0" />{i}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#003087] mb-3">Destination Sign Partners</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  {['Luminator Horizon Series','Hanover Displays','Talking Bus / Clever Devices','Custom LED sign programming'].map(i => (
                    <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#E8A020] rounded-full flex-shrink-0" />{i}</li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className="w-full bg-[#003087] text-white py-3.5 rounded-xl font-semibold hover:bg-[#004db3] transition-colors flex items-center justify-center gap-2 text-sm">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#003087] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Refresh your passenger experience</h2>
          <p className="text-blue-100 mb-6 text-sm">CCW will assess your fleet interiors and provide a full rehabilitation proposal — no obligation.</p>
          <Link href="/contact" className="bg-[#E8A020] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#f5b84a] transition-colors inline-flex items-center gap-2">
            Contact Our Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
