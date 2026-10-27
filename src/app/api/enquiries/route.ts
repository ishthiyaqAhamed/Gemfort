import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional().nullable(),
  message: z.string().min(1, 'Message is required'),
  gemstoneId: z.string().optional().nullable(),
});

// GET /api/enquiries - list all customer enquiries
export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: enquiries });
  } catch (error: any) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

// POST /api/enquiries - submit a new customer enquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = enquirySchema.parse(body);

    const enquiry = await prisma.enquiry.create({
      data: {
        name: validated.name.trim(),
        email: validated.email.trim(),
        phone: validated.phone?.trim() || null,
        message: validated.message.trim(),
        gemstoneId: validated.gemstoneId || null,
        status: 'NEW',
      },
    });

    return NextResponse.json(
      { success: true, message: 'Enquiry submitted successfully', data: enquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating enquiry:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
