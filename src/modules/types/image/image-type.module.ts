import { Module } from "@nestjs/common";
import { ImageModule } from "@src/modules/image/image.module";
import { IImageTypeRepository } from "./image-type-repository.interface";
import { ImageTypeController } from "./image-type.controller";
import { ImageTypeService } from "./image-type.service";
import { PrismaImageTypeRepository } from "./prisma-image-type.repository";

@Module({
  controllers: [ImageTypeController],
  providers: [
    ImageTypeService,
    {
      provide: IImageTypeRepository,
      useClass: PrismaImageTypeRepository,
    },
  ],
  imports: [ImageModule],
})
export class ImageTypeModule {}
