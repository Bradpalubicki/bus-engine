'use client'

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

export default function VideoHero({ videoSrc, fallbackImage, overlay, headline, subheadline, ctaPrimary, ctaSecondary, brand }: VideoHeroProps) {
  const brandColors = {
    CCW: { primary: '#003087', accent: '#E8A020' },
    TSI: { primary: '#1a5fa8', accent: '#60a5fa' },
    SBL: { primary: '#2d7a3a', accent: '#86efac' },
  }
  const colors = brandColors[brand]

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
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
        <div className="text-sm font-bold uppercase tracking-widest mb-6 opacity-80">
          {brand === 'CCW' ? 'Complete Coach Works' : brand === 'TSI' ? 'Transit Sales International' : 'Shuttle Bus Leasing'}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{headline}</h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">{subheadline}</p>
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
