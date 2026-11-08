'use client';

import { CreditCard, Cloud, Server } from 'lucide-react';
import {
  siReact, siNextdotjs, siTypescript, siTailwindcss, siFlutter, siAndroid,
  siNodedotjs, siGraphql, siMongodb, siPostgresql, siRedis, siDocker,
  siVercel, siGooglecloud, siFirebase, siZoho, siWhatsapp, siFigma, siGithubactions,
  siWordpress, siWoocommerce, siMeta, siGoogleads, siGoogleanalytics,
  siRender, siDigitalocean, siHostinger, siCloudflare, siNetlify, siRailway, siNginx, siUbuntu, siCpanel, siMysql,
} from 'simple-icons';


// Official brand marks (simple-icons). Shown in the site's dark ink; brand colour on hover.
// generic tile: we integrate any gateway (Stripe, PayPal, JazzCash, Easypaisa, local banks…)
const PAYMENTS = { slug: 'payments', title: 'Payment Gateways', hex: '1F8A5B', Icon: CreditCard };
const AWS = { slug: 'aws', title: 'AWS', hex: '1F8A5B', Icon: Cloud };
const VPS = { slug: 'vps', title: 'VPS Servers', hex: '1F8A5B', Icon: Server };

const TOOLS = [
  siReact, siNextdotjs, siTypescript, siTailwindcss, siFlutter, siAndroid,
  siNodedotjs, siGraphql, siMongodb, siPostgresql, siDocker, siVercel,
  siGooglecloud, siFirebase, siWordpress, siWoocommerce, siZoho, PAYMENTS,
  siWhatsapp, siMeta, siGoogleads, siGoogleanalytics, siFigma, siGithubactions,
  AWS, VPS, siRender, siDigitalocean, siHostinger, siCloudflare,
  siNetlify, siRailway, siNginx, siUbuntu, siCpanel, siMysql,
];

export default function TechLogos() {
  return (
    <div className="sf-tl">
      <div className="sf-tl-head">
        <div className="sf-tl-eyebrow">Our technology stack</div>
        <h2 className="sf-tl-title">The stack behind <span>every build.</span></h2>
        <p className="sf-tl-lede">We build on proven, industry-standard technology — so your product is fast today, secure tomorrow and easy for any developer to pick up and grow.</p>
      </div>
      <div className="sf-tl-carousel" aria-label="Technologies we work with">
        {[TOOLS.slice(0, 12), TOOLS.slice(12, 24), TOOLS.slice(24)].map((row, rowIndex) => (
          <div className="sf-tl-row" key={rowIndex}>
            <div className={'sf-tl-track' + (rowIndex === 1 ? ' sf-tl-track-reverse' : '')}>
              {[0, 1].map(copy => (
                <div className="sf-tl-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {row.map(t => (
                    <div key={t.slug} className="sf-tl-item" style={{ '--brand': '#' + t.hex }}>
                      {t.Icon ? <t.Icon className="sf-tl-lucide" aria-hidden="true" strokeWidth={1.8} /> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d={t.path} /></svg>}
                      <span>{t.title}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
