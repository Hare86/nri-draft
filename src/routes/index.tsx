import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, HandHeart, Music, Sparkles } from "lucide-react";
import heroArts from "@/assets/hero-arts.jpg";
import logo from "@/assets/nri-logo.jpg.asset.json";
import { Card, Section } from "@/components/site/Primitives";
import { PhotoFilm, toSlides, type FilmSlide } from "@/components/site/PhotoFilm";
import { useContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NRI Educational Trust — Education, Arts & Values" },
      {
        name: "description",
        content:
          "Nagalakshmi Ramamurthy Iyer Educational Trust nurtures learning, classical arts and cultural values through Ashwamedha School of Arts and our preschool.",
      },
      { property: "og:title", content: "NRI Educational Trust — Education, Arts & Values" },
      {
        property: "og:description",
        content:
          "A charitable trust nurturing education, classical arts and values. विद्या ददाति विनयम्.",
      },
    ],
  }),
  component: Index,
});

function UnitBranch({
  logoUrl,
  name,
  tagline,
  description,
  monogram,
  slides,
  to,
  cta,
}: {
  logoUrl?: string;
  name: string;
  tagline: string;
  description: string;
  monogram: string;
  slides: FilmSlide[];
  to: string;
  cta: string;
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${name} logo`}
            className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-gold/60"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-xl font-semibold text-gold">
            {monogram}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-semibold text-cream">{name}</h3>
          <p className="text-xs tracking-[0.2em] text-gold uppercase">{tagline}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-cream/70">{description}</p>
      <PhotoFilm slides={slides} tone="dark" className="mt-6" />
      <Link
        to={to}
        className="mt-6 inline-block text-sm font-semibold text-gold underline underline-offset-4 hover:opacity-80"
      >
        {cta}
      </Link>
    </div>
  );
}

const PILLAR_ICONS = [GraduationCap, Music, Sparkles];

function Index() {
  const identity = useContent<any>("site.identity");
  const reach = useContent<any>("site.reachUs");
  const film = useContent<any>("home.film");
  const pillars = useContent<any>("home.pillars");
  const enrol = useContent<any>("home.enrolCta");
  const arts = useContent<any>("ashwamedha.unit");
  const preschool = useContent<any>("preschool.unit");
  const upcoming = useContent<any>("programs.upcoming");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-cream">
        <img
          src={heroArts}
          alt="Bharatanatyam dancer performing in a traditional hall"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/85 to-navy" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          {/* First part — the Trust */}
          <div className="mx-auto max-w-4xl text-center">
            <img
              src={identity.logo || logo.url}
              alt="NRI Educational Trust crest"
              className="mx-auto h-32 w-32 rounded-full object-cover ring-2 ring-gold/70 sm:h-40 sm:w-40"
            />
            <h1 className="mt-8 font-display text-4xl leading-tight font-semibold sm:text-5xl">
              {identity.name}
            </h1>
            <div className="gold-rule mx-auto mt-6 w-48" />
            <p className="mt-6 text-sm tracking-[0.28em] text-gold uppercase sm:text-base">
              {identity.tagline}
            </p>
            <p className="mt-6 font-display text-2xl text-cream/90">{identity.mottoSanskrit}</p>
            <p className="text-sm text-cream/60">{identity.mottoEnglish}</p>

            <dl className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cream/70">
              <div>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">Established</dt>
                <dd className="mt-1">{identity.established}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">Registration</dt>
                <dd className="mt-1">{identity.registration}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">Contact</dt>
                <dd className="mt-1">
                  {reach.phone} · {reach.email}
                </dd>
              </div>
            </dl>

            <PhotoFilm slides={toSlides(film.photos)} tone="dark" className="mt-10" />
          </div>

          {/* Second & third parts — the units, visually branching below the Trust */}
          <div className="mx-auto mt-16 grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
            <UnitBranch
              logoUrl={arts.logo}
              name={arts.name}
              tagline={arts.tagline}
              description={arts.description}
              monogram="A"
              slides={toSlides(arts.photos)}
              to="/units/ashwamedha"
              cta="Explore the school of arts"
            />
            <UnitBranch
              logoUrl={preschool.logo}
              name={preschool.name}
              tagline={preschool.tagline}
              description={preschool.description}
              monogram="P"
              slides={toSlides(preschool.photos)}
              to="/units/preschool"
              cta="Explore the preschool"
            />
          </div>

          {/* Global actions — bottom-most within the frame */}
          <div className="mt-16">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/get-involved"
                className="rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
              >
                Donate
              </Link>
              <Link
                to="/units/preschool"
                className="rounded-sm border border-gold/60 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
              >
                Enroll
              </Link>
              <Link
                to="/get-involved"
                className="rounded-sm border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow={pillars.eyebrow} title={pillars.title} intro={pillars.intro}>
        <div className="grid gap-6 md:grid-cols-3">
          {(pillars.items ?? []).map((p: any, i: number) => {
            const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
            return (
              <Card key={`${p.title}-${i}`} title={p.title} meta={p.meta}>
                <Icon className="mb-3 h-6 w-6 text-gold" aria-hidden />
                {p.body}
              </Card>
            );
          })}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {enrol.image ? (
            <img
              src={enrol.image}
              alt="Preschool classroom"
              loading="lazy"
              className="crest-frame w-full rounded-sm object-cover"
            />
          ) : (
            <div className="crest-frame grid aspect-4/3 w-full place-items-center rounded-sm bg-secondary text-sm text-muted-foreground">
              Photo coming soon
            </div>
          )}
          <div>
            <p className="text-xs tracking-[0.25em] text-maroon uppercase">{enrol.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{enrol.title}</h2>
            <div className="gold-rule mt-4 w-28" />
            <p className="mt-5 leading-relaxed text-muted-foreground">{enrol.body}</p>
            <Link
              to="/units/preschool"
              className="mt-7 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream transition-opacity hover:opacity-90"
            >
              {enrol.ctaLabel}
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="What's on" title="Upcoming programs & events">
        <div className="grid gap-6 md:grid-cols-2">
          {(upcoming.items ?? []).slice(0, 4).map((p: any, i: number) => (
            <Card key={`${p.title}-${i}`} title={p.title} meta={`${p.date} · ${p.place}`}>
              {p.summary}
            </Card>
          ))}
        </div>
        <Link
          to="/programs"
          className="mt-8 inline-block text-sm font-semibold text-maroon underline underline-offset-4"
        >
          View all programs
        </Link>
      </Section>

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8">
          <HandHeart className="mx-auto h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Support a child's learning journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/75">
            Every contribution funds scholarships, instruments, teaching materials and cultural
            programmes for children who need them most.
          </p>
          <Link
            to="/get-involved"
            className="mt-8 inline-block rounded-sm bg-gold px-8 py-3 text-sm font-semibold text-navy"
          >
            Donate now
          </Link>
        </div>
      </section>
    </>
  );
}
