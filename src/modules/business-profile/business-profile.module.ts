import { Module } from "@nestjs/common";
import { BusinessProfileController } from "./controllers/business-profile.controller";
import { BusinessProfileService } from "./services/business-profile.service";

@Module({
  controllers: [BusinessProfileController],
  providers: [BusinessProfileService],
})
export class BusinessProfileModule {}
