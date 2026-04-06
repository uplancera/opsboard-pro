import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole, CustomerStatus, PlanTier, InvoiceStatus, TicketPriority, TicketStatus } from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString, ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = process.env.DEMO_PASSWORD ?? "demo1234";
  const passwordHash = await bcrypt.hash(password, 10);

  const owner = await prisma.user.upsert({
    where: { email: process.env.DEMO_EMAIL ?? "owner@opsboard.dev" },
    update: { passwordHash, name: "Niraj Vovra", title: "Founder / Admin" },
    create: {
      name: "Niraj Vovra",
      email: process.env.DEMO_EMAIL ?? "owner@opsboard.dev",
      passwordHash,
      title: "Founder / Admin",
    },
  });

  const analyst = await prisma.user.upsert({
    where: { email: "analyst@opsboard.dev" },
    update: {},
    create: { name: "Maya Chen", email: "analyst@opsboard.dev", passwordHash, title: "Revenue Analyst" },
  });

  const support = await prisma.user.upsert({
    where: { email: "support@opsboard.dev" },
    update: {},
    create: { name: "Jordan Lee", email: "support@opsboard.dev", passwordHash, title: "Support Lead" },
  });

  const org = await prisma.organization.upsert({
    where: { slug: "opsboard-labs" },
    update: {},
    create: { name: "OpsBoard Labs", slug: "opsboard-labs", website: "https://opsboard.dev" },
  });

  for (const item of [
    { userId: owner.id, organizationId: org.id, role: UserRole.OWNER },
    { userId: analyst.id, organizationId: org.id, role: UserRole.ANALYST },
    { userId: support.id, organizationId: org.id, role: UserRole.SUPPORT },
  ]) {
    await prisma.membership.upsert({
      where: { userId_organizationId: { userId: item.userId, organizationId: item.organizationId } },
      update: item,
      create: item,
    });
  }

  const customers = [
    {
      name: "Avery Brooks",
      company: "Northstar Health",
      email: "avery@northstarhealth.com",
      status: CustomerStatus.ACTIVE,
      plan: PlanTier.ENTERPRISE,
      monthlySpend: "8200.00",
      healthScore: 91,
      seats: 65,
    },
    {
      name: "Priya Desai",
      company: "Beacon Logistics",
      email: "priya@beaconlogistics.com",
      status: CustomerStatus.AT_RISK,
      plan: PlanTier.SCALE,
      monthlySpend: "4200.00",
      healthScore: 58,
      seats: 28,
    },
    {
      name: "Marcus Hill",
      company: "Lattice Commerce",
      email: "marcus@latticecommerce.com",
      status: CustomerStatus.TRIAL,
      plan: PlanTier.GROWTH,
      monthlySpend: "1200.00",
      healthScore: 76,
      seats: 12,
    },
    {
      name: "Sara Kim",
      company: "Summit Retail Group",
      email: "sara@summitretail.com",
      status: CustomerStatus.CHURNED,
      plan: PlanTier.STARTER,
      monthlySpend: "450.00",
      healthScore: 22,
      seats: 4,
    },
  ] satisfies Array<{
    name: string;
    company: string;
    email: string;
    status: CustomerStatus;
    plan: PlanTier;
    monthlySpend: string;
    healthScore: number;
    seats: number;
  }>;

  for (const customer of customers) {
    await prisma.customer.create({
      data: {
        organizationId: org.id,
        ...customer,
      },
    }).catch(() => undefined);
  }

  const savedCustomers = await prisma.customer.findMany({ where: { organizationId: org.id } });
  const byCompany = Object.fromEntries(savedCustomers.map((c) => [c.company, c]));

  const invoices = [
    ["INV-2401", "Northstar Health", "8200.00", InvoiceStatus.PAID, new Date("2026-03-01"), new Date("2026-02-28")],
    ["INV-2402", "Beacon Logistics", "4200.00", InvoiceStatus.PAST_DUE, new Date("2026-03-20"), null],
    ["INV-2403", "Lattice Commerce", "1200.00", InvoiceStatus.OPEN, new Date("2026-04-15"), null],
  ];
  for (const [invoiceNumber, customerName, amount, status, dueDate, paidAt] of invoices) {
    const customer = byCompany[customerName as string];
    if (!customer) continue;
    await prisma.invoice.upsert({
      where: { organizationId_invoiceNumber: { organizationId: org.id, invoiceNumber: invoiceNumber as string } },
      update: {},
      create: { organizationId: org.id, customerId: customer.id, invoiceNumber: invoiceNumber as string, amount, status, dueDate, paidAt },
    });
  }

  const tickets = [
    ["SSO provisioning is failing for 2 users", "Northstar Health", "Okta sync and seat assignment mismatch.", TicketPriority.HIGH, TicketStatus.IN_PROGRESS, support.id],
    ["Invoice export missing tax breakdown", "Beacon Logistics", "Finance team needs a tax-aware CSV export.", TicketPriority.URGENT, TicketStatus.OPEN, analyst.id],
    ["Need onboarding checklist", "Lattice Commerce", "Trial team wants a rollout checklist.", TicketPriority.MEDIUM, TicketStatus.WAITING_ON_CUSTOMER, support.id],
  ];
  for (const [title, customerName, description, priority, status, assignedToId] of tickets) {
    const customer = byCompany[customerName as string];
    if (!customer) continue;
    await prisma.ticket.create({
      data: { organizationId: org.id, customerId: customer.id, createdById: owner.id, assignedToId: assignedToId as string, title: title as string, description: description as string, priority, status },
    }).catch(() => undefined);
  }

  for (const flag of [
    { key: "ai-insights", enabled: true, description: "AI-generated summaries and account risks." },
    { key: "sso", enabled: true, description: "Enterprise single sign-on." },
    { key: "audit-export", enabled: false, description: "Audit CSV export." },
  ]) {
    await prisma.featureFlag.upsert({
      where: { organizationId_key: { organizationId: org.id, key: flag.key } },
      update: flag,
      create: { organizationId: org.id, ...flag },
    });
  }

  for (const apiKey of [
    { label: "Production API", keyPreview: "opb_live_51h...R2" },
    { label: "Warehouse Sync", keyPreview: "opb_live_83d...NA" },
  ]) {
    await prisma.apiKey.create({ data: { organizationId: org.id, ...apiKey } }).catch(() => undefined);
  }

  for (const event of [
    { eventType: "invoice.paid", destination: "https://example.com/webhooks/accounting", statusCode: 200, deliveredAt: new Date("2026-04-04T16:10:00Z") },
    { eventType: "ticket.created", destination: "https://example.com/webhooks/support", statusCode: 202, deliveredAt: new Date("2026-04-05T11:30:00Z") },
  ]) {
    await prisma.webhookEvent.create({ data: { organizationId: org.id, ...event } }).catch(() => undefined);
  }

  for (const log of [
    { actorUserId: owner.id, action: "customer.updated", entityType: "Customer", entityId: "Beacon Logistics", description: "Marked Beacon Logistics as at risk after renewal review." },
    { actorUserId: analyst.id, action: "invoice.flagged", entityType: "Invoice", entityId: "INV-2402", description: "Past-due invoice escalated to billing team." },
    { actorUserId: support.id, action: "ticket.assigned", entityType: "Ticket", entityId: "SSO provisioning", description: "Assigned SSO issue to support lead." },
  ]) {
    await prisma.auditLog.create({ data: { organizationId: org.id, ...log } }).catch(() => undefined);
  }

  console.log(`Seed complete. Demo login: ${process.env.DEMO_EMAIL ?? "owner@opsboard.dev"} / ${password}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
