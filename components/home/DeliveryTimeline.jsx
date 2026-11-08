'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Pinned delivery journey: the red line draws to step 1, 2, then 3 as you scroll and each step reveals
// when the line reaches it. Once all three are shown, a closing line resolves the process; only then does the page move on.
const STEPS = [
  { title: 'Plan it right', body: 'A free consultation to understand your business, users and goals — then a written proposal with features, milestones, timeline and a fixed cost.', takeaway: 'A shared direction before any code is written.' },
  { title: 'Build it properly', body: 'Designs you approve, then short agile sprints. Every milestone ships a working build on a live staging link, so you see real progress and steer what comes next.', takeaway: 'Working software you can review at every step.' },
  { title: 'Launch and keep growing', body: 'Tested across browsers and devices, launched to production and handed over with source code, documentation and credentials — plus 30 days of support.', takeaway: 'A confident launch and a plan for what follows.' },
];
const FINALE = [
  { text: 'Clear plan', tone: 'plain' },
  { text: 'Proven product', tone: 'grad' },
  { text: 'Real growth', tone: 'hot' },
];

// Scroll budget: line + steps 0 → 0.7, hand-over 0.7 → 0.8, closing line 0.8 → 1.
// Each step reveals when the drawn line reaches its node.
const REVEAL = [0, 0.27, 0.5]; // step 1 is shown from the start

function TimelineStep({ step, index, progress }) {
  const t = REVEAL[index];
  const opacity = useTransform(progress, [t, t + 0.08], [index === 0 ? 1 : 0.12, 1]);
  const y = useTransform(progress, [t, t + 0.1], [index === 0 ? 0 : 28, 0]);
  const background = useTransform(progress, [t, t + 0.06], [index === 0 ? '#FFFFFF' : '#262626', '#FFFFFF']);
  const color = useTransform(progress, [t, t + 0.06], [index === 0 ? '#D20A03' : '#6E6E6E', '#D20A03']);
  return (
    <motion.li className={`sf-delivery-timeline-step step-${index}`} style={{ opacity, y }}>
      <motion.span className="sf-delivery-timeline-number" style={{ background, color }}>{index + 1}</motion.span>
      <div className="sf-delivery-timeline-copy">
        <h3>{step.title}</h3><p>{step.body}</p><span>{step.takeaway}</span>
      </div>
    </motion.li>
  );
}

function FinaleWord({ word, index, progress }) {
  const start = 0.8 + index * 0.05;
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const y = useTransform(progress, [start, start + 0.05], [40, 0]);
  return (
    <>
      {index > 0 && <motion.span className="sf-flow-arrow" style={{ opacity }} aria-hidden="true">→</motion.span>}
      <motion.span className={`sf-flow-final-word is-${word.tone}`} style={{ opacity, y }}>{word.text}</motion.span>
    </>
  );
}

export default function DeliveryTimeline() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const pathLength = useTransform(scrollYProgress, [0, 0.62], [0.1, 1]);
  const stepsOpacity = useTransform(scrollYProgress, [0.7, 0.77], [1, 0]);
  const finaleOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);

  return (
    <section ref={ref} className={'sf-delivery-timeline sf-tone-dark' + (reducedMotion ? ' is-static' : '')} aria-label="How we deliver your project">
      <div className="sf-delivery-timeline-sticky">
        <motion.div className="sf-delivery-timeline-inner" style={reducedMotion ? undefined : { opacity: stepsOpacity }}>
          <svg className="sf-delivery-timeline-path" viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path d="M0 32 H100 C360 32 230 150 500 150 S740 268 900 268 H1200" stroke="#303030" strokeWidth="3" />
            <motion.path d="M0 32 H100 C360 32 230 150 500 150 S740 268 900 268 H1200" stroke="#EF0800" strokeWidth="3" strokeLinecap="round" style={{ pathLength: reducedMotion ? 1 : pathLength }} />
          </svg>
          <ol className="sf-delivery-timeline-steps">
            {STEPS.map((step, index) => <TimelineStep key={step.title} step={step} index={index} progress={scrollYProgress} />)}
          </ol>
        </motion.div>

        <motion.div className="sf-flow-final sf-delivery-final" style={reducedMotion ? undefined : { opacity: finaleOpacity }}>
          <span className="sf-flow-final-kicker">EVERY BAIT PROJECT ENDS WITH</span>
          <div className="sf-flow-final-line">
            {FINALE.map((w, i) => <FinaleWord key={w.text} word={w} index={i} progress={scrollYProgress} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
