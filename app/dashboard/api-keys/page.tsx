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