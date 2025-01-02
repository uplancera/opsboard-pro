import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireMembership } from "@/lib/data";
const schema = z.object({ name: z.string().min(2), company: z.string().min(2), email: z.string().email(), plan: z.enum(["STARTER", "GROWTH", "SCALE", "ENTERPRISE"]), status: z.enum(["ACTIVE", "AT_RISK", "TRIAL", "CHURNED"]), monthlySpend: z.coerce.number().min(0) });
export async function POST(request: Request) {
  try {
    const membership = await requireMembership("ADMIN");
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: "Invalid customer payload." }, { status: 400 });
    await prisma.customer.create({ data: { organizationId: membership.organizationId, name: parsed.data.name, company: parsed.data.company, email: parsed.data.email, plan: parsed.data.plan, status: parsed.data.status, monthlySpend: parsed.data.monthlySpend, healthScore: parsed.data.status === "AT_RISK" ? 55 : 80 } });
    await prisma.auditLog.create({ data: { organizationId: membership.organizationId, actorUserId: membership.userId, action: "customer.created", entityType: "Customer", entityId: parsed.data.company, description: `Created customer ${parsed.data.company}.` } });
    return NextResponse.json({ message: "Customer created." });
  } catch {
    return NextResponse.json({ message: "Unable to create customer." }, { status: 500 });
  }
}
