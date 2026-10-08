# Hridayam — South Indian Wedding Invitation (single page)

One scrollytelling invite at `/`, opened from a WhatsApp link. Sample couple: Rahul & Anjali, "Hridayam" / "ഹൃദയം", 21 Oct 2026, Grand Plaza, Kochi.

## Look
- Palette: temple gold #C9A24D, maroon #7A1F2B, turmeric, jasmine ivory background, banana-leaf green accents. Ivory paper texture overlay.
- Fonts: Cormorant Garamond (headings), Outfit (body), Great Vibes (script accents), Noto Sans Malayalam (regional line).
- Motifs drawn as inline SVG: jasmine strings, marigold garland, mango-leaf thoranam, kolam dividers, brass kuthuvilakku with flickering flame, gopuram silhouette, Kanjeevaram silk-border edging.
- Phone-width column (max ~430px); desktop shows it centered over a blurred maroon backdrop.

## Sections
1. Opening curtain — maroon/gold silk curtain, "Tap to open"; parts, starts music, jasmine petals fall.
2. Hero — thoranam swings in, title, Malayalam subtitle, 21.10.2026, bouncing "Scroll to discover", flickering lamp.
3. Blessing — line-art Ganesha + short Sanskrit blessing.
4. Couple — tilted polaroid cover photo, "Better Together", doodle hearts, names.
5. Our Story — paragraph with parallax floral corners.
6. Countdown — live Days/Hours/Mins/Secs gold tiles.
7. Events timeline — Haldi, Mehendi, Sangeet, Muhurtham, Reception; kolam dots, alternating slide-in cards, Directions buttons.
8. Venue — embedded Google Map + "Open in Maps".
9. Family & Blessings — both parents' cards, heart divider.
10. Gallery — swipeable polaroid stack.
11. RSVP — name, phone, guests, attending, events, message; saved to the backend; thank-you with petal burst; "RSVP on WhatsApp" fallback.
12. Footer — closing line, names, date, kolam.

Floating: music toggle (spinning vinyl), Share pill (native share, WhatsApp, copy link).

## Technical details
- `src/invite.config.ts` holds all content (names, dates, events, venue, parents, story, photos, musicUrl, rsvpDeadline, contactPhone).
- Components under `src/components/invite/*`; `src/routes/index.tsx` composes them; head() builds OG tags from config.
- Framer Motion (`motion`), transform/opacity only, `useReducedMotion` respected; images `loading="lazy"`.
- Generated images: cover + ~5 gallery photos (South Indian couple, Kerala wedding). OG image uses an absolute URL only if available; otherwise omitted.
- Music: royalty-free placeholder MP3 URL in config (user to replace).
- Lovable Cloud: `rsvps` table (name, phone, guests, attending, events text[], message, created_at); public anon INSERT only, no public SELECT. Insert via a server function with zod validation.
- Test for RSVP validation rules (guests ≥1, required name/phone).
