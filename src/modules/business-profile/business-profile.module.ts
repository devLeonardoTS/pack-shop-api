import { Module } from "@nestjs/common";
import { BusinessProfileController } from "./controllers/business-profile.controller";
import { IBusinessProfileRepository } from "./interfaces/business-profile-repository.interface";
import { PrismaBusinessAccountRepository } from "./repositories/prisma-business-profile.repository";
import { BusinessProfileService } from "./services/business-profile.service";

@Module({
  controllers: [BusinessProfileController],
  providers: [
    BusinessProfileService,
    {
      provide: IBusinessProfileRepository,
      useClass: PrismaBusinessAccountRepository,
    },
  ],
})
export class BusinessProfileModule {}
