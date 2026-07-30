import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, HandHeart, Music, Sparkles } from "lucide-react";
import heroArts from "@/assets/hero-arts.jpg";
import preschoolImg from "@/assets/preschool.jpg";
import logo from "@/assets/nri-logo.jpg.asset.json";
import { Card, Section } from "@/components/site/Primitives";
import { PhotoFilm, type FilmSlide } from "@/components/site/PhotoFilm";
import { PROGRAMS, TRUST, TRUST_FILM, UNITS } from "@/content/trust";

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

const artsFilm: FilmSlide[] = [
  { src: heroArts, alt: "Bharatanatyam dancer performing" },
  ...UNITS.ashwamedha.film.map((f) => ({ ...f })),
];

const preschoolFilm: FilmSlide[] = [
  { src: preschoolImg, alt: "Bright preschool classroom" },
  ...UNITS.preschool.film.map((f) => ({ ...f })),
];

function UnitBranch({
  name,
  tagline,
  description,
  monogram,
  slides,
  to,
  cta,
}: {
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
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-xl font-semibold text-gold">
          {monogram}
        </div>
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


function Index() {
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
              src={logo.url}
              alt="NRI Educational Trust crest"
              className="mx-auto h-32 w-32 rounded-full object-cover ring-2 ring-gold/70 sm:h-40 sm:w-40"
            />
            <h1 className="mt-8 font-display text-4xl leading-tight font-semibold sm:text-5xl">
              {TRUST.name}
            </h1>
            <div className="gold-rule mx-auto mt-6 w-48" />
            <p className="mt-6 text-sm tracking-[0.28em] text-gold uppercase sm:text-base">
              {TRUST.tagline}
            </p>
            <p className="mt-6 font-display text-2xl text-cream/90">{TRUST.mottoSanskrit}</p>
            <p className="text-sm text-cream/60">{TRUST.mottoEnglish}</p>

            <dl className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cream/70">
              <div>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">Established</dt>
                <dd className="mt-1">{TRUST.established}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">Registration</dt>
                <dd className="mt-1">{TRUST.registration}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">Contact</dt>
                <dd className="mt-1">
                  {TRUST.phone} · {TRUST.email}
                </dd>
              </div>
            </dl>

            <PhotoFilm slides={TRUST_FILM.map((f) => ({ ...f }))} tone="dark" className="mt-10" />
          </div>

          {/* Second & third parts — the units, visually branching below the Trust */}
          <div className="mx-auto mt-16 grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
            <UnitBranch
              name={UNITS.ashwamedha.name}
              tagline={UNITS.ashwamedha.tagline}
              description={UNITS.ashwamedha.description}
              monogram="A"
              slides={artsFilm}
              to="/units/ashwamedha"
              cta="Explore the school of arts"
            />
            <UnitBranch
              name={UNITS.preschool.name}
              tagline={UNITS.preschool.tagline}
              description={UNITS.preschool.description}
              monogram="P"
              slides={preschoolFilm}
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

      <Section
        eyebrow="Our Work"
        title="Three pillars of the Trust"
        intro="Founded to serve the community, the Trust brings together academic support, classical arts education and early-childhood learning under one shared set of values."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="The Trust" meta="Service">
            <GraduationCap className="mb-3 h-6 w-6 text-gold" aria-hidden />
            Scholarships, value education and community outreach for deserving students,
            guided by a board of trustees committed to transparency.
          </Card>
          <Card title="Ashwamedha School of Arts" meta="Classical Arts">
            <Music className="mb-3 h-6 w-6 text-gold" aria-hidden />
            Bharatanatyam, Carnatic vocal and instrumental training in the guru–shishya
            tradition, with a distinctive layered learning method.
          </Card>
          <Card title="Preschool" meta="Early Years">
            <Sparkles className="mb-3 h-6 w-6 text-gold" aria-hidden />
            A joyful, play-based foundation programme blending curiosity, language,
            movement and Indian cultural roots.
          </Card>
        </div>
      </Section>


      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={preschoolImg}
            alt="Bright preschool classroom with learning corners"
            width={1400}
            height={900}
            loading="lazy"
            className="crest-frame w-full rounded-sm object-cover"
          />
          <div>
            <p className="text-xs tracking-[0.25em] text-maroon uppercase">Enrolment open</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              A first classroom that feels like home
            </h2>
            <div className="gold-rule mt-4 w-28" />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Our preschool programme is built around small groups, sensory play and
              storytelling — with shlokas, rhymes and festivals woven into the week so
              children grow up rooted and confident.
            </p>
            <Link
              to="/units/preschool"
              className="mt-7 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream transition-opacity hover:opacity-90"
            >
              Explore the preschool
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="What's on" title="Upcoming programs & events">
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.slice(0, 4).map((p) => (
            <Card key={p.title} title={p.title} meta={`${p.date} · ${p.place}`}>
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
            Every contribution funds scholarships, instruments, teaching materials and
            cultural programmes for children who need them most.
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
