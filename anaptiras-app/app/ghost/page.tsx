
export const dynamic = 'force-dynamic'
export default function Ghost() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Ghost Room</h1>
      <p className="text-gray-600">Ανώνυμη εξομολόγηση. Τα μηνύματα εξαφανίζονται σε 24h.</p>
      <div className="border rounded-xl p-4">
        <div className="mb-3 text-sm text-gray-500">Lobby Ad slot</div>
        <div className="w-full h-40 bg-gray-100 grid place-items-center">Ad slot (lobby)</div>
      </div>
    </main>
  )
}
