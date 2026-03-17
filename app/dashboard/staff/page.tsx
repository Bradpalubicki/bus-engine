'use client'

import { useState } from 'react'
import { Users, Plus, X, Edit2, Trash2, Phone, Mail } from 'lucide-react'
import Image from 'next/image'

type StaffMember = {
  id: number
  name: string
  title: string
  department: string
  brand: 'CCW' | 'TSI' | 'SBL'
  email: string
  phone: string
  photoUrl: string
  showOnSite: boolean
  bio: string
}

const DEMO_STAFF: StaffMember[] = [
  {
    id: 1,
    name: 'James Carson',
    title: 'Sales Director',
    department: 'Sales',
    brand: 'TSI',
    email: 'james.carson@transitsales.com',
    phone: '(951) 555-0101',
    photoUrl: 'https://completecoach.com/wp-content/uploads/2024/08/James-Carson-Headshot.jpg',
    showOnSite: true,
    bio: 'James leads TSI\'s national bus sales operation with 20+ years in transit fleet procurement.',
  },
  {
    id: 2,
    name: 'Jay Raber',
    title: 'Fleet Sales Manager',
    department: 'Sales',
    brand: 'TSI',
    email: 'jay.raber@transitsales.com',
    phone: '(951) 555-0102',
    photoUrl: 'https://completecoach.com/wp-content/uploads/2024/08/Jay-Raber-Headshot.jpg',
    showOnSite: true,
    bio: 'Jay specializes in fleet procurement programs and FTA compliant bus sales for transit agencies.',
  },
  {
    id: 3,
    name: 'Dale Carson',
    title: 'CEO / President',
    department: 'Executive',
    brand: 'CCW',
    email: 'dale@completecoach.com',
    phone: '(800) 300-3751',
    photoUrl: 'https://completecoach.com/wp-content/uploads/2024/08/CCW-9-2017-10.jpg',
    showOnSite: true,
    bio: 'Dale Carson founded Complete Coach Works in 1987 and has grown it into America\'s largest transit bus remanufacturer.',
  },
]

const departments = ['Executive', 'Sales', 'Operations', 'Engineering', 'Finance', 'HR', 'Marketing']

type FormData = Omit<StaffMember, 'id'>

function StaffModal({ member, onClose }: { member?: StaffMember; onClose: () => void }) {
  const [form, setForm] = useState<FormData>(member ?? {
    name: '', title: '', department: 'Sales', brand: 'CCW',
    email: '', phone: '', photoUrl: '', showOnSite: true, bio: '',
  })
  const [saved, setSaved] = useState(false)

  function set(field: keyof FormData, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{member ? 'Edit Staff Member' : 'Add Staff Member'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-green-600" />
            </div>
            <p className="text-lg font-bold text-green-700">Staff Member Saved</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Brand / Site</label>
              <div className="flex gap-2">
                {(['CCW', 'TSI', 'SBL'] as const).map(b => (
                  <button key={b} onClick={() => set('brand', b)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold border-2 transition-colors ${form.brand === b ? 'border-[#003087] bg-[#003087] text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
                <input type="text" placeholder="James Carson" value={form.name} onChange={e => set('name', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title</label>
                <input type="text" placeholder="Sales Director" value={form.title} onChange={e => set('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Department</label>
                <select value={form.department} onChange={e => set('department', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                <input type="email" placeholder="name@completecoach.com" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone</label>
                <input type="tel" placeholder="(800) 300-3751" value={form.phone} onChange={e => set('phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Photo URL</label>
                <input type="url" placeholder="https://…" value={form.photoUrl} onChange={e => set('photoUrl', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Bio (shown on team page)</label>
              <textarea rows={3} placeholder="Short bio shown on the website team section…" value={form.bio} onChange={e => set('bio', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => set('showOnSite', !form.showOnSite)}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.showOnSite ? 'bg-green-500' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.showOnSite ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm font-medium text-gray-700">{form.showOnSite ? 'Visible on website' : 'Hidden from website'}</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setSaved(true)}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Staff Member
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

export default function StaffManagerPage() {
  const [staff, setStaff] = useState<StaffMember[]>(DEMO_STAFF)
  const [showModal, setShowModal] = useState(false)
  const [editMember, setEditMember] = useState<StaffMember | undefined>()
  const [filterBrand, setFilterBrand] = useState<'All' | 'CCW' | 'TSI' | 'SBL'>('All')

  const filtered = filterBrand === 'All' ? staff : staff.filter(s => s.brand === filterBrand)

  function toggleVisible(id: number) {
    setStaff(ss => ss.map(s => s.id === id ? { ...s, showOnSite: !s.showOnSite } : s))
  }

  function deleteMember(id: number) {
    setStaff(ss => ss.filter(s => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Staff Manager</h1>
          <p className="text-gray-500 text-sm">{staff.filter(s => s.showOnSite).length} showing on site · {staff.length} total</p>
        </div>
        <button
          onClick={() => { setEditMember(undefined); setShowModal(true) }}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Staff
        </button>
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

      {/* Staff grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(member => (
          <div key={member.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${!member.showOnSite ? 'opacity-60 border-dashed' : 'border-gray-100'}`}>
            <div className="flex items-start gap-4 p-4">
              {member.photoUrl ? (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#003087]/10 flex items-center justify-center flex-shrink-0 text-[#003087] font-bold text-xl">
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded text-white ${member.brand === 'TSI' ? 'bg-[#1a5fa8]' : member.brand === 'SBL' ? 'bg-[#2d7a3a]' : 'bg-[#003087]'}`}>
                    {member.brand}
                  </span>
                  {!member.showOnSite && <span className="text-xs text-gray-400">Hidden</span>}
                </div>
                <div className="font-bold text-gray-900">{member.name}</div>
                <div className="text-sm text-gray-500">{member.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{member.department}</div>
              </div>
            </div>
            <div className="px-4 pb-2 space-y-1">
              {member.email && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span className="truncate">{member.email}</span>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone className="w-3 h-3 text-gray-400" />
                  {member.phone}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-50">
              <button onClick={() => toggleVisible(member.id)}
                className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-colors ${member.showOnSite ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                {member.showOnSite ? 'Hide from Site' : 'Show on Site'}
              </button>
              <button onClick={() => { setEditMember(member); setShowModal(true) }}
                className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteMember(member.id)}
                className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No staff members</p>
          <p className="text-sm">Add your first team member using the button above</p>
        </div>
      )}

      {showModal && (
        <StaffModal member={editMember} onClose={() => { setShowModal(false); setEditMember(undefined) }} />
      )}
    </div>
  )
}
