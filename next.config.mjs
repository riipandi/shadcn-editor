import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },

  async rewrites() {
    return [
      // LLM-friendly .md version of every doc page (shadcn v4 pattern)
      { source: "/docs/:path*.md", destination: "/llm/:path*" },
      // Clean registry API proxy
      { source: "/r/:path*", destination: "/api/registry/:path*" },
    ]
  },

  async headers() {
    return [
      // Static assets — cache forever (content-hashed by Next.js)
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Docs pages — cache at CDN for 24h, serve stale for 7 days while revalidating
      {
        source: "/docs/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=604800" },
        ],
      },
      // Blocks page
      {
        source: "/blocks/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=604800" },
        ],
      },
      // Homepage
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      // Registry JSON
      {
        source: "/registry.json",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
    ]
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  experimental: {
    staleTimes: {
      dynamic: 30,  // cache dynamic pages 30s client-side
      static: 180,  // cache static pages 3min client-side
    },
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
