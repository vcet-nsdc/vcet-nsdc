import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Message from '@/models/Message'

export async function POST(req: NextRequest) {
  const data = await req.json()
  await connectToDatabase()
  await Message.create(data)
  return NextResponse.json({ success: true, message: 'Message received!' })
}