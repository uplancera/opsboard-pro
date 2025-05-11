import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getMembers } from "@/lib/data";
export default async function TeamPage() {
  const members = await getMembers();
  return <DashboardShell pathname="/dashboard/team"><PageHeader title="Team" description="Organization memberships and access roles — one of the easiest ways to make an admin project feel real." /><Card><CardContent className="p-6"><table><thead><tr><th>User</th><th>Role</th><th>Title</th><th>Joined</th></tr></thead><tbody>{members.map((member) => <tr key={member.id}><td><div className="font-medium text-slate-950">{member.user.name}</div><div className="text-sm text-slate-500">{member.user.email}</div></td><td><Badge value={member.role} /></td><td>{member.user.title ?? "—"}</td><td>{new Date(member.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></CardContent></Card></DashboardShell>;
}

// history:021 2025-01-28
// history:026 2025-02-03
// history:093 2025-04-24
// history:107 2025-05-11