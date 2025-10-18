export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Anaptiras</h1>
      <p className="text-gray-600">
        Ghost for the soul · Crew for the laughs · Custom for events
      </p>

      <div className="flex gap-3">
        <a className="px-4 py-2 rounded bg-black text-white" href="/ghost">Ghost</a>
        <a className="px-4 py-2 rounded border" href="/crew">Crew</a>
        <a className="px-4 py-2 rounded border" href="/custom">Custom</a>
      </div>

      <section className="rounded border p-4 bg-white">
        <h2 className="font-semibold mb-2">Ad Placement (Landing)</h2>
        <div className="rounded border bg-gray-100 h-48 flex items-center justify-center">
          Ad slot (responsive)
        </div>
      </section>
    </main>
  );
}
