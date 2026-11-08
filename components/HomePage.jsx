'use client';

import { Component, Fragment } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock3, Workflow, Zap, TrendingUp } from 'lucide-react';
import { TiltCard, PerfRing, CountUp, ServicesPin, panelIn } from './home/motion';

import HomeHeroVideo from '@/components/HomeHeroVideo';
import StatsBar from './home/StatsBar';
import WhoWeAre from './home/WhoWeAre';
import BigStatement from './home/BigStatement';
import EngineDiagram from './home/EngineDiagram';
import FeaturedServices from './home/FeaturedServices';
import SelectedWork from './home/SelectedWork';
import GoogleReviews from './home/GoogleReviews';
import IndustryShowcase from './home/IndustryShowcase';
import TechLogos from './home/TechLogos';
import DeliveryFramework from './home/DeliveryFramework';
import DeliveryTimeline from './home/DeliveryTimeline';
import OutcomeFlow from './home/OutcomeFlow';
import PricingPlans from './home/PricingPlans';
import FaqSection from './home/FaqSection';
import WhyChooseUs from './home/WhyChooseUs';
import AISolutions from './home/AISolutions';
import TrustedLogos from './home/TrustedLogos';
import SiteFooter from '@/components/SiteFooter';
import { NEED_OPTIONS } from '@/lib/services';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { open: 0, need: 'Web app', budget: '$5k–$15k', sent: false, svc: 0 };
    this.pinApi = { current: null };
    this.onMove = this.onMove.bind(this);
  }
  componentDidMount() {
    window.addEventListener('pointermove', this.onMove, { passive: true });
  }
  componentWillUnmount() {
    window.removeEventListener('pointermove', this.onMove);
    if (this.raf) cancelAnimationFrame(this.raf);

  }
  onMove(e) {
    this.px = e.clientX; this.py = e.clientY;
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      const root = document.querySelector('[data-sf-root]');
      if (!root) return;
      const x = this.px, y = this.py;
      root.querySelectorAll('.sf-card').forEach((el) => {
        const b = el.getBoundingClientRect();
        if (y < b.top - 300 || y > b.bottom + 300) return;
        el.style.setProperty('--x', (x - b.left) + 'px');
        el.style.setProperty('--y', (y - b.top) + 'px');
      });
    });
  }
  renderVals() {
    const accent = this.props.accent ?? '#EF0800';
    const ink = '#101010', cream = '#FFFFFF', mint = '#FFA39C', green = '#FFA39C';
    const rows = [
      { i: 'AK', t: 'Website redesign — staging', s: 'In review', bg: accent, sbg: '#321A1A', sfg: '#FFA39C', d: '1.4s' },
      { i: 'SR', t: 'CRM automation — Zoho', s: 'Live', bg: mint, sbg: '#DDF5EA', sfg: '#FFA39C', d: '1.7s' },
      { i: 'JM', t: 'Mobile dashboard v2', s: 'Building', bg: '#242424', sbg: '#242424', sfg: '#FFFFFF', d: '2.0s' }
    ];
    const tick = ['Websites', 'Web apps', 'SaaS platforms', 'CRM automation', 'AI integrations', 'E-commerce', 'Booking systems', 'Dashboards', 'Mobile-ready apps', 'APIs & integrations'];
    const dkS = { fg: cream, mu: '#A3A3A3', chip: 'rgba(255,255,255,0.1)', line: 'rgba(255,255,255,0.25)', btnBg: accent, btnFg: '#FFFFFF', vbg: '#0B0B0B', vfg: cream };
    const ltS = { fg: '#FFFFFF', mu: '#A3A3A3', chip: 'rgba(16,16,16,0.1)', line: 'rgba(16,16,16,0.3)', btnBg: ink, btnFg: cream, vbg: 'rgba(255,255,255,0.55)', vfg: '#FFFFFF' };
    const svcData = [
      { n: '01', k: 'web', t: 'Web Applications', d: 'Bespoke React + Node.js applications — portals, dashboards and internal tools engineered to be fast, secure and enduring.', feats: ['Client portals', 'Dashboards', 'Internal tools', 'PWA'], icon: 'M3 4h18v14H3zM3 8h18M8 21h8', bg: '#1C1C1C', border: 'rgba(255,255,255,0.08)', ...dkS },
      { n: '02', k: 'mobile', t: 'Mobile Apps', d: 'Native Android and cross-platform Flutter apps for iOS and Android — smooth, fast and connected to the systems you already use.', feats: ['Android', 'Flutter', 'iOS + Android', 'Push notifications'], icon: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2', bg: '#242424', border: 'transparent', ...ltS },
      { n: '03', k: 'saas', t: 'SaaS Platforms', d: 'Robust multi-tenant products with subscriptions, roles, billing and admin consoles — ready to delight real customers.', feats: ['Subscriptions', 'Roles & teams', 'Admin panel', 'Analytics'], icon: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', bg: accent, border: 'transparent', ...ltS },
      { n: '04', k: 'agent', t: 'AI Agents & Automation', d: 'Agentic AI that reads, decides and acts — answering enquiries, updating your CRM and running multi-step tasks while your team sleeps.', feats: ['AI agents', 'Multi-step workflows', 'OpenAI / Claude', 'Human approval'], icon: 'M12 8V4H8M4 8h16v12H4zM2 14h2M20 14h2M9 13v2M15 13v2', bg: '#101010', border: 'rgba(255,255,255,0.1)', ...dkS },
      { n: '05', k: 'crm', t: 'CRM & Automation', d: 'Expert Zoho CRM implementation, custom modules, workflows and integrations that reclaim hours of manual work every week.', feats: ['Zoho setup', 'Workflows', 'Deluge scripts', 'Integrations'], icon: 'M3 3h6v6H3zM15 15h6v6h-6zM9 6h6a3 3 0 0 1 3 3v6', bg: mint, border: 'transparent', ...ltS },
      { n: '06', k: 'wa', t: 'WhatsApp Automation', d: 'Official WhatsApp Business API flows — instant replies, order updates, reminders and lead capture that run 24/7.', feats: ['WhatsApp API', 'Chatbots', 'Broadcasts', 'Order alerts'], icon: 'M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z', bg: '#242424', border: 'transparent', ...dkS, vbg: '#101010' },
      { n: '07', k: 'erp', t: 'ERP Systems', d: 'One connected system for inventory, finance, HR and sales — built around how your business actually runs.', feats: ['Inventory', 'Finance', 'HR & payroll', 'Reports'], icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', bg: '#321A1A', border: 'transparent', ...ltS },
      { n: '08', k: 'api', t: 'APIs & Backend', d: 'Secure, well-architected REST and GraphQL APIs, elegant data models and dependable third-party integrations.', feats: ['REST & GraphQL', 'Auth & security', 'Payments', 'Webhooks'], icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01', bg: ink, border: 'transparent', ...dkS, vbg: '#101010', vfg: cream },
      { n: '09', k: 'ui', t: 'UI/UX Design', d: 'Research-driven interfaces and cohesive design systems that make your product intuitive and a genuine pleasure to use.', feats: ['Wireframes', 'UI design', 'Design systems', 'Prototypes'], icon: 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.6 7.6', bg: '#1C1C1C', border: '#333333', ...ltS, vbg: '#FFFFFF' },
      { n: '10', k: 'ops', t: 'Maintenance & Scaling', d: 'Managed cloud hosting, proactive monitoring, performance tuning and fresh features every month — so you can scale with confidence.', feats: ['AWS / Vercel', 'Monitoring', 'Performance', 'Monthly updates'], icon: 'M12 14l4-4M3.3 19a10 10 0 1 1 17.4 0', bg: ink, border: 'rgba(255,255,255,0.1)', ...dkS }
    ];
    const sv = this.state.svc;
    const services = svcData.map((s, i) => {
      const open = sv === i;
      return { ...s, open, closed: !open, flex: open ? '8 1 0%' : '1 1 0%', isWeb: s.k === 'web', isSaas: s.k === 'saas', isCrm: s.k === 'crm', isApi: s.k === 'api', isUi: s.k === 'ui', isOps: s.k === 'ops', isMobile: s.k === 'mobile', isAgent: s.k === 'agent', isWa: s.k === 'wa', isErp: s.k === 'erp', pick: () => { if (this.pinApi.current && this.pinApi.current.go(i)) return; if (this.state.svc !== i) this.setState({ svc: i }); } };
    });
    const uptime = Array.from({ length: 30 }, (_, i) => (i === 11 ? accent : (i === 23 ? '#FFFFFF' : '#FFA39C')));
    const done = [2, 3, 5, 9, 10, 12, 16, 17, 19];
    const cal = Array.from({ length: 21 }, (_, i) => {
      const demo = i === 6 || i === 13 || i === 20;
      const d = done.indexOf(i) > -1;
      return { t: demo ? '★' : String(i + 1), bg: demo ? accent : (d ? ink : '#242424'), fg: demo ? ink : (d ? cream : '#A3A3A3') };
    });
    const bh = [45, 60, 52, 70, 64, 80, 72, 88, 76, 92, 84, 96];
    const bars = bh.map((h, i) => ({ h: h + '%', o: (0.45 + i * 0.045).toFixed(2), d: (i * 0.12).toFixed(2) + 's' }));
    const dk = { fg: '#FFFFFF', mu: '#A3A3A3', chip: 'rgba(16,16,16,0.1)', stroke: 'rgba(16,16,16,0.28)' };
    const steps = [
      { n: '01', top: '100px', time: 'Week 1', title: 'Discover', body: 'An in-depth session to understand your goals, users and constraints. You leave with a precise scope, a realistic timeline and a fixed quote.', out: ['Scope document', 'Timeline', 'Fixed quote'], bg: '#1C1C1C', fg: cream, mu: '#A3A3A3', chip: 'rgba(255,255,255,0.1)', stroke: 'rgba(255,255,255,0.3)' },
      { n: '02', top: '128px', time: 'Week 2–3', title: 'Design', body: 'Wireframes, refined UI and robust system architecture — reviewed and approved by you before a single line of code is written.', out: ['Wireframes', 'UI design', 'Architecture'], bg: mint, ...dk },
      { n: '03', top: '156px', time: 'Sprints', title: 'Build', body: 'Focused two-week sprints with live demos and a staging link — complete transparency, never a black box.', out: ['Sprint demos', 'Staging link', 'Tests'], bg: accent, ...dk },
      { n: '04', top: '184px', time: 'Launch', title: 'Launch & grow', body: 'A seamless production launch, proactive monitoring and a clean handover — then we continue refining the product alongside you.', out: ['Go-live', 'Monitoring', 'Support plan'], bg: ink, fg: cream, mu: '#A3A3A3', chip: 'rgba(255,255,255,0.1)', stroke: 'rgba(255,255,255,0.3)' }
    ];
    const lit = { gold: 'gold', green: 'green' };
    const manifesto = 'A small senior team turning bold ideas into |fast,| |reliable| software — and staying with you long after |launch.|';
    const words = manifesto.split(' ').map((raw) => {
      const hl = raw.indexOf('|') > -1;
      const t = raw.split('|').join('');
      return { t, c: hl ? '#FFA39C' : ink, s: 'normal', fw: '700' };
    });
    const ctaBase = [
      { t: 'Let’s build', color: cream, stroke: '0', style: 'normal' },
      { t: 'something remarkable', color: 'transparent', stroke: '1.5px rgba(255,255,255,0.55)', style: 'normal' }
    ];
    const cta = ctaBase.concat(ctaBase, ctaBase);
    const IC = {
      bulb: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z',
      db: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
      users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
      plug: 'M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4',
      web: 'M3 4h18v14H3zM3 8h18M8 21h8',
      layers: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      flow: 'M3 3h6v6H3zM15 15h6v6h-6zM9 6h6a3 3 0 0 1 3 3v6',
      spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8'
    };
    const indData = [
      { t: 'Healthcare & clinics', app: 'Clinic portal', bg: mint, d: 'Seamless appointment booking, secure patient records and WhatsApp reminders that dramatically reduce no-shows and admin overhead.', builds: ['Online booking', 'Patient portal', 'WhatsApp reminders', 'Doctor dashboards'], kpis: [{ l: 'Bookings', v: '342' }, { l: 'No-shows', v: '−38%' }, { l: 'Doctors', v: '12' }] },
      { t: 'Real estate', app: 'Property CRM', bg: accent, d: 'High-converting listing sites, intelligent lead capture and CRM pipelines that help agents respond faster and close more deals.', builds: ['Listing website', 'Lead capture', 'Zoho CRM pipeline', 'Agent app'], kpis: [{ l: 'Leads', v: '1,120' }, { l: 'Listings', v: '86' }, { l: 'Viewings', v: '214' }] },
      { t: 'E‑commerce & retail', app: 'Store admin', bg: ink, d: 'Lightning-fast storefronts, inventory and order dashboards, secure payments and seamless delivery integrations.', builds: ['Custom storefront', 'Payments', 'Inventory system', 'Order tracking'], kpis: [{ l: 'Orders', v: '2,408' }, { l: 'Products', v: '640' }, { l: 'Returns', v: '1.9%' }] },
      { t: 'Education', app: 'Learning hub', bg: '#242424', d: 'Engaging student portals, course platforms and streamlined fee management for schools, academies and educators.', builds: ['Student portal', 'Online courses', 'Fee management', 'Attendance'], kpis: [{ l: 'Students', v: '1,860' }, { l: 'Courses', v: '42' }, { l: 'Attendance', v: '94%' }] },
      { t: 'Startups & agencies', app: 'SaaS console', bg: mint, d: 'MVPs, SaaS products and white-label builds — from a compelling first release to scaling with real users.', builds: ['MVP in weeks', 'SaaS billing', 'Admin console', 'White-label builds'], kpis: [{ l: 'Users', v: '5,210' }, { l: 'MRR', v: '↑' }, { l: 'Uptime', v: '99.9%' }] }
    ];
    const techCats = [
      { n: '01', t: 'Frontend', icon: IC.web, bg: '#1C1C1C', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Redux'] },
      { n: '02', t: 'Backend', icon: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01', bg: mint, items: ['Node.js', 'Express', 'GraphQL', 'Socket.io'] },
      { n: '03', t: 'Database', icon: IC.db, bg: accent, items: ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose'] },
      { n: '04', t: 'Cloud & DevOps', icon: 'M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z', bg: '#321A1A', items: ['AWS', 'Vercel', 'Docker', 'GitHub Actions'] },
      { n: '05', t: 'CRM & Integrations', icon: IC.flow, bg: '#242424', items: ['Zoho CRM', 'Deluge', 'Payment gateways', 'WhatsApp API'] }
    ];
    const featBars = ['40%', '58%', '46%', '70%', '62%', '84%', '72%', '90%', '78%', '94%', '86%', '98%'];
    const projects = [
      { kind: 'E‑commerce', year: '[Year]', title: '[Project name]', body: '[One line on what you built and the result for the client.]', bg: mint, tiles: [ink, '#242424', '#242424', '#242424', mint, '#242424'] },
      { kind: 'CRM · Automation', year: '[Year]', title: '[Project name]', body: '[What you automated in Zoho CRM and how it changed the client’s week.]', bg: '#242424', tiles: ['#242424', ink, '#242424', ink, '#242424', '#242424'] }
    ];
    const plans = [
      { name: 'Launch', desc: 'A high-converting website or landing page that establishes a polished online presence — fast.', price: '[$X,XXX]', unit: 'one-time project', feats: ['Custom design, up to [X] pages', 'Mobile-first & SEO-ready', 'Contact forms + WhatsApp', 'Editable content (CMS)', '[X] weeks delivery'], bg: '#1C1C1C', fg: cream, muted: '#A3A3A3', border: 'rgba(255,255,255,0.1)', line: 'rgba(255,255,255,0.14)', checkBg: 'rgba(255,163,156,0.16)', checkFg: mint, btnBg: cream, btnFg: '#FFFFFF', popular: false },
      { name: 'Build', desc: 'A complete web application or MVP — frontend, backend, database and deployment, end to end.', price: '[$XX,XXX]', unit: 'fixed quote after discovery', feats: ['Everything in Launch', 'React + Node.js + MongoDB', 'Auth, dashboards & admin panel', 'Payments & integrations', 'Sprint demos + staging link'], bg: accent, fg: '#FFFFFF', muted: '#FFFFFF', border: 'transparent', line: 'rgba(255,255,255,0.2)', checkBg: ink, checkFg: accent, btnBg: ink, btnFg: cream, popular: true },
      { name: 'Scale', desc: 'A dedicated, ongoing product team for SaaS, CRM automation and sustained growth.', price: '[$X,XXX]', unit: 'per month', feats: ['Dedicated developer hours', 'New features every sprint', 'Zoho CRM & automation', 'Monitoring & performance', 'Priority support'], bg: '#101010', fg: '#FFFFFF', muted: '#A3A3A3', border: 'transparent', line: 'rgba(255,255,255,0.14)', checkBg: green, checkFg: '#FFFFFF', btnBg: ink, btnFg: cream, popular: false }
    ];
    const faqData = [
      { q: 'How much does a project cost?', a: 'Every project is scoped individually. After a brief discovery call, we provide a fixed quote with a transparent, itemised breakdown — so there are never any surprises.' },
      { q: 'How long does an MVP take?', a: 'Most MVPs take [X–Y] weeks from kickoff to launch. You receive a detailed timeline with clear milestones before any work begins.' },
      { q: 'Do you work with international clients?', a: 'Absolutely. We partner with clients worldwide, maintain overlapping hours for calls and share clear async updates in between.' },
      { q: 'Will I own the code?', a: 'Always. You retain full ownership of the code, designs and repository from day one.' },
      { q: 'Can you work on an existing project?', a: 'Certainly — we can audit, stabilise and extend an existing codebase, or seamlessly take over from a previous developer.' },
      { q: 'Do you offer support after launch?', a: 'Yes. Our monthly plans cover fixes, updates, proactive monitoring and new feature development.' }
    ];
    const faqs = faqData.map((f, i) => {
      const open = this.state.open === i;
      return { ...f, open, rot: open ? 'rotate(45deg)' : 'rotate(0deg)', chevBg: open ? ink : '#242424', chevFg: open ? accent : ink, toggle: () => this.setState({ open: open ? -1 : i }) };
    });
    const pill = (on) => ({ on, bg: on ? accent : 'transparent', fg: on ? ink : '#E5E5E5', border: on ? accent : 'rgba(255,255,255,0.2)' });
    const needs = NEED_OPTIONS.map((label) => ({ label, ...pill(this.state.need === label), pick: () => this.setState({ need: label }) }));
    const budgets = ['Under $5k', '$5k–$15k', '$15k–$50k', '$50k+'].map((label) => ({ label, ...pill(this.state.budget === label), pick: () => this.setState({ budget: label }) }));
    return {
      accent, rows, ticker: tick.concat(tick), words, cta,
      indAll: indData, techCats, uptime, services, cal, bars, steps, featBars, projects, plans, faqs, needs, budgets,
      sent: this.state.sent, notSent: !this.state.sent,
      submit: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ sent: true }); },
      reset: () => this.setState({ sent: false })
    };
  }

  render() {
    const v = this.renderVals();
    return (
<div data-sf-root="1" style={{ "--accent": v.accent, background: '#1C1C1C', color: '#FFFFFF', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", minHeight: "100vh", overflowX: "clip", WebkitFontSmoothing: "antialiased" }}>

<div className="sf-prog" aria-hidden="true"></div>


<a className="sf-wa" href="https://wa.me/923110429799" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" style={{ position: "fixed", right: "22px", bottom: "22px", zIndex: "90", display: "inline-flex", alignItems: "center", gap: "10px", minHeight: "58px", padding: "0 22px 0 8px", borderRadius: "999px", background: v.accent, color: '#FFFFFF', textDecoration: "none", fontWeight: "800", fontSize: "15px", boxShadow: "0 18px 40px -14px rgba(16,16,16,0.6)" }}>
<span style={{ position: "relative", width: "42px", height: "42px", borderRadius: "50%", display: "grid", placeItems: "center", background: "#101010", color: v.accent }}>
<span className="sf-ping" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "#101010" }}></span>
<svg style={{ position: "relative" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z"></path></svg>
</span>
<span className="sf-walabel">Chat with us</span>
</a>

<section id="top" style={{ position: "relative", background: "#101010", color: "#FFFFFF", overflow: "hidden" }}>
<HomeHeroVideo />

<header className="sf-navwrap" style={{ position: "fixed", left: "0", right: "0", top: "0", zIndex: "100", background: "rgba(16,16,16,0.72)", backdropFilter: "blur(16px) saturate(1.4)", WebkitBackdropFilter: "blur(16px) saturate(1.4)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
<nav aria-label="Main" style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
<a href="#top" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#FFFFFF" }}>
<img src="/images/bait-systematics-logo.png" alt="Bait Systematics" className="sf-brand-logo" width="1000" height="228" />
</a>
<div className="sf-navlinks" style={{ display: "flex", gap: "34px" }}>
<a className="sf-nl" href="#top" style={{ color: "#FFFFFF" }}>Home</a>
<Link className="sf-nl" href="/about">About</Link>
<Link className="sf-nl" href="/services">Services</Link>
<Link className="sf-nl" href="/portfolio">Work</Link>
<a className="sf-nl" href="#pricing">Pricing</a>
<Link className="sf-nl" href="/contact">Contact</Link>
</div>
<a className="sf-btn" href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "46px", padding: "0 22px", borderRadius: "999px", background: v.accent, color: '#FFFFFF', fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }}>Book a call
<svg className="sf-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg>
</a>
</nav>
</header>

<div className="sf-hero sf-hero-cinematic" style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "150px 24px 90px" }}>
<div className="sf-hero-txt">
<div className="sf-hero-client-badge">
<div className="sf-hero-client-logos">
{[
  ['absmd.png', 'ABS MD'],
  ['careerz.png', 'CareerZ'],
  ['chemfix-logo.png', 'CHEMfix'],
  ['hawar-logo.png', 'Hawar'],
].map(([file, name]) => <span key={file}><img src={`/logos/${file}`} alt={name} width="48" height="48" /></span>)}
</div>
<span className="sf-hero-client-label">Trusted by<strong>growing brands</strong></span>
</div>
<h1 style={{ margin: "26px 0 0", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", lineHeight: "0.98", letterSpacing: "-0.04em" }}>
<span className="sf-hero-seo"><b>Bait Systematics</b> — software house in Manchester &amp; Faisalabad</span>
<span className="sf-mask"><span className="sf-rise" style={{ animationDelay: ".1s" }}>Build.</span></span>
<span className="sf-mask"><span className="sf-rise" style={{ animationDelay: ".2s" }}>Innovate.</span></span>
<span className="sf-mask"><span className="sf-rise" style={{ animationDelay: ".3s" }}><span style={{ color: v.accent }}>Grow.</span></span></span>
</h1>
<p className="sf-up sf-d4 sf-hero-description">Websites, mobile apps, AI software and business systems that <strong>bring in customers and give your team time back.</strong> One senior team, from your first idea to launch and beyond.</p>
<div className="sf-up sf-d5 sf-hero-actions" style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "38px" }}>
<a className="sf-btn" href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "10px", minHeight: "58px", padding: "0 30px", borderRadius: "999px", background: v.accent, color: '#FFFFFF', fontWeight: "700", fontSize: "16px", textDecoration: "none" }}>Book a free strategy call
<svg className="sf-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg>
</a>
<Link className="sf-out" href="/portfolio" style={{ display: "inline-flex", alignItems: "center", minHeight: "58px", padding: "0 28px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.3)", color: "#FFFFFF", fontWeight: "600", fontSize: "16px", textDecoration: "none" }}>See our work</Link>
</div>
<div className="sf-up sf-d5 sf-hero-call-details">
<span><Clock3 size={20} aria-hidden="true" />Free 30-minute strategy call</span>
<span className="sf-hero-call-separator" aria-hidden="true" />
<span>Leave with a clear direction and an upfront quote.</span>
</div>
<ul className="sf-up sf-d6 sf-hero-benefits" aria-label="What we help you achieve">
<li><Workflow size={22} strokeWidth={1.8} aria-hidden="true" /><span>Automate the busywork</span></li>
<li><Zap size={22} strokeWidth={1.8} aria-hidden="true" /><span>Help your team move faster</span></li>
<li><TrendingUp size={22} strokeWidth={1.8} aria-hidden="true" /><span>Grow with confidence</span></li>
</ul>
</div>




</div>


<div className="sf-hero-stats-glass">
<StatsBar />
</div>
</section>


{/* Home story: who we are → what we build → outcomes → industries → proof → why us → how we work → stack → pricing → FAQ → call to action. */}
<div className="sf-logos-band sf-tone-light">
<TrustedLogos />
</div>

<WhoWeAre />

<FeaturedServices />

<EngineDiagram />

<AISolutions />

<OutcomeFlow />

<IndustryShowcase />

<SelectedWork />

<GoogleReviews />

<WhyChooseUs />

<DeliveryFramework />
<DeliveryTimeline />

<section id="stack" className="sf-tone-light" style={{ padding: "120px 24px 130px" }}>
<div style={{ maxWidth: "1280px", margin: "0 auto" }}>
<TechLogos />
</div>
</section>

<section id="pricing" className="sf-tone-dark" style={{ position: "relative", isolation: "isolate", overflow: "hidden", padding: "120px 24px" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto" }}>
<PricingPlans />
</div>
</section>

<section id="faq" className="sf-tone-light" style={{ padding: "120px 24px" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto" }}>
<FaqSection />
</div>
</section>

<BigStatement />


<SiteFooter />

</div>
    );
  }
}
