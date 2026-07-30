# Landing page: family-tree layout for NRI Trust

Restructure the home page (`/`) into a three-part "family tree" frame showing the Trust at the top and its two units branching below.

## Layout

```text
+-------------------------------------------------------+
|            NRI TRUST (logo + name + details)          |
|            [ scrolling photo film / carousel ]        |
+---------------------------+---------------------------+
        |  connector lines drawn down + across  |
+---------------------------+---------------------------+
| ASHWAMEDHA SCHOOL OF ARTS |        PRESCHOOL          |
| logo placeholder          | logo placeholder          |
| description               | description               |
| [ photo film carousel ]   | [ photo film carousel ]   |
+---------------------------+---------------------------+
|        < Donate >   < Enroll >   < Volunteer >        |
+-------------------------------------------------------+
```

## What changes

1. **Top part** — existing crest logo, full trust name, tagline, Sanskrit motto, plus a compact details line (established / registration / contact from `src/content/trust.ts`). Below it, a horizontally scrolling photo film.
2. **Branch connectors** — thin gold lines (CSS borders, no images) running from the trust block down and out to each child block, so it reads as a family tree on desktop. On mobile the three parts stack vertically with a single vertical connector.
3. **Bottom left** — Ashwamedha School of Arts: circular gold-ringed logo placeholder (crest monogram "A" until the real logo arrives), short description, own photo film carousel, and a link through to `/units/ashwamedha`.
4. **Bottom right** — Preschool: same structure, links to `/units/preschool`.
5. **Action bar** — Donate / Enroll / Volunteer moved out of the hero and placed in a single centered row at the very bottom of the frame, on the navy band spanning full width, so it sits below all three parts without disturbing the tree.
6. Sections further down the page (three pillars, preschool feature, programs, donate CTA) stay as they are; the pillars block is trimmed to avoid repeating the tree content.

## Photo film carousel

- Uses the existing `src/components/ui/carousel.tsx` (embla) already in the project.
- New reusable `PhotoFilm` component in `src/components/site/PhotoFilm.tsx`: responsive slide widths (1 up on mobile, 2–3 on desktop), auto-advancing loop with pause on hover/focus, keyboard and swipe support, and a film-strip frame (gold border + perforation strip) for the "photo film" feel.
- Slides accept an image list; where no assets exist yet, they render labelled placeholder tiles (navy/cream gradient + caption "Photo coming soon"). Existing `hero-arts.jpg` and `preschool.jpg` are reused as sample frames so it never looks empty.
- Placeholder image lists live in `src/content/trust.ts` so swapping in real photos later is a one-file edit.

## Technical notes

- Only `src/routes/index.tsx` is restructured; new `PhotoFilm` component added; small additions to `src/content/trust.ts` for the film/placeholder data and unit descriptions.
- No new dependencies; carousel autoplay handled with a small effect using the embla API rather than adding `embla-carousel-autoplay` unless it is already installed.
- All colours use existing tokens (navy, gold, maroon, cream) — no hardcoded colour classes.
- Head metadata on `/` stays unchanged.
