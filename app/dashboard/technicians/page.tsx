'use client'

import { useState } from 'react'
import {
  Users, Plus, X, Edit2, Trash2, Phone, Mail, MapPin,
  Award, AlertTriangle, CheckCircle2, Clock, Wrench,
} from 'lucide-react'

type Certification = {
  id: string
  name: string
  issuingBody: string
  issuedDate: string
  expiryDate: string
}

type Technician = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  specialty: string
  hireDate: string
  hourlyRate: number
  status: 'active' | 'inactive'
  certifications: Certification[]
  activeWOs: string[]
}

const LOCATIONS = [
  'Riverside, CA', 'Alameda, CA', 'Seattle, WA', 'Memphis, TN',
  'El Paso, TX', 'Phoenix, AZ', 'Waukesha, WI', 'Laredo, TX',
]

const SPECIALTIES = [
  'General Mechanical', 'Electrical / Electronics', 'HVAC',
  'Body & Paint', 'ADA Systems', 'CNG / Alternative Fuel',
  'Hybrid / Electric', 'Hydraulics', 'Transmission',
]

const DEMO_TECHS: Technician[] = [
  {
    id: 'tech-1', name: 'Marcus Webb', email: 'mwebb@completecoach.com',
    phone: '(951) 555-0201', location: 'Riverside, CA',
    specialty: 'General Mechanical', hireDate: '2018-03-15',
    hourlyRate: 42, status: 'active',
    certifications: [
      { id: 'c1', name: 'ASE Master Technician', issuingBody: 'ASE', issuedDate: '2022-01-10', expiryDate: '2026-01-10' },
      { id: 'c2', name: 'CDL Class B', issuingBody: 'CA DMV', issuedDate: '2018-05-01', expiryDate: '2025-05-01' },
    ],
    activeWOs: ['WO-2024-001', 'WO-2024-003'],
  },
  {
    id: 'tech-2', name: 'Tanya Rodriguez', email: 'trodriguez@completecoach.com',
    phone: '(951) 555-0202', location: 'Riverside, CA',
    specialty: 'Electrical / Electronics', hireDate: '2020-07-22',
    hourlyRate: 45, status: 'active',
    certifications: [
      { id: 'c3', name: 'ASE L3 Light Hybrid/EV', issuingBody: 'ASE', issuedDate: '2023-06-01', expiryDate: '2027-06-01' },
      { id: 'c4', name: 'OSHA 10-Hour', issuingBody: 'OSHA', issuedDate: '2023-01-15', expiryDate: '2025-05-15' },
    ],
    activeWOs: ['WO-2024-002'],
  },
  {
    id: 'tech-3', name: 'Derrick Johnson', email: 'djohnson@completecoach.com',
    phone: '(510) 555-0301', location: 'Alameda, CA',
    specialty: 'HVAC', hireDate: '2015-11-04',
    hourlyRate: 48, status: 'active',
    certifications: [
      { id: 'c5', name: 'EPA 609 MVAC', issuingBody: 'EPA', issuedDate: '2015-12-01', expiryDate: '' },
      { id: 'c6', name: 'ASE A7 HVAC', issuingBody: 'ASE', issuedDate: '2021-09-01', expiryDate: '2025-09-01' },
    ],
    activeWOs: [],
  },
  {
    id: 'tech-4', name: 'Linda Park', email: 'lpark@completecoach.com',
    phone: '(206) 555-0401', location: 'Seattle, WA',
    specialty: 'ADA Systems', hireDate: '2019-04-10',
    hourlyRate: 44, status: 'active',
    certifications: [
      { id: 'c7', name: 'NMEDA Technician', issuingBody: 'NMEDA', issuedDate: '2021-03-01', expiryDate: '2023-03-01' },
    ],
    activeWOs: ['WO-2024-005'],
  },
]

