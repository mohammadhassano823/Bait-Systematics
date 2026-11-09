'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Star, PenLine } from 'lucide-react';
import { REVIEW_URL } from '@/lib/site';
import { GOOGLE_REVIEWS, GOOGLE_PROFILE_URL, GOOGLE_RATING } from '@/lib/reviews';

// Real Google reviews (from /api/reviews) plus a "write a review" link to the Google Business Profile.
// Until the Google keys are configured it shows only the invitation to review — never placeholder or invented reviews.
function Stars({ value, size = 16 }) {
  return (
    <span className="sf-gr-stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={size} fill={i <= Math.round(value) ? 'currentColor' : 'none'} aria-hidden="true" />)}
    </span>
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let alive = true;
    fetch('/api/reviews').then((r) => r.json()).then((d) => { if (alive) setData(d); }).catch(() => {});
    return () => { alive = false; };
  }, []);

  // Live reviews from the Places API when configured; otherwise the copied Google reviews in lib/reviews.js.
  const hasLive = data && data.configured && !data.error && (data.reviews || []).length > 0;
  const live = hasLive ? data : {
    reviews: GOOGLE_REVIEWS, count: GOOGLE_RATING?.count || GOOGLE_REVIEWS.length, mapsUrl: GOOGLE_PROFILE_URL,
    rating: GOOGLE_RATING?.rating || null,
  };
  // Hidden until there are reviews to show (live API or copied reviews).
  if (!hasLive && GOOGLE_REVIEWS.length === 0) return null;
  const { rating, count = 0, reviews = [], mapsUrl } = live;
  const writeUrl = REVIEW_URL || live.writeUrl;

  return (
    <section id="reviews" className="sf-gr sf-tone-dark" aria-labelledby="sf-gr-title">
      <div className="sf-gr-wrap">
        <header className="sf-gr-head">
          <div>
            <span className="sf-featured-services-eyebrow">CLIENT REVIEWS</span>
            <h2 id="sf-gr-title">What clients say <em>after we deliver.</em></h2>
          </div>
          <div className="sf-gr-summary">
            {rating ? (
              <>
                <strong>{rating.toFixed(1)}</strong>
                <div><Stars value={rating} size={18} /><span>{count} review{count === 1 ? '' : 's'} on Google</span></div>
              </>
            ) : <span className="sf-gr-empty">Be the first to review us on Google.</span>}
          </div>
        </header>

        {reviews.length > 0 && (
          <div className="sf-gr-grid">
            {reviews.map((r, i) => (
              <motion.article key={r.author + i} className="sf-gr-card"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : i * 0.08 }}>
                <a className="sf-gr-cardlink" href={r.authorUrl || mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Read ${r.author}'s review on Google`} />
                <Stars value={r.rating} />
                <p>“{r.text}”</p>
                <footer>
                  {r.photo ? <img src={r.photo} alt="" width="40" height="40" referrerPolicy="no-referrer" /> : <span className="sf-gr-avatar">{r.author.charAt(0)}</span>}
                  <div>
                    {r.authorUrl ? <a href={r.authorUrl} target="_blank" rel="noopener noreferrer">{r.author}</a> : <strong>{r.author}</strong>}
                    <span>{r.when} · Google</span>
                  </div>
                </footer>
              </motion.article>
            ))}
          </div>
        )}

        <div className="sf-gr-actions">
          <a className="sf-gr-primary" href={writeUrl} target="_blank" rel="noopener noreferrer"><PenLine size={18} aria-hidden="true" />Write a review on Google</a>
          {mapsUrl && <a className="sf-gr-ghost" href={mapsUrl} target="_blank" rel="noopener noreferrer">See all reviews<ArrowUpRight size={18} aria-hidden="true" /></a>}
        </div>
        {reviews.length > 0 && <span className="sf-gr-source">{hasLive ? 'Reviews are shown live from Google.' : 'Reviews from our Google Business Profile.'}</span>}
      </div>
    </section>
  );
}
