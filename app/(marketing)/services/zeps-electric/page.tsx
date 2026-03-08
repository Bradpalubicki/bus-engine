import Image from 'next/image'
import Link from 'next/link'
import { Zap, CheckCircle, ArrowRight, DollarSign, Leaf, Clock } from 'lucide-react'

export const metadata = {
  title: 'ZEPS Zero-Emission Electric Bus Conversion | Complete Coach Works',
  description: "CCW's proprietary ZEPS system converts diesel/hybrid buses to full electric — at 60-80% cost savings vs. new electric buses.",
}

export default function ZepsPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#003087] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" /> Proprietary CCW Technology
          </div>
          <h1 className="text-4xl font-bold text-[#003087] mb-4">ZEPS Zero-Emission Propulsion System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Convert your existing diesel or hybrid bus fleet to fully electric propulsion — at a fraction of the cost of purchasing new electric buses.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Zap, value: '21', label: 'Buses Converted', sub: 'Indianapolis Public Transit' },
            { icon: Clock, value: '1M+', label: 'Revenue Miles', sub: 'Proven in daily service' },
            { icon: DollarSign, value: '60-80%', label: 'Cost Savings', sub: 'vs. new electric bus purchase' },
          ].map((s) => (
            <div key={s.label} className="bg-[#003087] text-white rounded-xl p-6 text-center">
              <s.icon className="w-8 h-8 text-[#E8A020] mx-auto mb-3" />
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="font-semibold mt-1">{s.label}</div>
              <div className="text-blue-200 text-sm mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-[#003087] mb-4">How ZEPS Works</h2>
            <p className="text-gray-600 mb-6">The ZEPS system replaces the engine, transmission, and fuel system with CCW's proprietary electric drivetrain while retaining the bus structure, body, ADA equipment, and interior — the most expensive components to replace.</p>
            <ul className="space-y-3">
              {[
                'Remove diesel/hybrid drivetrain and fuel system',
                'Install ZEPS electric motor and regenerative braking',
                'Integrate lithium-ion battery pack (range-optimized)',
                'Retain OEM body, interior, and ADA systems',
                'Full electrical system integration and testing',
                'FTA acceptance testing and agency handoff',
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#E8A020] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-gray-600 text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800"
              alt="Electric bus"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-[#F8F9FB] rounded-2xl p-10 mb-16">
          <h2 className="text-2xl font-bold text-[#003087] mb-6 text-center">ZEPS Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: DollarSign, title: 'Capital Cost Savings', sub: '60-80% less than purchasing a new battery-electric bus' },
              { icon: Leaf, title: 'Zero Tailpipe Emissions', sub: 'Supports CARB mandates and federal emissions goals' },
              { icon: CheckCircle, title: 'FTA Buy America Compliant', sub: 'Eligible for federal grant funding programs' },
              { icon: Clock, title: 'Extended Asset Life', sub: 'Add 12+ more years to existing rolling stock' },
              { icon: Zap, title: 'Lower Operating Costs', sub: 'Eliminate fuel costs, reduce maintenance expenses' },
              { icon: ArrowRight, title: 'Faster Delivery', sub: '12-18 months vs. 3-4 years for new bus procurement' },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-100">
                <b.icon className="w-5 h-5 text-[#E8A020] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-[#003087] text-sm">{b.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TCO Calculator placeholder */}
        <div className="bg-[#003087] text-white rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Total Cost of Ownership Calculator</h2>
          <p className="text-blue-200 mb-6">See how ZEPS compares to new bus purchase for your fleet size and operating profile.</p>
          <Link href="/contact" className="bg-[#E8A020] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#f5b84a] transition-colors inline-flex items-center gap-2">
            Get a Custom TCO Analysis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
