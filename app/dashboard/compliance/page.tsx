'use client'

import { useState } from 'react'
import { Shield, Plus, X, AlertTriangle, CheckCircle, Edit2, Trash2, Printer } from 'lucide-react'

type DocType = 'Buy America' | 'ADA' | 'CARB' | 'DBE' | 'FTA' | 'OSHA' | 'Other'
type DocStatus = 'complete' | 'signed' | 'submitted' | 'in_progress' | 'pending_signature' | 'not_started' | 'expired'

type ComplianceDoc = {
  id: string
  docType: DocType
  docNumber: string
  agencyOrVehicle: string
  status: DocStatus
  expiryDate: string | null
  notes: string
  addedDate: string
}

const DOC_TYPES: DocType[] = ['Buy America', 'ADA', 'CARB', 'DBE', 'FTA', 'OSHA', 'Other']

const STATUS_COLORS: Record<DocStatus, string> = {
  complete: 'bg-green-100 text-green-800',
  signed: 'bg-green-100 text-green-800',
  submitted: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-amber-100 text-amber-800',
  pending_signature: 'bg-purple-100 text-purple-800',
  not_started: 'bg-gray-100 text-gray-600',
  expired: 'bg-red-100 text-red-800',
}

const DEMO_DOCS: ComplianceDoc[] = [
  { id: 'cd-1', docType: 'Buy America', docNumber: 'BA-2024-001', agencyOrVehicle: 'SFMTA', status: 'signed', expiryDate: '2025-01-01', notes: 'Buy America certificate filed', addedDate: '2024-01-15' },
  { id: 'cd-2', docType: 'ADA', docNumber: 'ADA-2024-001', agencyOrVehicle: 'CCW-2024-001', status: 'complete', expiryDate: null, notes: 'ADA lift tested and certified', addedDate: '2024-02-01' },
  { id: 'cd-3', docType: 'CARB', docNumber: 'CARB-2024-002', agencyOrVehicle: 'IndyGo', status: 'in_progress', expiryDate: '2024-06-30', notes: 'CARB compliance pending engine report', addedDate: '2024-03-01' },
  { id: 'cd-4', docType: 'DBE', docNumber: 'DBE-2023-005', agencyOrVehicle: 'Denver RTD', status: 'expired', expiryDate: '2024-01-01', notes: 'Renewal required', addedDate: '2023-01-10' },
  { id: 'cd-5', docType: 'FTA', docNumber: 'FTA-2024-003', agencyOrVehicle: 'Long Beach Transit', status: 'submitted', expiryDate: '2025-06-01', notes: 'FTA drug & alcohol compliance', addedDate: '2024-01-20' },
  { id: 'cd-6', docType: 'OSHA', docNumber: 'OSHA-2024-001', agencyOrVehicle: 'CCW — Riverside', status: 'signed', expiryDate: '2025-12-31', notes: 'Annual OSHA safety certification', addedDate: '2024-01-05' },
]

function daysUntil(date: string | null) {
  if (!date) return null
  return Math.ceil((new Date(date).getTime() - Date.now()) / 86400000)
}

function expiryStatus(date: string | null): 'ok' | 'warning' | 'expired' | 'none' {
  if (!date) return 'none'
  const d = daysUntil(date)!
  if (d < 0) return 'expired'
  if (d < 60) return 'warning'
  return 'ok'
}

type DocForm = Omit<ComplianceDoc, 'id' | 'addedDate'>

