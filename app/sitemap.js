import { SITE_URL } from '@/lib/site';

// /sitemap.xml — the list of pages Google should index.
export default function sitemap() {
  const now = new Date();
  return [
    { path: '', priority: 1, freq: 'weekly' },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/portfolio', priority: 0.8, freq: 'monthly' },
    { path: '/about', priority: 0.8, freq: 'monthly' },
    { path: '/contact', priority: 0.8, freq: 'yearly' },
    { path: '/privacy', priority: 0.3, freq: 'yearly' },
    { path: '/terms', priority: 0.3, freq: 'yearly' },
  ].map(({ path, priority, freq }) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: freq, priority }));
}
