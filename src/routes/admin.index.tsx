import { createFileRoute, Link } from "@tanstack/react-router";
import { SECTION_GROUPS } from "@/content/schema";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Site administration</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Everything on the public website can be edited here — text, photos, logos, events, news,
        contact details and social links. Changes go live immediately. Upload photos in the library
        first, then pick them inside any section.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <QuickCard to="/admin/media" title="Photo & logo library" body="Upload or remove images." />
        <QuickCard to="/admin/messages" title="Enquiries" body="Messages from the contact form." />
        <QuickCard to="/admin/users" title="Users & roles" body="Who can edit the site." />
      </div>

      <div className="mt-10 space-y-8">
        {Object.entries(SECTION_GROUPS).map(([group, sections]) => (
          <section key={group}>
            <h2 className="font-display text-xl font-semibold">{group}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {sections.map((s) => (
                <li key={s.key}>
                  <Link
                    to="/admin/content/$key"
                    params={{ key: s.key }}
                    className="block rounded-sm border border-border bg-card px-4 py-3 text-sm hover:border-gold"
                  >
                    <span className="font-medium">{s.label}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{s.page}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function QuickCard({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <Link
      to={to}
      className="rounded-sm border border-border bg-card p-4 text-sm hover:border-gold"
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
    </Link>
  );
}
