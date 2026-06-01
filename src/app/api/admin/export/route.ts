import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { requirePermission } from '@/lib/rbac';
import * as XLSX from 'xlsx';

export async function GET(req: NextRequest) {
  const guard = await requirePermission('registration:export');
  if (guard.error) return guard.error;

  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = domain && domain !== 'all' ? { domain } : {};
    const registrations = await Registration.find(filter).select('-paymentScreenshot').sort({ createdAt: -1 }).lean();

    // Build flat rows for Excel
    interface RegistrationDoc {
      _id: string;
      squadName: string;
      domain: string;
      leader: { fullName: string; email: string; phone: string; college: string };
      members: { fullName: string; email: string }[];
      transactionId: string;
      paymentScreenshot?: string;
      createdAt: Date;
    }

    const origin = req.nextUrl.origin;
    const rows = (registrations as unknown as RegistrationDoc[]).map((r, i) => ({
      'S.No': i + 1,
      'Squad Name': r.squadName,
      'Domain': r.domain,
      'Leader Name': r.leader?.fullName || '',
      'Leader Email': r.leader?.email || '',
      'Leader Phone': r.leader?.phone || '',
      'College': r.leader?.college || '',
      'Member 2 Name': r.members?.[0]?.fullName || '',
      'Member 2 Email': r.members?.[0]?.email || '',
      'Member 3 Name': r.members?.[1]?.fullName || '',
      'Member 3 Email': r.members?.[1]?.email || '',
      'Transaction ID': r.transactionId,
      'Screenshot URL': `${origin}/api/admin/screenshot/${r._id}`,
      'Registered At': r.createdAt ? new Date(r.createdAt).toLocaleString('en-IN') : '',
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="registrations_${domain || 'all'}_${Date.now()}.xlsx"`,
      },
    });
  } catch (error: unknown) {
    console.error('Export Error:', error);
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
