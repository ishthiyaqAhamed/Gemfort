import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Check if any user exists; if none exist, auto-seed default admin
    const totalUsers = await prisma.user.count();
    if (totalUsers === 0) {
      const defaultHash = await bcrypt.hash('admin', 10);
      await prisma.user.create({
        data: {
          email: 'admin@gemfort.com',
          password: defaultHash,
          name: 'Admin',
        },
      });
    }

    // Find the user by email (case-insensitive search)
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: cleanEmail,
          mode: 'insensitive',
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Compare hashed password or fallback plaintext (and re-hash if plaintext)
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch && password === user.password) {
      isMatch = true;
      // Upgrade stored plaintext password to bcrypt hash
      const upgradedHash = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: upgradedHash },
      });
    }

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Logged in successfully.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name || 'Admin',
      },
    });
  } catch (error: any) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Login failed due to a server error.' },
      { status: 500 }
    );
  }
}
