# Admin Panel for NRI Trust — Content & Media Management

Goal: the trust's admin can edit every section of the site and manage all photos/logos from a private admin area, with no developer involvement. Public pages read from the backend and fall back to today's placeholder text until an admin edits them.

This requires enabling Lovable Cloud (database, login, file storage).

## 1. Access & roles

- Login page at `/auth` (email + password). No public sign-up link.
- Roles stored in a separate roles table: `admin`, `editor`, `viewer`.
  - `admin`: everything, including managing other users' roles.
  - `editor`: content and media, no user management.
- First account is promoted to `admin` on setup; after that admins invite/assign roles from the panel.
- All admin routes live under a protected area — signed-out visitors are redirected to login. Public site stays fully public.

## 2. Admin panel structure (`/admin`)

Sidebar layout with these screens:

- **Dashboard** — quick links, recent edits.
- **Home page** — trust logo upload, trust name/tagline/motto, Three Pillars, home photo film.
- **Media Library** — upload/remove images, alt text and captions, assign to a gallery or a section film.
- **Gallery** — manage the public gallery grid (add, reorder, remove, caption).
- **About** — About Us, History & Vision, Our Values, Trustees & Leadership (add/edit/remove trustees with photo, role, bio).
- **Units → Ashwamedha** — Overview, Programme, Curriculum (course list), Our Teachers (faculty list), How We Teach, Follow Us (social links), Join Us, plus its photo film.
- **Units → Preschool** — Overview, Programme (age groups), A Day With Us (steps), Enrolment, plus its photo film.
- **Programs & Events** — What's Coming Up (event list with date/venue/summary) and Our Recurring Calendar.
- **News & Announcements** — post list with title, date, excerpt, body, optional image.
- **Get Involved** — Ways to Contribute (bank/UPI/80G details, volunteering, enrolment blurbs).
- **Contact** — Reach Us (address, phone, email), map location (address or embed link, shown with landmarks), and the destination email address for enquiry-form submissions.
- **Site settings** — social media handles, footer Explore links (label, target, show/hide, order).
- **Users** (admin only) — invite, assign role, deactivate.

Every editor screen has Save + "View page" and shows placeholder hints where assets are missing.

## 3. Public site changes

- Each page loads its content from the database instead of the hard-coded `src/content/trust.ts`, keeping the current design untouched.
- Existing placeholder text is seeded into the database so nothing looks empty on day one.
- Images resolve to uploaded files when present, otherwise the current placeholder art.
- Contact form submissions are stored and emailed to the configured enquiry address.

## 4. Technical notes

- Lovable Cloud: Postgres tables for `site_sections` (keyed section content as structured JSON), `list_items` (trustees, faculty, courses, events, news, calendar, footer links — typed by collection with sort order), `media` (storage path, alt, caption), `section_media` (which images appear in which film/gallery, ordered), `settings` (socials, enquiry email, map), `contact_messages`, plus `user_roles` with a `has_role` security-definer function.
- RLS: public read on published content; write restricted to `admin`/`editor` via `has_role`. Grants issued for `anon` (read) and `authenticated` (write) per table.
- Image uploads go to a public storage bucket; deletes remove the storage object and the row.
- Content fetched in route loaders via TanStack Query so pages stay server-rendered and SEO-friendly.
- Enquiry email sent from a server function; needs an email provider key (Resend) added later — until then messages are stored and visible in the admin panel.

## 5. Build order

1. Enable Cloud, schema + roles + seed of current content.
2. Auth + protected `/admin` shell with sidebar and role gating.
3. Media library and storage uploads.
4. Section editors (home, about, units, programs, news, get involved, contact, settings).
5. Rewire public pages to the database.
6. Contact form storage + email.
