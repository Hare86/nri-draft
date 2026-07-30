import { createFileRoute, Link } from "@tanstack/react-router";
import preschoolImg from "@/assets/preschool.jpg";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { PhotoFilm, toSlides } from "@/components/site/PhotoFilm";
import { useContent } from "@/lib/site-content";

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
  const unit = useContent<any>("preschool.unit");
  const overview = useContent<any>("preschool.overview");
  const programme = useContent<any>("preschool.programme");
  const day = useContent<any>("preschool.day");
  const enrolment = useContent<any>("preschool.enrolment");

  return (
    <>
      <PageHero eyebrow="Our Units" title={unit.name} subtitle={overview.heroSubtitle} />

      <Section eyebrow={overview.eyebrow} title={overview.title}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={overview.image || preschoolImg}
            alt="Preschool classroom with learning corners"
            width={1400}
            height={900}
            loading="lazy"
            className="crest-frame w-full rounded-sm object-cover"
          />
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            {(overview.paragraphs ?? []).map((p: any, i: number) => (
              <p key={i}>{p.text}</p>
            ))}
          </div>
        </div>
        <PhotoFilm slides={toSlides(unit.photos)} className="mt-10" />
      </Section>

      <Section tone="muted" eyebrow={programme.eyebrow} title={programme.title}>
        <div className="grid gap-6 md:grid-cols-3">
          {(programme.items ?? []).map((g: any, i: number) => (
            <Card key={i} title={g.title} meta={g.meta}>
              {g.body}
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Want the detail?{" "}
          <Link to="/units/preschool/curriculum" className="font-semibold text-navy underline">
            Read our full preschool curriculum guide
          </Link>{" "}
          — activities, daily routine and learning outcomes by age.
        </p>
      </Section>

      <Section eyebrow={day.eyebrow} title={day.title}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(day.items ?? []).map((s: any, i: number) => (
            <li key={i} className="crest-frame rounded-sm bg-card p-6">
              <p className="text-xs tracking-[0.18em] text-maroon uppercase">Step {i + 1}</p>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" eyebrow={enrolment.eyebrow} title={enrolment.title}>
        <div className="crest-frame rounded-sm bg-card p-8">
          <p className="leading-relaxed text-muted-foreground">{enrolment.body}</p>
          <Link
            to="/contact"
            className="mt-6 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream"
          >
            {enrolment.ctaLabel}
          </Link>
        </div>
      </Section>
    </>
  );
}
