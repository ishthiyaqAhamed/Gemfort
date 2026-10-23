import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateGemstoneSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  weight: z.number().optional().nullable(),
  color: z.string().optional().nullable(),
  shape: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  treatment: z.string().optional().nullable(),
  status: z.enum(['AVAILABLE', 'SOLD', 'RESERVED']).optional(),
  images: z.array(z.string()).optional(),
  video: z.string().optional().nullable(),
  certificate: z.string().optional().nullable(),
  categoryId: z.string().optional(),
});

// GET /api/gemstones/[id] - fetch by ID or slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try finding by ID first, then by slug
    let gemstone = await prisma.gemstone.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!gemstone) {
      gemstone = await prisma.gemstone.findUnique({
        where: { slug: id },
        include: { category: true },
      });
    }

    if (!gemstone) {
      return NextResponse.json(
        { success: false, error: 'Gemstone not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: gemstone });
  } catch (error: any) {
    console.error('Error fetching gemstone:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch gemstone' },
      { status: 500 }
    );
  }
}

// PUT /api/gemstones/[id] - update gemstone details, video, images, or status
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateGemstoneSchema.parse(body);

    const updated = await prisma.gemstone.update({
      where: { id },
      data: validated,
      include: { category: true },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating gemstone:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update gemstone' },
      { status: 500 }
    );
  }
}

// DELETE /api/gemstones/[id] - delete gemstone
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.gemstone.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Gemstone deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting gemstone:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete gemstone' },
      { status: 500 }
    );
  }
}
