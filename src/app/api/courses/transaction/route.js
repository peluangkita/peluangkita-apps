import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function GET(req,res) {
    const session = await getCurrentUser(req,res)
    const profile = await prisma.mentorProfile.findUnique({
        where : {  
            userId : session.user.id
        }
    })

    if(session.user.role === "ADMIN") {
      const participant = await prisma.participant.findMany({
        include: {
          payment: true,
          course: true,
          user: true
      }
      });
      return NextResponse.json(participant);
    }

    if(session.user.role === "MENTOR") {
      const participant = await prisma.participant.findMany({
        where: {
            mentorId: profile.id,
        },
        include: {
            payment: true,
            course: true,
            user: true
        }
      });
    return NextResponse.json(participant);
    }
}

export async function POST(req,res) {
    const session = await getCurrentUser(req,res)
    const body = await req.json();
    const {participantId, status, image} = body
    const course = await prisma.course.findFirst({
        where: {
          participant: {
            some: {
              id: participantId,
            },
          },
        },
      });

    const confirmation = await prisma.payment.create({
    data: {
        participantId,
        courseId : course.id,
        status ,
        image
    },
    });

    return NextResponse.json(confirmation);
  }