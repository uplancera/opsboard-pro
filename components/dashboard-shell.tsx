import Link from "next/link";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { BarChart3, Brain, CircleDollarSign, Flag, Home, KeyRound, LifeBuoy, LogOut, Search, Settings, Sparkles, Users, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  ["/dashboard", "Overview", Home],
  ["/dashboard/customers", "Customers", Users],
  ["/dashboard/invoices", "Invoices", CircleDollarSign],
  ["/dashboard/tickets", "Support", LifeBuoy],
  ["/dashboard/team", "Team", Users],
  ["/dashboard/audit", "Audit log", BarChart3],
  ["/dashboard/insights", "AI insights", Brain],
  ["/dashboard/flags", "Feature flags", Flag],
  ["/dashboard/api-keys", "API keys", KeyRound],
  ["/dashboard/webhooks", "Webhooks", Webhook],
  ["/dashboard/settings", "Settings", Settings],
] as const;

export async function DashboardShell({ children, pathname }: { children: ReactNode; pathname: string }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const membership = session.user.memberships?.[0];

  return (
    <div className="min-h-screen px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 xl:grid-cols-[280px_1fr]">
        <aside className="card sticky top-4 h-fit overflow-hidden p-4">
          <div className="rounded-[24px] bg-slate-950 px-5 py-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-200/70">OpsBoard Pro</p>
                <h1 className="mt-2 text-xl font-semibold">{membership?.organizationName ?? "Workspace"}</h1>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <Sparkles className="h-5 w-5 text-sky-200" />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">Demo-ready multi-tenant SaaS operations workspace.</p>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Logged in as</p>
            <p className="mt-2 font-semibold text-slate-900">{session.user.name}</p>
            <p className="mt-1 text-sm text-slate-500">{session.user.email}</p>
            <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{membership?.role ?? "Member"}</div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            <Search className="h-4 w-4" />
            Search dashboard, accounts, tickets...
          </div>

          <nav className="mt-4 space-y-1.5">
            {nav.map(([href, label, Icon]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--brand)] text-white shadow-[0_14px_30px_rgba(37,99,235,0.18)]"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <form
            className="mt-6"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button type="submit" variant="secondary" className="w-full justify-center">
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </form>
        </aside>

        <main className="space-y-4">
          <div className="card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Good to see you back</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Run the business from one clean workspace</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">System healthy</span>
              <span className="rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700">Demo mode</span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

// history:002 2025-01-05
// history:011 2025-01-16
// history:012 2025-01-18
// history:064 2025-03-21
// history:068 2025-03-25
// history:088 2025-04-18
// history:101 2025-05-05
// history:106 2025-05-10
// history:111 2025-05-16
// history:145 2025-06-26
// history:159 2025-07-13
// history:178 2025-08-05