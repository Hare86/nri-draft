# Cleaner landing page: no arrows, no frames

Strip the decorative chrome from the home page so the family-tree hierarchy reads from layout alone.

## What changes

1. **Photo film** (`src/components/site/PhotoFilm.tsx`)
   - Remove the left/right chevron arrow buttons entirely.
   - Remove the outer border box, background panel and the film-perforation strips.
   - Slides keep auto-advancing on a loop, pause on hover/focus, and stay swipeable/draggable — so navigation still works without visible controls.
   - Each photo keeps its own soft rounded corner only; no gold outline.

2. **Family-tree connectors** (`src/routes/index.tsx`)
   - Remove the drawn gold connector lines between the Trust block and the two unit blocks.
   - Hierarchy is conveyed visually instead: the Trust block stays full-width, centered and larger (bigger crest, larger type), with the two unit blocks sitting side by side below it at equal, visibly smaller scale, and a shared centered gap that reads as a branch.

3. **Unit blocks**
   - Drop the `crest-frame` outline and boxed background on the Ashwamedha and Preschool blocks; keep them as open, borderless columns separated by whitespace.
   - Keep the circular monogram logo placeholders, headings, descriptions, photo films and the "Explore" links.

4. **Action bar**
   - Donate / Enroll / Volunteer stay centered at the bottom of the frame; the divider rule above them is kept subtle or removed to match the cleaner look.

## Technical notes

- Only `src/components/site/PhotoFilm.tsx` and `src/routes/index.tsx` change; content and other routes untouched.
- Embla carousel stays as-is for drag/loop behaviour; only the UI chrome is removed.
- Colours continue to use existing tokens (navy, gold, cream, maroon).
