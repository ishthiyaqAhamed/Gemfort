import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const gemstoneSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  weight: z.number().optional().nullable(),
  color: z.string().optional().nullable(),
  shape: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  treatment: z.string().optional().nullable(),
  status: z.enum(['AVAILABLE', 'SOLD', 'RESERVED']).default('AVAILABLE'),
  images: z.array(z.string()).default([]),
  video: z.string().optional().nullable(),
  certificate: z.string().optional().nullable(),
  categoryId: z.string().min(1, 'Category is required'),
});

// GET /api/gemstones - list gemstones with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('q');

    const where: any = {};

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { origin: { contains: search, mode: 'insensitive' } },
      ];
    }

    const gemstones = await prisma.gemstone.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: gemstones });
  } catch (error: any) {
    console.error('Error fetching gemstones:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch gemstones' },
      { status: 500 }
    );
  }
}

// POST /api/gemstones - create a new gemstone
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = gemstoneSchema.parse(body);

    // Auto-generate unique slug if duplicate
    let slug = validated.slug;
    const existing = await prisma.gemstone.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const gemstone = await prisma.gemstone.create({
      data: {
        ...validated,
        slug,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ success: true, data: gemstone }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating gemstone:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create gemstone' },
      { status: 500 }
    );
  }
}
