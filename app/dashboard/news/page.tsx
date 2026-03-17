'use client'

import { useState } from 'react'
import { Plus, X, FileText, Eye, EyeOff, Edit2, Trash2, ExternalLink } from 'lucide-react'
import Image from 'next/image'

type NewsPost = {
  id: number
  title: string
  date: string
  category: string
  excerpt: string
  imgUrl: string
  published: boolean
  brand: 'CCW' | 'TSI' | 'SBL' | 'All'
}

const DEMO_POSTS: NewsPost[] = [
  {
    id: 1,
    title: 'Lifecycle Cost Matters: Value Through Smarter Fleet Investment',
    date: 'March 2026',
    category: 'Industry Insights',
    excerpt: 'CCW explores the full cost of bus ownership and why refurbishment at the midlife mark saves agencies 40–60% vs buying new.',
    imgUrl: 'https://completecoach.com/wp-content/uploads/2026/03/Lifecycle-website-980x405-1-400x250.jpg',
    published: true,
    brand: 'CCW',
  },
  {
    id: 2,
    title: 'CCW Wins APTA Ad Wheel Award for 50-50 Bus Campaign',
    date: 'February 2026',
    category: 'Awards',
    excerpt: 'The American Public Transportation Association recognized CCW\'s "50-50" campaign highlighting cost savings over new bus purchases.',
    imgUrl: 'https://completecoach.com/wp-content/uploads/2026/02/apta-400x250.jpg',
    published: true,
    brand: 'CCW',
  },
  {
    id: 3,
    title: 'CCW Awarded Mountain Line Bus Refurbishment Contract',
    date: 'January 2026',
    category: 'Contract Award',
    excerpt: 'Complete Coach Works has been awarded a multi-bus refurbishment contract with Mountain Line transit authority.',
    imgUrl: 'https://completecoach.com/wp-content/uploads/2026/01/Mountain-Line-Logo_FINAL-400x250.webp',
    published: true,
    brand: 'CCW',
  },
  {
    id: 4,
    title: 'TSI Completes First Delivery Under 10-Bus Contract with RATP Dev',
    date: 'March 2026',
    category: 'TSI News',
    excerpt: 'Transit Sales International delivers the first of ten pre-owned transit buses to RATP Dev under a new fleet expansion agreement.',
    imgUrl: 'https://completecoach.com/wp-content/uploads/2026/03/Go-Durham-Adjusted-400x250.jpg',
    published: true,
    brand: 'TSI',
  },
  {
    id: 5,
    title: 'Flexibility That Fits: Why Bus Leasing Is a Game-Changer for Transit Agencies',
    date: 'November 2025',
    category: 'SBL News',
    excerpt: 'SBL breaks down the four key scenarios where short-term and contract leasing beats buying — and why more agencies are choosing flexible fleet solutions.',
    imgUrl: 'https://completecoach.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-154806-400x250.jpg',
    published: true,
    brand: 'SBL',
  },
]

const categories = ['Industry Insights', 'Contract Award', 'Awards', 'CCW News', 'TSI News', 'SBL News', 'ZEPS Update', 'Press Release']

type FormData = Omit<NewsPost, 'id'>

function PostModal({ post, onClose }: { post?: NewsPost; onClose: () => void }) {
  const [form, setForm] = useState<FormData>(post ?? {
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    category: 'CCW News',
    excerpt: '',
    imgUrl: '',
    published: false,
    brand: 'CCW',
  })
  const [saved, setSaved] = useState(false)

  function set(field: keyof FormData, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{post ? 'Edit Post' : 'New News Post'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-green-600" />
            </div>
            <p className="text-lg font-bold text-green-700">Post Saved</p>
            <p className="text-sm text-gray-500 mt-1">It will appear on the news page when published.</p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Brand */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Brand / Site</label>
              <div className="flex gap-2">
                {(['CCW', 'TSI', 'SBL', 'All'] as const).map(b => (
                  <button key={b} onClick={() => set('brand', b)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold border-2 transition-colors ${form.brand === b ? 'border-[#003087] bg-[#003087] text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Headline / Title</label>
              <input type="text" placeholder="CCW Awarded New Contract with City of Los Angeles…"
                value={form.title} onChange={e => set('title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
            </div>

            {/* Category + Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date</label>
                <input type="text" placeholder="March 2026"
                  value={form.date} onChange={e => set('date', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Image URL</label>
              <input type="url" placeholder="https://completecoach.com/wp-content/uploads/…"
                value={form.imgUrl} onChange={e => set('imgUrl', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              {form.imgUrl && (
                <div className="mt-2 relative h-32 rounded-lg overflow-hidden">
                  <Image src={form.imgUrl} alt="preview" fill className="object-cover" />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Excerpt / Summary</label>
              <textarea rows={3} placeholder="2–3 sentence summary shown on the news listing page…"
                value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
            </div>

            {/* Publish toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => set('published', !form.published)}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.published ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm font-medium text-gray-700">{form.published ? 'Published — visible on site' : 'Draft — hidden from site'}</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setSaved(true)}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                {form.published ? 'Publish Post' : 'Save Draft'}
              </button>
              <button onClick={onClose}
                className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function NewsManagerPage() {
  const [posts, setPosts] = useState<NewsPost[]>(DEMO_POSTS)
  const [showModal, setShowModal] = useState(false)
  const [editPost, setEditPost] = useState<NewsPost | undefined>()
  const [filterBrand, setFilterBrand] = useState<'All' | 'CCW' | 'TSI' | 'SBL'>('All')

  const filtered = filterBrand === 'All' ? posts : posts.filter(p => p.brand === filterBrand || p.brand === 'All')

  function togglePublish(id: number) {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, published: !p.published } : p))
  }

  function deletePost(id: number) {
    setPosts(ps => ps.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">News & Blog Manager</h1>
          <p className="text-gray-500 text-sm">{posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} drafts</p>
        </div>
        <div className="flex gap-3">
          <a href="/news" target="_blank" className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <ExternalLink className="w-4 h-4" />
            View Live
          </a>
          <button
            onClick={() => { setEditPost(undefined); setShowModal(true) }}
            className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Brand filter */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(['All', 'CCW', 'TSI', 'SBL'] as const).map(b => (
          <button key={b} onClick={() => setFilterBrand(b)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filterBrand === b ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {b}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(post => (
          <div key={post.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${!post.published ? 'opacity-70 border-dashed' : 'border-gray-100'}`}>
            {post.imgUrl && (
              <div className="relative h-36 overflow-hidden">
                <Image src={post.imgUrl} alt={post.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${post.published ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {post.published ? 'Live' : 'Draft'}
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${post.brand === 'TSI' ? 'bg-[#1a5fa8]' : post.brand === 'SBL' ? 'bg-[#2d7a3a]' : post.brand === 'All' ? 'bg-purple-600' : 'bg-[#003087]'}`}>
                    {post.brand}
                  </span>
                </div>
              </div>
            )}
            <div className="p-4">
              <div className="text-xs text-gray-400 mb-1">{post.date} · {post.category}</div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => togglePublish(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${post.published ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                  {post.published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => { setEditPost(post); setShowModal(true) }}
                  className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button onClick={() => deletePost(post.id)}
                  className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors ml-auto">
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No posts yet</p>
          <p className="text-sm">Click &quot;New Post&quot; to create your first news article</p>
        </div>
      )}

      {showModal && (
        <PostModal post={editPost} onClose={() => { setShowModal(false); setEditPost(undefined) }} />
      )}
    </div>
  )
}
