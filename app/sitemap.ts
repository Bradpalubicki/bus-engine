import { MetadataRoute } from 'next'

const base = 'https://completecoach.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    // CCW primary
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // CCW services
    { url: `${base}/zeps`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/services/zeps-electric`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/services/midlife-overhaul`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/cng-repower`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/body-paint`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/services/interior-rehab`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/services/cng-retanking`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // CCW compliance + programs
    { url: `${base}/ccw/compliance`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/dbe`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // TSI + SBL brands
    { url: `${base}/tsi`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/sbl`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
