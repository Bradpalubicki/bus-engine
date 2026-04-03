'use client'

import { useState } from 'react'
import { GalleryGrid } from '@/components/marketing/GalleryGrid'

interface Photo {
  src: string
  alt: string
  caption: string
  category: string
}

interface Video {
  src: string
  title: string
  description: string
}

const FILTERS = ['All', 'Midlife Overhaul', 'ZEPS Conversions', 'Fleet', 'Facilities'] as const
type Filter = typeof FILTERS[number]

export function GalleryClient({ photos, videos }: { photos: Photo[]; videos: Video[] }) {
  const [active, setActive] = useState<Filter>('All')

  const filtered = active === 'All' ? photos : photos.filter(p => p.category === active)

  return (
    <div className="py-16 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">Our Work</div>
          <h1 className="text-4xl font-bold text-[#003087] mb-4">Photo & Video Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">A look inside CCW&apos;s operations — from our Riverside headquarters to field service sites across the country.</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === f
                  ? 'bg-[#003087] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#003087] hover:text-[#003087]'
              }`}
            >
              {f}
              {f !== 'All' && (
                <span className={`ml-1.5 text-xs ${active === f ? 'text-blue-200' : 'text-gray-400'}`}>
                  ({photos.filter(p => p.category === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Video section — only show when filter is All */}
        {active === 'All' && (
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
        )}

        {/* Photo grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#003087]">
              {active === 'All' ? 'Photos' : active}
            </h2>
            <span className="text-sm text-gray-400">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</span>
          </div>
          <GalleryGrid photos={filtered} />
        </div>
      </div>
    </div>
  )
}