function certExpiryStatus(expiryDate: string): 'ok' | 'warning' | 'expired' | 'none' {
  if (!expiryDate) return 'none'
  const diff = (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  if (diff < 0) return 'expired'
  if (diff < 90) return 'warning'
  return 'ok'
}

function CertBadge({ cert }: { cert: Certification }) {
  const status = certExpiryStatus(cert.expiryDate)
  const color = status === 'expired' ? 'bg-red-100 text-red-700 border-red-200'
    : status === 'warning' ? 'bg-amber-100 text-amber-700 border-amber-200'
    : status === 'none' ? 'bg-gray-100 text-gray-600 border-gray-200'
    : 'bg-green-100 text-green-700 border-green-200'
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs ${color}`}>
      <Award className="w-3 h-3" />
      <span className="font-medium">{cert.name}</span>
      {cert.expiryDate && <span className="opacity-70">· exp {cert.expiryDate}</span>}
      {status === 'expired' && <AlertTriangle className="w-3 h-3" />}
    </div>
  )
}

type CertFormData = Omit<Certification, 'id'>

function CertModal({ onClose, onSave }: { onClose: () => void; onSave: (c: CertFormData) => void }) {
  const [form, setForm] = useState<CertFormData>({ name: '', issuingBody: '', issuedDate: '', expiryDate: '' })
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-[#003087]">Add Certification</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Certification Name</label>
            <input type="text" placeholder="ASE Master Technician" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Issuing Body</label>
            <input type="text" placeholder="ASE, OSHA, EPA…" value={form.issuingBody} onChange={e => setForm(f => ({ ...f, issuingBody: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Issued Date</label>
              <input type="date" value={form.issuedDate} onChange={e => setForm(f => ({ ...f, issuedDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Expiry Date</label>
              <input type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => { if (form.name) onSave(form) }}
              className="flex-1 bg-[#003087] text-white font-bold py-2.5 rounded-lg hover:bg-[#002070] transition-colors text-sm">
              Add Certification
            </button>
            <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type TechFormData = Omit<Technician, 'id' | 'certifications' | 'activeWOs'>

function TechModal({ tech, onClose, onSave }: { tech?: Technician; onClose: () => void; onSave: (data: TechFormData, certs: Certification[]) => void }) {
  const [form, setForm] = useState<TechFormData>(tech ? {
    name: tech.name, email: tech.email, phone: tech.phone,
    location: tech.location, specialty: tech.specialty,
    hireDate: tech.hireDate, hourlyRate: tech.hourlyRate, status: tech.status,
  } : { name: '', email: '', phone: '', location: LOCATIONS[0], specialty: SPECIALTIES[0], hireDate: '', hourlyRate: 40, status: 'active' })
  const [certs, setCerts] = useState<Certification[]>(tech?.certifications ?? [])
  const [showCertModal, setShowCertModal] = useState(false)
  const [saved, setSaved] = useState(false)

  function set(field: keyof TechFormData, value: string | number) {
    setForm(f => ({ ...f, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{tech ? 'Edit Technician' : 'Add Technician'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        {saved ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <p className="text-lg font-bold text-green-700">Technician Saved</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
                <input type="text" placeholder="Marcus Webb" value={form.name} onChange={e => set('name', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
                <select value={form.location} onChange={e => set('location', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                <input type="email" placeholder="tech@completecoach.com" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone</label>
                <input type="tel" placeholder="(951) 555-0000" value={form.phone} onChange={e => set('phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Specialty</label>
                <select value={form.specialty} onChange={e => set('specialty', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Hire Date</label>
                <input type="date" value={form.hireDate} onChange={e => set('hireDate', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Hourly Rate ($)</label>
                <input type="number" placeholder="42" value={form.hourlyRate} onChange={e => set('hourlyRate', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div className="flex items-end">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Status</label>
                  <div className="flex gap-2">
                    {(['active', 'inactive'] as const).map(s => (
                      <button key={s} onClick={() => set('status', s)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 capitalize transition-colors ${form.status === s ? 'border-[#003087] bg-[#003087] text-white' : 'border-gray-200 text-gray-500'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Certifications</label>
                <button onClick={() => setShowCertModal(true)}
                  className="text-xs text-[#003087] font-semibold hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              {certs.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No certifications added yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {certs.map((c, i) => (
                    <div key={c.id} className="flex items-center gap-1">
                      <CertBadge cert={c} />
                      <button onClick={() => setCerts(cs => cs.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 ml-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (form.name) { onSave(form, certs); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Technician
              </button>
              <button onClick={onClose} className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {showCertModal && (
        <CertModal onClose={() => setShowCertModal(false)} onSave={data => {
          setCerts(cs => [...cs, { ...data, id: `c-${Date.now()}` }])
          setShowCertModal(false)
        }} />
      )}
    </div>
  )
}

export default function TechniciansPage() {
  const [techs, setTechs] = useState<Technician[]>(DEMO_TECHS)
  const [showModal, setShowModal] = useState(false)
  const [editTech, setEditTech] = useState<Technician | undefined>()
  const [filterLoc, setFilterLoc] = useState('All')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2200) }

  function saveTech(data: TechFormData, certs: Certification[]) {
    if (editTech) {
      setTechs(ts => ts.map(t => t.id === editTech.id ? { ...t, ...data, certifications: certs } : t))
      showToast('Technician updated')
    } else {
      setTechs(ts => [...ts, { ...data, id: `tech-${Date.now()}`, certifications: certs, activeWOs: [] }])
      showToast('Technician added')
    }
    setShowModal(false)
    setEditTech(undefined)
  }

  function deleteTech(id: string) {
    setTechs(ts => ts.filter(t => t.id !== id))
    showToast('Technician removed')
  }

  const locationOptions = ['All', ...Array.from(new Set(DEMO_TECHS.map(t => t.location.split(',')[0])))]

  const filtered = techs.filter(t => {
    if (filterLoc !== 'All' && !t.location.startsWith(filterLoc)) return false
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.specialty.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const expiredCount = techs.reduce((acc, t) => acc + t.certifications.filter(c => certExpiryStatus(c.expiryDate) === 'expired').length, 0)
  const warningCount = techs.reduce((acc, t) => acc + t.certifications.filter(c => certExpiryStatus(c.expiryDate) === 'warning').length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Technicians</h1>
          <p className="text-gray-500 text-sm">
            {techs.filter(t => t.status === 'active').length} active
            {expiredCount > 0 && <span className="ml-2 text-red-600 font-semibold">· {expiredCount} expired cert{expiredCount > 1 ? 's' : ''}</span>}
            {warningCount > 0 && <span className="ml-2 text-amber-600 font-semibold">· {warningCount} expiring soon</span>}
          </p>
        </div>
        <button
          onClick={() => { setEditTech(undefined); setShowModal(true) }}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Technician
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search name or specialty…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-3 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-60 focus:outline-none focus:ring-2 focus:ring-[#003087]/30"
        />
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 flex-wrap">
          {locationOptions.map(l => (
            <button key={l} onClick={() => setFilterLoc(l)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filterLoc === l ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500'}`}>
              {l === 'All' ? 'All Locations' : l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(tech => {
          const expiredCerts = tech.certifications.filter(c => certExpiryStatus(c.expiryDate) === 'expired')
          const warnCerts = tech.certifications.filter(c => certExpiryStatus(c.expiryDate) === 'warning')
          return (
            <div key={tech.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${tech.status === 'inactive' ? 'opacity-60 border-dashed border-gray-300' : 'border-gray-100'}`}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#003087]/10 flex items-center justify-center text-[#003087] font-bold text-sm">
                      {tech.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{tech.name}</div>
                      <div className="text-xs text-gray-500">{tech.specialty}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {expiredCerts.length > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                        <AlertTriangle className="w-3 h-3" /> {expiredCerts.length}
                      </span>
                    )}
                    {warnCerts.length > 0 && expiredCerts.length === 0 && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                        ⚠ {warnCerts.length}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3 text-gray-400" />{tech.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail className="w-3 h-3 text-gray-400" /><span className="truncate">{tech.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="w-3 h-3 text-gray-400" />{tech.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 text-gray-400" />
                    Hired {tech.hireDate} · ${tech.hourlyRate}/hr
                  </div>
                  {tech.activeWOs.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-[#003087] font-medium">
                      <Wrench className="w-3 h-3" />
                      {tech.activeWOs.length} active WO{tech.activeWOs.length > 1 ? 's' : ''}: {tech.activeWOs.join(', ')}
                    </div>
                  )}
                </div>

                {tech.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tech.certifications.map(c => <CertBadge key={c.id} cert={c} />)}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-50">
                <button
                  onClick={() => { setEditTech(tech); setShowModal(true) }}
                  className="flex-1 text-xs font-medium py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => deleteTech(tech.id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No technicians found</p>
          <button onClick={() => { setEditTech(undefined); setShowModal(true) }}
            className="mt-3 text-sm text-[#003087] font-semibold hover:underline">
            Add first technician →
          </button>
        </div>
      )}

      {showModal && (
        <TechModal
          tech={editTech}
          onClose={() => { setShowModal(false); setEditTech(undefined) }}
          onSave={saveTech}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
