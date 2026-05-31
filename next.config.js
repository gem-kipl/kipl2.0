/** @type {import('next').NextConfig} */

// Derive the WordPress host so next/image can optimize media from it.
const wpHost = (() => {
  try {
    return new URL(process.env.WP_API_URL || 'https://kipl1.gemaromatics.com/wp-json').hostname;
  } catch {
    return 'kipl1.gemaromatics.com';
  }
})();

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: wpHost },
      // WordPress media is often served from the same host; add a CDN here if used.
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
