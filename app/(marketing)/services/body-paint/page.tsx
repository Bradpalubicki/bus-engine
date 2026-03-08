import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export const metadata = { title: 'Body, Paint & Structural | Complete Coach Works' }
export default function BodyPaintPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003087] mb-4">Body, Paint & Structural Repair</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Collision repair, corrosion treatment, and full exterior restoration to OEM specifications.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {['Collision Damage Repair', 'Corrosion Treatment', 'Full Paint Restoration', 'Roof Replacement', 'Structural Welding', 'Agency Livery Application'].map(s => (
            <div key={s} className="bg-[#F8F9FB] rounded-xl p-5 border border-gray-100">
              <div className="font-semibold text-[#003087]">{s}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/contact" className="bg-[#003087] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#004db3] transition-colors inline-flex items-center gap-2">
            Request Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
