import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHero, Section } from "@/components/site/Primitives";
import { useContent } from "@/lib/site-content";
import { supabase } from "@/integrations/supabase/client";

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
  const page = useContent<any>("contact.page");
  const reach = useContent<any>("site.reachUs");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        subject: String(data.get("subject") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      if (error) throw error;
      setSent(true);
      form.reset();
      toast.success("Thank you — your message has been sent.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your message");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="crest-frame rounded-sm bg-cream p-6">
              <h2 className="font-display text-xl font-semibold">Trust office</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-maroon" />
                  <span className="whitespace-pre-wrap">{reach.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-maroon" />
                  <span>{reach.phone}</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-maroon" />
                  <span className="break-all">{reach.email}</span>
                </li>
              </ul>
              {page.landmarks && (
                <p className="mt-4 text-sm text-muted-foreground">{page.landmarks}</p>
              )}
            </div>

            {page.mapEmbedUrl ? (
              <iframe
                src={page.mapEmbedUrl}
                title="Map to the trust office"
                loading="lazy"
                className="crest-frame h-56 w-full rounded-sm"
              />
            ) : (
              <div className="crest-frame grid h-56 place-items-center rounded-sm bg-navy text-sm text-cream/70">
                Map embed to be added
              </div>
            )}
          </div>

          <form className="crest-frame rounded-sm bg-card p-6" onSubmit={submit}>
            <h2 className="font-display text-xl font-semibold">Send an enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your message reaches the trust office and is reviewed by our team.
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
                {(page.subjects ?? []).map((s: any, i: number) => (
                  <option key={i}>{s.label}</option>
                ))}
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
              disabled={busy}
              className="mt-6 rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-cream disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send message"}
            </button>
            <p aria-live="polite" className="mt-3 text-sm text-maroon">
              {sent ? "Thank you — we have received your message." : ""}
            </p>
          </form>
        </div>
      </Section>
    </>
  );
}
