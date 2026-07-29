# NRI Educational Trust — User Guide

A complete guide to the Nagalakshmi Ramamurthy Iyer Educational Trust website: every
page, every navigation path, every action a visitor can take, and every task the trust
team needs in order to keep the content up to date.

Audiences covered:

| Audience | Who they are | Where to look |
| --- | --- | --- |
| **Users / visitors** | Parents, students, well-wishers browsing the site | Sections 1–4 |
| **Customers** | Prospective parents/students enquiring, enrolling or donating | Section 5 |
| **Admins** | The trust team maintaining content and images | Section 6 |

> **Important:** the site is currently a fully static website. There is **no login, no
> admin dashboard and no customer account**. See Section 7 for exactly what does and
> does not exist today.

---

## 1. Overview

The site presents the Trust and its two units — the **Ashwamedha School of Arts** and the
**Preschool** — across nine pages. The visual identity is taken from the Trust crest:

- **Navy** — headers, footers, heroes
- **Gold** — rules, accents, the Donate button, crest frames
- **Maroon** — eyebrows and section labels
- **Cream** — alternating section backgrounds
- Typefaces: *Cormorant Garamond* for display headings, *Karla* for body text
- Motto: विद्या ददाति विनयम् — "Knowledge Bestows Humility"

---

## 2. Site map & navigation

```text
/                      Home         hero + crest, three pillars, motto band, CTAs
/about                 About Us     history, vision & mission, motto, trustees
/units/ashwamedha      Arts school  mission, courses, faculty, method, Follow us links
/units/preschool       Preschool    approach, age groups, daily rhythm, admissions CTA
/programs              Programs     upcoming events calendar, recurring celebrations
/gallery               Gallery      photo grid + video placeholders
/news                  News         announcements and updates
/get-involved          Donate       bank / UPI / 80G, volunteering, admissions links
/contact               Contact Us   office details, map placeholder, enquiry form
/user-guide            Help         this guide, visitor edition, linked in the footer
```

Any other URL renders the **404 page**, which shows "Page not found" and a **Go home**
button back to `/`.

---

## 3. Header, footer and mobile menu

### Header (sticky, on every page)

- **Crest + "NRI Educational Trust"** on the left — clicking it always returns to Home.
- On screens **1280 px and wider**: the full navigation row —
  Home · About Us · Ashwamedha · Preschool · Programs · Gallery · News · Contact —
  followed by the gold **Donate** button (goes to `/get-involved`).
- The link for the page you are on is shown in **gold and bold**.
- On screens **narrower than 1280 px**: the nav collapses into a gold **hamburger
  button** on the right. Tap it to open a stacked menu of the same links plus a full
  width **Donate / Get Involved** button. Tapping any link closes the menu.
- The header stays pinned to the top while you scroll.

### Footer (on every page)

Four areas:

1. **Crest, trust name, established year, motto line, and Instagram / Facebook icons.**
2. **Explore** — quick links to About, Ashwamedha, Preschool, Programs, Gallery, News,
   Get Involved.
3. **Reach Us** — address, phone and email (pulled from a single content file).
4. **Help** — a link to the on-site user guide.
5. **Bottom bar** — copyright year and the trust registration number.

---

## 4. Visitor journeys (step by step)

### 4.1 Find an arts course

1. Header → **Ashwamedha** (or footer → *Ashwamedha School of Arts*).
2. Scroll to **Courses offered**. Each card shows the discipline, the level range
   (e.g. "Beginner → Arangetram") and a short summary.
3. Continue to **Our gurus** for faculty, and **How we teach** for the method.
4. To enquire, use the CTA at the bottom of the page, or go to **Contact Us** and pick
   *Arts admissions* in the Subject dropdown.

### 4.2 Check event dates

1. Header → **Programs**.
2. **Upcoming programs** lists each event with its date, venue and description.
3. **Through the year** below it covers recurring celebrations.
4. Dates and venues currently read "to be announced" until the trust confirms them.

### 4.3 Browse the gallery

