// app/api/rooms/create/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getOrSetAnonId } from '@/lib/anon';


type RoomType = 'ghost' | 'crew' | 'custom';
import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getOrSetAnonId } from '@/lib/anon';

type RoomType = 'ghost' | 'crew' | 'custom';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { type?: RoomType };
    const type = body?.type;
    if (!type || !['ghost', 'crew', 'custom'].includes(type)) {
      return NextResponse.json({ error: 'Invalid room type' }, { status: 400 });
    }

    // ensure user exists
    const anonId = getOrSetAnonId();
    const userRow = await sql<{ id: string }[]>`
      INSERT INTO users (anon_id) VALUES (${anonId})
      ON CONFLICT (anon_id) DO UPDATE SET anon_id = EXCLUDED.anon_id
      RETURNING id
    `;
    const userId = userRow[0].id;

    const roomRow = await sql<{ id: string }[]>`
      INSERT INTO rooms (type, created_by)
      VALUES (${type}, ${userId})
      RETURNING id
    `;

    return NextResponse.json({ id: roomRow[0].id });
  } catch (err) {
    console.error('rooms/create', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { type } = (await req.json()) as { type: RoomType };
    if (!type || !['ghost', 'crew', 'custom'].includes(type)) {
      return NextResponse.json({ error: 'Invalid room type' }, { status: 400 });
    }

    const anonId = getOrSetAnonId();

    const rows = await sql<
      { id: string }
    >`
      INSERT INTO rooms (type, created_by)
      VALUES (${type}, (SELECT id FROM users WHERE anon_id = ${anonId}
                        UNION ALL
                        SELECT (INSERT INTO users (anon_id) VALUES (${anonId}) RETURNING id))
            )
      RETURNING id
    `;

    const roomId = rows[0]?.id;
    if (!roomId) throw new Error('Room not created');

    return NextResponse.json({ id: roomId });
  } catch (err) {
    console.error('rooms/create', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
