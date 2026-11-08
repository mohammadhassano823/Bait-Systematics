'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/* ---------- manifesto: words light up as you scroll ---------- */
function Word({ w, i, n, progress }) {
  const start = i / n;
  const opacity = useTransform(progress, [start, start + 1.5 / n], [0.12, 1]);
  const y = useTransform(progress, [start, start + 1.5 / n], [14, 0]);
  return (
    <motion.span style={{ display: 'inline-block', opacity, y, color: w.c, fontStyle: w.s, fontWeight: w.fw, whiteSpace: 'pre' }}>
      {w.t + ' '}
    </motion.span>
  );
}

export function ScrollWords({ words, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  return (
    <p ref={ref} style={style}>
      {words.map((w, i) => (
        <Word key={i} w={w} i={i} n={words.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

/* ---------- bento card: 3D rise on enter + pointer tilt ---------- */
export function TiltCard({ i = 0, wrapClass = '', className = '', style, children }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - b.left) / b.width - 0.5) * 12);
    rx.set(-((e.clientY - b.top) / b.height - 0.5) * 12);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      className={wrapClass}
      initial={{ opacity: 0, y: 90, rotateX: 28, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
      style={{ transformPerspective: 1200, transformOrigin: 'center bottom' }}
    >
      <motion.article
        className={className}
        onPointerMove={onMove}
        onPointerLeave={reset}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ ...style, height: '100%', rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      >
        {children}
      </motion.article>
    </motion.div>
  );
}

/* ---------- performance ring that fills + counts when visible ---------- */
export function PerfRing({ accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, 94, { duration: 1.8, ease: EASE, onUpdate: (x) => setN(x) });
    return () => c.stop();
  }, [inView]);
  const deg = (n / 100) * 360;
  return (
    <div ref={ref} style={{ position: 'relative', width: '170px', height: '170px', borderRadius: '50%', background: `conic-gradient(#101010 0 ${deg}deg, rgba(16,16,16,0.15) ${deg}deg 360deg)`, display: 'grid', placeItems: 'center' }}>
      <div style={{ width: '136px', height: '136px', borderRadius: '50%', background: accent, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '44px', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1' }}>{Math.round(n)}</div>
          <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '2px' }}>performance</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- number that counts up, keeping prefix/suffix ("−38%", "1,120") ---------- */
export function CountUp({ value, duration = 1.2 }) {
  const m = String(value).match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  const [out, setOut] = useState(m ? m[1] + '0' + m[3] : value);
  useEffect(() => {
    if (!m) { setOut(value); return; }
    const target = parseFloat(m[2].replace(/,/g, ''));
    const decimals = (m[2].split('.')[1] || '').length;
    const comma = m[2].includes(',');
    const c = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (x) => {
        let s = x.toFixed(decimals);
        if (comma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals });
        setOut(m[1] + s + m[3]);
      },
    });
    return () => c.stop();
  }, [value]);
  return <>{out}</>;
}

/* ---------- pinned services row: scroll drives which panel is open, left → right ---------- */
export function ServicesPin({ count, active, labels, apiRef, onIndex, children }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const progress = useMotionValue(0);
  const bar = useSpring(progress, { stiffness: 120, damping: 24 });
  const last = useRef(-1);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)');
    let raf = 0;
    const measure = () => {
      raf = 0;
      if (!mq.matches || !outer.current) return;
      const r = outer.current.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(inner.current).top) || 0;
      const range = r.height - inner.current.offsetHeight;
      const p = Math.min(1, Math.max(0, (top - r.top) / range));
      progress.set(p);
      const i = Math.min(count - 1, Math.floor(p * count));
      if (i !== last.current) { last.current = i; onIndex(i); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    measure();
    apiRef.current = {
      go(i) {
        if (!mq.matches || !outer.current) return false;
        const r = outer.current.getBoundingClientRect();
        const top = parseFloat(getComputedStyle(inner.current).top) || 0;
        const range = r.height - inner.current.offsetHeight;
        window.scrollTo({ top: window.scrollY + r.top - top + range * ((i + 0.5) / count), behavior: 'smooth' });
        return true;
      },
    };
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      apiRef.current = null;
    };
  }, [count]);

  return (
    <div ref={outer} className="sf-pin">
      <div ref={inner} className="sf-pin-inner">
        {children}
        <div className="sf-pinbar" aria-hidden="true">
          <span className="sf-pinlabel">
            <span style={{ color: '#FFFFFF' }}>{String(active + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')} — {labels[active]}
          </span>
          <span className="sf-pintrack"><motion.span className="sf-pinfill" style={{ scaleX: bar }} /></span>
          <span className="sf-pinhint">Scroll to explore →</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- small helpers ---------- */
export const panelIn = (i) => ({
  initial: { opacity: 0, x: -140, rotateY: 25 },
  whileInView: { opacity: 1, x: 0, rotateY: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: EASE, delay: i * 0.09 },
});

export const nodeIn = (from, i) => ({
  initial: { opacity: 0, x: from, y: '-50%' },
  whileInView: { opacity: 1, x: 0, y: '-50%' },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: EASE, delay: 0.15 + i * 0.12 },
});

export function TiltStage({ className, children }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 90, damping: 20 });
  const sry = useSpring(ry, { stiffness: 90, damping: 20 });
  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - b.left) / b.width - 0.5) * 8);
    rx.set(-((e.clientY - b.top) / b.height - 0.5) * 8);
  };
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 24, y: 60 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: EASE }}
      style={{ transformPerspective: 1600 }}
    >
      <motion.div
        className={className}
        onPointerMove={onMove}
        onPointerLeave={() => { rx.set(0); ry.set(0); }}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 1600 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
