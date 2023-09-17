import { Module } from "@nestjs/common";
import { AccountOriginTypeController } from "./controllers/account-origin-type.controller";
import { IAccountOriginTypeRepository } from "./interfaces/account-origin-type-repository.interface";
import { PrismaAccountOriginTypeRepository } from "./repositories/prisma-account-origin-type.repository";
import { AccountOriginTypeService } from "./services/account-origin-type.service";

@Module({
  controllers: [AccountOriginTypeController],
  providers: [
    AccountOriginTypeService,
    {
      provide: IAccountOriginTypeRepository,
      useClass: PrismaAccountOriginTypeRepository,
    },
  ],
})
export class AccountOriginTypeModule {}
