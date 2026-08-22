import type { NextConfig } from 'next';

const productionOnly = process.env.NODE_ENV === 'production'
  ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }]
  : [];

const isProduction = process.env.NODE_ENV === 'production';
const cmsOrigin = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' http://localhost:1337 https:",
  `frame-ancestors 'self' ${cmsOrigin}`,
  "frame-src 'self' https://www.google.com https://*.google.com",
  "object-src 'none'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  isProduction ? "script-src 'self' 'unsafe-inline'" : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "connect-src 'self' http://localhost:1337 https: ws: wss:"
].join('; ');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      { protocol: 'https', hostname: 'braintek.ae' }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ...productionOnly
        ]
      }
    ];
  }
};

export default nextConfig;
