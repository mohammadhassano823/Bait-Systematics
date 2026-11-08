import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// Shared hero for inner pages: dark photo, oversized left-aligned headline whose <em> word is solid brand red,
// optional numbered chips under the copy, optional bullet facts or custom content (e.g. a form) on the right,
// and a full-bleed background image.
function Action({ href, className, children }) {
  return href.startsWith('#') || href.startsWith('http')
    ? <a className={className} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
    : <Link className={className} href={href}>{children}</Link>;
}

export default function PageHero({ id, eyebrow, title, lede, primary, secondary, image, legal, bullets = [], chips = [], aside = null, children = null }) {
  const hasSide = aside || bullets.length > 0;
  return (
    <section className={'sf-pghero' + (hasSide ? ' has-side' : '') + (image ? '' : ' no-img')} style={image ? { '--pghero-img': `url('${image}')` } : undefined} aria-labelledby={id}>
      {legal && <span className="sf-pghero-word" aria-hidden="true">{legal}</span>}
      <div className="sf-pghero-inner">
        <div className="sf-pghero-main">
          <span className="sf-pghero-eyebrow">{eyebrow}</span>
          <h1 id={id}>{title}</h1>
          <p className="sf-pghero-lede">{lede}</p>
          {(primary || secondary) && (
            <div className="sf-pghero-actions">
              {primary && <Action href={primary.href} className="sf-pghero-primary">{primary.label}<ArrowUpRight size={18} aria-hidden="true" /></Action>}
              {secondary && <Action href={secondary.href} className="sf-pghero-ghost">{secondary.label}</Action>}
            </div>
          )}
          {chips.length > 0 && (
            <ul className="sf-pghero-chips">
              {chips.map((c, i) => <li key={c}><span>{String(i + 1).padStart(2, '0')}</span>{c}</li>)}
            </ul>
          )}
          {children}
        </div>
        {hasSide && (
          <div className="sf-pghero-side">
            {aside || (
              <ul className="sf-pghero-bullets">
                {bullets.map((b) => <li key={b}><i aria-hidden="true" />{b}</li>)}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
