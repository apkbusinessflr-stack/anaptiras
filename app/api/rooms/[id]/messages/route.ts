import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getOrSetAnonId } from '@/lib/anon';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const rows = await sql<{ id: string; body: string; created_at: string }[]>`
      SELECT id, body, created_at
      FROM messages
      WHERE room_id = ${params.id}
      ORDER BY created_at ASC
      LIMIT 200
    `;
    return NextResponse.json({ messages: rows });
  } catch (e) {
    console.error('messages GET', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const anonId = getOrSetAnonId();
    const { text } = (await req.json()) as { text?: string };
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'Empty message' }, { status: 400 });
    }
    const trimmed = text.trim().slice(0, 500);

    const userRow = await sql<{ id: string }[]>`
      INSERT INTO users (anon_id) VALUES (${anonId})
      ON CONFLICT (anon_id) DO UPDATE SET anon_id = EXCLUDED.anon_id
      RETURNING id
    `;
    await sql`
      INSERT INTO messages (room_id, author_id, body)
      VALUES (${params.id}, ${userRow[0].id}, ${trimmed})
    `;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('messages POST', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
