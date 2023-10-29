import { Module } from "@nestjs/common";
import { ProductModule } from "../product/product.module";
import { PrismaProfileRepository } from "../profile/prisma-profile.repository";
import { IProfileRepository } from "../profile/profile-repository.interface";
import { ProfileService } from "../profile/profile.service";
import { IBusinessOwnerRepository } from "./business-owner/business-owner.interface";
import { BusinessOwnerService } from "./business-owner/business-owner.service";
import { PrismaBusinessOwnerRepository } from "./business-owner/prisma-business-owner.repository";
import { BusinessService } from "./business-profile.service";
import { IBusinessRepository } from "./business-repository.interface";
import { BusinessOwnerController } from "./controllers/business-owner.controller";
import { BusinessProductController } from "./controllers/business-product.controller";
import { BusinessController } from "./controllers/business.controller";
import { PrismaBusinessRepository } from "./prisma-business.repository";

@Module({
  controllers: [
    BusinessController,
    BusinessProductController,
    BusinessOwnerController,
  ],
  providers: [
    ProfileService,
    BusinessService,
    BusinessOwnerService,
    {
      provide: IProfileRepository,
      useClass: PrismaProfileRepository,
    },
    {
      provide: IBusinessRepository,
      useClass: PrismaBusinessRepository,
    },
    {
      provide: IBusinessOwnerRepository,
      useClass: PrismaBusinessOwnerRepository,
    },
  ],
  exports: [BusinessService, ProfileService, BusinessOwnerService],
  imports: [ProductModule],
})
export class BusinessModule {}
