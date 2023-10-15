import { Module } from "@nestjs/common";
import { BusinessTypeController } from "./business-type.controller";
import { BusinessTypeService } from "./business-type.service";
import { IBusinessTypeRepository } from "./interfaces/business-type-repository.interface";
import { PrismaBusinessTypeRepository } from "./repositories/prisma-business-type.repository";

@Module({
  controllers: [BusinessTypeController],
  providers: [
    BusinessTypeService,
    {
      provide: IBusinessTypeRepository,
      useClass: PrismaBusinessTypeRepository,
    },
  ],
})
export class BusinessTypeModule {}
