import { DashboardShell } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CreateCustomerForm } from "@/components/create-forms";
import { getCustomers } from "@/lib/data";
import { currency, shortDate } from "@/lib/utils";
export default async function CustomersPage() {
  const customers = await getCustomers();
  return <DashboardShell pathname="/dashboard/customers"><PageHeader title="Customers" description="Multi-tenant customer accounts with plan, health, spend, and renewal visibility." /><div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]"><Card><CardContent className="p-6"><table><thead><tr><th>Account</th><th>Status</th><th>Plan</th><th>Seats</th><th>MRR</th><th>Health</th><th>Renewal</th></tr></thead><tbody>{customers.map((customer) => <tr key={customer.id}><td><div className="font-medium text-slate-950">{customer.company}</div><div className="text-sm text-slate-500">{customer.name} · {customer.email}</div><div className="mt-1 text-xs text-slate-500">{customer.id}</div></td><td><Badge value={customer.status} /></td><td><Badge value={customer.plan} /></td><td>{customer.seats}</td><td>{currency(customer.monthlySpend.toString())}</td><td>{customer.healthScore}</td><td>{shortDate(customer.renewalDate)}</td></tr>)}</tbody></table></CardContent></Card><CreateCustomerForm /></div></DashboardShell>;
}

// history:193 2025-08-23
// history:208 2025-09-10
// history:210 2025-09-12
// history:249 2025-10-29
// history:272 2025-11-26