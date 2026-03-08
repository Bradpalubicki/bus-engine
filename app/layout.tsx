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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
