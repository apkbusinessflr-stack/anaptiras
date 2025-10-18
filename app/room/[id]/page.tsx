'use client';

import { useEffect, useState } from 'react';

type Msg = { id: string; body: string; created_at: string };

export default function RoomView({ params }: { params: { id: string } }) {
  const roomId = params.id;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    const r = await fetch(`/api/rooms/${roomId}/messages`, { cache: 'no-store' });
    const j = await r.json();
    setMsgs(j.messages || []);
  }

  async function send() {
    const body = text.trim();
    if (!body) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: body }),
      });
      if (r.ok) {
        setText('');
        await load();
      } else {
        const j = await r.json();
        alert(j?.error || 'Failed to send message');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Room</h1>

      <div className="flex items-center gap-2">
        <input
          className="px-3 py-2 rounded border w-full"
          placeholder="Say something…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          maxLength={500}
        />
        <button
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          onClick={send}
          disabled={loading || text.trim().length === 0}
        >
          Send
        </button>
      </div>

      <div className="rounded border p-4 bg-white">
        <div className="text-sm text-gray-500 mb-2">Messages</div>
        <ul className="space-y-2">
          {msgs.map(m => (
            <li key={m.id} className="rounded border px-3 py-2">
              <div className="whitespace-pre-wrap break-words">{m.body}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(m.created_at).toLocaleString()}
              </div>
            </li>
          ))}
          {msgs.length === 0 && (
            <li className="text-gray-500">No messages yet. Be the first!</li>
          )}
        </ul>
      </div>

      <div className="rounded border p-4 bg-white">
        <div className="text-sm font-medium mb-2">Invite friends</div>
        <div className="flex gap-2">
          <input className="px-3 py-2 rounded border w-full" value={shareUrl} readOnly />
          <button
            className="px-3 py-2 rounded border"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}
