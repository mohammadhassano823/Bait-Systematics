'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED, PROJECTS } from '@/lib/projects';
import careerzImage from '@/public/work/careerz.png';
import garageImage from '@/public/work/dkv.jpg';

const WORK = [
  { ...FEATURED, screenshot: careerzImage, summary: 'An AI education platform connecting students with institutions, courses, jobs and scholarships.' },
  { ...PROJECTS.find(project => project.name === 'DK Garage'), screenshot: garageImage, summary: 'An automotive marketplace bringing vehicle rentals, sales and services into one experience.' },
];

export default function SelectedWork() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="work" className="sf-selected-work sf-tone-dark" aria-labelledby="sf-selected-work-title">
      <div className="sf-selected-work-wrap">
        <header className="sf-selected-work-heading">
          <div><span className="sf-featured-services-eyebrow">SELECTED WORK</span><h2 id="sf-selected-work-title">See what we build.</h2></div>
          <p>A closer look at the websites and platforms we have created for our clients.</p>
        </header>
        <div className="sf-selected-work-grid">
          {WORK.map((project, index) => (
            <motion.article key={project.name} className="sf-selected-project"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }} transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : index * 0.1 }}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="sf-selected-project-preview" aria-label={`Visit ${project.name} website (opens in a new tab)`}>
                <div className="sf-selected-browser" aria-hidden="true"><div><i /><i /><i /></div><span>{new URL(project.url).hostname}</span><ArrowUpRight size={15} /></div>
                <div className="sf-selected-project-image"><Image src={project.screenshot} alt={`${project.name} homepage design`} fill unoptimized sizes="(max-width: 760px) 100vw, 50vw" /></div>
              </a>
              <div className="sf-selected-project-info"><div><span>{project.type}</span><h3>{project.name}</h3></div><a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} website (opens in a new tab)`}><ArrowUpRight size={23} aria-hidden="true" /></a></div>
              <p>{project.summary}</p>
              <ul className="sf-selected-project-tags" aria-label={`${project.name} project categories`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </motion.article>
          ))}
        </div>
        <div className="sf-selected-work-footer"><span>More projects. Different industries. The same attention to detail.</span><Link href="/portfolio">View All Projects<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
