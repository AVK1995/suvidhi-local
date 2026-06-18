import { defineConfig, loadEnv, type Connect } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createHmac } from 'node:crypto'
import { Buffer } from 'node:buffer'
import Razorpay from 'razorpay'

// ─────────────────────────────────────────────────────────────────────
// Dev-only Razorpay backend.
//
// Two endpoints, both required for live keys:
//   POST /api/razorpay/create-order  → uses official SDK + key+secret to
//                                      mint a Razorpay Order
//   POST /api/razorpay/verify        → HMAC-SHA256 verifies the success
//                                      signature
//
// The secret is read from RAZORPAY_KEY_SECRET (no VITE_ prefix → never
// bundled into the client). When you deploy, replicate these two paths
// on a real backend; the client contract doesn't change.
// ─────────────────────────────────────────────────────────────────────

async function readJson(req: Connect.IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : (chunk as Buffer))
  }
  const raw = Buffer.concat(chunks).toString('utf-8')
  if (!raw) return {}
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    return {}
  }
}

function sendJson(
  res: Parameters<Connect.NextHandleFunction>[1],
  status: number,
  body: unknown,
) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const keyId = env.VITE_RAZORPAY_KEY_ID ?? ''
  const keySecret = env.RAZORPAY_KEY_SECRET ?? ''

  // Build one Razorpay client per dev server boot. Reused across requests.
  const rp =
    keyId && keySecret && !keyId.includes('REPLACE_ME') && !keySecret.includes('REPLACE_ME')
      ? new Razorpay({ key_id: keyId, key_secret: keySecret })
      : null

  if (rp) {
    // eslint-disable-next-line no-console
    console.log(
      `[razorpay] dev middleware ready — key=${keyId.slice(0, 12)}…  (live=${keyId.startsWith('rzp_live_')})`,
    )
  } else if (mode === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      '[razorpay] dev middleware NOT configured. Set VITE_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env and restart `npm run dev`.',
    )
  }

  return {
    plugins: [
      react(),
      {
        name: 'razorpay-dev-server',
        configureServer(server) {
          server.middlewares.use(
            '/api/razorpay/create-order',
            async (req, res, next) => {
              if (req.method !== 'POST') return next()
              if (!rp) {
                return sendJson(res, 500, {
                  error:
                    'Razorpay credentials not configured. Add VITE_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env and restart `npm run dev`.',
                  code: 'KEY_NOT_CONFIGURED',
                })
              }

              const body = await readJson(req)
              const amountRupees =
                typeof body.amount === 'number' && body.amount > 0
                  ? (body.amount as number)
                  : 0
              if (amountRupees <= 0) {
                return sendJson(res, 400, {
                  error: 'amount must be > 0 (in INR major units)',
                  code: 'INVALID_AMOUNT',
                })
              }

              try {
                const order = await rp.orders.create({
                  amount: Math.round(amountRupees * 100), // paise
                  currency: (body.currency as string) ?? 'INR',
                  receipt: body.receipt as string | undefined,
                  notes: (body.notes ?? undefined) as Record<string, string> | undefined,
                })
                return sendJson(res, 200, order)
              } catch (e) {
                // Razorpay SDK throws errors with { statusCode, error: { code, description, ... } }
                const err = e as {
                  statusCode?: number
                  error?: {
                    code?: string
                    description?: string
                    source?: string
                    step?: string
                    reason?: string
                  }
                }
                // eslint-disable-next-line no-console
                console.error('[razorpay] order create failed', err)
                return sendJson(res, err.statusCode ?? 500, {
                  error: err.error?.description ?? String(e),
                  code: err.error?.code,
                  source: err.error?.source,
                  step: err.error?.step,
                  reason: err.error?.reason,
                  raw: err.error,
                })
              }
            },
          )

          server.middlewares.use(
            '/api/razorpay/verify',
            async (req, res, next) => {
              if (req.method !== 'POST') return next()
              if (!rp || !keySecret || keySecret.includes('REPLACE_ME')) {
                return sendJson(res, 500, {
                  error: 'Razorpay secret not configured',
                  code: 'KEY_NOT_CONFIGURED',
                })
              }

              const body = await readJson(req)
              const orderIdValue = body.razorpay_order_id
              const paymentIdValue = body.razorpay_payment_id
              const signatureValue = body.razorpay_signature
              if (
                typeof orderIdValue !== 'string' ||
                typeof paymentIdValue !== 'string' ||
                typeof signatureValue !== 'string'
              ) {
                return sendJson(res, 400, {
                  error: 'Missing required fields',
                  code: 'BAD_REQUEST',
                })
              }
              const expected = createHmac('sha256', keySecret)
                .update(`${orderIdValue}|${paymentIdValue}`)
                .digest('hex')
              return sendJson(res, 200, { valid: expected === signatureValue })
            },
          )
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: true,
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (
              id.includes('react-phone-number-input') ||
              id.includes('libphonenumber')
            ) {
              return 'phone-input'
            }
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('react-router')) return 'router'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('react-dom')) return 'react-dom'
            if (id.includes('node_modules/react/')) return 'react'
            return 'vendor'
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    esbuild: {
      legalComments: 'none',
    },
  }
})
