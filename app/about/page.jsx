import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import hassanPhoto from '@/public/team/muhammad-hassan-co-founder-bait-systematics.jpg';
import adilPhoto from '@/public/team/muhammad-adil-co-founder-bait-systematics.jpg';
import PageHero from '@/components/PageHero';
import { ArrowUpRight, Target, Compass, Code2, MessageSquare, ShieldCheck, BadgeCheck } from 'lucide-react';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({"title":"About Bait Systematics — Founders Muhammad Hassan & Muhammad Adil | BAIT International Group","description":"Meet Bait Systematics, the technology company of BAIT International Group (since 1967), founded by brothers Muhammad Hassan and Muhammad Adil.","path":"/about"});

const VALUES = [
 { title: 'Integrity', description: 'Honest estimates, honest timelines and honest advice — even when it is not what you hoped to hear.', Icon: ShieldCheck },
 { title: 'Transparency', description: 'Clear progress updates at every stage, so you always know what is being built and what comes next.', Icon: MessageSquare },
 { title: 'Quality', description: 'Clean, tested, maintainable code — not shortcuts that cost you later.', Icon: Code2 },
 { title: 'Ownership', description: 'We treat every client’s product as if it were our own, and you keep the code, designs and IP.', Icon: Target },
 { title: 'Partnership', description: 'Long-term relationships over one-off transactions, with support long after launch.', Icon: Compass },
 { title: 'Continuous learning', description: 'Keeping pace with modern tools and best practice so your product stays current.', Icon: Code2 },
];

const HERITAGE = [
 { year: '1967', text: 'BAIT begins placing Pakistani professionals with employers in Norway and across Europe.' },
 { year: '1979', text: 'The group opens the Saudi Arabian and Gulf markets — engineers, technicians and skilled trades.' },
 { year: '2008', text: 'Overseas operations launch in Malaysia, Brunei and Singapore.' },
 { year: 'Today', text: 'Bait Systematics brings the same promise to software, AI and digital growth.' },
];

const GROUP_STATS = [
 ['1967', 'Recruiting for employers worldwide'],
 ['1,317', 'Skilled professionals deployed to Saudi Arabia, 2017–2022'],
 ['5,000+', 'Workers placed with companies in Malaysia and Qatar'],
 ['4', 'Workforce categories — highly skilled, skilled, semi-skilled and unskilled'],
];

const ASSOCIATES = ['Saudi Telecom Company', 'Almarai', 'SRACO for Saudi Aramco', 'Alsalam Aerospace Industries', 'Obeikan Investment Group', 'Al-Babtain Group', 'Al Habtoor Group', 'ADNOC Drilling', 'ENOC', 'Dutco Group', 'Dubai Properties', 'Siemens Malaysia'];

const FOUNDERS = [
 { name: 'Muhammad Hassan', role: 'Co-Founder & Director', photo: hassanPhoto, text: 'Leads clients, partnerships and business — every proposal and deal is clear, fairly priced and delivered exactly as promised.' },
 { name: 'Muhammad Adil', role: 'Co-Founder & Lead Engineer', photo: adilPhoto, text: 'Leads engineering — architecture, AI systems and the quality of every release that reaches your customers.' },
];

const REGIONS = [['Europe', 'United Kingdom'], ['North America', 'United States'], ['Middle East', 'United Arab Emirates'], ['Asia', 'Malaysia · Pakistan (HQ)'], ['Africa', 'Mauritius'], ['Your market', 'Next on the map']];

const BORDERS = [
 ['Time-zone friendly hours', 'Working hours overlap with UK, US, Gulf and Asian business days.'],
 ['Your channels, your rhythm', 'Email, WhatsApp, Slack, Zoom or Google Meet — with weekly status calls.'],
 ['Fluent English communication', 'Clear written proposals, documentation and progress reports.'],
 ['Cost-effective delivery', 'International-standard engineering at competitive, transparent rates.'],
];

