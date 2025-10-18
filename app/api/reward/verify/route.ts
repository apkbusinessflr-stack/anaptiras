
import { NextResponse } from 'next/server'
export const runtime = 'edge'
export async function POST() {
  // TODO: validate rewarded completion token from client or session-bound challenge
  // For now, mark as success to unlock 1 room.
  return NextResponse.json({ unlocked: 1 })
}
