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
    title: 'Complete Coach Works',
    description: 'The Nation\'s Largest Transit Bus Remanufacturing Company',
    url: 'https://completecoach.com',
    siteName: 'Complete Coach Works',
    type: 'website',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Complete Coach Works',
  url: 'https://completecoach.com',
  logo: 'https://completecoach.com/wp-content/uploads/2024/02/CCW-Logo.png',
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
