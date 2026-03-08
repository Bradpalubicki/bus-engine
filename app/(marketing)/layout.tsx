import { NavBar } from '@/components/marketing/NavBar'
import Link from 'next/link'
import { Bus } from 'lucide-react'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#003087] text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#E8A020] rounded flex items-center justify-center">
                  <Bus className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">Complete Coach Works</span>
              </div>
              <p className="text-blue-200 text-sm">The Nation&apos;s Largest Transit Bus Remanufacturing Company. 100% Employee-Owned since 2021.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#E8A020]">Services</h4>
              <ul className="space-y-1.5 text-sm text-blue-200">
                <li><Link href="/services/midlife-overhaul" className="hover:text-white">Midlife Overhaul</Link></li>
                <li><Link href="/services/cng-repower" className="hover:text-white">CNG / LNG Repower</Link></li>
                <li><Link href="/services/zeps-electric" className="hover:text-white">ZEPS Electric</Link></li>
                <li><Link href="/services/body-paint" className="hover:text-white">Body &amp; Paint</Link></li>
                <li><Link href="/services/interior-rehab" className="hover:text-white">Interior Rehab</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#E8A020]">Company</h4>
              <ul className="space-y-1.5 text-sm text-blue-200">
                <li><Link href="/about" className="hover:text-white">About CCW</Link></li>
                <li><Link href="/locations" className="hover:text-white">10 Locations</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Operations Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#E8A020]">Headquarters</h4>
              <p className="text-blue-200 text-sm">1863 Service Court<br />Riverside, CA 92507<br /><br />(951) 684-9585<br />info@completecoach.com</p>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-blue-300">
            <p>&copy; {new Date().getFullYear()} Complete Coach Works. All rights reserved.</p>
            <p className="mt-2 md:mt-0">FTA Certified &middot; Buy America Compliant &middot; CARB Approved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
