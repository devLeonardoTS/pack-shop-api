import { Module } from "@nestjs/common";
import { IAccountRoleTypeRepository } from "../account-role-type/interfaces/account-role-type-repository.interface";
import { PrismaAccountRoleTypeRepository } from "../account-role-type/repositories/prisma-account-role-type.repository";
import { AccountRoleTypeService } from "../account-role-type/services/account-role-type.service";
import { IAccountOriginTypeRepository } from "../types/account-origin/account-origin-type-repository.interface";
import { AccountOriginTypeService } from "../types/account-origin/account-origin-type.service";
import { PrismaAccountOriginTypeRepository } from "../types/account-origin/prisma-account-origin-type.repository";
import { UserAccountController } from "./controllers/user-account.controller";
import { IUserAccountRepository } from "./interfaces/user-account-repository.interface";
import { PrismaUserAccountRepository } from "./repositories/prisma-user-account.repository";
import { UserAccountService } from "./services/user-account.service";

@Module({
  controllers: [UserAccountController],
  providers: [
    UserAccountService,
    AccountRoleTypeService,
    AccountOriginTypeService,
    {
      provide: IUserAccountRepository,
      useClass: PrismaUserAccountRepository,
    },
    {
      provide: IAccountRoleTypeRepository,
      useClass: PrismaAccountRoleTypeRepository,
    },
    {
      provide: IAccountOriginTypeRepository,
      useClass: PrismaAccountOriginTypeRepository,
    },
  ],
  exports: [UserAccountService],
})
export class UserAccountModule {}
