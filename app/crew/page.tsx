'use client';

export default function Crew() {
  async function create() {
    const r = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'crew' }),
    });
    const j = await r.json();
    if (j.id) window.location.href = `/room/${j.id}`;
    else alert(j?.error || 'Failed to create room');
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Crew Room</h1>
      <p className="text-gray-600">Private room for your group. Share the link and play.</p>
      <button onClick={create} className="px-4 py-2 rounded bg-black text-white">Create room</button>
    </main>
  );
}
