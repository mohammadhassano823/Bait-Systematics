'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion';

// Scroll transition for a whole section: it rises in like a card and opens up to full size,
// then shrinks and dims as the next section scrolls over it.
export default function SectionShift({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: inP } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] });
  const { scrollYProgress: outP } = useScroll({ target: ref, offset: ['end 0.85', 'end 0.1'] });
  const enter = useSpring(inP, { stiffness: 120, damping: 26, mass: 0.4 });
  const leave = useSpring(outP, { stiffness: 120, damping: 26, mass: 0.4 });

  const scaleIn = useTransform(enter, [0, 1], [0.86, 1]);
  const scaleOut = useTransform(leave, [0, 1], [1, 0.9]);
  const scale = useTransform([scaleIn, scaleOut], ([a, b]) => a * b);
  const y = useTransform(enter, [0, 1], [120, 0]);
  const rotateX = useTransform(enter, [0, 1], [10, 0]);
  const radius = useTransform(enter, [0, 1], [90, 40]);
  const dim = useTransform(leave, [0, 1], [1, 0.45]);
  const blur = useTransform(leave, [0, 1], [0, 6]);
  const filter = useMotionTemplate`brightness(${dim}) blur(${blur}px)`;
  const r = useMotionTemplate`${radius}px`;

  if (reduce) return <div ref={ref}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className="sf-shift"
      style={{ scale, y, rotateX, filter, '--shift-r': r, transformPerspective: 1400, transformOrigin: 'center top' }}
    >
      {children}
    </motion.div>
  );
}
