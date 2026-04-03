import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Wrench, Zap, Leaf, Shield, Paintbrush, Armchair } from 'lucide-react'

export const metadata = {
  title: 'Transit Bus Services | Complete Coach Works',
  description: 'CCW offers full-spectrum transit bus rehabilitation — midlife overhaul, ZEPS electric conversion, CNG repower, interior rehab, body & paint. FTA compliant, Buy America certified.',
}

const servicesBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://completecoach.com' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://completecoach.com/services' },
  ],
}

const services = [
  {
    icon: Wrench,
    title: 'Midlife Overhaul & Remanufacturing',
    slug: 'midlife-overhaul',
    img: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg',
    summary: 'Complete mechanical and cosmetic rehabilitation extending bus service life by 12+ years at 15–25% of new bus cost.',
    bullets: ['Engine & transmission rebuild', 'Full electrical system restoration', 'ADA compliance upgrades', 'FTA Section 5307/5339 eligible'],
    badge: '$300–400K avg contract',
    badgeColor: '#003087',
  },
  {
    icon: Zap,
    title: 'ZEPS Zero-Emission Conversion',
    slug: null,
    href: '/zeps',
    img: 'https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png',
    imgOverride: '/images/zeps-electric/zeps-zero-emission-electric-bus-conversion-complete-coach-works.jpg',
    summary: 'CCW\'s proprietary electric drivetrain retrofit converts diesel/hybrid buses to full-electric at 60–80% less than buying new EVs.',
    bullets: ['70+ conversions completed', '4M+ electric miles in service', 'FTA Buy America compliant', 'CARB approved technology'],
    badge: '60–80% cost savings vs new EV',
    badgeColor: '#16a34a',
  },
  {
    icon: Leaf,
    title: 'CNG / LNG Repower',
    slug: 'cng-repower',
    img: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg',
    summary: 'Replace aging diesel powertrains with clean-burning compressed natural gas engines — CARB L9N certified, 30–50% fuel savings.',
    bullets: ['Cummins L9N certified', 'CARB & EPA compliant', '30–50% fuel cost reduction', 'Extends vehicle life 8–12 years'],
    badge: 'CARB L9N Certified',
    badgeColor: '#0891b2',
  },
  {
    icon: Shield,
    title: 'CNG Re-tanking',
    slug: 'cng-retanking',
    img: 'https://completecoach.com/wp-content/uploads/2026/01/CCW-Murrieta-11-400x250.jpg',
    summary: 'Inspect, recertify, and replace expired CNG storage cylinders to restore full range and safety compliance for your natural gas fleet.',
    bullets: ['Cylinder inspection & recertification', 'DOT/FMCSA compliance', 'Full range restoration', 'Quick 2–3 day turnaround'],
    badge: 'DOT Certified',
    badgeColor: '#7c3aed',
  },
  {
    icon: Armchair,
    title: 'Interior Rehabilitation',
    slug: 'interior-rehab',
    img: 'https://completecoach.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-154806-400x250.jpg',
    summary: 'Full passenger compartment restoration — seating, flooring, HVAC, LED lighting, destination signs, and ADA accessibility upgrades.',
    bullets: ['New seating & flooring systems', 'HVAC system overhaul', 'LED destination sign retrofit', 'ADA accessibility compliance'],
    badge: 'ADA Compliant',
    badgeColor: '#0284c7',
  },
  {
    icon: Paintbrush,
    title: 'Body, Paint & Structural',
    slug: 'body-paint',
    img: 'https://completecoach.com/wp-content/uploads/2024/04/trimet.jpg',
    summary: 'Collision repair, corrosion treatment, structural panel replacement, and custom fleet livery — all to OEM specification.',
    bullets: ['Collision damage repair', 'Anti-corrosion treatment', 'Custom fleet livery painting', 'OEM structural specs'],
    badge: 'All Makes & Models',
    badgeColor: '#b45309',
  },
]

export default function ServicesPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesBreadcrumbSchema) }} />
      {/* Hero */}
      <section className="bg-[#003087] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#E8A020]/20 border border-[#E8A020]/40 rounded-full px-4 py-1.5 text-[#E8A020] text-xs font-bold uppercase tracking-widest mb-4">
            Our Services
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 max-w-3xl">
            Full-Spectrum Transit Bus Rehabilitation
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mb-8">
            From midlife overhaul to zero-emission conversion — CCW extends fleet life, reduces capital costs, and keeps your buses in revenue service.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-blue-100">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E8A020] inline-block" /> FTA Buy America Compliant</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E8A020] inline-block" /> CARB Certified</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E8A020] inline-block" /> ADA Compliant</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E8A020] inline-block" /> 38 Years Experience</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => {
              const href = s.href ?? `/services/${s.slug}`
              const imgSrc = s.imgOverride ?? s.img
              return (
                <div key={s.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={imgSrc} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className="absolute bottom-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: s.badgeColor }}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.badgeColor}15` }}>
                        <s.icon className="w-5 h-5" style={{ color: s.badgeColor }} />
                      </div>
                      <h2 className="font-bold text-[#003087] text-sm leading-tight">{s.title}</h2>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.summary}</p>
                    <ul className="space-y-1.5 mb-6 flex-1">
                      {s.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8A020] flex-shrink-0 mt-1.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={href}
                      className="flex items-center justify-center gap-2 w-full bg-[#003087] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why CCW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#003087] mb-4">Why Transit Agencies Choose CCW</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-12">Serving 100+ transit agencies nationwide for 38 years. Our ESOP model means every employee is invested in delivering quality work.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '38', label: 'Years in Business' },
              { value: '350+', label: 'Employees' },
              { value: '70+', label: 'ZEPS Conversions' },
              { value: '$102M', label: 'Annual Revenue' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#E8A020] mb-1">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#f5b84a] transition-colors">
            Get a Fleet Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
