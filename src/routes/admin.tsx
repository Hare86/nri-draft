import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";
import { SECTION_GROUPS } from "@/content/schema";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Site admin — NRI Educational Trust" },
      {
        name: "description",
        content: "Manage website content, photos and enquiries for the NRI Educational Trust.",
      },
      { property: "og:title", content: "Site admin — NRI Educational Trust" },
      { property: "og:description", content: "Private content management area." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { session, canEdit, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  if (loading) {
    return <div className="p-10 text-sm text-muted-foreground">Loading admin…</div>;
  }
  if (!session) return null;

  if (!canEdit) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold">No editing access</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your account ({session.user.email}) does not have admin or editor rights. Ask an
          administrator to grant access.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[260px_1fr] lg:px-8">
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-sm border border-border bg-card p-4">
          <p className="text-xs tracking-[0.2em] text-maroon uppercase">Signed in</p>
          <p className="mt-1 truncate text-sm font-medium">{session.user.email}</p>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/">
                <ExternalLink className="h-3.5 w-3.5" /> View site
              </Link>
            </Button>
          </div>
        </div>

        <nav className="mt-4 space-y-5 rounded-sm border border-border bg-card p-4 text-sm">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Manage</p>
            <ul className="mt-2 space-y-1">
              <li>
                <AdminLink to="/admin">Dashboard</AdminLink>
              </li>
              <li>
                <AdminLink to="/admin/media">Photo & logo library</AdminLink>
              </li>
              <li>
                <AdminLink to="/admin/messages">Enquiries</AdminLink>
              </li>
              {isAdmin && (
                <li>
                  <AdminLink to="/admin/users">Users & roles</AdminLink>
                </li>
              )}
            </ul>
          </div>

          {Object.entries(SECTION_GROUPS).map(([group, sections]) => (
            <div key={group}>
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{group}</p>
              <ul className="mt-2 space-y-1">
                {sections.map((s) => (
                  <li key={s.key}>
                    <Link
                      to="/admin/content/$key"
                      params={{ key: s.key }}
                      className="block rounded-sm px-2 py-1 hover:bg-muted"
                      activeProps={{ className: "block rounded-sm px-2 py-1 bg-muted font-medium" }}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

function AdminLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="block rounded-sm px-2 py-1 hover:bg-muted"
      activeProps={{ className: "block rounded-sm px-2 py-1 bg-muted font-medium" }}
    >
      {children}
    </Link>
  );
}
