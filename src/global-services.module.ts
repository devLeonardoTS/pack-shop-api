import { Global, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import PrismaService from "./databases/prisma/prisma.service";
import { PrismaErrorFilter } from "./modules/common/filters/prisma-error/prisma-error.filter";

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaErrorFilter,
    },
  ],
  exports: [PrismaService],
})
export class GlobalServicesModule {}
