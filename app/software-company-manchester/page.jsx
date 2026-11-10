import LocationPage from '@/components/LocationPage';
import { pageMeta } from '@/lib/seo';

const PATH = '/software-company-manchester';

export const metadata = pageMeta({"title":"Software Company in Manchester, UK | Bait Systematics","description":"Bait Systematics is a Manchester software company: web design, app development, AI software and business systems for UK businesses. Free consultation.","path":"/software-company-manchester"});

const c = {
  path: PATH, crumb: 'Software company in Manchester', office: 1, city: 'Manchester',
  title: 'Software Company in Manchester — Bait Systematics',
  eyebrow: 'Bait Systematics · Manchester, United Kingdom',
  h1: <>Software company in <em>Manchester.</em></>,
  lede: 'Bait Systematics designs and builds websites, web and mobile apps, AI-powered software and business systems for UK businesses — with a Manchester office for meetings and a dedicated development team behind every project.',
  image: '/images/collaboration.jpg',
  bullets: ['20 Marcliffe Drive, Manchester M19 3XD', 'UK business hours', 'Fixed quotes in pounds'],
  whyEyebrow: 'WHY UK BUSINESSES CHOOSE US',
  whyTitle: <>Manchester contact. <em>Full delivery team.</em></>,
  intro: [
    'UK businesses want software partners who answer the phone, understand the brief and deliver on time. Bait Systematics gives you a Manchester point of contact backed by our full engineering team in Faisalabad, so you get senior-level work at a cost that makes sense.',
    'We are part of BAIT International Group, trusted by employers across the Gulf, Europe and Asia since 1967 — the same standards now go into every website, app and system we build.',
  ],
  why: [
    ['Manchester point of contact', 'Talk to us on UK hours, by phone, WhatsApp or video call, and meet in person when you need to.'],
    ['Cost-effective delivery', 'A dedicated team in Pakistan keeps prices fair without cutting corners on quality.'],
    ['Fixed quotes, clear contracts', 'A written scope and price in pounds before any work starts, and you own the code.'],
    ['Built to grow', 'SEO, Google Ads and Facebook & Instagram campaigns to bring UK customers to your new site.'],
  ],
  industries: 'Retail and e-commerce · clinics and pharmacies · property and lettings · hospitality and restaurants · recruitment agencies · education and training · professional services · startups.',
  address: '20 Marcliffe Drive, Manchester M19 3XD, United Kingdom',
  phone: '+44 7405 449846', whatsapp: '447405449846',
  hours: 'Monday – Friday, 9:00 am – 3:00 pm (UK)',
  maps: 'https://maps.google.com/?q=20+Marcliffe+Drive+Manchester+M19+3XD',
  extra: [
    {
      eyebrow: 'WEB DESIGN IN MANCHESTER', title: 'Web design and development for Manchester businesses.',
      paras: [
        'Fast, modern websites and online stores for UK businesses — built mobile-first, optimised for Google and connected to your booking, payment and CRM tools, with GDPR-friendly cookie consent included.',
        'You get a fixed quote in pounds, regular demos and full ownership of your site, with a Manchester contact for meetings and calls on UK time.',
      ],
      link: ['/services/website-design-development', 'Web design services'],
    },
    {
      eyebrow: 'APP AND SOFTWARE DEVELOPMENT', title: 'App developers and custom software for UK companies.',
      paras: [
        'Android and iOS apps, web applications, SaaS platforms and AI-powered tools — designed around your workflow and built by our own engineering team, never outsourced.',
        'Because our development team is based in Faisalabad, UK clients get senior engineering at a cost that makes sense, without compromising on communication or quality.',
      ],
      link: ['/services/web-application-development', 'Web and app development'],
    },
  ],
  faqs: [
    { q: 'Where is Bait Systematics in Manchester?', a: 'Our UK office is at 20 Marcliffe Drive, Manchester M19 3XD. We are available Monday to Friday, 9 am to 3 pm UK time, and by appointment.' },
    { q: 'How much does a website or app cost in the UK?', a: 'Every project is different. After a free consultation we give you a fixed, itemised quote in pounds — that is exactly what you pay, with no hidden extras.' },
    { q: 'Who actually builds the software?', a: 'Our own engineering team in Faisalabad, led by co-founder and lead engineer Muhammad Adil. Nothing is outsourced to third parties, and you get regular demos throughout.' },
    { q: 'Do you offer support after launch?', a: 'Yes. Monthly plans cover hosting, monitoring, security updates and new features, so your website or app keeps improving.' },
  ],
  ctaTitle: <>Looking for a software company in <em>Manchester?</em></>,
};

export default function Page() {
  return <LocationPage c={c} />;
}
