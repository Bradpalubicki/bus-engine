import { NavBar } from '@/components/marketing/NavBar'
import Footer from '@/components/marketing/Footer'
import AIChat from '@/components/marketing/AIChat'
import CookieBanner from '@/components/marketing/CookieBanner'
import ExitIntentModal from '@/components/marketing/ExitIntentModal'
import MobileCTABar from '@/components/marketing/MobileCTABar'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#003087] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <NavBar />
      <main id="main-content" className="flex-1 pt-20">{children}</main>
      <Footer />
      <AIChat />
      <CookieBanner />
      <ExitIntentModal />
      <MobileCTABar />
    </div>
  )
}
