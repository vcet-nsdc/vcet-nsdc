import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract text fields
    const squadName = formData.get('squadName') as string;
    const domain = formData.get('domain') as string;
    const leaderFullName = formData.get('leaderFullName') as string;
    const leaderEmail = formData.get('leaderEmail') as string;
    const leaderPhone = formData.get('leaderPhone') as string;
    const leaderCollege = formData.get('leaderCollege') as string;
    const transactionId = formData.get('transactionId') as string;

    // Optional structure for team members (we parse up to 2 additional members)
    const members = [];
    for (let i = 2; i <= 3; i++) {
        const memberName = formData.get(`member${i}FullName`) as string;
        const memberEmail = formData.get(`member${i}Email`) as string;
        if (memberName && memberEmail) {
            members.push({ fullName: memberName, email: memberEmail });
        }
    }

    // Extract file
    const file = formData.get('paymentScreenshot') as File | null;
    let paymentScreenshotPath = '';

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      // Generate a unique filename and save
      const ext = path.extname(file.name) || '.jpg';
      const filename = `payment_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
      const filePath = path.join(uploadDir, filename);
      
      await fs.writeFile(filePath, buffer);
      paymentScreenshotPath = `/uploads/${filename}`;
    } else {
        return NextResponse.json({ error: 'Payment screenshot is required' }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Create registration document
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
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
