import { Module } from "@nestjs/common";
import { TokenTypeController } from "./controllers/token-type.controller";
import { TokenTypeService } from "./services/token-type.service";

@Module({
  controllers: [TokenTypeController],
  providers: [TokenTypeService],
})
export class TokenTypeModule {}
