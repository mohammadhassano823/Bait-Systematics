'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useInView, MotionConfig } from 'framer-motion';
import { MessagesSquare, PenTool, Code2, Rocket, ArrowUpRight, Check } from 'lucide-react';
import styles from './services.module.css';

const EASE = [0.16, 1, 0.3, 1];
const STEPS = [
  { title: 'Understand', Icon: MessagesSquare, body: 'We learn your goals, users and how you work today.', get: ['Discovery call', 'Clear brief'] },
  { title: 'Plan & design', Icon: PenTool, body: 'We agree on the scope and design the experience.', get: ['Scope & milestones', 'Prototype'] },
  { title: 'Build & review', Icon: Code2, body: 'We build in stages and show you progress often.', get: ['Progress demos', 'Your feedback'] },
  { title: 'Launch & improve', Icon: Rocket, body: 'We go live, hand over and plan what comes next.', get: ['Deployment', 'Ongoing support'] },
];

function Step({ step, i, active, onActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);
  return (
    <motion.li
      ref={ref}
      className={`${styles.pStep} ${active === i ? styles.pStepOn : ''} ${active >= i ? styles.pStepDone : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span className={styles.pNode} aria-hidden="true">{active >= i ? <Check size={14} strokeWidth={3} /> : null}</span>
      <div className={styles.pCard}>
        <span className={styles.pNum}>0{i + 1}</span>
        <div className={styles.pContent}>
          <span className={styles.pPhaseLabel}>STAGE {i + 1} OF 4</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          <ul>{step.get.map((g) => <li key={g}>{g}</li>)}</ul>
        </div>
        <span className={styles.pIcon}><step.Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
      </div>
    </motion.li>
  );
}

export default function ProcessSteps() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.process}>
        <div className={styles.pAside}>
          <span className={styles.kicker}>Our process</span>
          <h2 id="approach-title">Four steps. <em>No guesswork.</em></h2>
          <p>A simple way of working that keeps you in the loop from the first call to launch day.</p>
          <ol className={styles.pIndex} aria-label="Project stages">
            {STEPS.map((s, i) => (
              <li key={s.title} className={active === i ? styles.pIndexOn : ''}>
                <span>0{i + 1}</span>{s.title}{active > i ? <Check size={15} aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
          <Link href="/contact" className="btn">Book a free call <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>

        <div className={styles.pTimeline} ref={listRef}>
          <span className={styles.pTrack} aria-hidden="true"><motion.span style={{ scaleY: fill }} /></span>
        <ol className={styles.pList}>
          {STEPS.map((s, i) => <Step key={s.title} step={s} i={i} active={active} onActive={setActive} />)}
        </ol>
        </div>
      </div>
    </MotionConfig>
  );
}
