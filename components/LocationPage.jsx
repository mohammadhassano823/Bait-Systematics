import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone, Clock3 } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PageHero from '@/components/PageHero';
import { SERVICES, serviceHref } from '@/lib/services';
import { SITE_URL } from '@/lib/site';
import { JsonLd, breadcrumbLd, faqLd } from '@/lib/seo';

// Local landing page for one office city (Faisalabad, Manchester).
export default function LocationPage({ c }) {
  return (
    <div className="sf">
      <JsonLd items={[breadcrumbLd([['Home', '/'], [c.crumb, c.path]]), faqLd(c.faqs), { '@type': 'WebPage', name: c.title, url: `${SITE_URL}${c.path}`, about: { '@id': `${SITE_URL}/#office-${c.office}` } }]} />
      <SiteNav />
      <main>
        <PageHero id="loc-title" eyebrow={c.eyebrow} image={c.image} title={c.h1} lede={c.lede}
          primary={{ href: '/contact', label: 'Get a free consultation' }} secondary={{ href: c.maps, label: 'Get directions' }}
          bullets={c.bullets} />

        <section className="sf-sv" aria-labelledby="loc-why">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">{c.whyEyebrow}</span>
              <h2 id="loc-why">{c.whyTitle}</h2>
              {c.intro.map((p) => <p key={p}>{p}</p>)}
            </div>
            <ul className="sf-sv-points">{c.why.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}</ul>
          </div>
        </section>

        <section className="sf-sv sf-sv-alt" aria-labelledby="loc-services">
          <div className="sf-sv-wrap">
            <span className="sf-featured-services-eyebrow">SERVICES IN {c.city.toUpperCase()}</span>
            <h2 id="loc-services">Everything we build for {c.city} businesses.</h2>
            <ul className="sf-sv-chips">{SERVICES.map((s) => <li key={s.id}><Link href={serviceHref(s.id)}>{s.t}</Link></li>)}</ul>
            <span className="sf-featured-services-eyebrow sf-sv-sub">INDUSTRIES WE SERVE</span>
            <p className="sf-sv-industries">{c.industries}</p>
          </div>
        </section>

        {(c.extra || []).map((x, n) => (
          <section key={x.title} className={'sf-sv' + (n % 2 ? ' sf-sv-alt' : '')} aria-labelledby={`loc-extra-${n}`}>
            <div className="sf-sv-wrap sf-sv-grid">
              <div>
                <span className="sf-featured-services-eyebrow">{x.eyebrow}</span>
                <h2 id={`loc-extra-${n}`}>{x.title}</h2>
              </div>
              <div>
                {x.paras.map((p) => <p key={p}>{p}</p>)}
                {x.link && <Link className="sf-about-text-link" href={x.link[0]}>{x.link[1]}<ArrowUpRight size={18} aria-hidden="true" /></Link>}
              </div>
            </div>
          </section>
        ))}

        <section className="sf-sv" aria-labelledby="loc-visit">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">VISIT OR CALL</span>
              <h2 id="loc-visit">Bait Systematics, <em>{c.city}.</em></h2>
              <ul className="sf-sv-contact">
                <li><MapPin size={20} aria-hidden="true" /><span>{c.address}</span></li>
                <li><Phone size={20} aria-hidden="true" /><a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a></li>
                <li><Clock3 size={20} aria-hidden="true" /><span>{c.hours}</span></li>
              </ul>
              <a className="sf-about-text-link" href={c.maps} target="_blank" rel="noopener noreferrer">Open in Google Maps<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <div className="sf-sv-faq">
              {c.faqs.map((f, n) => <details key={f.q} open={n === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="sf-sv sf-sv-alt">
          <div className="sf-sv-wrap sf-sv-cta">
            <h2>{c.ctaTitle}</h2>
            <p>Tell us what you need. A founder replies the same day with a clear first step and an honest, fixed quote.</p>
            <div className="sf-pghero-actions">
              <Link className="sf-pghero-primary" href="/contact">Start a conversation<ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a className="sf-pghero-ghost" href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
