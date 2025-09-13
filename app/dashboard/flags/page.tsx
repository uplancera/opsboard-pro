import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getFeatureFlags } from "@/lib/data";
export default async function FeatureFlagsPage() {
  const flags = await getFeatureFlags();
  return <DashboardShell pathname="/dashboard/flags"><PageHeader title="Feature flags" description="Feature-flag management is a small touch that makes a SaaS admin panel feel more operationally complete." /><Card><CardContent className="p-6"><table><thead><tr><th>Flag</th><th>Description</th><th>Enabled</th></tr></thead><tbody>{flags.map((flag) => <tr key={flag.id}><td className="font-medium text-slate-950">{flag.key}</td><td>{flag.description ?? "—"}</td><td>{flag.enabled ? "Yes" : "No"}</td></tr>)}</tbody></table></CardContent></Card></DashboardShell>;
}

// history:057 2025-03-12
// history:066 2025-03-23
// history:131 2025-06-09
// history:135 2025-06-14
// history:137 2025-06-17
// history:180 2025-08-07
// history:183 2025-08-10
// history:199 2025-08-30
// history:203 2025-09-04
// history:211 2025-09-13