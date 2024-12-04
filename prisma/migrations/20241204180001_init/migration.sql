/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LEAD', 'DEV');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DEV';

-- CreateIndex
CREATE UNIQUE INDEX "User_role_key" ON "User"("role");
