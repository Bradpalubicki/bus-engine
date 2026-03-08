import Link from 'next/link'
import { CheckCircle, Mail, Phone, FileText, Users, Award, ExternalLink } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DBE Program | Complete Coach Works',
  description: 'Complete Coach Works Disadvantaged Business Enterprise (DBE) program information — goals, compliance, ESOP status, and subcontracting opportunities.',
}

const dbeFacts = [
  'CCW actively seeks DBE subcontracting participation on all federally funded contracts',
  'Annual DBE goals established per FTA regulations (49 CFR Part 26)',
  'DBE directory utilization for all eligible scopes of work',
  'Good faith efforts documented on every bid and contract',
  'ESOP ownership structure ensures broad employee participation',
  'Amber Lindsey serves as CCW\'s designated DBE Liaison Officer (DBELO)',
]

export default function DBEPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E8A020] text-white px-3 py-1.5 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>FTA Certified · 49 CFR Part 26</span>
          </div>
          <h1 className="text-4xl font-bold text-[#003087] mb-4">DBE Program</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete Coach Works is committed to maximizing subcontracting opportunities for Disadvantaged Business Enterprises on all federally assisted contracts.
          </p>
        </div>

        {/* ESOP + DBE highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#003087] text-white rounded-xl p-6">
            <div className="w-10 h-10 bg-[#E8A020] rounded-lg flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-bold text-lg mb-2">100% Employee-Owned</h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              CCW transitioned to 100% employee ownership via ESOP in 2021. Our broad-based employee ownership model aligns with FTA equity and inclusion objectives.
            </p>
          </div>
          <div className="bg-[#F8F9FB] rounded-xl p-6 border border-gray-100">
            <div className="w-10 h-10 bg-[#003087] rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-bold text-lg text-[#003087] mb-2">FY 2024 DBE Goals</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Our annual DBE participation goals are established per 49 CFR Part 26 and submitted to the FTA. Goals are published for public comment prior to adoption.
            </p>
            <a
              href="#fy2024-goal"
              className="inline-flex items-center gap-1.5 text-[#E8A020] text-sm font-semibold hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View FY 2024 Goal Document
            </a>
          </div>
        </div>

        {/* DBE Facts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#003087] mb-6">Our DBE Commitment</h2>
          <div className="space-y-3">
            {dbeFacts.map((fact) => (
              <div key={fact} className="flex items-start gap-3 p-4 bg-[#F8F9FB] rounded-lg border border-gray-100">
                <CheckCircle className="w-5 h-5 text-[#E8A020] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FY2024 Goal doc placeholder */}
        <div id="fy2024-goal" className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <h2 className="font-bold text-[#003087] text-lg mb-2">FY 2024 DBE Goal — Public Notice</h2>
          <p className="text-gray-600 text-sm mb-4">
            Complete Coach Works has established the following DBE participation goals for federally assisted contracts in Federal Fiscal Year 2024, pursuant to the requirements of 49 CFR Part 26.
          </p>
          <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400 text-xs uppercase font-semibold">Overall DBE Goal</div>
                <div className="text-[#003087] font-bold text-xl mt-1">To be published</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs uppercase font-semibold">Race-Neutral Goal</div>
                <div className="text-[#003087] font-bold text-xl mt-1">To be published</div>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-xs">
            Per 49 CFR Part 26.45, these goals are based on evidence of DBE availability in the local market. Comments may be directed to the DBE Liaison Officer listed below.
          </p>
        </div>

        {/* DBE Contact */}
        <div className="bg-[#003087] text-white rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-2">DBE Liaison Officer</h2>
          <p className="text-blue-200 text-sm mb-6">For DBE program inquiries, subcontracting interest, or to review our current solicitations:</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 bg-[#E8A020] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">AL</span>
            </div>
            <div>
              <div className="font-bold text-lg">Amber Lindsey</div>
              <div className="text-blue-200 text-sm">Director of Contracts & DBE/ESOP Compliance</div>
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <a
                  href="mailto:alindsey@completecoach.com"
                  className="inline-flex items-center gap-2 text-[#E8A020] text-sm hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  alindsey@completecoach.com
                </a>
                <a
                  href="tel:+19516849585"
                  className="inline-flex items-center gap-2 text-[#E8A020] text-sm hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  (951) 684-9585
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-800 text-center">
            <p className="text-blue-300 text-xs">Complete Coach Works · 1863 Service Court, Riverside, CA 92507 · info@completecoach.com</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/about" className="text-[#003087] font-semibold hover:underline text-sm">
            &larr; Back to About CCW
          </Link>
        </div>
      </div>
    </div>
  )
}
