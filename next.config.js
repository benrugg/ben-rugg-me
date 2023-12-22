/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    windowHistorySupport: true,
  },
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/sitemap.xml" },
      { source: "/:any*", destination: "/" },
    ]
  },
}

module.exports = nextConfig