function DocModal({ doc, onClose, onSave }: { doc?: ComplianceDoc; onClose: () => void; onSave: (f: DocForm) => void }) {
  const [form, setForm] = useState<DocForm>(doc ? {
    docType: doc.docType, docNumber: doc.docNumber, agencyOrVehicle: doc.agencyOrVehicle,
    status: doc.status, expiryDate: doc.expiryDate, notes: doc.notes,
  } : { docType: 'Buy America', docNumber: '', agencyOrVehicle: '', status: 'not_started', expiryDate: '', notes: '' })
  const [saved, setSaved] = useState(false)
  function set<K extends keyof DocForm>(k: K, v: DocForm[K]) { setForm(f => ({ ...f, [k]: v })) }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{doc ? 'Edit Document' : 'Add Compliance Doc'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-bold text-green-700">Document Saved</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Doc Type</label>
                <select value={form.docType} onChange={e => set('docType', e.target.value as DocType)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Doc Number</label>
                <input type="text" placeholder="BA-2024-001" value={form.docNumber} onChange={e => set('docNumber', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Agency / Vehicle</label>
                <input type="text" placeholder="SFMTA or CCW-2024-001" value={form.agencyOrVehicle} onChange={e => set('agencyOrVehicle', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value as DocStatus)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {(['not_started', 'in_progress', 'pending_signature', 'submitted', 'signed', 'complete', 'expired'] as DocStatus[]).map(s => (
                    <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Expiry Date</label>
                <input type="date" value={form.expiryDate ?? ''} onChange={e => set('expiryDate', e.target.value || null)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Notes</label>
              <textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (form.docNumber) { onSave(form); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Document
              </button>
              <button onClick={onClose} className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CompliancePage() {
  const [docs, setDocs] = useState<ComplianceDoc[]>(DEMO_DOCS)
  const [showModal, setShowModal] = useState(false)
  const [editDoc, setEditDoc] = useState<ComplianceDoc | undefined>()
  const [filterType, setFilterType] = useState<DocType | 'All'>('All')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2200) }

  function saveDoc(form: DocForm) {
    if (editDoc) {
      setDocs(ds => ds.map(d => d.id === editDoc.id ? { ...d, ...form } : d))
      showToast('Document updated')
    } else {
      setDocs(ds => [...ds, { ...form, id: `cd-${Date.now()}`, addedDate: new Date().toISOString().split('T')[0] }])
      showToast('Document added')
    }
    setShowModal(false); setEditDoc(undefined)
  }

  function deleteDoc(id: string) { setDocs(ds => ds.filter(d => d.id !== id)); showToast('Document removed') }

  function printList() { window.print() }

  const expired = docs.filter(d => expiryStatus(d.expiryDate) === 'expired')
  const warning = docs.filter(d => expiryStatus(d.expiryDate) === 'warning')

  const filtered = filterType === 'All' ? docs : docs.filter(d => d.docType === filterType)

  const completeCount = docs.filter(d => d.status === 'signed' || d.status === 'complete').length
  const pendingCount = docs.filter(d => ['in_progress', 'pending_signature', 'submitted'].includes(d.status)).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Compliance</h1>
          <p className="text-gray-500 text-sm">
            {completeCount} complete · {pendingCount} in progress
            {expired.length > 0 && <span className="ml-2 text-red-600 font-semibold">· {expired.length} expired</span>}
            {warning.length > 0 && <span className="ml-2 text-amber-600 font-semibold">· {warning.length} expiring soon</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={printList}
            className="border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button onClick={() => { setEditDoc(undefined); setShowModal(true) }}
            className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Doc
          </button>
        </div>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Complete', value: completeCount, color: 'text-green-600', icon: CheckCircle },
          { label: 'In Progress', value: pendingCount, color: 'text-amber-600', icon: Shield },
          { label: 'Expired / Alert', value: expired.length + warning.length, color: 'text-red-600', icon: AlertTriangle },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <k.icon className={`w-8 h-8 ${k.color}`} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{k.value}</div>
              <div className="text-xs text-gray-500">{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {(expired.length > 0 || warning.length > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-red-900 mb-1">Documents Requiring Attention</div>
            {expired.map(d => (
              <div key={d.id} className="text-sm text-red-700">{d.docType} {d.docNumber} — {d.agencyOrVehicle} · <strong>EXPIRED</strong></div>
            ))}
            {warning.map(d => {
              const days = daysUntil(d.expiryDate)
              return <div key={d.id} className="text-sm text-amber-700">{d.docType} {d.docNumber} — expiring in {days} days</div>
            })}
          </div>
        </div>
      )}

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit flex-wrap">
        {(['All', ...DOC_TYPES] as const).map(t => (
          <button key={t} onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterType === t ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Doc #</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Agency / Vehicle</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Expiry</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Notes</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="py-12 text-center text-gray-400">
                <Shield className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p>No compliance documents</p>
                <button onClick={() => { setEditDoc(undefined); setShowModal(true) }} className="mt-2 text-sm text-[#003087] font-semibold">
                  Add first document →
                </button>
              </td></tr>
            ) : filtered.map(doc => {
              const es = expiryStatus(doc.expiryDate)
              const days = daysUntil(doc.expiryDate)
              return (
                <tr key={doc.id} className={`hover:bg-gray-50 ${es === 'expired' ? 'bg-red-50/30' : es === 'warning' ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-[#003087]/10 text-[#003087] px-2 py-0.5 rounded-full font-semibold">{doc.docType}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{doc.docNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{doc.agencyOrVehicle}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[doc.status]}`}>
                      {doc.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-xs ${es === 'expired' ? 'text-red-600 font-bold' : es === 'warning' ? 'text-amber-700 font-bold' : 'text-gray-500'}`}>
                    {doc.expiryDate ? (
                      <>
                        {new Date(doc.expiryDate).toLocaleDateString()}
                        {es === 'expired' && ' (EXPIRED)'}
                        {es === 'warning' && ` (${days}d)`}
                      </>
                    ) : 'No expiry'}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs max-w-[160px] truncate">{doc.notes || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => { setEditDoc(doc); setShowModal(true) }}
                        className="p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteDoc(doc.id)}
                        className="p-1.5 rounded bg-red-50 text-red-400 hover:bg-red-100">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <DocModal
          doc={editDoc}
          onClose={() => { setShowModal(false); setEditDoc(undefined) }}
          onSave={saveDoc}
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
