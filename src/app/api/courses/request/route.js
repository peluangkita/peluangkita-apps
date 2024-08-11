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
    const reqMyCourse = await prisma.requestCourse.findMany({
      where :{
        mentorId : profile.id
      },
      include: {
        user: true,
        mentor: true,
        course: true
      }
    });
    return NextResponse.json(reqMyCourse);

  } else if (session.user.role === "STUDENT") {
    const reqMyCourse = await prisma.requestCourse.findMany({
      where :{
        userId : session.user.id
      },
      include: {
        user: true,
        mentor: true,
        course: true
      }
    });
    return NextResponse.json(reqMyCourse);
  }
}


export async function POST(req,res) {
  const session = await getCurrentUser(req, res);

  const body = await req.json();
  const{mentorId,courseId} = body
  const reqMsg = "Mengirim permintaan kelas"
  const resMsg = "Permintaan kelas diterima"

  if(session.user.role === "MENTOR") {
    const accepted = await prisma.participant.update({
      where : {
        course :{
          some : {
            mentorId
          }
        }
      },
      data: {
        status : resMsg,
        accepted : true,
      },
    });
  
    return NextResponse.json(accepted);
  }

  const request = await prisma.participant.create({
    data: {
      userId : session.user.id,
      status : reqMsg,
      courseId,
      mentorId
    },
  });

  return NextResponse.json(request);
}