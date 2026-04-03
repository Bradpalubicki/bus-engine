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
  brand: 'CCW' | 'TSI' | 'SBL' | 'ZEPS'
  stats?: { value: string; label: string }[]
}

const brandLogos = {
  CCW: {
    src: 'https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png',
    width: 520,
    height: 175,
    alt: 'Complete Coach Works',
  },
  TSI: {
    src: 'https://transitsales.com/wp-content/uploads/2021/01/TSI-Logo-White.png',
    width: 400,
    height: 134,
    alt: 'Transit Sales International',
  },
  SBL: null,
  ZEPS: null,
}

export default function VideoHero({ videoSrc, fallbackImage, overlay, headline, subheadline, ctaPrimary, ctaSecondary, brand, stats }: VideoHeroProps) {
  const brandColors = {
    CCW: { primary: '#003087', accent: '#E8A020' },
    TSI: { primary: '#1a5fa8', accent: '#60a5fa' },
    SBL: { primary: '#2d7a3a', accent: '#86efac' },
    ZEPS: { primary: '#16a34a', accent: '#4ade80' },
  }
  const colors = brandColors[brand]
  const logo = brandLogos[brand]

  return (
    <section className="relative flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
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

      {/* Main hero content — centered in the upper portion */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center text-white max-w-5xl mx-auto">
          {/* Company logo — large, fills header */}
          <div className="flex justify-center mb-6">
            {logo ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain drop-shadow-2xl brightness-0 invert w-auto"
                style={{ maxHeight: '140px', maxWidth: '90vw' }}
                priority
              />
            ) : (
              <span className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-2xl">
                Shuttle Bus Leasing
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{headline}</h1>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">{subheadline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={ctaPrimary.href}
              className="px-8 py-3 font-bold text-base rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: colors.accent, color: colors.primary }}
            >
              {ctaPrimary.label}
            </a>
            {ctaSecondary && (
              <a
                href={ctaSecondary.href}
                className="px-8 py-3 font-bold text-base rounded-lg border-2 border-white text-white hover:bg-white/10 transition-all"
              >
                {ctaSecondary.label}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats strip — anchored to bottom of hero, always visible on load */}
      {stats && stats.length > 0 && (
        <div className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-0 md:grid md:divide-x divide-white/20" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
              {stats.map((s) => (
                <div key={s.label} className="text-center px-4">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: colors.accent }}>{s.value}</div>
                  <div className="text-xs text-white/75 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
