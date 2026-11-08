'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, Plus } from 'lucide-react';
import { FEATURED, PROJECTS, PROJECT_GROUPS } from '@/lib/projects';
import ProjectDetail from './ProjectDetail';
import styles from './portfolio.module.css';

const ALL = [FEATURED, ...PROJECTS];
const host = (url) => new URL(url).hostname.replace(/^www\./, '');

// One project per card. Cards are sticky, so each new card slides up over the last;
// the card being covered shrinks and dims slightly to read as "behind".
function StackCard({ p, index, total, featured, onOpen, progress }) {
  const reducedMotion = useReducedMotion();
  // Once this card is reached, it shrinks a little more for every card that lands on top of it.
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.025]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, 0.5]);

  return (
    <div className={styles.stackSlot} style={{ '--i': index }}>
      <motion.article className={styles.stackCard} style={reducedMotion ? undefined : { scale }}>
        <div className={styles.stackText}>
          <div className={styles.stackTop}>
            <span className={styles.stackNum}>{String(index + 1).padStart(2, '0')}<small> / {String(total).padStart(2, '0')}</small></span>
            {featured && <span className={styles.stackBadge}>Featured</span>}
          </div>
          <span className={styles.stackMeta}>{p.type}{p.place && <><i /><MapPin size={13} aria-hidden="true" />{p.place}</>}</span>
          <h3 className={styles.stackTitle}>{p.name}</h3>
          <div className={styles.stackDesc}>{p.desc}</div>
          <div className={styles.stackTags}>{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <div className={styles.stackActions}>
            <button type="button" className={styles.stackPrimary} onClick={() => onOpen(p)} aria-haspopup="dialog">View details <Plus size={17} aria-hidden="true" /></button>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.stackGhost}>Visit {host(p.url)} <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <button type="button" className={styles.stackShot} onClick={() => onOpen(p)} aria-label={`Open ${p.name} details`}>
          <span className={styles.stackBar} aria-hidden="true"><i /><i /><i /><b>{host(p.url)}</b></span>
          <span className={styles.stackImg}><Image src={p.image} alt={`${p.name} website`} fill unoptimized sizes="(max-width: 900px) 100vw, 60vw" priority={index < 2} /></span>
        </button>
        {!reducedMotion && <motion.span className={styles.stackDim} style={{ opacity: dim }} aria-hidden="true" />}
      </motion.article>
    </div>
  );
}

export default function ProjectGrid() {
  const [group, setGroup] = useState('All');
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const items = ALL.filter((p) => group === 'All' || p.group === group);
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.head}>
        <div>
          <span className={styles.kicker}>OUR WORK</span>
          <h2>Real businesses.<br /><em>Live products.</em></h2>
          <p className={styles.headLede}>From AI platforms to booking sites — explore what we’ve designed, built and launched for clients around the world.</p>
        </div>
        <div className={styles.filters} role="group" aria-label="Filter projects">
          {PROJECT_GROUPS.map((g) => (
            <button key={g} type="button" aria-pressed={group === g} onClick={() => setGroup(g)}>
              {group === g && <motion.span layoutId="workFilter" className={styles.filterOn} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
              <span>{g}</span>
            </button>
          ))}
        </div>
      </div>

      <div ref={stackRef} className={styles.stack} key={group}>
        {items.map((p, i) => (
          <StackCard key={p.name} p={p} index={i} total={items.length} featured={p === FEATURED} onOpen={setOpen} progress={scrollYProgress} />
        ))}
      </div>

      <AnimatePresence>{open && <ProjectDetail key={open.name} p={open} onClose={close} />}</AnimatePresence>
    </MotionConfig>
  );
}
