# Suvidhi — Postpartum Restore funnel

React + TypeScript + Vite + Tailwind. Funnel pages: `/` → `/checkout` → `/book-a-call` → `/thank-you`, plus `/terms-and-conditions`, `/privacy-policy`, `/refund-policy`.

## What's in the zip

- `src/` — full app source
- `public/images/` — Suvidhi photos + favicon
- `package.json`, `tsconfig.*`, `tailwind.config.js`, `vite.config.ts`, `postcss.config.js`, `index.html`
- `.env.example` — every env var the app reads, with comments
- `package-lock.json` — pinned dep versions

## What's **NOT** in the zip (and why)

- `node_modules/` — re-install with `npm install`
- `dist/` — build artifact, regenerate with `npm run build`
- `.env` — contains live Razorpay credentials. **Never commit this to GitHub.** Copy `.env.example` to `.env` locally and paste the real values; on prod the same vars go into your hosting provider's environment-variables UI.
- `.git/` — start a fresh repo

## First-time setup

```bash
npm install
cp .env.example .env
# open .env and paste the real values (Razorpay key/secret, Calendly URL,
# Meta Pixel ID, Pabbly webhook URL, WhatsApp community URL)
npm run dev
```

Dev server: http://localhost:5173

## Environment variables

Every one is read either by the client (`VITE_…` prefix → bundled into JS) or by the Vite dev middleware + your prod backend (no prefix → server-only).

| Variable                          | Where it's used                                      |
|----------------------------------|------------------------------------------------------|
| `VITE_OFFER_PRICE_INR`           | Displayed price (1 = ₹1 test, 497 = ₹497 launch)     |
| `VITE_OFFER_FULL_PRICE_INR`      | Strikethrough price                                  |
| `VITE_OFFER_NAME`                | "The Postpartum Restore"                             |
| `VITE_RAZORPAY_KEY_ID`           | Client: passed to Razorpay checkout.js               |
| `RAZORPAY_KEY_SECRET`            | **Server-only.** Used by `vite.config.ts` middleware and your prod backend for order creation + signature verify |
| `VITE_CALENDLY_URL`              | Calendly event URL, embedded as iframe               |
| `VITE_META_PIXEL_ID`             | Meta Pixel ID for tracking                           |
| `VITE_META_CAPI_ENDPOINT`        | Your edge function that forwards events to Meta CAPI |
| `VITE_PABBLY_WEBHOOK_URL`        | Pabbly webhook that fans out lead/payment/booking events |
| `VITE_WHATSAPP_COMMUNITY_URL`    | Link from the thank-you page                         |
| `VITE_BRAND_EMAIL` / `VITE_BRAND_PHONE` | Footer + policy page contact info            |

## Razorpay (live keys)

The dev server includes a Vite middleware (`vite.config.ts`) that uses the official `razorpay` npm SDK to:

- `POST /api/razorpay/create-order` — creates a Razorpay Order server-side using `RAZORPAY_KEY_SECRET`. Required for live keys.
- `POST /api/razorpay/verify` — HMAC-SHA256 verifies the success signature.

**For production**, you need to replicate these two endpoints on a real backend (Cloudflare Worker / Vercel function / Netlify function / Express). The client paths (`/api/razorpay/create-order`, `/api/razorpay/verify`) are the contract — same payloads, same responses. Nothing in `src/` needs to change; only the runtime where those two paths live.

Self-check the credentials before going live:
```bash
curl -s -u 'rzp_live_XXX:YOUR_SECRET' \
  -X POST https://api.razorpay.com/v1/orders \
  -H 'Content-Type: application/json' \
  -d '{"amount":100,"currency":"INR","receipt":"check"}'
```
- ✅ `{"id":"order_..."}` → credentials are valid
- ❌ `{"error":{"description":"Authentication failed",...}}` → regenerate the key in Razorpay Dashboard

## Build for production

```bash
npm run build       # outputs to dist/
npm run preview     # serves the dist/ build locally for sanity check
```

The `dist/` folder is a static site + assets — drop it on any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront). You'll still need a backend for the two Razorpay endpoints.

## UTM + Pabbly schema

Every funnel event (lead capture / checkout started / payment success / payment failed / call booked) ships a full payload to `VITE_PABBLY_WEBHOOK_URL`. Schema is defined in `src/lib/utm.ts` (`buildFullPayload`) and wired through `src/lib/tracking.ts` (`pabblyEvent`). Includes:

`lead_id`, `created_at`, `first_name`, `last_name`, `email`, `phone`, `country_code`, `fbc`, `fbp`, `client_user_agent`, `external_id`, `event_source_url`, `amount`, `is_test`, `purchase_event_id`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid` — plus blank columns for `attended`, `qualified`, `sale_closed`, etc. so downstream Pabbly steps can fill them.

`client_ip_address` is intentionally blank — your prod backend or Pabbly step should inject the request IP.

## Routing & test URL

Walk the funnel with UTMs:
```
https://your-domain.com/?utm_source=facebook&utm_medium=paid&utm_campaign=postpartum_launch_jun26&utm_content=hero_video_v1&utm_term=postpartum_recovery&fbclid=fb_test_abc123
```
The params persist in localStorage (first-touch attribution) and ride along every internal navigation through `/checkout` → `/book-a-call` → `/thank-you`.

## Useful scripts

```bash
npm run dev       # local dev (port 5173)
npm run build     # production bundle (runs `tsc && vite build`)
npm run preview   # preview the production bundle locally
```

## Repo health checks before pushing

```bash
npx tsc --noEmit   # full type check
npx vite build     # full production build
```

Both should finish clean before pushing to GitHub.
