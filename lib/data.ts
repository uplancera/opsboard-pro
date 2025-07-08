import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hasMinimumRole, type RoleName } from "@/lib/permissions";

export async function getUserMemberships(userId: string) {
  const memberships = await prisma.membership.findMany({ where: { userId }, include: { organization: true }, orderBy: { organization: { name: "asc" } } });
  return memberships.map((m) => ({ organizationId: m.organizationId, organizationSlug: m.organization.slug, organizationName: m.organization.name, role: m.role }));
}

export async function getActiveMembership() {
  const session = await auth();
  const membership = session?.user?.memberships?.[0];
  if (!session?.user?.id || !membership) return null;
  return { userId: session.user.id, ...membership };
}

export async function requireMembership(requiredRole?: RoleName) {
  const membership = await getActiveMembership();
  if (!membership) throw new Error("Unauthorized");
  if (requiredRole && !hasMinimumRole(membership.role, requiredRole)) throw new Error("Forbidden");
  return membership;
}

export async function getDashboardData() {
  const membership = await requireMembership();
  const organizationId = membership.organizationId;
  const [customers, invoices, tickets, logs, members] = await Promise.all([
    prisma.customer.findMany({ where: { organizationId }, orderBy: { monthlySpend: "desc" } }),
    prisma.invoice.findMany({ where: { organizationId }, orderBy: { dueDate: "desc" }, include: { customer: true } }),
    prisma.ticket.findMany({ where: { organizationId }, include: { customer: true, assignedTo: true }, orderBy: { updatedAt: "desc" } }),
    prisma.auditLog.findMany({ where: { organizationId }, include: { actor: true }, orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.membership.findMany({ where: { organizationId }, include: { user: true }, orderBy: { createdAt: "asc" } }),
  ]);
  const mrr = customers.reduce((sum, c) => sum + Number(c.monthlySpend), 0);
  const openInvoices = invoices.filter((i) => i.status === "OPEN" || i.status === "PAST_DUE");
  const openTickets = tickets.filter((t) => t.status !== "CLOSED" && t.status !== "RESOLVED");
  const healthAverage = customers.length ? Math.round(customers.reduce((sum, c) => sum + c.healthScore, 0) / customers.length) : 0;
  return {
    customers, invoices, tickets, logs, members,
    metrics: {
      mrr,
      healthAverage,
      openInvoices: openInvoices.length,
      openTickets: openTickets.length,
      teamSize: members.length,
      pastDueAmount: openInvoices.filter((i) => i.status === "PAST_DUE").reduce((sum, i) => sum + Number(i.amount), 0),
    },
    revenueTrend: [{ month: "Jan", revenue: 9200 }, { month: "Feb", revenue: 10400 }, { month: "Mar", revenue: 12150 }, { month: "Apr", revenue: 14050 }, { month: "May", revenue: 15800 }, { month: "Jun", revenue: 17200 }],
    supportTrend: [{ week: "W1", created: 12, resolved: 10 }, { week: "W2", created: 15, resolved: 13 }, { week: "W3", created: 9, resolved: 11 }, { week: "W4", created: 18, resolved: 14 }],
  };
}

export const getCustomers = async () => prisma.customer.findMany({ where: { organizationId: (await requireMembership()).organizationId }, orderBy: [{ monthlySpend: "desc" }, { createdAt: "desc" }] });
export const getInvoices = async () => prisma.invoice.findMany({ where: { organizationId: (await requireMembership()).organizationId }, include: { customer: true }, orderBy: { dueDate: "desc" } });
export const getTickets = async () => prisma.ticket.findMany({ where: { organizationId: (await requireMembership()).organizationId }, include: { customer: true, assignedTo: true, createdBy: true }, orderBy: { updatedAt: "desc" } });
export const getMembers = async () => prisma.membership.findMany({ where: { organizationId: (await requireMembership("ADMIN")).organizationId }, include: { user: true, organization: true }, orderBy: { createdAt: "asc" } });
export const getFeatureFlags = async () => prisma.featureFlag.findMany({ where: { organizationId: (await requireMembership()).organizationId }, orderBy: { key: "asc" } });
export const getAuditLogs = async () => prisma.auditLog.findMany({ where: { organizationId: (await requireMembership()).organizationId }, include: { actor: true }, orderBy: { createdAt: "desc" } });
export const getApiKeys = async () => prisma.apiKey.findMany({ where: { organizationId: (await requireMembership("ADMIN")).organizationId }, orderBy: { createdAt: "desc" } });
export const getWebhookEvents = async () => prisma.webhookEvent.findMany({ where: { organizationId: (await requireMembership("ADMIN")).organizationId }, orderBy: { createdAt: "desc" } });

// history:029 2025-02-07
// history:087 2025-04-18
// history:095 2025-04-27
// history:154 2025-07-06
// history:155 2025-07-08