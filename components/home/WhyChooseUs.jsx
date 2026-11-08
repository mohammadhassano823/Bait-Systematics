'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';

const INPUTS = ['Your customers', 'Your workflows', 'Your existing systems'];
const MILESTONES = ['Scope', 'Design', 'Build', 'Launch'];
const AFTERCARE = ['Maintenance', 'New features', 'Scaling', 'Security updates'];

function trackSpotlight(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  card.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

function Card({ index, className = '', label, title, children, reducedMotion }) {
  return (
    <motion.article className={`sf-why-card ${className}`} onMouseMove={trackSpotlight}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
      <span className="sf-why-num" aria-hidden="true">0{index + 1}</span>
      <span className="sf-why-label">{label}</span>
      <h3>{title}</h3>
      {children}
    </motion.article>
  );
}

export default function WhyChooseUs() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="why" className="sf-why sf-tone-light" aria-labelledby="sf-why-title">
      <div className="sf-why-glow" aria-hidden="true" />
      <div className="sf-why-wrap">
        <header className="sf-why-head">
          <span className="sf-featured-services-eyebrow">WHY BAIT SYSTEMATICS</span>
          <h2 id="sf-why-title">Software you can <em>actually</em> count on.</h2>
          <p className="sf-why-lede">Most software projects run over budget, over time or off the rails. We plan properly, price upfront and stay accountable from the first call to long after launch.</p>
        </header>

        <div className="sf-why-grid">
          <Card index={0} className="sf-why-card-wide" label="Business first" reducedMotion={reducedMotion}
            title="Built around your business, not our template.">
            <p>Before we write a line of code, we learn how you sell, operate and grow. That understanding decides the features, the stack and the priorities.</p>
            <div className="sf-why-flow" aria-hidden="true">
              <div className="sf-why-flow-in">{INPUTS.map(item => <span key={item}>{item}</span>)}</div>
              <div className="sf-why-flow-line"><i /></div>
              <div className="sf-why-flow-out">Your product</div>
            </div>
          </Card>

          <Card index={1} className="sf-why-card-own" label="Full ownership" reducedMotion={reducedMotion}
            title="Every line of code is yours.">
            <div className="sf-why-big" aria-hidden="true">100<span>%</span></div>
            <p>Source code, IP and accounts belong to you. No lock-in, no hostage situations.</p>
          </Card>

          <Card index={2} label="Zero surprises" reducedMotion={reducedMotion}
            title="Fixed scope. Upfront price.">
            <p>You know what you’re getting, what it costs and when it lands — before we start.</p>
            <ol className="sf-why-track" aria-hidden="true">
              {MILESTONES.map((step, i) => <li key={step} className={i < 3 ? 'is-done' : ''}><span />{step}</li>)}
            </ol>
          </Card>

          <Card index={3} label="Direct line" reducedMotion={reducedMotion}
            title="Talk to the people building it.">
            <p>No account-manager telephone game. You speak straight to your engineers and review real work at every milestone.</p>
            <div className="sf-why-chat" aria-hidden="true">
              <span className="sf-why-dot" />New build is live on staging — take a look →
            </div>
          </Card>

          <Card index={4} label="Long-term partner" reducedMotion={reducedMotion}
            title="We don’t vanish after launch.">
            <p>Clean handover, then ongoing support so your software keeps up as your business grows.</p>
            <ul className="sf-why-tags">{AFTERCARE.map(item => <li key={item}><Check size={14} strokeWidth={2.5} aria-hidden="true" />{item}</li>)}</ul>
          </Card>
        </div>

        <div className="sf-why-cta">
          <div>
            <span>READY WHEN YOU ARE</span>
            <p>Got an idea, a broken system or a tight deadline? Let’s talk it through.</p>
          </div>
          <Link href="/contact">Start the conversation<ArrowUpRight size={20} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
