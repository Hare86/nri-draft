import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { TRUST } from "@/content/trust";

export const Route = createFileRoute("/user-guide")({
  head: () => ({
    meta: [
      { title: "User Guide — NRI Educational Trust" },
      {
        name: "description",
        content:
          "How to navigate the NRI Educational Trust website: every page explained, plus how to enquire, enrol and donate.",
      },
      { property: "og:title", content: "User Guide — NRI Educational Trust" },
      {
        property: "og:description",
        content:
          "A page-by-page walkthrough of the Trust website with steps for admissions, donations and enquiries.",
      },
    ],
  }),
  component: UserGuide,
});

const pages = [
  {
    to: "/",
    label: "Home",
    meta: "Start here",
    body: "The crest, the Trust motto, and three pillars — the Trust, Ashwamedha School of Arts and the Preschool — with shortcuts to every other section.",
  },
  {
    to: "/about",
    label: "About Us",
    meta: "Who we are",
    body: "Our history, vision and mission, the meaning of our motto, and profiles of the trustees.",
  },
  {
    to: "/units/ashwamedha",
    label: "Ashwamedha School of Arts",
    meta: "Classical arts",
    body: "The school's mission, the courses offered with levels, our gurus, how we teach, and links to our Instagram and Facebook.",
  },
  {
    to: "/units/preschool",
    label: "Preschool",
    meta: "Early years",
    body: "Our approach to early learning, the three age groups from Playgroup to Kindergarten, and a typical day.",
  },
  {
    to: "/programs",
    label: "Programs & Events",
    meta: "What's on",
    body: "Upcoming programs with dates and venues, plus the celebrations we hold through the year.",
  },
  {
    to: "/gallery",
    label: "Gallery",
    meta: "Media",
    body: "Photographs from performances, classrooms and celebrations, with a section for performance recordings.",
  },
  {
    to: "/news",
    label: "News & Announcements",
    meta: "Updates",
    body: "Admissions notices, student achievements and trust announcements, newest first.",
  },
  {
    to: "/get-involved",
    label: "Donate / Get Involved",
    meta: "Support us",
    body: "Bank transfer and UPI details, 80G tax exemption, volunteering opportunities and admissions links.",
  },
  {
    to: "/contact",
    label: "Contact Us",
    meta: "Reach out",
    body: "Our address, phone and email, and an enquiry form for admissions, donations or volunteering.",
  },
] as const;

const journeys = [
  {
    title: "Enrol a child in the preschool",
    meta: "Admissions",
    steps: [
      "Open Preschool from the menu and read the age groups and daily rhythm.",
      "Check Get Involved → Preschool admissions for what to prepare.",
      "Go to Contact, choose “Preschool admissions” as the subject and send your details.",
    ],
  },
  {
    title: "Join an arts class",
    meta: "Admissions",
    steps: [
      "Open Ashwamedha and browse Courses offered to pick a discipline and level.",
      "Read Our gurus and How we teach to understand the training path.",
      "Go to Contact, choose “Arts admissions” and tell us the student's age and experience.",
    ],
  },
  {
    title: "Make a donation",
    meta: "Support",
    steps: [
      "Tap the gold Donate button in the header to reach Get Involved.",
      "Use the bank transfer details or the UPI ID shown on the page.",
      "Email us the reference number to receive your 80G receipt.",
    ],
  },
  {
    title: "Follow our performances",
    meta: "Social",
    steps: [
      "Open Ashwamedha and scroll to the Follow us section.",
      "Tap the Instagram profile or any of the Facebook video links.",
      "Each link opens in a new browser tab.",
    ],
  },
] as const;

function UserGuide() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        title="User Guide"
        subtitle="A page-by-page walkthrough of the Trust website — what you will find where, and how to enquire, enrol or contribute."
      />

      <Section
        eyebrow="Getting around"
        title="Navigating the site"
        intro="The crest in the top-left always takes you back to Home, and the header stays visible as you scroll."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="On a computer" meta="Wide screens">
            The full menu sits along the top: Home, About Us, Ashwamedha, Preschool,
            Programs, Gallery, News and Contact, followed by the gold Donate button. The
            page you are viewing is highlighted in gold.
          </Card>
          <Card title="On a phone or tablet" meta="Narrow screens">
            Tap the gold menu button on the right of the header to open the same links in
            a stacked list, with a full-width Donate / Get Involved button at the bottom.
            Choosing a link closes the menu.
          </Card>
          <Card title="In the footer" meta="Every page">
            The Explore column repeats the main links, Reach Us shows our address, phone
            and email, and the social icons lead to our channels.
          </Card>
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Site map"
        title="Every page explained"
        intro="Nine pages make up the site. Select any title below to go straight there."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <article key={page.to} className="crest-frame h-full rounded-sm bg-card p-6">
              <p className="text-xs tracking-[0.18em] text-maroon uppercase">{page.meta}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                <Link to={page.to} className="hover:text-maroon">
                  {page.label}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{page.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Step by step"
        title="Common tasks"
        intro="The four things most visitors come here to do."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {journeys.map((journey) => (
            <article key={journey.title} className="crest-frame h-full rounded-sm bg-card p-6">
              <p className="text-xs tracking-[0.18em] text-maroon uppercase">{journey.meta}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{journey.title}</h3>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {journey.steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-xs font-semibold text-cream">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Good to know" title="Frequently asked">
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Do I need an account?" meta="Accounts">
            No. Every page is open to everyone — there is no sign-in, and nothing on the
            site is hidden behind a login.
          </Card>
          <Card title="What happens after I submit the enquiry form?" meta="Enquiries">
            You will see an on-screen confirmation. The form does not deliver email yet,
            so for anything urgent please call {TRUST.phone} or write to {TRUST.email}.
          </Card>
          <Card title="Can I donate online with a card?" meta="Donations">
            Not yet. Donations are made by bank transfer or UPI using the details on the
            Get Involved page, and we issue an 80G receipt on request.
          </Card>
          <Card title="Why do some details say “to be announced”?" meta="Content">
            Event dates, venues and a few contact details are still being confirmed by the
            Trust. They will be filled in as soon as they are final.
          </Card>
        </div>
      </Section>

      <Section eyebrow="For the trust team" title="Keeping the site up to date">
        <div className="crest-frame rounded-sm bg-cream p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A separate administrator guide (<span className="font-medium">USER_GUIDE.md</span>{" "}
            in the project) covers content maintenance in detail: updating the address,
            phone, email and social links, editing trustees, faculty, courses, programs and
            news, replacing photographs, adding a new page, and the full pre-demo checklist
            of placeholders to replace.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            There is no administrator login on the website itself today — all content is
            maintained in the project files, and every trust-wide detail lives in a single
            content file so it can be updated in one place.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream"
          >
            Still need help? Contact us
          </Link>
        </div>
      </Section>
    </>
  );
}
