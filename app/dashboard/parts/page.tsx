'use client'

import { useState } from 'react'
import { Package, Plus, X, Search, AlertTriangle, ArrowUp, ArrowDown, Download, Trash2, Edit2 } from 'lucide-react'

type Part = {
  id: string
  partNumber: string
  description: string
  category: string
  supplier: string
  unitCost: number
  qtyOnHand: number
  reorderPoint: number
  reorderQty: number
  location: string
}

const CATEGORIES = ['Engine', 'Transmission', 'Brakes', 'HVAC', 'Electrical', 'Body', 'ADA/Lift', 'Fuel System', 'Suspension', 'Other']
const LOCATIONS = ['Riverside, CA', 'Alameda, CA', 'Seattle, WA', 'Memphis, TN', 'El Paso, TX']

const DEMO_PARTS: Part[] = [
  { id: 'p-1', partNumber: 'ENG-001', description: 'Engine Air Filter — Cummins ISL', category: 'Engine', supplier: 'Cummins', unitCost: 84.50, qtyOnHand: 12, reorderPoint: 4, reorderQty: 8, location: 'Riverside, CA' },
  { id: 'p-2', partNumber: 'BRK-002', description: 'Brake Pad Set — Front Axle', category: 'Brakes', supplier: 'Bendix', unitCost: 210.00, qtyOnHand: 3, reorderPoint: 5, reorderQty: 10, location: 'Riverside, CA' },
  { id: 'p-3', partNumber: 'HVAC-003', description: 'Compressor Belt — HVAC Unit', category: 'HVAC', supplier: 'Thermo King', unitCost: 42.00, qtyOnHand: 8, reorderPoint: 3, reorderQty: 6, location: 'Alameda, CA' },
  { id: 'p-4', partNumber: 'ELC-004', description: 'Alternator — 24V 200A', category: 'Electrical', supplier: 'Prestolite', unitCost: 640.00, qtyOnHand: 2, reorderPoint: 2, reorderQty: 4, location: 'Riverside, CA' },
  { id: 'p-5', partNumber: 'ADA-005', description: 'ADA Lift Motor Assembly', category: 'ADA/Lift', supplier: 'Ricon Corp', unitCost: 1200.00, qtyOnHand: 1, reorderPoint: 2, reorderQty: 3, location: 'Seattle, WA' },
  { id: 'p-6', partNumber: 'TRN-006', description: 'Transmission Filter Kit — Allison', category: 'Transmission', supplier: 'Allison', unitCost: 95.00, qtyOnHand: 6, reorderPoint: 3, reorderQty: 6, location: 'Riverside, CA' },
]

type AdjustLog = { partId: string; reason: string; qty: number; direction: 'in' | 'out'; date: string }

type PartForm = Omit<Part, 'id'>

