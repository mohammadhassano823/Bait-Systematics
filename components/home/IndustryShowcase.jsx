'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES } from '@/lib/industries';

const EASE = [0.16, 1, 0.3, 1];
// Pinned scroll-through wherever the three-column layout fits; heights scale to the viewport.
const PIN_QUERY = '(min-width: 1101px)';
// Height of one list row in px; the list slides by this much per industry.
const ROW = 58;

export default function IndustryShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  // Pinning itself is pure CSS; this is read fresh on every event so it can never go stale.
  const isPinned = () => typeof window !== 'undefined' && window.matchMedia(PIN_QUERY).matches;

  // Page scroll drives the selection: each slice of the pinned section is one industry.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (!isPinned()) return;
    setActive(Math.min(INDUSTRIES.length - 1, Math.max(0, Math.floor(value * INDUSTRIES.length))));
  });

  // Clicking jumps the page to that industry's slice, so scroll and selection never disagree.
  const choose = index => {
    const section = sectionRef.current;
    if (!isPinned() || !section) { setActive(index); return; }
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((index + 0.5) / INDUSTRIES.length) * travel, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const current = INDUSTRIES[active];
  const swap = reducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.4, ease: EASE } };

  return (
    <section ref={sectionRef} id="industries" className="sf-ind sf-tone-light"
      style={{ '--ind-steps': INDUSTRIES.length }} aria-labelledby="sf-ind-title">
      <div className="sf-ind-sticky">
        <div className="sf-ind-wrap">
          <header className="sf-ind-head">
            <span className="sf-featured-services-eyebrow">INDUSTRIES WE SERVE</span>
            <h2 id="sf-ind-title">Built for the way <em>your industry</em> works.</h2>
          </header>

          <div className="sf-ind-grid">
            <div className="sf-ind-media">
              <AnimatePresence initial={false}>
                <motion.img key={current.name} src={current.image} alt={`${current.name} industry`}
                  className="sf-ind-img" width="1000" height="750"
                  initial={reducedMotion ? false : { opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }} />
              </AnimatePresence>
              <span className="sf-ind-media-name">{current.name}</span>
            </div>

            <div className="sf-ind-picker">
              <span className="sf-ind-count"><span className="sf-ind-hint">SCROLL TO EXPLORE · </span>{String(active + 1).padStart(2, '0')} / {INDUSTRIES.length}</span>
              <div className="sf-ind-viewport">
                <ul className="sf-ind-list" role="tablist" aria-label="Industries"
                  style={{ transform: `translateY(${-active * ROW}px)` }}>
                  {INDUSTRIES.map(({ name }, index) => (
                    <li key={name} role="presentation" style={{ '--d': Math.min(Math.abs(index - active), 4) }}>
                      <button type="button" role="tab" aria-selected={index === active} aria-controls="sf-ind-panel"
                        className={index === active ? 'is-active' : ''} onClick={() => choose(index)}>{name}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sf-ind-detail" id="sf-ind-panel" role="tabpanel" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.name} {...swap}>
                  <h3>{current.name}</h3>
                  <p>{current.text}</p>
                  <ul className="sf-ind-tags">{current.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                  <Link href="/contact" className="sf-ind-cta">Discuss your project<ArrowUpRight size={18} aria-hidden="true" /></Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
