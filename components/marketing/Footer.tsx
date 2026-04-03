'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import { usePathname } from 'next/navigation'

const brandFooter = {
  CCW: {
    address: '1863 Service Court\nRiverside, CA 92507',
    phone: '(951) 372-0082',
    tel: '9513720082',
    email: 'info@completecoach.com',
    linkedin: 'https://www.linkedin.com/company/complete-coach-works/',
    facebook: 'https://www.facebook.com/completecoachworks/',
    twitter: 'https://twitter.com/CCWbus',
    copy: '© 2026 Complete Coach Works. All rights reserved. | Employee-Owned Since 2021',
  },
  TSI: {
    address: '25280 Nance Street\nMurrieta, CA 92562',
    phone: '(951) 684-9585',
    tel: '9516849585',
    email: 'info@transitsales.com',
    linkedin: 'https://www.linkedin.com/company/transit-sales-international/',
    facebook: 'https://www.facebook.com/completecoachworks/',
    twitter: null,
    copy: '© 2026 Transit Sales International. All rights reserved. | A Carson Capital Corp Company',
  },
  SBL: {
    address: '1313 Columbia Ave\nRiverside, CA 92507',
    phone: '(951) 684-9585',
    tel: '9516849585',
    email: 'info@completecoach.com',
    linkedin: 'https://www.linkedin.com/company/complete-coach-works/',
    facebook: 'https://www.facebook.com/completecoachworks/',
    twitter: null,
    copy: '© 2026 Shuttle Bus Leasing. All rights reserved. | A Carson Capital Corp Company',
  },
  ZEPS: {
    address: 'Manufactured by Complete Coach Works\n1863 Service Court\nRiverside, CA 92507',
    phone: '(951) 372-0082',
    tel: '9513720082',
    email: 'info@completecoach.com',
    linkedin: 'https://www.linkedin.com/company/complete-coach-works/',
    facebook: 'https://www.facebook.com/completecoachworks/',
    twitter: null,
    copy: '© 2026 ZEPS Drive by Complete Coach Works. All rights reserved.',
  },
}

export default function Footer() {
  const pathname = usePathname()
  const isTSI  = pathname.startsWith('/tsi')
  const isSBL  = pathname.startsWith('/sbl')
  const isZEPS = pathname.startsWith('/zeps')
  const brand  = isTSI ? 'TSI' : isSBL ? 'SBL' : isZEPS ? 'ZEPS' : 'CCW'
  const f = brandFooter[brand]

  return (
    <footer className="bg-[#003087] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Image
                src="https://completecoach.com/wp-content/uploads/2024/08/CCW_NEW2023-3.png"
                alt="Complete Coach Works"
                width={160}
                height={54}
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-blue-200 text-sm mb-4">The Nation&apos;s Largest Transit Bus Remanufacturing Company. 100% Employee-Owned since 2021.</p>
            <div className="flex items-center gap-3">
              <a href={f.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-[#E8A020] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-[#E8A020] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              {f.twitter && (
                <a href={f.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                  className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-[#E8A020] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[#E8A020]">Services</h4>
            <ul className="space-y-1.5 text-sm text-blue-200">
              <li><Link href="/services/midlife-overhaul" className="hover:text-white">Midlife Overhaul</Link></li>
              <li><Link href="/services/cng-repower" className="hover:text-white">CNG / LNG Repower</Link></li>
              <li><Link href="/zeps" className="hover:text-white">ZEPS Electric</Link></li>
              <li><Link href="/services/body-paint" className="hover:text-white">Body &amp; Paint</Link></li>
              <li><Link href="/services/interior-rehab" className="hover:text-white">Interior Rehab</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[#E8A020]">Company</h4>
            <ul className="space-y-1.5 text-sm text-blue-200">
              <li><Link href="/about" className="hover:text-white">About CCW</Link></li>
              <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link href="/dbe" className="hover:text-white">DBE Program</Link></li>
              <li><Link href="/locations" className="hover:text-white">13 Locations</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/dashboard/ccw" className="hover:text-white">Client Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[#E8A020]">Contact</h4>
            <p className="text-blue-200 text-sm whitespace-pre-line mb-3">{f.address}</p>
            <a href={`tel:${f.tel}`} className="text-blue-200 text-sm hover:text-white block mb-1">{f.phone}</a>
            <a href={`mailto:${f.email}`} className="text-blue-200 text-sm hover:text-white block">{f.email}</a>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-blue-300 gap-3">
            <p>{f.copy}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
              <a href="https://www.healthplan.org/legal/machine_readable_files" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Machine-Readable Files
              </a>
              <span>FTA Certified &middot; Buy America Compliant &middot; CARB Approved</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-xs text-blue-500">Built by <a href="https://nustack.digital" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">NuStack Digital Ventures</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
