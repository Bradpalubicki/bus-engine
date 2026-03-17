import Image from 'next/image'
import Link from 'next/link'
import { Shield, CheckCircle, ArrowRight, Paintbrush, Wrench, Star } from 'lucide-react'
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider'
import { ServiceGallery } from '@/components/ServiceGallery'
import { bodyPaintImages } from '@/data/imageManifest'

export const metadata = {
  title: 'Body, Paint & Structural Repair | Complete Coach Works',
  description: 'CCW full-service body, paint, and structural repair for transit buses. Collision repair, corrosion treatment, exterior restoration to OEM spec.',
}

const scope = [
  'Collision damage assessment and documentation',
  'Structural frame straightening and repair',
  'Fiberglass and composite panel fabrication',
  'Corrosion treatment and rust abatement',
  'Metal fabrication — custom panels and brackets',
  'Surface preparation — media blasting',
  'Primer, sealer, and finish coat application',
  'Fleet matching paint — custom color mixing',
  'Agency decal, logo, and graphics application',
  'Window replacement and sealing',
  'Exterior lighting restoration',
  'Pre-delivery inspection and documentation',
]

export default function BodyPaintPage() {
  return (
    <>
      <section className="relative bg-[#003087] text-white overflow-hidden min-h-[420px] flex items-end pb-16">
        <div className="absolute inset-0">
          <Image src="https://completecoach.com/wp-content/uploads/2024/08/accident2.jpg" alt="CCW body and paint shop" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-[#003087]/72" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" /> Body & Structural
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Body, Paint &amp; Structural Repair</h1>
          <p className="text-xl text-blue-100 max-w-2xl">Collision repair, corrosion treatment, and full exterior restoration — returning buses to OEM spec inside and out.</p>
        </div>
      </section>

      <section className="bg-[#F8F9FB] border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Paintbrush, value: 'OEM', label: 'Paint matching', sub: 'Fleet color consistency' },
              { icon: Wrench, value: 'Full', label: 'Structural repair', sub: 'Frame straightening & fab' },
              { icon: Star, value: 'All', label: 'Makes & models', sub: 'Gillig, New Flyer, MCI, Nova' },
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
              <h2 className="text-2xl font-bold text-[#003087] mb-6">Scope of Work</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {scope.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-[#F8F9FB] rounded-lg p-4 border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-[#E8A020] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <div className="relative rounded-2xl overflow-hidden h-52">
                <Image src="https://completecoach.com/wp-content/uploads/2024/08/accident1.jpg" alt="CCW structural repair before and after" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#003087]/60 flex items-center">
                  <div className="p-8">
                    <div className="text-[#E8A020] text-xs font-bold uppercase tracking-widest mb-2">Collision Repair</div>
                    <div className="text-white text-lg font-bold">Major structural damage? CCW repairs it.</div>
                    <div className="text-blue-100 text-sm mt-1">Full frame straightening, panel fabrication, and paint — back on the road.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-[#003087] text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Capabilities</h3>
                <div className="space-y-3 text-sm">
                  {[['Paint Booths','Climate-controlled, fleet-scale'],['Frame Repair','Full straightening jigs'],['Fabrication','In-house metal shop'],['Corrosion','Treatment + coating'],['Graphics','Wrap and decal systems'],['Compliance','Pre-delivery inspection']].map(([k,v]) => (
                    <div key={k} className="flex justify-between border-b border-blue-700/50 pb-2 last:border-0 last:pb-0">
                      <span className="text-blue-200">{k}</span>
                      <span className="font-semibold text-right text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#003087] mb-3">Insurance Claims Welcome</h3>
                <p className="text-sm text-gray-600 leading-relaxed">CCW works directly with agency insurance carriers for collision repair claims — providing detailed damage documentation, photos, and cost breakdowns.</p>
              </div>
              <Link href="/contact" className="w-full bg-[#003087] text-white py-3.5 rounded-xl font-semibold hover:bg-[#004db3] transition-colors flex items-center justify-center gap-2 text-sm">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceGallery images={bodyPaintImages} title="Collision Repair Gallery" defaultShow={6} />
        </div>
      </section>

      {/* Before / After Slider */}
      <section className="py-16 bg-[#F8F9FB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="text-[#E8A020] text-xs font-bold uppercase tracking-widest mb-2">Before &amp; After</div>
            <h2 className="text-2xl font-bold text-[#003087]">Drag to Compare — Collision Damage to Showroom Finish</h2>
            <p className="text-gray-500 text-sm mt-2">Slide left or right to reveal the transformation</p>
          </div>
          <BeforeAfterSlider
            beforeSrc="https://completecoach.com/wp-content/uploads/2024/08/accident2.jpg"
            afterSrc="https://completecoach.com/wp-content/uploads/2024/08/bus-paint.jpg"
            beforeAlt="Transit bus with collision damage before CCW body and paint repair"
            afterAlt="Transit bus after CCW body repair and full paint restoration"
            initialPosition={45}
            height={460}
          />
        </div>
      </section>

      <section className="bg-[#003087] py-12 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Bus in an accident? We fix it right.</h2>
          <p className="text-blue-100 mb-6 text-sm">CCW handles the whole process — damage assessment, repair, paint, and compliance documentation.</p>
          <Link href="/contact" className="bg-[#E8A020] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#f5b84a] transition-colors inline-flex items-center gap-2">
            Contact Our Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
