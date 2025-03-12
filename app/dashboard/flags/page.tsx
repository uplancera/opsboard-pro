import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getFeatureFlags } from "@/lib/data";
export default async function FeatureFlagsPage() {
  const flags = await getFeatureFlags();
  return <DashboardShell pathname="/dashboard/flags"><PageHeader title="Feature flags" description="Feature-flag management is a small touch that makes a SaaS admin panel feel more operationally complete." /><Card><CardContent className="p-6"><table><thead><tr><th>Flag</th><th>Description</th><th>Enabled</th></tr></thead><tbody>{flags.map((flag) => <tr key={flag.id}><td className="font-medium text-slate-950">{flag.key}</td><td>{flag.description ?? "—"}</td><td>{flag.enabled ? "Yes" : "No"}</td></tr>)}</tbody></table></CardContent></Card></DashboardShell>;
}

// history:057 2025-03-12