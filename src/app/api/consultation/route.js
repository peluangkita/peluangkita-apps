import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET(req,res) {
  const session = await getCurrentUser(req,res)

  if(session.user.role === "ADMIN") {
    const list = await prisma.conversation.findMany({
      include: {
        user: true,
        messages: true
      }
    })
    return NextResponse.json(list);
  } else if (session.user.role === "STUDENT") {
    const consult = await prisma.conversation.findFirst({
      where : {
        userId : session.user.id
      }
    })

    return NextResponse.json(consult);
  }

  const message = await prisma.message.findMany({})
    
  return NextResponse.json(message);
}


export async function POST(req,res) {
    const session = await getCurrentUser(req,res)
    const body = await req.json();
    const {userId} = body

    if (userId === session.user.id) {
      const newConsultation = await prisma.conversation.create({
        data: {
            userId : userId,
            name : session.user.name,
            adminId: ""
        },
      });
      return NextResponse.json(newConsultation);
    }
  }