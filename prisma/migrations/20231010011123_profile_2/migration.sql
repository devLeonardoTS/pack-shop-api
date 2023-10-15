/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `ImageType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImageType_type_key" ON "ImageType"("type");
