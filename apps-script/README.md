# Suvidhi CRM — Apps Script Downstream CAPI Engine

Apps Script bound to the **Suvidhi · The Postpartum Restore** CRM Google Sheet.
It fires **two** downstream Meta Conversions API events whenever a sales-team
dropdown is set to TRUE:

| Sheet dropdown set to TRUE | Meta CAPI event fired | Carries value? |
|---|---|---|
| `qualified` (col X) | `QualifiedLead` | no |
| `sale_closed` (col AB) | `HighTicketPurchase` | yes — `contracted_value` from col AC |

The tripwire **₹497** purchase fires a neutral custom **`sales`** event
SERVER-SIDE from the Next.js app (`app/api/razorpay/verify/route.ts`) — **not**
the standard `Purchase` event. This is a postpartum **Health & Wellness**
dataset, so the whole stack deliberately avoids Meta's restricted standard
events and stays on confirmed custom events with PHI-free payloads. This script
handles only the two downstream events. The two systems share the same Meta
pixel ID + access token but never talk directly — the Sheet is the only link.

---

## Files

- **`Code.gs`** — paste into the Apps Script editor (replaces the default file)
- **`appsscript.json`** — paste into the manifest (gear icon → Show appsscript.json)
- **`README.md`** — this file

These are a **template** in the repo; they are NOT auto-deployed. Make them live
by pasting into a Sheet's Apps Script editor (steps below).

---

## Prerequisites

