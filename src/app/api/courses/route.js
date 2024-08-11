import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req,res)

  if(!session) {
    const myCourse = await prisma.course.findMany({
      include : {
        mentor: true,
        category: true,
      }
    });
    return NextResponse.json(myCourse);
  } else if(session.user.role === "MENTOR") {
    const mentor = await prisma.mentorProfile.findUnique({
      where :{
        userId : session.user.id
      }
    })
    const course = await prisma.course.findMany({
      where: {
        mentorId: mentor.id,
      },
      include: {
        category: true,
        mentor: true,
      },
    });
    return NextResponse.json(course);
    
  } else if(session.user.role === "STUDENT") {
    const course = await prisma.course.findMany({
      where: {
        participant: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        category: true,
        mentor: true,
      },
    });
    return NextResponse.json(course);
  } 
}

export async function POST(req,res) {
  const session = await getCurrentUser(req,res)
  const body = await req.json();
  const {title, description, price, discPrice, limitSeat, categoryId, image, mentorId, 
    modul1title,
    modul1desc,
    modul2title,
    modul2desc,
    modul3title,
    modul3desc,
    modul4title,
    modul4desc,
    modul5title,
    modul5desc,
    benefit1,
    benefit2,} = body

  // const account = await prisma.account.findMany({
  //   where: {
  //     accountId : mentorId
  //   },
  // })

  // const courseCount = await prisma.course.count({
  //   where: {
  //     mentorId
  //   },
  // })

  // if (courseCount >= account.limitPost) {
  //   throw new Error(`User ${userId} has reached maximum posts}`)
  // }

  const profile = await prisma.mentorProfile.findUnique({
    where:{
      userId : session.user.id
    }
  })
  console.log('test profile id', profile)

  if (profile) {
    const course = await prisma.course.create({
      data: {
        mentorId : profile.id,
        title,
        description,
        price : parseFloat(price),
        discPrice : parseFloat(discPrice),
        image,
        categoryId,
        limitSeat: parseInt(limitSeat),
        modul1title,
        modul1desc,
        modul2title,
        modul2desc,
        modul3title,
        modul3desc,
        modul4title,
        modul4desc,
        modul5title,
        modul5desc,
        benefit1,
        benefit2,
      },
    });
  
    return NextResponse.json(course);
  }
}
