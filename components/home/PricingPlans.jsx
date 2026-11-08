'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Rocket, Layers, TrendingUp, Check, ArrowUpRight, ShieldCheck, FileText, MessageCircle, KeyRound, Star } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

// Set `price` (e.g. 'From $1,500') when you are ready to show numbers; until then the pricing model is shown.
const PLANS = [
  {
    name: 'Launch', Icon: Rocket, for: 'For businesses ready to go online',
    d: 'A fast, polished website or landing page built to turn visitors into enquiries.',
    price: null, model: 'Fixed price', unit: 'One-time project', cta: 'Get my quote',
    feats: ['Custom design that fits your brand', 'Mobile-first and SEO-ready', 'WordPress or fully custom build', 'Contact forms and WhatsApp chat', 'Update content yourself, anytime'],
  },
  {
    name: 'Build', Icon: Layers, for: 'For products, portals and MVPs', popular: true,
    d: 'Your complete web or mobile app — designed, built, connected to payments and launched.',
    price: null, model: 'Fixed price', unit: 'Quoted after a free call', cta: 'Start my build',
    feats: ['Everything in Launch', 'Web or mobile app', 'Logins, dashboards and admin panel', 'Payments and third-party integrations', 'Live demo and staging link every sprint'],
  },
  {
    name: 'Scale', Icon: TrendingUp, for: 'For growing teams and live products',
    d: 'A dedicated team on call for new features, automation, marketing and support.',
    price: null, model: 'Monthly', unit: 'Flexible — cancel anytime', cta: 'Talk to us',
    feats: ['Dedicated developer hours', 'New features shipped monthly', 'CRM, WhatsApp and AI automation', 'Meta and Google Ads support', 'Priority support'],
  },
];

const INCLUDED = [
  { Icon: KeyRound, t: '100% code ownership' },
  { Icon: FileText, t: 'Written, itemised quote' },
  { Icon: MessageCircle, t: 'Weekly progress updates' },
  { Icon: ShieldCheck, t: 'Bug-fix warranty after launch' },
];

export default function PricingPlans() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="sf-plans">
      <div className="sf-plans-head">
        <span className="sf-featured-services-eyebrow">PRICING &amp; PLANS</span>
        <h2>Clear scope. <em>Fixed price.</em></h2>
        <p>Choose where you’d like to start. After a free 30-minute call you get a fixed, itemised quote — no hourly meters, no surprise invoices.</p>
      </div>

      <div className="sf-plans-grid">
        {PLANS.map(({ name, Icon, for: who, d, price, model, unit, feats, popular, cta }, i) => (
          <motion.article key={name} className={'sf-plan' + (popular ? ' is-popular' : '')}
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: EASE, delay: reducedMotion ? 0 : i * 0.1 }}>
            {popular ? <span className="sf-plan-badge"><Star size={12} fill="currentColor" aria-hidden="true" />Most chosen</span> : null}
            <div className="sf-plan-top">
              <span className="sf-plan-icon"><Icon size={22} strokeWidth={2} aria-hidden="true" /></span>
              <div><h3>{name}</h3><span>{who}</span></div>
            </div>
            <p className="sf-plan-desc">{d}</p>
            <div className="sf-plan-price"><strong>{price || model}</strong><span>{unit}</span></div>
            <ul>{feats.map(f => <li key={f}><span aria-hidden="true"><Check size={12} strokeWidth={3.2} /></span>{f}</li>)}</ul>
            <a href="/contact" className="sf-plan-btn">{cta}<ArrowUpRight size={17} strokeWidth={2.4} aria-hidden="true" /></a>
          </motion.article>
        ))}
      </div>

      <motion.div className="sf-plans-included"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reducedMotion ? 0 : 0.8, ease: EASE }}>
        <span className="sf-plans-included-label">Every plan includes</span>
        {INCLUDED.map(({ Icon, t }) => <span key={t} className="sf-plans-included-item"><Icon size={17} strokeWidth={2} aria-hidden="true" />{t}</span>)}
      </motion.div>
    </div>
  );
}
