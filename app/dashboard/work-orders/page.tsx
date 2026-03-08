import { demoWorkOrders } from '@/lib/demo-data'
import { ClipboardList, Bus, MapPin, User, Calendar } from 'lucide-react'

const statusColors: Record<string, string> = {
  intake: 'bg-gray-100 text-gray-700 border-gray-200',
  queued: 'bg-gray-200 text-gray-800 border-gray-300',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  qa_hold: 'bg-amber-100 text-amber-800 border-amber-200',
  complete: 'bg-green-100 text-green-800 border-green-200',
  delivered: 'bg-[#003087] text-white border-[#003087]',
}

const statusLabel: Record<string, string> = {
  intake: 'Intake', queued: 'Queued', in_progress: 'In Progress',
  qa_hold: 'QA Hold', complete: 'Complete', delivered: 'Delivered',
}

const columns = ['intake', 'queued', 'in_progress', 'qa_hold', 'complete', 'delivered']

export default function WorkOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Work Orders</h1>
          <p className="text-gray-500 text-sm">{demoWorkOrders.length} active work orders across all locations</p>
        </div>
        <button className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004db3] transition-colors flex items-center gap-2">
          <ClipboardList className="w-4 h-4" /> New WO
        </button>
      </div>

      {/* Kanban */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {columns.map(col => {
            const wos = demoWorkOrders.filter(wo => wo.status === col)
            return (
              <div key={col} className="w-64 flex-shrink-0">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-t-lg border-b-2 mb-3 ${statusColors[col]}`}>
                  <span className="text-xs font-bold uppercase tracking-wide">{statusLabel[col]}</span>
                  <span className="text-xs bg-white/40 px-1.5 py-0.5 rounded-full font-bold">{wos.length}</span>
                </div>
                <div className="space-y-3">
                  {wos.length === 0 ? (
                    <div className="text-center py-8 text-gray-300 text-sm border-2 border-dashed rounded-xl">Empty</div>
                  ) : (
                    wos.map(wo => (
                      <div key={wo.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-[#003087]">{wo.woNumber}</span>
                          <span className="text-xs text-gray-400">{wo.daysOpen}d</span>
                        </div>
                        <div className="font-semibold text-sm text-gray-800 mb-1">{wo.vin}</div>
                        <div className="text-xs text-gray-500 mb-2">{wo.serviceType}</div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Bus className="w-3 h-3" />{wo.agencyName}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />{wo.locationName}
                          </div>
                          {wo.techAssigned && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <User className="w-3 h-3" />{wo.techAssigned}
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />Target: {wo.targetDate}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
