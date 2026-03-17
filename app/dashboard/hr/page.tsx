'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users, Briefcase, Plus, X, Edit2, Trash2,
  MapPin, DollarSign, ExternalLink,
} from 'lucide-react'

type JobStatus = 'open' | 'closed' | 'draft' | 'paused'
type JobType = 'full-time' | 'part-time' | 'contract'

type JobPosting = {
  id: string
  title: string
  department: string
  location: string
  salaryMin: number
  salaryMax: number
  jobType: JobType
  description: string
  status: JobStatus
  postedDate: string
}

type Employee = {
  id: string
  name: string
  title: string
  department: string
  location: string
  startDate: string
  email: string
  phone: string
  status: 'active' | 'inactive'
}

const DEPARTMENTS = ['Engineering', 'Operations', 'Sales', 'Finance', 'HR', 'Executive', 'IT', 'Maintenance']
const LOCATIONS = ['Riverside, CA', 'Alameda, CA', 'Seattle, WA', 'Memphis, TN', 'El Paso, TX', 'Waukesha, WI']
const JOB_TYPES: JobType[] = ['full-time', 'part-time', 'contract']

const STATUS_COLORS: Record<JobStatus, string> = {
  open: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-500',
  draft: 'bg-gray-100 text-gray-600',
  paused: 'bg-amber-100 text-amber-700',
}

const DEMO_JOBS: JobPosting[] = [
  { id: 'j-1', title: 'Lead Bus Technician', department: 'Engineering', location: 'Riverside, CA', salaryMin: 65000, salaryMax: 85000, jobType: 'full-time', description: 'Experienced transit bus technician with 5+ years on heavy diesel.', status: 'open', postedDate: '2024-02-01' },
  { id: 'j-2', title: 'ADA Systems Specialist', department: 'Engineering', location: 'Seattle, WA', salaryMin: 60000, salaryMax: 78000, jobType: 'full-time', description: 'Specialist in ADA lift systems, ramp modifications, and accessibility retrofits.', status: 'open', postedDate: '2024-02-15' },
  { id: 'j-3', title: 'HVAC Technician', department: 'Engineering', location: 'Alameda, CA', salaryMin: 55000, salaryMax: 72000, jobType: 'full-time', description: 'HVAC systems for transit coaches. EPA 609 required.', status: 'draft', postedDate: '2024-03-01' },
  { id: 'j-4', title: 'Fleet Operations Manager', department: 'Operations', location: 'Riverside, CA', salaryMin: 80000, salaryMax: 105000, jobType: 'full-time', description: 'Manage day-to-day operations of 10 shop locations.', status: 'paused', postedDate: '2024-01-10' },
]

const DEMO_EMPLOYEES: Employee[] = [
  { id: 'e-1', name: 'Marcus Webb', title: 'Lead Technician', department: 'Engineering', location: 'Riverside, CA', startDate: '2018-03-15', email: 'mwebb@completecoach.com', phone: '(951) 555-0201', status: 'active' },
  { id: 'e-2', name: 'Tanya Rodriguez', title: 'Electrical Tech', department: 'Engineering', location: 'Riverside, CA', startDate: '2020-07-22', email: 'trodriguez@completecoach.com', phone: '(951) 555-0202', status: 'active' },
  { id: 'e-3', name: 'Derrick Johnson', title: 'HVAC Technician', department: 'Engineering', location: 'Alameda, CA', startDate: '2015-11-04', email: 'djohnson@completecoach.com', phone: '(510) 555-0301', status: 'active' },
  { id: 'e-4', name: 'Linda Park', title: 'ADA Specialist', department: 'Engineering', location: 'Seattle, WA', startDate: '2019-04-10', email: 'lpark@completecoach.com', phone: '(206) 555-0401', status: 'active' },
  { id: 'e-5', name: 'Dale Carson', title: 'CEO / President', department: 'Executive', location: 'Riverside, CA', startDate: '1987-01-01', email: 'dale@completecoach.com', phone: '(800) 300-3751', status: 'active' },
]

type JobForm = Omit<JobPosting, 'id' | 'postedDate'>

