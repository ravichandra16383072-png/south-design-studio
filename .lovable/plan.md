# Photographic Telugu wedding opening

Only the opening curtain and the first screen change. The RSVP, events, gallery, venue, family section, countdown, music, sharing, footer and the content file's structure all stay as they are.

The mockup and brief guide composition and mood only. Neither is placed in the site, and no phone frames, labels or arrows are copied.

## Look
Real photography instead of drawn shapes, with a Telugu ceremonial setting (no Kerala-specific architecture, no Malayalam lettering on the opening):
- **Curtain:** two separately generated photos, never mirrored. Both are deep maroon Kanjeevaram silk with an antique-gold zari border on the inner edge, but the folds, wrinkles, highlights and shadows differ naturally. Jasmine hangs at the top corners. The centre stays dark and clean.
- **Revealed scene:** one portrait photo of a Telugu wedding mandapam or temple entrance at golden hour. It shows carved pillars softly out of focus, a mango-leaf toranam with jasmine and marigold at the top, a polished brass oil lamp at bottom-left, and scattered petals with a small flower arrangement on the floor. The middle stays calm and darker so the title reads clearly. It has no text or watermarks.
- The drawn garland, jasmine strings, gopuram outline and drawn lamp are removed from the first screen. They remain available for other sections.

## Closed state
- Understated type: HRIDAYAM (Cormorant Garamond, widely spaced), హృదయం in muted gold (Noto Sans Telugu), Rahul & Anjali, 21 · 10 · 2026, and a faint pulsing "Tap to open". Small gold hairline dividers, no round badge, no extra buttons.
- The title, subtitle, names and date still come from the content file.

## Opening sequence (about 2.5s after the tap)
1. The panels move outward from the centre and compress toward the sides, with slight skew and scale and a moving sheen, so they read as heavy silk being drawn aside.
2. A thin strip of curtain stays at each edge after opening for continuity, so nothing jumps.
3. The ceremonial background brightens from dim to warm with a slow push-in, and the photographed lamp comes into view.
4. A small, cheap glow pulses over the lamp's real flame.
5. About 12 petals drift down, using the existing petal effect at a lower count.
6. The title glides into its hero position without popping.
7. Music starts on the tap, exactly as it does now.

## Hero after opening
The photo stays as the hero background and fades through a warm gradient into the ivory page below. It shows the title, Telugu line, names and date in the clear middle, the lamp at bottom-left, and "Scroll to discover" near the bottom.

## Mobile, performance and motion
- Checked at 360, 375, 390, 414 and 430px with no sideways scroll and no cropped title or lamp. The photo positions are tuned per photo. Desktop keeps the centered phone-width layout.
- Three compressed JPGs of about 150–250KB each. The curtain and hero photos load first. Gallery photos stay lazy, so they don't load during the opening. Fixed sizes prevent layout shift.
- Animations use transform and opacity only. With reduced motion turned on, the opening is a simple fade with no flicker and no petals. The tap target works by keyboard (Enter or Space) as well as touch.

## Content change (values only)
- `regionalSubtitle` becomes "హృదయం" and `regionalLang` becomes "te". The Noto Sans Telugu font is added.
- The Family section's regional blessing line is currently Malayalam. It is left untouched because that section is out of scope, and I'll flag it so you can supply a Telugu line.

## Technical details
- Assets in src/assets: `curtain-left.jpg` and `curtain-right.jpg` (generated independently with matching material, borders aligned at the centre seam), and `temple-hero.jpg` (about 860x1600). Each is checked visually and recompressed with an image tool if it is too large.
- `Chrome.tsx`: rewrite `Curtain`. Panels are `motion.div`s with photo backgrounds and an outer-edge transform origin, animating `x` (to roughly ±88%, leaving the edge strip), slight `scaleX` and `skewY`, plus a sheen overlay. It is a focusable button with an aria-label.
- `Sections.tsx`: rewrite `Hero` only, with the photo background, scrim, flame-glow overlay and existing typography.
- `index.tsx`: curtain lifecycle about 2.5s, then the curtain fades out over the already-visible hero so the edge strips dissolve smoothly. Opening petal count reduced to about 12.
- `__root.tsx`: add Noto Sans Telugu to the font link.
