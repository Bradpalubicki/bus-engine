'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

interface Photo {
  src: string
  alt: string
  caption: string
}

interface GalleryGridProps {
  photos: Photo[]
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [lightboxSrc, setLightboxSrc] = useState<Photo | null>(null)

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightboxSrc(photo)}
            className="group w-full break-inside-avoid block rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-lg transition-all cursor-zoom-in"
          >
            <div className="relative w-full" style={{ paddingBottom: i % 3 === 0 ? '66%' : i % 3 === 1 ? '75%' : '56%' }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#003087] opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
            <div className="px-3 py-2.5 text-left">
              <p className="text-xs font-medium text-[#003087]">{photo.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ paddingBottom: '60%' }}>
              <Image
                src={lightboxSrc.src}
                alt={lightboxSrc.alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <p className="text-white text-center text-sm mt-3 font-medium">{lightboxSrc.caption}</p>
          </div>
        </div>
      )}
    </>
  )
}
