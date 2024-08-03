import prisma from '@/lib/prisma';

export async function fetchUsersByRole(role) {
  return await prisma.user.findMany({
    where: {
      role: role,
    },
  });
}
