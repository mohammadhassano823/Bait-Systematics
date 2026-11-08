'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, PenTool, Code2, Workflow, LifeBuoy } from 'lucide-react';
import { SERVICES as ALL } from '@/lib/services';

const EASE = [0.16, 1, 0.3, 1];
const GOLD = { bg: 'rgba(239,8,0,0.16)', fg: '#FFA39C' };
const MINT = { bg: 'rgba(255,163,156,0.22)', fg: '#FFA39C' };
const INK = { bg: 'rgba(16,16,16,0.08)', fg: '#FFFFFF' };

const TINTS = [GOLD, MINT, INK];
const SERVICES = ALL.map((s, i) => ({ ...s, c: TINTS[i % 3] }));

const STEPS = [
  { title: 'Design', detail: 'Clear, intuitive experiences', Icon: PenTool },
  { title: 'Build', detail: 'Fast, dependable software', Icon: Code2 },
  { title: 'Automate', detail: 'Less busywork, more progress', Icon: Workflow },
  { title: 'Support', detail: 'Here for what comes next', Icon: LifeBuoy },
];

const enter = (i) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: EASE, delay: (i % 4) * 0.08 },
});

export default function ServiceCards() {
  return (
    <div className="sf-sc">
      {SERVICES.map(({ t, d, Icon, c }, i) => (
        <motion.article key={t} className="sf-sc-card" {...enter(i)}>
          <span className="sf-sc-ico" style={{ background: c.bg, color: c.fg }} aria-hidden="true">
            <Icon size={24} strokeWidth={1.9} />
          </span>
          <h3>{t}</h3>
          <p>{d}</p>
        </motion.article>
      ))}
      <motion.div className="sf-sc-card sf-sc-team sf-sc-team-refresh" {...enter(10)}>
        <div className="sf-sc-team-head">
        <div className="sf-sc-team-copy">
          <span className="sf-sc-team-label"><span />Your product, end to end</span>
          <h3>One team.<br /><span>The whole product.</span></h3>
          <p>No juggling freelancers or agencies — the same senior people design, build, automate and support it.</p>
        </div>
          <div className="sf-sc-team-action">
          <a href="#contact" className="sf-sc-btn">
            Start a project <ArrowUpRight size={18} strokeWidth={2.4} />
          </a>
          </div>
        </div>
        <ol className="sf-sc-team-stages">
          {STEPS.map(({ title, detail, Icon }) => (
            <li key={title}>
              <div className="sf-sc-stage-top"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></div>
              <h4>{title}</h4>
              <p>{detail}</p>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
}
