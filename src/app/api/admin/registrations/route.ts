import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { requirePermission } from '@/lib/rbac';
import { getPagination, paginated, handleRouteError } from '@/server/http';
import type { FilterQuery } from 'mongoose';
import type { IRegistration } from '@/models/Registration';

export async function GET(req: NextRequest) {
  const guard = await requirePermission('registration:read');
  if (guard.error) return guard.error;

  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    const status = searchParams.get('status');
    const pagination = getPagination(searchParams, 50);

    const filter: FilterQuery<IRegistration> = {};
    if (domain && domain !== 'all') filter.domain = domain;
    if (status && status !== 'all') filter.status = status;

    const [registrations, total] = await Promise.all([
      Registration.find(filter, { paymentScreenshot: 0 })
        .sort({ createdAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean(),
      Registration.countDocuments(filter),
    ]);

    const data = registrations.map((r) => ({ ...r, hasScreenshot: true }));

    return paginated(data, total, pagination);
  } catch (error: unknown) {
    return handleRouteError(error);
  }
}
