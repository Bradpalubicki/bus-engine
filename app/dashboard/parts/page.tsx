import { demoParts } from '@/lib/demo-data'
import { Package, AlertTriangle } from 'lucide-react'

export default function PartsPage() {
  const lowStock = demoParts.filter(p => p.status === 'low_stock')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Parts & Inventory</h1>
          <p className="text-gray-500 text-sm">{demoParts.length} parts tracked · {lowStock.length} low stock alerts</p>
        </div>
        <button className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004db3] transition-colors">
          Add Part
        </button>
      </div>

      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-red-800">{lowStock.length} Parts Below Reorder Point</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {lowStock.map(p => (
              <div key={p.id} className="bg-white rounded-lg p-3 border border-red-100">
                <div className="font-mono text-xs font-bold text-red-700">{p.partNumber}</div>
                <div className="text-sm text-gray-700 mt-0.5">{p.description}</div>
                <div className="text-xs text-red-600 mt-1">On hand: {p.qtyOnHand} / Reorder at: {p.reorderPoint}</div>
                <div className="text-xs text-gray-500">{p.supplier}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Part #</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Supplier</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Unit Cost</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">On Hand</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Reorder At</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {demoParts.map(p => (
              <tr key={p.id} className={`hover:bg-gray-50 ${p.status === 'low_stock' ? 'bg-red-50/30' : ''}`}>
                <td className="px-4 py-3 font-mono text-xs font-bold text-[#003087]">{p.partNumber}</td>
                <td className="px-4 py-3 text-gray-700">{p.description}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{p.category}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{p.supplier}</td>
                <td className="px-4 py-3 text-right font-medium">${p.unitCost.toLocaleString()}</td>
                <td className={`px-4 py-3 text-right font-bold ${p.status === 'low_stock' ? 'text-red-600' : 'text-gray-700'}`}>
                  {p.qtyOnHand}
                </td>
                <td className="px-4 py-3 text-right text-gray-400">{p.reorderPoint}</td>
                <td className="px-4 py-3">
                  {p.status === 'low_stock' ? (
                    <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                      <AlertTriangle className="w-3 h-3" /> Low Stock
                    </span>
                  ) : (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
