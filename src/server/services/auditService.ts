import { Types } from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import AuditLog from '@/models/AuditLog';
import type { Pagination } from '@/server/http';

export interface AuditEntry {
  actorId?: string | undefined;
  actorRole?: string | undefined;
  action: string;
  resource: { type: string; id?: string };
  before?: Record<string, unknown> | undefined;
  after?: Record<string, unknown> | undefined;
  ip?: string | undefined;
  userAgent?: string | undefined;
}

/**
 * Append an audit entry. Called from the service layer so privileged actions
 * cannot be performed without being recorded. Never throws into the caller —
 * a failed audit write must not break the underlying operation.
 */
export async function recordAudit(entry: AuditEntry): Promise<void> {
  try {
    await connectToDatabase();
    await AuditLog.create({
      actorId: entry.actorId ? new Types.ObjectId(entry.actorId) : undefined,
      actorRole: entry.actorRole ?? 'SYSTEM',
      action: entry.action,
      resource: entry.resource,
      before: entry.before,
      after: entry.after,
      ip: entry.ip,
      userAgent: entry.userAgent,
    });
  } catch (err) {
    console.error('[audit] failed to record entry', entry.action, err);
  }
}

export interface AuditFilter {
  action?: string | undefined;
  resourceType?: string | undefined;
  actorId?: string | undefined;
}

export async function listAudit(filter: AuditFilter, pagination: Pagination) {
  await connectToDatabase();
  const query: Record<string, unknown> = {};
  if (filter.action) query.action = filter.action;
  if (filter.resourceType) query['resource.type'] = filter.resourceType;
  if (filter.actorId) query.actorId = new Types.ObjectId(filter.actorId);

  const [items, total] = await Promise.all([
    AuditLog.find(query).sort({ createdAt: -1 }).skip(pagination.skip).limit(pagination.limit).lean(),
    AuditLog.countDocuments(query),
  ]);
  return { items, total };
}
