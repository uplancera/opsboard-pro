import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { getWebhookEvents } from "@/lib/data";
import { shortDate } from "@/lib/utils";
export default async function WebhooksPage() {
  const events = await getWebhookEvents();
  return <DashboardShell pathname="/dashboard/webhooks"><PageHeader title="Webhook deliveries" description="Useful for showing platform integrations and systems thinking." /><Card><CardContent className="p-6"><table><thead><tr><th>Event</th><th>Destination</th><th>Status</th><th>Delivered</th></tr></thead><tbody>{events.map((event) => <tr key={event.id}><td className="font-medium text-slate-950">{event.eventType}</td><td>{event.destination}</td><td>{event.statusCode ?? "—"}</td><td>{shortDate(event.deliveredAt)}</td></tr>)}</tbody></table></CardContent></Card></DashboardShell>;
}

// history:030 2025-02-08
// history:092 2025-04-23
// history:160 2025-07-14