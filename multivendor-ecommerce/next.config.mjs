/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uoffice.com.sg',
        pathname: '/**',
          },
        {
        protocol: 'https',
        hostname: 'spacemy.com.my',
        pathname: '/cdn/shop/products/**',
          },
        {
        protocol: 'https',
        hostname: 'www.ikea.com',
        pathname: '/**',
          },
        {
        protocol: 'https',
        hostname: 'i5.walmartimages.com',
        pathname: '/**',
      },
    ],
  },
};

// next.config.mjs
export default nextConfig;
