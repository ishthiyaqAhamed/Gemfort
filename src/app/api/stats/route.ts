import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [
      totalInventory,
      pendingEnquiries,
      totalEnquiries,
      totalCategories,
      recentEnquiries,
      recentGemstones,
    ] = await Promise.all([
      prisma.gemstone.count(),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.enquiry.count(),
      prisma.category.count(),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.gemstone.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalInventory,
        pendingEnquiries,
        totalEnquiries,
        totalCategories,
        recentEnquiries,
        recentGemstones,
      },
    });
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
