import Image from 'next/image'
import Link from 'next/link'
import { Award, CheckCircle, ArrowRight, ShieldCheck, Clock, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'CNG Re-tanking & Cylinder Recertification | Complete Coach Works',
  description: 'CCW certified CNG cylinder inspection, hydrostatic testing, and tank replacement. DOT compliance for all compressed natural gas bus fleets.',
}

const scope = [
  'Visual and ultrasonic cylinder inspection',
  'Hydrostatic pressure testing per DOT standards',
  'Cylinder removal and certified disposal',
  'New cylinder installation and mounting',
  'Fuel system pressure testing and leak check',
  'Valve and fitting replacement',
  'High-pressure line inspection and replacement',
  'Fuel system commissioning and documentation',
  'Regulatory compliance documentation package',
  'Post-installation road test and sign-off',
]

export default function CngRetankingPage() {
  return (
    <>
      <section className="relative bg-[#003087] text-white overflow-hidden min-h-[420px] flex items-end pb-16">
        <div className="absolute inset-0">
          <Image src="https://completecoach.com/wp-content/uploads/2024/06/IMG_2928.jpg" alt="CNG retanking service" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-[#003087]/72" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> DOT Certified
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">CNG Re-tanking &amp; Recertification</h1>
          <p className="text-xl text-blue-100 max-w-2xl">DOT-certified compressed natural gas cylinder inspection, hydrostatic testing, and replacement — keeping your CNG fleet safe and compliant.</p>
        </div>
      </section>

      <section className="bg-[#F8F9FB] border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, value: 'DOT', label: 'Certified inspectors', sub: 'Hydrostatic testing per 49 CFR' },
              { icon: Clock, value: '15 yr', label: 'Cylinder service life', sub: 'Type III/IV composite cylinders' },
              { icon: AlertTriangle, value: 'Zero', label: 'Tolerance for failure', sub: 'Full documentation on every job' },
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
              <h2 className="text-2xl font-bold text-[#003087] mb-6">Service Scope</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {scope.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-[#F8F9FB] rounded-lg p-4 border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-[#E8A020] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-[#E8A020] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] mb-2">Don&apos;t wait until cylinders fail inspection</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Type III and Type IV composite CNG cylinders have a mandatory 15-year service life. Expired cylinders must be removed from service immediately — there is no extension. CCW performs proactive fleet-wide cylinder audits to keep you ahead of compliance deadlines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-[#003087] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Compliance Requirements</h3>
                <div className="space-y-3 text-sm">
                  {[['DOT Standard','49 CFR Part 178'],['Cylinder Life','15 years from manufacture'],['Test Interval','Per manufacturer spec'],['Disposal','Certified destruction'],['Documentation','Full chain of custody'],['Certifications','NFPA 52 compliant']].map(([k,v]) => (
                    <div key={k} className="flex justify-between border-b border-blue-700/50 pb-2 last:border-0 last:pb-0">
                      <span className="text-blue-200">{k}</span>
                      <span className="font-semibold text-right text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#003087] mb-3">Fleet Audit Service</h3>
                <p className="text-sm text-gray-600 leading-relaxed">CCW will audit your entire CNG fleet cylinder inventory — identifying cylinders approaching end-of-life and providing a replacement schedule with cost estimates.</p>
              </div>
              <Link href="/contact" className="w-full bg-[#003087] text-white py-3.5 rounded-xl font-semibold hover:bg-[#004db3] transition-colors flex items-center justify-center gap-2 text-sm">
                Request a Fleet Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#003087] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Know when your cylinders expire</h2>
          <p className="text-blue-100 mb-6 text-sm">CCW will audit your CNG fleet and build a proactive replacement schedule — before you have a compliance issue.</p>
          <Link href="/contact" className="bg-[#E8A020] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#f5b84a] transition-colors inline-flex items-center gap-2">
            Schedule a Fleet Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
