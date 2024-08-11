import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function POST(req,res) {
    const session = await getCurrentUser(req,res)
    const body = await req.json();

    const {participantId,paymentId} = body

    const profile = await prisma.mentorProfile.findUnique({
      where : {
        userId : session.user.id
      }
    })

    const participant = await prisma.participant.findUnique({
      where : {
        id : participantId
      }
    })

    if(profile.id === participant.mentorId) {
      const accPayment = await prisma.payment.update({
        where : {
          id : paymentId,
        },
        data: {
          accepted: true,
        },
      });

      const accParticipant = await prisma.participant.update({
        where : {
          id : participantId
        },
        data: {
          accepted: true,
          isPaid: true,
        },
      });

      return NextResponse.json({accPayment, accParticipant});
    }
  }