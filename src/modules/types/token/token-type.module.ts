import { Module } from "@nestjs/common";
import { PrismaTokenTypeRepository } from "./prisma-token-type.repository";
import { ITokenTypeRepository } from "./token-type-repository.interface";
import { TokenTypeController } from "./token-type.controller";
import { TokenTypeService } from "./token-type.service";

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
