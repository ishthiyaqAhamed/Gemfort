import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    let fileContent = '';
    
    if (fs.existsSync(envPath)) {
      fileContent = fs.readFileSync(envPath, 'utf8');
    }

    const env = {
      DATABASE_URL: process.env.DATABASE_URL || '',
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
    };

    return NextResponse.json({
      success: true,
      env,
      rawFile: fileContent,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to read env credentials' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { DATABASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = body;

    const envContent = [
      `DATABASE_URL="${DATABASE_URL || ''}"`,
      `CLOUDINARY_CLOUD_NAME="${CLOUDINARY_CLOUD_NAME || ''}"`,
      `CLOUDINARY_API_KEY="${CLOUDINARY_API_KEY || ''}"`,
      `CLOUDINARY_API_SECRET="${CLOUDINARY_API_SECRET || ''}"`,
      '',
    ].join('\n');

    const envPath = path.join(process.cwd(), '.env');
    fs.writeFileSync(envPath, envContent, 'utf8');

    // Update active runtime process.env
    if (DATABASE_URL) process.env.DATABASE_URL = DATABASE_URL;
    if (CLOUDINARY_CLOUD_NAME) process.env.CLOUDINARY_CLOUD_NAME = CLOUDINARY_CLOUD_NAME;
    if (CLOUDINARY_API_KEY) process.env.CLOUDINARY_API_KEY = CLOUDINARY_API_KEY;
    if (CLOUDINARY_API_SECRET) process.env.CLOUDINARY_API_SECRET = CLOUDINARY_API_SECRET;

    return NextResponse.json({
      success: true,
      message: 'Environment credentials safely updated and stored in .env',
      env: {
        DATABASE_URL,
        CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET,
      },
      rawFile: envContent,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to write credentials' },
      { status: 500 }
    );
  }
}
