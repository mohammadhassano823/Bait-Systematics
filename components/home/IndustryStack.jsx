'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { Stethoscope, Building2, ShoppingBag, GraduationCap, Rocket, ArrowUpRight, Check } from 'lucide-react';

// Industries as a horizontal gallery: the section pins and vertical scroll moves the cards sideways.
const ITEMS = [
  {
    k: 'Healthcare & clinics', img: '/industries/healthcare.webp', Icon: Stethoscope, alt: 'Bright clinic reception desk',
    line: 'Fewer no-shows, less paperwork, happier patients.',
    d: 'Online booking that fills your calendar, patient records your staff can find in seconds, and automatic WhatsApp reminders before every appointment.',
    builds: ['Online appointment booking', 'Patient records portal', 'WhatsApp reminders', 'Doctor schedules'],
    works: ['WhatsApp', 'Google Calendar', 'Payment gateways'],
  },
  {
    k: 'Real estate', img: '/industries/real-estate.webp', Icon: Building2, alt: 'Modern villa with a pool',
    line: 'Every lead followed up — before a competitor calls.',
    d: 'Property listings that load fast on any phone, enquiries captured straight into your CRM, and agents notified the moment a lead comes in.',
    builds: ['Property listing website', 'Lead capture forms', 'Zoho CRM pipeline', 'Agent mobile app'],
    works: ['Zoho CRM', 'WhatsApp', 'Google Maps'],
  },
  {
    k: 'Retail & e-commerce', img: '/industries/retail.webp', Icon: ShoppingBag, alt: 'Customer paying at a shop counter',
    line: 'Sell online and in-store from one system.',
    d: 'A storefront built for your products, stock that updates itself, and order updates sent to customers automatically.',
    builds: ['Custom online store', 'Inventory & stock', 'Payments & checkout', 'Order tracking'],
    works: ['Payment gateways', 'WhatsApp', 'Courier APIs'],
  },
  {
    k: 'Education', img: '/industries/education.webp', Icon: GraduationCap, alt: 'Books and stationery on a desk',
    line: 'Run your school or academy from one place.',
    d: 'Student portals, online courses and fee collection — so teachers teach and parents always know what is going on.',
    builds: ['Student & parent portal', 'Online courses', 'Fee management', 'Attendance tracking'],
    works: ['Zoom', 'WhatsApp', 'Payment gateways'],
  },
  {
    k: 'Startups & agencies', img: '/industries/startups.webp', Icon: Rocket, alt: 'Team working together on laptops',
    line: 'From first version to paying customers.',
    d: 'We help founders launch an MVP in weeks, then scale it into a real SaaS product with billing, teams and an admin console.',
    builds: ['MVP in weeks', 'SaaS billing', 'Admin console', 'White-label builds'],
    works: ['Payment gateways', 'AWS', 'OpenAI'],
  },
];

export default function IndustryStack() {
  const outer = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  // distance lives in a motion value so the transform always uses the latest measurement
  const distMV = useMotionValue(0);
  const x = useTransform([p, distMV], ([v, d]) => -v * d);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth + 48);
      distMV.set(d);
      setDist(d);
    };
    measure();
    // re-measure whenever the track or window changes size (fonts, images, hot reload)
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    ro.observe(document.documentElement);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); window.removeEventListener('load', measure); };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(ITEMS.length - 1, Math.round(v * (ITEMS.length - 1)));
    setActive((c) => (c === i ? c : i));
  });

  return (
    <div ref={outer} className="sf-hz" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sf-hz-sticky">
        <div className="sf-hz-head">
          <div className="sf-hz-count"><b>{String(active + 1).padStart(2, '0')}</b> / {String(ITEMS.length).padStart(2, '0')}</div>
          <div className="sf-hz-bar"><motion.span style={{ scaleX: p }} /></div>
          <div className="sf-hz-hint">Keep scrolling →</div>
        </div>
        <motion.div ref={track} className="sf-hz-track" style={{ x }}>
          {ITEMS.map(({ k, img, Icon, alt, line, d, builds, works }, i) => (
            <article key={k} className={'sf-hz-card' + (i === active ? ' on' : '')}>
              <div className="sf-hz-photo">
                <Image src={img} alt={alt} fill sizes="(max-width: 900px) 90vw, 560px" style={{ objectFit: 'cover' }} />
                <span className="sf-hz-tag"><Icon size={16} strokeWidth={2.2} /> {k}</span>
              </div>
              <div className="sf-hz-body">
                <h3>{line}</h3>
                <p>{d}</p>
                <ul>
                  {builds.map((b) => <li key={b}><Check size={15} strokeWidth={3} /> {b}</li>)}
                </ul>
                <div className="sf-hz-foot">
                  <span className="sf-hz-works">Works with <b>{works.join(' · ')}</b></span>
                  <a href="#contact" className="sf-hz-cta">Discuss your project <ArrowUpRight size={15} strokeWidth={2.4} /></a>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
