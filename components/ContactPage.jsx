'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Phone, Mail, MapPin, Send, Check, Clock3, ShieldCheck, KeyRound, Zap } from 'lucide-react';
import SiteFooter from '@/components/SiteFooter';
import { NEED_OPTIONS } from '@/lib/services';

const WHATSAPP = '923110429799';
const PHONE = '+92 311 0429799';
const UK_PHONE = '+44 7405 449846';
const EMAIL = 'info@baitsystematics.com';
const OFFICES = [
  { key: 'pk', label: 'Faisalabad', title: 'Head office · Pakistan', address: '14-Z Commercial Market, Madina Town, Faisalabad, Pakistan', q: '14-Z Commercial Market, Madina Town, Faisalabad', pin: 'Bait Systematics · Faisalabad' },
  { key: 'uk', label: 'Manchester', title: 'UK office · United Kingdom', address: '20 Marcliffe Drive, Manchester, M19 3XD, United Kingdom · +44 7405 449846', q: '20 Marcliffe Drive, Manchester M19 3XD', pin: 'Bait Systematics · Manchester' },
];
const mapsLink = (o) => `https://maps.google.com/?q=${encodeURIComponent(o.q)}`;

// Map with a switch between the two offices.
function OfficeMap() {
  const [i, setI] = useState(0);
  const o = OFFICES[i];
  return (
    <div className="sf-cx-map">
      <div className="sf-cx-map-tabs" role="tablist" aria-label="Choose office">
        {OFFICES.map((x, n) => <button key={x.key} type="button" role="tab" aria-selected={i === n} className={i === n ? 'on' : ''} onClick={() => setI(n)}>{x.label}</button>)}
      </div>
      <iframe key={o.key} title={`${o.pin} on Google Maps`} src={`https://maps.google.com/maps?q=${encodeURIComponent(o.q)}&z=15&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <a className="sf-cx-map-pin" href={mapsLink(o)} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" />{o.pin}</a>
    </div>
  );
}

const FAQ = [
  ['Is the first call really free?', 'Yes. A free 30-minute consultation about your business and goals, with no obligation afterwards.'],
  ['Will you sign an NDA?', 'Yes — on request, before you share any details. Your ideas and data stay private.'],
  ['Who owns the code?', 'You do. Source code, designs and IP transfer to you on final payment, with documentation.'],
  ['How quickly do you reply?', 'Usually the same day on WhatsApp or email, Monday to Saturday.'],
];

// Classic query form: everything filled in is sent to our WhatsApp number as one message.
function QueryForm() {
  const [f, setF] = useState({ name: '', phone: '', email: '', company: '', need: '', budget: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      '*New enquiry — baitsystematics.com*',
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      f.email && `Email: ${f.email}`,
      f.company && `Company: ${f.company}`,
      f.need && `Service: ${f.need}`,
      f.budget && `Budget: ${f.budget}`,
      `Message: ${f.message}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <form className="sf-cx-form" onSubmit={submit}>
      <div className="sf-cx-form-grid">
        <label><span>Full name *</span><input required value={f.name} onChange={set('name')} autoComplete="name" placeholder="Your name" /></label>
        <label><span>Phone / WhatsApp *</span><input required type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="+92 300 0000000" /></label>
        <label><span>Email</span><input type="email" value={f.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" /></label>
        <label><span>Company</span><input value={f.company} onChange={set('company')} autoComplete="organization" placeholder="Business name" /></label>
        <label><span>Service</span><select value={f.need} onChange={set('need')}><option value="">Choose a service</option>{NEED_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label><span>Budget</span><select value={f.budget} onChange={set('budget')}><option value="">Choose a range</option>{['Under $1k', '$1k–$5k', '$5k–$15k', '$15k+', 'Not sure yet'].map((o) => <option key={o}>{o}</option>)}</select></label>
        <label className="sf-cx-form-full"><span>Project details *</span><textarea required rows={5} value={f.message} onChange={set('message')} placeholder="What do you want to build, by when, and anything else we should know" /></label>
      </div>
      <div className="sf-cx-form-foot">
        <button type="submit" className="sf-cx-send"><Send size={17} aria-hidden="true" />Send query on WhatsApp</button>
        {sent && <p>WhatsApp opened with your query — just tap send.</p>}
      </div>
    </form>
  );
}

function LocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Karachi' }).format(new Date()));
    fmt(); const t = setInterval(fmt, 30000); return () => clearInterval(t);
  }, []);
  return time ? <>It’s {time} in Faisalabad</> : <>Faisalabad, Pakistan</>;
}

