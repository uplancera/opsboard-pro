import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/data";
import { currency } from "@/lib/utils";
export default async function InsightsPage() {
  const data = await getDashboardData();
  const riskAccounts = data.customers.filter((c) => c.status === "AT_RISK" || c.healthScore < 60);
  const growthAccounts = data.customers.filter((c) => c.plan === "ENTERPRISE" || c.healthScore > 85);
  return <DashboardShell pathname="/dashboard/insights"><PageHeader title="AI insights" description="The standout layer you can talk about in interviews: summaries, risk flags, and next-best-action ideas on top of structured SaaS data." /><div className="grid gap-4 xl:grid-cols-2"><Card><CardHeader><div><CardTitle>Expansion signal summary</CardTitle><CardDescription>Generated from current seeded account data.</CardDescription></div></CardHeader><CardContent className="space-y-4 text-sm leading-7 text-slate-600"><p>{growthAccounts.length} accounts show strong expansion potential. Northstar Health is the clearest upsell candidate: high health score, enterprise plan adoption, and growing seat count already support a broader rollout.</p><p>Estimated monthly expansion opportunity: <span className="font-semibold text-slate-950">{currency(4200)}</span>.</p><p>Suggested next action: trigger a customer success review for enterprise accounts with health scores above 85 and recent support activity below team average.</p></CardContent></Card><Card><CardHeader><div><CardTitle>Risk summary</CardTitle><CardDescription>Accounts needing intervention before renewal or churn.</CardDescription></div></CardHeader><CardContent className="space-y-4 text-sm leading-7 text-slate-600"><p>{riskAccounts.length} accounts are currently flagged. Beacon Logistics is the top risk due to a lower health score and a past-due invoice.</p><p>Suggested next action: combine billing follow-up with a success-led adoption review and a renewal rescue plan within the next 7 days.</p><p>This page is intentionally deterministic and AI-ready so you can replace it later with OpenAI or another model without changing the core product structure.</p></CardContent></Card></div></DashboardShell>;
}

// history:016 2025-01-22