import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { useContent } from "@/lib/site-content";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Donate, Volunteer, Enroll" },
      {
        name: "description",
        content:
          "Support the NRI Educational Trust through donations, volunteering or enrolling a child in our preschool and arts programmes.",
      },
      { property: "og:title", content: "Get Involved — NRI Educational Trust" },
      {
        property: "og:description",
        content: "Donate, volunteer or enroll — three ways to support our work.",
      },
    ],
  }),
  component: GetInvolved,
});

function GetInvolved() {
  const ways = useContent<any>("getInvolved.ways");
  const volunteer = useContent<any>("getInvolved.volunteer");

  return (
    <>
      <PageHero
        eyebrow="Support Us"
        title="Get Involved"
        subtitle="Your time, skills or contribution directly funds a child's education and cultural training."
      />

      <Section eyebrow={ways.eyebrow} title={ways.title}>
        <div className="grid gap-6 lg:grid-cols-3">
          {(ways.items ?? []).map((w: any, i: number) => (
            <Card key={i} title={w.title} meta={w.meta}>
              <p className="whitespace-pre-wrap">{w.body}</p>
            </Card>
          ))}
        </div>
        {ways.qr && (
          <div className="mt-8 flex justify-center">
            <img
              src={ways.qr}
              alt="UPI QR code for donations"
              loading="lazy"
              className="crest-frame h-56 w-56 rounded-sm bg-card object-contain p-2"
            />
          </div>
        )}
        <div className="crest-frame mt-8 rounded-sm bg-cream p-6 text-sm text-muted-foreground">
          {ways.note}
        </div>
      </Section>

      <Section tone="muted" eyebrow={volunteer.eyebrow} title={volunteer.title}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(volunteer.items ?? []).map((v: any, i: number) => (
            <Card key={i} title={v.title}>
              {v.body}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Enroll" title="Join our programmes">
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Preschool admissions" meta="Ages 1.5 – 5">
            Visit the campus, meet the teachers and enrol your child for the coming term.
            <div className="mt-4">
              <Link
                to="/units/preschool"
                className="font-semibold text-maroon underline underline-offset-4"
              >
                Preschool details
              </Link>
            </div>
          </Card>
          <Card title="Arts admissions" meta="All ages">
            Dance, vocal and instrument batches with placement after a short assessment.
            <div className="mt-4">
              <Link
                to="/units/ashwamedha"
                className="font-semibold text-maroon underline underline-offset-4"
              >
                Ashwamedha details
              </Link>
            </div>
          </Card>
        </div>
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream"
        >
          Contact the Trust
        </Link>
      </Section>
    </>
  );
}
