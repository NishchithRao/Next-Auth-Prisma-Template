import { User } from "@prisma/client";
import { auth } from "@/auth";
import { cache } from "react";
import { prisma } from "../";

export const getUser = cache(async (): Promise<User | null> => {
  const session = await auth();

  if (session?.user?.email)
    return await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  return null;
});
