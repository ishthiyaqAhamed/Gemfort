import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'RESOLVED']).optional(),
  message: z.string().optional(),
});

// PATCH /api/enquiries/[id] - update enquiry status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateSchema.parse(body);

    const updated = await prisma.enquiry.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}

// DELETE /api/enquiries/[id] - delete enquiry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.enquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting enquiry:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}
