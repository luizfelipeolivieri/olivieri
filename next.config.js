/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'samovessoprd.blob.core.windows.net',
      },
    ],
  },
};

module.exports = nextConfig;
