'use client'

import Image from 'next/image'

interface VideoHeroProps {
  videoSrc: string
  fallbackImage: string
  overlay: string
  headline: string
  subheadline: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  brand: 'CCW' | 'TSI' | 'SBL'
}

const brandLogos = {
  CCW: {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png',
    width: 280,
    height: 94,
    alt: 'Complete Coach Works',
  },
  TSI: {
    src: 'https://transitsales.com/wp-content/uploads/2021/01/TSI-Logo-White.png',
    width: 240,
    height: 80,
    alt: 'Transit Sales International',
  },
  SBL: null,
}

export default function VideoHero({ videoSrc, fallbackImage, overlay, headline, subheadline, ctaPrimary, ctaSecondary, brand }: VideoHeroProps) {
  const brandColors = {
    CCW: { primary: '#003087', accent: '#E8A020' },
    TSI: { primary: '#1a5fa8', accent: '#60a5fa' },
    SBL: { primary: '#2d7a3a', accent: '#86efac' },
  }
  const colors = brandColors[brand]
  const logo = brandLogos[brand]

  return (
    <section className="relative h-[82vh] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={fallbackImage}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} />
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Company logo */}
        <div className="flex justify-center mb-8">
          {logo ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="object-contain drop-shadow-2xl brightness-0 invert"
              priority
            />
          ) : (
            <span className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-2xl">
              Shuttle Bus Leasing
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">{headline}</h1>
        <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">{subheadline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={ctaPrimary.href}
            className="px-8 py-4 font-bold text-lg rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: colors.accent, color: colors.primary }}
          >
            {ctaPrimary.label}
          </a>
          {ctaSecondary && (
            <a
              href={ctaSecondary.href}
              className="px-8 py-4 font-bold text-lg rounded-lg border-2 border-white text-white hover:bg-white/10 transition-all"
            >
              {ctaSecondary.label}
            </a>
          )}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
