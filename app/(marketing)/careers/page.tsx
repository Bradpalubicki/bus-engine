import Link from 'next/link'
import { demoJobPostings } from '@/lib/demo-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at Complete Coach Works | Join Our Team',
  description: 'Join Complete Coach Works — the nation\'s leading transit bus rehabilitation company. Open positions in bus technician, ZEPS electric systems, sales, and more.',
}

const typeLabels: Record<string, string> = {
  full_time:  'Full Time',
  part_time:  'Part Time',
  contract:   'Contract',
}

export default async function CareersPage() {
  const activeJobs = demoJobPostings.filter(j => j.status === 'active')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#003087] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-4">Careers</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Build the Future of Public Transit</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Join 300+ skilled professionals at the nation's largest transit bus rehabilitation company.
            We're based in Riverside, CA — and we're hiring.
          </p>
        </div>
      </div>

      {/* Why work here */}
      <div className="bg-[#F8F9FB] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🏭', title: 'Industry Leader', body: 'CCW rehabilitates more transit buses per year than any other company in North America.' },
            { icon: '⚡', title: 'ZEPS Technology', body: 'Join the team pioneering zero-emission conversions of existing diesel and CNG fleets.' },
            { icon: '🛡️', title: 'ESOP Company', body: 'You\'re not just an employee — you\'re an owner. 100% employee-owned since 2006.' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="font-bold text-gray-900 mb-2">{item.title}</div>
              <div className="text-sm text-gray-600">{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#003087] mb-2">Open Positions</h2>
          <p className="text-gray-500 mb-8">{activeJobs.length} positions available · Riverside, CA and Remote</p>

          {activeJobs.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-medium">No openings right now</p>
              <p className="text-sm mt-2">Check back soon or send your resume to <a href="mailto:hr@completecoach.com" className="text-[#003087] hover:underline">hr@completecoach.com</a></p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeJobs.map(job => (
                <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#003087] hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📍 {job.location}</span>
                        <span>🏢 {job.department}</span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                          {typeLabels[job.type] ?? job.type}
                        </span>
                      </div>
                      {job.salary_min && job.salary_max && (
                        <div className="mt-2 text-sm text-gray-600">
                          💰 ${job.salary_min.toLocaleString()} – ${job.salary_max.toLocaleString()} / year
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/careers/${job.id}`}
                      className="ml-6 bg-[#003087] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#002070] transition-colors flex-shrink-0"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Equal Opportunity */}
      <div className="bg-[#F8F9FB] py-10 px-6 text-center">
        <div className="max-w-2xl mx-auto text-sm text-gray-500">
          Complete Coach Works is an Equal Opportunity Employer. All qualified applicants will receive consideration
          for employment without regard to race, color, religion, sex, national origin, disability, or veteran status.
        </div>
      </div>
    </div>
  )
}
