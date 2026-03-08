import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://completecoach.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://completecoach.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://completecoach.com/locations', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://completecoach.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://completecoach.com/services/zeps-electric', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://completecoach.com/services/midlife-overhaul', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: 'https://completecoach.com/services/cng-repower', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: 'https://completecoach.com/services/body-paint', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://completecoach.com/services/interior-rehab', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
