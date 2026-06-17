import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { rateLimit } from '@/lib/rate-limit'
import { sanitizeText, sanitizeEmail } from '@/lib/sanitize'
import Message from '@/models/Message'

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 messages per 10 minutes per IP
    const limited = await rateLimit(req, { name: 'contact', limit: 5, windowMs: 10 * 60 * 1000 })
    if (limited) return limited

    const data = await req.json()

    // Sanitize all inputs — strip HTML/control chars, trim, cap length
    const name = sanitizeText(data.name, 120)
    const email = sanitizeEmail(data.email)
    const contact = sanitizeText(data.contact, 30)
    const messageBody = sanitizeText(data.message, 2000)

    if (!name || !email || !contact || !messageBody) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    await connectToDatabase()

    // Create new message document
    const message = new Message({ name, email, contact, message: messageBody })

    await message.save()
    return NextResponse.json({ success: true, message: 'Message received!' })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    )
  }
}