import { Module } from "@nestjs/common";
import { AccountRoleTypeController } from "./controllers/account-role-type.controller";
import { IAccountRoleTypeRepository } from "./interfaces/account-role-type-repository.interface";
import { PrismaAccountRoleTypeRepository } from "./repositories/prisma-account-role-type.repository";
import { AccountRoleTypeService } from "./services/account-role-type.service";

@Module({
  controllers: [AccountRoleTypeController],
  providers: [
    AccountRoleTypeService,
    {
      provide: IAccountRoleTypeRepository,
      useClass: PrismaAccountRoleTypeRepository,
    },
  ],
})
export class AccountRoleTypeModule {}
