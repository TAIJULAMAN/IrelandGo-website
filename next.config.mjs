/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2|woff)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/booking-flow/step-2",
        destination: "/booking/vehicles",
        permanent: true,
      },
      {
        source: "/booking-flow/step-3",
        destination: "/booking/stops",
        permanent: true,
      },
      {
        source: "/booking-flow/step-3-details",
        destination: "/booking/user-info",
        permanent: true,
      },
      {
        source: "/booking-flow/payment",
        destination: "/booking/payment",
        permanent: true,
      },
      {
        source: "/booking-flow/real-time-tracking",
        destination: "/booking/real-time-tracking",
        permanent: true,
      },
      {
        source: "/booking/choose-vehicle",
        destination: "/booking/vehicles",
        permanent: true,
      },
      {
        source: "/booking/add-stops",
        destination: "/booking/stops",
        permanent: true,
      },
      {
        source: "/booking/user-details",
        destination: "/booking/user-info",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/booking/:service/:route/vehicles",
        destination: "/booking/vehicles",
      },
      {
        source: "/booking/:service/:route/stops",
        destination: "/booking/stops",
      },
      {
        source: "/booking/:service/:route/:vehicle/user-info",
        destination: "/booking/user-info",
      },
      {
        source: "/booking/:service/:route/user-info",
        destination: "/booking/user-info",
      },
      {
        source: "/booking/:service/:route/payment",
        destination: "/booking/payment",
      },
    ];
  },
};

export default nextConfig;

