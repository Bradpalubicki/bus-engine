import Image from 'next/image'
import { clientProofImages } from '@/data/imageManifest'

export function AgencyProofStrip() {
  return (
    <section className="py-10 border-t border-gray-200">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
        Trusted by America&apos;s Transit Agencies
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {clientProofImages.map((img) => (
          <div
            key={img.src}
            className="relative group w-28 h-20 overflow-hidden rounded-md bg-gray-100 flex-shrink-0"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="112px"
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
              <span className="text-white text-xs font-medium p-1.5 opacity-0 group-hover:opacity-100 transition-opacity leading-tight">
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
