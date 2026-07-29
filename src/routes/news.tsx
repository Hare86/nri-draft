import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { NEWS } from "@/content/trust";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Announcements — NRI Educational Trust" },
      {
        name: "description",
        content:
          "Latest announcements, achievements and admission notices from the NRI Educational Trust and its units.",
      },
      { property: "og:title", content: "News & Announcements — NRI Educational Trust" },
      {
        property: "og:description",
        content: "Announcements, student achievements and admission notices.",
      },
    ],
  }),
  component: News,
});

function News() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News & Announcements"
        subtitle="Updates from the Trust, the school of arts and the preschool."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {NEWS.map((n) => (
            <Card key={n.title} title={n.title} meta={n.date}>
              {n.excerpt}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
