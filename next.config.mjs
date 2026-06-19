import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// Directory this config lives in = the real project root.
const projectRoot = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Razorpay Node SDK is server-only; keep it external to the bundle.
  serverExternalPackages: ['razorpay'],
  // A stray lockfile in the home directory makes Next infer the wrong
  // workspace root; pin it so Turbopack always resolves from this project.
  turbopack: { root: projectRoot },
}

export default nextConfig
