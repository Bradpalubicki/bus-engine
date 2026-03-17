'use client'
import Image from 'next/image'
import { useState } from 'react'
import type { BusImage } from '@/data/imageManifest'

interface ServiceGalleryProps {
  images: BusImage[]
  title?: string
  defaultShow?: number
}

export function ServiceGallery({ images, title, defaultShow = 8 }: ServiceGalleryProps) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? images : images.slice(0, defaultShow)
  const hasMore = images.length > defaultShow

  return (
    <section className="mt-12 mb-8">
      {title && (
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {visible.map((img) => (
          <div
            key={img.src}
            className="relative group aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {img.label}
            </div>
          </div>
        ))}
      </div>
      {hasMore && !showAll && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="text-sm text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2"
          >
            View all {images.length} photos
          </button>
        </div>
      )}
    </section>
  )
}
