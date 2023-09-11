-- CreateTable
CREATE TABLE "AccountOriginType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "AccountOriginType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountRoleType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "AccountRoleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "roleTypeId" INTEGER NOT NULL,
    "originTypeId" INTEGER NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountOriginType_role_key" ON "AccountOriginType"("role");

-- CreateIndex
CREATE UNIQUE INDEX "AccountRoleType_role_key" ON "AccountRoleType"("role");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_roleTypeId_fkey" FOREIGN KEY ("roleTypeId") REFERENCES "AccountRoleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_originTypeId_fkey" FOREIGN KEY ("originTypeId") REFERENCES "AccountOriginType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
