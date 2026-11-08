'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

// First-load intro: the logo appears, cracks spread from the centre and the dark
// screen shatters into glass shards that fly apart in 3D, revealing the page.
const COLS = 8, ROWS = 5;

function useShards() {
  return useMemo(() => {
    // deterministic pseudo-random so server and client render the same shards
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const shards = [];
    const cw = 100 / COLS, ch = 100 / ROWS;
    // grid of points; inner points are jittered so the triangles look like broken glass
    const P = [];
    for (let r = 0; r <= ROWS; r++) {
      P.push([]);
      for (let c = 0; c <= COLS; c++) {
        const edgeX = c === 0 || c === COLS, edgeY = r === 0 || r === ROWS;
        P[r].push([c * cw + (edgeX ? 0 : (rnd() - 0.5) * cw * 0.8), r * ch + (edgeY ? 0 : (rnd() - 0.5) * ch * 0.8)]);
      }
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const a = P[r][c], b = P[r][c + 1], d = P[r + 1][c], e = P[r + 1][c + 1];
        // split every cell into two triangles along a random diagonal
        const flip = rnd() > 0.5;
        const tris = flip ? [[a, b, d], [b, e, d]] : [[a, b, e], [a, e, d]];
        for (const t of tris) {
          const cx = (t[0][0] + t[1][0] + t[2][0]) / 3, cy = (t[0][1] + t[1][1] + t[2][1]) / 3;
          const dx = cx - 50, dy = cy - 50, dist = Math.hypot(dx, dy);
          shards.push({
            clip: `polygon(${t.map(([x, y]) => `${x}% ${y}%`).join(', ')})`,
            origin: `${cx}% ${cy}%`,
            x: (dx / (dist || 1)) * (40 + rnd() * 60) + (rnd() - 0.5) * 20,
            y: (dy / (dist || 1)) * (40 + rnd() * 60) + 30 + rnd() * 40,
            rz: (rnd() - 0.5) * 140,
            rx: (rnd() - 0.5) * 160,
            ry: (rnd() - 0.5) * 160,
            delay: dist / 70 * 0.45 + rnd() * 0.08,
            tint: 0.9 + rnd() * 0.1,
          });
        }
      }
    }
    return shards;
  }, []);
}

const CRACKS = [
  'M50 50 L38 22 L33 4', 'M50 50 L66 30 L80 8', 'M50 50 L78 48 L98 40', 'M50 50 L70 70 L88 96',
  'M50 50 L46 78 L40 98', 'M50 50 L24 64 L2 72', 'M50 50 L22 40 L4 30', 'M38 22 L22 18', 'M70 70 L86 66',
];

export default function ShatterIntro() {
  const shards = useShards();
  const [phase, setPhase] = useState('logo'); // logo -> crack -> shatter -> done

  useEffect(() => {
    const ready = () => { document.documentElement.dataset.introReady = 'true'; window.dispatchEvent(new Event('stackforge:intro-ready')); };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('done'); ready(); return; }
    document.documentElement.style.overflow = 'hidden';
    const t1 = setTimeout(() => setPhase('crack'), 650);
    const t2 = setTimeout(() => setPhase('shatter'), 1250);
    const t3 = setTimeout(() => { setPhase('done'); document.documentElement.style.overflow = ''; ready(); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); document.documentElement.style.overflow = ''; };
  }, []);

  if (phase === 'done') return null;
  const shatter = phase === 'shatter';

  return (
    <div className="sf-shatter" data-phase={phase} aria-hidden="true" style={{ pointerEvents: shatter ? 'none' : 'auto' }}>
      {!shatter ? <div className="sf-shard sf-shard-solid" /> : null}
      {shards.map((s, i) => (
        <motion.div
          key={i}
          className="sf-shard"
          style={{ clipPath: s.clip, WebkitClipPath: s.clip, transformOrigin: s.origin, filter: `brightness(${s.tint})` }}
          initial={false}
          animate={shatter ? { x: `${s.x}vw`, y: `${s.y}vh`, rotateZ: s.rz, rotateX: s.rx, rotateY: s.ry, scale: 0.7, opacity: 0 } : { x: 0, y: 0, rotateZ: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.55, 0, 0.75, 0.2], delay: shatter ? s.delay : 0, opacity: { duration: 0.6, delay: shatter ? s.delay + 0.5 : 0 } }}
        />
      ))}

      {/* cracks spreading from the centre */}
      <svg className="sf-cracks" viewBox="0 0 100 100" preserveAspectRatio="none">
        {CRACKS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase === 'logo' ? { pathLength: 0, opacity: 0 } : shatter ? { pathLength: 1, opacity: 0 } : { pathLength: 1, opacity: 1 }}
            transition={{ duration: shatter ? 0.25 : 0.35, delay: shatter ? 0 : i * 0.025, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* logo */}
      <motion.div
        className="sf-shatter-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={shatter ? { opacity: 0, scale: 1.25 } : phase === 'crack' ? { opacity: 1, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: shatter ? 0.35 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="44" height="44" viewBox="0 0 34 34" fill="none"><rect x="1" y="1" width="32" height="32" rx="9" fill="#EF0800" /><path d="M10 12.5 17 9l7 3.5v9L17 25l-7-3.5z" stroke="#101010" strokeWidth="2" strokeLinejoin="round" /><path d="M10 12.5 17 16l7-3.5M17 16v9" stroke="#101010" strokeWidth="2" strokeLinejoin="round" /></svg>
        <span>BAIT SYSTEMATICS</span>
      </motion.div>
    </div>
  );
}