function PartModal({ part, onClose, onSave }: { part?: Part; onClose: () => void; onSave: (f: PartForm) => void }) {
  const [form, setForm] = useState<PartForm>(part ?? {
    partNumber: '', description: '', category: CATEGORIES[0],
    supplier: '', unitCost: 0, qtyOnHand: 0,
    reorderPoint: 2, reorderQty: 5, location: LOCATIONS[0],
  })
  const [saved, setSaved] = useState(false)
  function set<K extends keyof PartForm>(k: K, v: PartForm[K]) { setForm(f => ({ ...f, [k]: v })) }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{part ? 'Edit Part' : 'Add Part'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-bold text-green-700">Part Saved</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Part Number</label>
                <input type="text" placeholder="ENG-001" value={form.partNumber} onChange={e => set('partNumber', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
                <input type="text" placeholder="Engine Air Filter — Cummins ISL" value={form.description} onChange={e => set('description', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Supplier</label>
                <input type="text" placeholder="Cummins" value={form.supplier} onChange={e => set('supplier', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Unit Cost ($)</label>
                <input type="number" step="0.01" value={form.unitCost} onChange={e => set('unitCost', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Qty On Hand</label>
                <input type="number" value={form.qtyOnHand} onChange={e => set('qtyOnHand', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Reorder Point</label>
                <input type="number" value={form.reorderPoint} onChange={e => set('reorderPoint', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Reorder Qty</label>
                <input type="number" value={form.reorderQty} onChange={e => set('reorderQty', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Storage Location</label>
                <select value={form.location} onChange={e => set('location', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (form.partNumber && form.description) { onSave(form); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Part
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

function AdjustModal({ part, onClose, onAdjust }: { part: Part; onClose: () => void; onAdjust: (qty: number, dir: 'in' | 'out', reason: string) => void }) {
  const [qty, setQty] = useState(1)
  const [dir, setDir] = useState<'in' | 'out'>('in')
  const [reason, setReason] = useState('received')
  const REASONS_IN = ['received', 'returned', 'found', 'transfer in']
  const REASONS_OUT = ['used on WO', 'damaged', 'transfer out', 'disposed']

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-[#003087]">Adjust Stock — {part.partNumber}</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex gap-2">
            {(['in', 'out'] as const).map(d => (
              <button key={d} onClick={() => { setDir(d); setReason(d === 'in' ? 'received' : 'used on WO') }}
                className={`flex-1 py-2 rounded-lg font-bold text-sm border-2 flex items-center justify-center gap-2 transition-colors ${dir === d ? (d === 'in' ? 'border-green-500 bg-green-500 text-white' : 'border-red-500 bg-red-500 text-white') : 'border-gray-200 text-gray-500'}`}>
                {d === 'in' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                Stock {d === 'in' ? 'In' : 'Out'}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Quantity</label>
            <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Reason</label>
            <select value={reason} onChange={e => setReason(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
              {(dir === 'in' ? REASONS_IN : REASONS_OUT).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="text-sm text-gray-500">
            Current: <strong>{part.qtyOnHand}</strong> → After: <strong className={dir === 'in' ? 'text-green-600' : 'text-red-600'}>{dir === 'in' ? part.qtyOnHand + qty : Math.max(0, part.qtyOnHand - qty)}</strong>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onAdjust(qty, dir, reason)}
              className="flex-1 bg-[#003087] text-white font-bold py-2.5 rounded-lg hover:bg-[#002070] transition-colors text-sm">
              Adjust Stock
            </button>
            <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function exportCSV(parts: Part[]) {
  const rows = [
    ['Part #', 'Description', 'Category', 'Supplier', 'Unit Cost', 'Qty', 'Reorder Pt', 'Reorder Qty', 'Location'],
    ...parts.map(p => [p.partNumber, p.description, p.category, p.supplier, String(p.unitCost), String(p.qtyOnHand), String(p.reorderPoint), String(p.reorderQty), p.location]),
  ]
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'parts-inventory.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>(DEMO_PARTS)
  const [logs, setLogs] = useState<AdjustLog[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editPart, setEditPart] = useState<Part | undefined>()
  const [adjustPart, setAdjustPart] = useState<Part | undefined>()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [lowOnly, setLowOnly] = useState(false)
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2200) }

  function savePart(form: PartForm) {
    if (editPart) {
      setParts(ps => ps.map(p => p.id === editPart.id ? { ...p, ...form } : p))
      showToast('Part updated')
    } else {
      setParts(ps => [...ps, { ...form, id: `p-${Date.now()}` }])
      showToast('Part added')
    }
    setShowModal(false); setEditPart(undefined)
  }

  function adjust(part: Part, qty: number, dir: 'in' | 'out', reason: string) {
    setParts(ps => ps.map(p => p.id === part.id ? {
      ...p,
      qtyOnHand: dir === 'in' ? p.qtyOnHand + qty : Math.max(0, p.qtyOnHand - qty),
    } : p))
    setLogs(ls => [{ partId: part.id, reason, qty, direction: dir, date: new Date().toISOString().split('T')[0] }, ...ls])
    setAdjustPart(undefined)
    showToast(`Stock ${dir === 'in' ? 'added' : 'removed'}: ${qty} units`)
  }

  function deletePart(id: string) { setParts(ps => ps.filter(p => p.id !== id)); showToast('Part deleted') }

  const cats = ['All', ...Array.from(new Set(parts.map(p => p.category))).sort()]

  const filtered = parts.filter(p => {
    if (filterCat !== 'All' && p.category !== filterCat) return false
    if (lowOnly && p.qtyOnHand >= p.reorderPoint) return false
    if (search && !p.description.toLowerCase().includes(search.toLowerCase()) && !p.partNumber.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const lowStockCount = parts.filter(p => p.qtyOnHand < p.reorderPoint).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Parts & Inventory</h1>
          <p className="text-gray-500 text-sm">
            {parts.length} parts
            {lowStockCount > 0 && <span className="ml-2 text-red-600 font-semibold">· {lowStockCount} below reorder point</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(parts)}
            className="border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => { setEditPart(undefined); setShowModal(true) }}
            className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Part
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search parts…" value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setFilterCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterCat === c ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500'}`}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => setLowOnly(!lowOnly)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${lowOnly ? 'bg-red-100 text-red-700 border-red-200' : 'border-gray-200 text-gray-500'}`}>
          <AlertTriangle className="w-3 h-3" /> Low Stock Only
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium">Part #</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Supplier</th>
                <th className="text-right px-4 py-3 font-medium">Unit Cost</th>
                <th className="text-right px-4 py-3 font-medium">Qty</th>
                <th className="text-right px-4 py-3 font-medium">Reorder Pt</th>
                <th className="text-left px-4 py-3 font-medium">Location</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="py-12 text-center text-gray-400">
                  <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p>No parts found</p>
                </td></tr>
              ) : filtered.map(part => {
                const isLow = part.qtyOnHand < part.reorderPoint
                return (
                  <tr key={part.id} className={`hover:bg-gray-50 ${isLow ? 'bg-red-50/40' : ''}`}>
                    <td className="px-4 py-2.5 font-mono text-xs text-[#003087] font-semibold">{part.partNumber}</td>
                    <td className="px-4 py-2.5 text-gray-800">{part.description}</td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{part.category}</span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 text-xs">{part.supplier}</td>
                    <td className="px-4 py-2.5 text-right font-medium">${part.unitCost.toFixed(2)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className={`font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
                        {isLow && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                        {part.qtyOnHand}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-400 text-xs">{part.reorderPoint}</td>
                    <td className="px-4 py-2.5 text-gray-500 text-xs">{part.location}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex gap-1">
                        <button onClick={() => setAdjustPart(part)}
                          className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
                          ±Qty
                        </button>
                        <button onClick={() => { setEditPart(part); setShowModal(true) }}
                          className="p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => deletePart(part.id)}
                          className="p-1.5 rounded bg-red-50 text-red-400 hover:bg-red-100">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h2 className="font-semibold text-[#003087] mb-3">Recent Adjustments</h2>
          <div className="space-y-1.5">
            {logs.slice(0, 10).map((log, i) => {
              const part = parts.find(p => p.id === log.partId)
              return (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  {log.direction === 'in'
                    ? <ArrowDown className="w-4 h-4 text-green-500 flex-shrink-0" />
                    : <ArrowUp className="w-4 h-4 text-red-500 flex-shrink-0" />}
                  <span className="font-mono text-xs text-[#003087]">{part?.partNumber}</span>
                  <span>{log.direction === 'in' ? '+' : '-'}{log.qty} · {log.reason}</span>
                  <span className="ml-auto text-xs text-gray-400">{log.date}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {showModal && (
        <PartModal
          part={editPart}
          onClose={() => { setShowModal(false); setEditPart(undefined) }}
          onSave={savePart}
        />
      )}
      {adjustPart && (
        <AdjustModal
          part={adjustPart}
          onClose={() => setAdjustPart(undefined)}
          onAdjust={(qty, dir, reason) => adjust(adjustPart, qty, dir, reason)}
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
