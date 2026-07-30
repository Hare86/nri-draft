import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { useContent } from "@/lib/site-content";

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
  const hero = useContent<any>("programs.hero");
  const upcoming = useContent<any>("programs.upcoming");
  const recurring = useContent<any>("programs.recurring");

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />

      <Section eyebrow={upcoming.eyebrow} title={upcoming.title}>
        <div className="grid gap-6 md:grid-cols-2">
          {(upcoming.items ?? []).map((p: any, i: number) => (
            <Card key={i} title={p.title} meta={[p.date, p.place].filter(Boolean).join(" · ")}>
              {p.summary}
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow={recurring.eyebrow} title={recurring.title}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(recurring.items ?? []).map((r: any, i: number) => (
            <Card key={i} title={r.title}>
              {r.body}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
