import { Module } from "@nestjs/common";
import { AddressModule } from "../address/address.module";
import { BusinessModule } from "../business/business.module";
import { ConsumerModule } from "../consumer/consumer.module";
import { ImageModule } from "../image/image.module";
import { UploadModule } from "../upload/upload.module";
import { ProfileAddressController } from "./controllers/profile-address.controller";
import { ProfileBusinessController } from "./controllers/profile-business.controller";
import { ProfileConsumerController } from "./controllers/profile-consumer.controller";
import { ProfileController } from "./controllers/profile.controller";
import { PrismaProfileImageRepository } from "./image/prisma-profile-image.repository";
import { ProfileImageController } from "./image/profile-image.controller";
import { IProfileImageRepository } from "./image/profile-image.interface";
import { ProfileImageService } from "./image/profile-image.service";
import { PrismaProfileRepository } from "./prisma-profile.repository";
import { IProfileRepository } from "./profile-repository.interface";
import { ProfileService } from "./profile.service";

@Module({
  controllers: [
    ProfileController,
    ProfileImageController,
    ProfileBusinessController,
    ProfileConsumerController,
    ProfileAddressController,
  ],
  providers: [
    ProfileService,
    ProfileImageService,
    { provide: IProfileRepository, useClass: PrismaProfileRepository },
    {
      provide: IProfileImageRepository,
      useClass: PrismaProfileImageRepository,
    },
  ],
  imports: [
    ImageModule,
    UploadModule,
    BusinessModule,
    ConsumerModule,
    AddressModule,
  ],
})
export class ProfileModule {}
