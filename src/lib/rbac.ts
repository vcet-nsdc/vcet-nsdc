import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { can, Permission } from '@/config/permissions';
import type { Role } from '@/config/roles';

export interface AuthedContext {
  userId: string;
  role: Role;
}

type GuardResult =
  | { error: NextResponse; ctx?: undefined }
  | { error?: undefined; ctx: AuthedContext };

/**
 * Route-handler guard. Returns `{ error }` (a ready-to-return NextResponse) if
 * the caller is unauthenticated or lacks the permission, otherwise `{ ctx }`.
 *
 * Usage:
 *   const guard = await requirePermission('registration:read');
 *   if (guard.error) return guard.error;
 *   const { userId, role } = guard.ctx;
 */
export async function requirePermission(permission: Permission): Promise<GuardResult> {
  const session = await auth();

  if (!session?.user) {
    return {
      error: NextResponse.json(
        { success: false, error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } },
        { status: 401 }
      ),
    };
  }

  const role = session.user.role;
  if (!can(role, permission)) {
    return {
      error: NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
        { status: 403 }
      ),
    };
  }

  return { ctx: { userId: session.user.id, role } };
}
