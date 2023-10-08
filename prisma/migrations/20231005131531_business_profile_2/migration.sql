/*
  Warnings:

  - A unique constraint covering the columns `[profileSlug]` on the table `BusinessProfile` will be added. If there are existing duplicate values, this will fail.
  - The required column `profileSlug` was added to the `BusinessProfile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "BusinessProfile" ADD COLUMN     "profileSlug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_profileSlug_key" ON "BusinessProfile"("profileSlug");
