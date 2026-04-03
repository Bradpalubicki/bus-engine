import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  // Full contact form fields
  name: z.string().optional(),
  agency: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  serviceType: z.string().optional(),
  fleetSize: z.string().optional(),
  neededBy: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = schema.safeParse(body)
  if (!result.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  // In production: send to CRM/email. For demo: log and return success
  console.log('[contact]', result.data)
  return NextResponse.json({ success: true })
}
