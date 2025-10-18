
'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    googletag:any;
    pbjs:any;
  }
}

type Props = {
  id: string;
  sizes?: number[][]; // e.g., [[300,250],[336,280]]
  adUnitPath?: string;
  slotTargeting?: Record<string,string>;
}

export default function AdSlot({ id, sizes = [[300,250],[336,280],[320,100],[320,50]], adUnitPath, slotTargeting }: Props){
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const w = window as any
    w.googletag = w.googletag || { cmd: [] }
    w.pbjs = w.pbjs || { que: [] }

    const defineSlot = () => {
      const g = w.googletag
      const slot = g.defineSlot(adUnitPath || '/YOUR_NETWORK/anaptiras/slot', sizes, id)
        .addService(g.pubads())
      if (slotTargeting) {
        Object.entries(slotTargeting).forEach(([k,v])=>slot.setTargeting(k, v))
      }
      g.enableServices()
      // Prebid request
      w.pbjs.que.push(function(){
        try {
          w.pbjs.addAdUnits([{
            code: id,
            mediaTypes: { banner: { sizes } },
            bids: [] // Fill via bidder params at runtime or via build
          }]);
          w.pbjs.requestBids({
            timeout: 1000,
            adUnitCodes: [id],
            bidsBackHandler: function() {
              w.pbjs.setTargetingForGPTAsync([id]);
              g.display(id);
            }
          });
        } catch(e) {
          console.warn('Prebid error', e)
          g.display(id)
        }
      })
    }

    // Load GPT script if not present
    const ensureGPT = () => new Promise<void>((resolve)=>{
      if (document.getElementById('gpt-js')) return resolve();
      const s = document.createElement('script')
      s.id = 'gpt-js'
      s.async = true
      s.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js'
      s.onload = () => resolve()
      document.head.appendChild(s)
    });

    // Load Prebid if not present (use a pruned build in prod)
    const ensurePrebid = () => new Promise<void>((resolve)=>{
      if (document.getElementById('prebid-js')) return resolve();
      const s = document.createElement('script')
      s.id = 'prebid-js'
      s.async = true
      s.src = '/prebid-config.js' // boot config
      document.head.appendChild(s)
      const p = document.createElement('script')
      p.id = 'prebid-core'
      p.async = true
      p.src = 'https://cdn.jsdelivr.net/npm/prebid.js@latest/dist/not-for-prod/prebid.js'
      p.onload = () => resolve()
      document.head.appendChild(p)
    });

    Promise.all([ensureGPT(), ensurePrebid()]).then(() => {
      window.googletag.cmd.push(defineSlot)
    })
  }, [id, adUnitPath])

  return <div id={id} ref={ref} className="min-h-[250px] w-full grid place-items-center bg-gray-50 text-gray-400">Ad</div>
}
