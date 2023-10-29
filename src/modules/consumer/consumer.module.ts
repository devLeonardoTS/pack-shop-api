import { Module } from "@nestjs/common";
import { PrismaProfileRepository } from "../profile/prisma-profile.repository";
import { IProfileRepository } from "../profile/profile-repository.interface";
import { ProfileService } from "../profile/profile.service";
import { ConsumerService } from "./consumer-profile.service";
import { IConsumerRepository } from "./consumer-repository.interface";
import { ConsumerController } from "./consumer.controller";
import { PrismaConsumerRepository } from "./prisma-consumer.repository";

@Module({
  controllers: [ConsumerController],
  providers: [
    ConsumerService,
    ProfileService,
    {
      provide: IConsumerRepository,
      useClass: PrismaConsumerRepository,
    },
    {
      provide: IProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
  exports: [ConsumerService],
})
export class ConsumerModule {}
