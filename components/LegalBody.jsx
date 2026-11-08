'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';

// Body of the Privacy and Terms pages: key points strip, sticky contents with the current section highlighted,
// numbered sections and a closing contact block.
export default function LegalBody({ secs, glance = [], cta }) {
  const [active, setActive] = useState(secs[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (seen[0]) setActive(seen[0].target.id);
    }, { rootMargin: '-120px 0px -60% 0px' });
    secs.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [secs]);

  return (
    <section className="sf-lg" id="legal-body">
      <div className="sf-lg-wrap">
        {glance.length > 0 && (
          <ul className="sf-lg-glance" aria-label="At a glance">
            {glance.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}
          </ul>
        )}

        <div className="sf-lg-grid">
          <nav className="sf-lg-toc" aria-label="On this page">
            <span>On this page</span>
            <ol>
              {secs.map((s) => <li key={s.id}><a href={`#${s.id}`} className={active === s.id ? 'on' : ''}><b>{s.n}</b>{s.t}</a></li>)}
            </ol>
          </nav>

          <div className="sf-lg-body">
            {secs.map((s) => (
              <section key={s.id} id={s.id} className="sf-lg-sec">
                <span className="sf-lg-num" aria-hidden="true">{s.n}</span>
                <div>
                  <h2>{s.t}</h2>
                  {s.ps.map((p) => <p key={p}>{p}</p>)}
                  {s.list.length > 0 && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
                </div>
              </section>
            ))}

            {cta && (
              <div className="sf-lg-cta">
                <h2>{cta.title}</h2>
                <p>{cta.text}</p>
                <div className="sf-lg-cta-actions">
                  <a className="sf-pghero-primary" href="mailto:info@baitsystematics.com"><Mail size={18} aria-hidden="true" />info@baitsystematics.com</a>
                  <Link className="sf-pghero-ghost" href="/contact">Contact page<ArrowUpRight size={18} aria-hidden="true" style={{ marginLeft: 10 }} /></Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
