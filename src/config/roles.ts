/**
 * Operational roles for the platform. See SYSTEM_RESTRUCTURE.md → RBAC System.
 */
export const Roles = {
  /** Super admin — full control over content, events, people, settings. */
  FACULTY_ADMIN: 'FACULTY_ADMIN',
  /** Technical operator — observability/stability only, no business-data power. */
  DEVELOPER_ADMIN: 'DEVELOPER_ADMIN',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const ALL_ROLES: Role[] = [Roles.FACULTY_ADMIN, Roles.DEVELOPER_ADMIN];

export function isRole(value: unknown): value is Role {
  return value === Roles.FACULTY_ADMIN || value === Roles.DEVELOPER_ADMIN;
}
