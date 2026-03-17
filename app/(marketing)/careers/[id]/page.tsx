import Link from 'next/link'
import { notFound } from 'next/navigation'
import { demoJobPostings } from '@/lib/demo-data'

export async function generateStaticParams() {
  return demoJobPostings.filter(j => j.status === 'active').map(j => ({ id: String(j.id) }))
}

export default async function CareerDetailPage({ params }: { params: { id: string } }) {
  const job = demoJobPostings.find(j => j.id === Number(params.id))
  if (!job || job.status !== 'active') return notFound()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#003087] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/careers" className="text-blue-300 hover:text-white text-sm mb-6 inline-block">
            ← Back to All Jobs
          </Link>
          <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">{job.department}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-blue-200">
            <span>📍 {job.location}</span>
            <span>💼 Full Time</span>
            {job.salary_min && job.salary_max && (
              <span>💰 ${job.salary_min.toLocaleString()} – ${job.salary_max.toLocaleString()} / year</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About This Role</h2>
              <p className="text-gray-600 leading-relaxed">
                Complete Coach Works is seeking a {job.title} to join our growing team in {job.location}.
                As a 100% employee-owned company, you&apos;ll be a direct stakeholder in our mission to extend
                the life of transit buses and reduce emissions for public agencies nationwide.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Requirements</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Relevant experience in transit, bus, or heavy vehicle industry preferred</li>
                <li>Ability to read technical schematics and work orders</li>
                <li>Valid driver&apos;s license required; CDL preferred for technician roles</li>
                <li>Commitment to quality, safety, and FTA compliance standards</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">What We Offer</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Competitive salary + ESOP ownership stake</li>
                <li>Health, dental, and vision insurance</li>
                <li>401(k) with company match</li>
                <li>Paid training and certification programs</li>
                <li>Stable, mission-driven work — public transit infrastructure</li>
              </ul>
            </div>
          </div>

          {/* Apply sidebar */}
          <div>
            <div className="bg-[#F8F9FB] rounded-xl border border-gray-200 p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Apply for this Position</h3>
              <p className="text-sm text-gray-500 mb-5">
                Send your resume and a brief introduction to our HR team.
              </p>
              <a
                href={`mailto:hr@completecoach.com?subject=Application: ${encodeURIComponent(job.title)}`}
                className="w-full bg-[#003087] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#002070] transition-colors text-center block"
              >
                Apply via Email
              </a>
              <p className="text-xs text-gray-400 mt-3 text-center">hr@completecoach.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
