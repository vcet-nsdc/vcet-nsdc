import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Message from '@/models/Message'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    await connectToDatabase()
    
    // Create new message document
    const message = new Message({
      name: data.name,
      email: data.email,
      contact: data.contact,
      message: data.message,
    })
    
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