import { Module } from "@nestjs/common";
import { IAccountOriginTypeRepository } from "../account-origin-type/interfaces/account-origin-type-repository.interface";
import { PrismaAccountOriginTypeRepository } from "../account-origin-type/repositories/prisma-account-origin-type.repository";
import { AccountOriginTypeService } from "../account-origin-type/services/account-origin-type.service";
import { IAccountRoleTypeRepository } from "../account-role-type/interfaces/account-role-type-repository.interface";
import { PrismaAccountRoleTypeRepository } from "../account-role-type/repositories/prisma-account-role-type.repository";
import { AccountRoleTypeService } from "../account-role-type/services/account-role-type.service";
import { UserAccountController } from "./controllers/user-account.controller";
import { IUserAccountRepository } from "./interfaces/user-account-repository.interface";
import { PrismaUserAccountRepository } from "./repositories/prisma-user-account.repository";
import { UserAccountService } from "./services/user-account.service";

@Module({
  controllers: [UserAccountController],
  providers: [
    UserAccountService,
    {
      provide: IUserAccountRepository,
      useClass: PrismaUserAccountRepository,
    },
    AccountRoleTypeService,
    {
      provide: IAccountOriginTypeRepository,
      useClass: PrismaAccountOriginTypeRepository,
    },
    AccountOriginTypeService,
    {
      provide: IAccountRoleTypeRepository,
      useClass: PrismaAccountRoleTypeRepository,
    },
  ],
})
export class UserAccountModule {}
