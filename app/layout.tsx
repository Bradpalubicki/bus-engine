import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Complete Coach Works | Transit Bus Remanufacturing',
  description: 'The Nation\'s Largest Transit Bus Remanufacturing Company. CCW refurbishes, repowers, and rehabilitates transit buses for public agencies nationwide.',
  keywords: 'transit bus remanufacturing, bus overhaul, ZEPS electric bus, CNG repower, bus rehabilitation',
  openGraph: {
    title: 'Complete Coach Works | Transit Bus Remanufacturing',
    description: 'The Nation\'s Largest Transit Bus Remanufacturing Company. 38 years. 350 employee-owners. ZEPS electric conversion, CNG repower, midlife overhaul.',
    url: 'https://completecoach.com',
    siteName: 'Complete Coach Works',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'Complete Coach Works — Transit Bus Remanufacturing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Coach Works | Transit Bus Remanufacturing',
    description: 'The Nation\'s Largest Transit Bus Remanufacturing Company. ZEPS electric, CNG repower, midlife overhaul.',
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=630&fit=crop'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Complete Coach Works',
  url: 'https://completecoach.com',
  logo: 'https://bus-engine.vercel.app/logo.png',
  foundingDate: '1987',
  description: 'The nation\'s largest transit bus remanufacturing company. ZEPS electric conversion, CNG repower, midlife refurbishment.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1863 Service Court',
    addressLocality: 'Riverside',
    addressRegion: 'CA',
    postalCode: '92507',
    addressCountry: 'US',
  },
  telephone: '+18003003751',
  sameAs: [
    'https://transitsales.com',
    'https://sblbus.com',
    'https://www.linkedin.com/company/complete-coach-works/',
    'https://www.facebook.com/completecoachworks/',
  ],
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 350 },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://completecoach.com" />
        <link rel="preconnect" href="https://transitsales.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=630&fit=crop" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
