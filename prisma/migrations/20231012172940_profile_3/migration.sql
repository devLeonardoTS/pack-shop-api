-- DropForeignKey
ALTER TABLE "ProfileImage" DROP CONSTRAINT "ProfileImage_imageId_fkey";

-- AddForeignKey
ALTER TABLE "ProfileImage" ADD CONSTRAINT "ProfileImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
