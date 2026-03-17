import Image from 'next/image'
import { zepsSequenceImages } from '@/data/imageManifest'

const stepLabels = ['Before', 'Step 1', 'Step 2']
const stepColors = ['bg-gray-600', 'bg-blue-600', 'bg-green-600']

export function ZepsConversionSequence() {
  return (
    <section className="my-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        The ZEPS Conversion Process
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Every ZEPS conversion follows the same proven 3-phase process.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {zepsSequenceImages.map((img, i) => (
          <div key={img.src} className="relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className={`absolute top-3 left-3 ${stepColors[i]} text-white text-xs font-bold px-2 py-1 rounded`}>
                {stepLabels[i]}
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-800">{img.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{img.alt}</p>
            {i < 2 && (
              <div className="hidden md:block absolute top-1/3 -right-2 text-gray-400 text-xl z-10">→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
