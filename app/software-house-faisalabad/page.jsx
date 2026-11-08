import LocationPage from '@/components/LocationPage';

const PATH = '/software-house-faisalabad';

export const metadata = {
  title: 'Software House in Faisalabad, Madina Town | Bait Systematics',
  description: 'Bait Systematics is a software house in Madina Town, Faisalabad building websites, mobile apps, AI software, inventory, pharmacy and POS systems, plus SEO and Google & Facebook ads. Free consultation.',
  alternates: { canonical: PATH },
};

const c = {
  path: PATH, crumb: 'Software house in Faisalabad', office: 0, city: 'Faisalabad',
  title: 'Software House in Faisalabad — Bait Systematics',
  eyebrow: 'Bait Systematics · Madina Town, Faisalabad',
  h1: <>Software house in <em>Faisalabad.</em></>,
  lede: 'Bait Systematics builds websites, mobile apps, AI-powered software and business systems for Faisalabad companies — from our office in 14-Z Commercial Market, Madina Town. Part of BAIT International Group, trusted since 1967.',
  image: '/images/about-office.jpg',
  bullets: ['14-Z Commercial Market, Madina Town', 'Meet the founders in person', 'Urdu & English communication'],
  whyEyebrow: 'WHY FAISALABAD BUSINESSES CHOOSE US',
  whyTitle: <>Local team. <em>International standard.</em></>,
  intro: [
    'Faisalabad runs on textiles, trading, pharmacies, schools and family businesses. We know these businesses because we come from one: BAIT International Group has worked out of Madina Town for decades, placing skilled workers with employers across the Gulf, Europe and Asia.',
    'That experience shapes how Bait Systematics builds software — practical systems for stock, billing, staff and customers that your team will actually use, with support from people you can visit down the road.',
  ],
  why: [
    ['Visit us in Madina Town', 'Sit down with the founders at 14-Z Commercial Market and plan your project face to face.'],
    ['Fixed, honest quotes', 'A clear price in rupees or dollars before any work starts — no surprises later.'],
    ['Systems for real businesses', 'Inventory, pharmacy, POS, school and ERP software built around how Faisalabad businesses work.'],
    ['Grow beyond Faisalabad', 'Websites, SEO and Google & Facebook ads that bring customers from across Pakistan and abroad.'],
  ],
  industries: 'Textile mills and garment exporters · pharmacies and clinics · schools, colleges and academies · retail shops and wholesale markets · restaurants · real estate · recruitment and travel agencies · startups.',
  address: '14-Z Commercial Market, Madina Town, Faisalabad 38000, Pakistan',
  phone: '+92 311 0429799', whatsapp: '923110429799',
  hours: 'Monday – Saturday, 9:00 am – 6:00 pm',
  maps: 'https://maps.google.com/?q=14-Z+Commercial+Market+Madina+Town+Faisalabad',
  faqs: [
    { q: 'Where is Bait Systematics in Faisalabad?', a: 'Our Faisalabad office is at 14-Z Commercial Market, Madina Town, Faisalabad. You are welcome to visit Monday to Saturday, 9 am to 6 pm — message us on WhatsApp first so a founder is available.' },
    { q: 'What does a website or software cost in Faisalabad?', a: 'It depends on what you need. After a free 30-minute consultation we give you a fixed, itemised quote in rupees or dollars, and that is exactly what you pay.' },
    { q: 'Do you build pharmacy, inventory and POS software?', a: 'Yes. We build pharmacy systems with batch and expiry tracking, multi-branch inventory, POS for shops and restaurants, and school management systems — all with Urdu-friendly training and local support.' },
    { q: 'Can you also do SEO and Facebook ads for my business?', a: 'Yes. Our marketing team runs SEO, Google Ads and Facebook & Instagram campaigns so customers in Faisalabad and across Pakistan can find you.' },
  ],
  ctaTitle: <>Looking for a software house in <em>Faisalabad?</em></>,
};

export default function Page() {
  return <LocationPage c={c} />;
}