1. **The Suvidhi CRM Sheet exists** with this 32-column header in row 1, cols A–AF:

   ```
   lead_id | created_at | first_name | last_name | email | phone | city | country_code | fbc | fbp | client_ip_address | client_user_agent | external_id | event_source_url | amount | is_test | purchase_event_id | utm_source | utm_medium | utm_campaign | utm_content | utm_term | fbclid | qualified | qualified_time | qualified_capi_event_id | qualified_capi_sent | sale_closed | contracted_value | sales_time | htsale_capi_event_id | htsale_capi_sent
   ```

   Columns **A–W** are auto-filled by Pabbly (mapped from the Next.js verify /
   free-order route's webhook body). Columns **X–AF** are the lifecycle columns.

2. **A hidden `_Errors` tab** with header in row 1:
   `timestamp | row_number | event_type | http_status | response_body | retry_count`

3. **Column types:**
   - **X `qualified`, AB `sale_closed`** → Data validation **Dropdown** with values
     `TRUE` and `FALSE` (exact uppercase). **Do NOT use checkboxes** — a checkbox
     pre-populates FALSE when Pabbly creates a row, which is indistinguishable
     from "sales team explicitly marked FALSE". Dropdowns stay blank until a human
     picks a value.
   - **Y `qualified_time`, AD `sales_time`** → Date+time (Format → Number → Date time)
   - **AC `contracted_value`** → Plain number (no separators, no currency symbol)
   - Z, AA, AE, AF → leave for the Apps Script
4. **Spreadsheet timezone = `Asia/Kolkata`** (File → Settings → Timezone).
5. **Pabbly is mapping rows correctly** — at least one real ₹497 order has produced
   a row with all 23 auto-fill columns populated (esp. `lead_id`, `email`, `fbc`,
   `fbp`, `client_ip_address`, `client_user_agent`, `external_id`).

`lead_id` = the Razorpay `payment_id`, and downstream event_ids are
`<lead_id>_qualified` / `<lead_id>_htsale` (deterministic → idempotent retries +
48h Meta dedup).

---

## Deployment (~10 minutes)

1. **Open the Sheet's Apps Script editor:** Extensions → Apps Script.
2. **Paste `Code.gs`:** select-all the default file, delete, paste this repo's
   `Code.gs`, save.
3. **Replace the manifest:** gear icon (Project Settings) → check *"Show
   appsscript.json manifest file in editor"* → open `appsscript.json` → replace
   with this repo's version → save.
4. **Add Script Properties** (Project Settings → Script Properties):

   | Property | Value | Notes |
   |---|---|---|
   | `META_PIXEL_ID` | the Suvidhi pixel ID | Must equal Vercel's `NEXT_PUBLIC_META_PIXEL_ID`. |
   | `META_CAPI_ACCESS_TOKEN` | the CAPI access token | Same value as Vercel's `META_CAPI_ACCESS_TOKEN`. **Secret** — anyone with edit access can read it. |
   | `EVENT_SOURCE_URL_DEFAULT` | e.g. `https://suvidhi.innohealth.co.in` | Host-only fallback if a row's `event_source_url` is empty. |

   Optional: `MAIN_SHEET_NAME` (if the tab isn't `Sheet1`),
   `META_GRAPH_API_VERSION` (default `v25.0`), `META_TEST_EVENT_CODE`
   (set to a Test Events code while testing; leave blank / `0` in production).

5. **Install the trigger:** function selector → `setupTriggers` → Run → authorize
   (you'll see a "Google hasn't verified this app" warning — Advanced → Go to
   project → approve the spreadsheet + external-request + triggers scopes). Look
   for the log `setupTriggers OK — removed 0 old, installed 1 new`.

6. **Smoke test against Meta Test Events** (Events Manager → dataset → Test Events,
   copy the test code into the `META_TEST_EVENT_CODE` script property):
   - Set `qualified` (col X) → `TRUE`. Within ~10s: a `QualifiedLead` event appears
     (Source: Server, EMQ 8–9+); cols Z/AA fill with `<lead_id>_qualified` / `TRUE`.
   - Fill `contracted_value` (col AC) with e.g. `60000`, then set `sale_closed`
     (col AB) → `TRUE`. Expect `HighTicketPurchase` with `value: 60000, currency: INR`;
     cols AE/AF fill.
   - Remove the `META_TEST_EVENT_CODE` property when done so production events flow live.

---

## Replicating for another client (~15 min)

1. New Google Sheet with the 32-column header above + `_Errors` tab.
2. Extensions → Apps Script → paste `Code.gs` + `appsscript.json` (no code change;
   edit the `EVENTS` event names only if the client wants a different tag).
3. Set the 3 Script Properties for that client's pixel/token/URL.
4. Run `setupTriggers`, authorize, smoke test.

---

## Operations

- **Logs:** Apps Script editor → Executions; failures also land in the `_Errors` tab.
- **Event fired but dropdown TRUE & no row stamp?** Check Executions for `already
  sent, skipping` (dedup) or a `_Errors` row. If no execution ran at all, set the
  dropdown back to blank then TRUE again (installable onEdit can miss some
  programmatic writes).
- **Force a re-fire:** clear the `*_capi_sent` flag (AA / AF) → set the trigger
  dropdown (X / AB) blank → TRUE again. Meta dedups within 48h on event_id.
- **Bulk replay** after an outage: run `replayPendingEvents` (paces 500ms/fire).
- **Rotate the token:** update `META_CAPI_ACCESS_TOKEN` in Script Properties — no
  redeploy needed.
- **Low EMQ?** A row is missing identifiers — confirm `fbc`/`fbp`/`client_ip_address`/
  `client_user_agent`/`external_id`/`email`/`phone` are populated by Pabbly.

---

## Dummy row for smoke testing

Paste into row 2 (adjust the times to recent IST):

| Col | Value |
|---|---|
| A `lead_id` | `pay_dummyABC123` |
| B `created_at` | `2026-06-25T14:00:00+05:30` |
| C `first_name` | `Test` |
| D `last_name` | `Mother` |
| E `email` | `test+suvidhi@example.com` |
| F `phone` | `+919999999999` |
| G `city` | `Mumbai` |
| H `country_code` | `IN` |
| I `fbc` | `fb.1.1716200533000.IwAR2_test_fbc` |
| J `fbp` | `fb.1.1716200533000.1234567890` |
| K `client_ip_address` | `203.0.113.42` |
| L `client_user_agent` | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15` |
| M `external_id` | `sha256(test+suvidhi@example.com)` |
| N `event_source_url` | `https://suvidhi.innohealth.co.in` |
| O `amount` | `497` |
| P `is_test` | `false` |
| Q `purchase_event_id` | `pay_dummyABC123` |
| R–W (utm_* + fbclid) | any test values |
| X–AF | leave blank (sales team / script fill these) |

Then: set X (`qualified`) → TRUE → expect `QualifiedLead`. Fill AC (`contracted_value`)
= `60000`, set AB (`sale_closed`) → TRUE → expect `HighTicketPurchase` (value 60000).
