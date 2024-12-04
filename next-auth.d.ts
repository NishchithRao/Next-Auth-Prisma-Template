import { User } from "@prisma/client";
import { DefaultSelection } from "@prisma/client/runtime/library";
import NextAuth from "next-auth";
import { AdapterUser as BaseAdapterUser } from "next-auth/adapters";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSelection {
    user: User;
  }
  interface AdapterUser extends User {}
}

declare module "next-auth/adapters" {
  interface AdapterUser extends BaseAdapterUser, User {
    teamId?: User["teamId"];
    role?: User["role"];
  }
}
BaseAdapterUse;
