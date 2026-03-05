import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
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

    // 3. Handle file upload
    const file = formData.get('paymentScreenshot') as File | null;
    let paymentScreenshotPath = '';

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'Payment screenshot is required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.name) || '.jpg';
    const filename = `payment_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
    const filePath = path.join(uploadDir, filename);
    
    await fs.writeFile(filePath, buffer);
    paymentScreenshotPath = `/uploads/${filename}`;

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
      paymentScreenshot: paymentScreenshotPath
    });

    await newRegistration.save();

    return NextResponse.json({ success: true, message: 'Registration successful' }, { status: 201 });
  } catch (error: unknown) {
    console.error('Registration API Error:', error);

    // Give the user a helpful message based on error type
    if (error instanceof Error) {
      if (error.message.includes('ETIMEOUT') || error.message.includes('ECONNREFUSED')) {
        return NextResponse.json({ error: 'Database connection failed. Please try again in a moment.' }, { status: 503 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
