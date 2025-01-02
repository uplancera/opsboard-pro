import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      memberships: {
        organizationId: string;
        organizationSlug: string;
        organizationName: string;
        role: string;
      }[];
    };
  }

  interface User {
    memberships?: {
      organizationId: string;
      organizationSlug: string;
      organizationName: string;
      role: string;
    }[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    memberships?: {
      organizationId: string;
      organizationSlug: string;
      organizationName: string;
      role: string;
    }[];
  }
}
