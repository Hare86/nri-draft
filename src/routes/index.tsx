import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, HandHeart, Music, Sparkles } from "lucide-react";
import homeBg from "@/assets/AMS_12.jpg.asset.json";
import logo from "@/assets/nri-logo.jpg.asset.json";
import { Card, Section } from "@/components/site/Primitives";
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

const PILLAR_ICONS = [GraduationCap, Music, Sparkles];

function Index() {
  const identity = useContent<any>("site.identity");
  const pillars = useContent<any>("home.pillars");
  const enrol = useContent<any>("home.enrolCta");
  const upcoming = useContent<any>("programs.upcoming");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-cream">
        <img
          src={homeBg.url}
          alt="Ashwamedha School of Arts students in classical dance costume"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center lg:px-8 lg:py-28">
          <img
            src={identity.logo || logo.url}
            alt="NRI Educational Trust crest"
            className="mx-auto h-32 w-32 rounded-full object-cover ring-2 ring-gold/70 sm:h-40 sm:w-40"
          />
          <h1 className="mt-8 font-display text-4xl leading-tight font-semibold sm:text-6xl">
            {identity.name} — Education, Arts & Values
          </h1>
          <div className="gold-rule mx-auto mt-6 w-48" />
          <p className="mt-6 text-sm tracking-[0.28em] text-gold uppercase sm:text-base">
            {identity.tagline}
          </p>
          <p className="mt-6 font-display text-2xl text-cream/90">{identity.mottoSanskrit}</p>
          <p className="text-sm text-cream/60">{identity.mottoEnglish}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
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
