import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getApiKeys } from "@/lib/data";
import { shortDate } from "@/lib/utils";
export default async function ApiKeysPage() {
  const apiKeys = await getApiKeys();
  return <DashboardShell pathname="/dashboard/api-keys"><PageHeader title="API keys" description="Another enterprise-style module that makes the project feel closer to a real control plane." /><Card><CardContent className="p-6"><table><thead><tr><th>Label</th><th>Preview</th><th>Created</th><th>Last used</th></tr></thead><tbody>{apiKeys.map((apiKey) => <tr key={apiKey.id}><td className="font-medium text-slate-950">{apiKey.label}</td><td>{apiKey.keyPreview}</td><td>{shortDate(apiKey.createdAt)}</td><td>{shortDate(apiKey.lastUsedAt)}</td></tr>)}</tbody></table></CardContent></Card></DashboardShell>;
}

// history:005 2025-01-09
// history:007 2025-01-12
// history:042 2025-02-22
// history:070 2025-03-28
// history:076 2025-04-04
// history:104 2025-05-08
// history:110 2025-05-15
// history:146 2025-06-28
// history:167 2025-07-22
// history:184 2025-08-12