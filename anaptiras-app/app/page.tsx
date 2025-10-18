
'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { initI18n } from '@/lib/i18n'
export default function Home() {
  useEffect(()=>{ initI18n() },[])
  return (
    <main className="min-h-screen max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-extrabold">Anaptiras</h1>
      <p className="text-gray-600">Ghost για την ψυχή · Crew για το γέλιο · Custom για events</p>
      <div className="flex flex-wrap gap-3">
        <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/ghost">Ghost</Link>
        <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/crew">Crew</Link>
        <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/custom">Custom</Link>
      </div>
      <div className="mt-10 border rounded-xl p-4">
        <h2 className="font-semibold mb-2">Ad Placement (Landing)</h2>
        <div id="ad-slot-landing" className="w-full h-60 bg-gray-100 grid place-items-center">Ad slot (responsive)</div>
      </div>
    </main>
  )
}
