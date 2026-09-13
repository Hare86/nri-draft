import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useAuth, type AppRole } from "@/lib/use-auth";
import { listUsersWithRoles, setUserRole } from "@/lib/admin-users.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

const ROLES: AppRole[] = ["admin", "editor", "viewer"];

function AdminUsers() {
  const { isAdmin, user } = useAuth();
  const qc = useQueryClient();
  const fetchUsers = useServerFn(listUsersWithRoles);
  const updateRole = useServerFn(setUserRole);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    enabled: isAdmin,
    queryFn: () => fetchUsers(),
  });

  if (!isAdmin) {
    return (
      <p className="text-sm text-muted-foreground">
        Only administrators can manage users and roles.
      </p>
    );
  }

  async function toggle(userId: string, role: AppRole, has: boolean) {
    try {
      await updateRole({ data: { userId, role, grant: !has } });
      await qc.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Roles updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update role");
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Users & roles</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        <strong>Admin</strong> can edit everything and manage users. <strong>Editor</strong> can
        edit content and photos. <strong>Viewer</strong> has no editing rights. New people sign up
        at the sign-in page, then you grant them a role here.
      </p>

      {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}

      <ul className="mt-6 space-y-3">
        {data?.map((u) => (
          <li
            key={u.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border bg-card p-4"
          >
            <div>
              <p className="font-medium">{u.full_name || u.email}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((role) => {
                const has = u.roles.includes(role);
                return (
                  <Button
                    key={role}
                    size="sm"
                    variant={has ? "default" : "outline"}
                    className={has ? "bg-navy text-cream" : ""}
                    disabled={u.id === user?.id && role === "admin"}
                    onClick={() => toggle(u.id, role, has)}
                  >
                    {role}
                  </Button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
