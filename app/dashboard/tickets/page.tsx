import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CreateTicketForm } from "@/components/create-forms";
import { getTickets } from "@/lib/data";
import { shortDate } from "@/lib/utils";
export default async function TicketsPage() {
  const tickets = await getTickets();
  return <DashboardShell pathname="/dashboard/tickets"><PageHeader title="Support queue" description="Tickets linked to customers, creators, assignees, priorities, and SLA dates." /><div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]"><Card><CardContent className="p-6"><table><thead><tr><th>Issue</th><th>Customer</th><th>Status</th><th>Priority</th><th>Assignee</th><th>SLA due</th></tr></thead><tbody>{tickets.map((ticket) => <tr key={ticket.id}><td><div className="font-medium text-slate-950">{ticket.title}</div><div className="text-sm text-slate-500">{ticket.description}</div></td><td>{ticket.customer.company}</td><td><Badge value={ticket.status} /></td><td><Badge value={ticket.priority} /></td><td>{ticket.assignedTo?.name ?? "Unassigned"}</td><td>{shortDate(ticket.slaDueAt)}</td></tr>)}</tbody></table></CardContent></Card><CreateTicketForm /></div></DashboardShell>;
}

// history:019 2025-01-26
// history:033 2025-02-12
// history:041 2025-02-21
// history:043 2025-02-24
// history:052 2025-03-06
// history:062 2025-03-19
// history:081 2025-04-10
// history:084 2025-04-13
// history:139 2025-06-19
// history:157 2025-07-10
// history:205 2025-09-06