import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { requirePermission } from '@/lib/rbac';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Session-based auth via RBAC. The previous ?auth= query param leaked Base64
  // credentials into logs/history/referrers and has been removed.
  const guard = await requirePermission('registration:read');
  if (guard.error) return guard.error;

  try {
    await connectToDatabase();

    const { id } = await params;
    const registration = await Registration.findById(id).select('paymentScreenshot').lean();

    if (!registration) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const screenshot = (registration as unknown as { paymentScreenshot: string }).paymentScreenshot;

    if (!screenshot) {
      return NextResponse.json({ error: 'No screenshot' }, { status: 404 });
    }

    // If it's a base64 data URI, extract and serve as binary image
    if (screenshot.startsWith('data:')) {
      const commaIndex = screenshot.indexOf(',');
      const header = screenshot.substring(0, commaIndex);
      const data = screenshot.substring(commaIndex + 1);
      const mimeMatch = header.match(/data:([^;]+)/);
      const mime = mimeMatch?.[1] ?? 'image/jpeg';
      const uint8 = Uint8Array.from(Buffer.from(data, 'base64'));

      return new NextResponse(uint8, {
        status: 200,
        headers: {
          'Content-Type': mime,
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    }

    // Fallback: old path-based screenshots
    return NextResponse.redirect(new URL(screenshot, req.url));
  } catch (error: unknown) {
    console.error('Screenshot API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
