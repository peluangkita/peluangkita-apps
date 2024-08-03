import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  console.log(params)
  if (!params.courseId) {
    return new NextResponse('Course Id is required', { status: 400 });
  }
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      mentor : true,
      category : true
    }
  });

  return NextResponse.json(course);
}
