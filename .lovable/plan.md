# Photographic Kerala opening for Hridayam

Only the opening curtain and the first (Hridayam) screen change. Every other section, the RSVP, music, share and config stay as they are.

The attached mockup guides composition and mood only. It is not placed in the site, and its phone frames, labels and arrows are not copied. Composition to follow: the closed curtain has asymmetric folds, jasmine hangs in the top corners, and the type sits in the clean centre with small gold ornament dividers. Mid-open, a warm sunlit gap shows the gopuram, with the lamp just inside the left curtain. In the revealed hero, mango leaves and jasmine frame the top, the gopuram sits behind the title, the lamp stands bottom-left, and a jasmine bowl and petals lie on the stone floor.

## Look
Real photography instead of drawn shapes:
- **Curtain:** two photographed maroon Kanjeevaram silk panels (left and right), with folds, sheen, wrinkles and a woven gold zari border on the inner edge. Real jasmine strings hang along the top edge.
- **Revealed scene:** one portrait photo of a Kerala temple entrance at golden hour. The gopuram is softly blurred behind, a mango-leaf thoranam and jasmine strings hang at the top, a polished brass kuthuvilakku stands in the foreground, and jasmine petals lie on the stone floor. The middle of the photo is calm and darker so the title can be read.
- The drawn garland, jasmine strings, gopuram outline and drawn lamp are removed from the first screen.

## Closed state
- Full-screen silk curtain with a soft dark vignette in the centre.
- Understated type: HRIDAYAM (Cormorant Garamond, widely spaced), ഹൃദയം in muted gold (Noto Sans Malayalam), Rahul & Anjali, 21 · 10 · 2026, and a faint pulsing "Tap to open".
- No round badge or other UI on top.

## Opening sequence (about 2.5s)
1. The panels part from the centre. Each panel moves sideways while it narrows a little, skews slightly toward the outer edge and gets a moving sheen, so it reads as gathered fabric rather than a sliding rectangle.
2. The temple scene behind brightens from dim to warm, with a slow push-in.
3. A soft glow at the lamp's flame flickers subtly (opacity and scale only) over the photographed flame.
4. About 12 jasmine petals drift down, reusing the existing petal effect at a lower count.
5. The title text fades and settles into the hero position, so the text never pops in.
6. Music starts on the tap, as it does now.

## Hero after opening
The temple photo stays as the hero background, with a warm gradient fading into the ivory paper below. The title, Malayalam line, names, date and "Scroll to discover" sit in the clear middle area, and the lamp stays visible near the bottom.

## Mobile, performance and motion
- Tested at 360, 375, 390, 414 and 430px wide. Each photo is positioned so the title and lamp are never cropped. Desktop keeps the centered phone-width layout.
- Three photos, compressed JPGs of about 150–250KB. The hero photo loads early and the curtain photos load first.
- Animations use transform and opacity only, with about 12 petals. With reduced motion turned on, the curtain simply fades away and nothing flickers.

## Technical details
- New AI photos in src/assets: `curtain-left.jpg` and `curtain-right.jpg`, generated separately (not mirrored) so their folds, wrinkles and highlights differ while the silk, maroon tone and zari border match. Plus `temple-hero.jpg` (about 860x1600, portrait).
- Rewrite `Curtain` in `src/components/invite/Chrome.tsx`. Panels are `motion.div`s with background images, animated with `x`, `scaleX` (origin at the outer edge), `skewY` and a sheen overlay. The title layer is shared.
- Rewrite `Hero` in `src/components/invite/Sections.tsx` to use the photo background plus a flame glow overlay. The drawn motifs stay in `Motifs.tsx` for use elsewhere.
- Shorten the timing in `src/routes/index.tsx` so the curtain unmounts once it opens (about 2.4s). Reduce the opening petal count.
- The config file is unchanged.
