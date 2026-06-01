import { NextRequest } from 'next/server';
import { requirePermission } from '@/lib/rbac';
import { ok, fail, handleRouteError } from '@/server/http';
import {
  reviewRegistration,
  setPaymentStatus,
  type ActorMeta,
  type ReviewAction,
  type PaymentAction,
} from '@/server/services/registrationService';

const REVIEW_ACTIONS: ReviewAction[] = ['approve', 'reject', 'waitlist'];
const PAYMENT_ACTIONS: PaymentAction[] = ['verify-payment', 'reject-payment'];

function clientMeta(req: NextRequest, userId: string, role: string): ActorMeta {
  const forwarded = req.headers.get('x-forwarded-for');
  return {
    userId,
    role,
    ip: forwarded ? (forwarded.split(',')[0]?.trim() ?? undefined) : undefined,
    userAgent: req.headers.get('user-agent') ?? undefined,
  };
}

// Admin: approve / reject / waitlist a registration, or verify / reject its payment.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requirePermission('registration:approve');
  if (guard.error) return guard.error;

  try {
    const { id } = await params;
    const body = await req.json();
    const action = body?.action;
    const note = typeof body?.note === 'string' ? body.note : undefined;
    const meta = clientMeta(req, guard.ctx.userId, guard.ctx.role);

    if (REVIEW_ACTIONS.includes(action)) {
      const result = await reviewRegistration(id, action, meta, note);
      if (!result) return fail('NOT_FOUND', 'Registration not found', 404);
      if ('error' in result) return fail('PAYMENT_REJECTED', 'Cannot approve: payment was rejected', 409);
      return ok(result.data);
    }

    if (PAYMENT_ACTIONS.includes(action)) {
      const result = await setPaymentStatus(id, action, meta, note);
      if (!result) return fail('NOT_FOUND', 'Registration not found', 404);
      return ok(result.data);
    }

    return fail('VALIDATION', 'Invalid action', 422);
  } catch (error) {
    return handleRouteError(error);
  }
}