1. Header → **Gallery**.
2. **Recent moments** is a responsive photo grid — one column on phones, two on
   tablets, three on desktop. Each photo has a caption underneath.
3. **Performance recordings** below holds the video slots; recordings are added later.

### 4.4 Read news

1. Header → **News**.
2. Each card shows a date label and a short excerpt. New items appear at the top.

### 4.5 Open the Ashwamedha social links

1. Go to **Ashwamedha** and scroll to the **Follow us** section.
2. Four cards: the Instagram profile (`ashwamedha_school_of_arts123`) and three Facebook
   video links.
3. Each link **opens in a new browser tab**.
4. *Note for demos:* Instagram and Facebook refuse to load inside an embedded preview
   frame (`ERR_BLOCKED_BY_RESPONSE`). The links are set to break out of the frame, so
   they behave normally on the published site and in a normal browser tab.

### 4.6 Learn about the Trust

1. Header → **About Us** for the history, vision and mission, the motto and the trustee
   cards (name, role and short biography each).

---

## 5. Customer journeys

### 5.1 Send an enquiry

1. Header → **Contact** (or the Contact CTA on any page).
2. Left column: the trust office address, phone and email, plus a map area reserved for
   an embed.
3. Right column: **Send an enquiry**, with these fields —

   | Field | Required | Notes |
   | --- | --- | --- |
   | Name | Yes | up to 100 characters |
   | Email | Yes | must be a valid email address |
   | Subject | No | Preschool admissions · Arts admissions · Donation · Volunteering · Other |
   | Message | Yes | up to 1000 characters |

4. Press **Send message**. A confirmation line appears below the button.
5. **The form does not deliver email yet** — the page states this above the fields.
   Until messaging is connected, use the phone number or email address shown alongside.

### 5.2 Preschool admission

1. Header → **Preschool**.
2. Read **Age groups** — Playgroup (1.5–2.5), Nursery (2.5–3.5), Kindergarten (3.5–5) —
   and **A day at the preschool**.
3. Follow the admissions CTA, or open **Get Involved → Preschool admissions**.
4. Finish at **Contact** with *Preschool admissions* selected as the subject.

### 5.3 Arts admission

1. Header → **Ashwamedha** → **Courses offered** to pick a discipline and level.
2. Open **Get Involved → Arts admissions**.
3. Finish at **Contact** with *Arts admissions* as the subject.

### 5.4 Donate

1. Header → the gold **Donate** button, or footer → *Get Involved*.
2. Three cards at the top of the page:
   - **Bank transfer (NEFT / IMPS)** — account name, number, IFSC and branch.
   - **UPI** — the UPI ID for instant contributions.
   - **Tax exemption (80G)** — the exemption status and how to request a receipt.
3. Below: **Volunteer** opportunities and the **admissions** links.
4. After transferring, email the trust with the reference number to receive a receipt.
5. **There is no online payment checkout on the site today** — donations are made
   directly through your own bank or UPI app.

---

## 6. Admin guide — maintaining the site

There is no admin login. "Admin" work means editing the project's content files. Almost
all real-world details live in **one file**, so a demo can be personalised in minutes.

### 6.1 Trust details — `src/content/trust.ts`

The `TRUST` object holds everything that appears in the header, footer and Contact page:

```ts
export const TRUST = {
  name: "Nagalakshmi Ramamurthy Iyer Educational Trust",
  shortName: "NRI Educational Trust",
  tagline: "Excellence in Education, Arts & Values",
  mottoSanskrit: "विद्या ददाति विनयम्",
  mottoEnglish: "Knowledge Bestows Humility",
  established: "2024",
  registration: "TBD / 2024",
  address: "Trust address line 1, Area, City, State — PIN",
  phone: "+91 00000 00000",
  email: "contact@nritrust.org",
  social: {
    instagram: "#",
    facebook: "#",
    preschoolFacebook: "#",
  },
} as const;
```

Change a value here and it updates everywhere on the site at once.

