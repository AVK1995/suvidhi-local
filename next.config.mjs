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
  // Serve modern formats from next/image (much smaller than the source PNGs)
  // and cache the optimized variants for a year.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  // Tree-shake these big icon/animation libs so only the imports actually used
  // ship to the client — cuts unused JS on the initial bundle.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Long-lived, immutable caching for static images in /public (file names are
  // stable). Addresses the "efficient cache lifetimes" audit for repeat views.
  async headers() {
    return [
      {
        source: '/:all*(png|jpg|jpeg|webp|avif|svg|ico|gif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
