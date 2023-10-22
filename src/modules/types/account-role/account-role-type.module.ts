import { Module } from "@nestjs/common";
import { UserAccountModule } from "@src/modules/user-account/user-account.module";
import { IAccountRoleTypeRepository } from "./account-role-type-repository.interface";
import { AccountRoleTypeController } from "./account-role-type.controller";
import { AccountRoleTypeService } from "./account-role-type.service";
import { PrismaAccountRoleTypeRepository } from "./prisma-account-role-type.repository";

@Module({
  controllers: [AccountRoleTypeController],
  providers: [
    AccountRoleTypeService,
    {
      provide: IAccountRoleTypeRepository,
      useClass: PrismaAccountRoleTypeRepository,
    },
  ],
  exports: [AccountRoleTypeService],
  imports: [UserAccountModule],
})
export class AccountRoleTypeModule {}
