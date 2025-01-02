import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUserMemberships } from "@/lib/data";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = schema.safeParse(raw);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
        if (!user) return null;
        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!valid) return null;
        const memberships = await getUserMemberships(user.id);
        return { id: user.id, name: user.name, email: user.email, memberships };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.memberships = (user as { memberships?: unknown }).memberships ?? [];
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.memberships = (token.memberships as { organizationId: string; organizationSlug: string; organizationName: string; role: string }[]) ?? [];
      }
      return session;
    },
  },
});
