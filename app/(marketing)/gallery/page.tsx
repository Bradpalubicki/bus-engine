import { Metadata } from 'next'
import { GalleryGrid } from '@/components/marketing/GalleryGrid'

export const metadata: Metadata = {
  title: 'Photo & Video Gallery | Complete Coach Works',
  description: 'See CCW\'s fleet rehabilitation work — SFMTA, IndyGo, Long Beach Transit, and more. Photos and video from our facilities and field operations.',
}

const photos = [
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/SFMTA-scaled.jpg',
    alt: 'SFMTA fleet — 219 coach midlife overhaul contract, San Francisco',
    caption: 'SFMTA — 219 Coach Contract',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/Indy-Electric-Bus-scaled.jpg',
    alt: 'IndyGo ZEPS electric bus conversion, Indianapolis',
    caption: 'IndyGo ZEPS Electric Conversion',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/Bus-Rebuild-scaled.jpg',
    alt: 'Bus rebuild in progress at CCW facility',
    caption: 'Full Bus Rebuild Program',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/LBT-Repower-scaled.jpg',
    alt: 'Long Beach Transit CNG repower program',
    caption: 'Long Beach Transit — CNG Repower',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2021/03/CCW-facility-1.jpg',
    alt: 'Complete Coach Works headquarters facility in Riverside, CA',
    caption: 'CCW Riverside HQ Facility',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2021/03/CCW-shop-floor.jpg',
    alt: 'CCW shop floor — buses in various stages of rehabilitation',
    caption: 'Shop Floor Operations',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2021/03/bus-paint-booth.jpg',
    alt: 'Bus in CCW paint booth — full exterior restoration',
    caption: 'Paint & Body Restoration',
  },
  {
    src: 'https://completecoach.com/wp-content/uploads/2021/03/electric-bus-charging.jpg',
    alt: 'Electric bus charging — ZEPS zero-emission propulsion system',
    caption: 'ZEPS Electric Charging',
  },
]

const videos = [
  {
    src: 'https://transitsales.com/wp-content/uploads/2018/12/Murrieta-Bus-Yard-Drone-Video1.mp4',
    title: 'Murrieta Bus Yard — Aerial Drone Tour',
    description: 'Drone footage of our Murrieta bus yard — one of 13 CCW field service locations across the country.',
  },
]

export default function GalleryPage() {
  return (
    <div className="py-16 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003087] mb-4">Photo & Video Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">A look inside CCW&apos;s operations — from our Riverside headquarters to field service sites across the country.</p>
        </div>

        {/* Video section */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-[#003087] mb-6">Video</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.src} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative aspect-video bg-black">
                  <video
                    controls
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label={video.title}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#003087] text-sm">{video.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        <div>
          <h2 className="text-xl font-bold text-[#003087] mb-6">Photos</h2>
          <GalleryGrid photos={photos} />
        </div>
      </div>
    </div>
  )
}
