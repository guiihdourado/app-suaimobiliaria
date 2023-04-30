/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'casacor.abril.com.br',
      'blog.archtrends.com',
    ],
  },
}

module.exports = nextConfig
