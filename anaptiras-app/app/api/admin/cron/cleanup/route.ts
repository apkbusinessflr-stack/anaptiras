
import { NextResponse } from 'next/server'
export const runtime = 'edge'
export async function GET() {
  // TODO: purge expired rooms, delete non-pinned OG, compact logs
  return NextResponse.json({ ok: true })
}
