import Link from 'next/link';
import { ArrowUpRight, Check, Plus, Layers, MessagesSquare } from 'lucide-react';
import SiteFooter from '@/components/SiteFooter';
import HeroBackground from '@/components/HeroBackground';
import styles from './services.module.css';
import ServicesExplorer from './ServicesExplorer';
import Reveal from './Reveal';
import PageHero from '@/components/PageHero';
import ProcessSteps from './ProcessSteps';

export const metadata = {
  title: 'Services — Bait Systematics',
  description: 'AI-powered software, agentic AI, websites, mobile apps, inventory, pharmacy and POS systems, SEO and Google & Facebook ads — explore all 21 Bait Systematics services.',
  alternates: { canonical: '/services' },
};

const copy = {
  web: ['Make your workflow work better.', 'Give customers a place to book, teams a place to collaborate and your business a clearer view of its operations. We build custom web applications around the way you work.'],
  wordpress: ['A website your team can own.', 'Turn visitors into enquiries with a considered, fast-loading website. From company sites to WooCommerce stores, we make managing your content feel straightforward.'],
  mobile: ['Put your product in their pocket.', 'Keep customers connected wherever they are. We design and build Android and Flutter apps with thoughtful navigation, useful notifications and the integrations your product needs.'],
  saas: ['Build a product people come back to.', 'Take your idea from an early concept to a subscription platform. Accounts, onboarding, permissions and billing come together in a product built to grow with your customers.'],
  ai: ['Give repetitive work a new owner.', 'Let AI handle enquiries, read documents and move routine tasks forward. We connect agents to your tools and keep human approval in place where judgment matters.'],
  crm: ['Keep every lead moving forward.', 'Bring your sales process into one organised system. We configure Zoho CRM, connect your tools and automate follow-ups so your team can focus on the next conversation.'],
  whatsapp: ['Be there when customers reach out.', 'Turn WhatsApp into a useful part of your customer experience. Answer common questions, share order updates and capture enquiries through the official Business API.'],
  erp: ['One connected view of your business.', 'Connect stock, sales, finance and people in a system shaped around your operations. Reduce duplicate entry and give each team the information it needs to act.'],
  ads: ['Turn attention into enquiries.', 'Reach the right people on Google, Facebook and Instagram. We bring campaign strategy, creative and conversion tracking together so you can understand what brings leads in.'],
  api: ['Make your systems work together.', 'Connect the tools your business relies on. We build documented APIs, payment integrations and background workflows with clear authentication and dependable data handling.'],
  design: ['Make the next step feel obvious.', 'Help people understand your product from the first screen. We turn research and user journeys into clear interfaces, reusable components and prototypes you can test before development.'],
  ecommerce: ['A store that sells while you sleep.', 'Give customers a fast, trustworthy place to buy. Payments, delivery and stock work together, so every order flows from checkout to doorstep without manual work.'],
  aisoft: ['Software that thinks with you.', 'Put AI where it saves real time — searching your records, reading documents, forecasting demand and guiding users. Practical intelligence inside the tools your team already uses.'],
  inventory: ['Never guess your stock again.', 'See every item across every branch in real time. Scan, transfer, reorder and count with confidence, and stop losing money to dead stock and shortages.'],
  pharmacy: ['Faster counters. Zero expired stock.', 'Bill customers in seconds, find medicines by generic or brand name and get warned before batches expire. Suppliers, credit and profit stay clear every single day.'],
  pos: ['Every sale, every branch, one screen.', 'Billing that keeps the queue moving, even when the internet drops. Kitchen orders, loyalty and end-of-day closing come together with live reports for the owner.'],
  school: ['Run the campus, not the paperwork.', 'Admissions, fees, attendance and results in one system — with a parent app that keeps families informed and fee collection on time.'],
  hr: ['Built by a recruitment family.', 'BAIT International Group has placed workers overseas since 1967. We turn that experience into software for agencies and HR teams — from CV to visa to deployment.'],
  seo: ['Be the answer on Google.', 'Rank for the searches your customers already make. We fix the technical basics, write content that earns trust and grow local visibility month after month.'],
  social: ['Stay seen. Stay remembered.', 'Consistent, on-brand content and quick replies build a following that turns into customers. We plan, design and manage your pages so you can focus on the business.'],
  ops: ['Keep improving after launch.', 'Give your product the ongoing attention it needs. Hosting, monitoring, security updates and planned improvements help your software keep pace with your business.'],
};
const models = [
  { kind: 'Project', title: 'A defined project', tag: 'A clear goal. A focused build.', body: 'For a new website, application or a specific business problem. We agree on the deliverables, timeline and price before development starts.', points: ['Agreed scope and milestones', 'Progress demos throughout the build', 'Launch and handover'], best: 'New products & planned launches' },
  { kind: 'Retainer', title: 'An ongoing partnership', tag: 'A product that keeps getting better.', body: 'For software that is already in use and ready for its next chapter. We plan a monthly backlog around the improvements that matter most.', points: ['A prioritised monthly roadmap', 'Maintenance and product improvements', 'Regular planning and reviews'], best: 'Live products & growing teams' },
  { kind: 'Dedicated', title: 'An embedded developer', tag: 'More capacity. The same direction.', body: 'For teams that need a senior engineer working alongside them. Add focused development capacity to your existing process and roadmap.', points: ['Dedicated engineering time', 'Your tools and team workflow', 'Direct technical collaboration'], best: 'Teams with an active roadmap' },
];
const faqs = [
  ['I am not sure which service I need. Where do I start?', 'Tell us what you want to improve, who will use it and how you work today. We will help you identify a practical starting point and the services it needs.'],
  ['Can you improve an existing website or application?', 'Yes. We can review the current code, design and infrastructure, then recommend what to keep, what to improve and what needs more investigation before we estimate the work.'],
  ['How do you estimate cost and delivery time?', 'We estimate after understanding your requirements, integrations and priorities. The timeframes shown above are starting guides; your proposal will define the scope, milestones and cost for your project.'],
  ['What happens when the project goes live?', 'We plan deployment and handover as part of the project. If you need ongoing help, we can agree on a maintenance or improvement plan that fits your product.'],
];

