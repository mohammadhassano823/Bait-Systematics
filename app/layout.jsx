import './globals.css';
import CookieConsent from '@/components/CookieConsent';
import { SITE_URL, BUSINESS, SOCIAL } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Bait Systematics — Software, AI & Digital Growth Worldwide', template: '%s' },
  description: BUSINESS.description,
  keywords: ['software company', 'web development', 'mobile app development', 'AI software', 'agentic AI', 'inventory system', 'pharmacy system', 'POS system', 'SEO', 'Google Ads', 'Facebook Ads', 'Faisalabad', 'Manchester'],
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
      '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: BUSINESS.name, url: SITE_URL,
      logo: `${SITE_URL}/images/bait-systematics-logo-full.png`, email: BUSINESS.email, telephone: BUSINESS.phones,
      description: BUSINESS.description, founder: BUSINESS.founders.map((name) => ({ '@type': 'Person', name })),
      parentOrganization: { '@type': 'Organization', name: BUSINESS.parent }, areaServed: 'Worldwide',
      sameAs: SOCIAL.map((s) => s.url),
    },
    ...BUSINESS.offices.map((o, i) => ({
      '@type': 'ProfessionalService', '@id': `${SITE_URL}/#office-${i}`, name: o.name, url: SITE_URL,
      image: `${SITE_URL}/images/og-image.png`, telephone: o.phone, email: BUSINESS.email, parentOrganization: { '@id': `${SITE_URL}/#org` },
      address: { '@type': 'PostalAddress', streetAddress: o.street, addressLocality: o.city, addressRegion: o.region, postalCode: o.postal, addressCountry: o.country },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '18:00' }],
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
