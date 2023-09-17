-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(255) NOT NULL,
    "pictureUrl" VARCHAR(255) NOT NULL,
    "userAccountId" INTEGER NOT NULL,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_cnpj_key" ON "BusinessProfile"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_userAccountId_key" ON "BusinessProfile"("userAccountId");

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
