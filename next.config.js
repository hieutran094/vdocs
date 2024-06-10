if (process.env.NODE_ENV === 'development') {
  const { setupDevPlatform } = require('@cloudflare/next-on-pages/next-dev');
  setupDevPlatform({ persist: true });
}
// @ts-check
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

module.exports = nextConfig;
