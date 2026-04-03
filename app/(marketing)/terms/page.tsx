import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use | Complete Coach Works',
  description: 'Terms and conditions for use of the Complete Coach Works website.',
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <main className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">Legal</div>
          <h1 className="text-4xl font-bold text-[#003087] mb-3">Terms of Use</h1>
          <p className="text-gray-500 text-sm">Effective date: April 1, 2026 · Last updated: April 1, 2026</p>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm">By accessing or using this website (<strong>completecoach.com</strong> and associated subpages for TSI, SBL, and ZEPS Drive), you agree to be bound by these Terms of Use and our <Link href="/privacy-policy" className="text-[#003087] underline">Privacy Policy</Link>. If you do not agree to these terms, please do not use this site.</p>
            <p className="mt-3 text-sm">These terms apply to all visitors, users, and others who access or use the site. "We," "us," and "our" refer to Complete Coach Works and the Carson Capital Corp family of companies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">2. Use of the Site</h2>
            <p className="text-sm">This website is provided for informational and business purposes. You may use the site to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-3">
              <li>Learn about CCW services, fleet solutions, and ZEPS electric conversions</li>
              <li>Browse transit bus inventory offered by Transit Sales International</li>
              <li>Submit inquiries, quote requests, and contact forms</li>
              <li>Access news, resources, and compliance documentation</li>
            </ul>
            <p className="mt-4 text-sm">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Use the site for any unlawful purpose or in violation of any applicable laws</li>
              <li>Scrape, crawl, or systematically extract data from the site without written permission</li>
              <li>Attempt to gain unauthorized access to any portion of the site or its underlying systems</li>
              <li>Transmit any harmful, offensive, or disruptive content through the site's forms or channels</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any organization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">3. Intellectual Property</h2>
            <p className="text-sm">All content on this site — including text, images, graphics, logos, videos, and technical documentation — is the property of Complete Coach Works or its licensors and is protected by U.S. copyright and trademark law.</p>
            <p className="mt-3 text-sm">You may view and print pages for personal, non-commercial informational use only. You may not reproduce, distribute, modify, create derivative works of, or publicly display any content without prior written permission from CCW.</p>
            <p className="mt-3 text-sm">The Complete Coach Works name and logo, the ZEPS mark, and related marks are trademarks of Complete Coach Works or Carson Capital Corp. Nothing on this site grants any license to use these marks.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">4. Informational Purpose Only</h2>
            <p className="text-sm">The content on this site is provided for general informational purposes. Specifications, pricing, inventory availability, and service details are subject to change without notice. Nothing on this site constitutes a binding offer, contract, or warranty.</p>
            <p className="mt-3 text-sm">Procurement of services or equipment is governed by separate written agreements between CCW and the purchasing agency or entity. Contact our sales team for current specifications and terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-sm">THIS SITE AND ITS CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, COMPLETE COACH WORKS DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            <p className="mt-3 text-sm">We do not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or timeliness of any content on the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">6. Limitation of Liability</h2>
            <p className="text-sm">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, COMPLETE COACH WORKS AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF — OR INABILITY TO USE — THIS SITE OR ITS CONTENT.</p>
            <p className="mt-3 text-sm">THIS INCLUDES, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
            <p className="mt-3 text-sm">Our total liability to you for any claim arising from use of this site shall not exceed one hundred dollars ($100).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">7. Third-Party Links</h2>
            <p className="text-sm">This site may contain links to third-party websites (including agency portals, government databases, and partner organizations). These links are provided for convenience only. We have no control over the content or privacy practices of third-party sites and accept no responsibility for them. Linking does not imply endorsement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">8. AI Chat Assistant</h2>
            <p className="text-sm">This site includes an AI-powered fleet advisor assistant. Responses generated by the AI assistant are for informational purposes only and do not constitute professional advice, binding commitments, or contractual offers. Always confirm specifications, pricing, and availability with a CCW sales representative.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">9. Governing Law</h2>
            <p className="text-sm">These Terms of Use are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any dispute arising from these terms or your use of the site shall be resolved in the state or federal courts located in Riverside County, California, and you consent to personal jurisdiction in those courts.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">10. Changes to These Terms</h2>
            <p className="text-sm">We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to this page with an updated date. Your continued use of the site after changes are posted constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087] mb-3">11. Contact</h2>
            <p className="text-sm">Questions about these terms? Contact us:</p>
            <div className="mt-3 bg-[#F8F9FB] rounded-xl p-6 border border-gray-200 text-sm space-y-1">
              <div className="font-bold text-[#003087]">Complete Coach Works</div>
              <div>1863 Service Court, Riverside, CA 92507</div>
              <div>Email: <a href="mailto:brad@nustack.digital" className="text-[#003087] underline">brad@nustack.digital</a></div>
              <div>Phone: <a href="tel:8003003751" className="text-[#003087] underline">(800) 300-3751</a></div>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy-policy" className="text-[#003087] hover:underline font-medium">Privacy Policy</Link>
          <Link href="/contact" className="text-[#003087] hover:underline font-medium">Contact Us</Link>
          <Link href="/" className="text-[#003087] hover:underline font-medium">← Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
