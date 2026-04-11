// Prisma client singleton - prevents multiple instances in development
// This file is used SERVER-SIDE only (in server.ts / API routes)

let prismaInstance: any = null;

export async function getPrisma() {
  if (!prismaInstance) {
    const { PrismaClient } = await import('@prisma/client');
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}
