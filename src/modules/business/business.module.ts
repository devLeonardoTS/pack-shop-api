import { Module } from "@nestjs/common";
import { PrismaProfileRepository } from "../profile/prisma-profile.repository";
import { IProfileRepository } from "../profile/profile-repository.interface";
import { ProfileService } from "../profile/profile.service";
import { BusinessService } from "./business-profile.service";
import { IBusinessRepository } from "./business-repository.interface";
import { BusinessController } from "./controllers/business.controller";
import { PrismaBusinessRepository } from "./prisma-business.repository";

@Module({
  controllers: [BusinessController],
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
})
export class BusinessModule {}
