import { Module } from "@nestjs/common";
import { IPhoneTypeRepository } from "./phone-type-repository.interface";
import { PhoneTypeController } from "./phone-type.controller";
import { PhoneTypeService } from "./phone-type.service";
import { PrismaPhoneTypeRepository } from "./prisma-phone-type.repository";

@Module({
  controllers: [PhoneTypeController],
  providers: [
    PhoneTypeService,
    {
      provide: IPhoneTypeRepository,
      useClass: PrismaPhoneTypeRepository,
    },
  ],
})
export class PhoneTypeModule {}
