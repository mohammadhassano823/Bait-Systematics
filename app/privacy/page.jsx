import { Fragment } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageHero from '@/components/PageHero';
import LegalBody from '@/components/LegalBody';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({"title":"Privacy Policy — Bait Systematics","description":"How Bait Systematics collects, uses and protects your information, and the cookie choices you have on our website.","path":"/privacy"});

function renderVals() {
    const raw = [
      { id: 'collect', t: 'Information we collect', ps: ['We collect information you give us directly, and some information automatically when you use our website.'], list: ['Contact details you submit — such as your name, email address, phone or WhatsApp number and company name.', 'Project information you share with us — briefs, budgets, timelines and files.', 'Technical data — such as IP address, browser type, device information and pages visited, collected through cookies and analytics tools.'] },
      { id: 'use', t: 'How we use your information', ps: ['We use your information only for legitimate business purposes, including to:'], list: ['Respond to enquiries and provide quotes and proposals.', 'Deliver, maintain and support the services you engage us for.', 'Send project updates, invoices and important notices.', 'Improve our website, services and security.', 'Comply with legal obligations.'] },
      { id: 'cookies', t: 'Cookies & your choices', ps: ['When you first visit, a banner asks which cookies you allow. Essential cookies are always on because the site needs them — for security, loading pages and remembering your cookie choice. Everything else is off until you say yes.', 'You can change your mind at any time with “Cookie settings” in the footer. Your choice is stored for 12 months, after which we ask again.'], list: ['Essential — security, page delivery and storing your consent (always on).', 'Analytics — anonymous statistics such as Google Analytics, to see which pages are useful (only with consent).', 'Marketing — measuring Facebook and Google ad campaigns and showing relevant ads (only with consent).'] },
      { id: 'share', t: 'Sharing your information', ps: ['We do not sell your personal information. We share it only with:'], list: ['Trusted service providers who help us run our business (for example hosting, email, CRM and payment providers), under confidentiality obligations.', 'Professional advisers such as accountants or lawyers, where needed.', 'Authorities, where required by law or to protect our rights.'] },
      { id: 'client', t: 'Client project data', ps: ['When we build or maintain software for you, we may access data stored in your systems. We process that data only to deliver the agreed services, keep it confidential, and follow any data-handling terms set out in our agreement with you.'] },
      { id: 'security', t: 'Data security', ps: ['We use reasonable technical and organisational measures to protect your information, including access controls, encryption in transit and secure hosting. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.'] },
      { id: 'retention', t: 'Data retention', ps: ['We keep personal information only as long as needed for the purposes described in this policy, or as required by law. Enquiry data is typically kept for [X months/years]; project and billing records for [X years].'] },
      { id: 'rights', t: 'Your rights', ps: ['Depending on where you live, you may have the right to:'], list: ['Access the personal information we hold about you.', 'Ask us to correct or delete your information.', 'Object to or restrict certain processing.', 'Withdraw consent at any time, where processing is based on consent.'] },
      { id: 'intl', t: 'International transfers', ps: ['We work with clients worldwide, and our service providers may be located in other countries. When information is transferred internationally, we take reasonable steps to ensure it remains protected.'] },
      { id: 'changes', t: 'Changes & contact', ps: ['We may update this policy from time to time. The “Last updated” date at the top shows when it was last changed.', 'If you have questions, contact Bait Systematics at 14-Z Commercial Market, Madina Town, Faisalabad, Pakistan, or 20 Marcliffe Drive, Manchester, M19 3XD, United Kingdom, or at info@baitsystematics.com.'] }
    ];
    const secs = raw.map((s, i) => ({ ...s, n: (i < 9 ? '0' : '') + (i + 1), hasList: !!(s.list && s.list.length), list: s.list || [] }));
    return { secs };
  }

export default function PrivacyPage() {
  const v = renderVals();
  return (
<div className="sf">
<div className="prog" aria-hidden="true"></div>

<header className="nav"><nav aria-label="Main" className="nav-in">
<Link className="brand" href="/"><img src="/images/bait-systematics-logo.png" alt="Bait Systematics" className="sf-brand-logo" width="1000" height="228" /></Link>
<div className="nav-links"><Link className="nl" href="/">Home</Link><Link className="nl" href="/about">About</Link><Link className="nl" href="/services">Services</Link><Link className="nl" href="/portfolio">Work</Link><Link className="nl" href="/contact">Contact</Link></div>
<Link className="btn" href="/contact">Book a call <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg></Link>
</nav></header>

<PageHero id="legal-title" eyebrow="Legal · Privacy Policy" legal="PRIVACY"
  title={<>Your data stays <em>yours.</em></>}
  lede="What Bait Systematics collects when you use our website and services, why we collect it, and the choices you always have. Written in plain English — no fine-print games."
  primary={{ href: "#collect", label: "Read the policy" }} secondary={{ href: "/terms", label: "Terms of Service" }}
  chips={["Last updated 8 November 2026", "Applies worldwide"]}
  bullets={["We never sell your personal data", "NDA available on every project", "Questions? info@baitsystematics.com"]} />

<LegalBody secs={v.secs} glance={[['We never sell your data', 'Your details are used only to reply, quote and deliver your project.'], ['You choose the cookies', 'Analytics and marketing cookies run only if you accept them.'], ['Ask, fix or delete', 'Email us and we will show, correct or remove what we hold.']]} cta={{ title: 'Questions about your privacy?', text: 'Email us and a real person will reply within 7 working days — usually much sooner.' }} />

<SiteFooter />
</div>
  );
}
