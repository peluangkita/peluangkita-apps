import prisma from '@/lib/prisma';

export async function getAllCourses() {
  return await prisma.course.findMany();
}

export async function getCourses(id) {
  return await prisma.user.findMany({
    where: {
      mentorId: id,
    },
  });
}
