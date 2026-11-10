import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PageHero from '@/components/PageHero';
import { SERVICES, SERVICE_COPY, SERVICE_SLUGS, serviceBySlug, serviceHref } from '@/lib/services';
import { SITE_URL } from '@/lib/site';
import { JsonLd, breadcrumbLd, faqLd } from '@/lib/seo';

// One page per service, e.g. /services/pharmacy-management-software — each targets its own search terms.
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: SERVICE_SLUGS[s.id] }));
}

const imageOf = (s) => s.img || `/services/${s.id}-premium.png`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  const title = `${s.t} in Manchester & Faisalabad | Bait Systematics`;
  const description = `${s.long} Free consultation and a fixed quote from Bait Systematics — serving the UK, Pakistan and clients worldwide.`;
  return {
    title, description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/services/${slug}`, images: [{ url: imageOf(s), alt: `${s.t} by Bait Systematics` }] },
  };
}

function faqsFor(s) {
  return [
    { q: `How much does ${s.short.toLowerCase().startsWith('a') ? 'an' : 'a'} ${s.short.toLowerCase()} cost?`, a: `Every project is scoped to your business. After a free 30-minute consultation, Bait Systematics gives you a fixed, itemised quote — and that is exactly what you pay.` },
    { q: 'How long does it take?', a: `${s.time}. Before any work starts you receive a written timeline with clear milestones and regular demos along the way.` },
    { q: 'Will I own the work?', a: 'Yes. The source code, designs, accounts and intellectual property transfer to you on final payment, with documentation.' },
    { q: 'Do you work outside Manchester and Faisalabad?', a: 'Yes. Our offices are in Manchester, UK and Faisalabad, Pakistan, and we work with businesses worldwide over video calls, WhatsApp and email.' },
  ];
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const [tag, para] = SERVICE_COPY[s.id] || [s.d, s.long];
  const faqs = faqsFor(s);
  const i = SERVICES.indexOf(s);
  const related = [1, 2, 3].map((n) => SERVICES[(i + n) % SERVICES.length]);

  return (
    <div className="sf">
      <JsonLd items={[
        breadcrumbLd([['Home', '/'], ['Services', '/services'], [s.t, `/services/${slug}`]]),
        {
          '@type': 'Service', name: s.t, serviceType: s.t, description: s.long, url: `${SITE_URL}/services/${slug}`,
          image: `${SITE_URL}${imageOf(s)}`, provider: { '@id': `${SITE_URL}/#org` },
          areaServed: [{ '@type': 'City', name: 'Manchester' }, { '@type': 'City', name: 'Faisalabad' }, 'Worldwide'],
        },
        faqLd(faqs),
      ]} />
      <SiteNav active="/services" />
      <main>
        <PageHero id="service-title" eyebrow="Bait Systematics · Manchester · Faisalabad · Worldwide" image={imageOf(s)}
          title={<>{s.t}<em>.</em></>}
          lede={`${tag} ${s.long}`}
          primary={{ href: '/contact', label: 'Get a free consultation' }} secondary={{ href: '/services', label: 'All services' }}
          bullets={['Free 30-minute consultation', 'Fixed quote before we start', s.time.replace(/^Typically /, 'Delivered in ')]} />

        <section className="sf-sv" aria-labelledby="sv-included">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">WHAT YOU GET</span>
              <h2 id="sv-included">{tag}</h2>
              <p>{para}</p>
              <dl className="sf-sv-meta">
                <div><dt>Timeline</dt><dd><Clock3 size={16} aria-hidden="true" />{s.time.replace(/^Typically /, '')}</dd></div>
                <div><dt>Built with</dt><dd>{s.tools.join(' · ')}</dd></div>
              </dl>
            </div>
            <ul className="sf-sv-list">{s.get.map((g) => <li key={g}>{g}</li>)}</ul>
          </div>
        </section>

        <section className="sf-sv sf-sv-alt" aria-labelledby="sv-process">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">HOW WE DELIVER</span>
              <h2 id="sv-process">From first call to a live <em>{s.short.toLowerCase()}.</em></h2>
              <p>Every {s.short.toLowerCase()} we build follows the same clear process, so you always know what is happening, what it costs and when it will be ready. You speak directly to the founders throughout — no account managers in between.</p>
              <p>In practice, this is the kind of result our clients see once the work is live:</p>
              <ul className="sf-sv-list sf-sv-list-tight">{s.mock.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
            <ol className="sf-sv-steps">
              <li><strong>Free consultation</strong><span>A 30-minute call to understand your business, your users and what the {s.short.toLowerCase()} must achieve.</span></li>
              <li><strong>Scope and fixed quote</strong><span>A written plan covering features, timeline and an itemised, fixed price — agreed before any work starts.</span></li>
              <li><strong>Design and build</strong><span>We design, build and test in short milestones, with regular demos so you can give feedback early.</span></li>
              <li><strong>Launch and handover</strong><span>We launch, train your team and hand over the code, accounts and documentation — it is all yours.</span></li>
              <li><strong>Support and growth</strong><span>Optional monthly support for hosting, updates, security and new features as your business grows.</span></li>
            </ol>
          </div>
        </section>

        <section className="sf-sv" aria-labelledby="sv-why">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">WHY BAIT SYSTEMATICS</span>
              <h2 id="sv-why">A partner with <em>decades behind it.</em></h2>
              <p>Bait Systematics is the technology company of BAIT International Group, a government-licensed overseas recruitment group trusted by employers across the Gulf, Europe and Asia since 1967. We bring that same discipline — understand exactly what is needed and deliver it on time — to every {s.t.toLowerCase()} project.</p>
              <p>With offices in Manchester, United Kingdom and Madina Town, Faisalabad, Pakistan, we work with businesses worldwide: clinics, shops, schools, agencies, factories and fast-growing startups.</p>
              <p>Looking for a local team? See our <Link href="/software-house-faisalabad">software house in Faisalabad</Link> and our <Link href="/software-company-manchester">software company in Manchester</Link>.</p>
            </div>
            <ul className="sf-sv-points">
              <li><strong>Fixed, honest pricing</strong><span>You know the full cost before we start. No hidden extras and no surprise invoices.</span></li>
              <li><strong>You own everything</strong><span>Source code, designs and accounts transfer to you on final payment.</span></li>
              <li><strong>Founders on every project</strong><span>Muhammad Hassan leads your project and Muhammad Adil leads engineering — you always talk to the people responsible.</span></li>
              <li><strong>Support after launch</strong><span>We stay with you after go-live with fixes, improvements and new features.</span></li>
            </ul>
          </div>
        </section>

        <section className="sf-sv sf-sv-alt" aria-labelledby="sv-faq">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">QUESTIONS</span>
              <h2 id="sv-faq">{s.t}: <em>quick answers.</em></h2>
            </div>
            <div className="sf-sv-faq">
              {faqs.map((f, n) => <details key={f.q} open={n === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="sf-sv" aria-labelledby="sv-related">
          <div className="sf-sv-wrap">
            <span className="sf-featured-services-eyebrow">OFTEN COMBINED WITH</span>
            <h2 id="sv-related">Related services.</h2>
            <ul className="sf-sv-related">
              {related.map((r) => <li key={r.id}><Link href={serviceHref(r.id)}><strong>{r.t}</strong><span>{r.d}</span><ArrowUpRight size={20} aria-hidden="true" /></Link></li>)}
            </ul>
            <div className="sf-sv-cta">
              <h2>Ready to talk about your <em>{s.short.toLowerCase()}?</em></h2>
              <p>Tell us what you need. A founder replies the same day with a clear first step and an honest, fixed quote.</p>
              <div className="sf-pghero-actions">
                <Link className="sf-pghero-primary" href="/contact">Start a conversation<ArrowUpRight size={18} aria-hidden="true" /></Link>
                <a className="sf-pghero-ghost" href="https://wa.me/923110429799" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
