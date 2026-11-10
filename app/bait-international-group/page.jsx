import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, MapPin, Phone } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PageHero from '@/components/PageHero';
import { SITE_URL } from '@/lib/site';
import { JsonLd, breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';

// Page about the parent company, BAIT International Group (its own website is offline), linking to Bait Systematics.
const PATH = '/bait-international-group';

export const metadata = pageMeta({"title":"BAIT International Group — Overseas Recruitment Since 1967 | Faisalabad, Pakistan","description":"BAIT International Group is a licensed Overseas Employment Promoter (HRD/3421/LHR) in Faisalabad, recruiting skilled workers for the Gulf and Asia since 1967.","path":"/bait-international-group"});

const STATS = [
  ['1967', 'Recruiting for employers abroad'],
  ['HRD/3421/LHR', 'Government overseas employment licence'],
  ['1,317', 'Professionals deployed to Saudi Arabia, 2017–2022'],
  ['5,000+', 'Workers placed in Malaysia and Qatar'],
];

const SERVICES = [
  ['Advertising and selection', 'Advertising vacancies, arranging interviews and selecting candidates on the written demand of the employer.'],
  ['Shortlisting for employers', 'Shortlisting candidates for final interviews by the employer or their representatives in Pakistan.'],
  ['Trade tests and medicals', 'Arranging trade and skill tests and embassy-approved medical examinations for every selected worker.'],
  ['Documents and visas', 'Passports, ID cards and all government requirements, and obtaining visas from the concerned embassy or consulate.'],
  ['Orientation before departure', 'Briefing workers on their job, contract, salary, rights and the culture and customs of the host country.'],
  ['Tickets, dispatch and follow-up', 'Air ticket reservations, dispatch of 500+ workers within 30–45 days of legal documents, and regular site visits.'],
];

const CATEGORIES = 'Doctors, nurses and medical technicians · civil, electrical, mechanical and chemical engineers · CCTV, network, HVAC and aircraft technicians · foremen and supervisors · electricians, plumbers, pipe fitters and welders · masons, carpenters and steel fixers · heavy and light vehicle drivers · equipment operators · security, hospitality and general labour.';

const COUNTRIES = ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Bahrain', 'Oman', 'Iraq', 'Malaysia', 'Norway and Europe'];

const FAQS = [
  { q: 'What is BAIT International Group?', a: 'BAIT International Group is a government-licensed Overseas Employment Promoter based in Madina Town, Faisalabad, Pakistan. Since 1967 it has recruited skilled, semi-skilled and professional workers from Pakistan for employers in the Gulf, Europe and Asia.' },
  { q: 'Is BAIT International Group licensed?', a: 'Yes. It holds Overseas Employment Promoter licence HRD/3421/LHR issued by the Ministry of Overseas Pakistanis and Human Resource Development, Government of Pakistan, and is a member of the Pakistan Overseas Employment Promoters Association (POEPA).' },
  { q: 'Where is the BAIT International Group office?', a: 'The head office is at 14-Z Commercial Market, Madina Town, Faisalabad, Pakistan.' },
  { q: 'What is Bait Systematics?', a: 'Bait Systematics is the software and digital growth company of BAIT International Group, founded by Muhammad Hassan and Muhammad Adil. It builds websites, mobile apps, AI software and business systems, including recruitment and HR software.' },
];

export default function Page() {
  return (
    <div className="sf">
      <JsonLd items={[
        breadcrumbLd([['Home', '/'], ['BAIT International Group', PATH]]),
        {
          '@type': 'EmploymentAgency', '@id': `${SITE_URL}${PATH}#group`, name: 'BAIT International Group', url: `${SITE_URL}${PATH}`,
          foundingDate: '1967', slogan: 'Manpower is the power behind a successful organisation',
          description: metadata.description, telephone: '+92418520784',
          address: { '@type': 'PostalAddress', streetAddress: '14-Z Commercial Market, Madina Town', addressLocality: 'Faisalabad', addressRegion: 'Punjab', postalCode: '38000', addressCountry: 'PK' },
          subOrganization: { '@id': `${SITE_URL}/#org` }, areaServed: COUNTRIES,
        },
        faqLd(FAQS),
      ]} />
      <SiteNav />
      <main>
        <PageHero id="group-title" eyebrow="BAIT International Group · Since 1967" image="/images/about-office.jpg"
          title={<>BAIT International <em>Group.</em></>}
          lede="A government-licensed overseas recruitment group from Madina Town, Faisalabad — connecting Pakistani professionals and skilled workers with employers across the Gulf, Europe and Asia since 1967. Manpower is the power behind a successful organisation."
          primary={{ href: '/contact', label: 'Contact us' }} secondary={{ href: '/about', label: 'Our story' }}
          bullets={['Licence HRD/3421/LHR', 'Member of POEPA', '14-Z Commercial Market, Madina Town, Faisalabad']} />

        <section className="sf-sv" aria-labelledby="g-about">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">ABOUT THE GROUP</span>
              <h2 id="g-about">Nearly six decades of <em>international recruitment.</em></h2>
              <p>BAIT International Group began international recruitment in Norway and other European countries in 1967, and has worked across the Middle East and Saudi Arabia since 1979 — including large projects such as the Riyadh University housing villas (1982–84) and telephone exchange projects across the Kingdom.</p>
              <p>Today the group recruits for leading employers in Saudi Arabia, the UAE, Qatar, Bahrain, Iraq and Malaysia, working under the rules of the Government of Pakistan as a licensed Overseas Employment Promoter and a member of the Pakistan Overseas Employment Promoters Association (POEPA).</p>
              <span className="sf-ab-licence"><BadgeCheck size={18} aria-hidden="true" />Overseas Employment Promoter · HRD/3421/LHR</span>
            </div>
            <ul className="sf-sv-points">{STATS.map(([n, l]) => <li key={l}><strong>{n}</strong><span>{l}</span></li>)}</ul>
          </div>
        </section>

        <section className="sf-sv sf-sv-alt" aria-labelledby="g-services">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">RECRUITMENT SERVICES</span>
              <h2 id="g-services">From demand letter to <em>deployment.</em></h2>
              <p>Every worker is screened, interviewed, trade-tested and medically certified before final selection, and attends an orientation programme before departure. The employer is kept informed at every stage.</p>
              <span className="sf-featured-services-eyebrow sf-sv-sub">COUNTRIES SERVED</span>
              <ul className="sf-sv-chips">{COUNTRIES.map((c) => <li key={c}><span>{c}</span></li>)}</ul>
            </div>
            <ol className="sf-sv-steps">{SERVICES.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}</ol>
          </div>
        </section>

        <section className="sf-sv" aria-labelledby="g-cats">
          <div className="sf-sv-wrap">
            <span className="sf-featured-services-eyebrow">CATEGORIES OF WORKERS</span>
            <h2 id="g-cats">Highly skilled, skilled, semi-skilled and unskilled.</h2>
            <p className="sf-sv-industries">{CATEGORIES}</p>
          </div>
        </section>

        <section className="sf-sv sf-sv-alt" aria-labelledby="g-it">
          <div className="sf-sv-wrap sf-sv-grid">
            <div>
              <span className="sf-featured-services-eyebrow">OUR TECHNOLOGY COMPANY</span>
              <h2 id="g-it">Bait Systematics — <em>the group’s IT arm.</em></h2>
              <p>Bait Systematics carries the group’s promise into software. Founded by Muhammad Hassan and Muhammad Adil, it builds websites, mobile apps, AI-powered software and business systems — including recruitment, HR, visa and document tracking software shaped by the group’s own decades in overseas recruitment.</p>
              <div className="sf-pghero-actions">
                <Link className="sf-pghero-primary" href="/services">Explore our services<ArrowUpRight size={18} aria-hidden="true" /></Link>
                <Link className="sf-pghero-ghost" href="/services/recruitment-hr-software">Recruitment &amp; HR software</Link>
              </div>
            </div>
            <div>
              <ul className="sf-sv-contact">
                <li><MapPin size={20} aria-hidden="true" /><span>14-Z Commercial Market, Madina Town, Faisalabad, Pakistan</span></li>
                <li><Phone size={20} aria-hidden="true" /><a href="tel:+92418520784">+92 41 8520784</a></li>
              </ul>
              <div className="sf-sv-faq">
                {FAQS.map((f, n) => <details key={f.q} open={n === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
