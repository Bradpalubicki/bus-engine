'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Bus, LayoutDashboard, ClipboardList, FileText,
  TrendingUp, DollarSign, BarChart3, Package, Users, Shield, Wrench,
  MapPin, Globe, Building2, Lock, ChevronLeft, ChevronRight, Settings, HelpCircle, Rocket,
  Truck, ChevronDown, ChevronUp, ExternalLink, Newspaper, UserCog,
} from 'lucide-react'

const ccwNav = [
  { label: 'Command Center', href: '/dashboard',              icon: LayoutDashboard },
  { label: 'Fleet',          href: '/dashboard/fleet',         icon: Bus },
  { label: 'Work Orders',    href: '/dashboard/work-orders',   icon: ClipboardList },
  { label: 'Contracts',      href: '/dashboard/contracts',     icon: FileText },
  { label: 'Finance',        href: '/dashboard/finance',       icon: DollarSign },
  { label: 'Pipeline',       href: '/dashboard/pipeline',      icon: TrendingUp },
  { label: 'Analytics',      href: '/dashboard/analytics',     icon: BarChart3 },
  { label: 'HR',             href: '/dashboard/hr',            icon: Users },
  { label: 'Vendors',        href: '/dashboard/vendors',       icon: Building2 },
  { label: 'Compliance',     href: '/dashboard/compliance',    icon: Shield },
  { label: 'Insurance',      href: '/dashboard/insurance',     icon: Lock },
  { label: 'Parts',          href: '/dashboard/parts',         icon: Wrench },
  { label: 'Locations',      href: '/dashboard/locations',     icon: MapPin },
  { label: 'Federal Opp.',   href: '/dashboard/federal',       icon: Globe },
  { label: 'Owner View',     href: '/dashboard/owner',         icon: DollarSign },
  { label: 'News & Blog',    href: '/dashboard/news',          icon: Newspaper },
  { label: 'Staff Manager',  href: '/dashboard/staff',         icon: UserCog },
]

const tsiNav = [
  { label: 'Bus Inventory',  href: '/dashboard/inventory',    icon: Package },
  { label: 'View TSI Site',  href: '/tsi',                    icon: ExternalLink, external: true },
]

const sblNav = [
  { label: 'Lease Fleet',    href: '/dashboard/inventory',    icon: Truck },
  { label: 'View SBL Site',  href: '/sbl',                    icon: ExternalLink, external: true },
]

const bottomNav = [
  { label: 'Launch Checklist', href: '/dashboard/launch-checklist', icon: Rocket },
  { label: 'Settings',         href: '/dashboard/settings',         icon: Settings },
  { label: 'Help',             href: '/dashboard/help',             icon: HelpCircle },
]

type NavItem = { label: string; href: string; icon: React.ElementType; external?: boolean }

function NavSection({ items, pathname, collapsed }: { items: NavItem[]; pathname: string; collapsed: boolean }) {
  return (
    <>
      {items.map((item) => {
        const isActive = item.href === '/dashboard'
          ? pathname === '/dashboard'
          : pathname.startsWith(item.href)
        return (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            title={collapsed ? item.label : undefined}
            className={`flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-colors ${
              isActive && !item.external
                ? 'bg-[#E8A020] text-white'
                : 'text-blue-200 hover:bg-blue-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
          </Link>
        )
      })}
    </>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [tsiOpen, setTsiOpen] = useState(true)
  const [sblOpen, setSblOpen] = useState(true)

  return (
    <aside
      className={`flex flex-col bg-[#003087] text-white h-full transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-blue-800">
        <div className="w-9 h-9 bg-[#E8A020] rounded-lg flex items-center justify-center flex-shrink-0">
          <Bus className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-bold text-sm leading-tight whitespace-nowrap">Complete Coach Works</div>
            <div className="text-xs text-blue-300 leading-tight">Operations Platform</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {/* CCW Section */}
        {!collapsed && (
          <div className="px-2.5 pb-1 pt-1 text-xs font-bold text-blue-400 uppercase tracking-widest">CCW</div>
        )}
        <NavSection items={ccwNav} pathname={pathname} collapsed={collapsed} />

        {/* TSI Section */}
        <div className="pt-3">
          {!collapsed ? (
            <button
              onClick={() => setTsiOpen(!tsiOpen)}
              className="w-full flex items-center justify-between px-2.5 pb-1 text-xs font-bold text-[#60a5fa] uppercase tracking-widest hover:text-white transition-colors"
            >
              <span>TSI — Bus Sales</span>
              {tsiOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          ) : (
            <div className="border-t border-blue-800 my-1" />
          )}
          {(tsiOpen || collapsed) && (
            <NavSection items={tsiNav} pathname={pathname} collapsed={collapsed} />
          )}
        </div>

        {/* SBL Section */}
        <div className="pt-2">
          {!collapsed ? (
            <button
              onClick={() => setSblOpen(!sblOpen)}
              className="w-full flex items-center justify-between px-2.5 pb-1 text-xs font-bold text-green-400 uppercase tracking-widest hover:text-white transition-colors"
            >
              <span>SBL — Leasing</span>
              {sblOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          ) : (
            <div className="border-t border-blue-800 my-1" />
          )}
          {(sblOpen || collapsed) && (
            <NavSection items={sblNav} pathname={pathname} collapsed={collapsed} />
          )}
        </div>
      </nav>

      {/* Bottom Nav + Collapse */}
      <div className="border-t border-blue-800 p-2 space-y-0.5">
        {bottomNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-blue-200 hover:bg-blue-800 hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-blue-300 hover:bg-blue-800 hover:text-white transition-colors"
        >
          {collapsed
            ? <ChevronRight className="w-5 h-5" />
            : <><ChevronLeft className="w-5 h-5" /><span className="text-sm">Collapse</span></>
          }
        </button>
      </div>
    </aside>
  )
}
