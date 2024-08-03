import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { name, email, password, phone, companyName } = body;

  if (!name || !email || !password || !phone) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "MENTOR",
      phone,
    },
  });

  if (user) {
    const profile = await prisma.mentorProfile.create({
      data: {
        userId: user.id,
        name : user.name,
        email: user.email,
        phone,
        companyName
      }
    })

    return NextResponse.json(profile);

  }

  return NextResponse.json(user);
}
