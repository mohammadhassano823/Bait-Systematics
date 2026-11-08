'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const FAQS = [
  { q: 'How much does a project cost?', a: 'Every project is different, so we never guess. After a free 30-minute call you get a fixed, itemised quote — and that is exactly what you pay.' },
  { q: 'How long does it take?', a: 'A website usually takes a few weeks; a full web or mobile app takes longer. You get a written timeline with clear milestones before any work starts.' },
  { q: 'Will I own the code?', a: 'Always. The code, designs and repository are yours from day one — no lock-in, no hidden licences.' },
  { q: 'Do you work with international clients?', a: 'Yes — we work with clients worldwide. We keep overlapping hours for calls and send clear updates in between.' },
  { q: 'Can you take over an existing project?', a: 'Yes. We can review, fix and extend an existing website or app, or take over from a previous developer.' },
  { q: 'Do you also run ads and marketing?', a: 'Yes. We set up and manage Meta (Facebook & Instagram) and Google Ads campaigns, connected to your website and CRM so every lead is tracked.' },
  { q: 'Which payment gateways can you connect?', a: 'Almost any — international gateways like Stripe and PayPal, and local options such as JazzCash, Easypaisa and bank gateways.' },
  { q: 'Do you offer support after launch?', a: 'Yes. Monthly plans cover fixes, updates, monitoring, hosting and new features as you grow.' },
];

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
