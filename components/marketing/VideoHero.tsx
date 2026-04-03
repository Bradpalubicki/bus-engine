'use client'

interface VideoHeroProps {
  videoSrc: string
  fallbackImage: string
  overlay: string
  headline: string
  accentWord?: string
  eyebrow?: string
  subheadline: string
  proofPoints?: string[]
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  brand: 'CCW' | 'TSI' | 'SBL' | 'ZEPS'
  stats?: { value: string; label: string }[]
}

export default function VideoHero({
  videoSrc, fallbackImage, overlay, headline, accentWord, eyebrow,
  subheadline, proofPoints, ctaPrimary, ctaSecondary, brand, stats,
}: VideoHeroProps) {
  const brandColors = {
    CCW:  { primary: '#0A1628', accent: '#F5A623' },
    TSI:  { primary: '#0A1628', accent: '#14b8a6' },
    SBL:  { primary: '#0A1628', accent: '#2563eb' },
    ZEPS: { primary: '#0A1628', accent: '#16a34a' },
  }
  const colors = brandColors[brand]

  const renderHeadline = () => {
    if (!accentWord || !headline.includes(accentWord)) {
      return headline
    }
    const idx = headline.lastIndexOf(accentWord)
    return (
      <>
        {headline.slice(0, idx)}
        <span style={{ color: colors.accent }}>{accentWord}</span>
        {headline.slice(idx + accentWord.length)}
      </>
    )
  }

  return (
    <section className="hero-section relative flex flex-col overflow-hidden">
      <style>{`
        .hero-section { height: 85svh; }
        @media (min-width: 768px) { .hero-section { height: calc(100svh - 64px); } }
        @keyframes fadeUp {
          from { opacity: 0.01; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade { animation: fadeUp 0.6s ease forwards; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        .bounce-slow { animation: bounce-slow 1.6s ease-in-out infinite; }
      `}</style>

      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster={fallbackImage}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} />

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center text-white max-w-5xl mx-auto">

          {/* Eyebrow pill */}
          {eyebrow && (
            <div
              className="hero-fade inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
              style={{ borderColor: colors.accent, color: colors.accent, animationDelay: '0s' }}
            >
              {eyebrow}
            </div>
          )}

          {/* H1 */}
          <h1
            className="hero-fade text-3xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ animationDelay: '0.1s' }}
          >
            {renderHeadline()}
          </h1>

          {/* Proof-point pills or plain subheadline */}
          {proofPoints && proofPoints.length > 0 ? (
            <div
              className="hero-fade flex flex-wrap justify-center gap-2 mb-8"
              style={{ animationDelay: '0.2s' }}
            >
              {proofPoints.map((point) => (
                <span
                  key={point}
                  className="px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff' }}
                >
                  {point}
                </span>
              ))}
            </div>
          ) : (
            <p
              className="hero-fade text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto"
              style={{ animationDelay: '0.2s' }}
            >
              {subheadline}
            </p>
          )}

          {/* CTAs */}
          <div
            className="hero-fade flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animationDelay: '0.3s' }}
          >
            <a
              href={ctaPrimary.href}
              className="px-8 py-3 font-bold text-base rounded-lg transition-all hover:scale-105 hover:brightness-110"
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

      {/* Bouncing scroll chevron */}
      <div className="absolute bottom-20 right-8 z-10 bounce-slow opacity-70">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Stats strip */}
      {stats && stats.length > 0 && (
        <div className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div
              className="flex flex-wrap justify-center gap-6 md:gap-0 md:grid md:divide-x divide-white/20"
              style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
            >
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
