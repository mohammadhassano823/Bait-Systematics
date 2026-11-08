import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// Shared top navigation for server-rendered inner pages (service and location pages).
const LINKS = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Work'], ['/contact', 'Contact']];

export default function SiteNav({ active }) {
  return (
    <header className="nav"><nav aria-label="Main" className="nav-in">
      <Link className="brand" href="/"><img src="/images/bait-systematics-logo.png" alt="Bait Systematics" className="sf-brand-logo" width="1000" height="228" /></Link>
      <div className="nav-links">{LINKS.map(([href, label]) => <Link key={href} className={'nl' + (active === href ? ' on' : '')} href={href}>{label}</Link>)}</div>
      <Link className="btn" href="/contact">Book a call <ArrowUpRight size={14} strokeWidth={2.6} aria-hidden="true" /></Link>
    </nav></header>
  );
}
