'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, PenTool, Code2, Rocket, ArrowUpRight, Check } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const STEPS = [
  { Icon: Search, when: 'Week 1', t: 'Discover', d: 'A focused call about your goals, users and budget. You get a clear scope, timeline and fixed price.', out: ['Scope document', 'Timeline', 'Fixed quote'] },
  { Icon: PenTool, when: 'Weeks 2–3', t: 'Design', d: 'Wireframes and polished screens you review and approve before any code is written.', out: ['Wireframes', 'UI design', 'Clickable prototype'] },
  { Icon: Code2, when: 'Every 2 weeks', t: 'Build', d: 'Short sprints with a live demo and a staging link, so you always see real progress.', out: ['Sprint demos', 'Staging link', 'Testing'] },
  { Icon: Rocket, when: 'Launch day', t: 'Launch & grow', d: 'We go live, keep an eye on everything and keep improving the product with you.', out: ['Go-live', 'Monitoring', 'Support plan'] },
];

export default function ProcessSteps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="sf-ps">
      <div className="sf-ps-head">
        <div>
          <div className="sf-ps-eyebrow">Our process</div>
          <h2 className="sf-ps-title">Four clear steps from <span>first call to launch day.</span></h2>
        </div>
        <p className="sf-ps-lede">No black boxes and no surprise invoices — you always know what happens next, what it costs and when it ships.</p>
      </div>

      <div ref={ref} className="sf-ps-grid">
        <div className="sf-ps-line" aria-hidden="true"><motion.span style={{ scaleX: fill }} /></div>
        {STEPS.map(({ Icon, when, t, d, out }, i) => (
          <motion.article
            key={t}
            className="sf-ps-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
          >
            <div className="sf-ps-top">
              <span className="sf-ps-ico"><Icon size={22} strokeWidth={2} /></span>
              <span className="sf-ps-num">0{i + 1}</span>
            </div>
            <span className="sf-ps-when">{when}</span>
            <h3>{t}</h3>
            <p>{d}</p>
            <ul>
              {out.map((o) => <li key={o}><Check size={14} strokeWidth={3} /> {o}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="sf-ps-cta"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span>Step one is a free 30-minute call. No commitment, just a clear plan.</span>
        <a href="#contact">Book a discovery call <ArrowUpRight size={16} strokeWidth={2.4} /></a>
      </motion.div>
    </div>
  );
}
