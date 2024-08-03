import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
  console.log(params)
//   if (!params.courseId) {
//     return new NextResponse('Course Id is required', { status: 400 });
//   }
  const consult = await prisma.conversation.findUnique({
    where: {
      id: params.consultationId,
    },
  });

  const messages = await prisma.message.findMany({
    where : {
        conversationId : consult.id
    }
  }) 

  return NextResponse.json(messages);
}
