'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES } from '@/lib/services';

const FEATURED = ['ai', 'mobile', 'web', 'crm'].map(id => SERVICES.find(service => service.id === id));
const COPY = {
  ai: ['AI & Automation', 'Give your team time back. Connect AI assistants to your everyday tools and turn repetitive tasks into dependable workflows.'],
  mobile: ['Mobile Applications', 'Put your product within reach. Thoughtful Android and Flutter apps that make it easier for customers to connect with your business.'],
  web: ['Web Applications', 'Build around the way you work. Custom portals, dashboards and business tools that bring your operations together.'],
  crm: ['CRM & Integrations', 'Make every customer relationship easier to manage. Connect your sales tools, automate follow-ups and keep your team in sync.'],
};

// Pinned reveal: card 1 is visible from the start; cards 2–4 each own a slice of the scroll and rise in.
const START = 0.08, GAP = 0.24, RISE = 0.18;

function ServiceCard({ service, index, progress, reducedMotion }) {
  const from = START + (index - 1) * GAP;
  const y = useTransform(progress, [from, from + RISE], [90, 0]);
  const opacity = useTransform(progress, [from, from + RISE * 0.8], [0, 1]);
  const scale = useTransform(progress, [from, from + RISE], [0.96, 1]);
  const { Icon, id } = service;
  const [title, description] = COPY[id];
  return (
    <motion.article className="sf-featured-service" style={reducedMotion || index === 0 ? undefined : { y, opacity, scale }}>
      <div className="sf-featured-service-top">
        <div className="sf-featured-service-icon"><Icon size={26} strokeWidth={1.6} aria-hidden="true" /></div>
        <span className="sf-featured-service-number" aria-hidden="true">0{index + 1}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="sf-featured-service-includes">{service.get.slice(0, 3).map(item => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul>
      <Link href={`/services#${id}`} className="sf-featured-service-link" aria-label={`Explore ${title}`}>Explore service<span><ArrowUpRight size={19} aria-hidden="true" /></span></Link>
    </motion.article>
  );
}

export default function FeaturedServices() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.7, restDelta: 0.0005 });

  return (
    <section ref={sectionRef} id="services" className="sf-featured-services sf-tone-light" aria-labelledby="sf-featured-services-title">
      <div className="sf-featured-services-sticky">
      <div className="sf-featured-services-heading">
        <div><span className="sf-featured-services-eyebrow">WHAT WE BUILD</span><h2 id="sf-featured-services-title">Built for your business.<br /><span>Ready for what’s next.</span></h2></div>
        <p>Give your customers a better experience and your team a simpler way to work. We build applications, connect your systems and automate everyday tasks so your business can move forward.</p>
      </div>
      <div className="sf-featured-services-stage">
        <div className="sf-featured-services-grid">
          {FEATURED.map((service, index) => <ServiceCard key={service.id} service={service} index={index} progress={progress} reducedMotion={reducedMotion} />)}
        </div>
      </div>
      <div className="sf-featured-services-footer"><p>One team, from the first conversation to what comes next.</p><Link href="/services" className="btn">View All Services<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
