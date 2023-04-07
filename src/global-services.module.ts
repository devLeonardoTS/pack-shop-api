import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./databases/prisma/prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class GlobalServicesModule {}
