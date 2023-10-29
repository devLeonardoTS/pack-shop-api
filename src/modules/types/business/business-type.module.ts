import { Module } from "@nestjs/common";
import { BusinessModule } from "@src/modules/business/business.module";
import { UserAccountModule } from "@src/modules/user-account/user-account.module";
import { IBusinessTypeRepository } from "./business-type-repository.interface";
import { BusinessTypeController } from "./business-type.controller";
import { BusinessTypeService } from "./business-type.service";
import { PrismaBusinessTypeRepository } from "./prisma-business-type.repository";

@Module({
  controllers: [BusinessTypeController],
  providers: [
    BusinessTypeService,
    {
      provide: IBusinessTypeRepository,
      useClass: PrismaBusinessTypeRepository,
    },
  ],
  imports: [UserAccountModule, BusinessModule],
})
export class BusinessTypeModule {}
