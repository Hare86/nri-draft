import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero, Section } from "@/components/site/Primitives";
import { TRUST } from "@/content/trust";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NRI Educational Trust" },
      {
        name: "description",
        content:
          "Get in touch with the NRI Educational Trust for admissions, donations, volunteering or general enquiries.",
      },
      { property: "og:title", content: "Contact — NRI Educational Trust" },
      {
        property: "og:description",
        content: "Address, phone, email and an enquiry form for the Trust.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="Contact Us"
        subtitle="For admissions, donations, volunteering or collaborations — we would love to hear from you."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="crest-frame rounded-sm bg-cream p-6">
              <h2 className="font-display text-xl font-semibold">Trust office</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-maroon" />
                  <span>{TRUST.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-maroon" />
                  <span>{TRUST.phone}</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-maroon" />
                  <span className="break-all">{TRUST.email}</span>
                </li>
              </ul>
            </div>
            <div className="crest-frame grid h-56 place-items-center rounded-sm bg-navy text-sm text-cream/70">
              Map embed to be added
            </div>
          </div>

          <form
            className="crest-frame rounded-sm bg-card p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 className="font-display text-xl font-semibold">Send an enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This demo form does not yet deliver email — messaging can be connected later.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="font-medium">Name</span>
                <input
                  required
                  maxLength={100}
                  name="name"
                  className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="text-sm">
                <span className="font-medium">Email</span>
                <input
                  required
                  type="email"
                  maxLength={255}
                  name="email"
                  className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm">
              <span className="font-medium">Subject</span>
              <select
                name="subject"
                className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Preschool admissions</option>
                <option>Arts admissions</option>
                <option>Donation</option>
                <option>Volunteering</option>
                <option>Other</option>
              </select>
            </label>

            <label className="mt-4 block text-sm">
              <span className="font-medium">Message</span>
              <textarea
                required
                rows={5}
                maxLength={1000}
                name="message"
                className="mt-1 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>

            <button
              type="submit"
              className="mt-6 rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream"
            >
              Send message
            </button>
            <p aria-live="polite" className="mt-3 text-sm text-maroon">
              {sent ? "Thank you — your message has been noted in this demo." : ""}
            </p>
          </form>
        </div>
      </Section>
    </>
  );
}
