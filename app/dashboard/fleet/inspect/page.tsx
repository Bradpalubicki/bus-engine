'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, MinusCircle, ChevronDown, ChevronUp, Save, ArrowLeft, Camera } from 'lucide-react'
import Link from 'next/link'

type ItemResult = 'pass' | 'fail' | 'na'

type CheckItem = {
  id: string
  label: string
  result: ItemResult
  notes: string
  notesOpen: boolean
  photoFile: File | null
  photoPreview: string
  photoUploadedUrl: string
}

type Section = {
  id: string
  title: string
  icon: string
  items: CheckItem[]
  open: boolean
}

const DEMO_VINS = [
  'CCW-2024-001', 'CCW-2024-002', 'CCW-2024-003',
  'CCW-2023-045', 'CCW-2023-089', 'CCW-2022-112',
]

function makeItems(labels: string[]): CheckItem[] {
  return labels.map((label, i) => ({
    id: `item-${i}-${label.replace(/\s+/g, '-').toLowerCase()}`,
    label,
    result: 'na' as ItemResult,
    notes: '',
    notesOpen: false,
    photoFile: null,
    photoPreview: '',
    photoUploadedUrl: '',
  }))
}

const INITIAL_SECTIONS: Section[] = [
  {
    id: 'exterior',
    title: 'Exterior',
    icon: '🚌',
    open: true,
    items: makeItems([
      'Front body panels — no cracks or damage',
      'Rear body panels — no cracks or damage',
      'Side body panels — left',
      'Side body panels — right',
      'Windshield — no chips or cracks',
      'Side windows — all intact',
      'Rear window — intact',
      'Mirrors — left / right',
      'Headlights — functional',
      'Tail lights — functional',
      'Turn signals — all four',
      'Hazard lights',
      'Destination sign — front',
      'Destination sign — rear/side',
      'Roof hatches — sealed',
      'Undercarriage — no visible damage',
    ]),
  },
  {
    id: 'interior',
    title: 'Interior',
    icon: '💺',
    open: false,
    items: makeItems([
      'Flooring — no tears or trip hazards',
      'Driver seat — condition and adjustment',
      'Passenger seats — all secure',
      'Handrails — all secure',
      'Overhead panels — intact',
      'Fare box — functional',
      'ADA lift — operational',
      'ADA securement positions — clear',
      'Wheelchair tie-downs present',
      'Emergency exits — marked and accessible',
      'Interior lighting — all functional',
      'Driver partition / barrier (if equipped)',
      'PA system / intercom',
    ]),
  },
  {
    id: 'mechanical',
    title: 'Mechanical',
    icon: '🔧',
    open: false,
    items: makeItems([
      'Engine — start and idle quality',
      'Engine — no visible fluid leaks',
      'Transmission — smooth shifts',
      'Brakes — service brakes responsive',
      'Brakes — parking brake holds',
      'Steering — no play or vibration',
      'Suspension — no excessive bounce',
      'Exhaust — no leaks or excessive smoke',
      'Fuel system — cap secured, no leaks',
      'Cooling system — coolant level',
      'Oil level — within range',
      'Hydraulic fluid (if applicable)',
      'Air system — builds to spec (if air brakes)',
      'Tires — tread depth all axles',
      'Tires — inflation all axles',
      'Wheel lugs — torqued',
    ]),
  },
  {
    id: 'electrical',
    title: 'Electrical',
    icon: '⚡',
    open: false,
    items: makeItems([
      'Battery — charge and terminals',
      'Alternator / charging system',
      'Main fuse / breaker panel',
      'Inverter (if equipped)',
      'Shore power inlet (if equipped)',
      'Dash gauges — all reading',
      'Backup camera / sensors',
      'Farebox / farecard reader',
      'Radio / communications',
      'USB / power outlets (if equipped)',
    ]),
  },
  {
    id: 'hvac',
    title: 'HVAC',
    icon: '❄️',
    open: false,
    items: makeItems([
      'Front AC — blows cold',
      'Rear AC — blows cold',
      'Heater — blows hot',
      'HVAC controls functional',
      'Filters — clean, no obstruction',
      'Roof HVAC unit — no leaks',
    ]),
  },
  {
    id: 'safety',
    title: 'Safety & Compliance',
    icon: '🛡️',
    open: false,
    items: makeItems([
      'Fire extinguisher — charged and mounted',
      'First aid kit — stocked',
      'Emergency triangles / flares',
      'Emergency exit hammer',
      'Safety data sheet binder',
      'Registration / permits current',
      'Insurance card present',
      'Last inspection sticker current',
      'Spill kit (if CNG/LNG)',
    ]),
  },
]

