import { ComingSoon } from '@/components/dashboard/ComingSoon'

export const metadata = {
  title: 'Help | Complete Coach Works',
}

export default function HelpPage() {
  return (
    <ComingSoon
      title="Help & Support"
      description="Documentation, workflow guides, and support resources for the Complete Coach Works Operations Platform."
      eta="Coming soon"
      actionLabel="Back to Dashboard"
      actionHref="/dashboard"
    />
  )
}