function JobModal({ job, onClose, onSave }: { job?: JobPosting; onClose: () => void; onSave: (f: JobForm) => void }) {
  const [form, setForm] = useState<JobForm>(job ? {
    title: job.title, department: job.department, location: job.location,
    salaryMin: job.salaryMin, salaryMax: job.salaryMax, jobType: job.jobType,
    description: job.description, status: job.status,
  } : { title: '', department: DEPARTMENTS[0], location: LOCATIONS[0], salaryMin: 50000, salaryMax: 80000, jobType: 'full-time', description: '', status: 'draft' })
  const [saved, setSaved] = useState(false)
  function set<K extends keyof JobForm>(k: K, v: JobForm[K]) { setForm(f => ({ ...f, [k]: v })) }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{job ? 'Edit Job Post' : 'Post a Job'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-bold text-green-700">Job Posted</p>
            <p className="text-sm text-gray-500 mt-1">Open jobs appear on /careers</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Job Title *</label>
                <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Department</label>
                <select value={form.department} onChange={e => set('department', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
                <select value={form.location} onChange={e => set('location', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Salary Min ($)</label>
                <input type="number" step="1000" value={form.salaryMin} onChange={e => set('salaryMin', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Salary Max ($)</label>
                <input type="number" step="1000" value={form.salaryMax} onChange={e => set('salaryMax', Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Job Type</label>
                <select value={form.jobType} onChange={e => set('jobType', e.target.value as JobType)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value as JobStatus)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {(['draft', 'open', 'paused', 'closed'] as JobStatus[]).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
                <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (form.title) { onSave(form); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                {form.status === 'open' ? 'Post Job (Visible on /careers)' : 'Save Draft'}
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

type EmpForm = Omit<Employee, 'id'>

function EmpModal({ emp, onClose, onSave }: { emp?: Employee; onClose: () => void; onSave: (f: EmpForm) => void }) {
  const [form, setForm] = useState<EmpForm>(emp ? {
    name: emp.name, title: emp.title, department: emp.department, location: emp.location,
    startDate: emp.startDate, email: emp.email, phone: emp.phone, status: emp.status,
  } : { name: '', title: '', department: DEPARTMENTS[0], location: LOCATIONS[0], startDate: '', email: '', phone: '', status: 'active' })
  const [saved, setSaved] = useState(false)
  function set<K extends keyof EmpForm>(k: K, v: EmpForm[K]) { setForm(f => ({ ...f, [k]: v })) }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#003087]">{emp ? 'Edit Employee' : 'Add Employee'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        {saved ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-bold text-green-700">Employee Saved</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name *</label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Job Title</label>
                <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Department</label>
                <select value={form.department} onChange={e => set('department', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
                <select value={form.location} onChange={e => set('location', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Start Date</label>
                <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value as 'active' | 'inactive')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30">
                  <option value="active">Active</option>
                  <option value="inactive">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone</label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]/30" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (form.name) { onSave(form); setSaved(true) } }}
                className="flex-1 bg-[#003087] text-white font-bold py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Save Employee
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

type Tab = 'jobs' | 'employees'

export default function HRPage() {
  const [tab, setTab] = useState<Tab>('jobs')
  const [jobs, setJobs] = useState<JobPosting[]>(DEMO_JOBS)
  const [employees, setEmployees] = useState<Employee[]>(DEMO_EMPLOYEES)
  const [showJobModal, setShowJobModal] = useState(false)
  const [showEmpModal, setShowEmpModal] = useState(false)
  const [editJob, setEditJob] = useState<JobPosting | undefined>()
  const [editEmp, setEditEmp] = useState<Employee | undefined>()
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2200) }

  function saveJob(form: JobForm) {
    if (editJob) {
      setJobs(js => js.map(j => j.id === editJob.id ? { ...j, ...form } : j))
      showToast('Job updated')
    } else {
      setJobs(js => [...js, { ...form, id: `j-${Date.now()}`, postedDate: new Date().toISOString().split('T')[0] }])
      showToast('Job posted')
    }
    setShowJobModal(false); setEditJob(undefined)
  }

  function saveEmp(form: EmpForm) {
    if (editEmp) {
      setEmployees(es => es.map(e => e.id === editEmp.id ? { ...e, ...form } : e))
      showToast('Employee updated')
    } else {
      setEmployees(es => [...es, { ...form, id: `e-${Date.now()}` }])
      showToast('Employee added')
    }
    setShowEmpModal(false); setEditEmp(undefined)
  }

  function deleteJob(id: string) { setJobs(js => js.filter(j => j.id !== id)); showToast('Job removed') }
  function deleteEmp(id: string) { setEmployees(es => es.filter(e => e.id !== id)); showToast('Employee removed') }

  const openJobs = jobs.filter(j => j.status === 'open').length
  const deptGroups = DEPARTMENTS.filter(d => employees.some(e => e.department === d))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Human Resources</h1>
          <p className="text-gray-500 text-sm">
            {employees.filter(e => e.status === 'active').length} employees · {openJobs} open position{openJobs !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/careers" target="_blank"
            className="text-sm text-[#003087] hover:underline font-medium flex items-center gap-1">
            <ExternalLink className="w-4 h-4" /> Careers Page
          </Link>
          {tab === 'jobs' ? (
            <button onClick={() => { setEditJob(undefined); setShowJobModal(true) }}
              className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] flex items-center gap-2">
              <Plus className="w-4 h-4" /> Post Job
            </button>
          ) : (
            <button onClick={() => { setEditEmp(undefined); setShowEmpModal(true) }}
              className="bg-[#003087] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002070] flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Employee
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {([['jobs', 'Job Postings', Briefcase], ['employees', 'Employee Directory', Users]] as const).map(([t, label, Icon]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t ? 'bg-white text-[#003087] shadow-sm' : 'text-gray-500'}`}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {tab === 'jobs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs.map(job => (
            <div key={job.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${job.status === 'open' ? 'border-gray-100' : 'opacity-70 border-dashed border-gray-200'}`}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-900">{job.title}</div>
                    <div className="text-xs text-gray-500">{job.department}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold capitalize ${STATUS_COLORS[job.status]}`}>
                    {job.status}
                  </span>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />{job.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <DollarSign className="w-3 h-3" />${job.salaryMin.toLocaleString()}–${job.salaryMax.toLocaleString()} · {job.jobType}
                  </div>
                </div>
                {job.description && <p className="text-xs text-gray-400 line-clamp-2">{job.description}</p>}
              </div>
              <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-50">
                <button onClick={() => { if (job.status === 'open') { setJobs(js => js.map(j => j.id === job.id ? { ...j, status: 'closed' } : j)); showToast('Job closed') } else { setJobs(js => js.map(j => j.id === job.id ? { ...j, status: 'open' } : j)); showToast('Job reopened') } }}
                  className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-colors ${job.status === 'open' ? 'bg-gray-50 text-gray-600 hover:bg-gray-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                  {job.status === 'open' ? 'Close' : 'Reopen'}
                </button>
                <button onClick={() => { setEditJob(job); setShowJobModal(true) }}
                  className="p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteJob(job.id)}
                  className="p-1.5 rounded bg-red-50 text-red-400 hover:bg-red-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {jobs.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-400">
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No job postings</p>
              <button onClick={() => { setEditJob(undefined); setShowJobModal(true) }} className="mt-3 text-sm text-[#003087] font-semibold">
                Post first job →
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {deptGroups.map(dept => {
            const deptEmps = employees.filter(e => e.department === dept && e.status === 'active')
            if (deptEmps.length === 0) return null
            return (
              <div key={dept} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#003087]" />
                  <span className="font-bold text-gray-800">{dept}</span>
                  <span className="text-xs text-gray-400 ml-1">({deptEmps.length})</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {deptEmps.map(emp => (
                    <div key={emp.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-[#003087]/10 flex items-center justify-center text-[#003087] font-bold text-xs flex-shrink-0">
                        {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.title} · {emp.location}</div>
                      </div>
                      <div className="text-xs text-gray-400 hidden sm:block">{emp.email}</div>
                      <div className="flex gap-1">
                        <button onClick={() => { setEditEmp(emp); setShowEmpModal(true) }}
                          className="p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteEmp(emp.id)}
                          className="p-1.5 rounded bg-red-50 text-red-400 hover:bg-red-100">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showJobModal && (
        <JobModal
          job={editJob}
          onClose={() => { setShowJobModal(false); setEditJob(undefined) }}
          onSave={saveJob}
        />
      )}
      {showEmpModal && (
        <EmpModal
          emp={editEmp}
          onClose={() => { setShowEmpModal(false); setEditEmp(undefined) }}
          onSave={saveEmp}
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
