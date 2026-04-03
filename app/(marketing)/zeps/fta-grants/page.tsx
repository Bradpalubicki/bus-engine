import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FTA Low-No Grants for Electric Bus Conversion | ZEPS by CCW',
  description: 'ZEPS is FTA Low-No eligible. Learn how to stack FTA Section 5339, Low-No grants, and HVIP vouchers up to $165K to fund your electric bus conversion project.',
  alternates: { canonical: 'https://completecoach.com/zeps/fta-grants' },
  openGraph: {
    title: 'FTA Low-No Grant Eligibility for ZEPS Electric Bus Conversion',
    description: 'Stack FTA Low-No, Section 5339, and CARB HVIP to fund zero-emission bus conversion. ZEPS is fully FTA compliant and Buy America certified.',
    url: 'https://completecoach.com/zeps/fta-grants',
    siteName: 'Complete Coach Works',
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'FTA Low-No Grants for ZEPS Electric Bus Conversion' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is ZEPS eligible for FTA Low-No grants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ZEPS is fully FTA compliant and Buy America certified. Transit agencies can apply FTA Low-No (Section 5339(c)) funding to cover up to 80% of ZEPS conversion costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I stack FTA Low-No with California HVIP vouchers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. California agencies can stack CARB HVIP vouchers (up to $165,000 per bus) with FTA Section 5339 funding. CCW provides complete documentation packages for both programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does FTA Low-No cover for ZEPS conversions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FTA Low-No covers up to 80% of eligible project costs including the ZEPS conversion itself, charging infrastructure, and related equipment. Your agency pays the 20% local match.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does CCW provide FTA compliance documentation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CCW provides a complete FTA documentation package including Buy America certification, pre-award audit support, and procurement checklists tailored to your grant program.',
      },
    },
  ],
}

const programs = [
  {
    name: 'FTA Low-No (Section 5339(c))',
    match: '80/20 federal match',
    amount: 'Covers 80% of eligible costs',
    detail: 'The primary federal grant for zero-emission and low-emission bus procurement. ZEPS qualifies as a zero-emission vehicle under FTA guidelines. CCW provides the full compliance documentation package.',
    tag: 'Primary Program',
    color: '#003087',
  },
  {
    name: 'FTA Section 5339(b) — Bus & Bus Facilities',
    match: '80/20 federal match',
    amount: 'Covers 80% of eligible costs',
    detail: 'Broader bus facilities grant that can fund ZEPS conversions alongside charging infrastructure upgrades. Often stackable with Low-No in separate fiscal years.',
    tag: 'Stackable',
    color: '#1a5fa8',
  },
  {
    name: 'CARB HVIP',
    match: 'Applied at point of sale',
    amount: 'Up to $165,000 per bus',
    detail: 'California\'s Hybrid and Zero-Emission Truck and Bus Voucher Incentive Project. Reduces the net cost of each ZEPS conversion before you apply any FTA funding.',
    tag: 'California Only',
    color: '#16a34a',
  },
  {
    name: 'EPA Clean School Bus (Adjacent)',
    match: 'Competitive grant',
    amount: 'Up to $375K per vehicle',
    detail: 'Inflation Reduction Act funding for clean transit vehicles. Eligibility varies by agency type. CCW can assist with grant documentation for qualifying agencies.',
    tag: 'Eligibility Varies',
    color: '#f59e0b',
  },
]

export default function ZEPSFTAGrantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header */}
      <div className="bg-[#0A1F12] text-white py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">ZEPS Electric · Funding Guide</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">FTA Low-No Grant Eligibility<br />for ZEPS Electric Bus Conversion</h1>
          <p className="text-gray-300 text-lg max-w-2xl">ZEPS is fully FTA compliant and Buy America certified. Stack federal grants with state vouchers to bring your net cost per bus well under $250K.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="bg-green-900/50 border border-green-700/40 px-3 py-1 rounded-full text-green-300">FTA Low-No Eligible</span>
            <span className="bg-green-900/50 border border-green-700/40 px-3 py-1 rounded-full text-green-300">HVIP Voucher Up to $165K</span>
            <span className="bg-green-900/50 border border-green-700/40 px-3 py-1 rounded-full text-green-300">Buy America Certified</span>
            <span className="bg-green-900/50 border border-green-700/40 px-3 py-1 rounded-full text-green-300">Complete Docs Provided</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">

        {/* Net cost calculator */}
        <section className="bg-[#0A1F12] text-white rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6 text-green-400">What a Stacked ZEPS Deal Looks Like</h2>
          <div className="space-y-3 text-sm">
            {[
              { label: 'ZEPS conversion cost (standard 40ft)', value: '$580,000', color: 'text-white' },
              { label: 'FTA Low-No covers 80%', value: '− $464,000', color: 'text-green-400' },
              { label: 'California HVIP voucher', value: '− $165,000', color: 'text-green-400' },
            ].map(row => (
              <div key={row.label} className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-gray-300">{row.label}</span>
                <span className={`font-bold text-base ${row.color}`}>{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-white text-base">Your agency net cost (CA)</span>
              <span className="font-bold text-2xl text-green-400">~$0</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Example assumes California agency with active HVIP eligibility. Non-CA agencies net ~$116K after FTA 80/20 match. Actual figures depend on grant cycle and project scope.</p>
        </section>

        {/* Grant programs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0A1F12] pb-2">Funding Programs — ZEPS Eligible</h2>
          <div className="space-y-5">
            {programs.map(p => (
              <div key={p.name} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-bold text-gray-900 text-base">{p.name}</h3>
                  <span className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border" style={{ borderColor: p.color, color: p.color }}>{p.tag}</span>
                </div>
                <div className="flex gap-6 text-sm mb-3">
                  <div><span className="text-gray-500">Match: </span><span className="font-semibold">{p.match}</span></div>
                  <div><span className="text-gray-500">Covers: </span><span className="font-semibold" style={{ color: p.color }}>{p.amount}</span></div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What CCW provides */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0A1F12] pb-2">What CCW Provides</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'FTA Low-No compliance documentation package',
              'Buy America certification for every ZEPS conversion',
              'Pre-award audit support for federal grants',
              'HVIP application guidance for California agencies',
              'Procurement checklist tailored to your grant program',
              'Fleet assessment to determine conversion eligibility',
              'Engineering specs for grant technical requirements',
              'Reference letters and past performance documentation',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#0A1F12] pb-2">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map(q => (
              <div key={q.name} className="border-l-4 border-[#16a34a] pl-5">
                <h3 className="font-semibold text-gray-900 mb-2">{q.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A1F12] text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Get Your FTA Documentation Package</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">CCW's team will confirm your agency's grant eligibility, recommend the optimal funding stack, and prepare all required documentation for your FTA application.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-[#16a34a] text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition">
              Request Grant Consultation
            </Link>
            <Link href="/zeps" className="border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/5 transition">
              ← Back to ZEPS Overview
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
