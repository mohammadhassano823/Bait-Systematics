'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ArrowUpRight, Check, Clock } from 'lucide-react';
import { SERVICES, serviceHref } from '@/lib/services';
import styles from './services.module.css';

const EASE = [0.16, 1, 0.3, 1];
const GOLD = { bg: 'rgba(239,8,0,0.16)', fg: '#FFA39C' };
const MINT = { bg: 'rgba(255,163,156,0.22)', fg: '#FFA39C' };
const INK = { bg: 'rgba(16,16,16,0.08)', fg: '#FFFFFF' };
const TINTS = [GOLD, MINT, INK];
const SERVICE_IMAGES = Object.fromEntries(SERVICES.map(service => [service.id, service.img || `/services/${service.id}-premium.png`]));

const groups = [
  { label: 'All services', ids: null },
  { label: 'Web & mobile', ids: ['web', 'wordpress', 'ecommerce', 'mobile', 'saas', 'design'] },
  { label: 'AI & automation', ids: ['aisoft', 'ai', 'crm', 'whatsapp', 'api'] },
  { label: 'Business systems', ids: ['erp', 'inventory', 'pharmacy', 'pos', 'school', 'hr'] },
  { label: 'Marketing', ids: ['ads', 'seo', 'social'] },
  { label: 'Support', ids: ['ops'] },
];

export default function ServicesExplorer({ copy }) {
  const [group, setGroup] = useState(0);
  const [focus, setFocus] = useState(null);

  // /services#ai (footer and home links) scrolls to and highlights that service.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (!SERVICES.some((s) => s.id === id)) return;
      setGroup(0);
      setFocus(id);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const visible = SERVICES.filter((s) => !groups[group].ids || groups[group].ids.includes(s.id));

  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.filters} role="group" aria-label="Filter services">
        {groups.map((g, i) => (
          <button key={g.label} type="button" aria-pressed={group === i} onClick={() => setGroup(i)}>
            {group === i && <motion.span layoutId="filterOn" className={styles.filterOn} transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
            <span>{g.label}</span>
            <small>{g.ids?.length || SERVICES.length}</small>
          </button>
        ))}
      </div>

      <motion.div layout className={styles.serviceRows}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((s) => {
            const n = SERVICES.indexOf(s);
            const c = TINTS[n % 3];
            return (
              <motion.article
                layout
                key={s.id}
                id={s.id}
                className={`${styles.serviceRow} ${visible.indexOf(s) % 2 ? styles.serviceRowReverse : ''} ${focus === s.id ? styles.serviceRowFocus : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE, delay: (visible.indexOf(s) % 3) * 0.06 }}
              >
                <div className={styles.serviceRowCopy}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon} style={{ background: c.bg, color: c.fg }}><s.Icon size={24} strokeWidth={1.9} aria-hidden="true" /></span>
                  <span className={styles.cardNum}>{String(n + 1).padStart(2, '0')}</span>
                </div>
                <h3><Link href={serviceHref(s.id)} className={styles.titleLink}>{s.t}</Link></h3>
                <p className={styles.cardTag}>{copy[s.id][0]}</p>
                <p className={styles.cardBody}>{copy[s.id][1]}</p>
                <ul className={styles.cardList}>
                  {s.get.map((item) => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}
                </ul>
                <div className={styles.cardFoot}>
                  <span className={styles.cardTime}><Clock size={14} aria-hidden="true" />{s.time.replace(/^Typically /, '')}</span>
                  <Link href="/contact" className={styles.cardLink} aria-label={`Talk to us about ${s.t}`}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </div>
                </div>
                <figure className={styles.serviceRowPhoto}>
                  <Image src={SERVICE_IMAGES[s.id]} alt={s.t+' service visual'} fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" />
                  <figcaption>{s.tools.join(' / ')}</figcaption>
                </figure>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}
