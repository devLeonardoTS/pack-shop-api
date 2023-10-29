/*
  Warnings:

  - You are about to drop the column `brand` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `complemento` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataAbertura` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricaoEstadual` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricaoMunicipal` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeFantasia` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razaoSocial` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSubscribedToOffers` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_profileId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "complemento" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "brand",
ADD COLUMN     "dataAbertura" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "inscricaoEstadual" VARCHAR(14) NOT NULL,
ADD COLUMN     "inscricaoMunicipal" VARCHAR(15) NOT NULL,
ADD COLUMN     "nomeFantasia" VARCHAR(255) NOT NULL,
ADD COLUMN     "razaoSocial" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "birthDate" DATE NOT NULL,
ADD COLUMN     "fullName" VARCHAR(255) NOT NULL,
ADD COLUMN     "socialName" VARCHAR(255);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "profileId",
ADD COLUMN     "businessId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "description",
DROP COLUMN "nickname",
ADD COLUMN     "isSubscribedToOffers" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "UserAccount" ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PhoneType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "PhoneType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "number" VARCHAR(15) NOT NULL,
    "phoneTypeId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessOwner" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cpf" VARCHAR NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "businessId" INTEGER NOT NULL,

    CONSTRAINT "BusinessOwner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhoneType_type_key" ON "PhoneType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessOwner_cpf_key" ON "BusinessOwner"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessOwner_businessId_key" ON "BusinessOwner"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Business_cnpj_key" ON "Business"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_cpf_key" ON "Consumer"("cpf");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_phoneTypeId_fkey" FOREIGN KEY ("phoneTypeId") REFERENCES "PhoneType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessOwner" ADD CONSTRAINT "BusinessOwner_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
