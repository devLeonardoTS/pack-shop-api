import { Module } from "@nestjs/common";
import { IPhoneRepository } from "./phone-repository.interface";
import { PhoneController } from "./phone.controller";
import { PhoneService } from "./phone.service";
import { PrismaPhoneRepository } from "./prisma-phone.repository";

@Module({
  controllers: [PhoneController],
  providers: [
    PhoneService,
    {
      provide: IPhoneRepository,
      useClass: PrismaPhoneRepository,
    },
  ],
  exports: [PhoneService],
})
export class PhoneModule {}
