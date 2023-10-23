import { Module } from "@nestjs/common";
import { ProductModule } from "../product/product.module";
import { PrismaProfileRepository } from "../profile/prisma-profile.repository";
import { IProfileRepository } from "../profile/profile-repository.interface";
import { ProfileService } from "../profile/profile.service";
import { BusinessService } from "./business-profile.service";
import { IBusinessRepository } from "./business-repository.interface";
import { BusinessProductController } from "./controllers/business-product.controller";
import { BusinessController } from "./controllers/business.controller";
import { PrismaBusinessRepository } from "./prisma-business.repository";

@Module({
  controllers: [BusinessController, BusinessProductController],
  providers: [
    BusinessService,
    ProfileService,
    {
      provide: IBusinessRepository,
      useClass: PrismaBusinessRepository,
    },
    {
      provide: IProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
  exports: [BusinessService],
  imports: [ProductModule],
})
export class BusinessModule {}