export default function ServicesPage() {
  return (
    <div className={`sf ${styles.page}`} id="top">
      <header className="nav"><nav className={`nav-in ${styles.nav}`} aria-label="Main">
        <Link className="brand" href="/"><img src="/images/bait-systematics-logo.png" alt="Bait Systematics" className="sf-brand-logo" width="1000" height="228" /></Link>
        <div className={`nav-links ${styles.navLinks}`}><Link className="nl" href="/">Home</Link><Link className="nl" href="/about">About</Link><Link className="nl on" aria-current="page" href="/services">Services</Link><Link className="nl" href="/portfolio">Work</Link><Link className="nl" href="/contact">Contact</Link></div>
        <Link className={`btn ${styles.navCta}`} href="/contact">Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </nav></header>

      <main>
        {/* ---------- hero ---------- */}
        <PageHero id="services-title" eyebrow="Services" image="/services/hero.jpg"
          title={<>Everything it takes to turn an idea into <em>software.</em></>}
          lede="Websites, apps, AI-powered software, business systems and marketing — twenty-one services that work on their own and even better together. From a pharmacy counter to a global SaaS, we build it, launch it and help it grow."
          primary={{ href: "/contact", label: "Get a free consultation" }} secondary={{ href: "#services", label: "Explore services" }}
          chips={["AI-Powered Software", "Agentic AI Systems", "Websites", "Mobile Apps", "Inventory Systems", "Pharmacy Systems", "POS & Retail", "SEO & Google Ads"]} />

        {/* ---------- services explorer ---------- */}
        <section className={`${styles.container} ${styles.services} sf-tone-light`} id="services" aria-labelledby="capabilities-title">
          <Reveal className={styles.sectionHead}>
            <div><span className={styles.kicker}>OUR EXPERTISE</span><h2 id="capabilities-title">Software that solves problems.<br /><em>Services that move you forward.</em></h2></div>
            <p>Build a new product, improve an existing platform or simplify daily operations. Explore how we bring design, development and automation together for your business.</p>
          </Reveal>
          <ServicesExplorer copy={copy} />
          <p className={styles.note}>Every project is different. We confirm scope, cost and delivery milestones together before work begins.</p>
        </section>

        {/* ---------- process ---------- */}
        <section className={`${styles.approach} sf-tone-dark`} id="approach" aria-labelledby="approach-title">
          <div className={styles.container}>
            <ProcessSteps />
          </div>
        </section>

        {/* ---------- engagement models ---------- */}
        <section className={`${styles.container} ${styles.engagement} sf-tone-light`} aria-labelledby="engagement-title">
          <Reveal className={styles.sectionHead}>
            <div><span className={styles.kicker}>Flexible ways to work with us</span><h2 id="engagement-title">Your ambition. <em>Our way of working.</em></h2></div>
            <p>A focused launch, an ongoing partnership or extra hands for your team. Choose the setup that fits.</p>
          </Reveal>
          <div className={styles.models}>
            {models.map((m, i) => (
              <Reveal as="article" className={`${styles.model} ${i === 1 ? styles.modelFeatured : ''}`} key={m.title} delay={i * 0.1}>
                <span className={styles.modelKind}>0{i + 1} / {m.kind}</span>
                <h3>{m.title}</h3>
                <p className={styles.modelTag}>{m.tag}</p>
                <p className={styles.modelBody}>{m.body}</p>
                <ul>{m.points.map((p) => <li key={p}><Check size={15} aria-hidden="true" />{p}</li>)}</ul>
                <div className={styles.bestFor}><span>Best for</span>{m.best}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className={`${styles.container} ${styles.faq} sf-tone-dark`} aria-labelledby="faq-title">
          <Reveal>
            <div className={styles.faqIntroPanel}>
              <span className={styles.faqIntroIcon}><MessagesSquare size={30} strokeWidth={1.5} aria-hidden="true" /></span>
              <span className={styles.kicker}>GOOD QUESTIONS. CLEAR ANSWERS.</span>
              <h2 id="faq-title">Let’s clear<br /><em>a few things up.</em></h2>
              <p className={styles.faqIntroCopy}>Scope, timelines, existing software and what happens after launch. Here are the details worth knowing before we begin.</p>
              <div className={styles.faqIntroContact}><span>Something else on your mind?</span><Link href="/contact">Ask us a question<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className={styles.faqList}>
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0}><summary><span>{q}</span><Plus size={20} aria-hidden="true" /></summary><p>{a}</p></details>
            ))}
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
