import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function POST(req,res) {
    const session = await getCurrentUser(req,res)
    const body = await req.json();
    const {id, title, description, price, discPrice, limitSeat, categoryId, image, mentorId, 
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
  
    const profile = await prisma.mentorProfile.findUnique({
      where:{
        userId : session.user.id
      }
    })
  
    if (profile) {
      const course = await prisma.course.update({
        where: {
          id: id,
        },
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