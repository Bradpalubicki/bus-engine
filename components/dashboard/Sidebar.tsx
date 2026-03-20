'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Bus, LayoutDashboard, ClipboardList, FileText,
  TrendingUp, DollarSign, BarChart3, Package, Users, Shield, Wrench,
  MapPin, Globe, Building2, Lock, ChevronLeft, ChevronRight, Settings, HelpCircle, Rocket,
  Truck, ChevronDown, ChevronUp, ExternalLink, Newspaper, UserCog, ClipboardCheck,
} from 'lucide-react'

type Company = 'CCW' | 'TSI' | 'SBL'

const COMPANIES: { id: Company; label: string; sub: string; color: string }[] = [
  { id: 'CCW', label: 'Complete Coach Works', sub: 'Operations Platform', color: '#E8A020' },
  { id: 'TSI', label: 'Transit Sales Intl.', sub: 'Bus Sales & Inventory', color: '#2563eb' },
  { id: 'SBL', label: 'Shuttle Bus Leasing', sub: 'Fleet Leasing', color: '#16a34a' },
]

type NavGroup = {
  label: string
  items: NavItem[]
}

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
  external?: boolean
}

const CCW_GROUPS: NavGroup[] = [
  {
    label: 'Operations',
    items: [
      { label: 'Command Center', href: '/dashboard',                   icon: LayoutDashboard },
      { label: 'Fleet',          href: '/dashboard/fleet',              icon: Bus },
      { label: 'Work Orders',    href: '/dashboard/work-orders',        icon: ClipboardList },
      { label: 'Inspections',      href: '/dashboard/fleet/inspect',        icon: ClipboardCheck },
      { label: 'Fleet Intel',      href: '/dashboard/fleet-intelligence',   icon: MapPin },
      { label: 'Expansion',        href: '/dashboard/expansion-analysis',   icon: TrendingUp },
      { label: 'Maintenance',      href: '/dashboard/maintenance',          icon: Wrench },
      { label: 'Technicians',      href: '/dashboard/technicians',          icon: Users },
      { label: 'Parts',            href: '/dashboard/parts',                icon: Wrench },
    ],
  },
  {
    label: 'Business',
    items: [
      { label: 'Contracts',  href: '/dashboard/contracts', icon: FileText },
      { label: 'Finance',    href: '/dashboard/finance',   icon: DollarSign },
      { label: 'Pipeline',   href: '/dashboard/pipeline',  icon: TrendingUp },
      { label: 'Vendors',    href: '/dashboard/vendors',   icon: Building2 },
    ],
  },
  {
    label: 'Compliance',
    items: [
      { label: 'Compliance Docs', href: '/dashboard/compliance', icon: Shield },
      { label: 'Insurance',       href: '/dashboard/insurance',  icon: Lock },
      { label: 'Federal Opp.',    href: '/dashboard/federal',    icon: Globe },
      { label: 'Fleet Intel Map', href: '/fleet-map',            icon: MapPin, external: true },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'HR',         href: '/dashboard/hr',        icon: Users },
      { label: 'Locations',  href: '/dashboard/locations', icon: MapPin },
      { label: 'Owner View', href: '/dashboard/owner',     icon: DollarSign },
      { label: 'Analytics',  href: '/dashboard/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Website',
    items: [
      { label: 'News & Blog',     href: '/dashboard/news',      icon: Newspaper },
      { label: 'Staff Manager',   href: '/dashboard/staff',     icon: UserCog },
      { label: 'TSI Inventory',   href: '/dashboard/inventory', icon: Package },
      { label: 'View CCW Site',   href: '/',                    icon: ExternalLink, external: true },
    ],
  },
]

const TSI_GROUPS: NavGroup[] = [
  {
    label: 'Operations',
    items: [
      { label: 'Bus Inventory',   href: '/dashboard/inventory',        icon: Package },
      { label: 'Sales Pipeline',  href: '/dashboard/tsi-pipeline',     icon: TrendingUp },
      { label: 'Buyer Leads',     href: '/dashboard/tsi-leads',        icon: Users },
      { label: 'Analytics',       href: '/dashboard/analytics',        icon: BarChart3 },
    ],
  },
  {
    label: 'Business',
    items: [
      { label: 'Contracts',  href: '/dashboard/contracts', icon: FileText },
      { label: 'Finance',    href: '/dashboard/finance',   icon: DollarSign },
    ],
  },
  {
    label: 'Website',
    items: [
      { label: 'View TSI Site', href: '/tsi', icon: ExternalLink, external: true },
    ],
  },
]

const SBL_GROUPS: NavGroup[] = [
  {
    label: 'Operations',
    items: [
      { label: 'Active Leases',      href: '/dashboard/leases',       icon: Truck },
      { label: 'Fleet Utilization',  href: '/dashboard/sbl-fleet',    icon: BarChart3 },
      { label: 'Payments Due',       href: '/dashboard/sbl-payments', icon: DollarSign },
      { label: 'Analytics',          href: '/dashboard/analytics',    icon: BarChart3 },
    ],
  },
  {
    label: 'Business',
    items: [
      { label: 'Contracts',  href: '/dashboard/contracts', icon: FileText },
      { label: 'Finance',    href: '/dashboard/finance',   icon: DollarSign },
    ],
  },
  {
    label: 'Website',
    items: [
      { label: 'View SBL Site', href: '/sbl', icon: ExternalLink, external: true },
    ],
  },
]

const GROUPS_BY_COMPANY: Record<Company, NavGroup[]> = {
  CCW: CCW_GROUPS,
  TSI: TSI_GROUPS,
  SBL: SBL_GROUPS,
}

const bottomNav: NavItem[] = [
  { label: 'Launch Checklist', href: '/dashboard/launch-checklist', icon: Rocket },
  { label: 'Settings',         href: '/dashboard/settings',         icon: Settings },
  { label: 'Help',             href: '/dashboard/help',             icon: HelpCircle },
]

function NavLink({ item, pathname, collapsed }: { item: NavItem; pathname: string; collapsed: boolean }) {
  const isActive = item.href === '/dashboard'
    ? pathname === '/dashboard'
    : pathname.startsWith(item.href) && item.href !== '/'
  return (
    <Link
      href={item.href}
      target={item.external ? '_blank' : undefined}
      title={collapsed ? item.label : undefined}
      className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors ${
        isActive && !item.external
          ? 'bg-[#E8A020] text-white'
          : 'text-blue-200 hover:bg-blue-800 hover:text-white'
      }`}
    >
      <item.icon className="w-4 h-4 flex-shrink-0" />
      {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
    </Link>
  )
}

function NavGroupSection({
  group,
  pathname,
  collapsed,
  openGroups,
  onToggle,
}: {
  group: NavGroup
  pathname: string
  collapsed: boolean
  openGroups: Set<string>
  onToggle: (label: string) => void
}) {
  const isOpen = openGroups.has(group.label)
  const hasActive = group.items.some(item =>
    item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href) && item.href !== '/'
  )

  if (collapsed) {
    return (
      <>
        <div className="border-t border-blue-800 my-1" />
        {group.items.map(item => (
          <NavLink key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
        ))}
      </>
    )
  }

  return (
    <div className="pt-1">
      <button
        onClick={() => onToggle(group.label)}
        className={`w-full flex items-center justify-between px-2.5 py-1 text-xs font-bold uppercase tracking-widest transition-colors ${
          hasActive ? 'text-[#E8A020]' : 'text-blue-400 hover:text-white'
        }`}
      >
        <span>{group.label}</span>
        {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {isOpen && (
        <div className="space-y-0.5 mt-0.5">
          {group.items.map(item => (
            <NavLink key={item.href + item.label} item={item} pathname={pathname} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [company, setCompany] = useState<Company>('CCW')
  const [companyOpen, setCompanyOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(['Operations', 'Business'])
  )

  const groups = GROUPS_BY_COMPANY[company]
  const activeCompany = COMPANIES.find(c => c.id === company)!

  function toggleGroup(label: string) {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  function switchCompany(id: Company) {
    setCompany(id)
    setCompanyOpen(false)
    setOpenGroups(new Set(['Operations', 'Business']))
  }

  return (
    <aside
      className={`flex flex-col bg-[#003087] text-white h-full transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } flex-shrink-0`}
    >
      {/* Company Switcher */}
      <div className="relative border-b border-blue-800">
        <button
          onClick={() => !collapsed && setCompanyOpen(!companyOpen)}
          title={collapsed ? activeCompany.label : undefined}
          className="w-full flex items-center gap-3 px-4 py-4 hover:bg-blue-800 transition-colors"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: activeCompany.color }}
          >
            <Bus className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <>
              <div className="overflow-hidden flex-1 text-left">
                <div className="font-bold text-sm leading-tight whitespace-nowrap truncate">{activeCompany.label}</div>
                <div className="text-xs text-blue-300 leading-tight">{activeCompany.sub}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-blue-300 flex-shrink-0 transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>

        {/* Dropdown */}
        {companyOpen && !collapsed && (
          <div className="absolute top-full left-0 right-0 z-50 bg-[#002070] border border-blue-700 rounded-b-lg shadow-xl">
            {COMPANIES.map(c => (
              <button
                key={c.id}
                onClick={() => switchCompany(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-800 transition-colors ${
                  c.id === company ? 'bg-blue-900' : ''
                }`}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: c.color }}
                >
                  <Bus className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{c.label}</div>
                  <div className="text-xs text-blue-300">{c.sub}</div>
                </div>
                {c.id === company && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#E8A020]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {groups.map(group => (
          <NavGroupSection
            key={group.label}
            group={group}
            pathname={pathname}
            collapsed={collapsed}
            openGroups={openGroups}
            onToggle={toggleGroup}
          />
        ))}
      </nav>

      {/* Bottom Nav + Collapse */}
      <div className="border-t border-blue-800 p-2 space-y-0.5">
        {bottomNav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-blue-200 hover:bg-blue-800 hover:text-white transition-colors"
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-blue-300 hover:bg-blue-800 hover:text-white transition-colors"
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
