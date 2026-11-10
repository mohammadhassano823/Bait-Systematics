import { SITE_URL } from '@/lib/site';
import { SERVICES, SERVICE_SLUGS } from '@/lib/services';

// /sitemap.xml — every page Google should index, with its key images.
export default function sitemap() {
  const now = new Date();
  const img = (p) => `${SITE_URL}${p}`;
  const pages = [
    { path: '', priority: 1, freq: 'weekly', images: [img('/images/og-image.png'), img('/images/bait-logo-square.png')] },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/software-house-faisalabad', priority: 0.9, freq: 'monthly', images: [img('/images/about-office.jpg')] },
    { path: '/software-company-manchester', priority: 0.9, freq: 'monthly', images: [img('/images/collaboration.jpg')] },
    { path: '/bait-international-group', priority: 0.8, freq: 'monthly', images: [img('/images/about-office.jpg')] },
    { path: '/about', priority: 0.8, freq: 'monthly', images: [img('/team/muhammad-hassan-co-founder-bait-systematics.jpg'), img('/team/muhammad-adil-co-founder-bait-systematics.jpg')] },
    { path: '/portfolio', priority: 0.8, freq: 'monthly' },
    { path: '/contact', priority: 0.8, freq: 'yearly' },
    ...SERVICES.map((s) => ({ path: `/services/${SERVICE_SLUGS[s.id]}`, priority: 0.8, freq: 'monthly', images: [img(s.img || `/services/${s.id}-premium.png`)] })),
    { path: '/privacy', priority: 0.3, freq: 'yearly' },
    { path: '/terms', priority: 0.3, freq: 'yearly' },
  ];
  return pages.map(({ path, priority, freq, images }) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: freq, priority, ...(images ? { images } : {}) }));
}
