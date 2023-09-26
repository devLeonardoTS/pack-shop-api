import { Module } from "@nestjs/common";
import { TokenTypeController } from "./controllers/token-type.controller";
import { ITokenTypeRepository } from "./interfaces/token-type-repository.interface";
import { PrismaTokenTypeRepository } from "./repositories/prisma-token-type.repository";
import { TokenTypeService } from "./services/token-type.service";

@Module({
  controllers: [TokenTypeController],
  providers: [
    TokenTypeService,
    {
      provide: ITokenTypeRepository,
      useClass: PrismaTokenTypeRepository,
    },
  ],
})
export class TokenTypeModule {}
