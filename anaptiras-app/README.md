
# Anaptiras

Viral rooms app (Ghost / Crew / Custom) — 100% ads (display + rewarded gate), i18n, Vercel-first.

## Stack
- Next.js 14 (App Router, RSC), Tailwind
- Vercel Postgres (Neon), Vercel KV (Upstash), Vercel Blob
- @vercel/og for share images
- i18next + ICU, lazy-loaded locales
- Rewarded Gate flow (placeholder hook) + Ads (GAM/Prebid.js-ready)
- Cloudflare Turnstile (bot protection)

## Quick start
1. `pnpm i` (or npm/yarn)
2. Copy `.env.example` → `.env.local` and fill values
3. `pnpm dev`

## Deploy on Vercel
- Connect repo → Add env vars (see below) → Deploy
- Add domain `anaptiras.com`
- Enable Scheduler for cleanup cron

## Environment variables
See `.env.example`

## Data lifecycle
- Ghost: expire 24h
- Crew: archive 7d (pinned highlights only)
- Custom: 1–30d configurable
- OG lifecycle: non-pinned 7–14d, pinned 90d

## Ads
- Display: lobby/thank-you/scoreboard placements
- Rewarded: gate to create extra rooms (server validation)
- Consent Mode v2 + TCF string via CMP

## Folders
- `app/` pages & API (edge)
- `src/lib/` db, kv, blob, i18n, ads hooks
- `src/components/` UI primitives
- `public/` static, `ads.txt` placeholder
- `db/schema.sql` SQL (Postgres)


---

## Ads — Multi‑provider setup (Prebid + GAM)

1. **CMP (IAB TCF v2.2) + Consent Mode v2**
   - Replace `public/cmp/cmp-stub.js` with your CMP snippet.
   - Ensure TCF string is readable by Prebid & GAM.

2. **Prebid**
   - Use a **pruned build** (only adapters you need).
   - Fill `public/prebid-bidders.json` with bidder-specific params per placement.
   - Keep timeout ~1000ms EU; adjust by geo.

3. **Google Ad Manager (GAM)**
   - Create ad units (`/NETWORK/anaptiras/...`).
   - Import **line items** based on price floors; see `scripts/gam_line_items_sample.csv`.
   - Map Prebid keys: `hb_pb`, `hb_bidder`, `hb_format`, etc.

4. **Rewarded**
   - Integrate partner / GAM video.
   - Wire provider callback to `/api/reward/callback` and verify on server.

5. **Brand‑Safety**
   - Serve display ads only in **lobby / thank‑you / scoreboard**.
   - Avoid inline next to sensitive Ghost content.

## Environment
- See `.env.example` and add GAM/Prebid variables as needed.
- Add GA/GTM scripts if you use them; `public/gtag.js` provided.

## Build Notes
- Consider serving a **custom Prebid bundle** from your CDN rather than jsDelivr.
- Enforce **size mapping** and **lazy load** in `AdSlot`.
- For rewarded video, most partners provide their SDK snippet – load it on demand.

