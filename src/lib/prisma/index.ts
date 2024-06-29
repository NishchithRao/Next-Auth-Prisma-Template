import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (!global.prisma) prisma = new PrismaClient();

export { prisma };
