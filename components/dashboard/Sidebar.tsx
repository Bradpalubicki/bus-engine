'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Bus, LayoutDashboard, ClipboardList, FileText, Package,
  TrendingUp, Users, Shield, MapPin, BarChart3,
  ChevronLeft, ChevronRight, Settings, LogOut, Zap
} from 'lucide-react'

const navItems = [
  { label: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Work Orders', href: '/dashboard/work-orders', icon: ClipboardList },
  { label: 'Fleet / Vehicles', href: '/dashboard/fleet', icon: Bus },
  { label: 'Contracts', href: '/dashboard/contracts', icon: FileText },
  { label: 'Finance', href: '/dashboard/finance', icon: BarChart3 },
  { label: 'Parts & Inventory', href: '/dashboard/parts', icon: Package },
  { label: 'Pipeline / CRM', href: '/dashboard/pipeline', icon: TrendingUp },
  { label: 'Technicians', href: '/dashboard/technicians', icon: Users },
  { label: 'Compliance', href: '/dashboard/compliance', icon: Shield },
  { label: 'Locations', href: '/dashboard/locations', icon: MapPin },
  { label: 'ZEPS Program', href: '/dashboard/zeps', icon: Zap },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

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
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-colors ${
                active
                  ? 'bg-[#E8A020] text-white'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-blue-800 p-2 space-y-0.5">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-blue-200 hover:bg-blue-800 hover:text-white transition-colors">
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </Link>
        <Link href="/" className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-blue-200 hover:bg-blue-800 hover:text-white transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Back to Site</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-blue-300 hover:bg-blue-800 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <><ChevronLeft className="w-5 h-5" /><span className="text-sm">Collapse</span></>}
        </button>
      </div>
    </aside>
  )
}