type OverallResult = 'pass' | 'conditional' | 'fail' | ''

function ResultButton({ value, current, onChange }: {
  value: ItemResult
  current: ItemResult
  onChange: (v: ItemResult) => void
}) {
  const config = {
    pass: { label: 'Pass', icon: CheckCircle2, active: 'bg-green-500 text-white border-green-500', inactive: 'border-gray-200 text-gray-400 hover:border-green-300' },
    fail: { label: 'Fail', icon: XCircle, active: 'bg-red-500 text-white border-red-500', inactive: 'border-gray-200 text-gray-400 hover:border-red-300' },
    na:   { label: 'N/A',  icon: MinusCircle, active: 'bg-gray-400 text-white border-gray-400', inactive: 'border-gray-200 text-gray-300 hover:border-gray-400' },
  }
  const c = config[value]
  const isActive = current === value
  return (
    <button
      onClick={() => onChange(value)}
      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${isActive ? c.active : c.inactive}`}
    >
      <c.icon className="w-3 h-3" />
      {c.label}
    </button>
  )
}

type InspectionRecord = {
  id: string
  vin: string
  inspector: string
  date: string
  odometer: string
  overall: OverallResult
  sections: Section[]
  submittedAt: string
}

export default function InspectPage() {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS)
  const [vin, setVin] = useState('')
  const [inspector, setInspector] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [odometer, setOdometer] = useState('')
  const [overall, setOverall] = useState<OverallResult>('')
  const [records, setRecords] = useState<InspectionRecord[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [view, setView] = useState<'form' | 'history'>('form')
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  function toggleSection(id: string) {
    setSections(ss => ss.map(s => s.id === id ? { ...s, open: !s.open } : s))
  }

  function updateItem(sectionId: string, itemId: string, field: keyof CheckItem, value: string | boolean) {
    setSections(ss => ss.map(s => s.id === sectionId ? {
      ...s,
      items: s.items.map(it => it.id === itemId ? { ...it, [field]: value } : it)
    } : s))
  }

  function handlePhotoCapture(sectionId: string, itemId: string, file: File | null) {
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    setSections(ss => ss.map(s => s.id === sectionId ? {
      ...s,
      items: s.items.map(it => it.id === itemId ? { ...it, photoFile: file, photoPreview: previewUrl } : it)
    } : s))
  }

  function getSummary() {
    let pass = 0, fail = 0, na = 0
    sections.forEach(s => s.items.forEach(it => {
      if (it.result === 'pass') pass++
      else if (it.result === 'fail') fail++
      else na++
    }))
    return { pass, fail, na, total: pass + fail + na }
  }

  function handleSubmit() {
    if (!vin || !inspector || !overall) {
      showToast('Fill in VIN, inspector name, and overall result')
      return
    }
    const record: InspectionRecord = {
      id: `INS-${Date.now()}`,
      vin,
      inspector,
      date,
      odometer,
      overall,
      sections: JSON.parse(JSON.stringify(sections)),
      submittedAt: new Date().toISOString(),
    }
    setRecords(rs => [record, ...rs])
    setSubmitted(true)
    showToast('Inspection saved ✓')
  }

  function resetForm() {
    // Revoke any object URLs to prevent memory leaks
    sections.forEach(s => s.items.forEach(it => { if (it.photoPreview) URL.revokeObjectURL(it.photoPreview) }))
    setSections(INITIAL_SECTIONS.map(s => ({ ...s, open: false, items: makeItems(s.items.map(i => i.label)) })))
    setVin('')
    setInspector('')
    setDate(new Date().toISOString().split('T')[0])
    setOdometer('')
    setOverall('')
    setSubmitted(false)
  }

  const summary = getSummary()
  const failedItems = sections.flatMap(s => s.items.filter(it => it.result === 'fail').map(it => ({ ...it, section: s.title })))

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-16">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/fleet" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[#003087]">Bus Inspection</h1>
          <p className="text-sm text-gray-500">Pre/Post condition checklist</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {(['form', 'history'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${view === v ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500'}`}>
              {v === 'form' ? 'New' : `History (${records.length})`}
            </button>
          ))}
        </div>
      </div>

      {view === 'history' ? (
        <div className="space-y-3">
          {records.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ClipboardIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No inspections yet</p>
              <button onClick={() => setView('form')} className="mt-3 text-sm text-[#003087] font-semibold">
                Start first inspection →
              </button>
            </div>
          ) : records.map(r => {
            const fails = r.sections.flatMap(s => s.items.filter(i => i.result === 'fail')).length
            const passes = r.sections.flatMap(s => s.items.filter(i => i.result === 'pass')).length
            return (
              <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{r.vin}</div>
                    <div className="text-sm text-gray-500">{r.inspector} · {r.date}</div>
                    {r.odometer && <div className="text-xs text-gray-400">{r.odometer} mi</div>}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.overall === 'pass' ? 'bg-green-100 text-green-700' : r.overall === 'conditional' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {r.overall === 'conditional' ? 'Conditional Pass' : r.overall.charAt(0).toUpperCase() + r.overall.slice(1)}
                  </span>
                </div>
                <div className="flex gap-3 mt-3 text-xs text-gray-500">
                  <span className="text-green-600 font-medium">{passes} Pass</span>
                  <span className="text-red-600 font-medium">{fails} Fail</span>
                  <span className="text-gray-400">{r.id}</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : submitted ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-green-700 mb-1">Inspection Saved</h2>
          <p className="text-sm text-gray-500 mb-1">VIN: {vin}</p>
          <p className="text-sm text-gray-500 mb-6">Inspector: {inspector} · {date}</p>
          <div className="flex gap-3 justify-center text-sm font-semibold mb-4">
            <span className="text-green-600">{summary.pass} Pass</span>
            <span className="text-red-600">{summary.fail} Fail</span>
            <span className="text-gray-400">{summary.na} N/A</span>
          </div>
          {failedItems.length > 0 && (
            <div className="text-left bg-red-50 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-red-700 uppercase mb-2">Failed Items</p>
              {failedItems.map(it => (
                <div key={it.id} className="text-sm text-red-600 py-0.5">· [{it.section}] {it.label}</div>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={resetForm} className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-xl hover:bg-[#002070] transition-colors text-sm">
              New Inspection
            </button>
            <button onClick={() => setView('history')} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
              View History
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header Fields */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Vehicle VIN</label>
                <select value={vin} onChange={e => setVin(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  <option value="">Select VIN…</option>
                  {DEMO_VINS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Inspector Name</label>
                <input type="text" placeholder="Full name" value={inspector} onChange={e => setInspector(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Inspection Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Odometer (mi)</label>
                <input type="number" placeholder="e.g. 142800" value={odometer} onChange={e => setOdometer(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {summary.total > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-green-600">{summary.pass} Pass</span>
                <span className="text-red-600">{summary.fail} Fail</span>
                <span className="text-gray-400">{summary.na} N/A · {summary.total} Total</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                <div className="bg-green-500 transition-all" style={{ width: `${(summary.pass / summary.total) * 100}%` }} />
                <div className="bg-red-500 transition-all" style={{ width: `${(summary.fail / summary.total) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Sections */}
          {sections.map(section => (
            <div key={section.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-bold text-gray-900">{section.title}</span>
                  <span className="text-xs text-gray-400">
                    ({section.items.filter(i => i.result === 'pass').length}/{section.items.length})
                  </span>
                  {section.items.some(i => i.result === 'fail') && (
                    <span className="text-xs bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">
                      {section.items.filter(i => i.result === 'fail').length} fail
                    </span>
                  )}
                </div>
                {section.open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>

              {section.open && (
                <div className="divide-y divide-gray-50">
                  {section.items.map(item => (
                    <div key={item.id} className={`px-4 py-3 ${item.result === 'fail' ? 'bg-red-50' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 pt-0.5">
                          <button
                            onClick={() => updateItem(section.id, item.id, 'notesOpen', !item.notesOpen)}
                            className="text-sm text-gray-700 text-left flex items-center gap-1.5 w-full"
                          >
                            <span>{item.label}</span>
                            {item.notes && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" title="Has notes" />}
                          </button>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                          {(['pass', 'fail', 'na'] as ItemResult[]).map(r => (
                            <ResultButton key={r} value={r} current={item.result}
                              onChange={v => updateItem(section.id, item.id, 'result', v)} />
                          ))}
                        </div>
                      </div>

                      {/* Notes — expanded for fail always, or when notesOpen */}
                      {(item.result === 'fail' || item.notesOpen) && (
                        <textarea
                          placeholder={item.result === 'fail' ? 'Notes on failure…' : 'Add note…'}
                          value={item.notes}
                          onChange={e => updateItem(section.id, item.id, 'notes', e.target.value)}
                          rows={2}
                          className={`mt-2 w-full rounded-lg px-3 py-1.5 text-sm resize-none focus:outline-none focus:ring-2 border ${item.result === 'fail' ? 'border-red-200 focus:ring-red-300' : 'border-gray-200 focus:ring-[#003087]/20'}`}
                        />
                      )}

                      {/* Photo capture — always available, auto-shown on fail */}
                      {(item.result === 'fail' || item.notesOpen || item.photoPreview) && (
                        <div className="mt-2 flex items-center gap-2">
                          <label className="flex items-center gap-1.5 cursor-pointer bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                            <Camera className="w-3.5 h-3.5" />
                            {item.photoPreview ? 'Change Photo' : 'Add Photo'}
                            <input
                              type="file"
                              accept="image/*"
                              capture="environment"
                              className="hidden"
                              onChange={e => handlePhotoCapture(section.id, item.id, e.target.files?.[0] ?? null)}
                            />
                          </label>
                          {item.photoPreview && (
                            <img src={item.photoPreview} alt="inspection photo" className="w-12 h-12 rounded object-cover border border-gray-200" />
                          )}
                        </div>
                      )}

                      {/* Small camera icon for items not in fail/notes-open state */}
                      {item.result !== 'fail' && !item.notesOpen && !item.photoPreview && (
                        <div className="mt-1">
                          <label className="inline-flex items-center gap-1 cursor-pointer text-gray-300 hover:text-gray-500 text-xs">
                            <Camera className="w-3 h-3" />
                            <span>Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              capture="environment"
                              className="hidden"
                              onChange={e => handlePhotoCapture(section.id, item.id, e.target.files?.[0] ?? null)}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Overall Result + Submit */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Overall Inspection Result</label>
              <div className="flex gap-2">
                {([
                  { value: 'pass', label: 'Pass', color: 'border-green-500 bg-green-500 text-white', inactive: 'border-gray-200 text-gray-500' },
                  { value: 'conditional', label: 'Conditional Pass', color: 'border-amber-500 bg-amber-500 text-white', inactive: 'border-gray-200 text-gray-500' },
                  { value: 'fail', label: 'Fail', color: 'border-red-500 bg-red-500 text-white', inactive: 'border-gray-200 text-gray-500' },
                ] as const).map(opt => (
                  <button key={opt.value} onClick={() => setOverall(opt.value)}
                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-bold transition-colors ${overall === opt.value ? opt.color : opt.inactive}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleSubmit}
              className="w-full bg-[#003087] text-white font-bold py-3 rounded-xl hover:bg-[#002070] transition-colors flex items-center justify-center gap-2 text-sm">
              <Save className="w-4 h-4" />
              Submit Inspection
            </button>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  )
}
