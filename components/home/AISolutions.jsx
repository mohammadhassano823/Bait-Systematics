'use client';

import { useEffect, useRef } from 'react';
import aiVisual from '@/public/images/ai-solutions.png';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, Workflow, Database, Check, ArrowUpRight } from 'lucide-react';

const CAPABILITIES = [
  { title: 'AI assistants', Icon: Bot, items: ['Customer enquiries', 'Document Q&A', 'Internal knowledge tools'] },
  { title: 'Workflow automation', Icon: Workflow, items: ['Lead qualification', 'Document processing', 'Human approval steps'] },
  { title: 'Connected data', Icon: Database, items: ['CRM & API integrations', 'Data synchronisation', 'Reports & dashboards'] },
];

export default function AISolutions() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (reducedMotion) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.1 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);
  return (
    <section id="ai-solutions" className="sf-ai-solutions sf-tone-light" aria-labelledby="sf-ai-solutions-title">
      <div className="sf-ai-solutions-layout">
        <motion.figure className="sf-ai-solutions-visual"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.8 }}>
          <video ref={videoRef} src="/videos/ai-solutions.mp4" poster={aiVisual.src} muted loop playsInline preload="metadata" disablePictureInPicture disableRemotePlayback aria-hidden="true" />
          <figcaption><span>INTELLIGENCE, APPLIED.</span><strong>Technology that works<br />alongside your team.</strong></figcaption>
        </motion.figure>
        <motion.div className="sf-ai-solutions-content"
          initial={reducedMotion ? false : { opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.8 }}>
          <span className="sf-featured-services-eyebrow">ARTIFICIAL INTELLIGENCE & AUTOMATION</span>
          <h2 id="sf-ai-solutions-title">Make AI a useful part<br />of your business.</h2>
          <p>Answer customer questions, process documents and connect everyday tasks with AI built around your operations. We help you identify where it can make a difference, integrate it with your existing tools and keep people in control of important decisions.</p>
          <div className="sf-ai-capabilities">
            {CAPABILITIES.map(({ title, Icon, items }) => <article key={title}>
              <Icon size={29} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3>
              <ul>{items.map(item => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul>
            </article>)}
          </div>
          <Link href="/services#ai" className="sf-ai-explore">Explore AI solutions<ArrowUpRight size={19} aria-hidden="true" /></Link>
          <span className="sf-ai-solutions-note">A practical starting point. A clear use case. Human oversight.</span>
        </motion.div>
      </div>
    </section>
  );
}
