import { Role, Roles } from '@/config/roles';

/**
 * Authoritative permission catalogue. This is the single source of truth for
 * what each role may do. Routes and UI both derive their checks from here.
 */
export const Permissions = {
  // events / themes
  'event:create': 'event:create',
  'event:update': 'event:update',
  'event:delete': 'event:delete',
  'theme:manage': 'theme:manage',
  // registrations
  'registration:read': 'registration:read',
  'registration:approve': 'registration:approve',
  'registration:export': 'registration:export',
  'registration:delete': 'registration:delete',
  // cms
  'cms:read': 'cms:read',
  'cms:write': 'cms:write',
  'cms:publish': 'cms:publish',
  // certificates
  'certificate:manage': 'certificate:manage',
  // media
  'media:upload': 'media:upload',
  'media:delete': 'media:delete',
  // admin / settings / audit
  'admin:manage': 'admin:manage',
  'settings:business': 'settings:business',
  'settings:technical': 'settings:technical',
  'audit:read': 'audit:read',
  // developer / system
  'system:health': 'system:health',
  'system:logs': 'system:logs',
} as const;

export type Permission = keyof typeof Permissions;

const ALL_PERMISSIONS = Object.keys(Permissions) as Permission[];

/**
 * Role → permission mapping. Faculty Admin gets everything; Developer Admin is
 * strictly bounded to observability + non-sensitive technical actions.
 */
export const RolePermissions: Record<Role, Permission[]> = {
  [Roles.FACULTY_ADMIN]: ALL_PERMISSIONS,
  [Roles.DEVELOPER_ADMIN]: [
    'system:health',
    'system:logs',
    'audit:read',
    'settings:technical',
    'event:create',
    'event:update',
    'cms:read',
    'registration:read',
    'media:upload',
  ],
};

/** Returns true if the given role is granted the given permission. */
export function can(role: Role, permission: Permission): boolean {
  return RolePermissions[role].includes(permission);
}
