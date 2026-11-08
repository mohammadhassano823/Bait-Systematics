'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// w/h are the processed PNG sizes in /public/logos; `dark` puts light-coloured logos on a dark tile
const LOGOS = [
  { f: 'aliff', n: 'ALIFF', w: 240, h: 240, square: true },
  { f: 'supermerch', n: 'Supermerch', w: 300, h: 120 },
  { f: 'devsrank', n: 'DevsRank', w: 300, h: 100 },
  { f: 'absmd', n: 'AbsMD', w: 531, h: 200 },
  { f: 'dk-garage-logo', n: 'DK Garage', w: 813, h: 206, wide: true },
  { f: 'view-before-you-move', n: 'View Before You Move', w: 2938, h: 200, wide: true },
  { f: 'mauritius-travel-tour', n: 'Mauritius Travel & Tour', w: 407, h: 360, square: true },
  { f: 'constructivo', n: 'Constructivo Enterprises', w: 885, h: 200 },
  { f: 'careerz', n: 'CareerZ', w: 753, h: 320 },
  { f: 'bim-logo', n: 'BiM', w: 382, h: 146 },
  { f: 'digital-universe', n: 'Digital Universe', w: 641, h: 200, dark: true },
  { f: 'hoda-shine-logo', n: 'Hoda Shine Services', w: 365, h: 260, square: true },
  { f: 'mauritius-health-travel', n: 'Mauritius Health Travel', w: 490, h: 200 },
  { f: 'al-karam-logo', n: 'Al Karam Real Estate', w: 502, h: 260, square: true },
  { f: 'chemfix-logo', n: 'CHEMfix Construction Chemicals', w: 454, h: 360, square: true },
  { f: 'hawar-logo', n: 'Hawar', w: 533, h: 360, square: true },
  { f: 'cruise-logo', n: 'C2M Imports', w: 176, h: 200, square: true },
];

function Tile({ l }) {
  return (
    <span className={'sf-logo-tile' + (l.dark ? ' dark' : '') + (l.wide ? ' wide' : '') + (l.square ? ' square' : '')}>
      <Image src={`/logos/${l.f}.png`} alt={l.n} width={l.w} height={l.h} sizes="240px" loading="eager" />
    </span>
  );
}

function Row({ items, reverse, duration }) {
  // the list is rendered twice so the -50% translate loops seamlessly
  const loop = items.concat(items);
  return (
    <div className="sf-logo-row">
      <div className={'sf-logo-track' + (reverse ? ' rev' : '')} style={{ animationDuration: duration }}>
        {loop.map((l, i) => (
          <span key={l.f + i} aria-hidden={i >= items.length ? 'true' : undefined}>
            <Tile l={l} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TrustedLogos() {
  return (
    <section className="sf-trusted" aria-labelledby="sf-trusted-title">
      <motion.div
        className="sf-trusted-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="sf-clients-eyebrow">OUR CLIENTS</div>
        <h2 id="sf-trusted-title">Companies That Trust Us</h2>
      </motion.div>
      <div className="sf-logo-rows">
        <Row items={LOGOS} duration="60s" />
      </div>
    </section>
  );
}
