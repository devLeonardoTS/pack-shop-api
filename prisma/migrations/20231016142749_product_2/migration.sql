/*
  Warnings:

  - You are about to drop the column `category` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_category_key";

-- DropIndex
DROP INDEX "Tag_tag_key";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "isPrimary" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "tag",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
