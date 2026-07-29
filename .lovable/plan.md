## Goal

A detailed user guide covering every navigation path on the NRI Trust site, written for the three audiences that exist today:

- **Visitors / users** — parents, students, donors browsing the public site
- **Customers** — prospective parents and students enquiring, enrolling or donating
- **Admins** — the trust team who maintain content (there is no login system today; admin work is content editing in the project)

Delivered in two places: a Markdown file in the repo and a page on the site.

## Deliverable 1 — `USER_GUIDE.md` (repo root)

Detailed, step-by-step. Sections:

1. **Overview** — what the site is, the 9 pages, the navy/maroon/gold identity.
2. **Site map & navigation** — full route table:

```text
/                      Home        hero, three pillars, CTAs
/about                 About Us    history, vision, motto, trustees
/units/ashwamedha      Arts        mission, courses, faculty, method, social links
/units/preschool       Preschool   approach, age groups, daily rhythm
/programs              Programs    event calendar, recurring celebrations
/gallery               Gallery     photo + video grid
/news                  News        announcements
/get-involved          Donate      bank / UPI / 80G, volunteering, admissions
/contact               Contact     office details + enquiry form
```

3. **Header, footer and mobile menu** — desktop nav, the gold Donate button, the hamburger menu below XL, footer Explore/Reach Us columns, social icons, 404 behaviour.
4. **Visitor journeys** — click-by-click walkthroughs: "find a course", "check event dates", "view the gallery", "read news", "open the Ashwamedha Instagram/Facebook links" (noting these open in a new tab and are blocked inside the Lovable preview frame, working normally on the published site).
5. **Customer journeys** — enquire via the contact form (field by field, what happens on submit), preschool admissions path, arts admissions path, donating via bank transfer / UPI / 80G receipt request.
6. **Admin guide** — the important part, task by task:
   - Update trust details (name, address, phone, email, registration, social links) in `src/content/trust.ts`.
   - Add/edit trustees, faculty, courses, programs, news — each array's shape with a copy-paste example.
   - Replace images (logo, hero, preschool) and where they're referenced.
   - Add a new page: create the route file, add it to the header `nav` array and the footer Explore list, set its `head()` metadata.
   - Update SEO titles/descriptions per page.
   - Pre-demo checklist of every remaining placeholder to replace.
7. **Not available today** — plainly states there is no login, admin dashboard, customer account, or database; the contact form is UI-only and does not yet send anywhere. Notes what enabling a backend would add.

## Deliverable 2 — `/user-guide` page

New route `src/routes/user-guide.tsx`, built with the existing `PageHero`, `Section` and `Card` primitives so it matches the site's identity. Contains the visitor-facing portions: site map with working `<Link>`s to every page, what each page contains, how to navigate on mobile, how to enquire, enrol and donate, and an FAQ-style closing section. Admin/content-editing detail stays in the Markdown file (linked from the page as "for the trust team").

Linked from the footer under a small "Help" item; not added to the main header nav to keep it uncluttered. Gets its own `head()` title, description, og:title, og:description.

## Technical notes

- No backend, no new dependencies — static content only.
- Route follows file-based routing: `src/routes/user-guide.tsx` with `createFileRoute("/user-guide")`; `routeTree.gen.ts` regenerates automatically.
- Footer change is one list item in `SiteFooter.tsx`.
