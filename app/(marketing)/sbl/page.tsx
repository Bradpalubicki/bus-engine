import { Metadata } from 'next'
import VideoHero from '@/components/marketing/VideoHero'

export const metadata: Metadata = {
  title: 'Shuttle Bus Leasing — Short & Long-Term Transit Bus Leasing | Riverside, CA',
  description: 'SBL offers seasonal, contract, and lease-to-own bus programs. 2002 and 2010 Olympics supplier. 1,000+ bus inventory. FTA compliant.',
}

const leaseTypes = [
  { type: 'Short-Term', duration: '1–12 months', use: 'Events, peaks, emergencies', icon: '⚡' },
  { type: 'Contract Lease', duration: '1–5 years', use: 'Fixed-route operations', icon: '📋' },
  { type: 'Lease-to-Own', duration: 'Flexible', use: 'Budget-constrained agencies', icon: '🏆' },
  { type: 'Employee Shuttle', duration: 'Ongoing', use: 'Corporate campus transport', icon: '🏢' },
]

export default function SBLHomePage() {
  return (
    <main>
      <VideoHero
        videoSrc="https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4"
        fallbackImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
        overlay="from-[#1a2e1a]/90 to-[#2d7a3a]/60"
        headline="Transit Bus Leasing That Fits Your Budget"
        subheadline="Short-term, contract, and lease-to-own programs. 1,000+ bus inventory."
        ctaPrimary={{ label: "View Lease Programs", href: "/sbl/fleet" }}
        ctaSecondary={{ label: "Get a Quote", href: "/contact" }}
        brand="SBL"
      />
      <section className="py-12 bg-[#2d7a3a] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xl font-bold mb-2">Trusted for the World&apos;s Largest Events</div>
          <div className="text-green-200">Official bus supplier: 2002 Winter Olympics (Salt Lake City) · 2010 Winter Olympics (Vancouver)</div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#2d7a3a] mb-4 text-center">Lease Programs</h2>
          <p className="text-gray-600 text-center mb-12">Flexible options for every transit need</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaseTypes.map(l => (
              <div key={l.type} className="border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:border-[#2d7a3a] transition-all">
                <div className="text-4xl mb-4">{l.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{l.type}</h3>
                <div className="text-sm text-[#2d7a3a] font-medium mb-3">{l.duration}</div>
                <p className="text-gray-600 text-sm">{l.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#2d7a3a] mb-4">Ready to Lease?</h2>
          <p className="text-gray-600 mb-8">Get a custom lease quote for your fleet within 24 hours.</p>
          <a href="/contact" className="inline-block bg-[#2d7a3a] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#256832] transition-colors">
            Request a Lease Quote →
          </a>
        </div>
      </section>
    </main>
  )
}
