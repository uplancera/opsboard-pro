import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { RevenueChart, SupportChart } from "@/components/chart-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { currency, shortDate } from "@/lib/utils";
import { getDashboardData } from "@/lib/data";
export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardShell pathname="/dashboard"><PageHeader eyebrow="SaaS operations cockpit" title="Overview" description="A personal-project B2B admin panel that feels like a real SaaS workspace instead of a UI-only template." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6"><MetricCard label="MRR" value={currency(data.metrics.mrr)} delta="+12% vs last month" /><MetricCard label="Avg health score" value={`${data.metrics.healthAverage}`} delta="3 at-risk accounts flagged" /><MetricCard label="Open invoices" value={`${data.metrics.openInvoices}`} delta={`${currency(data.metrics.pastDueAmount)} past due`} /><MetricCard label="Open tickets" value={`${data.metrics.openTickets}`} delta="2 inside SLA risk window" /><MetricCard label="Team members" value={`${data.metrics.teamSize}`} delta="3 active seats" /><MetricCard label="Customer accounts" value={`${data.customers.length}`} delta="1 trial likely to convert" /></div><div className="grid gap-4 xl:grid-cols-2"><RevenueChart data={data.revenueTrend} /><SupportChart data={data.supportTrend} /></div><div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]"><Card><CardHeader><div><CardTitle>Top accounts</CardTitle><CardDescription>Revenue, plan, health, and renewal snapshot.</CardDescription></div></CardHeader><CardContent><table><thead><tr><th>Company</th><th>Status</th><th>Plan</th><th>MRR</th><th>Health</th><th>Renewal</th></tr></thead><tbody>{data.customers.map((customer) => <tr key={customer.id}><td><div className="font-medium text-slate-950">{customer.company}</div><div className="text-sm text-slate-500">{customer.email}</div></td><td><Badge value={customer.status} /></td><td><Badge value={customer.plan} /></td><td>{currency(customer.monthlySpend.toString())}</td><td>{customer.healthScore}</td><td>{shortDate(customer.renewalDate)}</td></tr>)}</tbody></table></CardContent></Card><Card><CardHeader><div><CardTitle>Recent activity</CardTitle><CardDescription>Audit events give the project a more realistic operations feel.</CardDescription></div></CardHeader><CardContent className="space-y-4">{data.logs.map((log) => <div key={log.id} className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center justify-between gap-3"><p className="font-medium text-slate-950">{log.action}</p><p className="text-xs text-slate-500">{shortDate(log.createdAt)}</p></div><p className="mt-2 text-sm text-slate-600">{log.description}</p><p className="mt-2 text-xs text-slate-500">{log.actor?.name ?? "System"} · {log.entityType} · {log.entityId}</p></div>)}</CardContent></Card></div></DashboardShell>;
}

// history:078 2025-04-07
// history:136 2025-06-15
// history:152 2025-07-04
// history:158 2025-07-12
// history:161 2025-07-15
// history:166 2025-07-21
// history:174 2025-07-31
// history:176 2025-08-02
// history:218 2025-09-22
// history:235 2025-10-12
// history:243 2025-10-22