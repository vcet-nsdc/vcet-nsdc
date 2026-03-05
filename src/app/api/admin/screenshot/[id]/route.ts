import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { verifyAdminAuth } from '@/lib/admin-auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Support auth via query param (for clicking links in new tabs)
  const { searchParams } = new URL(req.url);
  const authParam = searchParams.get('auth');
  if (authParam) {
    // Reconstruct the header-based auth check
    const headers = new Headers(req.headers);
    headers.set('authorization', `Basic ${authParam}`);
    const modifiedReq = new NextRequest(req.url, { headers });
    const authError = verifyAdminAuth(modifiedReq);
    if (authError) return authError;
  } else {
    const authError = verifyAdminAuth(req);
    if (authError) return authError;
  }

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
