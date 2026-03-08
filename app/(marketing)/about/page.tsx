import Image from 'next/image'
import { CheckCircle, Users, Award, MapPin } from 'lucide-react'

export const metadata = {
  title: 'About Complete Coach Works | 40 Years of Transit Bus Remanufacturing',
}

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003087] mb-4">About Complete Coach Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Founded in 1985, CCW is the nation's largest transit bus remanufacturing company — 100% employee-owned since 2021.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-[#003087] mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">Complete Coach Works was founded on the belief that well-maintained buses — not new ones — are the most sustainable and cost-effective solution for transit agencies. For over 40 years, we have delivered on that promise.</p>
            <p className="text-gray-600 mb-4">In 2021, CCW transitioned to 100% employee ownership through an ESOP, deepening the team's commitment to quality work and long-term partnerships with the agencies we serve.</p>
            <p className="text-gray-600">Today, CCW operates from 10 locations across the country and has completed more than $500M in remanufacturing contracts for agencies ranging from SFMTA to IndyGo.</p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1581092162155-9f15e3e6c0a4?w=800"
              alt="CCW team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Users, title: '~200 Employees', sub: '100% Employee-Owned (ESOP)' },
            { icon: Award, title: '$102M Contract', sub: 'SFMTA — 219 coaches (largest in CCW history)' },
            { icon: MapPin, title: '10 Locations', sub: 'CA, WA, TN, TX, AZ, WI' },
          ].map((item) => (
            <div key={item.title} className="bg-[#F8F9FB] rounded-xl p-6 text-center border border-gray-100">
              <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-[#003087] text-lg">{item.title}</div>
              <div className="text-gray-500 text-sm mt-1">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#003087] text-white rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Certifications & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'FTA (Federal Transit Administration) Certified Programs',
              'Buy America Compliant — all programs',
              'CARB (California Air Resources Board) Approved',
              'ADA Compliance — all accessibility upgrades',
              'CNG/LNG Certified — NFPA 52 compliant',
              'OSHA Safety Standards — all facilities',
              'ISO quality management processes',
              'DBE Subcontracting Program participation',
            ].map((cert) => (
              <div key={cert} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#E8A020] flex-shrink-0" />
                <span className="text-blue-100 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
