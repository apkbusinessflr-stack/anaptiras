
import { NextResponse } from 'next/server'
export const runtime = 'edge'
export async function GET() {
  // TODO: compute daily free room quota + ad rewards
  return NextResponse.json({ quota: { free_daily_left: 1, can_create: true } })
}
