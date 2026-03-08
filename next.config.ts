import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'completecoach.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'transitsales.com' },
      { protocol: 'https', hostname: 'sblbus.com' },
    ],
  },
}

export default nextConfig
