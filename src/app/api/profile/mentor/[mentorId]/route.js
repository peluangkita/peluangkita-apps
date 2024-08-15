import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import moment from 'moment';

export async function GET(req, { params }) {
    console.log(params)
    if (!params.mentorId) {
      return new NextResponse('Part Id is required', { status: 400 });
    }
    const profile = await prisma.mentorProfile.findUnique({
        where: {
          id: params.mentorId,
        },
        include : {
            account: {
                include : {
                    package : true
                }
            },
            course: true
        }
      });

    return NextResponse.json(profile);
  }


  
export async function POST(req,res) {
    const session = await getCurrentUser(req,res)
    const body = await req.json();
    const {mentorId, packageId, accountId} = body

    const pckg = await prisma.package.findUnique({
        where : {
            id: packageId
        }
    })

    const expiredDate = moment().add(pckg.expired, 'days')

    const acc = await prisma.account.upsert({
        where : {
            id : accountId
        },
        update: {
            mentorId,
            packageId,
            expiredAt : expiredDate.toISOString(),
        },
        create: {
            mentorId,
            packageId,
            expiredAt : expiredDate.toISOString(),
        },
    });

    return NextResponse.json(acc);
    
  }
  