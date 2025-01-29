// app/api/complete-onboarding/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const profileImage = formData.get('profileImage') as File;
    const interests = JSON.parse(formData.get('interests') as string);

    // Here you would typically:
    // 1. Upload the profile image to a storage service (like AWS S3)
    // 2. Get the URL of the uploaded image
    // For now, we'll skip the actual upload and use a placeholder URL
    const imageUrl = "/images/placeholder_user.png";

    // Update the user in the database
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        username,
        password, // Note: In production, make sure to hash the password
        image: imageUrl,
        interests,
        hasCompletedOnboarding: true,
      },
    });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error in complete-onboarding:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}