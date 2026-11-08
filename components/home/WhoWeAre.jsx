'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import Image from 'next/image';
import hassanPhoto from '@/public/team/muhammad-hassan-co-founder-bait-systematics.jpg';
import adilPhoto from '@/public/team/muhammad-adil-co-founder-bait-systematics.jpg';

const EASE = [0.16, 1, 0.3, 1];
const POINTS = [
  ['Business first', 'We define the problem, the priorities and what success looks like — before any code.'],
  ['Built to grow', 'Secure, maintainable software shaped around your workflows.'],
  ['Fully transparent', 'Clear scope, honest timelines and updates from the people doing the work.'],
  ['Here after launch', 'Ongoing support and improvements as your business evolves.'],
];

export default function WhoWeAre() {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0, x = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: x ? 0 : 28, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0 : 0.8, ease: EASE, delay: reducedMotion ? 0 : delay },
  });

  return (
    <section id="about" className="sf-about sf-tone-dark" aria-labelledby="sf-about-title">
      <div className="sf-about-grid">
        <div className="sf-about-copy">
          <motion.span className="sf-featured-services-eyebrow" {...reveal()}>ABOUT BAIT SYSTEMATICS</motion.span>
          <motion.h2 id="sf-about-title" {...reveal(0.06)}>Your partner in software.<br /><em>Built for what comes next.</em></motion.h2>
          <motion.p {...reveal(0.12)}>
            Bait Systematics is the technology company of BAIT International Group — a recruitment group trusted by employers worldwide since 1967. We turn ambitious ideas into websites, apps, AI-powered software and business systems, and you work directly with the founders, from the first call to long after launch.
          </motion.p>
          <ul className="sf-about-points">
            {POINTS.map(([title, description], index) => (
              <motion.li key={title} {...reveal(0.18 + index * 0.06)}>
                <span aria-hidden="true"><Check size={16} strokeWidth={2.6} /></span>
                <div><strong>{title}</strong>{description}</div>
              </motion.li>
            ))}
          </ul>
          <motion.div {...reveal(0.42)}>
            <Link href="/about" className="sf-about-cta">More about us<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </motion.div>
        </div>

        <motion.div className="sf-about-visual" {...reveal(0.15, 40)}>
          <div className="sf-about-duo">
            <figure className="sf-about-photo">
              <Image src={hassanPhoto} alt="Muhammad Hassan, Co-Founder and Director at Bait Systematics" fill sizes="(max-width: 1000px) 50vw, 23vw" />
              <figcaption><span className="sf-about-photo-role">Co-Founder</span><strong>Muhammad Hassan</strong></figcaption>
            </figure>
            <figure className="sf-about-photo">
              <Image src={adilPhoto} alt="Muhammad Adil, Co-Founder and Lead Engineer at Bait Systematics" fill sizes="(max-width: 1000px) 50vw, 23vw" />
              <figcaption><span className="sf-about-photo-role">Co-Founder</span><strong>Muhammad Adil</strong></figcaption>
            </figure>
          </div>
          <blockquote className="sf-about-quote">“Our clients don’t just receive code — they receive a partner who understands their business.”</blockquote>
        </motion.div>
      </div>
    </section>
  );
}
