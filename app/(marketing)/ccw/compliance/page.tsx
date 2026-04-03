import { Metadata } from 'next'
import ComplianceBadge from '@/components/marketing/ComplianceBadge'
import SAMGovBadge from '@/components/marketing/SAMGovBadge'

export const metadata: Metadata = {
  title: 'Capabilities & Compliance — Complete Coach Works | FTA, Buy America, CARB',
  description: 'Complete Coach Works compliance documentation: FTA TVM registration, Buy America (49 USC 5323(j)), DBE Program (49 CFR 26.49), ADA, CARB ZEPS certification, SAM.gov registration UEI QN7UN15K9NP2.',
  alternates: { canonical: 'https://completecoach.com/ccw/compliance' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Complete Coach Works registered in SAM.gov?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. CCW is SAM.gov registered with UEI QN7UN15K9NP2 and CAGE 1QA89. Registration is current through August 2026. NAICS codes: 336999, 811310, 336212, 336211.' },
    },
    {
      '@type': 'Question',
      name: 'Does CCW comply with Buy America requirements?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. All CCW products and services comply with Buy America provisions under 49 USC 5323(j). Pre-award and post-delivery audits available upon request.' },
    },
    {
      '@type': 'Question',
      name: 'Is ZEPS electric conversion CARB certified?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The ZEPS system is California Air Resources Board (CARB) certified as a Zero-Emission Bus powertrain solution. ZEPS conversions qualify for HVIP vouchers of up to $165,000 per bus.' },
    },
    {
      '@type': 'Question',
      name: 'Does CCW have a DBE program?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. CCW maintains a Disadvantaged Business Enterprise (DBE) program under 49 CFR Part 26.49. Contact compliance@completecoach.com for DBE subcontracting documentation.' },
    },
    {
      '@type': 'Question',
      name: 'Are CCW buses ADA compliant?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. All CCW refurbishment programs include ADA compliance under 49 CFR Parts 27, 37, and 38. Standard specs: 32-inch doorway clearance, 30-inch ramp width, 4-point securement system.' },
    },
  ],
}

