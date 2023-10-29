import { Module } from "@nestjs/common";
import { IAddressRepository } from "./address-repository.interface";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";
import { PrismaAddressRepository } from "./prisma-address.repository";

@Module({
  controllers: [AddressController],
  providers: [
    AddressService,
    {
      provide: IAddressRepository,
      useClass: PrismaAddressRepository,
    },
  ],
  exports: [AddressService],
})
export class AddressModule {}
