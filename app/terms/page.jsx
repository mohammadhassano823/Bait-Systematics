import { Fragment } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageHero from '@/components/PageHero';
import LegalBody from '@/components/LegalBody';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({"title":"Terms of Service — Bait Systematics","description":"The terms for using the Bait Systematics website and working with us on software, AI and marketing projects.","path":"/terms"});

function renderVals() {
    const raw = [
      { id: 'about', t: 'About these terms', ps: ['These Terms of Service (“Terms”) apply to your use of our website and to any services we provide. If you sign a separate proposal, statement of work or agreement with us, that document will also apply, and it takes priority where it conflicts with these Terms.'] },
      { id: 'services', t: 'Our services', ps: ['We provide software design and development services, including web applications, SaaS platforms, CRM automation, APIs, UI/UX design and ongoing maintenance. The exact scope, deliverables, timeline and price for each project are set out in a written proposal or statement of work.'] },
      { id: 'proposals', t: 'Proposals & changes', ps: ['Quotes are valid for [X] days unless stated otherwise. Work outside the agreed scope is treated as a change request and may affect the timeline and cost. We will always agree changes with you in writing before starting them.'] },
      { id: 'payment', t: 'Fees & payment', ps: ['Unless agreed otherwise:'], list: ['Fixed-scope projects are billed in milestones, with a deposit of [X]% before work starts.', 'Retainers and dedicated-developer plans are billed monthly in advance.', 'Invoices are due within 7 working days. Late payments may pause work until the account is settled.', 'Prices exclude applicable taxes and third-party costs such as hosting, licences or paid APIs.'] },
      { id: 'client', t: 'Your responsibilities', ps: ['To keep your project on track, you agree to:'], list: ['Provide content, feedback, access and approvals in a timely way.', 'Make sure any materials you provide do not infringe anyone else’s rights.', 'Nominate a decision-maker for the project.'] },
      { id: 'ip', t: 'Intellectual property', ps: ['Once you have paid all fees due for a project, you own the final deliverables we create specifically for you, including source code and designs.', 'We keep ownership of our pre-existing tools, libraries and know-how, and grant you a perpetual licence to use any of them included in your deliverables. Open-source components remain under their own licences.', 'Unless you ask us not to, we may show the project in our portfolio without revealing confidential information.'] },
      { id: 'confidential', t: 'Confidentiality', ps: ['Both parties agree to keep each other’s confidential information private and to use it only for the purpose of the project. We are happy to sign a separate NDA on request.'] },
      { id: 'warranty', t: 'Warranty & support', ps: ['We fix defects in our work reported within 7 working days of delivery at no extra cost. After that period, support and changes are provided under a maintenance plan or at our standard rates.', 'Except as stated here, the services are provided “as is” to the extent permitted by law.'] },
      { id: 'liability', t: 'Limitation of liability', ps: ['To the extent permitted by law, our total liability for any claim relating to a project is limited to the fees you paid for that project in the [X] months before the claim. We are not liable for indirect or consequential losses such as lost profits or data.'] },
      { id: 'termination', t: 'Termination', ps: ['Either party may end a project with [X] days’ written notice. You will pay for work completed up to the termination date, and we will hand over all paid-for work in its current state.'] },
      { id: 'website', t: 'Use of this website', ps: ['You may browse and share our website for lawful purposes. You must not attempt to disrupt it, gain unauthorised access, or copy its content for commercial use without permission.'] },
      { id: 'law', t: 'Governing law & contact', ps: ['These Terms are governed by the laws of [Jurisdiction]. Any disputes will be handled by the courts of Faisalabad, Pakistan, unless we agree to mediation first.', 'We may update these Terms from time to time. Contact: Bait Systematics, 14-Z Commercial Market, Madina Town, Faisalabad, Pakistan, info@baitsystematics.com.'] }
    ];
    const secs = raw.map((s, i) => ({ ...s, n: (i < 9 ? '0' : '') + (i + 1), hasList: !!(s.list && s.list.length), list: s.list || [] }));
    return { secs };
  }

export default function TermsPage() {
  const v = renderVals();
  return (
<div className="sf">
<div className="prog" aria-hidden="true"></div>

<header className="nav"><nav aria-label="Main" className="nav-in">
<Link className="brand" href="/"><img src="/images/bait-systematics-logo.png" alt="Bait Systematics" className="sf-brand-logo" width="1000" height="228" /></Link>
<div className="nav-links"><Link className="nl" href="/">Home</Link><Link className="nl" href="/about">About</Link><Link className="nl" href="/services">Services</Link><Link className="nl" href="/portfolio">Work</Link><Link className="nl" href="/contact">Contact</Link></div>
<Link className="btn" href="/contact">Book a call <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg></Link>
</nav></header>

<PageHero id="legal-title" eyebrow="Legal · Terms of Service" legal="TERMS"
  title={<>Clear terms. <em>No surprises.</em></>}
  lede="The rules for using the Bait Systematics website and working with us on software, AI and marketing projects — scope, payments, ownership and support, all in plain English."
  primary={{ href: "#legal-body", label: "Read the terms" }} secondary={{ href: "/privacy", label: "Privacy Policy" }}
  chips={["Last updated 8 November 2026", "Applies worldwide"]}
  bullets={["You own the code on final payment", "Fixed scope agreed before we start", "Questions? info@baitsystematics.com"]} />

<LegalBody secs={v.secs} glance={[['Scope agreed first', 'Every project starts with a written proposal: deliverables, timeline and price.'], ['You own the code', 'Source code, designs and IP transfer to you on final payment.'], ['Support after launch', 'Defects in our work are fixed free during the warranty period.']]} cta={{ title: 'Questions about these terms?', text: 'Happy to explain anything before you sign. Email us or send a query from the contact page.' }} />

<SiteFooter />
</div>
  );
}
