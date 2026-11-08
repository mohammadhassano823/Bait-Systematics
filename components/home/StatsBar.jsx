'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Users, MessageCircle, ShieldCheck } from 'lucide-react';
import { CountUp } from './motion';

const STATS = [
  { v: '3', unit: '+', title: 'Experience', label: 'Years of software expertise', Icon: Code2, accent: '#EF0800' },
  { v: '14', unit: '+', title: 'Partnerships', label: 'Brands that trust Bait Systematics', Icon: Users, accent: '#FFFFFF' },
  { v: '24', unit: 'h', pre: '<', title: 'Communication', label: 'Replies within one business day', Icon: MessageCircle, accent: '#FFFFFF' },
  { v: '100', unit: '%', title: 'Ownership', label: 'Your code. Your ownership.', Icon: ShieldCheck, accent: '#FFA39C' },
];

export default function StatsBar() {
  const ref = useRef(null);
  const on = useInView(ref, { once: true, amount: 0.25 });
  return <div ref={ref} className="sf-proof-strip">
    {STATS.map(({ v, unit, pre, title, label, Icon, accent }, i) => <motion.div className="sf-proof-stat" key={title} initial={{ opacity: 0, y: 14 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}>
      <div className="sf-proof-heading"><Icon size={15} strokeWidth={1.7} aria-hidden="true" /><span>{title}</span></div>
      <div className="sf-proof-value">{pre && <span className="sf-proof-prefix">{pre}</span>}{on ? <CountUp value={v} duration={1.4} /> : v}<span style={{ color: accent }}>{unit}</span></div>
      <p>{label}</p>
    </motion.div>)}
  </div>;
}
