import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
    const session = await getCurrentUser(req,res)

    const course = await prisma.course.findMany({
      include : {
        mentor: true,
        category: true,
      }
    });
    return NextResponse.json(course);
}