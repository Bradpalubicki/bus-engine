import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = { title: 'CNG / LNG Engine Repower | Complete Coach Works' }

export default function CngRepowerPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003087] mb-4">CNG / LNG Engine Repower</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Convert your diesel fleet to clean-burning compressed or liquefied natural gas — reducing emissions and fuel costs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-bold text-[#003087] mb-4">Program Benefits</h2>
            <ul className="space-y-3">
              {[
                'Meets CARB and EPA clean fleet requirements',
                'Cummins ISL G / Westport engines — proven transit platform',
                'Full CNG fuel system design and installation',
                'NFPA 52 certified installation',
                'Significant reduction in NOx and PM emissions',
                'Lower fuel cost vs. diesel (typically 30-50% savings)',
                'FTA Buy America compliant program',
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="bg-[#003087] text-white rounded-xl p-6">
              <h3 className="font-bold mb-3">Compatible Platforms</h3>
              <div className="text-sm text-blue-100 space-y-1">
                <div>New Flyer D40LF / D60LF / XD40</div>
                <div>Gillig Phantom / Advantage / BRT</div>
                <div>MCI D4500 / D4500CT</div>
                <div>Nova Bus LFS / LFS Artic</div>
                <div>Orion VII / Orion V</div>
              </div>
            </div>
            <Link href="/contact" className="w-full bg-[#E8A020] text-white py-3 rounded-lg font-semibold hover:bg-[#f5b84a] transition-colors flex items-center justify-center gap-2">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
