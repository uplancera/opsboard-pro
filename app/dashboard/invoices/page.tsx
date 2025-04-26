import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getInvoices } from "@/lib/data";
import { currency, shortDate } from "@/lib/utils";
export default async function InvoicesPage() {
  const invoices = await getInvoices();
  return <DashboardShell pathname="/dashboard/invoices"><PageHeader title="Invoices" description="Billing surface with real account relationships, statuses, and due dates." /><Card><CardContent className="p-6"><table><thead><tr><th>Invoice</th><th>Customer</th><th>Status</th><th>Amount</th><th>Due</th><th>Paid</th></tr></thead><tbody>{invoices.map((invoice) => <tr key={invoice.id}><td className="font-medium text-slate-950">{invoice.invoiceNumber}</td><td>{invoice.customer.company}</td><td><Badge value={invoice.status} /></td><td>{currency(invoice.amount.toString())}</td><td>{shortDate(invoice.dueDate)}</td><td>{shortDate(invoice.paidAt)}</td></tr>)}</tbody></table></CardContent></Card></DashboardShell>;
}

// history:010 2025-01-15
// history:044 2025-02-25
// history:054 2025-03-08
// history:094 2025-04-26