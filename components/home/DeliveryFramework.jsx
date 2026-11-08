'use client';

import Image from 'next/image';
import deliveryReview from '@/public/images/delivery-review-v2.png';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, ListChecks, Eye, Shuffle } from 'lucide-react';

const PRINCIPLES = [
  { label: 'Clear priorities', Icon: ListChecks },
  { label: 'Regular reviews', Icon: Eye },
  { label: 'Room to adapt', Icon: Shuffle },
];

export default function DeliveryFramework() {
  const reducedMotion = useReducedMotion();
  const rise = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="sf-delivery sf-tone-dark" aria-labelledby="sf-delivery-title">
      <div className="sf-delivery-glow" aria-hidden="true" />
      <div className="sf-delivery-layout">
        <motion.div className="sf-delivery-copy" {...rise()}>
          <span className="sf-featured-services-eyebrow">A COLLABORATIVE WAY TO BUILD</span>
          <h2 id="sf-delivery-title">Your project moves forward.<br /><em>You stay in the loop.</em></h2>
          <p>We break development into manageable milestones, share working demos and use your feedback to guide the next release. You can see what is being built, review decisions and understand what comes next.</p>
          <ul className="sf-delivery-principles">
            {PRINCIPLES.map(({ label, Icon }) => <li key={label}><span><Icon size={18} aria-hidden="true" /></span>{label}</li>)}
          </ul>
          <Link href="/contact" className="sf-delivery-cta">Start your project<ArrowUpRight size={19} aria-hidden="true" /></Link>
        </motion.div>

        <motion.figure className="sf-delivery-visual sf-delivery-photo" {...rise(0.15)}>
          <Image src={deliveryReview} alt="Software team reviewing interface designs on a large display in a modern meeting room" fill unoptimized sizes="(max-width: 1000px) 100vw, 640px" style={{ objectPosition: 'center' }} />
          <figcaption><span><Check size={14} strokeWidth={3} /></span>Every milestone, reviewed together.</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
