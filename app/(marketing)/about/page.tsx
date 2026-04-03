import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Users, Award, MapPin, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'About Complete Coach Works | 38 Years of Transit Bus Remanufacturing',
}

const leadership = [
  { name: 'Patrick Scully', title: 'President' },
  { name: 'Dale Carson', title: 'Chairman & Founder' },
  { name: 'Brad Carson', title: 'Chief Operating Officer' },
  { name: 'Chuck Barnes', title: 'SVP Operations & ZEPS Program Director' },
  { name: 'Michael Dominici', title: 'Chief Financial Officer' },
  { name: 'Amber Lindsey', title: 'Director of Contracts & DBE/ESOP Compliance' },
  { name: 'Ana Elias', title: 'Director of Human Resources' },
  { name: 'Alex Portillo', title: 'Director of Purchasing' },
  { name: 'Axel Rodriguez', title: 'Senior Production Manager' },
]

const familyCompanies = [
  {
    abbr: 'CCW',
    name: 'Complete Coach Works',
    description: 'The nation\'s largest transit bus remanufacturing company. Full-spectrum overhaul, repower, and electric conversion programs for public agencies nationwide.',
    url: 'https://completecoach.com',
    primary: true,
  },
  {
    abbr: 'TSI',
    name: 'Transit Sales International',
    description: 'Transit bus sales, leasing, and parts distribution serving agencies across the western United States.',
    url: 'https://bus-engine.vercel.app/tsi',
    primary: false,
  },
  {
    abbr: 'SBL',
    name: 'Shuttle Bus Leasing',
    description: 'Commercial vehicle leasing solutions for transit agencies, airports, universities, and corporate fleets.',
    url: 'https://bus-engine.vercel.app/sbl',
    primary: false,
  },
]

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003087] mb-4">About Complete Coach Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Founded in 1987, CCW is the nation&apos;s largest transit bus remanufacturing company — 100% employee-owned since 2021.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-[#003087] mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">Complete Coach Works was founded on the belief that well-maintained buses — not new ones — are the most sustainable and cost-effective solution for transit agencies. For over 38 years, we have delivered on that promise.</p>
            <p className="text-gray-600 mb-4">In 2021, CCW transitioned to 100% employee ownership through an ESOP, deepening the team&apos;s commitment to quality work and long-term partnerships with the agencies we serve.</p>
            <p className="text-gray-600">Today, CCW operates from 13 locations across the country and has completed more than $500M in remanufacturing contracts for agencies ranging from SFMTA to IndyGo.</p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="https://completecoach.com/wp-content/uploads/2021/03/CCW-facility-1.jpg"
              alt="CCW headquarters facility in Riverside, CA"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Users, title: '~200 Employees', sub: '100% Employee-Owned (ESOP)' },
            { icon: Award, title: '$101.6M Contract', sub: 'SFMTA — 219 coaches (largest in CCW history)' },
            { icon: MapPin, title: '13 Locations', sub: 'CA, WA, TN, TX, AZ, WI' },
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

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#003087] mb-2 text-center">Leadership Team</h2>
          <p className="text-gray-500 text-center text-sm mb-8">The people driving CCW&apos;s mission forward</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadership.map((person) => (
              <div key={person.name} className="bg-[#F8F9FB] rounded-xl p-5 border border-gray-100 flex items-center gap-4">
                <div className="w-11 h-11 bg-[#003087] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {person.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-[#003087] text-sm">{person.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5 leading-tight">{person.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carson Capital Corp Family */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E8A020] mb-2">Carson Capital Corp</p>
            <h2 className="text-2xl font-bold text-[#003087]">Family of Companies</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">CCW is part of the Carson Capital Corp family — a vertically integrated transit industry platform covering remanufacturing, sales, and leasing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {familyCompanies.map((company) => (
              <a
                key={company.abbr}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-xl p-6 border transition-all hover:shadow-lg ${
                  company.primary
                    ? 'bg-[#003087] border-[#003087] text-white'
                    : 'bg-white border-gray-200 hover:border-[#003087]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-xs font-bold px-2 py-1 rounded ${company.primary ? 'bg-[#E8A020] text-white' : 'bg-[#F8F9FB] text-[#003087]'}`}>
                    {company.abbr}
                  </div>
                  <ExternalLink className={`w-3.5 h-3.5 ${company.primary ? 'text-blue-300' : 'text-gray-400 group-hover:text-[#003087]'} transition-colors`} />
                </div>
                <h3 className={`font-bold text-sm mb-2 ${company.primary ? 'text-white' : 'text-[#003087]'}`}>{company.name}</h3>
                <p className={`text-xs leading-relaxed ${company.primary ? 'text-blue-200' : 'text-gray-500'}`}>{company.description}</p>
                <div className={`mt-3 text-xs font-medium ${company.primary ? 'text-[#E8A020]' : 'text-[#E8A020]'}`}>
                  {company.url.replace('https://', '')}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ESOP Callout */}
        <div className="mb-16 bg-[#E8A020]/10 border border-[#E8A020]/30 rounded-2xl p-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#E8A020] mb-3">100% Employee-Owned</div>
              <h2 className="text-2xl font-bold text-[#003087] mb-4">Built by the People Who Build the Buses</h2>
              <p className="text-gray-600 mb-4">In 2021, CCW transitioned to 100% Employee Stock Ownership Plan (ESOP). Every one of our 350 employees is an owner — with a direct stake in the quality of every bus that leaves our facilities.</p>
              <p className="text-gray-600">The ESOP structure means our team's retirement is tied to how well we serve our clients. That's not a policy. That's alignment.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '350', label: 'Employee-Owners' },
                { value: '2021', label: 'ESOP Transition Year' },
                { value: '100%', label: 'Employee Owned' },
                { value: '38 Yrs', label: 'In Business' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-5 text-center border border-[#E8A020]/20 shadow-sm">
                  <div className="text-2xl font-black text-[#003087]">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#E8A020] mb-3">38 Years of Excellence</div>
            <h2 className="text-2xl font-bold text-[#003087]">Key Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#003087]/20 md:-translate-x-0.5" />
            <div className="space-y-8">
              {[
                { year: '1987', title: 'Founded in Riverside, CA', body: 'Complete Coach Works is established with a mission to extend transit bus life through remanufacturing — at half the cost of new.' },
                { year: '2001', title: 'First Major Federal Contract', body: 'CCW secures its first large-scale FTA-funded remanufacturing contract, establishing federal procurement credibility.' },
                { year: '2015', title: 'ZEPS Electric Program Launch', body: 'CCW develops the ZEPS (Zero-Emission Propulsion System) — the industry\'s first battery-electric retrofit for existing transit bus fleets.' },
                { year: '2019', title: 'SFMTA Contract — $101.6M', body: 'CCW is awarded the largest contract in company history: 219-coach midlife overhaul for the San Francisco Municipal Transportation Agency.' },
                { year: '2021', title: '100% Employee Ownership (ESOP)', body: 'Carson Capital Corp transitions CCW to 100% employee ownership. 350 employees become owners with a stake in every bus that rolls out the door.' },
                { year: '2024', title: '70+ ZEPS Conversions · 4M Miles', body: 'The ZEPS program reaches 70+ completed electric conversions, with over 4 million cumulative miles in revenue service across multiple agencies.' },
              ].map((milestone, i) => (
                <div key={milestone.year} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} pl-10 md:pl-0`}>
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center text-white text-xs font-bold md:-translate-x-1/2 flex-shrink-0 z-10">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className={`md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                    <div className="text-xs font-bold text-[#E8A020] mb-1">{milestone.year}</div>
                    <div className="font-bold text-[#003087] mb-1">{milestone.title}</div>
                    <p className="text-gray-500 text-sm leading-relaxed">{milestone.body}</p>
                  </div>
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                </div>
              ))}
            </div>
          </div>
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
          <div className="mt-8 text-center">
            <Link href="/dbe" className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f5b84a] transition-colors text-sm">
              View DBE Program Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
