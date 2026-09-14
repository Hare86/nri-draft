import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { useContent } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — NRI Educational Trust" },
      {
        name: "description",
        content:
          "History, vision and leadership of the Nagalakshmi Ramamurthy Iyer Educational Trust, guided by the motto विद्या ददाति विनयम्.",
      },
      { property: "og:title", content: "About Us — NRI Educational Trust" },
      {
        property: "og:description",
        content: "Our history, vision, trustees and the values that guide the Trust.",
      },
    ],
  }),
  component: About,
});

function About() {
  const identity = useContent<any>("site.identity");
  const hero = useContent<any>("about.hero");
  const history = useContent<any>("about.history");
  const trustees = useContent<any>("about.trustees");
  const values = useContent<any>("about.values");

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />

      <Section title={history.title}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 leading-relaxed text-muted-foreground">
            {(history.paragraphs ?? []).map((p: any, i: number) => (
              <div key={i}>
                {p.heading ? (
                  <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                    {p.heading}
                  </h3>
                ) : null}
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="crest-frame rounded-sm bg-cream p-8 text-center">
            <p className="text-xs tracking-[0.25em] text-maroon uppercase">Our Motto</p>
            <p className="mt-4 font-display text-3xl text-navy">{identity.mottoSanskrit}</p>
            <div className="gold-rule mx-auto mt-4 w-24" />
            <p className="mt-4 text-sm text-muted-foreground">{identity.mottoEnglish}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {history.mottoNote}
            </p>
          </div>
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow={trustees.eyebrow}
        title={trustees.title}
        intro={trustees.intro}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {(trustees.items ?? []).map((t: any, i: number) => (
            <Card key={i} title={t.name} meta={t.role}>
              {t.photo && (
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="mb-4 h-28 w-28 rounded-full object-cover ring-1 ring-gold/50"
                />
              )}
              {t.bio}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow={values.eyebrow} title={values.title}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(values.items ?? []).map((v: any, i: number) => (
            <Card key={i} title={v.title}>
              {v.body}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
