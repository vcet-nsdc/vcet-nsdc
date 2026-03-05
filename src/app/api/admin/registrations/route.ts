import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { verifyAdminAuth } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const authError = verifyAdminAuth(req);
  if (authError) return authError;

  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = domain && domain !== 'all' ? { domain } : {};
    const registrations = await Registration.find(filter, { paymentScreenshot: 0 }).sort({ createdAt: -1 }).lean();

    // Add a flag so the admin UI knows if a screenshot exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (registrations as any[]).map(r => ({
      ...r,
      hasScreenshot: true,  // If it got saved, it has one (it's required)
    }));

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    console.error('Admin API Error:', error);
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
