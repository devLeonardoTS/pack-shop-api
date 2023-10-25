/*
  Warnings:

  - Made the column `isPrimary` on table `Phone` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Phone" ALTER COLUMN "isPrimary" SET NOT NULL;
