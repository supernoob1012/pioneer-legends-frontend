/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: 'export',
//   images: {
//     domains: ['arweave.net']
//   }
// }

// module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['arweave.net', 'ipfs.io'],
  },
}
