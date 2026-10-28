import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Helper to get or create the default admin user
async function getOrCreateAdminUser() {
  let user = await prisma.user.findFirst({
    orderBy: { createdAt: 'asc' },
  });

  if (!user) {
    const defaultHash = await bcrypt.hash('admin', 10);
    user = await prisma.user.create({
      data: {
        email: 'admin@gemfort.com',
        password: defaultHash,
        name: 'Admin',
      },
    });
  }

  return user;
}

// GET: Fetch current admin profile info
export async function GET() {
  try {
    const user = await getOrCreateAdminUser();

    return NextResponse.json({
      success: true,
      email: user.email,
      name: user.name || 'Admin',
    });
  } catch (error: any) {
    console.error('Error fetching admin profile:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch admin profile.' },
      { status: 500 }
    );
  }
}

// POST: Update admin email and/or password
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await getOrCreateAdminUser();

    const updateData: { email?: string; password?: string } = {};

    if (email && typeof email === 'string' && email.trim()) {
      const cleanEmail = email.trim().toLowerCase();
      // Ensure no conflicting user with same email
      const existing = await prisma.user.findFirst({
        where: {
          email: { equals: cleanEmail, mode: 'insensitive' },
          id: { not: user.id },
        },
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'A user with this email already exists.' },
          { status: 400 }
        );
      }

      updateData.email = cleanEmail;
    }

    if (password && typeof password === 'string' && password.trim().length > 0) {
      if (password.trim().length < 4) {
        return NextResponse.json(
          { success: false, error: 'Password must be at least 4 characters long.' },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password.trim(), 10);
      updateData.password = hashedPassword;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No changes provided.',
        email: user.email,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Admin profile updated successfully.',
      email: updatedUser.email,
      passwordUpdated: Boolean(updateData.password),
    });
  } catch (error: any) {
    console.error('Error updating admin profile:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update admin profile.' },
      { status: 500 }
    );
  }
}
