import { SITE_URL } from '@/lib/site';

// /robots.txt — lets search engines crawl the site (except the API) and points them to the sitemap.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
