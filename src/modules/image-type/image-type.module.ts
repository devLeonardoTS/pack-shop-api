import { Module } from "@nestjs/common";
import { ImageTypeController } from "./image-type.controller";
import { ImageTypeService } from "./image-type.service";
import { IImageTypeRepository } from "./interfaces/image-type-repository.interface";
import { PrismaImageTypeRepository } from "./repositories/prisma-image-type.repository";

@Module({
  controllers: [ImageTypeController],
  providers: [
    ImageTypeService,
    {
      provide: IImageTypeRepository,
      useClass: PrismaImageTypeRepository,
    },
  ],
})
export class ImageTypeModule {}