export default function CompliancePage() {
  return (
    <main className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Hero */}
      <section className="bg-[#003087] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm font-bold uppercase tracking-widest text-blue-300 mb-4">Complete Coach Works</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Compliance & Certifications</h1>
          <p className="text-lg text-blue-100 max-w-3xl mb-8">
            Full documentation for FTA-funded procurement. All certifications, registrations, and compliance programs maintained for transit agency contract eligibility.
          </p>
          <div className="flex flex-wrap gap-3">
            <ComplianceBadge label="FTA Registered TVM" status="registered" />
            <ComplianceBadge label="Buy America Compliant" status="compliant" citation="49 USC 5323(j)" />
            <ComplianceBadge label="DBE Program" status="compliant" citation="49 CFR 26.49" />
            <ComplianceBadge label="ADA Accessible" status="compliant" citation="49 CFR Parts 37/38" />
            <ComplianceBadge label="CARB Certified" status="certified" />
            <ComplianceBadge label="SAM.gov Registered" status="registered" citation="UEI QN7UN15K9NP2" />
            <ComplianceBadge label="APTA Member" status="member" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">

        {/* Section 1: FTA TVM */}
        <section id="fta-tvm">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#003087] mb-2">Section 1</div>
              <h2 className="text-2xl font-bold text-gray-900">FTA Transit Vehicle Manufacturer (TVM) Status</h2>
              <div className="text-sm text-gray-500 mt-1">Federal Transit Administration · transit.dot.gov/TVM</div>
            </div>
            <ComplianceBadge label="TVM Registered" status="registered" />
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 mb-4">
              Complete Coach Works is registered with the Federal Transit Administration as a Transit Vehicle Manufacturer (TVM).
              TVM registration is required for any manufacturer whose vehicles will be procured using FTA grant funds.
              This registration confirms CCW&apos;s eligibility to supply buses, components, and refurbishment services to transit agencies using federal funding.
            </p>
            <p className="text-gray-700 mb-6">
              TVM registration also requires submission of a DBE Program and annual DBE goal updates, confirming CCW&apos;s ongoing compliance with FTA&apos;s disadvantaged business enterprise requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:compliance@completecoach.com" className="inline-flex items-center justify-center bg-[#003087] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
                Request TVM Documentation →
              </a>
              <div className="inline-flex items-center text-sm text-gray-500 px-6 py-3">
                Contact: (951) 826-5000 · compliance@completecoach.com
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Buy America */}
        <section id="buy-america">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#003087] mb-2">Section 2</div>
              <h2 className="text-2xl font-bold text-gray-900">Buy America Compliance</h2>
              <div className="text-sm text-gray-500 mt-1">49 USC § 5323(j) · 49 CFR Part 661</div>
            </div>
            <ComplianceBadge label="Buy America Compliant" status="compliant" citation="49 USC 5323(j)" />
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 mb-4">
              All CCW manufacturing, refurbishment, and conversion services comply with FTA Buy America requirements under 49 USC § 5323(j).
              For rolling stock procurement, Buy America requires that final assembly occurs in the United States and that at least 70% of the cost of components be manufactured in the U.S.
            </p>
            <p className="text-gray-700 mb-4">
              CCW&apos;s Riverside, CA facility performs all final assembly. Component sourcing documentation is maintained per 49 CFR Part 661 requirements, and pre-award and post-delivery audits are available to agencies on request.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="font-bold text-blue-900 mb-1">Plain Language Summary</div>
              <div className="text-sm text-blue-700">All CCW work is done in Riverside, CA, USA. Components sourced from American manufacturers where available. Full Buy America certification package provided at contract award.</div>
            </div>
            <a href="mailto:compliance@completecoach.com" className="inline-flex items-center bg-[#003087] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
              Request Buy America Certification →
            </a>
          </div>
        </section>

        {/* Section 3: DBE Program */}
        <section id="dbe">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#003087] mb-2">Section 3</div>
              <h2 className="text-2xl font-bold text-gray-900">DBE Program</h2>
              <div className="text-sm text-gray-500 mt-1">49 CFR Part 26 · FTA Disadvantaged Business Enterprise</div>
            </div>
            <ComplianceBadge label="DBE Program Active" status="compliant" citation="49 CFR 26.49" />
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 mb-4">
              Complete Coach Works maintains an FTA-compliant Disadvantaged Business Enterprise (DBE) program under 49 CFR Part 26.
              As an FTA-funded contractor receiving more than $250,000 in FTA-assisted contracts annually, CCW is required to establish and submit a DBE program including overall and contract-specific goals.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="font-bold text-amber-900 mb-1">Current DBE Goal Status</div>
              <div className="text-sm text-amber-700">
                DBE goal documentation available on request. Note: The 2025 FTA interim rule temporarily modified annual DBE goal submission requirements — CCW remains fully compliant with current FTA guidance.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="font-bold text-gray-900 mb-1">DBE Subcontracting</div>
                <div className="text-sm text-gray-600">Agencies may specify DBE subcontracting goals in their contract solicitation. CCW will identify and engage qualifying DBE subcontractors for each contract.</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="font-bold text-gray-900 mb-1">Reporting</div>
                <div className="text-sm text-gray-600">Semi-annual DBE utilization reports provided to agencies as required by 49 CFR 26.11. Contact our compliance team to establish reporting cadence.</div>
              </div>
            </div>
            <a href="mailto:compliance@completecoach.com" className="inline-flex items-center bg-[#003087] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
              DBE Contact: compliance@completecoach.com →
            </a>
          </div>
        </section>

        {/* Section 4: ADA */}
        <section id="ada">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#003087] mb-2">Section 4</div>
              <h2 className="text-2xl font-bold text-gray-900">ADA / Section 504 Compliance</h2>
              <div className="text-sm text-gray-500 mt-1">49 CFR Parts 27, 37, 38 · Americans with Disabilities Act</div>
            </div>
            <ComplianceBadge label="ADA Compliant" status="compliant" citation="49 CFR 37/38" />
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 mb-6">
              All CCW refurbishments and ZEPS conversions maintain or upgrade ADA accessibility to current standards under 49 CFR Parts 27, 37, and 38.
              CCW also offers ADA retrofit packages for agencies needing to bring older buses into current compliance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#003087] mb-1">32&quot;</div>
                <div className="text-sm text-gray-600">Minimum doorway clearance maintained</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#003087] mb-1">1:6</div>
                <div className="text-sm text-gray-600">Ramp slope (30&quot; deployable ramp)</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-[#003087] mb-1">4-pt</div>
                <div className="text-sm text-gray-600">Wheelchair securement system installed</div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="font-bold text-blue-900 mb-2">ADA Retrofit Services Available</div>
              <div className="text-sm text-blue-700">CCW can upgrade existing buses to current ADA standards: deploy/stow ramp systems, securement systems, kneeling systems, audio/visual next-stop announcements, priority seating. Ask for ADA retrofit scope quote.</div>
            </div>
            <a href="mailto:compliance@completecoach.com" className="inline-flex items-center bg-[#003087] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
              Request ADA Documentation →
            </a>
          </div>
        </section>

        {/* Section 5: CARB Emissions */}
        <section id="carb">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#003087] mb-2">Section 5</div>
              <h2 className="text-2xl font-bold text-gray-900">CARB Emissions Compliance</h2>
              <div className="text-sm text-gray-500 mt-1">California Air Resources Board · Innovative Clean Transit Rule</div>
            </div>
            <ComplianceBadge label="CARB Certified" status="certified" />
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-bold text-gray-900 mb-3">ZEPS — Innovative Clean Transit (ICT) Compliant</div>
                <p className="text-gray-600 text-sm mb-4">
                  The ZEPS battery-electric conversion meets CARB&apos;s Innovative Clean Transit (ICT) rule requirements. ZEPS-converted buses qualify as zero-emission vehicles for California compliance purposes, enabling agencies to meet fleet electrification mandates at significantly lower cost than purchasing new OEM electric buses.
                </p>
                <p className="text-gray-600 text-sm">
                  ZEPS conversions are also eligible for HVIP (Hybrid and Zero-Emission Truck and Bus Voucher Incentive Project) vouchers, reducing net cost further.
                </p>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-3">CNG Repower — CARB L9N Certified</div>
                <p className="text-gray-600 text-sm mb-4">
                  CCW&apos;s CNG repower service installs the CARB-certified Cummins L9N natural gas engine. The L9N is certified under CARB&apos;s omnibus regulation (13 CCR § 2022) for low NOx emissions — 0.02 g/bhp-hr NOx vs. 0.2 g for standard CNG.
                </p>
                <p className="text-gray-600 text-sm">
                  L9N repowers extend bus service life while meeting current and near-term CARB fleet regulations.
                </p>
              </div>
            </div>
            <a href="mailto:compliance@completecoach.com" className="inline-flex items-center bg-[#003087] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#002070] transition-colors text-sm">
              Request CARB Certification Documents →
            </a>
          </div>
        </section>

        {/* Section 6: SAM.gov */}
        <section id="sam-gov">
          <div className="text-xs font-bold uppercase tracking-widest text-[#003087] mb-2">Section 6</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SAM.gov Registration</h2>
          <SAMGovBadge
            uei="QN7UN15K9NP2"
            cage="1QA89"
            expiryDate="2026-08-25"
            naicsCodes={['336999', '811310', '336212', '336211']}
          />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { code: '336999', desc: 'Other Transportation Equipment Mfg' },
              { code: '811310', desc: 'Commercial & Industrial Mach. Repair' },
              { code: '336212', desc: 'Truck Trailer Manufacturing' },
              { code: '336211', desc: 'Motor Vehicle Body Manufacturing' },
            ].map(n => (
              <div key={n.code} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="font-bold text-[#003087] font-mono text-lg">{n.code}</div>
                <div className="text-xs text-gray-500 mt-1">{n.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Pre-Award & Post-Delivery */}
        <section id="pre-award">
          <div className="text-xs font-bold uppercase tracking-widest text-[#003087] mb-2">Section 7</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pre-Award & Post-Delivery Support</h2>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 mb-6">
              CCW provides full FTA-required documentation packages for both pre-award and post-delivery audits.
              Our compliance team coordinates directly with agency procurement staff to ensure smooth FTA review.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-[#003087] text-white text-xs px-2 py-1 rounded font-bold">PRE-AWARD</span>
                  Pre-Award Audit Package
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  {['Buy America certification (49 CFR Part 661)', 'DBE plan and current goal documentation', 'TVM registration confirmation', 'Financial capacity documentation', 'Insurance certificates', 'Past performance references (TriMet, IndyGo, OCTA, SF Muni)'].map(item => (
                    <li key={item} className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">POST-DELIVERY</span>
                  Post-Delivery Audit Package
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  {['Buy America compliance certification', 'Component sourcing documentation', 'ADA compliance certification', 'CARB certification (ZEPS/CNG)', 'Warranty documentation', 'NTD A-30 data package (vehicle records for agency NTD filing)'].map(item => (
                    <li key={item} className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a href="mailto:compliance@completecoach.com" className="inline-flex items-center bg-[#003087] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#002070] transition-colors">
                Start Compliance Documentation Process →
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
