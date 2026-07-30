import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { useContent } from "@/lib/site-content";

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
  const news = useContent<any>("news.page");

  return (
    <>
      <PageHero eyebrow={news.eyebrow} title={news.title} subtitle={news.subtitle} />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {(news.items ?? []).map((n: any, i: number) => (
            <Card key={i} title={n.title} meta={n.date}>
              {n.image && (
                <img
                  src={n.image}
                  alt={n.title}
                  loading="lazy"
                  className="mb-4 aspect-4/3 w-full rounded-sm object-cover"
                />
              )}
              {n.excerpt}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
