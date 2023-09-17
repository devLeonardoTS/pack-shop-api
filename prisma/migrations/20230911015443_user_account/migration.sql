/*
  Warnings:

  - You are about to drop the column `role` on the `AccountOriginType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[origin]` on the table `AccountOriginType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `origin` to the `AccountOriginType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AccountOriginType_role_key";

-- AlterTable
ALTER TABLE "AccountOriginType" DROP COLUMN "role",
ADD COLUMN     "origin" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AccountOriginType_origin_key" ON "AccountOriginType"("origin");
