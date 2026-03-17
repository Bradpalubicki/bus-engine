import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/agency/', '/api/'],
      },
    ],
    sitemap: 'https://completecoach.com/sitemap.xml',
  }
}
