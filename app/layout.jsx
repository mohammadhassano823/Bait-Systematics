import './globals.css';
import CookieConsent from '@/components/CookieConsent';
import { SITE_URL, BUSINESS, SOCIAL } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Bait Systematics | Software House in Manchester & Faisalabad', template: '%s' },
  applicationName: 'Bait Systematics',
  authors: [{ name: 'Bait Systematics', url: SITE_URL }],
  creator: 'Bait Systematics',
  publisher: 'Bait Systematics',
  description: BUSINESS.description,
  keywords: ['Bait Systematics', 'BAIT Systematics', 'software house Faisalabad', 'software house Madina Town', 'software company Manchester', 'web development', 'mobile app development', 'AI software', 'agentic AI', 'inventory system', 'pharmacy software', 'POS system', 'SEO services', 'Google Ads', 'Facebook Ads', 'BAIT International Group'],
  openGraph: {
    type: 'website', siteName: BUSINESS.name, url: SITE_URL,
    title: 'Bait Systematics — Build • Innovate • Grow',
    description: BUSINESS.description,
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Bait Systematics' }],
  },
  twitter: { card: 'summary_large_image', title: 'Bait Systematics — Build • Innovate • Grow', description: BUSINESS.description, images: ['/images/og-image.png'] },
  robots: { index: true, follow: true },
  // Google Search Console "HTML tag" verification code goes in NEXT_PUBLIC_GSC_VERIFICATION
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};

// Structured data so Google understands the business, its two offices and contact details.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: BUSINESS.name,
      alternateName: ['BAIT Systematics', 'Bait Systematics Manchester', 'Bait Systematics Faisalabad'], publisher: { '@id': `${SITE_URL}/#org` }, inLanguage: 'en',
    },
    {
      '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: BUSINESS.name, alternateName: 'BAIT Systematics', url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/bait-logo-square.png`, width: 720, height: 720, caption: 'Bait Systematics logo' },
      image: `${SITE_URL}/images/og-image.png`, email: BUSINESS.email, telephone: BUSINESS.phones, foundingDate: '2024',
      slogan: 'Build. Innovate. Grow.', description: BUSINESS.description,
      founder: BUSINESS.people.map((p) => ({ '@id': `${SITE_URL}/#${p.id}` })),
      parentOrganization: { '@type': 'Organization', name: BUSINESS.parent, foundingDate: '1967' }, areaServed: 'Worldwide',
      knowsAbout: ['Web development', 'Mobile app development', 'AI software', 'Agentic AI', 'Inventory management systems', 'Pharmacy software', 'POS systems', 'SEO', 'Google Ads', 'Facebook Ads'],
      sameAs: SOCIAL.map((s) => s.url),
    },
    ...BUSINESS.people.map((p) => ({
      '@type': 'Person', '@id': `${SITE_URL}/#${p.id}`, name: p.name, jobTitle: p.role, worksFor: { '@id': `${SITE_URL}/#org` },
      image: `${SITE_URL}${p.photo}`, url: `${SITE_URL}/about`, ...(p.sameAs ? { sameAs: p.sameAs } : {}),
    })),
    ...BUSINESS.offices.map((o, i) => ({
      '@type': 'ProfessionalService', '@id': `${SITE_URL}/#office-${i}`, name: o.name,
      image: `${SITE_URL}/images/og-image.png`, logo: `${SITE_URL}/images/bait-logo-square.png`, telephone: o.phone, url: `${SITE_URL}${o.page}`, email: BUSINESS.email, parentOrganization: { '@id': `${SITE_URL}/#org` },
      address: { '@type': 'PostalAddress', streetAddress: o.street, addressLocality: o.city, addressRegion: o.region, postalCode: o.postal, addressCountry: o.country },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: o.days, opens: o.opens, closes: o.closes }],
      areaServed: 'Worldwide',
    })),
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
