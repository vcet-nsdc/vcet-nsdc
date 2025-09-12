import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // For now, just log the data and return success
    // In a real application, you would save to a database
    console.log('Contact form submission:', data)
    
    return NextResponse.json({ success: true, message: 'Message received!' })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    )
  }
}
