import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { TRUST, TRUSTEES } from "@/content/trust";

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
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A trust built on knowledge and humility"
        subtitle={`Established in ${TRUST.established}, the Trust carries forward a family legacy of learning, service and devotion to the classical arts.`}
      />

      <Section eyebrow="Our story" title="History & vision">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Placeholder history: the Trust was founded in memory of Smt. Nagalakshmi
              Ramamurthy Iyer, whose life was devoted to teaching, music and quiet service
              to her community. What began as informal classes at home has grown into a
              registered charitable trust serving students across age groups.
            </p>
            <p>
              Placeholder vision: to make high-quality education and classical arts
              training accessible regardless of means, and to raise a generation that is
              academically strong, artistically expressive and grounded in values.
            </p>
          </div>
          <div className="crest-frame rounded-sm bg-cream p-8 text-center">
            <p className="text-xs tracking-[0.25em] text-maroon uppercase">Our Motto</p>
            <p className="mt-4 font-display text-3xl text-navy">{TRUST.mottoSanskrit}</p>
            <div className="gold-rule mx-auto mt-4 w-24" />
            <p className="mt-4 text-sm text-muted-foreground">{TRUST.mottoEnglish}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              True learning is measured not by what we accumulate, but by the humility and
              service it inspires.
            </p>
          </div>
        </div>
      </Section>

      <Section
        tone="muted"
        eyebrow="Leadership"
        title="Trustees & leadership"
        intro="The Trust is governed by a small board that oversees programmes, finances and community accountability."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {TRUSTEES.map((t, i) => (
            <Card key={i} title={t.name} meta={t.role}>
              {t.bio}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="What we stand for" title="Our values">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Access", "Learning opportunities that do not depend on a family's means."],
            ["Excellence", "Rigorous, traditional training with modern teaching craft."],
            ["Rootedness", "Language, ritual and art forms carried forward with respect."],
            ["Accountability", "Transparent use of every rupee contributed to the Trust."],
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
