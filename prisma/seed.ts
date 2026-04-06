import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  UserRole,
  CustomerStatus,
  PlanTier,
  InvoiceStatus,
  TicketPriority,
  TicketStatus,
} from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
  ssl: connectionString.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const password = process.env.DEMO_PASSWORD ?? "demo1234";
  const demoEmail = process.env.DEMO_EMAIL ?? "owner@opsboard.dev";
  const passwordHash = await bcrypt.hash(password, 10);

  const owner = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {
      passwordHash,
      name: "Niraj Vovra",
      title: "Founder / Admin",
    },
    create: {
      name: "Niraj Vovra",
      email: demoEmail,
      passwordHash,
      title: "Founder / Admin",
    },
  });

  const analyst = await prisma.user.upsert({
    where: { email: "analyst@opsboard.dev" },
    update: {},
    create: {
      name: "Maya Chen",
      email: "analyst@opsboard.dev",
      passwordHash,
      title: "Revenue Analyst",
    },
  });

  const support = await prisma.user.upsert({
    where: { email: "support@opsboard.dev" },
    update: {},
    create: {
      name: "Jordan Lee",
      email: "support@opsboard.dev",
      passwordHash,
      title: "Support Lead",
    },
  });

  const org = await prisma.organization.upsert({
    where: { slug: "opsboard-labs" },
    update: {},
    create: {
      name: "OpsBoard Labs",
      slug: "opsboard-labs",
      website: "https://opsboard.dev",
    },
  });

  const memberships = [
    { userId: owner.id, organizationId: org.id, role: UserRole.OWNER },
    { userId: analyst.id, organizationId: org.id, role: UserRole.ANALYST },
    { userId: support.id, organizationId: org.id, role: UserRole.SUPPORT },
  ] satisfies Array<{
    userId: string;
    organizationId: string;
    role: UserRole;
  }>;

  for (const membership of memberships) {
    await prisma.membership.upsert({
      where: {
        userId_organizationId: {
          userId: membership.userId,
          organizationId: membership.organizationId,
        },
      },
      update: membership,
      create: membership,
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
    await prisma.customer
      .create({
        data: {
          organizationId: org.id,
          ...customer,
        },
      })
      .catch(() => undefined);
  }

  const savedCustomers = await prisma.customer.findMany({
    where: { organizationId: org.id },
  });

  const byCompany = Object.fromEntries(
    savedCustomers.map((customer) => [customer.company, customer]),
  ) as Record<string, (typeof savedCustomers)[number]>;

  const invoices = [
    {
      invoiceNumber: "INV-2401",
      customerCompany: "Northstar Health",
      amount: "8200.00",
      status: InvoiceStatus.PAID,
      dueDate: new Date("2026-03-01"),
      paidAt: new Date("2026-02-28"),
    },
    {
      invoiceNumber: "INV-2402",
      customerCompany: "Beacon Logistics",
      amount: "4200.00",
      status: InvoiceStatus.PAST_DUE,
      dueDate: new Date("2026-03-20"),
      paidAt: null,
    },
    {
      invoiceNumber: "INV-2403",
      customerCompany: "Lattice Commerce",
      amount: "1200.00",
      status: InvoiceStatus.OPEN,
      dueDate: new Date("2026-04-15"),
      paidAt: null,
    },
  ] satisfies Array<{
    invoiceNumber: string;
    customerCompany: string;
    amount: string;
    status: InvoiceStatus;
    dueDate: Date;
    paidAt: Date | null;
  }>;

  for (const invoice of invoices) {
    const customer = byCompany[invoice.customerCompany];
    if (!customer) continue;

    await prisma.invoice.upsert({
      where: {
        organizationId_invoiceNumber: {
          organizationId: org.id,
          invoiceNumber: invoice.invoiceNumber,
        },
      },
      update: {},
      create: {
        organizationId: org.id,
        customerId: customer.id,
        invoiceNumber: invoice.invoiceNumber,
        amount: invoice.amount,
        status: invoice.status,
        dueDate: invoice.dueDate,
        paidAt: invoice.paidAt,
      },
    });
  }

  const tickets = [
    {
      title: "SSO provisioning is failing for 2 users",
      customerCompany: "Northstar Health",
      description: "Okta sync and seat assignment mismatch.",
      priority: TicketPriority.HIGH,
      status: TicketStatus.IN_PROGRESS,
      assignedToId: support.id,
    },
    {
      title: "Invoice export missing tax breakdown",
      customerCompany: "Beacon Logistics",
      description: "Finance team needs a tax-aware CSV export.",
      priority: TicketPriority.URGENT,
      status: TicketStatus.OPEN,
      assignedToId: analyst.id,
    },
    {
      title: "Need onboarding checklist",
      customerCompany: "Lattice Commerce",
      description: "Trial team wants a rollout checklist.",
      priority: TicketPriority.MEDIUM,
      status: TicketStatus.WAITING_ON_CUSTOMER,
      assignedToId: support.id,
    },
  ] satisfies Array<{
    title: string;
    customerCompany: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedToId: string;
  }>;

  for (const ticket of tickets) {
    const customer = byCompany[ticket.customerCompany];
    if (!customer) continue;

    await prisma.ticket
      .create({
        data: {
          organizationId: org.id,
          customerId: customer.id,
          createdById: owner.id,
          assignedToId: ticket.assignedToId,
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          status: ticket.status,
        },
      })
      .catch(() => undefined);
  }

  const featureFlags = [
    {
      key: "ai-insights",
      enabled: true,
      description: "AI-generated summaries and account risks.",
    },
    {
      key: "sso",
      enabled: true,
      description: "Enterprise single sign-on.",
    },
    {
      key: "audit-export",
      enabled: false,
      description: "Audit CSV export.",
    },
  ] satisfies Array<{
    key: string;
    enabled: boolean;
    description: string;
  }>;

  for (const flag of featureFlags) {
    await prisma.featureFlag.upsert({
      where: {
        organizationId_key: {
          organizationId: org.id,
          key: flag.key,
        },
      },
      update: flag,
      create: {
        organizationId: org.id,
        ...flag,
      },
    });
  }

  const apiKeys = [
    { label: "Production API", keyPreview: "opb_live_51h...R2" },
    { label: "Warehouse Sync", keyPreview: "opb_live_83d...NA" },
  ] satisfies Array<{
    label: string;
    keyPreview: string;
  }>;

  for (const apiKey of apiKeys) {
    await prisma.apiKey
      .create({
        data: {
          organizationId: org.id,
          ...apiKey,
        },
      })
      .catch(() => undefined);
  }

  const webhookEvents = [
    {
      eventType: "invoice.paid",
      destination: "https://example.com/webhooks/accounting",
      statusCode: 200,
      deliveredAt: new Date("2026-04-04T16:10:00Z"),
    },
    {
      eventType: "ticket.created",
      destination: "https://example.com/webhooks/support",
      statusCode: 202,
      deliveredAt: new Date("2026-04-05T11:30:00Z"),
    },
  ] satisfies Array<{
    eventType: string;
    destination: string;
    statusCode: number;
    deliveredAt: Date;
  }>;

  for (const event of webhookEvents) {
    await prisma.webhookEvent
      .create({
        data: {
          organizationId: org.id,
          ...event,
        },
      })
      .catch(() => undefined);
  }

  const auditLogs = [
    {
      actorUserId: owner.id,
      action: "customer.updated",
      entityType: "Customer",
      entityId: "Beacon Logistics",
      description:
        "Marked Beacon Logistics as at risk after renewal review.",
    },
    {
      actorUserId: analyst.id,
      action: "invoice.flagged",
      entityType: "Invoice",
      entityId: "INV-2402",
      description: "Past-due invoice escalated to billing team.",
    },
    {
      actorUserId: support.id,
      action: "ticket.assigned",
      entityType: "Ticket",
      entityId: "SSO provisioning",
      description: "Assigned SSO issue to support lead.",
    },
  ] satisfies Array<{
    actorUserId: string;
    action: string;
    entityType: string;
    entityId: string;
    description: string;
  }>;

  for (const log of auditLogs) {
    await prisma.auditLog
      .create({
        data: {
          organizationId: org.id,
          ...log,
        },
      })
      .catch(() => undefined);
  }

  console.log(`Seed complete. Demo login: ${demoEmail} / ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });