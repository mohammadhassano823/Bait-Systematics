// Live Google reviews for the business profile, via the Places API (New).
// Needs GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in the environment; without them it reports
// `configured: false` and the reviews section stays hidden. Google returns at most 5 reviews.
export const revalidate = 21600; // refresh from Google every 6 hours

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return Response.json({ configured: false });

  const writeUrl = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate },
    });
    if (!res.ok) return Response.json({ configured: true, error: `Google responded ${res.status}`, writeUrl });
    const place = await res.json();
    const reviews = (place.reviews || [])
      .filter((r) => r.text?.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName || 'Google user',
        authorUrl: r.authorAttribution?.uri || null,
        photo: r.authorAttribution?.photoUri || null,
        rating: r.rating || 0,
        text: r.text.text,
        when: r.relativePublishTimeDescription || '',
      }));
    return Response.json({
      configured: true,
      name: place.displayName?.text || 'Bait Systematics',
      rating: place.rating || null,
      count: place.userRatingCount || 0,
      mapsUrl: place.googleMapsUri || null,
      writeUrl,
      reviews,
    });
  } catch {
    return Response.json({ configured: true, error: 'Could not reach Google', writeUrl });
  }
}
