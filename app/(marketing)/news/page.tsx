import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'News & Events | Complete Coach Works',
  description: 'Latest news, contract awards, industry insights, and events from Complete Coach Works, TSI, and SBL.',
  alternates: { canonical: 'https://completecoach.com/news' },
}

const featured = {
  img: 'https://completecoach.com/wp-content/uploads/2026/03/Lifecycle-website-980x405-1-400x250.jpg',
  title: 'Lifecycle Cost Matters: Value Through Smarter Fleet Investment',
  date: 'March 2026',
  category: 'Industry Insights',
  brand: 'CCW',
  excerpt: 'CCW explores the full cost of bus ownership and why refurbishment at the midlife mark saves agencies 40–60% vs buying new. A deep look at 12-year lifecycle economics for public transit fleets.',
  href: '/news',
}

const posts = [
  {
    img: 'https://completecoach.com/wp-content/uploads/2026/02/apta-400x250.jpg',
    title: 'CCW Wins APTA Ad Wheel Award for 50-50 Bus Campaign',
    date: 'February 2026',
    category: 'Awards',
    brand: 'CCW',
    excerpt: 'The American Public Transportation Association recognized CCW\'s "50-50" campaign highlighting cost savings over new bus purchases.',
    href: '/news',
  },
  {
    img: 'https://completecoach.com/wp-content/uploads/2026/01/Mountain-Line-Logo_FINAL-400x250.webp',
    title: 'CCW Awarded Mountain Line Bus Refurbishment Contract',
    date: 'January 2026',
    category: 'Contract Award',
    brand: 'CCW',
    excerpt: 'Complete Coach Works has been awarded a multi-bus refurbishment contract with Mountain Line transit authority.',
    href: '/news',
  },
  {
    img: 'https://completecoach.com/wp-content/uploads/2026/03/Go-Durham-Adjusted-400x250.jpg',
    title: 'TSI Completes First Delivery Under 10-Bus Contract with RATP Dev',
    date: 'March 2026',
    category: 'Contract Award',
    brand: 'TSI',
    excerpt: 'Transit Sales International delivers the first of ten pre-owned transit buses to RATP Dev under a new fleet expansion agreement.',
    href: '/news',
  },
  {
    img: 'https://completecoach.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-154806-400x250.jpg',
    title: 'Flexibility That Fits: Why Bus Leasing Is a Game-Changer for Transit Agencies',
    date: 'November 2025',
    category: 'Industry Insights',
    brand: 'SBL',
    excerpt: 'SBL breaks down the four key scenarios where short-term and contract leasing beats buying — and why more agencies are choosing flexible fleet solutions.',
    href: '/news',
  },
]

const brandColor: Record<string, string> = {
  CCW: 'bg-[#003087]',
  TSI: 'bg-[#1a5fa8]',
  SBL: 'bg-[#2d7a3a]',
}

const categoryColor: Record<string, string> = {
  'Contract Award': 'bg-amber-100 text-amber-800',
  'Awards': 'bg-purple-100 text-purple-800',
  'Industry Insights': 'bg-blue-100 text-blue-800',
  'ZEPS Update': 'bg-green-100 text-green-800',
  'Press Release': 'bg-gray-100 text-gray-700',
}

export default function NewsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#003087] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block bg-[#E8A020]/20 border border-[#E8A020]/40 rounded-full px-4 py-1.5 text-[#E8A020] text-xs font-bold uppercase tracking-widest mb-4">
            News & Events
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Latest from CCW</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Contract awards, industry recognition, product updates, and insights from Complete Coach Works, TSI, and SBL.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Featured post */}
        <div className="mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#E8A020] mb-4">Featured Story</div>
          <Link href={featured.href} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
            <div className="relative h-72 lg:h-auto min-h-[280px]">
              <Image src={featured.img} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 lg:p-10 bg-white flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${brandColor[featured.brand] ?? 'bg-gray-500'}`}>{featured.brand}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[featured.category] ?? 'bg-gray-100 text-gray-600'}`}>{featured.category}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#003087] mb-3 leading-snug group-hover:text-[#E8A020] transition-colors">{featured.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {featured.date}
                </div>
                <span className="text-sm font-bold text-[#003087] group-hover:text-[#E8A020] flex items-center gap-1 transition-colors">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* SFMTA Case Study callout */}
        <div className="mb-14 bg-gradient-to-r from-[#003087] to-[#004db3] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="relative h-56 lg:h-auto">
              <Image
                src="https://completecoach.com/wp-content/uploads/2024/06/IMG_2924.jpg"
                alt="SFMTA 219-coach midlife overhaul — Complete Coach Works"
                fill
                className="object-cover opacity-80"
              />
            </div>
            <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
              <div className="inline-block bg-[#E8A020]/20 border border-[#E8A020]/40 rounded-full px-3 py-1 text-[#E8A020] text-xs font-bold uppercase tracking-widest mb-4">
                Case Study
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">SFMTA — 219-Coach Midlife Overhaul Program</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                CCW's largest single contract: a 5-year program to completely overhaul San Francisco Muni's fleet of 219 hybrid-electric and trolley coaches. $101.6M awarded by the SFMTA Board of Directors, March 2022.
              </p>
              <Link
                href="/case-studies/sfmta-219-coach-midlife-overhaul"
                className="self-start bg-[#E8A020] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#f5b84a] transition-colors text-sm flex items-center gap-2"
              >
                Read the Full Case Study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* News grid */}
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Recent News</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link key={post.title} href={post.href} className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2">
                  <span className={`text-xs font-bold text-white px-2 py-1 rounded-full ${brandColor[post.brand] ?? 'bg-gray-500'}`}>{post.brand}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    <Tag className="w-3 h-3 inline mr-1" />{post.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-[#003087] transition-colors line-clamp-3">{post.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 flex-1 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <span className="text-xs font-bold text-[#003087] group-hover:text-[#E8A020] flex items-center gap-1 transition-colors">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
