import { redirect } from "next/navigation";
import { Activity, BarChart3, Building2, ShieldCheck, Sparkles } from "lucide-react";
import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";

const highlights = [
  ["Revenue cockpit", "MRR, invoices, account health, and billing operations in one view.", BarChart3],
  ["Support workflows", "Ticket queues, SLA risk, ownership, and team coordination.", Activity],
  ["Multi-tenant structure", "Organizations, memberships, audit logs, feature flags, and API keys.", Building2],
] as const;

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.08fr_500px]">
        <section className="relative overflow-hidden rounded-[36px] border border-slate-800/60 bg-slate-950 px-7 py-8 text-white shadow-[0_35px_100px_rgba(15,23,42,0.28)] md:px-10 md:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.35),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_26%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-sky-100 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4" />
              Personal project demo
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              A polished B2B operations dashboard you can actually show.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              OpsBoard Pro is a multi-tenant admin panel for SaaS operations, support, billing, and audit visibility.
              Use the demo workspace to explore the product experience.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {highlights.map(([title, description, Icon]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-5 w-5 text-sky-100" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card self-center p-7 md:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="kicker">OpsBoard Pro</p>
            <div className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm md:flex md:items-center md:gap-2">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" /> Demo workspace
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Use the seeded demo account below. This version uses a proper client-side credentials submit flow and redirects on success.
          </p>

          <div className="mt-6 rounded-[26px] border border-sky-100 bg-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Demo credentials</p>
            <p className="mt-3 text-sm text-slate-700"><span className="font-semibold text-slate-900">Email:</span> owner@opsboard.dev</p>
            <p className="mt-1 text-sm text-slate-700"><span className="font-semibold text-slate-900">Password:</span> demo1234</p>
          </div>

          <div className="mt-6">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}
