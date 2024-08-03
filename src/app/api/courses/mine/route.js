import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET(req,res) {
  const session = await getCurrentUser(req,res)
  console.log(session)
  if (session.user.role === "STUDENT"){
    const myCourse = await prisma.course.findMany({
      where :{
        requestCourse :{
          some : {
            userId : session.user.id
          }
        }
      },
      include : {
        requestCourse : true,
        mentor: true,
        category: true,
      }
    });
    return NextResponse.json(myCourse);
  }
}