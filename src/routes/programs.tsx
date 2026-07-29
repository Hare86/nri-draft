import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { PROGRAMS } from "@/content/trust";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Events — NRI Educational Trust" },
      {
        name: "description",
        content:
          "Arangetrams, cultural festivals, workshops and annual days hosted by the NRI Educational Trust and its units.",
      },
      { property: "og:title", content: "Programs & Events — NRI Educational Trust" },
      {
        property: "og:description",
        content: "Upcoming performances, festivals and workshops across our units.",
      },
    ],
  }),
  component: Programs,
});

function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Calendar"
        title="Programs & Events"
        subtitle="Performances, festivals and workshops that bring our students and community together."
      />

      <Section eyebrow="Upcoming" title="What's coming up">
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <Card key={p.title} title={p.title} meta={`${p.date} · ${p.place}`}>
              {p.summary}
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Every year" title="Our recurring calendar">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Guru Purnima", "Honouring teachers with a student recital."],
            ["Navaratri", "Nine evenings of music and dance."],
            ["Annual Day", "Preschool and arts showcase for families."],
            ["Summer Workshop", "Short intensives open to new learners."],
          ].map(([title, body]) => (
            <Card key={title} title={title}>
              {body}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