### 6.2 Trustees — `TRUSTEES` in the same file

```ts
{
  name: "Full Name",
  role: "Founder & Managing Trustee",
  bio: "Two or three sentences about their background.",
}
```

Add, remove or reorder entries; the About page cards follow the array order.

### 6.3 Faculty — `FACULTY`

```ts
{ name: "Guru Name", discipline: "Bharatanatyam", detail: "Credentials, years of practice" }
```

Shown in **Our gurus** on the Ashwamedha page.

### 6.4 Courses — `COURSES`

```ts
{
  title: "Bharatanatyam",
  level: "Beginner → Arangetram",
  summary: "One or two lines describing the syllabus.",
}
```

### 6.5 Programs & events — `PROGRAMS`

```ts
{
  title: "Navaratri Cultural Festival",
  date: "3 – 11 October 2026",
  place: "Trust Auditorium, City",
  summary: "What happens and who it is for.",
}
```

Replace "Date to be announced" / "Venue placeholder" with the confirmed details. List
events in the order you want them displayed.

### 6.6 News — `NEWS`

```ts
{
  title: "Admissions open for the new academic year",
  date: "12 January 2026",
  excerpt: "One short paragraph; the newest item goes first.",
}
```

### 6.7 Images

| Image | File | Used on |
| --- | --- | --- |
| Trust crest | `src/assets/nri-logo.jpg.asset.json` | Header, footer, Home hero |
| Arts photo | `src/assets/hero-arts.jpg` | Home, Ashwamedha, Gallery |
| Preschool photo | `src/assets/preschool.jpg` | Preschool, Gallery |

Replace a file in place (keeping the same name) and every page picks it up. Always keep
the `alt` text descriptive — it matters for accessibility and search engines.

The gallery grid is defined by the `items` array in `src/routes/gallery.tsx`; add a new
import and a `{ src, caption, w, h }` entry for each new photograph.

### 6.8 Adding a new page

1. Create `src/routes/<name>.tsx` and export a route with
   `createFileRoute("/<name>")`, a `head()` block and a `component`.
2. Build the body with the shared primitives from `@/components/site/Primitives` —
   `PageHero`, `Section` and `Card` — so it matches the rest of the site.
3. Add it to the `nav` array at the top of `src/components/site/SiteHeader.tsx` if it
   belongs in the main menu.
4. Add a list item to the **Explore** column in `src/components/site/SiteFooter.tsx`.
5. The route table regenerates automatically — never edit `src/routeTree.gen.ts`.

### 6.9 SEO / page metadata

Every page defines its own `head()` with `title`, `description`, `og:title` and
`og:description`. Keep titles under 60 characters and descriptions under 160, and make
each page's text distinct. Site-wide defaults live in `src/routes/__root.tsx`.

### 6.10 Pre-demo checklist

- [ ] Trust address, phone, email, registration number
- [ ] Instagram and Facebook URLs in `TRUST.social`
- [ ] Trustee names, roles and biographies
- [ ] Faculty names and credentials
- [ ] Course levels and summaries
- [ ] Event dates and venues (all currently "to be announced")
- [ ] News items and dates
- [ ] Bank account, IFSC, UPI ID and 80G status on Get Involved
- [ ] Real photographs in the Gallery, and video links
- [ ] Google Maps embed on the Contact page
- [ ] Established year and copyright line in the footer

---

## 7. What does not exist yet

To be explicit, so nothing is over-promised in a demo:

- **No login or user accounts** — nobody signs in, on either side.
- **No admin dashboard** — content is edited in the project files, not through a UI.
- **No customer portal** — no saved profiles, applications or donation history.
- **No database** — all content is static and ships with the site.
- **No email delivery** — the contact form validates and confirms on screen only.
- **No online payments** — donations are made through bank transfer or UPI.

Each of these can be added later by enabling a backend: a real admin login with an
editor for news, events and gallery items; an enquiry inbox that stores and emails every
submission; an admissions application form; and an online donation checkout with
automatic 80G receipts.
