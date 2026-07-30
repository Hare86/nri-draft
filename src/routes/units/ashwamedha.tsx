import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import heroArts from "@/assets/hero-arts.jpg";
import { Button } from "@/components/ui/button";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { PhotoFilm, toSlides } from "@/components/site/PhotoFilm";
import { useContent } from "@/lib/site-content";

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
  const unit = useContent<any>("ashwamedha.unit");
  const overview = useContent<any>("ashwamedha.overview");
  const curriculum = useContent<any>("ashwamedha.curriculum");
  const teachers = useContent<any>("ashwamedha.teachers");
  const method = useContent<any>("ashwamedha.method");
  const follow = useContent<any>("ashwamedha.follow");
  const join = useContent<any>("ashwamedha.join");

  return (
    <>
      <PageHero eyebrow="Our Units" title={unit.name} subtitle={overview.heroSubtitle} />

      <Section eyebrow={overview.eyebrow} title={overview.title}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            {(overview.paragraphs ?? []).map((p: any, i: number) => (
              <p key={i}>{p.text}</p>
            ))}
          </div>
          <img
            src={overview.image || heroArts}
            alt="Student performing Bharatanatyam"
            width={1600}
            height={900}
            loading="lazy"
            className="crest-frame w-full rounded-sm object-cover"
          />
        </div>
        <PhotoFilm slides={toSlides(unit.photos)} className="mt-10" />
      </Section>

      <Section tone="muted" eyebrow={curriculum.eyebrow} title={curriculum.title}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(curriculum.items ?? []).map((c: any, i: number) => (
            <Card key={i} title={c.title} meta={c.level}>
              {c.summary}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow={teachers.eyebrow} title={teachers.title}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(teachers.items ?? []).map((f: any, i: number) => (
            <Card key={i} title={f.name} meta={f.discipline}>
              {f.photo && (
                <img
                  src={f.photo}
                  alt={f.name}
                  loading="lazy"
                  className="mb-4 h-24 w-24 rounded-full object-cover ring-1 ring-gold/50"
                />
              )}
              {f.detail}
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow={method.eyebrow} title={method.title} intro={method.intro}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(method.items ?? []).map((m: any, i: number) => (
            <Card key={i} title={m.title} meta={m.meta}>
              {m.body}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow={follow.eyebrow} title={follow.title} intro={follow.intro}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(follow.items ?? []).map((s: any, i: number) => (
            <Card key={i} title={s.label} meta={s.meta}>
              <p>{s.body}</p>
              {s.href && (
                <Button
                  asChild
                  className="mt-5 w-full rounded-sm bg-navy text-cream hover:bg-maroon"
                >
                  <a href={s.href} target="_top" rel="noopener noreferrer external">
                    Open {s.meta}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow={join.eyebrow} title={join.title}>
        <div className="crest-frame rounded-sm bg-card p-8">
          <p className="leading-relaxed text-muted-foreground">{join.body}</p>
          <Link
            to="/contact"
            className="mt-6 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream"
          >
            {join.ctaLabel}
          </Link>
        </div>
      </Section>
    </>
  );
}
