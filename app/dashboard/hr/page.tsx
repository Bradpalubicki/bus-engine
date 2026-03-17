import Link from 'next/link'
import { Users, Briefcase, FileText, Building2 } from 'lucide-react'
import { demoJobPostings, demoVendors, demoTechnicians } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

const statusColors: Record<string, string> = {
  active:   'bg-green-100 text-green-700',
  draft:    'bg-gray-100 text-gray-600',
  filled:   'bg-blue-100 text-blue-700',
  paused:   'bg-amber-100 text-amber-700',
}

export default async function HRPage() {
  const activeJobs = demoJobPostings.filter(j => j.status === 'active')
  const filledJobs = demoJobPostings.filter(j => j.status === 'filled')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003087]">Human Resources</h1>
          <p className="text-gray-500 text-sm">{demoTechnicians.length} technicians · {activeJobs.length} open positions</p>
        </div>
        <div className="flex gap-2">
          <Link href="/careers" target="_blank" className="text-sm text-[#003087] hover:underline font-medium">
            View Public Careers Page →
          </Link>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', value: demoTechnicians.length, icon: Users, color: 'text-[#003087]', bg: 'bg-blue-50 border-blue-200' },
          { label: 'Open Positions', value: activeJobs.length, icon: Briefcase, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
          { label: 'Filled This Month', value: filledJobs.length, icon: FileText, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
          { label: 'Active Vendors', value: demoVendors.filter(v => v.status === 'active').length, icon: Building2, color: 'text-[#003087]', bg: 'bg-gray-50 border-gray-200' },
        ].map(kpi => (
          <div key={kpi.label} className={`${kpi.bg} border rounded-xl p-4`}>
            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-sm text-gray-600 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Job Postings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#003087]" />
            <h2 className="font-bold text-gray-900">Job Postings</h2>
          </div>
          <button className="text-sm bg-[#003087] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#002070] transition-colors">
            + Post Job
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#F8F9FB] border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Department</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Salary Range</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Posted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {demoJobPostings.map(job => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{job.title}</td>
                <td className="px-4 py-3 text-gray-600">{job.department}</td>
                <td className="px-4 py-3 text-gray-500">{job.location}</td>
                <td className="px-4 py-3 text-gray-600">
                  {job.salary_min && job.salary_max
                    ? `$${(job.salary_min / 1000).toFixed(0)}K – $${(job.salary_max / 1000).toFixed(0)}K`
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold capitalize ${statusColors[job.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {job.posted_at ? new Date(job.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
          DEMO — Active postings appear on the public /careers page automatically.
        </div>
      </div>

      {/* Vendor Management quick link */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-[#003087]" />
            <div>
              <div className="font-bold text-gray-900">Vendor Management</div>
              <div className="text-sm text-gray-500">{demoVendors.length} vendors · {demoVendors.filter(v => v.status === 'under_review').length} under review</div>
            </div>
          </div>
          <Link href="/dashboard/vendors" className="text-sm text-[#003087] font-semibold hover:underline">
            Manage Vendors →
          </Link>
        </div>
      </div>
    </div>
  )
}
