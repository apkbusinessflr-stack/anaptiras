
'use client'
import { useState } from 'react'

export default function RewardGate({ onUnlocked }:{ onUnlocked: ()=>void }){
  const [state, setState] = useState<'idle'|'watching'|'done'>('idle')
  async function watch() {
    setState('watching')
    // Placeholder: call /api/reward/verify after the ad completes
    await new Promise(r => setTimeout(r, 2000))
    const res = await fetch('/api/reward/verify', { method: 'POST' })
    if (res.ok) { setState('done'); onUnlocked() }
    else setState('idle')
  }
  return (
    <div className="border rounded-xl p-4 bg-white space-y-3">
      <h3 className="font-semibold">Δες μία διαφήμιση για να ξεκλειδώσεις νέο δωμάτιο</h3>
      {state==='idle' && <button onClick={watch} className="px-3 py-2 rounded bg-black text-white">Watch Ad</button>}
      {state==='watching' && <div>Παίζει διαφήμιση…</div>}
      {state==='done' && <div>Ξεκλείδωσες! 🎉</div>}
    </div>
  )
}