export default function ContactPage() {
  return (
    <div className="sf">
      <header className="nav"><nav aria-label="Main" className="nav-in">
        <Link className="brand" href="/"><img src="/images/bait-systematics-logo.png" alt="Bait Systematics" className="sf-brand-logo" width="1000" height="228" /></Link>
        <div className="nav-links"><Link className="nl" href="/">Home</Link><Link className="nl" href="/about">About</Link><Link className="nl" href="/services">Services</Link><Link className="nl" href="/portfolio">Work</Link><Link className="nl on" href="/contact">Contact</Link></div>
        <a className="btn" href="#form">Book a call <ArrowUpRight size={14} strokeWidth={2.6} aria-hidden="true" /></a>
      </nav></header>

      <section className="sf-cx-hero" aria-labelledby="contact-title">
        <div className="sf-cx-hero-inner">
          <div className="sf-cx-hero-copy">
            <span className="sf-pghero-eyebrow">Contact</span>
            <h1 id="contact-title">Have an idea? <em>Let’s make it real.</em></h1>
            <p className="sf-cx-lede">Tell us what you want to build. Your query lands straight on our WhatsApp, a founder reads it, and you get a clear first step and an honest, fixed quote — usually the same day.</p>
            <p className="sf-cx-status"><i aria-hidden="true" /><Clock3 size={16} aria-hidden="true" /><LocalTime /> · usually replies the same day</p>
            <ul className="sf-cx-links">
              <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /><span><small>WhatsApp</small>{PHONE}</span></a></li>
              <li><a href={`mailto:${EMAIL}`}><Mail size={18} aria-hidden="true" /><span><small>Email</small>{EMAIL}</span></a></li>
              <li><a href="https://www.instagram.com/baitsystematics" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg><span><small>Instagram</small>@baitsystematics</span></a></li>
              <li><a href={`tel:${UK_PHONE.replace(/\s/g, '')}`}><Phone size={18} aria-hidden="true" /><span><small>UK phone</small>{UK_PHONE}</span></a></li>
            </ul>
            <ul className="sf-cx-trust">
              <li><Zap size={16} aria-hidden="true" />Free 30-minute call</li>
              <li><ShieldCheck size={16} aria-hidden="true" />NDA on request</li>
              <li><KeyRound size={16} aria-hidden="true" />100% code ownership</li>
            </ul>
          </div>
          <div className="sf-cx-formwrap" id="form"><span className="sf-cx-formtag">Send a query</span><QueryForm /></div>
        </div>
      </section>

      <section className="sf-cx-visit sf-tone-dark" aria-labelledby="visit-title">
        <div className="sf-cx-wrap sf-cx-visit-grid">
          <div className="sf-cx-visit-copy">
            <span className="sf-pghero-eyebrow">Visit or call</span>
            <h2 id="visit-title">Faisalabad and Manchester. <em>Worldwide clients.</em></h2>
            <p>Meet us in Pakistan or the UK, or work with us from anywhere. Flexible hours that overlap with your business day, wherever you are.</p>
            <div className="sf-cx-visit-cards">
              {OFFICES.map((o) => (
                <a key={o.key} className="sf-cx-card" href={mapsLink(o)} target="_blank" rel="noopener noreferrer">
                  <MapPin size={22} aria-hidden="true" />
                  <div><strong>{o.title}</strong><span>{o.address}</span><em>Get directions <ArrowUpRight size={15} aria-hidden="true" /></em></div>
                </a>
              ))}
              <div className="sf-cx-card">
                <Clock3 size={22} aria-hidden="true" />
                <div><strong>Monday – Saturday</strong><span>Flexible hours for clients in every time zone</span>
                  <ul className="sf-cx-zones">{['Europe', 'Americas', 'Middle East', 'Africa', 'Asia-Pacific'].map((z) => <li key={z}>{z}</li>)}</ul></div>
              </div>
            </div>
          </div>
          <OfficeMap />
        </div>
      </section>

      <section className="sf-cx-faq sf-tone-dark" aria-labelledby="faq-title">
        <div className="sf-cx-wrap">
          <span className="sf-pghero-eyebrow">Before you message</span>
          <h2 id="faq-title">Quick answers.</h2>
          <div className="sf-cx-faq-grid">
            {FAQ.map(([q, a]) => (
              <article key={q}>
                <Check size={18} aria-hidden="true" />
                <h3>{q}</h3>
                <p>{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
