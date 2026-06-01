import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { rateLimit } from '@/lib/rate-limit'
import Certificate from '@/models/Certificate'

// GET - Search certificate by email
export async function GET(req: NextRequest) {
  try {
    // Rate limit lookups: 30 per 10 minutes per IP
    const limited = await rateLimit(req, { name: 'certificate-lookup', limit: 30, windowMs: 10 * 60 * 1000 })
    if (limited) return limited

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400 }
      )
    }

    await connectToDatabase()
    
    // @ts-expect-error - Mongoose typing issue
    const certificate = await Certificate.findOne({ 
      email: email.toLowerCase().trim() 
    }).sort({ createdAt: -1 })

    if (!certificate) {
      return NextResponse.json(
        { success: false, message: 'Certificate not found' },
        { status: 404 }
      )
    }

    // Update last accessed time
    // @ts-expect-error - Mongoose typing issue
    await Certificate.findByIdAndUpdate(certificate._id, {
      lastAccessed: new Date()
    })

    return NextResponse.json({
      success: true,
      certificate: {
        id: certificate._id,
        certificateNumber: certificate.certificateNumber,
        name: certificate.name,
        product: certificate.product,
        email: certificate.email,
        date: certificate.date,
        status: certificate.status,
        downloadCount: certificate.downloadCount,
        shareCount: certificate.shareCount,
        createdAt: certificate.createdAt
      }
    })
  } catch (error) {
    console.error('Error fetching certificate:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch certificate' },
      { status: 500 }
    )
  }
}

// POST - Create new certificate
export async function POST(req: NextRequest) {
  try {
    // Rate limit creation: 10 per 10 minutes per IP
    const limited = await rateLimit(req, { name: 'certificate-create', limit: 10, windowMs: 10 * 60 * 1000 })
    if (limited) return limited

    const data = await req.json()
    const { name, product, email, certificateNumber, date } = data

    // Validate required fields
    if (!name || !product || !email || !certificateNumber || !date) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    await connectToDatabase()
    
    // Check if certificate already exists
    // @ts-expect-error - Mongoose typing issue
    const existingCertificate = await Certificate.findOne({ 
      certificateNumber 
    })

    if (existingCertificate) {
      return NextResponse.json(
        { success: false, message: 'Certificate number already exists' },
        { status: 409 }
      )
    }

    // Create new certificate
    const certificate = new Certificate({
      certificateNumber,
      name: name.trim(),
      product: product.trim(),
      email: email.toLowerCase().trim(),
      date,
      status: 'generated'
    })

    await certificate.save()

    return NextResponse.json({
      success: true,
      certificate: {
        id: certificate._id,
        certificateNumber: certificate.certificateNumber,
        name: certificate.name,
        product: certificate.product,
        email: certificate.email,
        date: certificate.date,
        status: certificate.status,
        createdAt: certificate.createdAt
      }
    })
  } catch (error) {
    console.error('Error creating certificate:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create certificate' },
      { status: 500 }
    )
  }
}
