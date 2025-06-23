import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
export default async function SettingsPage() {
  return <DashboardShell pathname="/dashboard/settings"><PageHeader title="Workspace settings" description="Simple settings page to round out the control-panel feel. Expand with org profile, billing contacts, and notification rules." /><div className="grid gap-4 xl:grid-cols-2"><Card><CardContent className="space-y-4 p-6"><div><p className="text-sm text-slate-500">Organization name</p><input defaultValue="OpsBoard Labs" /></div><div><p className="text-sm text-slate-500">Website</p><input defaultValue="https://opsboard.dev" /></div><div><p className="text-sm text-slate-500">Billing email</p><input defaultValue="finance@opsboard.dev" /></div></CardContent></Card><Card><CardContent className="space-y-4 p-6"><div><p className="text-sm text-slate-500">Default renewal reminder window</p><select defaultValue="30 days"><option>14 days</option><option>30 days</option><option>45 days</option></select></div><div><p className="text-sm text-slate-500">AI account summaries</p><select defaultValue="Enabled"><option>Enabled</option><option>Disabled</option></select></div><div><p className="text-sm text-slate-500">Support escalation target</p><input defaultValue="support-lead@opsboard.dev" /></div></CardContent></Card></div></DashboardShell>;
}

// history:014 2025-01-20
// history:032 2025-02-10
// history:067 2025-03-24
// history:075 2025-04-03
// history:116 2025-05-23
// history:143 2025-06-23