'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CountUp } from './motion';

const EASE = [0.16, 1, 0.3, 1];
const PLAN = ['Goals & users mapped', 'Scope and timeline agreed', 'Fixed quote — no surprises'];
const FEATURES = ['Online booking', 'Payments', 'WhatsApp alerts', 'Admin dashboard'];

function Tag({ n, label, tone }) {
  return <span className={'sf-hs-tag ' + tone}>{n} · {label}</span>;
}

export default function HeroStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step, setStep] = useState(0); // which card is "live": 0 plan, 1 build, 2 grow
  const [tick, setTick] = useState(0); // restarts the inner animations each loop

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(2); return; }
    const id = setInterval(() => {
      setStep((s) => {
        if (s === 2) setTick((t) => t + 1);
        return (s + 1) % 3;
      });
    }, 3200);
    return () => clearInterval(id);
  }, [inView]);

  const card = (i) => ({
    initial: { opacity: 0, y: 40, scale: 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, ease: EASE, delay: 0.3 + i * 0.18, scale: { duration: 0.5, ease: EASE } },
  });

  return (
    <div ref={ref} className="sf-hs sf-hs-original" aria-hidden="true">
      {/* 01 PLAN */}
      <motion.div className={'sf-hs-card light c1' + (step === 0 ? ' live' : '')} {...card(0)}>
        <div className="sf-hs-head"><Tag n="01" label="Plan" tone="gold" /><span>Week 1 · discovery</span></div>
        <ul className="sf-hs-list">
          {PLAN.map((p, i) => (
            <li key={p + tick}>
              <motion.span
                className="sf-hs-check"
                initial={{ scale: 0 }}
                animate={{ scale: step >= 0 ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.6 + i * 0.35 }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </motion.span>
              {p}
            </li>
          ))}
        </ul>
        <svg className="sf-hs-connector" viewBox="0 0 400 44" preserveAspectRatio="none"><motion.path d="M140 0 C140 28 300 16 300 44" initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0.3 }} transition={{ duration: 0.9, ease: EASE }} /></svg>
      </motion.div>

      {/* 02 BUILD */}
      <motion.div className={'sf-hs-card dark c2' + (step === 1 ? ' live' : '')} {...card(1)}>
        <div className="sf-hs-head"><Tag n="02" label="Build" tone="mint" /><span>Demo every 2 weeks</span></div>
        <div className="sf-hs-build">
          <div className="sf-hs-row"><span>Your booking app</span><b>{step === 2 ? 'Launched' : step === 1 ? 'Building…' : 'Up next'}</b></div>
          <div className="sf-hs-bar">
            <motion.span key={'bar' + tick} initial={{ scaleX: 0.08 }} animate={{ scaleX: step >= 1 ? 1 : 0.35 }} transition={{ duration: step >= 1 ? 2.4 : 0.6, ease: [0.4, 0, 0.2, 1] }} />
          </div>
          <div className="sf-hs-chips">
            {FEATURES.map((t, i) => (
              <motion.span
                key={t + tick}
                animate={step >= 1 ? { backgroundColor: 'rgba(255,163,156,0.16)', color: '#FFA39C' } : { backgroundColor: 'rgba(255,255,255,0.07)', color: '#E5E5E5' }}
                transition={{ duration: 0.3, delay: step >= 1 ? 0.4 + i * 0.45 : 0 }}
              >
                {step >= 1 ? '✓ ' : ''}{t}
              </motion.span>
            ))}
            <AnimatePresence>
              {step === 2 ? (
                <motion.span key="live" className="live" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 18 }}>● Live</motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        <svg className="sf-hs-connector" viewBox="0 0 400 44" preserveAspectRatio="none"><motion.path d="M280 0 C280 28 120 16 120 44" initial={{ pathLength: 0 }} animate={{ pathLength: step >= 2 ? 1 : 0.3 }} transition={{ duration: 0.9, ease: EASE }} /></svg>
      </motion.div>

      {/* 03 GROW */}
      <motion.div className={'sf-hs-card light c3' + (step === 2 ? ' live' : '')} {...card(2)}>
        <div className="sf-hs-head"><Tag n="03" label="Grow" tone="ink" /><span>Enquiries · last 90 days</span></div>
        <div className="sf-hs-grow">
          <div className="sf-hs-big">
            <span className="sf-hs-num">+{step === 2 ? <CountUp key={'n' + tick} value="248" duration={1.6} /> : '248'}%</span>
            <span className="sf-hs-sub">more enquiries</span>
          </div>
          <svg viewBox="0 0 220 70" className="sf-hs-chart">
            <defs><linearGradient id="sfHsG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFA39C" stopOpacity=".3" /><stop offset="1" stopColor="#FFA39C" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 62 C30 58 50 50 75 52 S120 36 145 34 S190 14 220 6 V70 H0Z" fill="url(#sfHsG)" />
            <motion.path key={'c' + tick} d="M0 62 C30 58 50 50 75 52 S120 36 145 34 S190 14 220 6" fill="none" stroke="#FFA39C" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0.2 }} animate={{ pathLength: step === 2 ? 1 : 0.55 }} transition={{ duration: 1.4, ease: EASE }} />
          </svg>
        </div>
        <AnimatePresence>
          {step === 2 ? (
            <motion.div key={'toast' + tick} className="sf-hs-toast" initial={{ opacity: 0, y: 14, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.5 }}>
              <span className="dot" />New customer · just now
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
