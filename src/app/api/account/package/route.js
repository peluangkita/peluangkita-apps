import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req,res)

  if (session.user.role === "ADMIN") {
    const accPackage = await prisma.package.findMany();
    return NextResponse.json(accPackage);
  }
}


export async function POST(req,res) {
    const session = await getCurrentUser(req,res)
    const body = await req.json();
    const {name, limitPost, highlights, expired} = body

    if (session.user.role === "ADMIN") {
      const newPackage = await prisma.package.create({
        data: {
            name,
            limitPost : parseInt(limitPost),
            highlights :parseInt(highlights),
            expired : parseInt(expired)
        },
      });
      return NextResponse.json(newPackage);
    }
  }