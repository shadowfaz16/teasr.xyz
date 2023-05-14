/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "ipfs.infura.io",
      "statics-polygon-lens-staging.s3.eu-west-1.amazonaws.com",
      "lens.infura-ipfs.io",
      "source.unsplash.com",
      "arweave.net",
      "images.lens.phaver.com",
      "nftstorage.link",
      "media3.giphy.com",
      "media1.giphy.com",
      "media4.giphy.com",
      'cdn.stamp.fyi',
      'test.com'
    ],
  },
};

module.exports = nextConfig