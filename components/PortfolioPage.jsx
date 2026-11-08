'use client';

import { Component, Fragment } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ProjectGrid from '@/components/portfolio/ProjectGrid';
import PageHero from '@/components/PageHero';
import { PROJECT_COUNT } from '@/lib/projects';

export default class PortfolioPage extends Component {
  constructor(props) { super(props); this.state = { tab: 'All' }; }
  renderVals() {
    const ink = '#101010', cream = '#FFFFFF', gold = '#EF0800', mint = '#FFA39C', sand = '#242424';
    const ctaBase = [
      { t: 'Let’s build', color: cream, stroke: '0', style: 'normal' },
      { t: 'something remarkable', color: 'transparent', stroke: '1.5px rgba(255,255,255,0.55)', style: 'normal' }
    ];
    return {
      cta: ctaBase.concat(ctaBase, ctaBase),
    };
  }

  render() {
    const v = this.renderVals();
    return (
<div className="sf">
<div className="prog" aria-hidden="true"></div>

<header className="nav"><nav aria-label="Main" className="nav-in">
<Link className="brand" href="/"><img src="/images/bait-systematics-logo.png" alt="Bait Systematics" className="sf-brand-logo" width="1000" height="228" /></Link>
<div className="nav-links"><Link className="nl" href="/">Home</Link><Link className="nl" href="/about">About</Link><Link className="nl" href="/services">Services</Link><Link className="nl on" href="/portfolio">Work</Link><Link className="nl" href="/contact">Contact</Link></div>
<Link className="btn" href="/contact">Book a call <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg></Link>
</nav></header>


<PageHero id="work-title" eyebrow="Our work" image="/services/design-premium.png"
  title={<>Ideas, brought to <em>life.</em></>}
  lede="From AI education platforms to Dubai holiday homes — a selection of websites, apps and platforms we have designed, built and launched for real clients."
  primary={{ href: "#portfolio-projects", label: "Explore projects" }} secondary={{ href: "/contact", label: "Start your project" }}
  bullets={[String(PROJECT_COUNT) + " live products you can visit today", "Built for clients worldwide — wherever you are", "8 industries, one accountable team"]} />


<section id="portfolio-projects" className="sf-tone-light" style={{ padding: "90px 24px" }}>
<div style={{ maxWidth: "1280px", margin: "0 auto" }}>
<ProjectGrid />
</div>
</section>


<section className="sf-tone-dark" style={{ padding: "120px 24px" }}>
<div className="wrap sf-work-cta">
<div className="sf-work-cta-copy">
<span className="sf-featured-services-eyebrow">YOUR TURN</span>
<h2>Your project could be <em>next.</em></h2>
<p>Tell us what you’re building. After a free 30-minute call you get a clear plan and a fixed, itemised quote.</p>
<ul><li>Free 30-minute call</li><li>Fixed, itemised quote</li><li>100% code ownership</li></ul>
</div>
<div className="sf-work-cta-actions">
<Link className="sf-work-cta-primary" href="/contact">Start a project <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"></path></svg></Link>
<a className="sf-work-cta-ghost" href="#portfolio-projects">Browse the work again</a>
</div>
</div>
</section>


<SiteFooter />
</div>
    );
  }
}
