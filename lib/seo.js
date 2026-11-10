import { SITE_URL } from '@/lib/site';

// Helpers for page-level structured data.
export const breadcrumbLd = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}${path}` })),
});

export const faqLd = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export function JsonLd({ items }) {
  const data = { '@context': 'https://schema.org', '@graph': items };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Full metadata for a page: title, description, canonical URL, and share previews (Open Graph / Twitter).
export function pageMeta({ title, description, path, image = '/images/og-image.png' }) {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: 'Bait Systematics', locale: 'en_GB', url: `${SITE_URL}${path === '/' ? '' : path}`, title, description, images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
