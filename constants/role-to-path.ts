import { Role } from "@prisma/client";

export const paths: Record<Role, string[]> = {
  ADMIN: ["/project\\"],
  LEAD: ["/teams\\"],
  DEV: ["/teams\\"],
};

export const globalPaths = ["/", "signin"];
