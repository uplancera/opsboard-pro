"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { ArrowRight, Loader2, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("owner@opsboard.dev");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        redirectTo: "/dashboard",
      });

      if (!result || !result.ok || result.error) {
        setError("Invalid email or password. Use the seeded demo account shown below.");
        setLoading(false);
        return;
      }

      window.location.href = result.url ?? "/dashboard";
    } catch {
      setError("Sign-in failed. Check your database seed and AUTH_SECRET, then try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-600">Email address</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="pl-11"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@opsboard.dev"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-600">Password</label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="pl-11"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="demo1234"
            autoComplete="current-password"
            required
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <Button type="submit" className="w-full justify-center py-3 text-sm" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Signing in..." : "Sign in to demo workspace"}
        {!loading ? <ArrowRight className="h-4 w-4" /> : null}
      </Button>
    </form>
  );
}

// history:003 2025-01-07
// history:006 2025-01-10
// history:008 2025-01-13
// history:009 2025-01-14
// history:034 2025-02-12
// history:053 2025-03-08
// history:144 2025-06-24
// history:192 2025-08-21
// history:220 2025-09-24
// history:262 2025-11-14
// history:281 2025-12-07
// history:292 2025-12-19