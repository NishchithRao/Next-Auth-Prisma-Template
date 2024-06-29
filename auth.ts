import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/user/auth/signin",
    error: "/error-auth",
    verifyRequest: "/user/auth/signin",
  },
  providers: [
    GitHub({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      profile(user) {
        return { email: user.email, name: user.name, id: uuidv4() };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth;
    },
  },
  debug: process.env.NODE_ENV !== "production",
});
