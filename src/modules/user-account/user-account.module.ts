import { Module } from "@nestjs/common";
import { ProfileModule } from "../profile/profile.module";
import { IAccountOriginTypeRepository } from "../types/account-origin/account-origin-type-repository.interface";
import { AccountOriginTypeService } from "../types/account-origin/account-origin-type.service";
import { PrismaAccountOriginTypeRepository } from "../types/account-origin/prisma-account-origin-type.repository";
import { IAccountRoleTypeRepository } from "../types/account-role/account-role-type-repository.interface";
import { AccountRoleTypeService } from "../types/account-role/account-role-type.service";
import { PrismaAccountRoleTypeRepository } from "../types/account-role/prisma-account-role-type.repository";
import { UserAccountOriginTypeController } from "./controllers/ua-origin.controller";
import { UserAccountProfileController } from "./controllers/ua-profile.controller";
import { UserAccountRoleTypeController } from "./controllers/ua-role.controller";
import { UserAccountController } from "./controllers/user-account.controller";
import { PrismaUserAccountRepository } from "./prisma-user-account.repository";
import { IUserAccountRepository } from "./user-account-repository.interface";
import { UserAccountService } from "./user-account.service";

@Module({
  controllers: [
    UserAccountController,
    UserAccountProfileController,
    UserAccountOriginTypeController,
    UserAccountRoleTypeController,
  ],
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
  imports: [ProfileModule],
})
export class UserAccountModule {}
