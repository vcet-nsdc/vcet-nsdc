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
    const registrations = await Registration.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: registrations }, { status: 200 });
  } catch (error: unknown) {
    console.error('Admin API Error:', error);
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
