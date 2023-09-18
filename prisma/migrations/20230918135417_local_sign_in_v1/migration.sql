/*
  Warnings:

  - You are about to alter the column `cnpj` on the `BusinessProfile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(14)`.

*/
-- AlterTable
ALTER TABLE "BusinessProfile" ALTER COLUMN "cnpj" SET DATA TYPE VARCHAR(14);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "uid" VARCHAR(255) NOT NULL,
    "userAccountId" INTEGER NOT NULL,
    "tokenTypeId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(255) NOT NULL,

    CONSTRAINT "TokenType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_uid_key" ON "Token"("uid");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_tokenTypeId_fkey" FOREIGN KEY ("tokenTypeId") REFERENCES "TokenType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
