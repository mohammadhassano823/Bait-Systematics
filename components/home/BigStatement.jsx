'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

// Closing call to action above the footer: the BAIT mark spins in 3D on hover (one turn) and on click (two turns).
export default function BigStatement() {
  const [turns, setTurns] = useState(0);
  const reducedMotion = useReducedMotion();
  const spin = (n) => { if (!reducedMotion) setTurns((t) => t + n); };

  return (
    <section className="sf-cta-logo sf-tone-dark" aria-labelledby="sf-cta-logo-title">
      <div className="sf-cta-logo-inner">
        <button type="button" className="sf-cta-logo-mark" onMouseEnter={() => spin(1)} onClick={() => spin(2)} aria-label="Spin the Bait Systematics logo">
          <motion.span className="sf-cta-logo-spin" animate={{ rotateY: turns * 360 }} transition={{ duration: reducedMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <Image src="/images/bait-mark-red.png" alt="Bait Systematics logo" width={770} height={500} unoptimized />
          </motion.span>
        </button>
        <span className="sf-cta-logo-hint">HOVER · CLICK TO SPIN</span>
        <span className="sf-cta-logo-tagline">Build <i /> Innovate <i /> Grow</span>

        <h2 id="sf-cta-logo-title">Ready to build something <em>your customers love?</em></h2>
        <p>Tell us about your business. In one free 30-minute call we’ll show you what to build, how long it takes and what it costs — no obligation.</p>

        <div className="sf-cta-logo-actions">
          <Link className="sf-cta-logo-primary" href="/contact">Book a free strategy call<ArrowUpRight size={18} aria-hidden="true" /></Link>
          <a className="sf-cta-logo-ghost" href="https://wa.me/923110429799" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />WhatsApp us</a>
        </div>
      </div>
    </section>
  );
}
