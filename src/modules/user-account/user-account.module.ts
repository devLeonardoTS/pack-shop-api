import { Module } from "@nestjs/common";
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
  ],
})
export class UserAccountModule {}
