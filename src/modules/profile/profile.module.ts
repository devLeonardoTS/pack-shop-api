import { Module } from "@nestjs/common";
import { ImageModule } from "../image/image.module";
import { UploadModule } from "../upload/upload.module";
import { BusinessService } from "./business/business-profile.service";
import { IBusinessRepository } from "./business/business-repository.interface";
import { BusinessController } from "./business/business.controller";
import { PrismaBusinessRepository } from "./business/prisma-business.repository";
import { ConsumerService } from "./consumer/consumer-profile.service";
import { IConsumerRepository } from "./consumer/consumer-repository.interface";
import { ConsumerController } from "./consumer/consumer.controller";
import { PrismaConsumerRepository } from "./consumer/prisma-consumer.repository";
import { PrismaProfileImageRepository } from "./image/prisma-profile-image.repository";
import { ProfileImageController } from "./image/profile-image.controller";
import { IProfileImageRepository } from "./image/profile-image.interface";
import { ProfileImageService } from "./image/profile-image.service";
import { PrismaProfileRepository } from "./prisma-profile.repository";
import { IProfileRepository } from "./profile-repository.interface";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
  controllers: [
    ProfileController,
    ProfileImageController,
    BusinessController,
    ConsumerController,
  ],
  providers: [
    ProfileService,
    ProfileImageService,
    BusinessService,
    ConsumerService,
    { provide: IProfileRepository, useClass: PrismaProfileRepository },
    {
      provide: IProfileImageRepository,
      useClass: PrismaProfileImageRepository,
    },
    { provide: IBusinessRepository, useClass: PrismaBusinessRepository },
    { provide: IConsumerRepository, useClass: PrismaConsumerRepository },
  ],
  imports: [ImageModule, UploadModule],
})
export class ProfileModule {}
