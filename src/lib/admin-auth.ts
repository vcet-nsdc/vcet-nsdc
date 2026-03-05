import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'NSDC@AIDS';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'VCETNSDC@AIDS';

/**
 * Verify Basic Auth credentials from a request.
 * Returns null if authenticated, or a 401 NextResponse if not.
 */
export function verifyAdminAuth(req: NextRequest): NextResponse | null {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const base64 = authHeader.split(' ')[1];
    if (!base64) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return null; // Authenticated
    }
  } catch {
    // Invalid base64
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
