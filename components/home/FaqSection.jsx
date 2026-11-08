'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HOME_FAQS as FAQS } from '@/lib/faqs';

const EASE = [0.16, 1, 0.3, 1];


export default function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <div className="sf-faq">
      <header className="sf-faq-head">
        <h2>Frequently Asked Questions</h2>
        <p>Have questions? Here are clear answers to what clients ask us most — before a single line of code is written.</p>
      </header>

      <div className="sf-faq-list">
        {FAQS.map(({ q, a }, i) => {
          const on = open === i;
          return (
            <div key={q} className={'sf-faq-item' + (on ? ' is-open' : '')}>
              <button type="button" aria-expanded={on} aria-controls={`sf-faq-a-${i}`} id={`sf-faq-q-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                <span>{q}</span>
                <ChevronDown size={20} strokeWidth={2} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {on ? (
                  <motion.div key="a" id={`sf-faq-a-${i}`} role="region" aria-labelledby={`sf-faq-q-${i}`} className="sf-faq-a"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}>
                    <p>{a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
