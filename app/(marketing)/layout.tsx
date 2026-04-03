import { NavBar } from '@/components/marketing/NavBar'
import Footer from '@/components/marketing/Footer'
import AIChat from '@/components/marketing/AIChat'
import CookieBanner from '@/components/marketing/CookieBanner'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <AIChat />
      <CookieBanner />
    </div>
  )
}
