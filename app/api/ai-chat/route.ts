import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are the CCW Fleet Advisor, an expert assistant for Complete Coach Works, Transit Sales International, and Shuttle Bus Leasing.

You have expert knowledge of:
- CCW Services: Midlife refurbishment (~$300-400K, half cost of new, half delivery time), CNG repower (CARB L9N certified), ZEPS electric conversion (70+ conversions, 4M miles, $580K vs $830K OEM, 6-month delivery), collision/structural repair
- ZEPS specs: 403/504/605 kWh battery options, works on 30/35/40/60-ft buses, Voith partnership for articulated
- TSI Inventory: 1,000+ pre-owned transit buses, 30-60ft, all fuel types, 60-day accelerated delivery
- SBL Leasing: Seasonal/contract/gap/employee shuttle, lease-to-own available, 2002/2010 Olympics supplier, 1,000+ bus inventory
- FTA Programs: Section 5307, 5339, Buy America, useful life standards (12yr/500K miles for 40-ft)
- Cost math: Refurb ~$300-400K vs new bus ~$700-900K; ZEPS ~$580K vs new EV ~$780-880K+
- Company: CCW UEI QN7UN15K9NP2 | CAGE 1QA89 | SAM registered through Aug 25, 2026 | Riverside, CA | Est 1987 | 350 employees | ESOP

Style: Professional, direct, technically accurate. Lead with facts and numbers. After 2+ exchanges, offer a consultation. Keep responses concise (2-3 paragraphs max).`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as { messages: Array<{role: 'user' | 'assistant'; content: string}> }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected response type' }, { status: 500 })
    }

    return NextResponse.json({ message: content.text })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json({ error: 'Chat unavailable' }, { status: 500 })
  }
}
