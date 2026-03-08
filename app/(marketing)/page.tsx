import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Zap, Wrench, Bus, MapPin, Award, Users, TrendingUp, Shield } from 'lucide-react'

const services = [
  {
    title: 'Midlife Overhaul',
    description: 'Complete mechanical, electrical, and cosmetic rehabilitation extending bus life by 12+ years.',
    icon: Wrench,
    href: '/services/midlife-overhaul',
  },
  {
    title: 'CNG / LNG Repower',
    description: 'Engine swap programs converting diesel fleets to clean-burning compressed natural gas.',
    icon: TrendingUp,
    href: '/services/cng-repower',
  },
  {
    title: 'ZEPS Electric Conversion',
    description: 'Proprietary zero-emission propulsion system. 21 buses, 1M+ combined miles proven in service.',
    icon: Zap,
    href: '/services/zeps-electric',
  },
  {
    title: 'Body, Paint & Structural',
    description: 'Collision repair, corrosion treatment, and full exterior restoration to OEM spec.',
    icon: Shield,
    href: '/services/body-paint',
  },
  {
    title: 'Interior Rehabilitation',
    description: 'Seating, flooring, ADA upgrades, destination signs, lighting, and passenger comfort.',
    icon: Bus,
    href: '/services/interior-rehab',
  },
  {
    title: 'CNG Re-tanking',
    description: 'Certified compressed natural gas cylinder inspection, hydro-testing, and replacement.',
    icon: Award,
    href: '/services/cng-retanking',
  },
]

const stats = [
  { value: '$102M', label: 'Largest Single Contract', sub: 'SFMTA — 219 coaches' },
  { value: '40+', label: 'Years Experience', sub: 'Founded 1985' },
  { value: '10', label: 'Locations Nationwide', sub: 'Coast to coast coverage' },
  { value: '1M+', label: 'ZEPS Miles', sub: 'Zero-emission proven' },
]

const clients = ['SFMTA', 'IndyGo', 'Long Beach Transit', 'Denver RTD', 'Portland TriMet', 'VTA San Jose', 'Sacramento RT', 'King County Metro']

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#003087] text-white overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200"
            alt="Transit bus"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <span>100% Employee-Owned · Est. 1985</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              The Nation's Largest Transit Bus Remanufacturing Company
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              CCW refurbishes, repowers, and rehabilitates transit buses for public agencies across the United States — extending fleet life, reducing emissions, and cutting capital costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-[#E8A020] text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-[#f5b84a] transition-colors flex items-center justify-center gap-2"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services/zeps-electric"
                className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors text-center"
              >
                Learn About ZEPS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#E8A020] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="font-semibold text-sm mt-1">{stat.label}</div>
                <div className="text-xs text-amber-100 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003087] mb-4">What We Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Full-spectrum bus remanufacturing and rehabilitation — from engine repowers to zero-emission electric conversions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-[#F8F9FB] rounded-xl p-6 hover:shadow-lg transition-all hover:border-[#003087] border border-transparent"
              >
                <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#E8A020] transition-colors">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#003087] text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                <div className="mt-4 flex items-center gap-1 text-[#E8A020] text-sm font-medium">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ZEPS Feature */}
      <section className="py-20 bg-[#003087] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E8A020] px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Zap className="w-3.5 h-3.5" /> Proprietary Technology
              </div>
              <h2 className="text-3xl font-bold mb-4">ZEPS Zero-Emission Propulsion System</h2>
              <p className="text-blue-100 mb-6">CCW's proprietary ZEPS system converts existing diesel and hybrid buses to fully electric propulsion — at a fraction of the cost of new electric buses.</p>
              <ul className="space-y-3 mb-8">
                {[
                  '21 buses converted, 1M+ combined miles in revenue service',
                  'Indianapolis Public Transit — proven track record',
                  '60-80% cost savings vs. new electric bus purchase',
                  'FTA Buy America compliant',
                  'Full warranty and ongoing support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#E8A020] mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/services/zeps-electric"
                className="bg-[#E8A020] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f5b84a] transition-colors inline-flex items-center gap-2"
              >
                ZEPS Program Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800"
                alt="Electric bus charging"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why CCW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                alt="Bus workshop"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#003087] mb-4">Why Transit Agencies Choose CCW</h2>
              <p className="text-gray-600 mb-6">With 40+ years of experience and the industry's largest remanufacturing capacity, we deliver on time, on budget — every contract.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Award, title: 'FTA Certified', sub: 'Federal compliance on every program' },
                  { icon: MapPin, title: '10 Locations', sub: 'Work performed on-site at your facility' },
                  { icon: Users, title: '100% ESOP', sub: 'Employee-owned, skin in the game' },
                  { icon: Shield, title: 'Buy America', sub: 'All programs compliant' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-[#F8F9FB] rounded-lg">
                    <div className="w-9 h-9 bg-[#003087] rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#003087] text-sm">{item.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-12 bg-[#F8F9FB] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-wider">Trusted by Leading Transit Agencies</p>
          <div className="flex flex-wrap justify-center gap-4">
            {clients.map((client) => (
              <div key={client} className="bg-white border border-gray-200 rounded-lg px-5 py-2.5 text-sm font-semibold text-[#003087]">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003087] mb-4">10 Locations Nationwide</h2>
            <p className="text-gray-600">Serving transit agencies coast to coast with local expertise and national capacity.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { city: 'Riverside, CA', type: 'HQ' },
              { city: 'Alameda, CA', type: '' },
              { city: 'Seattle, WA', type: '' },
              { city: 'Memphis, TN', type: '' },
              { city: 'El Paso, TX', type: '' },
              { city: 'Del Rio, TX', type: '' },
              { city: 'Laredo, TX', type: '' },
              { city: 'San Benito, TX', type: '' },
              { city: 'Phoenix, AZ', type: '' },
              { city: 'Waukesha, WI', type: '' },
            ].map((loc) => (
              <div key={loc.city} className="bg-[#F8F9FB] rounded-lg p-3 text-center border border-gray-100">
                <MapPin className="w-4 h-4 text-[#E8A020] mx-auto mb-1" />
                <div className="text-xs font-semibold text-[#003087]">{loc.city}</div>
                {loc.type && <div className="text-xs text-[#E8A020] font-bold">{loc.type}</div>}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/locations" className="text-[#003087] font-semibold hover:underline inline-flex items-center gap-1">
              View all locations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#E8A020]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Extend Your Fleet's Life?</h2>
          <p className="text-amber-100 mb-8 text-lg">Get a program assessment from CCW's engineering team — no cost, no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#003087] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#004db3] transition-colors">
              Contact Our Team
            </Link>
            <Link href="/dashboard" className="bg-white text-[#003087] px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              View Ops Dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
