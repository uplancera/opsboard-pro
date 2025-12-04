export const roleRank = { OWNER: 5, ADMIN: 4, BILLING: 3, ANALYST: 2, SUPPORT: 1 } as const;
export type RoleName = keyof typeof roleRank;
export function hasMinimumRole(currentRole: string, requiredRole: RoleName) {
  const current = roleRank[currentRole as RoleName] ?? 0;
  return current >= roleRank[requiredRole];
}

// history:004 2025-01-07
// history:025 2025-02-02
// history:028 2025-02-06
// history:060 2025-03-16
// history:082 2025-04-12
// history:114 2025-05-20
// history:125 2025-06-02
// history:126 2025-06-03
// history:132 2025-06-10
// history:133 2025-06-11
// history:164 2025-07-19
// history:198 2025-08-29
// history:200 2025-08-31
// history:250 2025-10-31
// history:255 2025-11-05
// history:279 2025-12-04