import LocationPage from '@/components/LocationPage';
import { pageMeta } from '@/lib/seo';

const PATH = '/software-house-faisalabad';

export const metadata = pageMeta({"title":"Software House in Faisalabad, Madina Town | Bait Systematics","description":"Bait Systematics is a software house in Madina Town, Faisalabad: website design, app development, AI software, POS and pharmacy systems, SEO and ads.","path":"/software-house-faisalabad"});

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
  extra: [
    {
      eyebrow: 'WEBSITE DESIGN IN FAISALABAD', title: 'Website design and development in Faisalabad.',
      paras: [
        'Most Faisalabad businesses still win customers through word of mouth and WhatsApp. A fast, professional website turns that reputation into enquiries from Google — from customers in Faisalabad, across Pakistan and abroad.',
        'We design and build business websites, WordPress sites and online stores with Urdu-friendly content, mobile-first layouts, WhatsApp buttons, local payment options such as JazzCash, Easypaisa and bank transfer, and SEO set up from day one so you can be found when people search for your business.',
      ],
      link: ['/services/website-design-development', 'Website design services'],
    },
    {
      eyebrow: 'APP DEVELOPMENT IN FAISALABAD', title: 'Mobile app development for Faisalabad businesses.',
      paras: [
        'From delivery and booking apps to staff and sales-force apps, we build Android and iOS apps with one Flutter codebase, connected to your website, stock and accounts so everything stays in sync.',
        'Our engineering team works from Madina Town, so you can meet the developers, see progress in person and get support from people who understand how local businesses operate.',
      ],
      link: ['/services/mobile-app-development', 'Mobile app development'],
    },
    {
      eyebrow: 'SOFTWARE FOR LOCAL INDUSTRY', title: 'Business software built for how Faisalabad works.',
      paras: [
        'Textile units, wholesale traders, pharmacies, schools and recruitment agencies each run differently. We build inventory and ERP systems for mills and traders, pharmacy software with batch and expiry tracking, POS for shops and restaurants, school management systems with fee vouchers and parent apps, and recruitment software with visa and document tracking.',
        'Every system comes with training for your staff in Urdu or English, and support after launch from a team that is only a short drive away.',
      ],
      link: ['/services/inventory-management-system', 'Inventory and business systems'],
    },
    {
      eyebrow: 'DIGITAL MARKETING IN FAISALABAD', title: 'SEO, Google Ads and Facebook ads that bring enquiries.',
      paras: [
        'A website only works if people find it. Our marketing team handles SEO so you rank on Google for the services you offer, plus Google Ads and Facebook and Instagram campaigns that target customers in Faisalabad, Lahore, Islamabad, Karachi or overseas.',
        'You get clear monthly reports showing enquiries and cost per lead — not just likes and impressions.',
      ],
      link: ['/services/seo-services', 'SEO services'],
    },
  ],
  faqs: [
    { q: 'Which is the best software house in Faisalabad?', a: 'The best choice depends on your project, but look for a software house with a real office you can visit, fixed written quotes, references from local clients and support after launch. Bait Systematics offers all of these from 14-Z Commercial Market, Madina Town, with the backing of BAIT International Group since 1967.' },
    { q: 'How long does it take to build a website in Faisalabad?', a: 'A business website usually takes 2–5 weeks and an online store 3–8 weeks. Custom software and mobile apps take longer; you get a written timeline with milestones before work starts.' },
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
