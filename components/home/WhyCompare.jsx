'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const ROWS = [
  { k: 'Pricing', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', bad: 'Hourly billing and surprise invoices', good: 'One fixed quote — agreed before we start', proof: 'Fixed price' },
  { k: 'Communication', icon: 'M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z', bad: 'Account managers relaying messages', good: 'You talk directly to the engineers', proof: 'Same-day replies' },
  { k: 'Progress', icon: 'M3 3v18h18M7 15l4-4 3 3 6-6', bad: 'Months of silence, then a big reveal', good: 'Live demo and staging link every two weeks', proof: 'Sprint demos' },
  { k: 'Code', icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6', bad: 'Locked in — the agency keeps the repo', good: 'Clean, tested code you own from day one', proof: '100% IP' },
  { k: 'After launch', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', bad: 'They disappear once the invoice clears', good: 'Monitoring, fixes and new features monthly', proof: 'Care plan' },
  { k: 'Speed', icon: 'M13 2 3 14h9l-1 8 10-12h-9z', bad: 'Bloated pages that frustrate users', good: 'Fast by default — 94+ Lighthouse scores', proof: '94+ score' },
];

function Row({ r, i, good }) {
  return (
    <div className="sf-why-row">
      <div className="sf-why-topic">
        <span className="sf-why-ico">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={r.icon} /></svg>
        </span>
        <span>{r.k}</span>
      </div>
      <div className="sf-why-flip">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={good ? 'g' : 'b'}
            className={'sf-why-text ' + (good ? 'good' : 'bad')}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.09 }}
            style={{ transformPerspective: 800, transformOrigin: 'center center' }}
          >
            <span className="sf-why-mark">
              {good ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
              )}
            </span>
            <span className="sf-why-copy">{good ? r.good : r.bad}</span>
            {good ? <span className="sf-why-proof">{r.proof}</span> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function WhyCompare() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [good, setGood] = useState(false);
  const touched = useRef(false);

  // on first view, show the "typical agency" for a beat, then flip everything to Bait Systematics
  useEffect(() => {
    if (!inView || touched.current) return;
    const id = setTimeout(() => { if (!touched.current) setGood(true); }, 1100);
    return () => clearTimeout(id);
  }, [inView]);

  const pick = (g) => { touched.current = true; setGood(g); };

  return (
    <div ref={ref}>
      <div className="sf-why-head">
        <div>
          <div className="sf-why-eyebrow">Why teams choose us</div>
          <h2 className="sf-why-title">Not another <em>agency.</em></h2>
          <p className="sf-why-lede">Most software projects fail for the same handful of reasons. We built our whole process to remove them.</p>
        </div>
        <div className="sf-why-toggle" role="group" aria-label="Compare">
          {[['Typical agency', false], ['Bait Systematics', true]].map(([label, g]) => (
            <button key={label} type="button" aria-pressed={good === g} onClick={() => pick(g)} className={good === g ? 'on' : ''}>
              {good === g ? <motion.span layoutId="sfWhyKnob" className={'sf-why-knob ' + (g ? 'g' : 'b')} transition={{ type: 'spring', stiffness: 420, damping: 34 }} /> : null}
              <span style={{ position: 'relative' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sf-why-table">
        {ROWS.map((r, i) => <Row key={r.k} r={r} i={i} good={good} />)}
      </div>

      <div className="sf-why-foot">
        <motion.span
          className="sf-why-score"
          animate={{ color: good ? '#EF0800' : '#909090' }}
          transition={{ duration: 0.4 }}
        >
          {good ? '6 / 6' : '0 / 6'}
        </motion.span>
        <span className="sf-why-scoretxt">{good ? 'problems solved before your project even starts.' : 'of the usual problems solved. Sound familiar?'}</span>
        <a className="sf-why-cta" href="#contact">
          Work with us
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </a>
      </div>
    </div>
  );
}
