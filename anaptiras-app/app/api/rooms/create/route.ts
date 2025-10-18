
import { NextResponse } from 'next/server'
export const runtime = 'edge'
export async function POST() {
  // TODO: check quota: free_daily_left or last rewarded unlock
  // Create room slug and return URL
  return NextResponse.json({ ok: true, slug: 'room-' + Math.random().toString(36).slice(2,8) })
}
