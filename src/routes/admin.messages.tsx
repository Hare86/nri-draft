import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

function AdminMessages() {
  const { data, isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id,name,email,subject,message,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Enquiries</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Messages submitted through the contact form.
      </p>

      {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}
      {!isLoading && !data?.length && (
        <p className="mt-6 rounded-sm border border-dashed border-border p-6 text-sm text-muted-foreground">
          No enquiries yet.
        </p>
      )}

      <ul className="mt-6 space-y-4">
        {data?.map((m) => (
          <li key={m.id} className="rounded-sm border border-border bg-card p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium">
                {m.name} · <span className="text-sm text-muted-foreground">{m.email}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(m.created_at).toLocaleString()}
              </p>
            </div>
            <p className="mt-1 text-xs tracking-[0.16em] text-maroon uppercase">{m.subject}</p>
            <p className="mt-3 text-sm whitespace-pre-wrap text-muted-foreground">{m.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
