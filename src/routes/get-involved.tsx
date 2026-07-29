import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageHero, Section } from "@/components/site/Primitives";
import { TRUST } from "@/content/trust";

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
  return (
    <>
      <PageHero
        eyebrow="Support Us"
        title="Get Involved"
        subtitle="Your time, skills or contribution directly funds a child's education and cultural training."
      />

      <Section eyebrow="Donate" title="Ways to contribute">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="Bank transfer" meta="NEFT / IMPS">
            <p>Account name: {TRUST.name}</p>
            <p>Account number: XXXXXXXXXXXX</p>
            <p>IFSC: XXXX0000000</p>
            <p>Bank &amp; branch: To be confirmed</p>
          </Card>
          <Card title="UPI" meta="Instant">
            <p>UPI ID: nritrust@upi (placeholder)</p>
            <p className="mt-2">
              A QR code will be added here once the Trust's payment details are finalised.
            </p>
          </Card>
          <Card title="Tax exemption" meta="80G">
            Receipts are issued for every contribution. 80G exemption status and
            registration details will be published here once confirmed.
          </Card>
        </div>
        <div className="crest-frame mt-8 rounded-sm bg-cream p-6 text-sm text-muted-foreground">
          Where your donation goes: scholarships and fee waivers, instruments and teaching
          material, preschool learning resources, and cultural programme costs. An annual
          statement of use will be published on this page.
        </div>
      </Section>

      <Section tone="muted" eyebrow="Volunteer" title="Give your time">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Teaching support", "Assist with classes, reading circles or homework help."],
            ["Event help", "Stage management, hospitality and coordination at events."],
            ["Media & design", "Photography, videography, social media and print design."],
            ["Professional skills", "Accounting, legal, technology or fundraising support."],
          ].map(([title, body]) => (
            <Card key={title} title={title}>
              {body}
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Enroll" title="Join our programmes">
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Preschool admissions" meta="Ages 1.5 – 5">
            Visit the campus, meet the teachers and enrol your child for the coming term.
            <div className="mt-4">
              <Link to="/units/preschool" className="font-semibold text-maroon underline underline-offset-4">
                Preschool details
              </Link>
            </div>
          </Card>
          <Card title="Arts admissions" meta="All ages">
            Dance, vocal and instrument batches with placement after a short assessment.
            <div className="mt-4">
              <Link to="/units/ashwamedha" className="font-semibold text-maroon underline underline-offset-4">
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
