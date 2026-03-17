import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const secret = process.env.AGENCY_SNAPSHOT_SECRET

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({
      error: 'Unauthorized',
      debug_secret_length: secret?.length ?? 0,
      debug_header_length: authHeader?.length ?? 0,
      debug_secret_set: !!secret,
    }, { status: 401 })
  }

  try {
    // Bus engine uses demo data until Supabase is fully wired
    const now = new Date()

    return NextResponse.json({
      engine: 'bus-engine',
      practice: 'Complete Coach Works',
      generatedAt: now.toISOString(),
      leads: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        pending: 4, // active RFP pipeline entries
        avgResponseSeconds: null,
      },
      appointments: {
        today: 0,
        thisWeek: 0,
        confirmed: 47, // buses in production (active jobs)
        noShows: 0,
        cancellations: 0,
      },
      patients: {
        total: 4, // active contracts
        active: 4,
        new30d: 0,
      },
      aiActions: {
        pending: 0,
        approvedToday: 0,
        rejectedToday: 0,
        totalToday: 0,
      },
      outreach: {
        sentToday: 0,
        deliveredToday: 0,
        failedToday: 0,
        activeSequences: 0,
      },
      integrations: {},
      health: {
        dbOk: true,
        lastCronRun: null,
        cronHealthy: false,
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Status check failed', details: err instanceof Error ? err.message : 'Unknown' },
      { status: 500 },
    )
  }
}
