/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    windowHistorySupport: true,
  },
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ]
  },
}

module.exports = nextConfig
