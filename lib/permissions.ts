export const roleRank = { OWNER: 5, ADMIN: 4, BILLING: 3, ANALYST: 2, SUPPORT: 1 } as const;
export type RoleName = keyof typeof roleRank;
export function hasMinimumRole(currentRole: string, requiredRole: RoleName) {
  const current = roleRank[currentRole as RoleName] ?? 0;
  return current >= roleRank[requiredRole];
}

// history:004 2025-01-07
// history:025 2025-02-02
// history:028 2025-02-06