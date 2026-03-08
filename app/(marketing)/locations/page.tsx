import { MapPin, Phone } from 'lucide-react'
import { demoLocations } from '@/lib/demo-data'

export const metadata = {
  title: 'CCW Locations | 10 Nationwide | Complete Coach Works',
}

export default function LocationsPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003087] mb-4">Our 10 Locations</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">From the Pacific Coast to the Midwest, CCW brings remanufacturing expertise to your fleet — wherever you operate.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoLocations.map((loc) => (
            <div key={loc.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-[#003087] text-lg">{loc.name}</div>
                  <div className="text-gray-500 text-sm">{loc.city}, {loc.state}</div>
                </div>
                {loc.type === 'hq' && (
                  <span className="bg-[#E8A020] text-white text-xs font-bold px-2 py-1 rounded">HQ</span>
                )}
                {loc.type === 'satellite' && (
                  <span className="bg-[#003087] text-white text-xs font-bold px-2 py-1 rounded">SATELLITE</span>
                )}
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#003087] flex-shrink-0" />
                <span>{loc.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-[#003087]" />
                <span>{loc.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
