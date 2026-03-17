import { Metadata } from 'next'
import VideoHero from '@/components/marketing/VideoHero'
import StatsBar from '@/components/marketing/StatsBar'

export const metadata: Metadata = {
  title: 'Complete Coach Works — Transit Bus Refurbishment & ZEPS Electric Conversion | Riverside, CA',
  description: 'CCW refurbishes transit buses at half the cost of new. ZEPS electric conversion: 70+ buses, 4M miles, $580K vs $830K OEM. FTA compliant. SAM registered.',
}

const services = [
  { icon: '🔧', title: 'Midlife Refurbishment', desc: 'Complete structural, mechanical, and cosmetic restoration. Extends bus life by 10+ years at half the cost of new.', stat: '$300–400K avg. contract' },
  { icon: '⚡', title: 'ZEPS Electric Conversion', desc: 'Battery-electric powertrain retrofit for any 30-60ft transit bus. FTA compliant, CARB certified, HVIP eligible.', stat: '70+ conversions completed' },
  { icon: '🔩', title: 'CNG Repower & Collision', desc: 'CARB-certified L9N CNG repowers. Full collision and structural repair. ADA upgrade retrofits.', stat: 'CARB L9N certified' },
]

export default function CCWHomePage() {
  return (
    <main>
      <VideoHero
        videoSrc="https://completecoach.com/wp-content/uploads/2024/04/CCW.mp4"
        fallbackImage="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920"
        overlay="from-[#0A1628]/90 to-[#003087]/60"
        headline="America's Transit Bus Refurbishment Leader"
        subheadline="Half the cost. Half the delivery time. FTA compliant."
        ctaPrimary={{ label: "Get a Fleet Assessment", href: "/contact" }}
        ctaSecondary={{ label: "See ZEPS Electric", href: "/zeps" }}
        brand="CCW"
      />
      <StatsBar />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003087] mb-12 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-[#003087] mb-3">{s.title}</h3>
                <p className="text-gray-600 mb-4">{s.desc}</p>
                <div className="text-sm font-semibold text-[#E8A020]">{s.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#E8A020] text-sm font-bold uppercase tracking-wider mb-4">ZEPS Electric Conversion</div>
            <h2 className="text-4xl font-bold mb-6">Electric Fleet Without the OEM Price Tag</h2>
            <p className="text-gray-300 text-lg mb-8">ZEPS converts your existing fleet to battery-electric for $580K — vs $830K for a new OEM electric bus. 70+ conversions. 4 million miles in revenue service.</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div><div className="text-3xl font-bold text-[#E8A020]">70+</div><div className="text-sm text-gray-400">Conversions</div></div>
              <div><div className="text-3xl font-bold text-[#E8A020]">4M</div><div className="text-sm text-gray-400">Miles in Service</div></div>
              <div><div className="text-3xl font-bold text-[#E8A020]">$250K</div><div className="text-sm text-gray-400">Saved Per Bus</div></div>
            </div>
            <a href="/zeps" className="inline-flex items-center bg-[#E8A020] text-[#0A1628] font-bold px-8 py-4 rounded-lg hover:bg-[#d4911a] transition-colors">
              Explore ZEPS →
            </a>
          </div>
          <div className="bg-[#0d1f3a] rounded-2xl p-8">
            <div className="text-center text-gray-400 text-sm mb-4">Cost Comparison Per Bus</div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1"><span>New OEM Electric</span><span className="font-bold">$830,000</span></div>
                <div className="bg-red-500/30 rounded-full h-3"><div className="bg-red-500 rounded-full h-3 w-full" /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span>ZEPS Conversion</span><span className="font-bold text-[#E8A020]">$580,000</span></div>
                <div className="bg-[#E8A020]/30 rounded-full h-3"><div className="bg-[#E8A020] rounded-full h-3" style={{width:'70%'}} /></div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-2xl font-bold text-green-400">Save $250,000 per bus</div>
              <div className="text-sm text-gray-400 mt-1">FTA Buy America compliant</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-sm text-gray-500 font-medium mb-8">TRUSTED BY AMERICA&apos;S TRANSIT AGENCIES</div>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 font-bold text-lg">
            {['TriMet', 'IndyGo', 'OCTA', 'Foothill Transit', 'AVTA', 'SF Muni', 'SunLine', 'Omnitrans'].map(a => (
              <span key={a} className="text-[#003087] hover:text-[#E8A020] transition-colors">{a}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="py-8 bg-[#003087] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            {['FTA Registered TVM','APTA Member','Buy America Compliant','DBE Program','CARB Certified','SAM.gov Registered','ESOP Company'].map(b => (
              <span key={b} className="flex items-center gap-2"><span className="text-green-400">✓</span>{b}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
