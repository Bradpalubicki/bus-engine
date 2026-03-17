import { Metadata } from 'next'
import VideoHero from '@/components/marketing/VideoHero'

export const metadata: Metadata = {
  title: 'Transit Sales International — 1,000+ Pre-Owned Transit Buses | Murrieta, CA',
  description: 'TSI sells pre-owned transit buses — 30 to 60ft, all fuel types. FTA compliant. 60-day accelerated delivery.',
}

const inventory = [
  { year: 2015, make: 'New Flyer', model: 'Xcelsior XD40', fuel: 'CNG', condition: 'Refurbished', seats: 38, price: '$185,000' },
  { year: 2016, make: 'Gillig', model: 'Low Floor', fuel: 'Diesel', condition: 'Refurbished', seats: 40, price: '$145,000' },
  { year: 2018, make: 'Proterra', model: 'Catalyst E2', fuel: 'Electric', condition: 'Refurbished', seats: 40, price: '$320,000' },
  { year: 2017, make: 'New Flyer', model: 'Xcelsior XD60', fuel: 'Diesel', condition: 'Refurbished', seats: 55, price: '$220,000' },
  { year: 2014, make: 'Gillig', model: 'Advantage', fuel: 'CNG', condition: 'As-Is', seats: 40, price: '$85,000' },
  { year: 2019, make: 'Gillig', model: 'Low Floor', fuel: 'Diesel', condition: 'Refurbished', seats: 40, price: '$195,000' },
]

export default function TSIHomePage() {
  return (
    <main>
      <VideoHero
        videoSrc="https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4"
        fallbackImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
        overlay="from-[#1a5fa8]/80 to-[#0f3a6e]/60"
        headline="1,000+ Transit Buses Ready to Deploy"
        subheadline="30 to 60ft. All fuel types. FTA compliant. 60-day delivery."
        ctaPrimary={{ label: "Browse Inventory", href: "/tsi/inventory" }}
        ctaSecondary={{ label: "Get a Quote", href: "/contact" }}
        brand="TSI"
      />
      <section className="py-8 bg-[#1a5fa8]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row gap-3">
            <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700">
              <option value="">All Lengths</option>
              <option value="30">30ft</option>
              <option value="35">35ft</option>
              <option value="40">40ft</option>
              <option value="60">60ft Articulated</option>
            </select>
            <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700">
              <option value="">All Fuel Types</option>
              <option value="diesel">Diesel</option>
              <option value="cng">CNG</option>
              <option value="electric">Electric</option>
            </select>
            <a href="/tsi/inventory" className="bg-[#1a5fa8] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#1555a0] transition-colors whitespace-nowrap text-center">
              Search →
            </a>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1a5fa8] mb-4">Available Inventory</h2>
          <p className="text-gray-600 mb-12">All buses FTA eligible. Buy America documentation available on request.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((bus, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#1a5fa8]/10 to-[#0f3a6e]/20 flex items-center justify-center">
                  <div className="text-6xl">🚌</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#1a5fa8]">{bus.year}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${bus.condition === 'Refurbished' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{bus.condition}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{bus.make} {bus.model}</h3>
                  <div className="text-sm text-gray-500 mb-4">{bus.fuel} · {bus.seats} seats</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{bus.price}</span>
                    <a href="/contact" className="text-sm font-bold text-[#1a5fa8] hover:underline">Inquire →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/tsi/inventory" className="inline-block bg-[#1a5fa8] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#1555a0] transition-colors">
              View All 1,000+ Buses →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
