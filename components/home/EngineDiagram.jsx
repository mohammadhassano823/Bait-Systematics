'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lightbulb, Database, Users, Plug, AppWindow, Layers, Workflow, Bot, ArrowUpRight, Cpu } from 'lucide-react';

const INPUTS = [
  { title: 'Your business goals', detail: 'The problem to solve', Icon: Lightbulb },
  { title: 'Your data', detail: 'Records, documents & insights', Icon: Database },
  { title: 'Your customers & team', detail: 'The people using your product', Icon: Users },
  { title: 'Your existing tools', detail: 'APIs, payments & integrations', Icon: Plug },
];
const OUTPUTS = [
  { title: 'Web applications', detail: 'Portals & business tools', Icon: AppWindow, id: 'web', description: 'Give customers and teams one place to work. We turn your requirements into a secure application with the screens, data and integrations your business needs.', tags: ['Customer portals', 'Dashboards', 'Internal tools'] },
  { title: 'SaaS platforms', detail: 'Products built to scale', Icon: Layers, id: 'saas', description: 'Turn your idea into a subscription product. Bring user accounts, permissions, billing and the core customer experience together in one maintainable platform.', tags: ['Subscriptions', 'User accounts', 'Billing'] },
  { title: 'Connected workflows', detail: 'CRM & process automation', Icon: Workflow, id: 'crm', description: 'Connect customer records and everyday tools so your team can spend less time moving data and more time following up, serving customers and making decisions.', tags: ['CRM integration', 'Follow-ups', 'Reporting'] },
  { title: 'AI-powered tools', detail: 'Assistants & document workflows', Icon: Bot, id: 'ai', description: 'Add AI where it has a useful role: answering questions, organising documents and assisting your team, with human oversight for decisions that need it.', tags: ['AI assistants', 'Document processing', 'Human oversight'] },
];
const ROWS = [40, 168, 296, 424];

export default function EngineDiagram() {
  const [selected, setSelected] = useState(0);
  const output = OUTPUTS[selected];
  return (
    <section id="engine" className="sf-engine sf-tone-dark" aria-labelledby="sf-engine-title">
      <div className="sf-engine-wrap">
        <header className="sf-engine-header"><span className="sf-featured-services-eyebrow">THE BAIT ENGINE</span><h2 id="sf-engine-title">Your business, connected.<br /><span>Your ideas, engineered.</span></h2><p>We bring your goals, data and tools together to build software that works as one system.</p></header>
        <div className="sf-engine-board">
          <div className="sf-engine-labels" aria-hidden="true"><span>WHAT YOU BRING</span><span>HOW WE BUILD</span><span>WHAT WE CREATE</span></div>
          <div className="sf-engine-map">
            <svg className="sf-engine-wires" viewBox="0 0 1200 464" preserveAspectRatio="none" fill="none" aria-hidden="true">
              {ROWS.map((y, i) => <path key={`in-${i}`} d={`M312 ${y} C420 ${y} 420 232 510 232`} stroke="#444" strokeWidth="1.5" />)}
              {ROWS.map((y, i) => <path key={`out-${i}`} className={selected === i ? 'sf-engine-wire-active' : ''} d={`M690 232 C780 232 780 ${y} 888 ${y}`} stroke={selected === i ? '#EF0800' : '#444'} strokeWidth={selected === i ? 2.5 : 1.5} />)}
              <path className="sf-engine-signal" d={`M312 ${ROWS[selected]} C420 ${ROWS[selected]} 420 232 510 232`} stroke="#FFA39C" strokeWidth="2" />
            </svg>
            <div className="sf-engine-inputs">{INPUTS.map(({ title, detail, Icon }) => <div className="sf-engine-node" key={title}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><div><strong>{title}</strong><span>{detail}</span></div></div>)}</div>
            <div className="sf-engine-core"><div className="sf-engine-core-mark"><Cpu size={38} strokeWidth={1.3} aria-hidden="true" /><strong>BAIT</strong><span>Design · Build · Connect</span></div><p>Thoughtful design.<br />Dependable engineering.</p></div>
            <div className="sf-engine-outputs" role="group" aria-label="Explore what we build">{OUTPUTS.map(({ title, detail, Icon }, index) => <button type="button" className={`sf-engine-node${selected === index ? ' selected' : ''}`} key={title} aria-pressed={selected === index} aria-controls="sf-engine-description" onClick={() => setSelected(index)}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><div><strong>{title}</strong><span>{detail}</span></div><ArrowUpRight size={17} className="sf-engine-node-arrow" aria-hidden="true" /></button>)}</div>
          </div>
          <div id="sf-engine-description" className="sf-engine-description" aria-live="polite" aria-atomic="true"><div><span className="sf-engine-selected-label">EXPLORE THE OUTPUT</span><h3>{output.title}</h3><div className="sf-engine-tags">{output.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><p>{output.description}</p><Link href={`/services#${output.id}`} aria-label={`Explore ${output.title}`}>Explore service<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </section>
  );
}
