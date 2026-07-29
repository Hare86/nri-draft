import { createFileRoute, Link } from "@tanstack/react-router";
import preschoolImg from "@/assets/preschool.jpg";
import { Card, PageHero, Section } from "@/components/site/Primitives";

export const Route = createFileRoute("/units/preschool")({
  head: () => ({
    meta: [
      { title: "Preschool — NRI Educational Trust" },
      {
        name: "description",
        content:
          "A joyful play-based preschool programme: curriculum, daily routine, facilities and admissions at the NRI Educational Trust.",
      },
      { property: "og:title", content: "Preschool — NRI Educational Trust" },
      {
        property: "og:description",
        content: "Play-based early years learning rooted in curiosity and Indian culture.",
      },
    ],
  }),
  component: Preschool,
});

function Preschool() {
  return (
    <>
      <PageHero
        eyebrow="Our Units"
        title="The Preschool"
        subtitle="Where the first years of learning are gentle, playful and full of wonder."
      />

      <Section eyebrow="Overview" title="Our approach">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={preschoolImg}
            alt="Preschool classroom with learning corners"
            width={1400}
            height={900}
            loading="lazy"
            className="crest-frame w-full rounded-sm object-cover"
          />
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Children learn best when they are curious and unhurried. Our programme uses
              play, sensory material, music and stories to build language, motor skills and
              early numeracy — without worksheets or pressure.
            </p>
            <p>
              Shlokas, rhymes, festivals and seasonal crafts keep culture present in the
              everyday, while small group sizes let every child be known well.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted" eyebrow="Programme" title="Age groups & curriculum">
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Playgroup" meta="Ages 1.5 – 2.5">
            Sensory play, gross motor activity, rhymes and settling-in routines.
          </Card>
          <Card title="Nursery" meta="Ages 2.5 – 3.5">
            Language building, pre-writing, number sense, music and movement.
          </Card>
          <Card title="Kindergarten" meta="Ages 3.5 – 5">
            Phonics, early maths, storytelling, art and school-readiness skills.
          </Card>
        </div>
      </Section>

      <Section eyebrow="A day with us" title="Daily rhythm">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Circle time", "Greeting, shloka, calendar and the day's story."],
            ["Free play", "Child-led exploration across learning corners."],
            ["Focus activity", "Language, numeracy or craft in small groups."],
            ["Snack & rest", "Shared snack, hygiene habits and quiet time."],
            ["Music & movement", "Songs, rhythm games and outdoor play."],
            ["Wind down", "Reflection, tidy-up and goodbye circle."],
          ].map(([title, body], i) => (
            <li key={title} className="crest-frame rounded-sm bg-card p-6">
              <p className="text-xs tracking-[0.18em] text-maroon uppercase">
                Step {i + 1}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" eyebrow="Enrolment" title="Admissions">
        <div className="crest-frame rounded-sm bg-card p-8">
          <p className="leading-relaxed text-muted-foreground">
            Admissions for the new academic year open in advance of each term. Parents are
            welcome to visit the campus, meet the teachers and observe a session before
            enrolling. Fee details and the enrolment form are shared on enquiry.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream"
          >
            Book a campus visit
          </Link>
        </div>
      </Section>
    </>
  );
}
