import { createFileRoute, Link } from "@tanstack/react-router";
import heroArts from "@/assets/hero-arts.jpg";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { COURSES, FACULTY } from "@/content/trust";

export const Route = createFileRoute("/units/ashwamedha")({
  head: () => ({
    meta: [
      { title: "Ashwamedha School of Arts — NRI Educational Trust" },
      {
        name: "description",
        content:
          "Bharatanatyam, Carnatic vocal, mridangam and veena training at Ashwamedha School of Arts — faculty, courses, learning method and admissions.",
      },
      { property: "og:title", content: "Ashwamedha School of Arts" },
      {
        property: "og:description",
        content:
          "Classical arts training in the guru–shishya tradition — dance, vocal and instruments.",
      },
    ],
  }),
  component: Ashwamedha,
});

function Ashwamedha() {
  return (
    <>
      <PageHero
        eyebrow="Our Units"
        title="Ashwamedha School of Arts"
        subtitle="Classical training in dance, vocal and instrumental music — taught patiently, performed proudly."
      />

      <Section eyebrow="Overview" title="Mission">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Ashwamedha exists to keep India's classical arts living and joyful. Students
              learn in small batches under teachers who follow the guru–shishya parampara,
              progressing from fundamentals to full stage repertoire.
            </p>
            <p>
              Beyond technique, the school teaches the theory, mythology and language
              behind each piece, so that every performance carries meaning.
            </p>
          </div>
          <img
            src={heroArts}
            alt="Student performing Bharatanatyam"
            width={1600}
            height={900}
            loading="lazy"
            className="crest-frame w-full rounded-sm object-cover"
          />
        </div>
      </Section>

      <Section tone="muted" eyebrow="Curriculum" title="Courses offered">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <Card key={c.title} title={c.title} meta={c.level}>
              {c.summary}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Our teachers" title="Faculty">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACULTY.map((f, i) => (
            <Card key={i} title={f.name} meta={f.discipline}>
              {f.detail}
            </Card>
          ))}
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="How we teach"
        title="A unique learning method"
        intro="Four layers repeat through every level, so students grow in skill and understanding together."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01 · Foundation", "Posture, breath, rhythm and voice culture practised daily."],
            ["02 · Context", "Meaning, mythology and language behind each composition."],
            ["03 · Expression", "Abhinaya and manodharma — making the piece personal."],
            ["04 · Stage", "Regular recitals build confidence long before the arangetram."],
          ].map(([meta, body]) => (
            <Card key={meta} title={meta.split(" · ")[1]} meta={meta.split(" · ")[0]}>
              {body}
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Follow us"
        title="Ashwamedha online"
        intro="Watch recent performances and class highlights on our social channels."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Instagram",
              meta: "Profile",
              href: "https://www.instagram.com/ashwamedha_school_of_arts123/",
              body: "@ashwamedha_school_of_arts123 — photos, reels and announcements from the school.",
            },
            {
              label: "Performance video",
              meta: "Facebook",
              href: "https://www.facebook.com/share/v/1ELPHSGyC9/",
              body: "A recent student performance shared on Facebook.",
            },
            {
              label: "Featured reel",
              meta: "Facebook",
              href: "https://www.facebook.com/share/r/19KuVDR2Hd/",
              body: "Short reel from a recent recital.",
            },
            {
              label: "Stage recital",
              meta: "Facebook",
              href: "https://www.facebook.com/share/v/18b3RKAjSH/",
              body: "Another stage recital by our students.",
            },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full break-words transition-opacity hover:opacity-90"
            >
              <Card title={s.label} meta={s.meta}>
                {s.body}
              </Card>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Join us" title="Admissions">
        <div className="crest-frame rounded-sm bg-card p-8">
          <p className="leading-relaxed text-muted-foreground">
            Admissions are open through the year, subject to batch availability. Placement
            for new students is decided after a short informal assessment. Fee structure
            and class timings will be shared on request.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream"
          >
            Enquire about admissions
          </Link>
        </div>
      </Section>
    </>
  );
}
