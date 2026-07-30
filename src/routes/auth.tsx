import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useSession } from "@/lib/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: search.mode === "signup" ? ("signup" as const) : ("signin" as const),
  }),
  head: () => ({
    meta: [
      { title: "Sign in — NRI Trust admin" },
      {
        name: "description",
        content: "Sign in to manage the NRI Educational Trust website content and photos.",
      },
      { property: "og:title", content: "Sign in — NRI Trust admin" },
      { property: "og:description", content: "Private sign-in for trust website administrators." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const { mode: initialMode } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(initialMode);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/admin" });
  }, [loading, session, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setSentTo(email);
        toast.success("Password reset link sent. Check your inbox.");
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setSentTo(email);
        toast.success("Confirmation email sent. Please verify your address.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
  }

  async function oauth(provider: "google" | "apple") {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Sign-in failed");
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-display text-3xl font-semibold">
        {mode === "signin"
          ? "Admin sign in"
          : mode === "signup"
            ? "Create admin account"
            : "Reset your password"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Private area for trust staff managing website content.
      </p>

      {sentTo && (
        <p className="mt-6 rounded-sm border border-gold/40 bg-gold/10 p-4 text-sm">
          {mode === "signup"
            ? `We sent a confirmation email to ${sentTo}. Click the link in it to activate your account, then sign in.`
            : `We sent a password reset link to ${sentTo}. Open it to choose a new password.`}
        </p>
      )}

      <form onSubmit={submit} className="crest-frame mt-8 space-y-4 rounded-sm bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {mode !== "forgot" && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        )}
        <Button type="submit" disabled={busy} className="w-full bg-navy text-cream">
          {busy
            ? "Please wait…"
            : mode === "signin"
              ? "Sign in"
              : mode === "signup"
                ? "Create account"
                : "Send reset link"}
        </Button>
        {mode === "signin" && (
          <button
            type="button"
            onClick={() => {
              setSentTo(null);
              setMode("forgot");
            }}
            className="w-full text-sm text-muted-foreground underline underline-offset-4"
          >
            Forgot your password?
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setSentTo(null);
            setMode(mode === "signin" ? "signup" : "signin");
          }}
          className="w-full text-sm text-muted-foreground underline underline-offset-4"
        >
          {mode === "signin"
            ? "First time here? Create the admin account"
            : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
