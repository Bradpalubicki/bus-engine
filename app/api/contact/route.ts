import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  agency: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = schema.safeParse(body)
  if (!result.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  // In production: send to CRM/email. For demo: just return success
  return NextResponse.json({ success: true })
}
