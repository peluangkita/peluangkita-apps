import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req,res)
  if (session.user.role === "ADMIN") {
    const profile = await prisma.mentorProfile.findMany({
        include: {
          course : true,
          account: {
            include : {
                package : true
            }
          }
        },
      });
    return NextResponse.json(profile);
  }
}
