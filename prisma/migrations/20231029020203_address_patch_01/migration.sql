/*
  Warnings:

  - You are about to alter the column `cpf` on the `BusinessOwner` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "complemento" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BusinessOwner" ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11);
