import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Complete Coach Works',
  description: 'Cookie policy for completecoach.com — how we use cookies and how you can manage your preferences.',
  alternates: { canonical: 'https://completecoach.com/cookies' },
}

export default function CookiePolicyPage() {
  return (
    <main className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <div className="text-sm font-bold text-[#E8A020] uppercase tracking-widest mb-3">Legal</div>
          <h1 className="text-4xl font-bold text-[#003087] mb-4">Cookie Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: March 2026 | Applies to: completecoach.com, transitsales.com, sblbus.com, zepsdrive.com</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#003087]">1. What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences and understand how you use the site. Complete Coach Works uses cookies on completecoach.com and affiliated brand sites operated by Carson Capital Corp.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087]">2. Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-[#003087] text-white">
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">Essential</td>
                    <td className="border border-gray-200 px-4 py-2">Required for the website to function. Cannot be disabled.</td>
                    <td className="border border-gray-200 px-4 py-2">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium">Preference</td>
                    <td className="border border-gray-200 px-4 py-2">Remembers your cookie consent choice.</td>
                    <td className="border border-gray-200 px-4 py-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">Analytics</td>
                    <td className="border border-gray-200 px-4 py-2">Helps us understand how visitors use the site (page views, session duration, referral source). No personally identifiable information is stored.</td>
                    <td className="border border-gray-200 px-4 py-2">Up to 2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087]">3. Your Consent Choices</h2>
            <p>When you first visit our site, you will see a cookie consent banner. You may:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Accept</strong> — all cookies including analytics will be active.</li>
              <li><strong>Decline</strong> — only essential cookies will be used. Analytics and preference cookies will not be set.</li>
            </ul>
            <p className="mt-3">Your choice is stored in your browser&apos;s local storage under the key <code className="bg-gray-100 px-1 rounded text-sm">ccw-cookie-consent</code>. To change your preference, clear your browser local storage or contact us.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087]">4. Third-Party Cookies</h2>
            <p>We do not embed third-party advertising networks or social media tracking pixels. Our site may link to third-party services (LinkedIn, YouTube) that set their own cookies when you interact with embedded content on those platforms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087]">5. How to Manage Cookies</h2>
            <p>In addition to using our consent banner, you can control cookies through your browser settings:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Options → Privacy &amp; Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Cookies and Site Permissions</li>
            </ul>
            <p className="mt-3">Note that disabling all cookies may affect the functionality of this website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#003087]">6. Contact</h2>
            <p>For questions about our cookie practices, contact:</p>
            <p className="mt-2">
              <strong>Complete Coach Works</strong><br />
              1863 Service Court, Riverside, CA 92507<br />
              <a href="mailto:info@completecoach.com" className="text-[#003087] underline">info@completecoach.com</a><br />
              (951) 372-0082
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex gap-4 text-sm">
          <Link href="/privacy-policy" className="text-[#003087] hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-[#003087] hover:underline">Terms of Use</Link>
          <Link href="/" className="text-[#003087] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
