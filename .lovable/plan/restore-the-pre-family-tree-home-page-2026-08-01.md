# Restore the pre-family-tree home page

Bring `/` back to its original layout, keeping admin-managed content.

## What the restored page looks like

1. **Hero** — full-width navy band with the dancer photo behind it: crest logo, trust name, gold rule, tagline, Sanskrit motto + English line, then the Donate / Enroll / Volunteer buttons directly inside the hero.
2. **Three pillars** — "Our Work" section with three cards (The Trust, Ashwamedha School of Arts, Preschool).
3. **Preschool feature** — image + "Enrolment open" copy and the Explore the preschool button.
4. **Upcoming programs** — up to four program cards plus the "View all programs" link.
5. **Donate CTA** — closing navy band.

## What is removed from the home page

- The split Trust / Ashwamedha / Preschool "family tree" arrangement and the `UnitBranch` blocks.
- All three photo film carousels and the trust details line (Established / Registration / Contact).
- The bottom global action row (the buttons move back up into the hero).

## Content stays admin-managed

Every restored block keeps reading through `useContent`, so the admin panel continues to drive the hero identity, pillars, preschool feature, and programs. The pillar card bodies and the hero remain editable exactly as they are today — no content keys are added or removed.

## Technical notes

- Only `src/routes/index.tsx` changes. `PhotoFilm.tsx` stays in place (still used elsewhere / available for reuse); no other route, component, schema, or backend change.
- Head metadata on `/` is unchanged.
- Fallback images (`hero-arts.jpg`, `preschool.jpg`) are used when the admin hasn't uploaded one, same as now.
