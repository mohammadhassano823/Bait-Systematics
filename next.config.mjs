import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // keep old .html URLs working
  async redirects() {
    return ['about', 'services', 'portfolio', 'contact', 'privacy', 'terms']
      .map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true }))
      .concat({ source: '/index.html', destination: '/', permanent: true });
  },
};

export default (phase) => ({
  ...nextConfig,
  // Keep development manifests isolated from production builds.
  distDir: process.env.NEXT_DIST_DIR || (phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next'),
});

