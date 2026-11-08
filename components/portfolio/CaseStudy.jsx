'use client';

import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowUpRight, MapPin, Car, Tag, Wrench, ShieldCheck, Gavel, Landmark } from 'lucide-react';
import { FEATURED, PROJECTS, PROJECT_COUNT } from '@/lib/projects';
import styles from './portfolio.module.css';

const EASE = [0.16, 1, 0.3, 1];
const study = PROJECTS.find((p) => p.name === 'DK Garage');
const services = [['Rent', Car], ['Buy', Tag], ['Repair', Wrench], ['Insure', ShieldCheck], ['Auctions', Gavel], ['Finance', Landmark]];

// Facts derived from the live project list, so they stay accurate.
const all = [FEATURED, ...PROJECTS];
const countries = new Set(all.map((p) => (p.place || '').split(', ').pop()).filter(Boolean));
const industries = new Set(all.map((p) => p.industry));
const facts = [[PROJECT_COUNT, 'Live projects'], [countries.size, 'Countries'], [industries.size, 'Industries'], [1, 'Team, start to finish']];

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
});

export default function CaseStudy() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className={styles.csHead} {...rise()}>
        <div>
          <span className={styles.csKicker}>Case study</span>
          <h2>DK Garage: <em>one app for every car need.</em></h2>
        </div>
        <div className={styles.csHeadSide}>
          <div className={styles.csChips}>
            <span><MapPin size={13} aria-hidden="true" />{study.place}</span>
            <span>Marketplace</span>
            <span>Automotive</span>
          </div>
          <a href={study.url} target="_blank" rel="noopener noreferrer" className="btn">Visit live site <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </motion.div>

      <div className={styles.bento}>
        <motion.a href={study.url} target="_blank" rel="noopener noreferrer" className={`${styles.tile} ${styles.tShot}`} {...rise(1)} aria-label="Open DK Garage live site">
          <span className={styles.live}><i />Live in Malaysia</span>
          <div className={styles.tShotFrame}>
            <div className={styles.browser}>
              <div className={styles.browserBar}><i /><i /><i /><span>dk-vroom-ten.vercel.app</span></div>
              <div className={styles.shot}><Image src={study.image} alt="DK Garage website" fill sizes="(max-width: 1000px) 100vw, 60vw" /></div>
            </div>
          </div>
          <span className={styles.tShotArrow} aria-hidden="true"><ArrowUpRight size={22} /></span>
        </motion.a>

        <motion.div className={`${styles.tile} ${styles.tChallenge}`} {...rise(2)}>
          <span className={styles.tLabel}><b>01</b>Challenge</span>
          <h3>Car services scattered everywhere.</h3>
          <p>Buying, renting, repairs and finance meant visiting many different places.</p>
        </motion.div>

        <motion.div className={`${styles.tile} ${styles.tSolution}`} {...rise(3)}>
          <span className={styles.tLabel}><b>02</b>Solution</span>
          <h3>One automotive super app.</h3>
          <p>Verified dealers and every car service, brought together in one clean interface.</p>
        </motion.div>

        <motion.div className={`${styles.tile} ${styles.tInside}`} {...rise(2)}>
          <span className={styles.tLabel}>What’s inside</span>
          <ul>
            {services.map(([label, Icon]) => (
              <li key={label}><span><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>{label}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div className={`${styles.tile} ${styles.tResult}`} {...rise(3)}>
          <span className={styles.tLabel}><b>03</b>Result</span>
          <h3>Everything a driver needs, in one place.</h3>
          <p>Explore, compare and act on any device — no more jumping between sites.</p>
        </motion.div>
      </div>

      <motion.dl className={styles.csFacts} {...rise(1)}>
        {facts.map(([n, l]) => <div key={l}><dt>{l}</dt><dd>{n}</dd></div>)}
      </motion.dl>
    </MotionConfig>
  );
}
