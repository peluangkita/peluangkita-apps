import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';


export async function GET(req,res) {
  const session = await getCurrentUser(req,res)
  if(session.user.role === "MENTOR") {
    const profile = await prisma.mentorProfile.findUnique({
      where : {
        userId : session.user.id
      }
    })
    console.log(profile.id)
    const course = await prisma.course.findMany({
      where: {
        mentorId: profile.id,
      },
      include: {
        participant: true,
      }
    });
    return NextResponse.json(course);

  } else if (session.user.role === "STUDENT") {
    const reqMyCourse = await prisma.participant.findMany({
      where :{
        userId : session.user.id
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
    return NextResponse.json(reqMyCourse);
  }
}