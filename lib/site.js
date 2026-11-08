// Business details used for SEO: metadata, sitemap and the structured data Google reads.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://baitsystematics.com').replace(/\/$/, '');

export const BUSINESS = {
  name: 'Bait Systematics',
  legalName: 'Bait Systematics — a BAIT International Group company',
  description: 'Bait Systematics builds websites, mobile apps, AI-powered software, agentic AI systems, inventory, pharmacy and POS systems, and runs SEO, Google and Facebook ads for businesses worldwide.',
  email: 'info@baitsystematics.com',
  phones: ['+923110429799', '+447405449846'],
  offices: [
    { name: 'Bait Systematics — Head office', street: '14-Z Commercial Market, Madina Town', city: 'Faisalabad', region: 'Punjab', postal: '38000', country: 'PK', phone: '+923110429799' },
    { name: 'Bait Systematics — UK office', street: '20 Marcliffe Drive', city: 'Manchester', region: 'England', postal: 'M19 3XD', country: 'GB', phone: '+447405449846' },
  ],
  founders: ['Muhammad Hassan', 'Muhammad Adil'],
  parent: 'BAIT International Group',
};

// Social profiles. Leave a link empty until the account exists — empty ones are hidden everywhere.
export const SOCIAL = [
  { name: 'Instagram', url: 'https://www.instagram.com/baitsystematics' },
  { name: 'LinkedIn', url: '' },
  { name: 'Facebook', url: '' },
  { name: 'Upwork', url: '' },
  { name: 'Fiverr', url: '' },
  { name: 'GitHub', url: 'https://github.com/Hassan-Omar03' },
].filter((s) => s.url);
