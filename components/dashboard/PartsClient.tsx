'use client'

import { useState, useTransition } from 'react'
import { AlertTriangle, Plus, Search, X, ArrowDown, ArrowUp } from 'lucide-react'
import { addPart, receiveStock, logUsage } from '@/app/dashboard/parts/actions'
import { formatMoney } from '@/lib/status-colors'
import type { Database } from '@/lib/database.types'

type Part = Database['public']['Tables']['bus_parts']['Row']
type Inventory = Database['public']['Tables']['bus_inventory']['Row']
type Location = Database['public']['Tables']['bus_locations']['Row']

export function PartsClient({
  parts,
  inventory,
  locations,
}: {
  parts: Part[]
  inventory: Inventory[]
  locations: Location[]
}) {
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [lowStockOnly, setLowStockOnly] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [receiveModal, setReceiveModal] = useState<Part | null>(null)
  const [usageModal, setUsageModal] = useState<Part | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Add Part form
  const [newPN, setNewPN] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newCat, setNewCat] = useState('')
  const [newCost, setNewCost] = useState('')
  const [newSupplier, setNewSupplier] = useState('')
  const [newLoc, setNewLoc] = useState('')
  const [newReorder, setNewReorder] = useState('5')
  const [newReorderQty, setNewReorderQty] = useState('10')

  // Receive form
  const [rcvQty, setRcvQty] = useState('')
  const [rcvRef, setRcvRef] = useState('')
  const [rcvLoc, setRcvLoc] = useState('')

  // Usage form
  const [useQty, setUseQty] = useState('')
  const [useLoc, setUseLoc] = useState('')

  const categories = [...new Set(parts.map(p => p.category).filter(Boolean))] as string[]

  const partsWithInventory = parts.map(p => {
    const inv = inventory.filter(i => i.part_id === p.id)
    const totalQty = inv.reduce((s, i) => s + (i.quantity_on_hand ?? 0), 0)
    const reorderPoint = inv[0]?.reorder_point ?? 5
    const isLowStock = totalQty <= reorderPoint
    const totalValue = totalQty * (p.unit_cost ?? 0)
    const defaultLocId = inv[0]?.location_id ?? ''
    return { ...p, totalQty, reorderPoint, isLowStock, totalValue, defaultLocId }
  })

  const filtered = partsWithInventory.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.part_number.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    const matchCat = !filterCat || p.category === filterCat
    const matchLow = !lowStockOnly || p.isLowStock
    return matchSearch && matchCat && matchLow
  })

  const totalValue = partsWithInventory.reduce((s, p) => s + p.totalValue, 0)
  const lowStockCount = partsWithInventory.filter(p => p.isLowStock).length

  const run = (fn: () => Promise<void>) => {
    setError(null)
    startTransition(async () => {
      try { await fn() } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Parts & Inventory</h1>
          <p className="text-gray-500 text-sm">{parts.length} parts · {lowStockCount} low stock · {formatMoney(totalValue)} total value</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004db3] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Part
        </button>
      </div>

      {lowStockCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-red-800">{lowStockCount} Parts Below Reorder Point</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {partsWithInventory.filter(p => p.isLowStock).slice(0, 6).map(p => (
              <div key={p.id} className="bg-white rounded-lg p-3 border border-red-100">
                <div className="font-mono text-xs font-bold text-red-700">{p.part_number}</div>
                <div className="text-sm text-gray-700 mt-0.5">{p.description}</div>
                <div className="text-xs text-red-600 mt-1">On hand: {p.totalQty} / Reorder at: {p.reorderPoint}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{error}</div>}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search part # or description..."
            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/20" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={() => setLowStockOnly(!lowStockOnly)}
          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${lowStockOnly ? 'bg-red-100 text-red-800 border-red-200' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          Low Stock Only
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Part #</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Unit Cost</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">On Hand</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Reorder At</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400 text-sm">No parts found</td></tr>
            ) : filtered.map(p => (
              <tr key={p.id} className={`hover:bg-gray-50 ${p.isLowStock ? 'bg-red-50/30' : ''}`}>
                <td className="px-4 py-3 font-mono text-xs font-bold text-[#003087]">{p.part_number}</td>
                <td className="px-4 py-3 text-gray-800">{p.description}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{p.category ?? '—'}</td>
                <td className="px-4 py-3 text-right text-gray-700">{p.unit_cost ? formatMoney(p.unit_cost) : '—'}</td>
                <td className={`px-4 py-3 text-right font-semibold ${p.isLowStock ? 'text-red-600' : 'text-gray-800'}`}>{p.totalQty}</td>
                <td className="px-4 py-3 text-right text-gray-500">{p.reorderPoint}</td>
                <td className="px-4 py-3">
                  {p.isLowStock ? (
                    <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                      <AlertTriangle className="w-3 h-3" /> Low Stock
                    </span>
                  ) : (
                    <span className="text-xs text-green-700 font-medium">OK</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => { setReceiveModal(p); setRcvLoc(p.defaultLocId) }}
                      className="flex items-center gap-1 text-xs text-green-700 hover:underline">
                      <ArrowDown className="w-3 h-3" /> Receive
                    </button>
                    <button onClick={() => { setUsageModal(p); setUseLoc(p.defaultLocId) }}
                      className="flex items-center gap-1 text-xs text-amber-700 hover:underline">
                      <ArrowUp className="w-3 h-3" /> Use
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Part Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-[#003087]">Add Part</h2>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Part Number *</label>
                  <input value={newPN} onChange={e => setNewPN(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Category</label>
                  <input value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Description *</label>
                  <input value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Unit Cost</label>
                  <input value={newCost} onChange={e => setNewCost(e.target.value)} type="number" step="0.01" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Supplier</label>
                  <input value={newSupplier} onChange={e => setNewSupplier(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Location *</label>
                  <select value={newLoc} onChange={e => setNewLoc(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option value="">Select...</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Reorder Point</label>
                  <input value={newReorder} onChange={e => setNewReorder(e.target.value)} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">Cancel</button>
                <button
                  disabled={!newPN || !newDesc || !newLoc || isPending}
                  onClick={() => run(async () => {
                    await addPart({ part_number: newPN, description: newDesc, category: newCat || undefined, unit_cost: newCost ? parseFloat(newCost) : undefined, supplier_name: newSupplier || undefined, location_id: newLoc, reorder_point: parseInt(newReorder), reorder_qty: parseInt(newReorderQty) })
                    setShowAddModal(false); setNewPN(''); setNewDesc(''); setNewCat(''); setNewCost(''); setNewSupplier(''); setNewLoc('')
                  })}
                  className="flex-1 bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isPending ? 'Adding...' : 'Add Part'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {receiveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-[#003087]">Receive Stock — {receiveModal.part_number}</h2>
              <button onClick={() => setReceiveModal(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Location</label>
                <select value={rcvLoc} onChange={e => setRcvLoc(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Quantity *</label>
                <input value={rcvQty} onChange={e => setRcvQty(e.target.value)} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Reference / PO#</label>
                <input value={rcvRef} onChange={e => setRcvRef(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setReceiveModal(null)} className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">Cancel</button>
                <button
                  disabled={!rcvQty || !rcvLoc || isPending}
                  onClick={() => run(async () => {
                    await receiveStock({ part_id: receiveModal.id, location_id: rcvLoc, qty: parseInt(rcvQty), reference: rcvRef || undefined })
                    setReceiveModal(null); setRcvQty(''); setRcvRef('')
                  })}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isPending ? 'Receiving...' : 'Receive'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Modal */}
      {usageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-[#003087]">Log Usage — {usageModal.part_number}</h2>
              <button onClick={() => setUsageModal(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Location</label>
                <select value={useLoc} onChange={e => setUseLoc(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Quantity Used *</label>
                <input value={useQty} onChange={e => setUseQty(e.target.value)} type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setUsageModal(null)} className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">Cancel</button>
                <button
                  disabled={!useQty || !useLoc || isPending}
                  onClick={() => run(async () => {
                    await logUsage({ part_id: usageModal.id, location_id: useLoc, qty: parseInt(useQty) })
                    setUsageModal(null); setUseQty('')
                  })}
                  className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isPending ? 'Logging...' : 'Log Usage'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
