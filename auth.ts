import { globalPaths, paths } from "./constants/role-to-path";

import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
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
    authorized: ({ auth, request }) => {
      if (!auth || !auth.user) return false;
      if (process.env.NODE_ENV === "development") return true;

      if (globalPaths.includes(request.nextUrl.pathname)) return true;

      const allowedPaths = paths[auth.user.role || "DEV"];

      if (
        allowedPaths.some((path) =>
          new RegExp(`^\\` + path + "/?.*").test(request.nextUrl.pathname)
        )
      )
        return true;
      return false;
    },
    jwt: ({ token, user }) => {
      if (user && "role" in user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as Role;
      return session;
    },
  },
  debug: process.env.NODE_ENV !== "production",
});
