import { Module } from "@nestjs/common";
import { UploadModule } from "../upload/upload.module";
import { IImageRepository } from "./image-repository.interface";
import { ImageService } from "./image.service";
import { PrismaImageRepository } from "./prisma-image.repository";

@Module({
  providers: [
    ImageService,
    {
      provide: IImageRepository,
      useClass: PrismaImageRepository,
    },
  ],
  exports: [ImageService],
  imports: [UploadModule],
})
export class ImageModule {}
