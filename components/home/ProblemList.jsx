'use client';

import { motion } from 'framer-motion';
import { FileSpreadsheet, MessageSquareOff, Copy, MousePointerClick, Unplug, EyeOff, CheckCircle2, ArrowUpRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const PROBLEMS = [
  { t: 'Still running on spreadsheets', d: 'Your data lives in ten different files — and nobody fully trusts any of them.', cost: 'Time', Icon: FileSpreadsheet },
  { t: 'Leads slip through the cracks', d: 'Enquiries arrive on WhatsApp, email and calls — and some never get a reply.', cost: 'Customers', Icon: MessageSquareOff },
  { t: 'Hours lost to copy-paste', d: 'Your team re-types the same details into three different systems every day.', cost: 'Time', Icon: Copy },
  { t: 'A website that doesn’t sell', d: 'It looks fine, loads slowly and turns almost no visitors into enquiries.', cost: 'Revenue', Icon: MousePointerClick },
  { t: 'Tools that don’t talk', d: 'Payments, CRM and stock sit in separate apps that never stay in sync.', cost: 'Money', Icon: Unplug },
  { t: 'No clear picture', d: 'You only find out what worked after the month is already over.', cost: 'Decisions', Icon: EyeOff },
];

export default function ProblemList() {
  return (
    <section className="sf-pb" aria-labelledby="sf-pb-title">
      <div className="sf-pb-grid">
        <div className="sf-pb-left">
          <div className="sf-pb-eyebrow">Sound familiar?</div>
          <h2 id="sf-pb-title" className="sf-pb-title">Big ambitions. <span>Better systems.</span></h2>
          <p className="sf-pb-lede">Most teams we meet are losing hours every week to the same few problems. These are the ones we fix first.</p>
          <a className="sf-pb-start" href="#contact">Let’s fix what’s slowing you down <ArrowUpRight size={17} aria-hidden="true" /></a>
          <span className="sf-pb-note">One team. A connected way forward.</span>
        </div>

        <div className="sf-pb-list">
          {PROBLEMS.map(({ t, d, cost, Icon }, i) => (
            <div key={t} className="sf-pb-row">
              <span className="sf-pb-ico" aria-hidden="true"><Icon size={22} strokeWidth={1.9} /></span>
              <div className="sf-pb-txt">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <span className="sf-pb-cost"><b>{cost}</b> at stake</span>
            </div>
          ))}
          <motion.div
            className="sf-pb-fix"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <CheckCircle2 size={30} strokeWidth={2} aria-hidden="true" />
            <div>
              <strong>We fix all six — with one connected system.</strong>
              <span>Built around how your business actually works.</span>
            </div>
            <a href="#contact">Fix mine <ArrowUpRight size={16} strokeWidth={2.4} /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
