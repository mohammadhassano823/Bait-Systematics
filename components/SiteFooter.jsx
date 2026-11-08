import Link from 'next/link';
import { CookieSettingsLink } from '@/components/CookieConsent';
import { SERVICES, FOOTER_SERVICES } from '@/lib/services';
import { SOCIAL } from '@/lib/site';

// One footer for every page.
const label = { fontFamily: "'Plus Jakarta Sans', monospace", fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#909090' };
const col = { display: 'flex', flexDirection: 'column', gap: '12px' };

export default function SiteFooter() {
  return (
    <footer className="sf-site-footer" style={{ position: 'relative', isolation: 'isolate', background: 'linear-gradient(to top, #000821, #050207)', color: '#FFFFFF', padding: '0 0 36px', overflow: 'hidden' }}>
      <div className="glow tl" aria-hidden="true" style={{ zIndex: -1, top: '30%' }} />
      <div className="glow br" aria-hidden="true" style={{ zIndex: -1 }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '48px' }}>
          <div style={{ maxWidth: '360px' }}>
            <img src="/images/bait-systematics-logo-full.png" alt="Bait Systematics — Build, Innovate, Grow" className="sf-footer-logo" width="1200" height="345" />
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '30px', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Build smarter. Work faster. <span style={{ color: '#EF0800' }}>Grow bigger.</span>
            </div>
            <p style={{ margin: '18px 0 0', fontSize: '14px', lineHeight: 1.6, color: '#A3A3A3' }}>Bait Systematics is the technology company of BAIT International Group — trusted by employers worldwide since 1967.</p>
            <Link className="sf-btn" href="/contact" style={{ marginTop: '26px', display: 'inline-flex', alignItems: 'center', gap: '8px', minHeight: '50px', padding: '0 22px', borderRadius: '999px', background: '#EF0800', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
              Book a call
              <svg className="sf-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </Link>
          </div>
          <div className="sf-foot-cols" style={{ display: 'flex', flexWrap: 'wrap', gap: '64px', fontSize: '15.5px' }}>
            <div style={col}>
              <span style={label}>Services</span>
              <div className="sf-foot-svc">
                {SERVICES.filter((s) => FOOTER_SERVICES.includes(s.id)).map((s) => <Link key={s.id} className="sf-fl" href={`/services#${s.id}`}>{s.t}</Link>)}
              </div>
            </div>
            <div style={col}>
              <span style={label}>Company</span>
              <Link className="sf-fl" href="/">Home</Link>
              <Link className="sf-fl" href="/about">About</Link>
              <Link className="sf-fl" href="/portfolio">Portfolio</Link>
              <Link className="sf-fl" href="/contact">Contact</Link>
            </div>
            <div style={{ ...col, maxWidth: '240px' }}>
              <span style={label}>Contact</span>
              <a className="sf-fl" href="https://wa.me/923110429799" target="_blank" rel="noopener noreferrer">+92 311 0429799 (WhatsApp)</a>
              <a className="sf-fl" href="tel:+447405449846">+44 7405 449846 (UK)</a>
              <a className="sf-fl" href="mailto:info@baitsystematics.com">info@baitsystematics.com</a>
              <span style={{ color: '#A3A3A3', lineHeight: 1.6 }}><b style={{ color: '#fff', fontWeight: 700 }}>Pakistan</b> — 14-Z Commercial Market, Madina Town, Faisalabad</span>
              <span style={{ color: '#A3A3A3', lineHeight: 1.6 }}><b style={{ color: '#fff', fontWeight: 700 }}>UK</b> — 20 Marcliffe Drive, Manchester, M19 3XD</span>
              <span style={{ color: '#A3A3A3' }}>Mon – Sat</span>
            </div>
            <div style={col}>
              <span style={label}>Legal</span>
              <Link className="sf-fl" href="/privacy">Privacy Policy</Link>
              <Link className="sf-fl" href="/terms">Terms of Service</Link>
              <CookieSettingsLink className="sf-fl sf-fl-btn" />
            </div>
            <div style={col}>
              <span style={label}>Social</span>
              {SOCIAL.map((s) => <a key={s.name} className="sf-fl" href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>)}
            </div>
          </div>
        </div>
        <div className="sf-foot-word" aria-hidden="true" style={{ marginTop: '80px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(54px, 13.4vw, 196px)', lineHeight: 0.8, letterSpacing: '-0.04em', whiteSpace: 'nowrap', fontVariationSettings: "'wdth' 118" }}>BAIT</div>
        <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', fontSize: '13.5px', color: '#909090' }}>
          <span>© 2026 Bait Systematics — a BAIT International Group company. All rights reserved.</span>
          <span style={{ display: 'flex', gap: '22px' }}><Link className="sf-fl" href="/privacy">Privacy</Link><Link className="sf-fl" href="/terms">Terms</Link></span>
        </div>
      </div>
    </footer>
  );
}
