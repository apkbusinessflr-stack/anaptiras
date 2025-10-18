
import { NextResponse } from 'next/server'
export const runtime = 'edge'
// Provider would call this with a signed token/tx id; verify and credit quota.
export async function POST(req: Request) {
  // TODO: verify signature/token with provider
  return NextResponse.json({ ok: true })
}
