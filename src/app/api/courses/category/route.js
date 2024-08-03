import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req,res) {
  const category = await prisma.category.findMany();
  return NextResponse.json(category);
}