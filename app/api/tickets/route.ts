import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireMembership } from "@/lib/data";
const schema = z.object({ customerId: z.string().min(5), title: z.string().min(5), description: z.string().min(10), priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]) });
export async function POST(request: Request) {
  try {
    const membership = await requireMembership();
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: "Invalid ticket payload." }, { status: 400 });
    await prisma.ticket.create({ data: { organizationId: membership.organizationId, customerId: parsed.data.customerId, createdById: membership.userId, title: parsed.data.title, description: parsed.data.description, priority: parsed.data.priority } });
    await prisma.auditLog.create({ data: { organizationId: membership.organizationId, actorUserId: membership.userId, action: "ticket.created", entityType: "Ticket", entityId: parsed.data.title, description: `Created ticket ${parsed.data.title}.` } });
    return NextResponse.json({ message: "Ticket created." });
  } catch {
    return NextResponse.json({ message: "Unable to create ticket." }, { status: 500 });
  }
}
