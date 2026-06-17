import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { rateLimit } from '@/lib/rate-limit';
import Registration from '@/models/Registration';

export async function POST(req: NextRequest) {
  try {
    // 0. Rate limit: 5 registrations per 10 minutes per IP
    const limited = await rateLimit(req, { name: 'register', limit: 5, windowMs: 10 * 60 * 1000 });
    if (limited) return limited;

    // 1. Connect to database FIRST — fail fast if DB is unreachable
    await connectToDatabase();

    // 2. Parse form data
    const formData = await req.formData();
    
    // Extract text fields
    const squadName = formData.get('squadName') as string;
    const domain = formData.get('domain') as string;
    const leaderFullName = formData.get('leaderFullName') as string;
    const leaderEmail = formData.get('leaderEmail') as string;
    const leaderPhone = formData.get('leaderPhone') as string;
    const leaderCollege = formData.get('leaderCollege') as string;
    const transactionId = formData.get('transactionId') as string;

    // Basic validation
    if (!squadName || !domain || !leaderFullName || !leaderEmail || !leaderPhone || !leaderCollege || !transactionId) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    // Parse team members
    const members = [];
    for (let i = 2; i <= 3; i++) {
      const memberName = formData.get(`member${i}FullName`) as string;
      const memberEmail = formData.get(`member${i}Email`) as string;
      if (memberName && memberEmail) {
        members.push({ fullName: memberName, email: memberEmail });
      }
    }

    // 3. Handle file — convert to base64 and store in MongoDB
    const file = formData.get('paymentScreenshot') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'Payment screenshot is required' }, { status: 400 });
    }

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Screenshot must be under 5MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const paymentScreenshot = `data:${mimeType};base64,${base64}`;

    // 4. Save to database
    const newRegistration = new Registration({
      squadName,
      domain,
      leader: {
        fullName: leaderFullName,
        email: leaderEmail,
        phone: leaderPhone,
        college: leaderCollege
      },
      members,
      transactionId,
      paymentScreenshot
    });

    await newRegistration.save();

    return NextResponse.json({ success: true, message: 'Registration successful' }, { status: 201 });
  } catch (error: unknown) {
    console.error('Registration API Error:', error);

    if (error instanceof Error) {
      if (error.message.includes('ETIMEOUT') || error.message.includes('ECONNREFUSED')) {
        return NextResponse.json({ error: 'Database connection failed. Please try again in a moment.' }, { status: 503 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
