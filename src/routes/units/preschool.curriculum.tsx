import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";

const TITLE = "Preschool Curriculum: Activities & Learning Outcomes";
const DESCRIPTION =
  "A parent's guide to our preschool curriculum — daily activities, the six learning domains, age-wise milestones and how progress is assessed.";

export const Route = createFileRoute("/units/preschool/curriculum")({
  head: () => ({
    meta: [
      { title: `${TITLE} — NRI Educational Trust` },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CurriculumGuide,
});

const DOMAINS = [
  {
    title: "Language & early literacy",
    meta: "Daily, 30–40 minutes",
    body: "Circle-time storytelling in English and the mother tongue, rhymes, picture talk, sound games and pre-writing strokes that build the grip and left-to-right tracking needed for formal writing.",
  },
  {
    title: "Early numeracy",
    meta: "Daily, 20–30 minutes",
    body: "Counting with beads and shells, sorting by colour, size and shape, pattern making, simple measurement with cups and strings, and number recognition through play rather than worksheets.",
  },
  {
    title: "Discovery & environment",
    meta: "3 sessions a week",
    body: "Nature walks, plant and seed observation, water and sand play, floating and sinking experiments, weather charts, and conversations about family, neighbourhood and community helpers.",
  },
  {
    title: "Motor skills",
    meta: "Daily, indoor and outdoor",
    body: "Climbing, balancing and ball play for gross motor strength; threading, tearing, dough, tongs and pegboards for the fine motor control that precedes handwriting.",
  },
  {
    title: "Creative arts",
    meta: "4 sessions a week",
    body: "Free painting, clay, collage, music and movement, and an introduction to classical rhythm and simple Bharatanatyam steps drawn from our Ashwamedha School of Arts.",
  },
  {
    title: "Values & social-emotional growth",
    meta: "Woven through the day",
    body: "Sharing, turn taking, naming feelings, tidying up, greeting elders, festival celebrations and short shloka recitation — the everyday habits behind our motto, vidya dadati vinayam.",
  },
];

const AGE_STAGES = [
  {
    title: "Playgroup — 2 to 3 years",
    outcomes: [
      "Separates comfortably from parents and settles into a routine",
      "Follows two-step instructions and uses short sentences",
      "Recognises colours, basic shapes and counts to ten with objects",
      "Manages toileting, drinking and hand-washing with light support",
    ],
  },
  {
    title: "Nursery — 3 to 4 years",
    outcomes: [
      "Identifies letter sounds and writes standing and sleeping strokes",
      "Counts to twenty, matches quantity to numeral up to ten",
      "Plays cooperatively and resolves small conflicts with words",
      "Retells a familiar story in sequence",
    ],
  },
  {
    title: "Kindergarten — 4 to 6 years",
    outcomes: [
      "Blends sounds to read three-letter words and writes their name",
      "Adds and subtracts within ten using concrete material",
      "Asks questions, predicts and explains simple observations",
      "Enters Grade 1 confident, curious and school-ready",
    ],
  },
];

const DAY = [
  { time: "Arrival & free play", body: "Children choose a corner — blocks, books, dolls or puzzles — while the teacher greets each family." },
  { time: "Circle time", body: "Prayer, calendar, weather, news sharing and the theme of the week." },
  { time: "Focused activity", body: "The literacy or numeracy block, taught in small groups so each child works at their own pace." },
  { time: "Snack & rest", body: "Self-serving, cleaning up and a quiet story or music break." },
  { time: "Outdoor play", body: "Gross motor games, garden time and water or sand play." },
  { time: "Art, music or movement", body: "Hands-on creative work, followed by reflection and goodbye song." },
];

function CurriculumGuide() {
  return (
    <>
      <PageHero
        eyebrow="Preschool Guide"
        title="Our Preschool Curriculum"
        subtitle="What children learn with us each day, how we teach it, and the milestones parents can expect at every age."
      />

      <Section
        eyebrow="Overview"
        title="A play-based curriculum with clear outcomes"
        intro="Our preschool curriculum is built around six learning domains, delivered through play, conversation and hands-on material rather than worksheets. Themes run for two weeks at a time so that language, numbers, art and discovery all connect to one idea the children can see and touch."
      >
        <div className="max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Early childhood research is consistent on one point: young children learn most
            durably when learning is embedded in play, repetition and warm relationships. Our
            planning follows that principle and is aligned with the National Education Policy's
            foundational-stage goals for children aged three to eight.
          </p>
          <p>
            Every activity below has an intended outcome, and every child has a portfolio that
            records it — so "learning through play" is never vague for a parent.
          </p>
        </div>
      </Section>

      <Section tone="muted" eyebrow="Learning domains" title="The six areas we cover">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((d) => (
            <Card key={d.title} title={d.title} meta={d.meta}>
              {d.body}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="A typical day" title="How the curriculum runs from morning to noon">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DAY.map((s, i) => (
            <li key={s.time} className="crest-frame rounded-sm bg-card p-6">
              <p className="text-xs tracking-[0.18em] text-maroon uppercase">Step {i + 1}</p>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.time}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" eyebrow="Learning outcomes" title="Milestones by age group">
        <div className="grid gap-6 md:grid-cols-3">
          {AGE_STAGES.map((stage) => (
            <article key={stage.title} className="crest-frame h-full rounded-sm bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{stage.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {stage.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span aria-hidden="true" className="text-gold">
                      &bull;
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Assessment" title="How we track progress — and share it with you">
        <div className="max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
          <p>
            There are no tests in preschool. Teachers keep observation notes and a work portfolio
            for each child across the six domains, updated through the term. Parents receive a
            written progress summary twice a year and can request a one-to-one meeting at any time.
          </p>
          <p>
            If a child needs extra support in speech, motor skills or settling in, we discuss it
            early and agree a plan with the family rather than waiting for a report card.
          </p>
        </div>
      </Section>

      <Section tone="muted" eyebrow="Visit us" title="See the curriculum in action">
        <div className="crest-frame rounded-sm bg-card p-8">
          <p className="leading-relaxed text-muted-foreground">
            The best way to judge a preschool curriculum is to watch a morning of it. Book a
            classroom visit, meet the teachers, and ask about admissions for the coming term.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-block rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream"
            >
              Book a visit
            </Link>
            <Link
              to="/units/preschool"
              className="inline-block rounded-sm border border-navy/30 px-6 py-3 text-sm font-semibold text-navy"
            >
              Back to the Preschool
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
