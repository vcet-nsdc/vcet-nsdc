import { NextResponse } from 'next/server';

/**
 * Standard API response envelope helpers. Every route should return through
 * these so clients get a consistent `{ success, data | error }` shape.
 */
export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(code: string, message: string, status = 400): NextResponse {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

/** Maps unexpected errors to a safe response without leaking internals. */
export function handleRouteError(error: unknown): NextResponse {
  console.error('[api] error:', error);
  if (
    error instanceof Error &&
    (error.message.includes('ETIMEOUT') || error.message.includes('ECONNREFUSED'))
  ) {
    return fail('DB_UNAVAILABLE', 'Database connection failed. Please try again.', 503);
  }
  return fail('INTERNAL', 'Internal Server Error', 500);
}

export interface Pagination {
  page: number;
  limit: number;
  skip: number;
}

export function getPagination(
  searchParams: URLSearchParams,
  defaultLimit = 25,
  maxLimit = 100
): Pagination {
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);
  const rawLimit = parseInt(searchParams.get('limit') ?? String(defaultLimit), 10) || defaultLimit;
  const limit = Math.min(maxLimit, Math.max(1, rawLimit));
  return { page, limit, skip: (page - 1) * limit };
}

export function paginated<T>(data: T[], total: number, p: Pagination, status = 200): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      pagination: {
        page: p.page,
        limit: p.limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / p.limit)),
      },
    },
    { status }
  );
}
