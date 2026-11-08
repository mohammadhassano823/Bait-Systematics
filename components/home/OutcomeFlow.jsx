'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Pinned, scroll-driven outcomes section: each giant word fills with colour, then the track slides to the next.
const STEPS = [
  {
    word: 'LAUNCH', label: 'Get online, the right way',
    body: 'A fast, professional website, web app or mobile app that presents your business clearly and turns visitors into enquiries from day one.',
    tags: ['Websites', 'Web & mobile apps', 'SEO-ready'],
  },
  {
    word: 'AUTOMATE', label: 'Let software do the busywork',
    body: 'Zoho CRM workflows, WhatsApp messaging and AI assistants take repetitive tasks off your team, so leads are followed up and nothing slips through.',
    tags: ['Zoho CRM', 'WhatsApp automation', 'AI assistants'],
  },
  {
    word: 'GROW', label: 'Scale without the growing pains',
    body: 'Connected systems, dashboards and integrations that keep up as you add customers, team members and markets — backed by ongoing support.',
    tags: ['Integrations', 'Dashboards', 'Ongoing support'],
  },
];

// Scroll budget: each of the three stages gets a third of the pinned scroll.
const STAGE = 1 / 3;
const FILL = 0.7; // share of a stage spent filling the word before sliding on

function Stage({ step, index, progress }) {
  const start = index * STAGE;
  const clip = useTransform(progress, [start, start + STAGE * FILL], [100, 0]);
  const clipPath = useTransform(clip, (v) => `inset(0 ${v}% 0 0)`);
  // Upcoming stages peek in dimmed; offsets stay inside 0–1 (scroll animations reject negatives).
  const dim = useTransform(progress, [Math.max(0, start - 0.08), Math.max(0.001, start + 0.02)], [index === 0 ? 1 : 0.35, 1]);
  return (
    <motion.article className="sf-flow-stage" style={{ opacity: dim }}>
      <div className="sf-flow-word" aria-hidden="true">
        <span className="sf-flow-word-outline">{step.word}</span>
        <motion.span className="sf-flow-word-fill" style={{ clipPath }}>{step.word}</motion.span>
      </div>
      <div className="sf-flow-meta">
        <span className="sf-flow-num">{index + 1}</span>
        <span className="sf-flow-code">0{index + 1} · {step.word} · OUTCOME</span>
        <span className="sf-flow-rule" />
      </div>
      <div className="sf-flow-title" role="heading" aria-level="3">{step.label}</div>
      <p>{step.body}</p>
      <ul className="sf-flow-tags">{step.tags.map((t) => <li key={t}>{t}</li>)}</ul>
    </motion.article>
  );
}


export default function OutcomeFlow() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Hold on each stage while it fills, then slide one panel left.
  const x = useTransform(
    scrollYProgress,
    [0, STAGE * FILL, STAGE, STAGE + STAGE * FILL, STAGE * 2, 1],
    ['0%', '0%', '-33.333%', '-33.333%', '-66.666%', '-66.666%'],
  );
  const rail = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const labels = ['01 Launch', '02 Automate', '03 Grow'];

  return (
    <section ref={ref} className={'sf-flow sf-tone-dark' + (reducedMotion ? ' is-static' : '')} aria-labelledby="sf-outcome-title">
      <div className="sf-flow-sticky">
        <h2 id="sf-outcome-title" className="sf-flow-sr">What our software does for your business</h2>

        <div className="sf-flow-rail" aria-hidden="true">
          <span className="sf-flow-rail-track"><motion.i style={{ height: rail }} /></span>
          <ol>{labels.map((l) => <li key={l}>{l}</li>)}</ol>
        </div>

        <div className="sf-flow-viewport">
          <motion.div className="sf-flow-track" style={reducedMotion ? undefined : { x }}>
            {STEPS.map((step, i) => <Stage key={step.word} step={step} index={i} progress={scrollYProgress} />)}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
