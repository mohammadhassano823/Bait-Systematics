'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

// Cookie consent: essential cookies are always on; analytics and marketing only run after the visitor agrees.
// The choice is kept for 12 months (localStorage + a first-party cookie) and can be changed from the footer.
// Google Analytics loads only when NEXT_PUBLIC_GA_ID is set AND analytics was accepted.
const KEY = 'bait-consent';
const VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 365;
// Google tag for the Bait Systematics GA4 property. Accepts a "GTM-…" Google tag or a "G-…" measurement ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-FVQHGWRJSL';

function readConsent() {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!c || c.v !== VERSION || Date.now() - c.at > MAX_AGE * 1000) return null;
    return c;
  } catch { return null; }
}

function saveConsent(analytics, marketing) {
  const c = { v: VERSION, at: Date.now(), analytics, marketing };
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
  document.cookie = `${KEY}=${analytics ? 'a' : ''}${marketing ? 'm' : ''}|${VERSION}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent('bait-consent', { detail: c }));
  return c;
}

function applyConsent(c) {
  if (!c) return;
  window.gtag?.('consent', 'update', {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied',
  });
  if (c.analytics && GA_ID && !document.getElementById('ga-src')) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: c.marketing ? 'granted' : 'denied', ad_user_data: c.marketing ? 'granted' : 'denied', ad_personalization: c.marketing ? 'granted' : 'denied' });
    window.gtag('js', new Date());
    const isContainer = GA_ID.startsWith('GTM-');
    if (!isContainer) window.gtag('config', GA_ID, { anonymize_ip: true });
    const s = document.createElement('script');
    s.id = 'ga-src'; s.async = true;
    s.src = isContainer ? `https://www.googletagmanager.com/gtm.js?id=${GA_ID}` : `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  }
}

// Footer link: reopens the preferences panel.
export function CookieSettingsLink({ className, children = 'Cookie settings' }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>{children}</button>;
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const c = readConsent();
    if (c) { setPrefs({ analytics: c.analytics, marketing: c.marketing }); applyConsent(c); }
    else { const t = setTimeout(() => setOpen(true), 900); return () => clearTimeout(t); }
  }, []);

  useEffect(() => {
    const reopen = () => { const c = readConsent(); if (c) setPrefs({ analytics: c.analytics, marketing: c.marketing }); setCustom(true); setOpen(true); };
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  const decide = (analytics, marketing) => {
    const c = saveConsent(analytics, marketing);
    setPrefs({ analytics, marketing });
    applyConsent(c);
    setOpen(false); setCustom(false);
    // turning tracking off after it was on needs a reload to fully stop already-loaded scripts
    if (!analytics && document.getElementById('ga-src')) window.location.reload();
  };

  if (!open) return null;

  const Toggle = ({ k, label, text }) => (
    <label className="sf-ck-row">
      <span><strong>{label}</strong><small>{text}</small></span>
      <input type="checkbox" role="switch" checked={prefs[k]} onChange={(e) => setPrefs((p) => ({ ...p, [k]: e.target.checked }))} />
      <i aria-hidden="true" />
    </label>
  );

  return (
    <div className="sf-ck" role="dialog" aria-modal="false" aria-labelledby="sf-ck-title">
      <div className="sf-ck-head">
        <span className="sf-ck-icon"><Cookie size={20} aria-hidden="true" /></span>
        <h2 id="sf-ck-title">We value your privacy</h2>
        {custom && <button type="button" className="sf-ck-x" aria-label="Close" onClick={() => { if (readConsent()) { setOpen(false); setCustom(false); } else setCustom(false); }}><X size={18} /></button>}
      </div>
      <p className="sf-ck-text">We use essential cookies to run this site. With your permission we’d also use analytics and marketing cookies to understand visits and improve our ads. You can change this any time. <Link href="/privacy#cookies">Cookie policy</Link></p>

      {custom && (
        <div className="sf-ck-prefs">
          <label className="sf-ck-row is-locked">
            <span><strong>Essential</strong><small>Security, page loading and remembering this choice. Always on.</small></span>
            <input type="checkbox" checked disabled readOnly />
            <i aria-hidden="true" />
          </label>
          <Toggle k="analytics" label="Analytics" text="Anonymous visit statistics (Google Analytics) so we know which pages help." />
          <Toggle k="marketing" label="Marketing" text="Measure Facebook and Google ad campaigns and show relevant ads." />
        </div>
      )}

      <div className="sf-ck-actions">
        <button type="button" className="sf-ck-ghost" onClick={() => decide(false, false)}>Reject all</button>
        {custom
          ? <button type="button" className="sf-ck-ghost" onClick={() => decide(prefs.analytics, prefs.marketing)}>Save choices</button>
          : <button type="button" className="sf-ck-ghost" onClick={() => setCustom(true)}>Customise</button>}
        <button type="button" className="sf-ck-accept" onClick={() => decide(true, true)}>Accept all</button>
      </div>
    </div>
  );
}
