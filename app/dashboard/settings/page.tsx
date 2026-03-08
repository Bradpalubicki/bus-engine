import { Settings, Building, Phone, Mail, MapPin } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#003087]">Settings</h1>
        <p className="text-gray-500 text-sm">Platform configuration and company settings</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
          <Building className="w-4 h-4" /> Company Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Company Name', value: 'Complete Coach Works', icon: Building },
            { label: 'Phone', value: '(951) 684-9585', icon: Phone },
            { label: 'Email', value: 'info@completecoach.com', icon: Mail },
            { label: 'HQ Address', value: '1863 Service Court, Riverside, CA 92507', icon: MapPin },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-[#F8F9FB]">
                <f.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{f.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-[#003087] mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4" /> Platform Configuration
        </h2>
        <div className="space-y-3">
          {[
            { label: 'Demo Mode', value: 'Enabled', status: 'active' },
            { label: 'Supabase Connection', value: 'Not configured (placeholder)', status: 'inactive' },
            { label: 'Clerk Authentication', value: 'Not configured (demo bypass)', status: 'inactive' },
            { label: 'Email Notifications', value: 'Disabled in demo', status: 'inactive' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-700">{s.label}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
