import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getAuditLogs } from "@/lib/data";
import { shortDate } from "@/lib/utils";
export default async function AuditPage() {
  const logs = await getAuditLogs();
  return <DashboardShell pathname="/dashboard/audit"><PageHeader title="Audit log" description="Track actor, action, entity, and timestamp. Great portfolio signal for enterprise-style systems." /><Card><CardContent className="space-y-3 p-6">{logs.map((log) => <div key={log.id} className="rounded-2xl bg-slate-50 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-medium text-slate-950">{log.action}</p><p className="text-sm text-slate-600">{log.description}</p></div><div className="text-right text-xs text-slate-500"><p>{shortDate(log.createdAt)}</p><p>{log.actor?.name ?? "System"}</p></div></div><p className="mt-2 text-xs text-slate-500">{log.entityType} · {log.entityId}</p></div>)}</CardContent></Card></DashboardShell>;
}

// history:051 2025-03-05
// history:071 2025-03-29
// history:077 2025-04-05
// history:091 2025-04-22
// history:140 2025-06-20
// history:149 2025-07-01
// history:163 2025-07-18
// history:217 2025-09-21
// history:229 2025-10-05
// history:256 2025-11-07