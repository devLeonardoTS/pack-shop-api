-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "isPrimary" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Phone" ALTER COLUMN "isPrimary" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "isAvailable" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserAccount" ALTER COLUMN "isActive" DROP NOT NULL,
ALTER COLUMN "isConfirmed" DROP NOT NULL;
