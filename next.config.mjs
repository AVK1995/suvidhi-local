/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Razorpay Node SDK is server-only; keep it external to the bundle.
  serverExternalPackages: ['razorpay'],
}

export default nextConfig
