import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

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



export async function DELETE(req,{ params }) {
  console.log(params)
  await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  return NextResponse.json({ message: "done" });
}
