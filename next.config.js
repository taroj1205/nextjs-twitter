/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/profile',
        destination: '/',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
