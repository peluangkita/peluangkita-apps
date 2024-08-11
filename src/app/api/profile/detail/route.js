import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req,res) {
  const session = await getCurrentUser(req,res)
  const profile = await prisma.mentorProfile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(profile);
}


export async function POST(req,res) {
    const session = await getCurrentUser(req, res);
    const body = await req.json();
    const {
        userId,
        name, 
        email, 
        image, 
        phone, 
        title, 
        about, 
        companyName, 
        companyAddress, 
        bankName    ,  
        bankAccName ,  
        bankNumber  ,  
        bank2Name   ,  
        bank2AccName,  
        bank2Number ,  
        bank3Name   ,  
        bank3AccName,  
        bank3Number  
    } = body;
  
    const newProfile = await prisma.mentorProfile.update({
        where: {
            userId: session.user.id ,
        },
        data: {
            name, 
            email, 
            image, 
            phone, 
            title, 
            about, 
            companyName, 
            companyAddress, 
            bankName    ,  
            bankAccName ,  
            bankNumber  ,  
            bank2Name   ,  
            bank2AccName,  
            bank2Number ,  
            bank3Name   ,  
            bank3AccName,  
            bank3Number  
        },
    });
  
    if (image) {
      await prisma.user.update({
        where:{
          id: session.user.id,
        },
        data:{
          image: image
        }
      })
    }
    
    return NextResponse.json(newProfile);
  }