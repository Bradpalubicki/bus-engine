import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Complete Coach Works',
  description: 'Privacy policy for completecoach.com — how we collect, use, and protect your information.',
  alternates: { canonical: 'https://completecoach.com/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">Legal</div>
          <h1 className="text-4xl font-bold text-[#003087] mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Effective date: April 1, 2026 · Last updated: April 1, 2026</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">1. Who We Are</h2>
            <p>This Privacy Policy applies to <strong>Complete Coach Works</strong> ("CCW," "we," "our," or "us"), a California-based transit bus remanufacturing company operating at <a href="https://completecoach.com" className="text-[#003087] underline">completecoach.com</a>. CCW is part of the Carson Capital Corp family of companies, which includes Transit Sales International (TSI), Shuttle Bus Leasing (SBL), and ZEPS Drive.</p>
            <p className="mt-3">Data controller contact: <a href="mailto:brad@nustack.digital" className="text-[#003087] underline">brad@nustack.digital</a></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly and information collected automatically when you visit our site.</p>
            <h3 className="font-semibold text-gray-900 mt-4 mb-2">Information you provide:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Name, email address, phone number, and organization when you submit a contact or inquiry form</li>
              <li>Job title, fleet size, and procurement details when requesting a quote or assessment</li>
              <li>Communications you send us via email or the site</li>
            </ul>
            <h3 className="font-semibold text-gray-900 mt-4 mb-2">Information collected automatically:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>IP address, browser type, operating system, referring URL</li>
              <li>Pages visited, time on page, clicks, and navigation paths</li>
              <li>Device identifiers and cookie data (see Section 4)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>To respond to inquiries, quote requests, and contact form submissions</li>
              <li>To provide fleet assessment and technical consultation services</li>
              <li>To send follow-up communications you have requested</li>
              <li>To improve the performance, content, and usability of our website</li>
              <li>To analyze traffic patterns and measure the effectiveness of our content</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-3 text-sm">We do not sell your personal information to third parties. We do not use your information for automated decision-making or profiling.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">4. Cookies & Analytics</h2>
            <p>We use cookies and similar tracking technologies to operate and improve our website.</p>
            <h3 className="font-semibold text-gray-900 mt-4 mb-2">Types of cookies we use:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#003087] text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Essential</td>
                    <td className="px-4 py-3 text-gray-600">Site functionality, session management</td>
                    <td className="px-4 py-3 text-gray-600">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Analytics</td>
                    <td className="px-4 py-3 text-gray-600">Google Analytics 4 — traffic and usage measurement</td>
                    <td className="px-4 py-3 text-gray-600">Up to 2 years</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Preferences</td>
                    <td className="px-4 py-3 text-gray-600">Cookie consent status, UI preferences</td>
                    <td className="px-4 py-3 text-gray-600">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm">We use <strong>Google Analytics 4</strong> to understand how visitors use our site. Google Analytics collects data under Google's own privacy policy. You can opt out of Google Analytics using the <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#003087] underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-Out Browser Add-on</a>.</p>
            <p className="mt-3 text-sm">You can control cookies through your browser settings. Disabling cookies may limit some site functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">5. Third-Party Services</h2>
            <p className="text-sm">We use the following third-party services that may process your information:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm mt-3">
              <li><strong>Google Analytics 4</strong> — website traffic analysis (<a href="https://policies.google.com/privacy" className="text-[#003087] underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>)</li>
              <li><strong>Vercel</strong> — website hosting and CDN (<a href="https://vercel.com/legal/privacy-policy" className="text-[#003087] underline" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>)</li>
              <li><strong>Vapi.ai</strong> — AI voice assistant functionality on this site (<a href="https://vapi.ai/privacy" className="text-[#003087] underline" target="_blank" rel="noopener noreferrer">Vapi Privacy Policy</a>)</li>
            </ul>
            <p className="mt-3 text-sm">Each third-party service operates under its own privacy policy. We are not responsible for the privacy practices of these services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">6. Data Retention</h2>
            <p className="text-sm">We retain personal information you submit through contact forms for as long as necessary to respond to your inquiry and maintain our business records — typically no longer than 3 years. Analytics data is retained per Google's standard retention settings (up to 14 months by default). You may request deletion at any time (see Section 8).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">7. Data Security</h2>
            <p className="text-sm">We implement industry-standard security measures to protect your information, including HTTPS encryption on all pages, access controls, and secure hosting infrastructure. No method of transmission over the internet is 100% secure — we cannot guarantee absolute security, but we take reasonable steps to protect your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">8. Your Rights — California Residents (CCPA)</h2>
            <p className="text-sm">If you are a California resident, the California Consumer Privacy Act (CCPA) grants you the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm mt-3">
              <li><strong>Right to Know:</strong> You may request disclosure of the categories and specific pieces of personal information we have collected about you in the past 12 months.</li>
              <li><strong>Right to Delete:</strong> You may request that we delete personal information we have collected from you, subject to certain exceptions.</li>
              <li><strong>Right to Opt-Out:</strong> We do not sell personal information. There is nothing to opt out of.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
            </ul>
            <p className="mt-3 text-sm">To exercise any of these rights, contact us at <a href="mailto:brad@nustack.digital" className="text-[#003087] underline">brad@nustack.digital</a>. We will respond within 45 days as required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">9. Children's Privacy</h2>
            <p className="text-sm">This website is intended for transit industry professionals and government procurement officers. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will delete it promptly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">10. Changes to This Policy</h2>
            <p className="text-sm">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the site after changes constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">11. Contact Us</h2>
            <p className="text-sm">For privacy-related questions, requests, or concerns:</p>
            <div className="mt-3 bg-[#F8F9FB] rounded-xl p-6 border border-gray-200 text-sm space-y-1">
              <div className="font-bold text-[#003087]">Complete Coach Works</div>
              <div>1863 Service Court, Riverside, CA 92507</div>
              <div>Email: <a href="mailto:brad@nustack.digital" className="text-[#003087] underline">brad@nustack.digital</a></div>
              <div>Phone: <a href="tel:8003003751" className="text-[#003087] underline">(800) 300-3751</a></div>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="text-[#003087] hover:underline font-medium">Terms of Use</Link>
          <Link href="/contact" className="text-[#003087] hover:underline font-medium">Contact Us</Link>
          <Link href="/" className="text-[#003087] hover:underline font-medium">← Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
