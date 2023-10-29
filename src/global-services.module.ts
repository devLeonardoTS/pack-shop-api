import { Global, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import PrismaService from "./databases/prisma/prisma.service";
import {
  PrismaClientKnownErrorFilter,
  PrismaClientUnknownRequestErrorFilter,
  PrismaClientValidationErrorFilter,
} from "./modules/common/filters/prisma-error/prisma-error.filter";

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaClientKnownErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientValidationErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientUnknownRequestErrorFilter,
    },
  ],
  exports: [PrismaService],
})
export class GlobalServicesModule {}
