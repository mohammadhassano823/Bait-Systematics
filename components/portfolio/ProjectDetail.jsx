'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, X } from 'lucide-react';
import styles from './portfolio.module.css';

const EASE = [0.16, 1, 0.3, 1];
const host = (url) => new URL(url).hostname.replace(/^www\./, '');

export default function ProjectDetail({ p, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <motion.div className={styles.overlay} onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close project details"><X size={20} /></button>

        <div className={styles.sheetShot}>
          <div className={styles.browser}>
            <div className={styles.browserBar}><i /><i /><i /><span>{host(p.url)}</span></div>
            <div className={styles.shot}><Image src={p.image} alt={`${p.name} website`} fill sizes="(max-width: 1000px) 100vw, 960px" /></div>
          </div>
        </div>

        <div className={styles.sheetBody}>
          <div className={styles.sheetHead}>
            <span className={styles.cardMeta}><span>{p.type}</span>{p.place && <span>{p.place}</span>}</span>
            <h2 id="project-title">{p.name}</h2>
            <p className={styles.goal}>{p.goal}</p>
          </div>

          <div className={styles.sheetGrid}>
            <div>
              <h3>Overview</h3>
              <p>{p.overview}</p>
              <dl className={styles.facts}>
                <div><dt>Industry</dt><dd>{p.industry}</dd></div>
                {p.place && <div><dt>Location</dt><dd>{p.place}</dd></div>}
                <div><dt>Live at</dt><dd>{host(p.url)}</dd></div>
              </dl>
            </div>
            <div>
              <h3>What we built</h3>
              <ul className={styles.built}>{p.features.map((f) => <li key={f}><Check size={15} aria-hidden="true" />{f}</li>)}</ul>
              <div className={styles.tags}>{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>

          <div className={styles.sheetActions}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn">Visit live site <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href="/contact" className={styles.textLink}>Want something similar? Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
