'use client';

import { motion, MotionConfig } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Fades and lifts its children into place the first time they scroll into view.
export default function Reveal({ as = 'div', delay = 0, y = 40, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <MotionConfig reducedMotion="user">
      <Tag
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        {...rest}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}
