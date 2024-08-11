import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
  console.log(params)
  if (!params.partId) {
    return new NextResponse('Part Id is required', { status: 400 });
  }
  const part = await prisma.participant.findUnique({
    where: {
      id: params.partId,
    },
    include: {
        user: true,
        course: {
            include : {
                mentor: true
            }
        },
        payment: true
      }
  });

  return NextResponse.json(part);
}