export default function AboutPage() {
 return <div className="sf sf-about-page">
 <header className="nav"><nav aria-label="Main" className="nav-in">
<Link className="brand" href="/"><img src="/images/bait-systematics-logo.png" alt="Bait Systematics" className="sf-brand-logo" width="1000" height="228" /></Link>
<div className="nav-links"><Link className="nl" href="/">Home</Link><Link className="nl on" href="/about">About</Link><Link className="nl" href="/services">Services</Link><Link className="nl" href="/portfolio">Work</Link><Link className="nl" href="/contact">Contact</Link></div>
<Link className="btn" href="/contact">Book a call <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg></Link>
</nav></header>
 <main>
 <PageHero id="about-title" eyebrow="About Bait Systematics" image="/images/about-office.jpg"
   title={<>We don’t write code for the sake of <em>code.</em></>}
   lede="Bait Systematics is the technology company of BAIT International Group — a licensed recruitment group that has connected people and employers across the world since 1967. Now we build the software, AI and marketing that help businesses grow."
   primary={{ href: "/contact", label: "Talk to our team" }} secondary={{ href: "/portfolio", label: "See our work" }}
   bullets={["Working with clients worldwide", "Offices in Faisalabad and Manchester, UK", "Part of BAIT Group since 1967"]} />
 <section className="sf-about-founder sf-duo" aria-labelledby="founders-title">
  <div className="sf-duo-wrap">
   <div className="sf-duo-head">
    <span className="sf-featured-services-eyebrow">MEET THE FOUNDERS</span>
    <h2 id="founders-title">Two brothers. <em>One standard.</em></h2>
    <p>Bait Systematics belongs to brothers Muhammad Hassan and Muhammad Adil. We grew up inside a family business where a promise to a client was a promise kept — whether that meant finding the right engineer for a project in Riyadh or the right nurse for a hospital in Kuala Lumpur. We started Bait Systematics to keep that same promise in software.</p>
   </div>
   <div className="sf-duo-grid">
    {FOUNDERS.map((f) => <figure key={f.name} className="sf-duo-card"><Image src={f.photo} alt={`${f.name}, ${f.role} at Bait Systematics`} sizes="(max-width: 760px) 100vw, 40vw" priority /><figcaption><span>{f.role}</span><strong>{f.name}</strong><p>{f.text}</p></figcaption></figure>)}
   </div>
   <div className="sf-duo-foot">
    <blockquote>“Our family has kept its word to employers across the world since 1967. Bait Systematics is how we keep it in code.”<cite>Muhammad Hassan &amp; Muhammad Adil, Co-Founders</cite></blockquote>
    <Link href="/contact" className="sf-about-text-link">Talk to the founders<ArrowUpRight size={18} /></Link>
   </div>
  </div>
 </section>
 <section className="sf-abp" aria-label="Our mission and vision"><div className="sf-about-section-wrap"><div className="sf-abp-grid">
  <article className="sf-abp-card"><span className="sf-abp-icon"><Target size={26} /></span><span className="sf-abp-label">OUR MISSION</span><h2>Ideas into <em>dependable products.</em></h2><p>To turn our clients’ ideas into high-quality digital products — delivered on time, communicated transparently and supported long after launch.</p></article>
  <article className="sf-abp-card"><span className="sf-abp-icon"><Compass size={26} /></span><span className="sf-abp-label">OUR VISION</span><h2>A trusted partner, <em>worldwide.</em></h2><p>To be a trusted technology partner for businesses around the world, known for software that is dependable, scalable and built around real business needs.</p></article>
 </div><blockquote className="sf-abp-quote">“Our clients don’t just receive code — they receive a partner who understands their business.”<cite>Muhammad Hassan, Co-Founder &amp; Director</cite></blockquote></div></section>
 <section className="sf-ab-heritage" aria-labelledby="heritage-title"><div className="sf-about-section-wrap">
  <div className="sf-ab-split"><div>
   <span className="sf-featured-services-eyebrow">OUR HERITAGE · BAIT INTERNATIONAL GROUP</span>
   <h2 id="heritage-title">From placing people<br /><em>to building platforms.</em></h2>
   <p>BAIT International Group is a government-licensed Overseas Employment Promoter, headquartered in Faisalabad, Pakistan. For almost six decades it has recruited doctors, nurses, engineers, technicians, drivers and skilled trades for employers across the Gulf, Europe and Asia.</p>
   <p>Bait Systematics was created inside the group to do for businesses online what BAIT has always done offline: understand exactly what is needed, find the right solution and deliver it on time. Because we come from a real operating business — with payroll, visas, stock, compliance and clients to answer to — we build software that works the way companies actually run.</p>
   <span className="sf-ab-licence"><BadgeCheck size={18} aria-hidden="true" />Licensed Overseas Employment Promoter · HRD/3421/LHR</span>
  </div><ol className="sf-ab-timeline">{HERITAGE.map(({year,text})=><li key={year}><strong>{year}</strong><span>{text}</span></li>)}</ol></div>
  <ul className="sf-ab-gstats">{GROUP_STATS.map(([n,l])=><li key={l}><strong>{n}</strong><span>{l}</span></li>)}</ul>
  <div className="sf-ab-assoc"><span>Group associates abroad</span><ul>{ASSOCIATES.map((c)=><li key={c}>{c}</li>)}</ul></div>
 </div></section>
 <section className="sf-ab-global"><div className="sf-about-section-wrap"><span className="sf-featured-services-eyebrow">GLOBAL DELIVERY, LOCAL COMMITMENT</span><h2>Live products on <em>five continents.</em></h2><p className="sf-ab-lede">From our head office in Faisalabad, we have delivered projects for businesses across Europe, North America, the Middle East, Africa and Asia — and we welcome new partnerships wherever you are based.</p><ul className="sf-ab-regions">{REGIONS.map(([region,place])=><li key={region}><span>{region}</span><strong>{place}</strong></li>)}</ul><div className="sf-ab-borders">{BORDERS.map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
 <section className="sf-about-values"><div className="sf-about-section-wrap"><span className="sf-featured-services-eyebrow">WHAT GUIDES US</span><h2>The standards behind our work.</h2><div className="sf-about-values-grid">{VALUES.map(({title,description,Icon})=><article key={title}><Icon size={28} /><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
 <section className="sf-about-fit"><div className="sf-about-section-wrap"><div><span className="sf-featured-services-eyebrow">WHO WE WORK WITH</span><h2>Different businesses.<br />A shared need for better software.</h2></div><div className="sf-about-fit-list"><article><h3>Founders bringing an idea to life</h3><p>A focused first product, with the essential features and a practical path to launch.</p></article><article><h3>Businesses improving daily operations</h3><p>Portals, integrations and automation that help your team work with less friction.</p></article><article><h3>Teams developing an existing product</h3><p>Thoughtful improvements, technical support and additional engineering capacity.</p></article></div></div></section>
 <section className="sf-about-contact"><h2>Let us talk about what you are building.</h2><p>Share your goals, your challenges and where you want to go next.</p><Link className="btn" href="/contact">Start a conversation<ArrowUpRight size={18} /></Link></section>
 </main><SiteFooter />
 </div>;
}
