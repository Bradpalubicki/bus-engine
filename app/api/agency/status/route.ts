import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-agency-secret')
  if (secret !== process.env.AGENCY_SNAPSHOT_SECRET && process.env.AGENCY_SNAPSHOT_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    engine: 'bus-engine',
    client: 'Complete Coach Works',
    status: 'demo',
    timestamp: new Date().toISOString(),
    metrics: {
      activeContracts: 4,
      contractBacklog: 9930000,
      busesInProduction: 47,
      locations: 10,
    },
  })
}
