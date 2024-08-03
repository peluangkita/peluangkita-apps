import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(req,res) {
    const session = await getCurrentUser(req,res)
    const body = await req.json();
    const {text, senderId, receiverId, conversationId, image} = body

    
    const consult = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

  
    const course = await prisma.message.create({
    data: {
        text,
        senderId : session.user.id,
        receiverId : consult.userId === senderId ? consult.userId : senderId,
        conversationId ,
        image
    },
    });

    return NextResponse.json(course);
    
  }