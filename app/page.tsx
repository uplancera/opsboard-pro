import Link from "next/link";
import { ArrowRight, Brain, Building2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="card overflow-hidden p-8 md:p-12">
          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-center">
            <div>
              <p className="kicker"><Sparkles className="h-3.5 w-3.5" />Portfolio-ready B2B admin panel</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">OpsBoard Pro</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">A production-style SaaS operations dashboard with multi-tenant accounts, billing, support workflows, audit visibility, and AI-flavored insights.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login"><Button className="px-5 py-3">Open demo <ArrowRight className="h-4 w-4" /></Button></Link>
                <a href="https://github.com" target="_blank" rel="noreferrer"><Button variant="secondary" className="px-5 py-3">Publish to GitHub</Button></a>
              </div>
              <div className="mt-6 rounded-[26px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                Demo login after seeding: <span className="font-semibold text-slate-900">owner@opsboard.dev / demo1234</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700"><Building2 className="h-5 w-5" /></div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">Multi-tenant foundation</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Organizations, memberships, feature flags, API keys, and audit logs.</p>
              </div>
              <div className="card p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><ShieldCheck className="h-5 w-5" /></div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">Demo-ready auth</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Credential login, protected dashboard routes, and cleaner session handling.</p>
              </div>
              <div className="card p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-700"><Brain className="h-5 w-5" /></div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">AI-style insights</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Surface account health and operational risk in a way that feels modern.</p>
              </div>
              <div className="card p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"><Sparkles className="h-5 w-5" /></div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">Polished UI shell</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Softer surfaces, stronger hierarchy, and a more credible SaaS visual style.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// history:018 2025-01-25
// history:031 2025-02-09
// history:059 2025-03-14
// history:117 2025-05-23