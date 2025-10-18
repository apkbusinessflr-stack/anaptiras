// src/lib/anon.ts
import { cookies } from 'next/headers';

const COOKIE = 'anon_id';

export function getOrSetAnonId(): string {
  const store = cookies();
  let id = store.get(COOKIE)?.value;
  if (!id) {
    id = crypto.randomUUID();
    // 400 days, httpOnly, secure
    store.set(COOKIE, id, { maxAge: 60 * 60 * 24 * 400, httpOnly: true, sameSite: 'lax', secure: true, path: '/' });
  }
  return id!;
}
