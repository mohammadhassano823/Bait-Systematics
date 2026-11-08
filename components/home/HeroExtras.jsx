'use client';

import { useEffect, useRef } from 'react';

// Soft light that follows the pointer across the hero background.
export function HeroSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const host = el.parentElement;
    let raf = 0;
    const onMove = (e) => {
      const b = host.getBoundingClientRect();
      const x = e.clientX - b.left, y = e.clientY - b.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', x + 'px');
        el.style.setProperty('--my', y + 'px');
        el.style.opacity = '1';
      });
    };
    const onLeave = () => { el.style.opacity = '0'; };
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="sf-spot" aria-hidden="true" />;
}

