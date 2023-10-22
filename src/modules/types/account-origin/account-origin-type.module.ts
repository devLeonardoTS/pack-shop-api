import { Module } from "@nestjs/common";
import { UserAccountModule } from "@src/modules/user-account/user-account.module";
import { IAccountOriginTypeRepository } from "./account-origin-type-repository.interface";
import { AccountOriginTypeController } from "./account-origin-type.controller";
import { AccountOriginTypeService } from "./account-origin-type.service";
import { PrismaAccountOriginTypeRepository } from "./prisma-account-origin-type.repository";

@Module({
  controllers: [AccountOriginTypeController],
  providers: [
    AccountOriginTypeService,
    {
      provide: IAccountOriginTypeRepository,
      useClass: PrismaAccountOriginTypeRepository,
    },
  ],
  exports: [AccountOriginTypeService],
  imports: [UserAccountModule],
})
export class AccountOriginTypeModule {}
