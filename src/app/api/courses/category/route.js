import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const category = await prisma.category.findMany();
  return NextResponse.json(category);
}


export async function POST(req,res) {
  const session = await getCurrentUser(req,res)
  const body = await req.json();
  const {name } = body

  if (session.user.role === "ADMIN") {
    const newCat = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json(newCat);
  }
}

export async function DELETE(req,res) {
  const session = await getCurrentUser(req,res)
  const body = await req.json();

  if (session.user.role === "ADMIN") {
     await prisma.category.delete({
      where: {
        id: body,
      },
    });
    return NextResponse.json({ message: "done" });
  }
}

