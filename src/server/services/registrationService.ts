import { Types } from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import type { PaymentStatus, RegistrationStatus } from '@/models/Registration';
import { recordAudit } from '@/server/services/auditService';

export interface ActorMeta {
  userId: string;
  role: string;
  ip?: string | undefined;
  userAgent?: string | undefined;
}

export type ReviewAction = 'approve' | 'reject' | 'waitlist';
export type PaymentAction = 'verify-payment' | 'reject-payment';

const STATUS_BY_ACTION: Record<ReviewAction, RegistrationStatus> = {
  approve: 'approved',
  reject: 'rejected',
  waitlist: 'waitlisted',
};

export async function reviewRegistration(
  id: string,
  action: ReviewAction,
  actor: ActorMeta,
  note?: string
) {
  await connectToDatabase();
  const reg = await Registration.findById(id);
  if (!reg) return null;

  // Guard: cannot approve a registration whose payment was rejected.
  if (action === 'approve' && reg.payment?.status === 'rejected') {
    return { error: 'PAYMENT_REJECTED' as const };
  }

  const before = { status: reg.status };
  reg.status = STATUS_BY_ACTION[action];
  reg.certificateEligible = action === 'approve';
  reg.reviewedBy = new Types.ObjectId(actor.userId);
  reg.reviewedAt = new Date();
  if (note) reg.payment.note = note;
  await reg.save();

  await recordAudit({
    actorId: actor.userId,
    actorRole: actor.role,
    action: `registration.${action}`,
    resource: { type: 'registration', id },
    before,
    after: { status: reg.status },
    ip: actor.ip,
    userAgent: actor.userAgent,
  });

  return { data: reg.toObject() };
}

export async function setPaymentStatus(
  id: string,
  action: PaymentAction,
  actor: ActorMeta,
  note?: string
) {
  await connectToDatabase();
  const reg = await Registration.findById(id);
  if (!reg) return null;

  const status: PaymentStatus = action === 'verify-payment' ? 'verified' : 'rejected';
  const before = { payment: reg.payment?.status };
  reg.payment.status = status;
  reg.payment.verifiedBy = new Types.ObjectId(actor.userId);
  reg.payment.verifiedAt = new Date();
  if (note) reg.payment.note = note;
  await reg.save();

  await recordAudit({
    actorId: actor.userId,
    actorRole: actor.role,
    action: `payment.${status}`,
    resource: { type: 'registration', id },
    before,
    after: { payment: status },
    ip: actor.ip,
    userAgent: actor.userAgent,
  });

  return { data: reg.toObject() };
}
